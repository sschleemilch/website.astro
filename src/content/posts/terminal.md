---
title: Living in the terminal
pubDate: 2026-07-06
tags:
  - TERMINAL
description: Introduction of the terminal, tools and workflows
---

# The terminal

Over the years I learned to love the terminal more and more to the point where I usually don't leave it for development tasks.
This is about going through the stack and show possible tools and workflows.

In the end, my view on the terminal is a lot about reducing context switching,
limiting the view on one thing and being as efficient as possible using a keyboard centric flow.

This article is not about avoiding GUIs at any cost but a way to show how the terminal could become your home base.

## Terminal Emulator

Lets shorty talk about the stack.
It starts with a terminal emulator. The terminal emulator is the GUI application that emulates a video terminal.
Terminals go a long way back in computer history where there was a mainframe computer connected to multiple **terminals**.

Today's tasks of the terminal emulator are roughly:
- rendering text
- handling of fonts
- colors
- keyboard input
- GPU acceleration
- tabs and splits

Any OS offers a built-in terminal emulator.
However, some cross-platform more feature rich emulators are the following:

- [ghostty](https://ghostty.org/)
- [kitty](https://sw.kovidgoyal.net/kitty/)
- [WezTerm](https://wezterm.org/index.html)
- [iTerm2](https://iterm2.com/) (MacOS)
- [Alacritty](https://alacritty.org/)


## Shell

The shell in the end provides access to the system it runs on.
It's the entity that is calling programs, interpreting input and handling the output.
Usually also associated with being a read-eval-print-loop (REPL).

Shells have scripting capabilities where commands can be written and executed from files.
Different shells have different scripting languages.

The most prominent shells (for unix) are:

- bash (Usually the default of any Linux distro)
- zsh (MacOS default)
- fish
- nushell

Which one you are using is mostly a matter of taste.
I would recommend to start with `bash` or `zsh`. `bash` scripts are everywhere, and the chances are high that it is what you are dealing
with when remotely connecting to a machine or at least will be available.

Personally I switched from `zsh` to `fish` two years ago because `fish` has more things out of the box.

However, the shell where you type your commands does not necessarily be the one that executes scripts.
Therefore, even when using e.g. `fish` you do not need to know the `fish` scripting language very well.

Scripts should usually define a **shebang** line in the beginning that instructs the interpreter to use that particular program to interpret it.

In `bash` scripts you usually see something like the following:

```bash
#!/bin/bash
```

Or using the `env` program to find the executable to invoke like so:

```
#!/usr/bin/env python3
```

The prompt is a part of the shell that shows additional information.
Usually it shows the current directory and indicators for the last command return code, but it can show much more if you want to.
It is very configurable and a candidate for a lot of customization and show off potential.

Here is my current fish one while writing this article, kept minimal.

![prompt](./img/terminal/prompt.png)

It includes the current working directory, the current git branch and status as well as some information about
the project programming language version, Python `venv` name etc.

There are quite some frameworks out there to configure it and make it very fancy (and distracting) in no time. To name a few popular ones:
- [starship.rs](https://starship.rs/), cross shell
- [oh-my-posh](https://ohmyposh.dev/), cross shell
- [powerlevel10k](https://github.com/romkatv/powerlevel10k), zsh only
- [tide](https://github.com/IlanCosman/tide), fish only

The shell is also responsible for configuring command aliases (e.g. so that you can write `g` instead of `git`),
environment variables and completion support (using `<tab>` to complete a path, a command etc.).

Do actually do something useful you are launching applications.
While there are some shell built in commands, most of the programs you launch are external programs like `git`, `ssh` and so on.


