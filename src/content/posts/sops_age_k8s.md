---
title: SOPS and age for k8s secrets
pubDate: 2026-08-25
tags:
  - TOOLS
description: A simple setup using SOPS and age for committed kubernetes secrets
---

# SOPS, age and Kubernetes

In small non-production Kubernetes setups I did not commit the Kubernetes `kind: Secret` entries.
This has bothered me because I wanted the manifests to be available when migrating a cluster or recovering
from cluster loss.
Everything else, apart from application data, is versioned properly.

This article focuses on a simple local-only workflow rather than a full secret-management platform.
There are sophisticated products out there such as [HashiCorp - Vault](https://www.hashicorp.com/de/products/vault) that are designed
to solve this at scale.

I was looking for a simple local-only solution for PoC setups and came across a useful combination of
[SOPS](https://getsops.io/), [age](https://github.com/filosottile/age) and Kubernetes `Secret` resources.

The workflow is:

1. Generate an age key pair and keep the private key outside the repository.
2. Configure SOPS with the public key and the fields to encrypt.
3. Create a plaintext Kubernetes Secret manifest locally.
4. Encrypt it before committing it to Git.
5. Decrypt it locally when applying it to Kubernetes.

## age

`age` is a simple, modern and secure file encryption tool, as described in its `README.md`.
It supports post-quantum keys, `ssh` keys and UNIX-style composability.

Generate a key pair with:

```bash
age-keygen -o key.txt
```

The command prints the corresponding public key. The generated public key is used for encryption, while the private key is needed for decryption.
For example, age can encrypt a file for the generated recipient with `age -r <public-key>` and
decrypt it again with `age --decrypt -i key.txt`.

This makes it useful for many use cases, such as encrypting files before storing them in cloud storage.

## SOPS

SOPS is an editor of encrypted files that supports YAML, JSON, ENV, INI and BINARY formats.
It supports several different encryption backends and one of them is (surprise) `age`.
Interesting about that is that it encrypts only chosen **values** of a `YAML`, and not the whole file.
This makes it perfect for the use case of encrypting the relevant parts of a Kubernetes `Secret` type.

After installing `sops` we can have a `.sops.yaml` configuration file that specifies what files to encrypt
with what kind of recipients (aka public age keys):

```yaml
creation_rules:
  - path_regex: "secret\\.(dec|enc)\\.yaml$"
    encrypted_regex: "^(data|stringData)$"
    age:
      # me
      - age1q7e8jdya2rwasdfbfoomqkvse6vwxuso69ulfooan4crq2lrq6d
      # someone else
      - age1q7e8jdya2rwasdfbfoomqkvse6vwxasdfasdf87uaasdfbasdfd
```

This rule applies to files matching `secret.dec.yaml` or `secret.enc.yaml` and uses the two specified public keys.
The encryption script uses the rule for the decrypted files, while `updatekeys` uses it for the encrypted files.
Only those two recipients will be able to decrypt the resulting files.
`encrypted_regex` can define the YAML **keys** whose values should be encrypted which also propagates to nested keys.

Let's take this input file:

```yaml
data: This is super secret
foo: Not so secret
```

For decryption, `sops` needs access to the corresponding private key.
One way is to set the `SOPS_AGE_KEY_FILE` environment variable pointing to your `age` key file.

Now we can encrypt it:

```bash
sops -e secret.dec.yaml > secret.enc.yaml
```

Looking at `secret.enc.yaml` we see that the `data` value has been encrypted and some `sops`
metadata has been attached:

```yaml
data: ENC[AES256_GCM,data:H430zP0v7wT8hHol+oJ+Gh15qko=,iv:aMhptiwy6DUSpA9clgH/abxxTDTpCDuECj6rVadTVB4=,tag:NwZjUCqsLQu+e4qqGYrW0Q==,type:str]
foo: Not secret
sops:
  age:
    - enc: |
        -----BEGIN AGE ENCRYPTED FILE-----
        ...
        -----END AGE ENCRYPTED FILE-----
      recipient: age1q7e8jdya2rwasdfbfoomqkvse6vwxuso69ulfooan4crq2lrq6d
  encrypted_regex: ^(data|stringData)$
  lastmodified: "..."
  mac: ENC[AES256_GCM,data:...,iv:...,tag:...,type:str]
  version: 3.13.3
```

The encrypted file contains more metadata than shown here; the ciphertext and MAC are abbreviated
for readability.

To reverse it, we run

```bash
sops -d secret.enc.yaml > secret.dec.yaml
```

## Kubernetes

The transition to Kubernetes is now pretty simple.
Notice that the `.sops.yaml` specifies `data|stringData` as YAML keys to encrypt, since
those contain the actual secrets. Kubernetes expects values in `data` to be base64-encoded,
while `stringData` accepts plaintext and converts it to `data` when the resource is created.
For example, this command produces a Secret using `data`:

```bash
kubectl create secret generic test --from-literal=password=very-secret --dry-run=client --output=yaml
```

This produces:

```yaml
apiVersion: v1
data:
  password: dmVyeS1zZWNyZXQ=
kind: Secret
metadata:
  name: test
```

When writing the manifest by hand, `stringData` can be more convenient because it does not
require manually encoding the value:

```yaml
stringData:
  password: very-secret
```

Both fields are covered by the `encrypted_regex`, so either form can be committed only after
the secret values have been encrypted.

After decrypting the encrypted manifest, it can be applied to the cluster:

```bash
kubectl apply -f secret.dec.yaml
```

## Git and convenience wrappers

Now imagine we have a repository where we keep all our Kubernetes deployment files.
We want an easy way to encrypt and decrypt all secret files in the repository.

If we make some naming conventions we can write some bash scripts to do the encryption
and decryption of all files in the repository.

A naming convention could be:

- Plain files with secrets are named `*secret.dec.yaml`
- Encrypted versions are in the same place named `*secret.enc.yaml`

First, we want to make sure that we never commit the plain files by adding them to `.gitignore`:

```gitignore
*secret.dec.yaml
```

The encrypted variants we can then safely commit, since that's our goal.

Let's first write `decrypt.sh`:

```bash
#!/usr/bin/env bash

mapfile -d '' -t files < <(find . -type d -name .git -prune -o -type f -name '*secret.enc.yaml' -print0)

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No *secret.enc.yaml files found."
  exit 0
fi

for f in "${files[@]}"; do
  dec="${f%.enc.yaml}.dec.yaml"
  echo "Decrypting: $f -> $dec"
  sops -d "$f" > "$dec"
  chmod 600 "$dec"
done

echo "Done. Decrypted ${#files[@]} file(s)."
```

We assume that file lives on top-level of the repository.
It then finds all files that match our encrypted file name pattern.
We then decrypt them with `sops`.

Now the `encrypt.sh`:

```bash
#!/usr/bin/env bash

mapfile -d '' -t files < <(find . -type d -name .git -prune -o -type f -name '*secret.dec.yaml' -print0)

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No *.dec.yaml files found."
  exit 0
fi

tmpdir=$(mktemp -d) || { echo "mktemp failed" >&2; exit 1; }
trap 'rm -rf -- "$tmpdir"' EXIT

encrypted_count=0
skipped_count=0

sha() {
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum -- "$1" | awk '{print $1}'
    else
        shasum -a 256 -- "$1" | awk '{print $1}'
    fi
}

for f in "${files[@]}"; do
  enc="${f%.dec.yaml}.enc.yaml"

  if git cat-file -e ":$enc" 2>/dev/null; then
    committed_enc="$tmpdir/committed.enc.yaml"
    git show ":$enc" > "$committed_enc"

    old_sha=$(sops -d --output "$tmpdir/committed.dec.yaml" "$committed_enc" && sha "$tmpdir/committed.dec.yaml")

    new_sha=$(sha "$f")

    if [[ -n "$old_sha" && "$old_sha" == "$new_sha" ]]; then
      echo "Skipping (unchanged): $f"
      skipped_count=$((skipped_count + 1))
      continue
    fi
  fi

  echo "Encrypting: $f -> $enc"
  sops -e "$f" > "$enc"
  encrypted_count=$((encrypted_count + 1))
done

echo "Done. Encrypted ${encrypted_count} file(s), skipped ${skipped_count} unchanged file(s)."
```

Finding the files to encrypt is similar as in `decrypt.sh` but with the file pattern for decrypted files.
Since `sops` does not produce the same output for two identical input files we want to only re-encrypt
them when the plain file has changed. Otherwise, we will always have new versions of encrypted files
even though the actual content is the same.

We are detecting that by calculating the checksum of the file on disk and the checksum of the most recent git version.
If the checksums match, we do not have to encrypt it again.

If we want to add another recipient to be able to decrypt files, `sops` offers an `updatekeys`
command to update the encrypted file's recipient metadata. In the same way, we can write the wrapping
script to update all files with the new recipient added:

```bash
#!/usr/bin/env bash

mapfile -d '' -t files < <(find . -type d -name .git -prune -o -type f -name '*secret.enc.yaml' -print0)

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No *secret.enc.yaml files found."
  exit 0
fi

for f in "${files[@]}"; do
  echo "Updating keys: $f"
  sops updatekeys "$f"
done

echo "Done. Updated keys for ${#files[@]} file(s)."
```

Remembering to call `encrypt.sh` and `decrypt.sh` can be a bit tedious.
To run them automatically, we can set up [pre-commit](https://pre-commit.com/) hooks.

We want to ensure everything is encrypted before committing, so the encryption script runs at the `pre-commit` stage.
We also want to keep the decrypted files in sync after pulling or checking out a different branch.
Our `pre-commit-config.yaml` could look like this:

```yaml
default_install_hook_types:
  - pre-commit
  - post-checkout
  - post-merge

repos:
  - repo: local
    hooks:
      - id: encrypt
        name: encrypt
        entry: ./encrypt.sh
        language: system
        always_run: true
        stages:
          - pre-commit

      - id: decrypt
        name: decrypt
        entry: ./decrypt.sh
        language: system
        always_run: true
        stages:
          - post-checkout
          - post-merge
```

After setting up an initial Python `venv` with `pre-commit` installed, run `pre-commit install` to
install those hooks. Automatically enabling the `venv` when entering the repository can be done with e.g. [direnv](https://direnv.net/).

The `post-checkout` hook handles branch switches and checkouts. The `post-merge` hook is also needed
to refresh decrypted files after a merge, including the merge performed by `git pull`.

## Security considerations

The age private key is the important secret in this setup. Keep it outside the repository and back it
up securely. Losing it means losing access to all encrypted files. Also, anyone who obtains it can
decrypt the entire Git history, including older versions that were encrypted before a recipient rotation.

The decrypted manifests also exist as plaintext files in the working tree and are applied as ordinary
Kubernetes Secrets. Protect the local files and use appropriate Kubernetes RBAC and encryption-at-rest
settings for the cluster. `.gitignore` prevents new plaintext files from being added accidentally, but
does not remove a plaintext file that was already committed.

This setup is intentionally simple and local-only. It can be suitable for small PoC environments, but
larger or production environments generally need managed key storage, access control, auditing and
automated secret delivery.
