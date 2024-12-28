---
title: Python UV
pubDate: 2024-12-28
tags:
  - Python
description: Why I switched from poetry to uv for all my projects
icon: python
---

# The reasons I switched from [poetry](https://python-poetry.org/) to [uv](https://docs.astral.sh/uv/)

[poetry](https://python-poetry.org/) is an amazing Python packaging and dependency management tool.
I used it for every tool I wrote in private and at work.
For writing tools I am also using a [cookiecutter](https://github.com/cookiecutter/cookiecutter) [template](https://github.com/sschleemilch/cookiecutter-python-cli).

Those are the reasons I switched.

## Speeeeeed

Although I never had any performance issues with poetry, getting something faster is always a good thing.
However, it was not the main factor in the decision to switch since initializing projects is probably not the
most critical thing. Still, uv is noticeably a lot faster then poetry.

## Python version management

Being able to install and switch Python versions on the fly is a very useful [feature](https://docs.astral.sh/uv/#python-management).

E.g. to configure your project with another Python `3.12`:

```bash
uv sync --python 3.12
```

Or to run a standalone script with a certain version:

```bash
uv run --python 3.10 --no-project something.py
```

Additionally you will not need another tool or containerization to run tests for more than one version.

For instance, uv integrates seamless with [nox](https://nox.thea.codes/en/stable/):

```python
import nox

PYTHON_VERSIONS = ["3.11", "3.12", "3.13"]

nox.options.default_venv_backend = "uv"


@nox.session(python=PYTHON_VERSIONS)
def tests(session):
    session.run_install(
        "uv",
        "sync",
        env={"UV_PROJECT_ENVIRONMENT": session.virtualenv.location},
    )
    session.run(
        "pytest",
        *session.posargs,
    )
```

## Prototyping

Running a Python script for testing something is a very common task.
uv simplifies doing that by being able to run a script with certain dependencies from the CLI:

```bash
uv run --with requests api_call.py
```

Alternatively, dependencies can be specified as inline metadata:

```python
# /// script
# dependencies = [
#   "requests<3",
#   "rich",
# ]
# ///
```

uv has an interface for handling those dependencies for a script for you using:

```bash
uv add --script api_call.py 'requests<3' 'rich'
```

## `pyproject.toml` syntax

While that might be opinionated, uv is a bit more in sync with the [Python Packaging User Guide](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/#writing-your-pyproject-toml) regarding how the `pyproject.toml` should look like.
