# OozAmp Gel for Zen

*A Sanctum of Slime theme.* Gelatinous-cube slime for [Zen Browser](https://zen-browser.app): blob tabs stuck together with goo, a dripping caution bar with skulls suspended in it, sticky strings gluing the sidebar to the page, and tabs that stretch like taffy when you pull them out, then snap off and drip.

Two looks that follow Zen's light/dark setting: **Neon Vat** (dark) and **Full Pour** (light).

## What's in it

| Piece | Made with |
|---|---|
| Colours, embedded fonts, blob tabs, goo between tabs, pipe-mouth Essentials, LCD address bar, glowing page frame, solid menus | CSS |
| Dripping caution bar with suspended skulls, sticky-strings sidebar edge | CSS, using two pre-rendered images |
| Taffy stretch when you pull a tab out of the sidebar, snap at a set distance, droplet left behind, skull riding the stretch | JavaScript (`ooz-gel.uc.js`) |

**Performance:** nothing animates while you browse. No blur, no backdrop-filter, no looping animations. The goo art is still images drawn once. The script only runs while you're dragging a tab: one shape and a few transforms per frame.

## Install (Sine)

The taffy drag is JavaScript, so this needs [Sine](https://github.com/CosmoCreeper/Sine).

1. Install Sine, then restart Zen.
2. Put this folder in a GitHub repository (for example `SanctumOfSlime/oozamp-zen`), with `theme.json` at the top level.
   If your repo has a different name, update the `image`, `readme` and `homepage` links in `theme.json`.
3. In Zen open **Settings → Sine Mods**, open Sine's settings, and turn on **installing JS from unofficial sources**.
4. Type the repo name (`SanctumOfSlime/oozamp-zen`) into the box under the marketplace and install it.
5. Restart Zen when Sine asks. If the script doesn't seem to load, open `about:support`, click **Clear startup cache**, and restart.

**CSS only:** if you'd rather not run JavaScript, turn the script off in Sine or delete `ooz-gel.uc.js`. Everything except the taffy drag still works.

## Settings

All in the mod's settings in Sine:

- **Mode:** follow Zen, or pin Neon Vat or Full Pour.
- **Hide the dripping bar / Hide the sticky strings / Unstick the tabs:** switch off any piece you don't want.
- **Normal font in the address bar / for the workspace name:** if you'd rather not have the LCD or drippy lettering there.
- **Turn off the taffy stretch.**
- **Snap distance:** how far you can pull before it breaks (default 120 px).
- **Skull riding the stretch:** always, sometimes or never.
- **Log drags to the Browser Console:** turn on when reporting a drag problem.

The script also respects your system's *reduce motion* setting.

## If something looks wrong

This was built against Zen's DOM as of November 2026. Zen updates can rename things. Helpful things to send:

1. A screenshot of the problem.
2. Your Zen version (`about:support`) and whether you use compact mode, a right-side sidebar, or other mods.
3. For drag problems: turn on **Log drags to the Browser Console**, reproduce it, then copy anything mentioning `OozAmp Gel` from the Browser Console (`Ctrl/Cmd + Shift + J`).

## Credits

- Theme, art direction and the slime skull character: Sanctum of Slime.
- Built with Claude, an AI model by Anthropic, under Sanctum of Slime's direction.
- Fonts: Rubik Wet Paint, Silkscreen and VT323, all under the SIL Open Font License 1.1 (see the `OFL-*.txt` files).
