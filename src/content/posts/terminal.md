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

## Organizing your workspace

Usually you want to do several things in parallel when working. Starting a service, editing a file, running tests, ....
Of course, you could start multiple terminal emulators to do so. However, one is definitely enough.

Modern terminal emulators often have native support for tabs and splits.
On top of this there exist so-called **terminal multiplexers**.

The most popular ones are [zellij](https://zellij.dev/) and [tmux](https://github.com/tmux/tmux/wiki).
The benefit of emulator independent multiplexers is obviously that you have to learn them once and can then
switch the terminal multiplexer anytime. Also, not all terminal emulators implement sessions.

I have been using `tmux` for a long time until I settled down using `kitty`'s native tabs and splits but emulating
the `tmux` key bindings. My current bindings are like that

```conf
map ctrl+shift+h previous_tab
map ctrl+shift+l next_tab

map ctrl+j neighboring_window bottom
map ctrl+k neighboring_window top
map ctrl+h neighboring_window left
map ctrl+l neighboring_window right

map ctrl+b>1 goto_tab 1
map ctrl+b>2 goto_tab 2
map ctrl+b>3 goto_tab 3
map ctrl+b>4 goto_tab 4
map ctrl+b>5 goto_tab 5
map ctrl+b>6 goto_tab 6
map ctrl+b>7 goto_tab 7
map ctrl+b>8 goto_tab 8
map ctrl+b>9 goto_tab 9

map ctrl+b>c new_tab
map ctrl+b>, set_tab_title

map ctrl+b>% launch --location=vsplit --cwd=current
map ctrl+b>" launch --location=hsplit --cwd=current
```

Everyone has to find their sweet spot of bindings.
However, I have learned that trying to stick with default bindings can have its benefits as well.
Be it a foreign machine, a remote session or helping out a colleague.

## Efficient navigation

A lot of the tasks in the terminal require navigating to places.
The ground rule for everything you type in the terminal is to use the `<tab>` key whenever possible.

E.g. to navigate into my website to write a new article like this one I can do from `cd w<tab>` which expands already
into `cd workspace/` followed by `web<tab>` will expand to my final target `workspace/website.astro`.

Some shells offer **auto suggestions** either via plugins or natively that even reduce the needed keystrokes further.
They have an internal ranking of how often you are navigating into directories.
In my case it already suggests the target after one letter, which I can accept using **right arrow**:

![auto_suggestion](./img/terminal/auto_suggestion.png)

Additionally, there exist shell independent tools to find directories you use frequently in a fuzzy manner.
The one I am using is [zoxide](https://github.com/ajeetdsouza/zoxide).

It offers two commands: `z` and `zi`. `z` will directly navigate into the best match for its argument.
`zi` will open an interactive window where you can select the prefiltered target list.

Therefore, `z web` also brings me into my `workspace/website.astro` project.
Usually I am using `zi` though when I am not sure that the argument will only have one result.

In this case, it does and I can navigate using `enter`:

![zi](./img/terminal/zi.png)

This is really a tool made in heaven, especially at work where you have a lot of repositories.
A simple keyword is enough to find the right target using `zi` in seconds!


