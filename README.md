# OozAmp Gel for Zen

*A Sanctum of Slime theme.* Gelatinous-cube slime for [Zen Browser](https://zen-browser.app). Everything around the web page is one pool of glowing gel. Blob tabs are stuck together with goo, the Essentials are sewer pipes pouring slime, and bubbles and skulls drift in the vat. Pull a tab out of the sidebar and it stretches like taffy, then snaps off and drips.

One look: **Neon Vat**.

## What's in it

| Piece | Made with |
|---|---|
| The gel around the page (a pre-rendered strip plus CSS), lit from below; wet yellow-chartreuse rim round the page; blob tabs sunk in the gel with goo between them; sewer-pipe Essentials; LCD address bar; solid menus; embedded fonts | CSS |
| Bubbles and skulls floating in the sidebar; now and then a bubble pops, a skull turns over or a pipe drips | JavaScript |
| Taffy stretch when you pull a tab out of the sidebar, snap at a set distance, droplet left behind, skull riding the stretch | JavaScript |

**Performance:** the gel is a still image painted once. No blur, no backdrop-filter. The only things that move are seven bubbles, five skulls and the occasional one-off moment, all using transform and opacity, which never repaints anything else. They pause whenever Zen isn't the focused window and respect your system's reduce-motion setting.

You can also drag the window from the strip of gel above the page.

## Install (Sine)

The taffy drag is JavaScript, so this needs [Sine](https://github.com/CosmoCreeper/Sine).

1. Install Sine, then restart Zen.
2. Put this folder in a GitHub repository (here `SanctumofSlime/OozAmp-zen-browser-theme`), with `theme.json` at the top level.
   If your repo has a different name, update the `image`, `readme` and `homepage` links in `theme.json`.
3. In Zen open **Settings → Sine Mods**, open Sine's settings, and turn on **installing JS from unofficial sources**.
4. Type the repo name (`SanctumofSlime/OozAmp-zen-browser-theme`) into the box under the marketplace and install it.
5. Restart Zen when Sine asks. If the script doesn't seem to load, open `about:support`, click **Clear startup cache**, and restart.

**CSS only:** if you'd rather not run JavaScript, turn the script off in Sine or delete `ooz-gel.uc.js`. Everything except the taffy drag still works.

## Settings

All in the mod's settings in Sine:

- **Unstick the tabs:** no goo between neighbouring tabs.
- **Normal font in the address bar / for the workspace name.**
- **Turn off the floating bubbles and skulls / the rare moments / the taffy stretch.**
- **Snap distance:** how far you can pull a tab before it breaks (default 90 px).
- **Skull riding the stretch:** always, sometimes or never.
- **Log to the Browser Console:** turn on when reporting a problem.

## If something looks wrong

This was built against Zen's DOM as of November 2026. Zen updates can rename things. Helpful things to send:

1. A screenshot of the problem.
2. Your Zen version (`about:support`) and whether you use compact mode, a right-side sidebar, or other mods.
3. For drag problems: turn on **Log drags to the Browser Console**, reproduce it, then copy anything mentioning `OozAmp Gel` from the Browser Console (`Ctrl/Cmd + Shift + J`).

## Credits

- Theme, art direction and the slime skull character: Sanctum of Slime.
- Built with Claude, an AI model by Anthropic, under Sanctum of Slime's direction.
- Fonts: Rubik Wet Paint, Silkscreen and VT323, all under the SIL Open Font License 1.1 (see the `OFL-*.txt` files).
