local wezterm = require("wezterm")

local config = {}

config.font = wezterm.font("JetBrains Mono")
config.font_size = 12.0
config.color_scheme = "Tokyo Night"
config.hide_tab_bar_if_only_one_tab = true
config.default_prog = { "pwsh.exe", "-NoLogo" }

local background_state = 1
local backgroundImg = "" -- put image here (or tap control shift B for the preset backgrounds)

function Toggle_background(window)
        if background_state == 1 then
                window:set_config_overrides({
                        window_background_gradient = {
                                colors = { "#1a1b26", "#13141c" },
                                orientation = "Vertical",
                        },
                        window_background_image_hsb = {
                                brightness = 1,
                                hue = 1,
                                saturation = 1,
                        },
                        window_background_image = nil,
                        window_background_opacity = 1.0,
                })
                background_state = 2
        elseif background_state == 2 then
                window:set_config_overrides({
                        window_background_gradient = {
                                colors = { "#1a1b26", "#13141c" },
                                orientation = "Vertical",
                        },
                        window_background_image = nil,
                        window_background_opacity = 0.5,
                })
                background_state = 3
        else
                window:set_config_overrides({
                        window_background_gradient = nil,
                        window_background_image = backgroundImg,
                        window_background_image_hsb = {
                                brightness = 0.05,
                                hue = 1.0,
                                saturation = 0.9,
                        },
                        window_background_opacity = 1.0,
                })
                background_state = 1
        end
end

-- Keybindings for splitting and navigation
config.keys = {
        { key = "h", mods = "CTRL|SHIFT", action = wezterm.action.SplitHorizontal({ domain = "CurrentPaneDomain" }) },
        { key = "g", mods = "CTRL|SHIFT", action = wezterm.action.SplitVertical({ domain = "CurrentPaneDomain" }) },
        { key = "w", mods = "CTRL|SHIFT", action = wezterm.action.CloseCurrentPane({ confirm = true }) },
        { key = "t", mods = "CTRL|SHIFT", action = wezterm.action.SpawnTab("CurrentPaneDomain") },

        -- Move between panes
        { key = "LeftArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Left") },
        { key = "RightArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Right") },
        { key = "UpArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Up") },
        { key = "DownArrow", mods = "CTRL|SHIFT", action = wezterm.action.ActivatePaneDirection("Down") },

        {
                key = "B",
                mods = "CTRL|SHIFT",
                action = wezterm.action_callback(function(window)
                        Toggle_background(window)
                end),
        },
}

config.window_padding = { left = 0, right = 0, top = 0, bottom = 0 } -- Remove gaps
config.window_background_image = backgroundImg
config.window_background_image_hsb = {
        brightness = 0.05,
        hue = 1.0,
        saturation = 0.9,
}

return config
