-- Pull in the wezterm API
local wezterm = require 'wezterm'

-- This will hold the configuration.
local config = wezterm.config_builder()

-- This is where you actually apply your config choices

-- For example, changing the color scheme:
config.color_scheme = 'ayu'
config.font_size = 16
config.font = wezterm.font 'GeistMono Nerd Font Mono'
config.window_padding = {
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
}
config.window_decorations = "RESIZE"

-- and finally, return the configuration to wezterm
return config
