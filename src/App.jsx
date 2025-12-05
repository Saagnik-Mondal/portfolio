import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Wave from 'react-wavify'

// Icons as SVG components
const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
  </svg>
)

const LinkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)

const WorkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
)

const ContactIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>
  </svg>
)

const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

// Social Icons
const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const YouTubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

// Wave Background Component
function WaveBackground() {
  return (
    <div className="wave-bg">
      {/* Base gradient */}
      <div className="wave-gradient"></div>
      
      {/* Multiple layered waves */}
      <Wave
        className="wave wave-1"
        fill="rgba(139, 92, 246, 0.3)"
        paused={false}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}
        options={{
          height: 40,
          amplitude: 30,
          speed: 0.15,
          points: 4
        }}
      />
      <Wave
        className="wave wave-2"
        fill="rgba(99, 102, 241, 0.25)"
        paused={false}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2 }}
        options={{
          height: 60,
          amplitude: 25,
          speed: 0.2,
          points: 3
        }}
      />
      <Wave
        className="wave wave-3"
        fill="rgba(168, 85, 247, 0.2)"
        paused={false}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}
        options={{
          height: 80,
          amplitude: 20,
          speed: 0.25,
          points: 5
        }}
      />
      <Wave
        className="wave wave-4"
        fill="rgba(236, 72, 153, 0.15)"
        paused={false}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4 }}
        options={{
          height: 100,
          amplitude: 15,
          speed: 0.12,
          points: 3
        }}
      />
      
      {/* Noise overlay for texture */}
      <div className="noise"></div>
    </div>
  )
}

// Modal Content Components
function AboutContent() {
  return (
    <>
      <div className="about-header">
        <div className="about-avatar">S</div>
        <div>
          <div className="about-name">Saagnik Mondal</div>
          <div className="about-role">Animator & AI/ML Developer</div>
        </div>
      </div>
      <p className="about-text">hey there! i'm saagnik, a creative who brings stories to life through animation while building intelligent systems with machine learning.</p>
      <p className="about-text">i love exploring where art and technology meet — currently diving deep into generative AI and procedural animation.</p>
      <div className="section-label">Currently</div>
      <div className="status-item"><span>🎬</span><span>working on an animated short film</span></div>
      <div className="status-item"><span>🧠</span><span>learning diffusion models</span></div>
      <div className="status-item"><span>🎧</span><span>listening to tycho & bonobo</span></div>
    </>
  )
}

function LinksContent() {
  const links = [
    { href: "https://github.com/Saagnik-Mondal", icon: <GitHubIcon />, label: "GitHub" },
    { href: "https://youtube.com", icon: <YouTubeIcon />, label: "YouTube" },
    { href: "https://x.com/SaagnikMondal", icon: <TwitterIcon />, label: "Twitter / X" },
    { href: "https://www.instagram.com/saagnik_mondal/", icon: <InstagramIcon />, label: "Instagram" },
    { href: "https://www.linkedin.com/in/saagnik-mondal", icon: <LinkedInIcon />, label: "LinkedIn" },
  ]

  return (
    <>
      {links.map((link, i) => (
        <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="link-item">
          <div className="link-icon">{link.icon}</div>
          <span>{link.label}</span>
        </a>
      ))}
    </>
  )
}

function WorkContent() {
  return (
    <>
      <div className="section-label">Tools</div>
      <div style={{ marginBottom: '20px' }}>
        {['After Effects', 'Blender', 'Python', 'PyTorch', 'Figma', 'Clip Studio Paint'].map((tool, i) => (
          <span key={i} className="tag">{tool}</span>
        ))}
      </div>
      <div className="section-label">Projects</div>
      <div className="work-grid">
        <div className="work-item">
          <img src="/CharacterSheet.jpg" alt="Character Sheet" />
          <div className="work-item-title">Character Design</div>
        </div>
        <div className="work-item">
          <img src="/Wallpaper copy.jpg" alt="Wallpaper" />
          <div className="work-item-title">Digital Illustration</div>
        </div>
      </div>
    </>
  )
}

function ContactContent() {
  return (
    <div style={{ textAlign: 'center', padding: '32px' }}>
      <p style={{ fontSize: '18px', color: 'var(--text-light)', marginBottom: '24px' }}>
        want to reach out? i'd love to hear from you!
      </p>
      <img src="/Chibi_Mail-removebg-preview-2.png" alt="Mail Chibi" style={{ width: '200px', height: 'auto', margin: '20px auto' }} />
      <p style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '12px' }}>email me at:</p>
      <p style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary)', marginBottom: '28px' }}>sm2744@cse.jgec.ac.in</p>
      <p style={{ fontSize: '16px', color: 'var(--text-light)', marginBottom: '24px' }}>or press the button below to open your mail app.</p>
      <a href="mailto:sm2744@cse.jgec.ac.in" className="submit-btn" style={{ padding: '18px 48px', fontSize: '18px' }}>
        Open Mail App
      </a>
    </div>
  )
}

// Modal Component with Genie Effect
function Modal({ id, title, children, onClose, zIndex, onBringToFront }) {
  const contentRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 })

  const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

  const handleClose = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    
    const content = contentRef.current
    if (!content) return
    
    const rect = content.getBoundingClientRect()
    const duration = 500
    const rowCount = 20
    const slideAnimationEndFraction = 0.5
    const translateAnimationStartFraction = 0.4
    
    const targetX = window.innerWidth / 2
    const targetY = window.innerHeight
    const targetWidth = 50
    
    const initialLeft = rect.left
    const initialRight = rect.right
    const initialTop = rect.top
    const initialBottom = rect.bottom
    const initialHeight = rect.height
    
    const leftBezierTopX = initialLeft
    const rightBezierTopX = initialRight
    const leftEdgeDistanceToMove = (targetX - targetWidth/2) - initialLeft
    const rightEdgeDistanceToMove = (targetX + targetWidth/2) - initialRight
    const verticalDistanceToMove = targetY - initialTop
    
    const bezierTopY = initialTop
    const bezierBottomY = targetY
    const bezierHeight = bezierBottomY - bezierTopY
    
    const canvas = document.createElement('canvas')
    canvas.width = window.innerWidth * window.devicePixelRatio
    canvas.height = window.innerHeight * window.devicePixelRatio
    canvas.style.cssText = `position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:${zIndex + 1};pointer-events:none;`
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    
    content.style.visibility = 'hidden'
    
    const isDark = document.body.classList.contains('dark')
    const bgColor = isDark ? '#1f2335' : '#ffffff'
    const headerColor = isDark ? '#292e42' : '#ecf0f5'
    const borderColor = isDark ? '#3b4261' : '#e0e6ed'
    
    let startTime = null
    
    function animate(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const fraction = Math.min(elapsed / duration, 1)
      
      const slideProgress = Math.max(0, Math.min(1, fraction / slideAnimationEndFraction))
      const translateProgress = Math.max(0, Math.min(1, 
        (fraction - translateAnimationStartFraction) / (1 - translateAnimationStartFraction)))
      
      const translation = easeInOutQuad(translateProgress) * verticalDistanceToMove
      const topEdgeY = initialTop + translation
      const bottomEdgeY = Math.max(initialBottom + translation, targetY)
      
      const leftBezierBottomX = leftBezierTopX + (easeInOutQuad(slideProgress) * leftEdgeDistanceToMove)
      const rightBezierBottomX = rightBezierTopX + (easeInOutQuad(slideProgress) * rightEdgeDistanceToMove)
      
      function leftBezierPosition(y) {
        if (y <= bezierTopY) return leftBezierTopX
        if (y >= bezierBottomY) return leftBezierBottomX
        const progress = easeInOutQuad((y - bezierTopY) / bezierHeight)
        return leftBezierTopX + progress * (leftBezierBottomX - leftBezierTopX)
      }
      
      function rightBezierPosition(y) {
        if (y <= bezierTopY) return rightBezierTopX
        if (y >= bezierBottomY) return rightBezierBottomX
        const progress = easeInOutQuad((y - bezierTopY) / bezierHeight)
        return rightBezierTopX + progress * (rightBezierBottomX - rightBezierTopX)
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const currentHeight = Math.max(1, bottomEdgeY - topEdgeY)
      
      for (let row = 0; row < rowCount; row++) {
        const rowFraction = row / rowCount
        const nextRowFraction = (row + 1) / rowCount
        
        const y1 = topEdgeY + (currentHeight * rowFraction)
        const y2 = topEdgeY + (currentHeight * nextRowFraction)
        
        const x1Left = leftBezierPosition(y1)
        const x1Right = rightBezierPosition(y1)
        const x2Left = leftBezierPosition(y2)
        const x2Right = rightBezierPosition(y2)
        
        ctx.beginPath()
        ctx.moveTo(x1Left, y1)
        ctx.lineTo(x1Right, y1)
        ctx.lineTo(x2Right, y2)
        ctx.lineTo(x2Left, y2)
        ctx.closePath()
        
        const originalY = initialTop + (initialHeight * rowFraction)
        const headerHeight = 44
        ctx.fillStyle = originalY < initialTop + headerHeight ? headerColor : bgColor
        ctx.fill()
        
        if (row === 0 || row === rowCount - 1) {
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      
      ctx.beginPath()
      ctx.moveTo(leftBezierPosition(topEdgeY), topEdgeY)
      for (let i = 0; i <= rowCount; i++) {
        const y = topEdgeY + (currentHeight * i / rowCount)
        ctx.lineTo(leftBezierPosition(y), y)
      }
      ctx.strokeStyle = borderColor
      ctx.lineWidth = 1
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(rightBezierPosition(topEdgeY), topEdgeY)
      for (let i = 0; i <= rowCount; i++) {
        const y = topEdgeY + (currentHeight * i / rowCount)
        ctx.lineTo(rightBezierPosition(y), y)
      }
      ctx.stroke()
      
      ctx.globalAlpha = 1 - (fraction * fraction)
      
      if (fraction < 1) {
        requestAnimationFrame(animate)
      } else {
        canvas.remove()
        onClose()
      }
    }
    
    requestAnimationFrame(animate)
  }, [isClosing, onClose, zIndex])

  const handleMouseDown = (e) => {
    if (e.target.closest('.modal-close')) return
    setIsDragging(true)
    onBringToFront()
    
    const rect = contentRef.current.getBoundingClientRect()
    if (!position) {
      setPosition({ x: rect.left, y: rect.top, width: rect.width })
    }
    
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position?.x ?? rect.left,
      posY: position?.y ?? rect.top
    }
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      e.preventDefault()
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      
      let newX = dragStart.current.posX + dx
      let newY = dragStart.current.posY + dy
      
      const rect = contentRef.current.getBoundingClientRect()
      newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width))
      newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height))
      
      setPosition(prev => ({ ...prev, x: newX, y: newY }))
    }

    const handleMouseUp = () => setIsDragging(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [handleClose])

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ zIndex }}
      onMouseDown={onBringToFront}
    >
      <motion.div
        ref={contentRef}
        className={`modal-content ${isDragging ? 'dragging' : ''}`}
        style={position ? {
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: position.width,
          maxWidth: 'none'
        } : {}}
        initial={{ scale: 0.8, y: -40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="modal-header" onMouseDown={handleMouseDown}>
          {title}
          <button className="modal-close" onClick={handleClose}>
            <ChevronDownIcon />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Mascot Component
function Mascot() {
  const [frame, setFrame] = useState(1)
  const blinkingRef = useRef(false)

  const blink = useCallback(() => {
    if (blinkingRef.current) return
    blinkingRef.current = true
    
    setFrame(2)
    setTimeout(() => {
      setFrame(3)
      setTimeout(() => {
        setFrame(2)
        setTimeout(() => {
          setFrame(1)
          blinkingRef.current = false
        }, 50)
      }, 80)
    }, 50)
  }, [])

  useEffect(() => {
    const scheduleBlink = () => {
      setTimeout(() => {
        blink()
        scheduleBlink()
      }, 2000 + Math.random() * 2500)
    }
    scheduleBlink()
  }, [blink])

  return (
    <div className="mascot" onClick={blink}>
      <img src="/Chibi_1-removebg-preview.png" alt="mascot" className={frame === 1 ? 'visible' : ''} />
      <img src="/Chibi_2-removebg-preview.png" alt="mascot" className={frame === 2 ? 'visible' : ''} />
      <img src="/Chibi_3-removebg-preview.png" alt="mascot" className={frame === 3 ? 'visible' : ''} />
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://github.com/Saagnik-Mondal" target="_blank" rel="noopener noreferrer" className="footer-link">
          <GitHubIcon size={16} />
        </a>
        <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
          <YouTubeIcon size={16} />
        </a>
        <a href="https://www.instagram.com/saagnik_mondal/" target="_blank" rel="noopener noreferrer" className="footer-link">
          <InstagramIcon size={16} />
        </a>
      </div>
      <span>© 2025 Saagnik Mondal</span>
    </footer>
  )
}

// Main App
const apps = [
  { id: 'about', label: 'about', icon: <UserIcon /> },
  { id: 'links', label: 'links', icon: <LinkIcon /> },
  { id: 'work', label: 'work', icon: <WorkIcon /> },
  { id: 'contact', label: 'contact', icon: <ContactIcon /> },
]

const modalContents = {
  about: { title: 'about', content: <AboutContent /> },
  links: { title: 'links', content: <LinksContent /> },
  work: { title: 'work', content: <WorkContent /> },
  contact: { title: 'contact', content: <ContactContent /> },
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true')
  const [openModals, setOpenModals] = useState([])
  const [modalZIndexes, setModalZIndexes] = useState({})
  const baseZIndex = useRef(200)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    localStorage.setItem('dark', dark)
  }, [dark])

  const openModal = (id) => {
    if (!openModals.includes(id)) {
      baseZIndex.current += 1
      setOpenModals(prev => [...prev, id])
      setModalZIndexes(prev => ({ ...prev, [id]: baseZIndex.current }))
    }
  }

  const closeModal = (id) => {
    setOpenModals(prev => prev.filter(m => m !== id))
  }

  const bringToFront = (id) => {
    baseZIndex.current += 1
    setModalZIndexes(prev => ({ ...prev, [id]: baseZIndex.current }))
  }

  return (
    <>
      <WaveBackground />
      
      <div className="top-controls">
        <button className="control-btn" onClick={() => setDark(!dark)} title="Toggle theme">
          <SunIcon />
        </button>
      </div>

      <main className="main-content">
        <div className="window-bar">
          <span className="window-title">home</span>
        </div>
        <div className="card-body">
          <p className="greeting">hello, i'm</p>
          <h1 className="title"><span className="name">saagnik mondal</span></h1>
          <p className="subtitle">animator & ai/ml developer</p>

          <nav className="icon-grid">
            {apps.map((app) => (
              <button key={app.id} className="icon-item" onClick={() => openModal(app.id)}>
                <div className="icon-box">{app.icon}</div>
                <span className="icon-label">{app.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </main>

      <AnimatePresence>
        {openModals.map((id) => {
          const modal = modalContents[id]
          return (
            <Modal
              key={id}
              id={id}
              title={modal.title}
              onClose={() => closeModal(id)}
              zIndex={modalZIndexes[id] || 200}
              onBringToFront={() => bringToFront(id)}
            >
              {modal.content}
            </Modal>
          )
        })}
      </AnimatePresence>

      <Mascot />
      <Footer />
    </>
  )
}
