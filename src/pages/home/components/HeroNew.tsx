import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroNew.css';

gsap.registerPlugin(ScrollTrigger);

const SUMMARY_TEXT =
  'Lập trình viên Fullstack với hơn 4 năm kinh nghiệm thực chiến trên .NET Core & Spring Boot — ' +
  'định hướng Solution Architect. Thế mạnh DDD, CQRS, tích hợp Stripe · PayPal · AI (RAG / Vector DB) ' +
  'và vận hành hạ tầng server với CI/CD tự động hóa từ code đến deploy.';

/* ─── Door Compass Rose ──────────────────── */
function DoorCompassRose({ size = 120, side = 'left' }: { size?: number; side?: 'left' | 'right' }) {
  const c = size / 2;
  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{
        position: 'absolute', opacity: 0.13, bottom: 32,
        ...(side === 'left' ? { left: 24 } : { right: 24 }),
      }}
    >
      <circle cx={c} cy={c} r={c - 3}   stroke="#3A2008" strokeWidth="0.8" />
      <circle cx={c} cy={c} r={c - 14}  stroke="#3A2008" strokeWidth="0.5" />
      <circle cx={c} cy={c} r={10}      stroke="#3A2008" strokeWidth="1" fill="rgba(58,32,8,0.1)" />
      <line x1={c} y1={5}         x2={c}       y2={size - 5} stroke="#3A2008" strokeWidth="0.6" />
      <line x1={5} y1={c}         x2={size - 5} y2={c}       stroke="#3A2008" strokeWidth="0.6" />
      <line x1={18} y1={18}       x2={size - 18} y2={size - 18} stroke="#3A2008" strokeWidth="0.4" />
      <line x1={size - 18} y1={18} x2={18}       y2={size - 18} stroke="#3A2008" strokeWidth="0.4" />
      <polygon points={`${c},8 ${c - 5},${c - 3} ${c + 5},${c - 3}`} fill="#8B2010" opacity="0.75" />
      <polygon points={`${c},${size - 8} ${c - 5},${c + 3} ${c + 5},${c + 3}`} fill="#3A2008" opacity="0.4" />
      <polygon points={`${size - 8},${c} ${c + 3},${c - 5} ${c + 3},${c + 5}`} fill="#3A2008" opacity="0.4" />
      <polygon points={`8,${c} ${c - 3},${c - 5} ${c - 3},${c + 5}`} fill="#3A2008" opacity="0.4" />
      <text x={c} y={8}        textAnchor="middle" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="bold" fill="#8B2010" opacity="0.8">N</text>
      <text x={c} y={size}     textAnchor="middle" fontSize="7" fontFamily="Montserrat, sans-serif" fill="#3A2008" opacity="0.4">S</text>
      <text x={size - 1} y={c + 3} textAnchor="end"   fontSize="7" fontFamily="Montserrat, sans-serif" fill="#3A2008" opacity="0.4">E</text>
      <text x={1} y={c + 3}    textAnchor="start" fontSize="7" fontFamily="Montserrat, sans-serif" fill="#3A2008" opacity="0.4">W</text>
    </svg>
  );
}

/* ─── Compass Rose Hero ──────────────────── */
function HeroCompassRose() {
  const needleRef = useRef<SVGGElement>(null);
  useEffect(() => {
    if (!needleRef.current) return;
    gsap.to(needleRef.current, {
      rotation: 8, transformOrigin: '50% 50%',
      duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
  }, []);
  const cx = 110; const cy = 110; const R = 100;
  return (
    <svg viewBox="0 0 220 220" className="hero-compass-rose" fill="none">
      <circle cx={cx} cy={cy} r={R}      stroke="rgba(201,162,39,0.45)" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={R - 12} stroke="rgba(201,162,39,0.25)" strokeWidth="0.6" />
      <circle cx={cx} cy={cy} r={R - 28} stroke="rgba(201,162,39,0.18)" strokeWidth="0.5" strokeDasharray="3 4" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 90 === 0;
        const inner = isMajor ? R - 22 : R - 14;
        return (
          <line key={deg}
            x1={cx + inner * Math.sin(rad)} y1={cy - inner * Math.cos(rad)}
            x2={cx + (R - 4) * Math.sin(rad)} y2={cy - (R - 4) * Math.cos(rad)}
            stroke={isMajor ? 'rgba(201,162,39,0.7)' : 'rgba(201,162,39,0.3)'}
            strokeWidth={isMajor ? 1.2 : 0.6}
          />
        );
      })}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const isCard = deg % 90 === 0;
        const tip = isCard ? R - 28 : R - 42;
        const side = isCard ? 6 : 4;
        const perp = (deg + 90) * Math.PI / 180;
        const bx = cx + 8 * Math.sin(rad); const by = cy - 8 * Math.cos(rad);
        const tx = cx + tip * Math.sin(rad); const ty = cy - tip * Math.cos(rad);
        const lx = bx + side * Math.sin(perp); const ly = by - side * Math.cos(perp);
        const rx = bx - side * Math.sin(perp); const ry = by + side * Math.cos(perp);
        const fill = isCard ? (deg === 0 ? 'rgba(200,50,30,0.85)' : 'rgba(201,162,39,0.65)') : 'rgba(201,162,39,0.35)';
        return <polygon key={deg} points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill={fill} />;
      })}
      {[{ d: 0, l: 'N' }, { d: 90, l: 'E' }, { d: 180, l: 'S' }, { d: 270, l: 'W' }].map(({ d, l }) => {
        const rad = d * Math.PI / 180;
        return (
          <text key={l}
            x={cx + (R - 6) * Math.sin(rad)} y={cy - (R - 6) * Math.cos(rad) + 4}
            textAnchor="middle" fontSize="12" fontFamily="Montserrat, sans-serif"
            fontWeight="bold" fill={d === 0 ? 'rgba(200,70,40,0.9)' : 'rgba(201,162,39,0.75)'}
          >{l}</text>
        );
      })}
      <g ref={needleRef}>
        <polygon points={`${cx},${cy - 62} ${cx - 6},${cy + 4} ${cx + 6},${cy + 4}`} fill="rgba(200,50,30,0.9)" />
        <polygon points={`${cx},${cy + 62} ${cx - 6},${cy - 4} ${cx + 6},${cy - 4}`} fill="rgba(60,40,20,0.6)" />
      </g>
      <circle cx={cx} cy={cy} r={7}   fill="rgba(201,162,39,0.8)" />
      <circle cx={cx} cy={cy} r={3.5} fill="rgba(255,240,180,0.9)" />
    </svg>
  );
}

/* ─── Maritime Route SVG ─────────────────── */
const WAYPOINTS = [
  { x: 120, y: 720, label: 'Hà Nội · 2019',   sub: 'Bắt Đầu Hải Trình', icon: '⚓' },
  { x: 340, y: 590, label: 'Intern · 2020',    sub: 'Backend Developer',  icon: '🏴' },
  { x: 570, y: 470, label: 'Mid · 2021–22',    sub: '.NET & Spring Boot',  icon: '⛵' },
  { x: 820, y: 370, label: 'Senior · 2023',    sub: 'Fullstack & DDD',     icon: '🧭' },
  { x: 1080, y: 250, label: 'Hiện Tại · 2026', sub: 'Solution Architect',  icon: '★' },
];

const ROUTE_PATH = 'M 120,720 C 220,670 280,630 340,590 C 420,545 490,505 570,470 C 660,430 740,410 820,370 C 920,328 990,290 1080,250';

function MaritimeRoute({ visible }: { visible: boolean }) {
  const pathRef   = useRef<SVGPathElement>(null);
  const dotsRef   = useRef<SVGGElement>(null);
  const labelsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!visible) {
      if (pathRef.current) gsap.set(pathRef.current, { opacity: 0 });
      return;
    }
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(path, { strokeDashoffset: 0, duration: 4, ease: 'power2.inOut' });
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('.route-dot');
      tl.to(dots, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.5, ease: 'back.out(2)' }, '-=2.5');
    }
    if (labelsRef.current) {
      const labels = labelsRef.current.querySelectorAll('.route-label-g');
      tl.to(labels, { opacity: 1, y: 0, duration: 0.5, stagger: 0.5, ease: 'power2.out' }, '-=2.5');
    }
  }, [visible]);

  return (
    <svg viewBox="0 0 1440 900" className="hero-map-route-svg" preserveAspectRatio="xMidYMid slice">
      {/* Grid */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
        <line key={`v${i}`} x1={i * 120} y1={0} x2={i * 120} y2={900}
          stroke="rgba(201,162,39,0.07)" strokeWidth="0.8" />
      ))}
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <line key={`h${i}`} x1={0} y1={i * 100} x2={1440} y2={i * 100}
          stroke="rgba(201,162,39,0.07)" strokeWidth="0.8" />
      ))}
      {/* Degree labels */}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
        <text x={i * 120 + 4} y={14}
          fontSize="8" fontFamily="Montserrat, sans-serif" fill="rgba(201,162,39,0.18)" letterSpacing="1">
          {(i * 10 + 100)}°E
        </text>
      ))}
      {[1,2,3,4,5,6,7,8].map((i) => (
        <text key={`ln${i}`} x={6} y={i * 100 + 4}
          fontSize="8" fontFamily="Montserrat, sans-serif" fill="rgba(201,162,39,0.18)" letterSpacing="1">
          {(50 - i * 5)}°N
        </text>
      ))}
      {/* Faded region labels */}
      <text x={720} y={210} textAnchor="middle" fontSize="42" fontFamily="Montserrat, sans-serif"
        fill="rgba(201,162,39,0.055)" letterSpacing="8" transform="rotate(-4,720,210)">
        MARE TECHNICORUM
      </text>
      <text x={280} y={520} textAnchor="middle" fontSize="20" fontFamily="Montserrat, sans-serif"
        fill="rgba(201,162,39,0.045)" letterSpacing="4" transform="rotate(-8,280,520)">
        TERRA INCOGNITA
      </text>
      <text x={1080} y={560} textAnchor="middle" fontSize="20" fontFamily="Montserrat, sans-serif"
        fill="rgba(201,162,39,0.045)" letterSpacing="4" transform="rotate(5,1080,560)">
        OCEANUS NOVI
      </text>
      {/* Frame labels */}
      <text x={720} y={30}  textAnchor="middle" fontSize="13" fontFamily="Montserrat, sans-serif"
        fill="rgba(201,162,39,0.22)" letterSpacing="6">SEPTENTRIO</text>
      <text x={720} y={888} textAnchor="middle" fontSize="13" fontFamily="Montserrat, sans-serif"
        fill="rgba(201,162,39,0.22)" letterSpacing="6">MERIDIES</text>
      {/* Route ghost */}
      <path d={ROUTE_PATH} stroke="rgba(201,162,39,0.1)" strokeWidth="1"
        fill="none" strokeDasharray="6 4" />
      {/* Animated route */}
      <path ref={pathRef} d={ROUTE_PATH}
        stroke="rgba(255,220,60,0.92)" strokeWidth="2.8" fill="none"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 12px rgba(255,220,60,0.8))', opacity: 0 }}
      />
      {/* Waypoint dots */}
      <g ref={dotsRef}>
        {WAYPOINTS.map((wp, i) => (
          <g key={i} className="route-dot"
            style={{ opacity: 0, transformOrigin: `${wp.x}px ${wp.y}px` }}>
            <circle cx={wp.x} cy={wp.y}
              r={i === WAYPOINTS.length - 1 ? 16 : 10}
              fill="rgba(6,13,31,0.9)"
              stroke={i === WAYPOINTS.length - 1 ? 'rgba(255,220,60,0.95)' : 'rgba(201,162,39,0.7)'}
              strokeWidth={i === WAYPOINTS.length - 1 ? 2.5 : 1.8}
              style={{ filter: i === WAYPOINTS.length - 1 ? 'drop-shadow(0 0 14px rgba(255,220,60,0.85))' : undefined }}
            />
            {i === WAYPOINTS.length - 1 ? (
              <>
                <text x={wp.x} y={wp.y + 5} textAnchor="middle" fontSize="14" fill="rgba(255,220,60,0.95)">★</text>
                <circle cx={wp.x} cy={wp.y} r={22} fill="none" stroke="rgba(255,220,60,0.35)" strokeWidth="1.5" className="pulse-ring-1" />
                <circle cx={wp.x} cy={wp.y} r={32} fill="none" stroke="rgba(255,220,60,0.15)" strokeWidth="1" className="pulse-ring-2" />
              </>
            ) : (
              <text x={wp.x} y={wp.y + 4} textAnchor="middle" fontSize="10" fill="rgba(201,162,39,0.8)">{wp.icon}</text>
            )}
          </g>
        ))}
      </g>
      {/* Labels */}
      <g ref={labelsRef}>
        {WAYPOINTS.map((wp, i) => {
          const isLast = i === WAYPOINTS.length - 1;
          const labelY = wp.y - 30;
          const offsetX = i === 0 ? 18 : i === WAYPOINTS.length - 1 ? -18 : 0;
          return (
            <g key={i} className="route-label-g"
              style={{ opacity: 0, transform: 'translateY(8px)', transformOrigin: `${wp.x}px ${labelY}px` }}>
              <line x1={wp.x} y1={wp.y - 13} x2={wp.x + offsetX} y2={labelY + 14}
                stroke="rgba(201,162,39,0.38)" strokeWidth="0.8" strokeDasharray="2 2" />
              <rect
                x={wp.x + offsetX - (isLast ? 70 : 60)} y={labelY - 20}
                width={isLast ? 140 : 120} height={34}
                rx="3" fill="rgba(6,13,31,0.85)"
                stroke="rgba(201,162,39,0.38)" strokeWidth="0.8"
              />
              <text x={wp.x + offsetX} y={labelY - 5} textAnchor="middle"
                fontSize={isLast ? '9.5' : '8.5'} fontFamily="Montserrat, sans-serif"
                fill={isLast ? 'rgba(255,220,60,0.95)' : 'rgba(201,162,39,0.85)'}
                fontWeight="600" letterSpacing="0.5">{wp.label}
              </text>
              <text x={wp.x + offsetX} y={labelY + 9} textAnchor="middle"
                fontSize="7.5" fontFamily='"Be Vietnam Pro", sans-serif' fontStyle="italic"
                fill="rgba(200,180,120,0.65)">{wp.sub}
              </text>
            </g>
          );
        })}
      </g>
      {/* Small wind rose */}
      <g transform="translate(80, 80)" opacity="0.1">
        <circle cx={0} cy={0} r={50} stroke="rgba(201,162,39,1)" strokeWidth="0.8" fill="none" />
        <circle cx={0} cy={0} r={35} stroke="rgba(201,162,39,1)" strokeWidth="0.5" fill="none" strokeDasharray="3 5" />
        {[0,45,90,135,180,225,270,315].map((d) => {
          const r = d * Math.PI / 180;
          const isCrd = d % 90 === 0;
          return <line key={d} x1={0} y1={0}
            x2={50 * Math.sin(r)} y2={-50 * Math.cos(r)}
            stroke="rgba(201,162,39,1)" strokeWidth={isCrd ? 0.8 : 0.4} />;
        })}
      </g>
      {/* Ship */}
      {visible && (
        <g transform="translate(695, 420) rotate(-15)" className="map-ship" opacity="0.5">
          <path d="M 0,-8 L -12,6 L 12,6 Z" fill="rgba(201,162,39,0.7)" />
          <line x1={0} y1={-8} x2={0} y2={-22} stroke="rgba(201,162,39,0.8)" strokeWidth="0.8" />
          <path d="M 0,-22 L -10,-12 L 0,-10 Z" fill="rgba(201,162,39,0.5)" />
        </g>
      )}
    </svg>
  );
}

/* ─── Main ─────────────────────────────── */
export default function HeroNew() {
  const [doorDone, setDoorDone] = useState(false);

  const opacityRevealRef  = useRef<HTMLParagraphElement>(null);
  const doorOverlayRef    = useRef<HTMLDivElement>(null);
  const doorLeftRef       = useRef<HTMLDivElement>(null);
  const doorRightRef      = useRef<HTMLDivElement>(null);
  const doorCrackRef      = useRef<HTMLDivElement>(null);
  const doorGlowRef       = useRef<HTMLDivElement>(null);
  const doorMonogramRef   = useRef<HTMLDivElement>(null);
  const heroSectionRef    = useRef<HTMLElement>(null);
  const mapBgRef          = useRef<HTMLDivElement>(null);
  const mapRouteWrapRef   = useRef<HTMLDivElement>(null);
  const mapVignetteRef    = useRef<HTMLDivElement>(null);
  const heroOverlayRef    = useRef<HTMLDivElement>(null);
  const titleWrapRef      = useRef<HTMLDivElement>(null);
  const scrollHintRef     = useRef<HTMLDivElement>(null);
  const compassWrapRef    = useRef<HTMLDivElement>(null);

  /* ── Door loading ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setDoorDone(true);
      },
    });
    tl.to(doorMonogramRef.current,  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 }, 0);
    tl.to({}, { duration: 1.3 });
    tl.to(doorMonogramRef.current,  { opacity: 0, y: -16, duration: 0.45, ease: 'power2.in' });
    tl.to(doorCrackRef.current,     { opacity: 1, duration: 0.4, ease: 'power2.out' });
    tl.to(doorGlowRef.current,      { opacity: 1, width: '300px', duration: 0.5, ease: 'power2.out' }, '<0.1');
    tl.to({}, { duration: 0.25 });
    tl.to(doorLeftRef.current,  { x: -30, duration: 0.2, ease: 'power2.in' }, '<');
    tl.to(doorRightRef.current, { x: 30,  duration: 0.2, ease: 'power2.in' }, '<');
    tl.to(doorLeftRef.current,  { x: '-100%', duration: 1.0, ease: 'expo.inOut' });
    tl.to(doorRightRef.current, { x: '100%',  duration: 1.0, ease: 'expo.inOut' }, '<');
    tl.to(doorGlowRef.current,  { width: '1200px', opacity: 0, duration: 1.0, ease: 'expo.inOut' }, '<');
    tl.to(doorCrackRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, '<0.25');
    tl.to(doorOverlayRef.current, { opacity: 0, duration: 0.35, ease: 'power1.in' }, '-=0.1');
    return () => { tl.kill(); document.body.style.overflow = ''; };
  }, []);

  /* ── Hero reveal + scroll zoom ── */
  useEffect(() => {
    if (!doorDone) return;

    /* 1. Title slide-in */
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      gsap.set(titleWrapRef.current, { opacity: 0, y: -18 });
      gsap.to(titleWrapRef.current, {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.4,
      });
    } else {
      gsap.set(titleWrapRef.current, { opacity: 0, x: -28 });
      gsap.to(titleWrapRef.current, {
        opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', delay: 0.4,
      });
    }

    /* 2. Compass appear */
    if (compassWrapRef.current) {
      gsap.set(compassWrapRef.current, { opacity: 0, scale: 0.8, rotation: -20 });
      gsap.to(compassWrapRef.current, {
        opacity: 0.7, scale: 1, rotation: 0,
        duration: 1.3, ease: 'back.out(1.5)', delay: 0.9,
      });
    }

    /* 3. ScrollTrigger zoom — pin hero, zoom map dramatically */
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: 'top top',
        end: '+=180%',
        pin: true,
        pinSpacing: true,
        scrub: 0.9,
        onUpdate: (self) => {
          const p = self.progress;

          /* Map background — zoom in deep */
          if (mapBgRef.current) {
            const scale = 1 + p * 0.45;          // 1.0 → 1.45
            mapBgRef.current.style.transform = `scale(${scale})`;
          }

          /* Route SVG — subtle scale */
          if (mapRouteWrapRef.current) {
            const s = 1 + p * 0.08;
            mapRouteWrapRef.current.style.transform = `scale(${s})`;
          }

          /* Vignette deepens */
          if (mapVignetteRef.current) {
            const darkBase = 0.25 + p * 0.55;
            mapVignetteRef.current.style.background = `radial-gradient(ellipse at center, rgba(6,13,31,${darkBase * 0.6}) 0%, rgba(6,13,31,${darkBase}) 55%, rgba(6,13,31,${Math.min(darkBase + 0.15, 1)}) 100%)`;
          }

          /* Overlay darkens */
          if (heroOverlayRef.current) {
            heroOverlayRef.current.style.opacity = String(0.3 + p * 0.55);
          }

          /* Title fade out after 20% scroll */
          if (titleWrapRef.current) {
            const fade = Math.max(0, 1 - (p - 0.18) / 0.3);
            const moveY = p * -55;
            const mobile = window.innerWidth <= 768;
            titleWrapRef.current.style.opacity = String(fade);
            titleWrapRef.current.style.transform = mobile
              ? `translateX(-50%) translateY(${moveY}px)`
              : `translateX(0px) translateY(${moveY}px)`;
          }

          /* Scroll hint fade out */
          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = String(Math.max(0, 1 - p * 4));
          }

          /* Compass drifts slightly */
          if (compassWrapRef.current) {
            const drift = p * 12;
            compassWrapRef.current.style.transform = `rotate(${drift}deg)`;
          }
        },
      });

      return () => { st.kill(); };
    });

    /* 4. Prologue text reveal */
    const text = opacityRevealRef.current;
    if (text) {
      const chars = text.textContent?.split('') || [];
      text.innerHTML = chars
        .map((c) => (c === ' ' ? '<span class="char">&nbsp;</span>' : `<span class="char">${c}</span>`))
        .join('');
      const charEls = text.querySelectorAll('.char');
      gsap.set(charEls, { opacity: 0.1 });
      ScrollTrigger.create({
        trigger: '.section-stick-port',
        pin: true,
        start: 'center center',
        end: '+=1800',
        scrub: 1,
        animation: gsap.timeline()
          .to(charEls, { opacity: 1, duration: 1, ease: 'none', stagger: 1 })
          .to({}, { duration: 10 })
          .to('.opacity-reveal', { opacity: 0, scale: 1.04, duration: 50 }),
      });
    }

    return () => ctx.revert();
  }, [doorDone]);

  return (
    <>
      {/* ── Parchment Doors (loading) ── */}
      {!doorDone && (
        <div className="door-overlay" ref={doorOverlayRef}>
          <div className="door-panel door-panel--left" ref={doorLeftRef}>
            <DoorCompassRose size={140} side="left" />
            <div style={{ position: 'absolute', top: 24, left: 24, width: 20, height: 20, borderTop: '1.5px solid rgba(80,40,10,0.35)', borderLeft: '1.5px solid rgba(80,40,10,0.35)' }} />
            <div style={{ position: 'absolute', bottom: 24, left: 24, width: 20, height: 20, borderBottom: '1.5px solid rgba(80,40,10,0.35)', borderLeft: '1.5px solid rgba(80,40,10,0.35)' }} />
            <div style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.55rem', letterSpacing: '0.4em', color: 'rgba(80,40,10,0.18)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              BENE NAVIGET
            </div>
          </div>
          <div className="door-panel door-panel--right" ref={doorRightRef}>
            <DoorCompassRose size={140} side="right" />
            <div style={{ position: 'absolute', top: 24, right: 24, width: 20, height: 20, borderTop: '1.5px solid rgba(80,40,10,0.35)', borderRight: '1.5px solid rgba(80,40,10,0.35)' }} />
            <div style={{ position: 'absolute', bottom: 24, right: 24, width: 20, height: 20, borderBottom: '1.5px solid rgba(80,40,10,0.35)', borderRight: '1.5px solid rgba(80,40,10,0.35)' }} />
            <div style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.55rem', letterSpacing: '0.4em', color: 'rgba(80,40,10,0.18)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              A.D. · II · MMXXVI
            </div>
          </div>
          <div className="door-crack" ref={doorCrackRef} />
          <div className="door-glow-burst" ref={doorGlowRef} />
          <div className="door-monogram" ref={doorMonogramRef}
            style={{ transform: 'translate(-50%, calc(-50% + 14px))' }}>
            <i className="door-monogram__quill ri-quill-pen-line" />
            <span className="door-monogram__label">Câu Chuyện Của</span>
            <span className="door-monogram__name">Vũ Chí Công</span>
            <span className="door-monogram__role">Senior Fullstack Developer</span>
            <span className="door-monogram__line" />
            <span className="door-monogram__subtitle">
              interact.congvu@gmail.com &nbsp;·&nbsp; victorvu-my-portfolio.info
            </span>
          </div>
        </div>
      )}

      {/* ── Hero Banner ── */}
      <main>
        <section className="hero-section" ref={heroSectionRef}>
          {/* Map background (zoom target) */}
          <div className="hero__map-bg" ref={mapBgRef} />

          {/* Vignette */}
          <div className="hero__map-vignette" ref={mapVignetteRef} />

          {/* Dark scroll overlay */}
          <div className="hero-map-overlay" ref={heroOverlayRef} />

          {/* Grid + Route SVG wrapper */}
          <div className="hero-route-wrap" ref={mapRouteWrapRef}>
            <MaritimeRoute visible={doorDone} />
          </div>

          {/* Compass rose */}
          <div className="hero-compass-wrap" ref={compassWrapRef}>
            <HeroCompassRose />
          </div>

          {/* Quill decoration */}
          <div className="hero-quill-decor">
            <i className="ri-quill-pen-line hero-quill-icon" />
            <div className="hero-quill-ink-drop" />
          </div>

          {/* Title — top left */}
          <div className="hero__title-wrap" ref={titleWrapRef}>
            <div className="hero__title-badge">
              <i className="ri-map-pin-2-line" style={{ marginRight: 7, color: 'rgba(201,162,39,0.8)' }} />
              <span>Nhật Ký Hàng Hải · Portfolio 2026</span>
            </div>
            <h1 className="hero__title">
              Vũ Chí Công
              <span className="hero__title-sub">Senior Fullstack Developer</span>
            </h1>
            <div className="hero__title-divider">
              <span className="hero__title-div-line" />
              <i className="ri-compass-3-line hero__title-div-icon" />
              <span className="hero__title-div-line" />
            </div>
            <p className="hero__title-tagline">
              "Mỗi dòng code là một chuyến ra khơi — mỗi sản phẩm là một bến cảng mới"
            </p>
          </div>

          {/* Scroll hint */}
          {doorDone && (
            <div className="hero-scroll-down" ref={scrollHintRef}>
              <span className="scroll-label">Lật trang đầu tiên</span>
              <div className="scroll-mouse"><div className="scroll-wheel" /></div>
              <div className="scroll-chevrons"><span /><span /><span /></div>
            </div>
          )}
        </section>

        {/* ── Prologue ── */}
        <section id="about" className="section-stick-port min-h-screen flex flex-col justify-center items-center px-8">
          <div className="prologue-header" style={{ maxWidth: '48rem', width: '100%' }}>
            <div className="prologue-header__rule" />
            <i className="prologue-header__quill ri-quill-pen-line" />
            <span className="prologue-header__text">Lời Mở Đầu</span>
            <i className="prologue-header__quill ri-quill-pen-line" style={{ transform: 'scaleX(-1)' }} />
            <div className="prologue-header__rule" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,160,60,0.4))' }} />
          </div>
          <p className="opacity-reveal text-center max-w-4xl leading-loose" ref={opacityRevealRef}>
            {SUMMARY_TEXT}
          </p>
        </section>
      </main>
    </>
  );
}
