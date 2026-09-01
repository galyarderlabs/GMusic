import { HugeiconsIcon } from '@hugeicons/react'
import {
  MusicNote01Icon,
  DashboardSpeed01Icon,
  AudioWave01Icon,
  QuoteDownIcon,
  UserMultiple02Icon,
  LibraryIcon,
  KeyboardIcon,
  LastFmIcon,
  Moon02Icon,
  RefreshIcon,
  PackageIcon,
  WindowsOldIcon,
  Apple01Icon,
  GithubIcon,
  StarIcon,
  SourceCodeIcon,
  Download01Icon,
  SparklesIcon,
} from '@hugeicons/core-free-icons'

import Aurora from '@/components/Aurora'
import SplitText from '@/components/SplitText'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'
import { GlassCard, GlassButton, GlassBadge, GlassFilter } from '@/components/LiquidGlass'
import { useGitHub, detectOS, REPO_URL, RELEASES_URL, type RepoInfo } from '@/lib/github'

import logo from '@/assets/logo.png'
import homeImg from '@/assets/home.png'
import miniplayerImg from '@/assets/miniplayer.png'
import lyricsImg from '@/assets/lyrics.png'
import browseImg from '@/assets/browse.png'
import togetherImg from '@/assets/together.png'

const FEATURES = [
  {
    icon: MusicNote01Icon,
    title: 'Zero Ads, Pure Flow',
    body: 'GMusic streams direct audio with no interruptions. No video ads, no sponsored breaks, and no premium subscription needed.',
    highlight: 'Ad-free',
  },
  {
    icon: DashboardSpeed01Icon,
    title: 'Native Rust Speed',
    body: 'Built with a native Rust core and Tauri 2 instead of an Electron browser. Opens in milliseconds and runs whisper-quiet.',
    highlight: 'Lightweight',
  },
  {
    icon: AudioWave01Icon,
    title: 'Lossless & Gapless',
    body: 'Powered by libmpv for pristine audio fidelity, seamless gapless track transitions, and intelligent loudness normalization.',
    highlight: 'libmpv audio',
  },
  {
    icon: QuoteDownIcon,
    title: 'Realtime Synced Lyrics',
    body: 'Line-by-line & word-by-word synced karaoke lyrics via LRCLIB and Boidu. Sings along with every beat.',
    highlight: 'Synced LRCLIB',
  },
  {
    icon: UserMultiple02Icon,
    title: 'Listen Together',
    body: 'Host collaborative listening rooms with end-to-end sync. One invite link lets friends tune in simultaneously.',
    highlight: 'Real-time Sync',
  },
  {
    icon: LibraryIcon,
    title: 'Your Full Library',
    body: 'Seamless YouTube Music sync. Sign in securely once to access your playlists, liked songs, history, and artist mix.',
    highlight: 'Cloud Synced',
  },
]

const EXTRAS = [
  { icon: KeyboardIcon, label: 'Global Media Keys' },
  { icon: LastFmIcon, label: 'Last.fm Scrobbler' },
  { icon: Moon02Icon, label: 'Obsidian Liquid Glass' },
  { icon: SparklesIcon, label: 'Discord Rich Presence' },
  { icon: RefreshIcon, label: 'Instant Auto-Updates' },
]

const SCREENS = [
  {
    eyebrow: 'Interface',
    title: 'Translucent, Native, Fluid',
    body: 'An ultra-refined desktop experience built with Svelte 5 and the Liquid Glass theme engine. Rich artwork washes and tactile specular details.',
    img: homeImg,
    alt: 'GMusic home interface',
    badge: 'Desktop UI',
  },
  {
    eyebrow: 'Mini Player',
    title: 'Compact & Floating Workspace',
    body: 'Dockable mini-player overlay with quick-scrub controls, live queue glance, and zero-distraction ambient cover view.',
    img: miniplayerImg,
    alt: 'GMusic mini player mode',
    badge: 'Mini Mode',
  },
  {
    eyebrow: 'Lyrics',
    title: 'Live Synced Typography',
    body: 'Lyrics lock in sync with the audio track. Active lines illuminate with frosted specular glows while background lines gently recede.',
    img: lyricsImg,
    alt: 'GMusic showing time-synced lyrics',
    badge: 'Karaoke View',
  },
  {
    eyebrow: 'Explore',
    title: 'Unlimited Music Universe',
    body: 'Explore millions of artists, albums, community playlists, and mood mixes in a blazing fast native window.',
    img: browseImg,
    alt: 'Browse and search in GMusic',
    badge: 'Catalog',
  },
  {
    eyebrow: 'Social',
    title: 'Sync Audio with Friends',
    body: 'Listen Together rooms keep volume, seek positions, and track queues synchronized across all participants instantly.',
    img: togetherImg,
    alt: 'The Listen Together dialog in GMusic',
    badge: 'Multiplayer',
  },
]

function Nav({ stars }: { stars: number | null }) {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="glass-dock pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 rounded-full px-5 py-2.5 max-w-4xl w-full">
        <a href="#" className="flex items-center gap-3 font-semibold tracking-wide text-foreground group">
          <img
            src={logo}
            alt="GMusic logo"
            className="size-7 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
          />
          <span className="font-heading text-lg font-bold text-white tracking-tight">
            GMusic
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#screens" className="transition-colors hover:text-white">
            Showcase
          </a>
          <a href="#download" className="transition-colors hover:text-white">
            Download
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 text-white/90 hover:text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 1px 1px 0.5px rgba(255, 255, 255, 0.25), 0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <HugeiconsIcon icon={GithubIcon} size={15} strokeWidth={2} />
            <span className="hidden xs:inline">GitHub</span>
            {stars !== null && (
              <span className="flex items-center gap-1 text-white/70 border-l border-white/10 pl-2">
                <HugeiconsIcon icon={StarIcon} size={12} strokeWidth={2} className="text-amber-400 fill-amber-400" />
                {stars}
              </span>
            )}
          </a>
        </div>
      </nav>
    </header>
  )
}

function Hero({
  version,
  downloadHref,
  osLabel,
}: {
  version: string | null
  downloadHref: string
  osLabel: string
}) {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Subtle Dark Obsidian ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-white/[0.04] blur-[150px] rounded-full animate-float-glow -z-10" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px] bg-slate-800/20 blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[500px] h-[500px] bg-zinc-800/25 blur-[140px] rounded-full -z-10" />

      {!window.matchMedia('(prefers-reduced-motion: reduce)').matches && (
        <div className="absolute inset-0 opacity-20 pointer-events-none -z-10" aria-hidden>
          <Aurora colorStops={['#18181b', '#27272a', '#090a0d']} amplitude={0.8} blend={0.7} speed={0.3} />
        </div>
      )}

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 z-10 flex flex-col items-center">
        <FadeContent duration={800}>
          <GlassBadge className="mb-6 border border-white/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-white/90">GMusic Desktop · Obsidian Glass</span>
          </GlassBadge>
        </FadeContent>

        <SplitText
          text="Your Music. Liquid Pure. No Ads."
          tag="h1"
          splitType="words"
          delay={90}
          duration={0.9}
          className="font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl md:text-7xl text-white drop-shadow-sm"
        />

        <FadeContent duration={900} delay={350}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            A native YouTube Music player sculpted with dark obsidian glass aesthetics, libmpv audio engine, and zero
            ad interruptions. Lightweight on memory, heavy on craft.
          </p>
        </FadeContent>

        <FadeContent duration={900} delay={500}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <GlassButton href={downloadHref} variant="primary">
              <HugeiconsIcon icon={Download01Icon} size={20} strokeWidth={2.2} />
              <span>Download for {osLabel}</span>
            </GlassButton>

            <GlassButton href={REPO_URL} target="_blank" variant="secondary">
              <HugeiconsIcon icon={GithubIcon} size={20} strokeWidth={2} />
              <span>Source Code</span>
            </GlassButton>
          </div>

          <p className="mt-4 text-xs font-medium text-muted-foreground/80">
            {version ? `Version ${version}` : 'Latest Release'} · Free &amp; Open Source (GPL-3.0)
          </p>
        </FadeContent>

        {/* Hero Image Showcase in Liquid Glass Frame */}
        <AnimatedContent distance={60} duration={1} delay={0.2} scale={0.97} threshold={0}>
          <div className="mt-14 relative group">
            {/* Ambient specular frame glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-60 blur-xl transition-all duration-700 group-hover:opacity-90 group-hover:blur-2xl" />

            <div className="relative rounded-3xl overflow-hidden glass-panel p-2 sm:p-3 border border-white/20 shadow-2xl">
              <img
                src={homeImg}
                alt="GMusic full desktop application interface"
                width={1920}
                height={1043}
                className="w-full rounded-2xl object-cover shadow-inner"
              />
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <FadeContent duration={800}>
        <div className="text-center">
          <GlassBadge className="mb-3 text-white/90">ENGINEERED FOR LISTENERS</GlassBadge>
          <h2 className="mx-auto mt-2 max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl text-white">
            Everything You Wish YouTube Music Was
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            No Electron memory hunger. No sponsored interruptions. Just high-precision audio in a bespoke interface.
          </p>
        </div>
      </FadeContent>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <AnimatedContent key={f.title} distance={40} duration={0.7} delay={i * 0.08} threshold={0.1}>
            <GlassCard className="h-full p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex size-12 items-center justify-center rounded-2xl text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
                      boxShadow: 'inset 1px 1px 1px rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <HugeiconsIcon icon={f.icon} size={24} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                    {f.highlight}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </GlassCard>
          </AnimatedContent>
        ))}
      </div>

      {/* Extras Pill Row */}
      <FadeContent duration={800} delay={150}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {EXTRAS.map(e => (
            <GlassBadge key={e.label} className="py-2 px-4 gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
              <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} className="text-white/80" />
              <span>{e.label}</span>
            </GlassBadge>
          ))}
        </div>
      </FadeContent>
    </section>
  )
}

function Screens() {
  return (
    <section id="screens" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="text-center mb-20">
        <GlassBadge className="mb-3 text-white/90">VISUAL WORLD</GlassBadge>
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-white">
          Crafted Down to Every Specular Pixel
        </h2>
      </div>

      <div className="space-y-28">
        {SCREENS.map((s, i) => (
          <AnimatedContent key={s.title} distance={50} duration={0.8} threshold={0.15}>
            <div
              className={`flex flex-col items-center gap-8 lg:gap-14 ${
                i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              <div className="lg:w-2/5 space-y-4">
                <GlassBadge className="text-white/90">{s.badge}</GlassBadge>
                <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl text-white">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {s.body}
                </p>
              </div>

              <div className="lg:w-3/5 relative group w-full">
                <div className="absolute -inset-1 rounded-3xl bg-white/5 blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative rounded-3xl overflow-hidden glass-panel p-2 sm:p-3 border border-white/20">
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={1920}
                    height={1043}
                    loading="lazy"
                    className="w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}

interface DownloadCard {
  os: string
  icon: typeof PackageIcon
  detected: boolean
  links: { label: string; href: string | null }[]
  note?: string
}

function Download({ info, os }: { info: RepoInfo; os: string }) {
  const cards: DownloadCard[] = [
    {
      os: 'Windows',
      icon: WindowsOldIcon,
      detected: os === 'windows',
      links: [
        { label: 'Installer (.exe)', href: info.exe },
        { label: 'MSI Package (.msi)', href: info.msi },
      ],
      note: 'Bundles libmpv audio & auto-updates built in.',
    },
    {
      os: 'Linux',
      icon: PackageIcon,
      detected: os === 'linux',
      links: [
        { label: 'AppImage (x86_64)', href: info.appimage },
        { label: 'Debian / Ubuntu (.deb)', href: info.deb },
        { label: 'Fedora (.rpm)', href: info.rpm },
      ],
      note: 'AppImage includes seamless in-app auto-updates.',
    },
    {
      os: 'macOS',
      icon: Apple01Icon,
      detected: os === 'mac',
      links: [{ label: 'Build from Source', href: REPO_URL }],
      note: 'Automated CI binary packaging coming soon.',
    },
  ]

  return (
    <section id="download" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <FadeContent duration={800}>
        <div className="text-center">
          <GlassBadge className="mb-3 text-white/90">INSTALLATION</GlassBadge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-white">Get GMusic Today</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Free and open-source forever. No tracker telemetry, no ads. Just clean music playback.
          </p>
        </div>
      </FadeContent>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <AnimatedContent key={c.os} distance={40} duration={0.8} delay={i * 0.1} threshold={0.15}>
            <GlassCard
              className={`p-6 sm:p-8 flex flex-col justify-between h-full ${
                c.detected ? 'ring-1 ring-white/30 shadow-[0_0_30px_rgba(255,255,255,0.06)]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-11 items-center justify-center rounded-2xl text-white"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
                        boxShadow: 'inset 1px 1px 1px rgba(255, 255, 255, 0.25)',
                      }}
                    >
                      <HugeiconsIcon icon={c.icon} size={22} strokeWidth={2} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">{c.os}</h3>
                  </div>
                  {c.detected && (
                    <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                      Your System
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  {c.links.map(l => (
                    <a
                      key={l.label}
                      href={l.href ?? RELEASES_URL}
                      className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        boxShadow: 'inset 1px 1px 0.5px rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <span className="text-white/90 group-hover:text-white transition-colors">{l.label}</span>
                      <HugeiconsIcon
                        icon={Download01Icon}
                        size={16}
                        strokeWidth={2}
                        className="text-muted-foreground group-hover:text-white group-hover:translate-y-0.5 transition-all"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {c.note && <p className="mt-6 text-xs text-muted-foreground/80 leading-relaxed">{c.note}</p>}
            </GlassCard>
          </AnimatedContent>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        {info.version && (
          <>
            Latest release <span className="font-semibold text-white">{info.version}</span> ·{' '}
          </>
        )}
        <a
          href={`${REPO_URL}/releases`}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-white transition-colors"
        >
          View all release notes &amp; architecture packages on GitHub →
        </a>
      </p>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-16 overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center text-sm text-muted-foreground sm:px-6">
        <div className="flex items-center gap-2.5 font-semibold text-foreground">
          <img src={logo} alt="GMusic" className="size-6 object-contain" />
          <span className="font-heading text-base font-bold text-white">GMusic</span>
        </div>

        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground/70">
          GMusic is an open-source, unofficial YouTube Music desktop client based on Limusic &amp; Metrolist. It is not affiliated with
          or endorsed by Google LLC or YouTube. YouTube Music is a trademark of Google LLC.
        </p>

        <div className="flex items-center gap-6 text-xs font-medium">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <HugeiconsIcon icon={GithubIcon} size={15} strokeWidth={2} /> Source Code
          </a>
          <a
            href={`${REPO_URL}/blob/master/LICENSE`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <HugeiconsIcon icon={SourceCodeIcon} size={15} strokeWidth={2} /> GPL-3.0 License
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const info = useGitHub()
  const os = detectOS()
  const osLabel = os === 'windows' ? 'Windows' : os === 'linux' ? 'Linux' : 'macOS'

  const downloadHref =
    os === 'windows'
      ? (info.exe ?? info.msi ?? '#download')
      : os === 'linux'
        ? (info.appimage ?? info.deb ?? '#download')
        : '#download'

  return (
    <div className="relative min-h-screen text-foreground antialiased selection:bg-white/20 selection:text-white">
      <GlassFilter />
      <Nav stars={info.stars} />
      <main>
        <Hero version={info.version} downloadHref={downloadHref} osLabel={osLabel} />
        <Features />
        <Screens />
        <Download info={info} os={os} />
      </main>
      <Footer />
    </div>
  )
}
