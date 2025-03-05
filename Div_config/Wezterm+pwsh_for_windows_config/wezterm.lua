local wezterm = require("wezterm")

local config = {}

config.font = wezterm.font("JetBrains Mono")
config.font_size = 12.0
config.color_scheme = "Tokyo Night"
config.hide_tab_bar_if_only_one_tab = true
config.default_prog = { "pwsh.exe", "-NoLogo" }

-- Keybindings for splitting and navigation
config.keys = {
	{ key = "h", mods = "CTRL|SHIFT", action = wezterm.action.SplitHorizontal({ domain = "CurrentPaneDomain" }) },
	{ key = "d", mods = "CTRL|SHIFT", action = wezterm.action.SplitVertical({ domain = "CurrentPaneDomain" }) },
	{ key = "w", mods = "CTRL|SHIFT", action = wezterm.action.CloseCurrentPane({ confirm = true }) },
	{ key = "t", mods = "CTRL|SHIFT", action = wezterm.action.SpawnTab("CurrentPaneDomain") },

	-- Move between panes
	{ key = "LeftArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Left") },
	{ key = "RightArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Right") },
	{ key = "UpArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Up") },
	{ key = "DownArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Down") },
}

-- Background. (the commented out area is a nice gradient. you can change what's noted out and set opacity to make it appear nicely in front of whatever you have open in the background)
--config.window_background_gradient = {
--  colors = { "#1a1b26", "#13141c" }, -- Dark colors for a subtle gradient
--  orientation = "Vertical", -- Options: "Horizontal", "Vertical", "Radial"
--}
config.window_padding = { left = 0, right = 0, top = 0, bottom = 0 } -- Remove gaps
config.window_background_image = "" -- enter photo path here 
config.window_background_image_hsb = {
	brightness = 0.05,
	hue = 1.0,
	saturation = 0.9,
}
config.window_background_opacity = 1.0

return config
