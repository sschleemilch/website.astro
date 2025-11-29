---
title: Neovim configuration with vim.pack
pubDate: 2025-11-29
tags:
  - NEOVIM
description: "Writing a minimal Neovim configuration from scratch
  using nvim's (version > 0.12.0) built in package manager `vim.pack`"
---

# Minimal Neovim configuration layout using `vim.pack`

I have tried quite some different things since I have been starting to use Neovim full-time.
From full-blown distros like [lazyvim](https://www.lazyvim.org/) to starter templates like [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim).

However, recently I felt the urge to have a very minimal setup with exactly what I want and need.

Also, I wanted to reduce the overall number of plugins.

I was happy to see that Neovim ships with a minimal plugin manager: `vim.pack` ([pull/34009](https://github.com/neovim/neovim/pull/34009)).
Before that, I was happily using [lazy.nvim](https://github.com/folke/lazy.nvim) which I never had any problems with.

And yet it motivated me of removing one more plugin.

**As the time of writing, `vim.pack` requires the nightly version of Neovim and is not included in a stable release yet**

When switching to `vim.pack` I also had the chance to rethink how I want to structure my configuration directory.
The configuration from [echasnovski](https://github.com/echasnovski/nvim), the author of [mini.nvim](https://github.com/nvim-mini/mini.nvim)
inspired me to not use a `init.lua` with explicit `require` statements but to make use of the `plugin` directory
where all `**/*.lua` files will be sourced in alphabetical order.

And this is how it looks:

```
plugin
├── 10_options.lua
├── 11_keymaps.lua
├── 12_autocommands.lua
└── 20_plugins.lua
```

`10_options.lua` will be sourced first and contains general options. Afterward, `11_keymaps.lua` will be sourced with custom key mappings, then `12_autocommands.lua` and so on.

Finally, `20_plugins.lua` will be loaded which looks like that:

```lua
---@class Plugin : vim.pack.Spec
---@field setup function?

---@type Plugin[]
local plugins = require('plugins')

vim.pack.add(plugins, { load = true, confirm = false })

for _, plugin in ipairs(plugins) do
    if plugin.setup ~= nil then
        plugin.setup()
    end
end
```

`vim.pack.add()` accepts a table of `vim.pack.Spec` entries to be fetched and installed.
Additionally to the spec, I wanted to be able to call a `setup()` function of the plugins after they have been loaded.
Therefore, I annotated a custom type `Plugin`, which extends the `vim.pack.Spec` by an optional `setup()` function.

As we see in the annotation, `require('plugins')` returns a list of plugins.

One of the core things I liked about [lazy.nvim](https://github.com/folke/lazy.nvim) is to have a file for each plugin.
I wanted to keep that feature, meaning that I would like to be able to define plugins in similar way as `lazy.nvim`.

That's why my `lua/plugins` directory looks like that:

```
lua
└── plugins
    ├── conform.lua
    ├── flash.lua
    ├── grug-far.lua
    ├── init.lua
    ├── mason.lua
    ├── mini-clue.lua
    ├── mini-completion.lua
    ├── mini-diff.lua
    ├── mini-extra.lua
    ├── mini-files.lua
    ├── mini-hipatterns.lua
    ├── mini-icons.lua
    ├── mini-notify.lua
    ├── mini-pick.lua
    ├── mini-surround.lua
    ├── mini.lua
    ├── nvim-lspconfig.lua
    ├── nvim-treesitter-context.lua
    ├── nvim-treesitter.lua
    ├── profile.lua
    ├── rose-pine.lua
    ├── vim-fugitive.lua
    └── vim-tmux-navigator.lua
```

`require('plugins')` will load `lua/plugins/init.lua` and looks like this:

```lua
return {
    require('plugins.rose-pine'),
    require('plugins.mini'),
    require('plugins.conform'),
    require('plugins.flash'),
    require('plugins.grug-far'),
    require('plugins.vim-tmux-navigator'),
    require('plugins.mason'),
    require('plugins.nvim-lspconfig'),
    require('plugins.nvim-treesitter'),
    require('plugins.nvim-treesitter-context'),
    require('plugins.vim-fugitive'),
}
```

A table of `require` statements where each of them will be of type `Plugin`.

The specs can be very simple like for `vim-fugitive` that does not need to call a `setup()`:

```lua
return {
    src = 'https://github.com/tpope/vim-fugitive',
}
```

Or be a bit more complicated but abstracting away all the setup specs in it's `setup()`, e.g. my `mini.lua`:

```lua
return {
    src = 'https://github.com/nvim-mini/mini.nvim',
    setup = function()
        require('plugins.mini-icons')
        require('plugins.mini-notify')
        require('mini.extra').setup()
        require('mini.ai').setup()
        require('plugins.mini-clue')
        require('plugins.mini-completion')
        require('plugins.mini-files')
        require('plugins.mini-hipatterns')
        require('plugins.mini-pick')
        require('mini.pairs').setup()
        require('plugins.mini-surround')
        require('plugins.mini-diff')
    end,
}
```

Adding a new plugin is as simple as adding a new `<plugin>.lua` file and include a `require` statement in `lua/plugin/init.lua`.

Take a look at my [dotfiles](https://github.com/sschleemilch/dotfiles/tree/main/dot_config/nvim) for the final layout.
