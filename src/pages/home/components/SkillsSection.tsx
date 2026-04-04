import { motion } from 'framer-motion';

/* ── Cargo Crate Component ─────────────────────────── */
function Crate({
  number,
  category,
  icon,
  skills,
  stampColor,
  delay = 0,
}: {
  number: string;
  category: string;
  icon: string;
  skills: string[];
  stampColor: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.55, delay }}
      viewport={{ once: true }}
      className="relative group"
      style={{
        background: 'linear-gradient(145deg, #C89248 0%, #B47A30 40%, #C08838 100%)',
        border: '2px solid #8B5A18',
        borderRadius: '2px',
        boxShadow: '4px 4px 16px rgba(40,20,0,0.35), inset 0 1px 0 rgba(255,220,140,0.25)',
      }}
    >
      {/* Wood grain lines */}
      <div
        className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 14px,
              rgba(0,0,0,0.06) 14px,
              rgba(0,0,0,0.06) 15px
            )
          `,
        }}
      />

      {/* Iron corner brackets */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-5 h-5 pointer-events-none z-10`}
          style={{
            borderTop:    i < 2 ? '3px solid #504030' : 'none',
            borderBottom: i >= 2 ? '3px solid #504030' : 'none',
            borderLeft:   i % 2 === 0 ? '3px solid #504030' : 'none',
            borderRight:  i % 2 === 1 ? '3px solid #504030' : 'none',
          }}
        />
      ))}

      {/* Horizontal band */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: '38%', height: '3px', background: 'rgba(80,60,20,0.35)' }}
      />
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: 'calc(38% + 5px)', height: '1px', background: 'rgba(80,60,20,0.2)' }}
      />

      {/* Stencil stamp — top-right */}
      <div
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full z-10"
        style={{
          background: `rgba(${stampColor},0.15)`,
          border: `1.5px solid rgba(${stampColor},0.5)`,
          fontFamily: 'Cinzel, serif',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: `rgba(${stampColor},0.85)`,
          letterSpacing: '0.05em',
        }}
      >
        {number}
      </div>

      {/* Inner label */}
      <div className="relative z-10 p-5 pt-4">
        {/* Category header */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-sm flex-shrink-0"
            style={{ background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,210,100,0.2)' }}
          >
            <i className={`${icon} text-sm`} style={{ color: 'rgba(255,220,130,0.9)' }} />
          </div>
          <h3
            className="text-sm font-bold leading-snug uppercase tracking-widest"
            style={{
              fontFamily: '"Be Vietnam Pro", sans-serif',
              color: 'rgba(255,235,160,0.95)',
              fontSize: '0.65rem',
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.18em',
            }}
          >
            {category}
          </h3>
        </div>

        {/* Divider — rope style */}
        <div
          className="mb-3"
          style={{
            height: '2px',
            background: 'repeating-linear-gradient(90deg, rgba(255,200,80,0.4) 0, rgba(255,200,80,0.4) 6px, transparent 6px, transparent 10px)',
          }}
        />

        {/* Skills list */}
        <ul className="space-y-1.5">
          {skills.map((skill, j) => (
            <li
              key={j}
              className="flex items-center gap-2 text-xs leading-snug"
              style={{ color: 'rgba(255,235,190,0.85)', fontFamily: 'monospace' }}
            >
              <span style={{ color: 'rgba(255,200,80,0.6)', fontSize: '0.5rem' }}>◆</span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── Barrel Component (for small extras) ─────────── */
function ExploreItem({ label, icon, delay = 0 }: { label: string; icon: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center gap-2 cursor-default group"
    >
      {/* Barrel shape */}
      <div
        className="w-20 h-20 flex flex-col items-center justify-center relative"
        style={{
          background: 'linear-gradient(180deg, #3A2208 0%, #2A1804 50%, #3A2208 100%)',
          borderRadius: '36% / 20%',
          border: '2px solid #5A3810',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,180,60,0.1)',
        }}
      >
        {/* barrel bands */}
        {[28, 48].map((top) => (
          <div
            key={top}
            className="absolute left-0 right-0"
            style={{ top, height: '3px', background: 'rgba(200,140,40,0.35)', borderRadius: '50%' }}
          />
        ))}
        <i className={`${icon} text-base relative z-10`} style={{ color: 'rgba(255,200,80,0.75)' }} />
      </div>
      <span
        className="text-xs text-center leading-tight"
        style={{
          color: 'rgba(255,220,150,0.8)',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.58rem',
          letterSpacing: '0.08em',
          maxWidth: 80,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ── Cargo Data ──────────────────────────────────── */
const crates = [
  {
    number: 'C-01',
    category: 'Backend Engineering',
    icon: 'ri-server-line',
    stampColor: '200,120,40',
    skills: ['ASP.NET Core (Web API, MVC)', 'Entity Framework Core', 'Java Spring Boot', 'JPA / Hibernate', 'SignalR (real-time)', 'Background Services'],
  },
  {
    number: 'C-02',
    category: 'System Architecture',
    icon: 'ri-building-4-line',
    stampColor: '160,100,220',
    skills: ['Domain-Driven Design (DDD)', 'CQRS Pattern', 'Clean Architecture', 'Event-driven Design', 'Design Patterns', 'SOLID Principles'],
  },
  {
    number: 'C-03',
    category: 'Database & Performance',
    icon: 'ri-database-2-line',
    stampColor: '60,180,160',
    skills: ['SQL Server', 'PostgreSQL', 'MySQL', 'Oracle DB', 'Query Optimization', 'Indexing & Execution Plans'],
  },
  {
    number: 'C-04',
    category: 'DevOps & Infrastructure',
    icon: 'ri-settings-3-line',
    stampColor: '80,180,100',
    skills: ['Docker & Docker Compose', 'Jenkins self-hosted', 'GitHub Actions', 'GitLab CI', 'Ubuntu Server', 'Cloudflare · AWS (EC2, S3)'],
  },
  {
    number: 'C-05',
    category: 'Payment & Integration',
    icon: 'ri-secure-payment-line',
    stampColor: '220,160,40',
    skills: ['Stripe', 'PayPal', 'SePay', 'Webhook Handling', 'Retry Mechanism', 'Transaction Consistency'],
  },
  {
    number: 'C-06',
    category: 'Frontend',
    icon: 'ri-layout-line',
    stampColor: '80,160,220',
    skills: ['ReactJS', 'Redux', 'KendoReact', 'HTML / CSS', 'Bootstrap', 'Webpack'],
  },
];

const futureBarrels = [
  { label: 'Solution Architect', icon: 'ri-compass-3-line' },
  { label: 'Technical Lead',    icon: 'ri-user-star-line' },
  { label: 'RAG & Vector DB',   icon: 'ri-robot-line' },
  { label: 'AI-Driven Dev',     icon: 'ri-sparkling-2-line' },
  { label: 'Cursor · Antigravity', icon: 'ri-magic-line' },
];

/* ── Main ─────────────────────────────────────────── */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(175deg, #1E0E04 0%, #2A1608 30%, #1A0C04 70%, #120804 100%)',
      }}
    >
      {/* plank texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent 0px, transparent 80px,
              rgba(255,180,60,0.025) 80px, rgba(255,180,60,0.025) 82px
            ),
            repeating-linear-gradient(
              180deg,
              transparent 0px, transparent 120px,
              rgba(0,0,0,0.15) 120px, rgba(0,0,0,0.15) 122px
            )
          `,
        }}
      />

      {/* lantern glow top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -80, left: '15%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(255,160,40,0.14) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* lantern glow right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%', right: -60,
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(200,120,30,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Chapter bg number */}
      <div
        className="absolute right-6 top-6 select-none pointer-events-none"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          fontWeight: 700,
          color: 'rgba(200,140,40,0.05)',
          lineHeight: 1,
        }}
      >
        II
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Manifest title block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* manifest document */}
          <div
            className="relative p-7 max-w-lg"
            style={{
              background: 'rgba(240,220,160,0.06)',
              border: '1px solid rgba(200,160,60,0.25)',
              borderRadius: '2px',
            }}
          >
            {/* document corner fold */}
            <div
              className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
              style={{
                background: 'linear-gradient(225deg, rgba(200,140,40,0.2) 50%, transparent 50%)',
              }}
            />

            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: '#C89040', fontFamily: 'Cinzel, serif' }}
              >
                Chapter II
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(200,160,60,0.4), transparent)' }} />
              <span className="text-xs" style={{ color: 'rgba(200,160,60,0.3)', fontFamily: 'monospace' }}>
                MANIFEST · A.D. 2026
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold mb-2 leading-tight"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#F5E2A0',
                textShadow: '0 2px 20px rgba(200,140,40,0.3)',
              }}
            >
              Hành Trang
            </h2>

            <div
              className="mb-3"
              style={{
                height: '1px',
                background: 'repeating-linear-gradient(90deg, rgba(200,160,60,0.35) 0, rgba(200,160,60,0.35) 8px, transparent 8px, transparent 14px)',
              }}
            />

            <p
              className="text-sm italic leading-relaxed"
              style={{ color: 'rgba(220,190,120,0.65)', fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              "Tập hợp các kỹ năng cốt lõi, công cụ triển khai và tư duy kiến trúc được tích lũy qua những dự án thực tế."
            </p>
          </div>

          {/* manifest summary row */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { label: 'Số kiện hàng', value: '06 CRATES' },
              { label: 'Kinh nghiệm',  value: '4+ YEARS' },
              { label: 'Trạng thái',   value: 'READY FOR SCALE' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-sm"
                style={{
                  background: 'rgba(200,140,40,0.07)',
                  border: '1px solid rgba(200,140,40,0.2)',
                }}
              >
                <span className="text-xs" style={{ color: 'rgba(200,160,80,0.5)', fontFamily: 'monospace' }}>
                  {item.label}:
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: '#C89040', fontFamily: 'Cinzel, monospace', letterSpacing: '0.08em' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Crate Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {crates.map((crate, i) => (
            <Crate
              key={i}
              number={crate.number}
              category={crate.category}
              icon={crate.icon}
              skills={crate.skills}
              stampColor={crate.stampColor}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* ── Future Cargo — Barrels section ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-sm p-8"
          style={{
            background: 'rgba(255,180,60,0.04)',
            border: '1px solid rgba(200,140,40,0.2)',
          }}
        >
          {/* wax seal top-center */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full"
            style={{
              background: '#8B2010',
              border: '2px solid #C84020',
              boxShadow: '0 2px 8px rgba(139,32,16,0.5)',
            }}
          >
            <i className="ri-compass-discover-line text-xs" style={{ color: '#F5E0D0' }} />
          </div>

          <div className="text-center mb-6">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-1"
              style={{ color: 'rgba(200,140,40,0.5)', fontFamily: 'Cinzel, serif' }}
            >
              Đặt trước · Chuyến tới
            </p>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#F0D080' }}
            >
              Hàng Hóa Tương Lai
            </h3>
            <p
              className="text-xs mt-1 italic"
              style={{ color: 'rgba(200,180,100,0.5)', fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              Những định hướng đang được đầu tư để mở rộng chiều sâu kỹ thuật trong giai đoạn tiếp theo.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {futureBarrels.map((barrel, i) => (
              <ExploreItem
                key={i}
                label={barrel.label}
                icon={barrel.icon}
                delay={0.1 + i * 0.07}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* bottom transition → bright ocean sky */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 56 }}>
        <svg viewBox="0 0 1440 56" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="#A8D8F8" />
        </svg>
      </div>
    </section>
  );
}
