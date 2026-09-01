import React from 'react'

interface GlassEffectProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  href?: string
  target?: string
  onClick?: () => void
  interactive?: boolean
  distort?: boolean
}

export const GlassFilter: React.FC = () => (
  <svg style={{ display: 'none' }} aria-hidden="true">
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.002 0.005"
        numOctaves="2"
        seed="23"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1.1" exponent="8" offset="0.4" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0.8" exponent="1" offset="0.4" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="4"
        specularConstant="1.2"
        specularExponent="80"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-150" y="-150" z="250" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="0.8"
        k3="0.8"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="24"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
)

export const GlassCard: React.FC<GlassEffectProps> = ({
  children,
  className = '',
  style = {},
  onClick,
  distort = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${className}`}
      style={{
        boxShadow: '0 12px 36px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        ...style,
      }}
    >
      {/* Background blur & liquid distortion layer */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl backdrop-blur-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 34, 45, 0.45) 0%, rgba(15, 17, 22, 0.7) 100%)',
          ...(distort ? { filter: 'url(#glass-distortion)' } : {}),
        }}
      />

      {/* Specular Edge Highlights */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
        style={{
          boxShadow:
            'inset 1px 1px 0.5px 0 rgba(255, 255, 255, 0.18), inset -1px -1px 0.5px 0.5px rgba(255, 255, 255, 0.04)',
        }}
      />

      {/* Subtle obsidian sheen highlight on hover */}
      <div className="pointer-events-none absolute -inset-full -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export const GlassButton: React.FC<{
  children: React.ReactNode
  href?: string
  target?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}> = ({ children, href, target, onClick, className = '', variant = 'primary' }) => {
  const isPrimary = variant === 'primary'

  const baseClasses =
    'relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold transition-all duration-500 cursor-pointer select-none active:scale-95'

  const variantStyle: React.CSSProperties = isPrimary
    ? {
        background: 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)',
        color: '#090a0d',
        boxShadow:
          '0 8px 28px -4px rgba(255, 255, 255, 0.25), inset 1.5px 1.5px 1px #ffffff, inset -1px -1px 1px rgba(0, 0, 0, 0.15)',
      }
    : {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        color: '#ffffff',
        boxShadow:
          '0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 1.5px 1.5px 1px rgba(255, 255, 255, 0.2), inset -1px -1px 1px rgba(255, 255, 255, 0.03)',
      }

  const content = (
    <div
      className={`${baseClasses} px-7 py-3.5 backdrop-blur-md hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)] ${className}`}
      style={variantStyle}
    >
      {/* Specular sheen layer */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-full" />
      <div className="relative z-10 flex items-center gap-2">{children}</div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target={target} rel="noreferrer" onClick={onClick} className="inline-block">
        {content}
      </a>
    )
  }

  return <button onClick={onClick} type="button" className="inline-block bg-transparent border-0 p-0">{content}</button>
}

export const GlassBadge: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div
    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-lg ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      boxShadow:
        '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 1px 1px 0.5px rgba(255, 255, 255, 0.25), inset -0.5px -0.5px 0.5px rgba(255, 255, 255, 0.05)',
    }}
  >
    {children}
  </div>
)
