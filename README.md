<div align="center">

<img src="./assets/docs/gmusic-github-image.png" alt="GMusic Banner" width="100%">

# GMusic

**A native desktop YouTube Music client — Rust + Tauri, ad-free, no Electron.**

<p align="center">
  <a href="https://github.com/galyarderlabs/GMusic/releases/latest"><img alt="GitHub Downloads" src="https://img.shields.io/github/downloads/galyarderlabs/GMusic/total?style=for-the-badge&label=DOWNLOADS&color=a4c400"></a>
  <a href="https://github.com/galyarderlabs/GMusic/releases/latest"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/galyarderlabs/GMusic?display_name=release&style=for-the-badge&color=a10935"></a>
  <img alt="License" src="https://img.shields.io/github/license/galyarderlabs/GMusic?style=for-the-badge&color=1881cc">
  <br>
  <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
  <img src="https://img.shields.io/badge/Tauri_2-24C8D8?style=for-the-badge&logo=tauri&logoColor=white">
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white">
  <img src="https://img.shields.io/badge/Svelte_5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white">
</p>

**GMusic** is a customized, high-performance desktop client for YouTube Music based on [Limusic](https://github.com/SimoHypers/limusic). It communicates directly with YouTube's internal APIs and plays audio through `libmpv` without bundled Chromium runtimes or heavy Electron memory footprints.

</div>

---

## Key Features & Customizations

- **Ad-free & High-Fidelity Audio** — Direct audio stream extraction from YouTube Music with `libmpv` loudness normalization.
- **Custom Branding & Theme** — Tailored GMusic branding with native GTK titlebar decorations matching `MacTahoe-Dark`.
- **Discord Rich Presence** — Registered with Discord Application ID `1544171902451589211` displaying *"Listening to GMusic"* with album artwork and duration.
- **Last.fm Scrobbling** — Integrated Last.fm scrobbler keys compiled natively into the desktop binary.
- **Synced Lyrics** — Line-by-line & word-by-word synced lyrics via LRCLIB and Boidu.
- **Multi-Language Support** — Ships with **Bahasa Indonesia (`id`)**, English (`en`), Türkçe (`tr`), and Português do Brasil (`pt-BR`).
- **Automated CI/CD & CLI Updater** — Single-command rootless updates via `update-gmusic` tracking upstream master daily.

---

## Download & Installation

### Linux Rootless Installer (Recommended)

You can install or update GMusic directly in user-space (`~/.local/opt/gmusic`) using the `update-gmusic` CLI tool:

```bash
# Install / update latest stable release
update-gmusic

# Build and install latest nightly from upstream master
update-gmusic --build-nightly
```

Or manually download `.deb` and `.AppImage` packages directly from [GMusic Releases](https://github.com/galyarderlabs/GMusic/releases/latest).

---

## Upstream & Acknowledgements

GMusic is proudly based on the open-source [Limusic](https://github.com/SimoHypers/limusic) project by [SimoHypers](https://github.com/SimoHypers) and the playback architecture originally inspired by [Metrolist](https://github.com/mostafaalagamy/Metrolist).

---

## License

[GPL-3.0](LICENSE)
