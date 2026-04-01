import { useEffect, useRef } from 'react';

const TRAIL_COUNT = 8;

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -300, y: -300 });
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -300, y: -300 }))
  );
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Cursor follows mouse INSTANTLY — no easing, no lag feel
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 14}px, ${e.clientY - 24}px, 0) rotate(-40deg)`;
      }
    };

    // Trail animates via RAF with smooth easing
    const animateTrail = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? { x: mx, y: my } : trailPos.current[i - 1];
        trailPos.current[i].x += (prev.x - trailPos.current[i].x) * 0.28;
        trailPos.current[i].y += (prev.y - trailPos.current[i].y) * 0.28;

        const el = trailRefs.current[i];
        if (el) {
          const progress = (i + 1) / TRAIL_COUNT;
          const size = (1 - progress) * 6 + 1;
          const opacity = (1 - progress) * 0.7;
          el.style.transform = `translate3d(${trailPos.current[i].x - size / 2}px, ${trailPos.current[i].y - size / 2}px, 0)`;
          el.style.opacity = `${opacity}`;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
        }
      }

      rafId.current = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            borderRadius: '50%',
            backgroundColor: '#F2C84A',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      ))}

      {/* Quill cursor — no filter, no shadow, pure GPU transform */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          color: '#F2C84A',
          fontSize: '26px',
          lineHeight: 1,
          textShadow: '0 0 8px rgba(242,200,74,0.8)',
          pointerEvents: 'none',
          userSelect: 'none',
          willChange: 'transform',
        }}
      >
        <i className="ri-quill-pen-line" />
      </div>
    </div>
  );
};

export default CustomCursor;
