import { motion } from 'framer-motion';

/* ── Seagull ─────────────────────────────────────── */
function Seagull({ x, y, scale = 1, opacity = 0.85, delay = 0 }: {
  x: string | number; y: string | number; scale?: number; opacity?: number; delay?: number;
}) {
  return (
    <motion.svg
      width={34 * scale} height={14 * scale}
      viewBox="0 0 34 14"
      fill="none"
      style={{ position: 'absolute', top: y, left: x, opacity, zIndex: 5 }}
      animate={{ x: [0, 22, 44], y: [0, -7, 0, -4, 0], opacity: [0, opacity, opacity, opacity * 0.5] }}
      transition={{ duration: 10 + delay * 1.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M0,7 Q5,0 10,6 Q14,2 17,6 Q20,2 24,6 Q29,0 34,7"
        stroke="white"
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
}

/* ── Animated Wave with foam ─────────────────────── */
function OceanWave({ bottom, fillColor, foamColor, duration, offset, zIndex = 1, height = 90 }: {
  bottom: number; fillColor: string; foamColor: string;
  duration: number; offset: number; zIndex?: number; height?: number;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', bottom, left: 0, right: 0, height, zIndex, overflow: 'hidden', pointerEvents: 'none' }}
      animate={{ x: [offset, offset - 110, offset] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 1800 90" preserveAspectRatio="none" style={{ width: '160%', height: '100%', minWidth: '160%' }}>
        {/* wave body — more dramatic peaks */}
        <path
          d="M0,42 C120,8 280,68 450,28 C620,0 780,70 960,32 C1140,0 1300,72 1480,30 C1640,2 1720,60 1800,38 L1800,90 L0,90 Z"
          fill={fillColor}
        />
        {/* thick foam crest */}
        <path
          d="M0,42 C120,8 280,68 450,28 C620,0 780,70 960,32 C1140,0 1300,72 1480,30 C1640,2 1720,60 1800,38"
          stroke={foamColor}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* secondary foam line */}
        <path
          d="M0,50 C120,18 280,76 450,38 C620,10 780,78 960,42 C1140,10 1300,80 1480,40 C1640,12 1720,68 1800,48"
          stroke={foamColor}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
          strokeDasharray="12 8"
        />
        {/* foam ellipse blobs at crests */}
        {[70,230,420,580,740,870,1030,1170,1330,1470,1620].map((cx, i) => (
          <ellipse key={i} cx={cx} cy={i % 2 === 0 ? 30 : 35} rx={16} ry={6} fill={foamColor} opacity="0.5" />
        ))}
        {/* spray dots */}
        {[55,90,210,260,400,450,560,620,720,790,860,930].map((cx, i) => (
          <circle key={i} cx={cx} cy={i % 3 === 0 ? 18 : i % 3 === 1 ? 22 : 14} r={2.5} fill={foamColor} opacity="0.45" />
        ))}
      </svg>
    </motion.div>
  );
}

/* ── Cloud ────────────────────────────────────────── */
function Cloud({ x, y, w = 140, opacity = 0.9, duration = 70 }: {
  x: string; y: string | number; w?: number; opacity?: number; duration?: number;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', top: y, left: x, zIndex: 4, pointerEvents: 'none' }}
      animate={{ x: [0, 20, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={w} height={w * 0.45} viewBox="0 0 140 63" fill="none">
        <ellipse cx="70" cy="48" rx="68" ry="15" fill={`rgba(255,255,255,${opacity * 0.4})`} />
        <ellipse cx="50" cy="38" rx="40" ry="24" fill={`rgba(255,255,255,${opacity * 0.85})`} />
        <ellipse cx="82" cy="35" rx="38" ry="26" fill={`rgba(255,255,255,${opacity * 0.9})`} />
        <ellipse cx="62" cy="30" rx="30" ry="22" fill={`rgba(255,255,255,${opacity})`} />
        <ellipse cx="95" cy="42" rx="26" ry="18" fill={`rgba(255,255,255,${opacity * 0.75})`} />
        <ellipse cx="28" cy="44" rx="22" ry="14" fill={`rgba(255,255,255,${opacity * 0.7})`} />
      </svg>
    </motion.div>
  );
}

/* ── Sailing Ship ─────────────────────────────────── */
function SailingShip() {
  return (
    <motion.div
      style={{ position: 'absolute', bottom: '32%', right: '10%', width: 160, height: 120, zIndex: 6, pointerEvents: 'none' }}
      animate={{ x: [-10, 10, -10], y: [-4, 4, -4], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 160 120" fill="none" width="160" height="120">
        {/* reflection in water */}
        <ellipse cx="80" cy="110" rx="50" ry="8" fill="rgba(255,255,255,0.12)" />
        {/* hull */}
        <path d="M28,80 Q80,94 132,80 L126,92 Q80,104 34,92 Z" fill="#3A2808" opacity="0.85" />
        <path d="M34,92 Q80,104 126,92 L128,96 Q80,106 32,96 Z" fill="#2A1C04" opacity="0.6" />
        {/* waterline shine */}
        <path d="M32,90 Q80,100 128,90" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
        {/* main mast */}
        <line x1="80" y1="16" x2="80" y2="82" stroke="#5A3810" strokeWidth="2.5" />
        {/* fore mast */}
        <line x1="54" y1="28" x2="54" y2="82" stroke="#5A3810" strokeWidth="2" />
        {/* main sail — white/cream bright */}
        <path d="M80,18 L112,48 L80,78 Z" fill="rgba(255,252,240,0.95)" stroke="#D8C890" strokeWidth="0.8" />
        <path d="M80,22 L50,46 L80,78 Z" fill="rgba(248,244,228,0.9)" stroke="#D0C080" strokeWidth="0.8" />
        {/* fore sail */}
        <path d="M54,30 L30,54 L54,78 Z" fill="rgba(255,250,230,0.85)" stroke="#D0C080" strokeWidth="0.7" />
        {/* jib sail */}
        <path d="M80,22 L54,30 L80,54 Z" fill="rgba(248,240,210,0.7)" stroke="rgba(200,180,80,0.5)" strokeWidth="0.6" />
        {/* flag */}
        <path d="M80,16 L96,21 L80,26 Z" fill="#E03020" opacity="0.9" />
        {/* rigging lines */}
        <line x1="80" y1="18" x2="112" y2="50" stroke="rgba(90,56,16,0.35)" strokeWidth="0.7" />
        <line x1="80" y1="18" x2="50" y2="48" stroke="rgba(90,56,16,0.3)" strokeWidth="0.7" />
        <line x1="80" y1="18" x2="54" y2="30" stroke="rgba(90,56,16,0.25)" strokeWidth="0.6" />
        <line x1="54" y1="30" x2="30" y2="55" stroke="rgba(90,56,16,0.25)" strokeWidth="0.6" />
        {/* wake */}
        <path d="M28,88 Q20,90 10,88" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M28,92 Q18,95 6,92" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

/* ── Sparkle foam dot on surface ─────────────────── */
function FoamSparkle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute', top: y, left: x,
        width: 6, height: 6, borderRadius: '50%',
        background: 'rgba(255,255,255,0.8)',
        zIndex: 5, pointerEvents: 'none',
      }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Data ─────────────────────────────────────────── */
const projects = [
  {
    title: 'Self-Hosted DevOps Infrastructure',
    voyageCode: 'VGE-2024-001',
    category: 'Chuyến hành trình cá nhân',
    icon: 'ri-terminal-box-line',
    image: '/images/devops_illustration.png',
    tags: ['Ubuntu Server', 'Docker', 'Jenkins', 'GitLab CI', 'Cloudflare'],
    logEntries: [
      'Thiết kế và vận hành hạ tầng Ubuntu Server cá nhân với CI/CD pipeline tự động, giúp quy trình triển khai diễn ra nhanh, ổn định và giảm tối đa thao tác thủ công.',
      'Chuẩn hóa môi trường bằng Docker để đảm bảo tính nhất quán giữa các lần build và deploy, đồng thời sử dụng Cloudflare cho DNS, SSL và lớp bảo vệ truy cập.',
      'Chủ động quản lý toàn bộ vòng đời sản phẩm từ phát triển, đóng gói, triển khai đến vận hành thực tế, thể hiện khả năng làm chủ cả khía cạnh kỹ thuật lẫn hạ tầng.',
    ],
    highlights: [
      'Full CI/CD automation · GitLab + Jenkins',
      'Auto-deploy on push · Docker Compose',
      'Cloudflare DNS · Caching · SSL',
      'Lifecycle tự chủ: code → build → ship',
    ],
    link: 'victorvu-my-portfolio.info',
  },
  {
    title: 'NewsAI',
    voyageCode: 'VGE-2026-002',
    category: 'Nền tảng AI tổng hợp và quản trị tin tức',
    icon: 'ri-newspaper-line',
    image: '/images/newsai_illustration.png',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis', 'OpenAI API', 'TTS'],
    logEntries: [
      'Xây dựng NewsAI như một nền tảng xử lý và quản trị tin tức theo pipeline hoàn chỉnh, bao gồm crawl bài viết, trích xuất nội dung, tóm tắt bằng AI, tạo audio và theo dõi toàn bộ tiến trình trên giao diện quản trị.',
      'Tổ chức kiến trúc theo hướng tách lớp với frontend Next.js, backend FastAPI cùng SQLAlchemy và PostgreSQL, trong khi các tác vụ nền được xử lý qua Celery và Redis để tối ưu hiệu năng vận hành.',
      'Định hướng sản phẩm hóa rõ ràng với khả năng cấu hình nguồn tin, chủ đề và lịch chạy, tạo nền tảng phù hợp cho cả nhu cầu nội bộ lẫn khả năng mở rộng thành sản phẩm SaaS quy mô nhỏ.',
    ],
    highlights: [
      'Pipeline nội dung: crawl -> extract -> summarize -> audio',
      'Admin dashboard theo dõi và điều phối tiến trình xử lý',
      'Kiến trúc tách lớp: models · schemas · services · api',
      'Sẵn sàng mở rộng kiểm duyệt nội dung và đánh giá nguồn tin',
    ],
    link: 'http://31.220.88.14:3000/',
    linkLabel: 'Live Demo',
  },
  {
    title: 'AI Tutor',
    voyageCode: 'VGE-2026-003',
    category: 'Nền tảng học tập AI cá nhân hóa',
    icon: 'ri-book-open-line',
    image: '/images/aitutor_illustration.png',
    tags: ['.NET 9', 'Semantic Kernel', 'Qdrant', 'SignalR', 'React', 'TypeScript', 'Ollama'],
    logEntries: [
      'Xây dựng AI Tutor như một nền tảng học tập cá nhân hóa, kết hợp Retrieval-Augmented Generation với phương pháp Socratic để tạo trải nghiệm tương tác và dẫn dắt người học theo chiều sâu.',
      'Triển khai Clean Architecture trên .NET 9 để giữ domain rõ ràng và dễ bảo trì, đồng thời sử dụng Semantic Kernel cho AI orchestration, Qdrant cho vector search và SignalR cho hội thoại thời gian thực.',
      'Thiết kế theo hướng local-first, cho phép hệ thống chạy offline với Ollama nhưng vẫn sẵn sàng tích hợp Gemini hoặc OpenAI khi cần mở rộng khả năng xử lý trên cloud.',
    ],
    highlights: [
      'RAG + Socratic learning cho trải nghiệm học tập tương tác',
      'Clean Architecture và modular monolith dễ bảo trì',
      'Local-first: offline với Ollama, online với Gemini/OpenAI',
      'Phù hợp cho cả containerized và standalone deployment',
    ],
    linkLabel: 'Private learning platform',
  },
];

const education = {
  degree: 'Công nghệ phần mềm',
  school: 'Đại học Kinh tế Kỹ thuật Công nghiệp',
  icon: 'ri-graduation-cap-line',
  note: 'Nơi chuyến hải hành khởi đầu',
  portName: 'Port of Origin',
};

/* ── Main ─────────────────────────────────────────── */
export default function ProjectsAndEducation() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#0E5A8A' }}
    >
      {/* ── Bright sky gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            #A8D8F8 0%,
            #C8EAF8 12%,
            #DEEEF8 22%,
            #EEF6FA 32%,
            #DDEEF8 42%,
            #A8D4F0 52%,
            #5AAAD8 60%,
            #2A82B8 68%,
            #1068A0 80%,
            #0A4E80 100%
          )`,
        }}
      />

      {/* Sun — bright daytime high */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '6%', left: '72%',
          width: 90, height: 90,
          background: 'radial-gradient(circle, rgba(255,255,220,1) 0%, rgba(255,240,100,0.85) 30%, rgba(255,220,60,0.3) 60%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          zIndex: 4,
        }}
      />
      {/* Sun rays */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '2%', left: '68%',
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(255,255,200,0.35) 0%, rgba(255,240,100,0.15) 40%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 3,
        }}
      />

      {/* Sun light column on water */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '38%', left: '65%',
          width: 180, height: '30%',
          background: 'linear-gradient(180deg, rgba(255,255,180,0.25) 0%, rgba(255,240,120,0.1) 60%, transparent 100%)',
          zIndex: 5,
          filter: 'blur(8px)',
          borderRadius: '50%',
        }}
      />

      {/* Horizon brightness line */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '51%', left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(200,236,255,0.6) 20%, rgba(255,255,255,0.8) 50%, rgba(200,236,255,0.6) 80%, transparent)',
          zIndex: 5,
        }}
      />

      {/* Clouds */}
      <Cloud x="4%"  y="4%"  w={180} opacity={0.95} duration={80} />
      <Cloud x="30%" y="2%"  w={140} opacity={0.9}  duration={95} />
      <Cloud x="50%" y="6%"  w={110} opacity={0.85} duration={70} />
      <Cloud x="72%" y="12%" w={130} opacity={0.8}  duration={88} />
      <Cloud x="18%" y="14%" w={90}  opacity={0.75} duration={75} />

      {/* Seagulls — bright white */}
      <Seagull x="8%"  y="8%"  scale={1.0} opacity={0.9}  delay={0}   />
      <Seagull x="18%" y="13%" scale={0.75} opacity={0.75} delay={1.5} />
      <Seagull x="5%"  y="20%" scale={0.6}  opacity={0.65} delay={3}   />
      <Seagull x="58%" y="9%"  scale={0.85} opacity={0.8}  delay={2}   />
      <Seagull x="42%" y="17%" scale={0.65} opacity={0.65} delay={4}   />
      <Seagull x="78%" y="21%" scale={0.55} opacity={0.6}  delay={1}   />

      {/* Sailing ship */}
      <SailingShip />

      {/* Ocean waves — bright blue-teal with white foam */}
      <OceanWave bottom={0}   fillColor="rgba(8,60,108,0.98)"   foamColor="rgba(255,255,255,0.92)" duration={12} offset={0}    zIndex={8}  height={110} />
      <OceanWave bottom={18}  fillColor="rgba(16,88,145,0.88)"  foamColor="rgba(255,255,255,0.82)" duration={9}  offset={-40}  zIndex={7}  height={100} />
      <OceanWave bottom={38}  fillColor="rgba(26,110,168,0.76)" foamColor="rgba(255,255,255,0.72)" duration={7}  offset={-80}  zIndex={6}  height={90}  />
      <OceanWave bottom={60}  fillColor="rgba(44,138,192,0.62)" foamColor="rgba(255,255,255,0.6)"  duration={6}  offset={-120} zIndex={5}  height={80}  />
      <OceanWave bottom={82}  fillColor="rgba(68,162,210,0.48)" foamColor="rgba(255,255,255,0.5)"  duration={5}  offset={-60}  zIndex={4}  height={72}  />
      <OceanWave bottom={104} fillColor="rgba(100,185,225,0.35)" foamColor="rgba(255,255,255,0.38)" duration={7} offset={-30}  zIndex={3}  height={64}  />

      {/* Foam sparkles on surface */}
      {[
        { x: '8%',  y: '56%', delay: 0 },
        { x: '20%', y: '58%', delay: 0.7 },
        { x: '35%', y: '55%', delay: 1.3 },
        { x: '52%', y: '57%', delay: 0.4 },
        { x: '65%', y: '54%', delay: 1.8 },
        { x: '80%', y: '56%', delay: 0.9 },
        { x: '14%', y: '60%', delay: 2.1 },
        { x: '45%', y: '59%', delay: 1.1 },
      ].map((s, i) => (
        <FoamSparkle key={i} x={s.x} y={s.y} delay={s.delay} />
      ))}

      {/* Deep ocean fill bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '35%', background: 'linear-gradient(180deg, transparent, #07304E 100%)', zIndex: 9 }}
      />

      {/* Chapter bg number */}
      <div
        className="absolute left-4 top-4 select-none pointer-events-none"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(7rem, 16vw, 14rem)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.07)',
          lineHeight: 1,
          zIndex: 10,
        }}
      >
        III
      </div>

      {/* ── Content ── */}
      <div className="relative py-28 px-6" style={{ zIndex: 12 }}>
        <div className="max-w-5xl mx-auto">

          {/* Chapter header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-3">
              <span
                className="text-xs tracking-[0.35em] uppercase font-semibold"
                style={{ color: '#1A4A6A', fontFamily: 'Cinzel, serif' }}
              >
                Chapter III
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(26,74,106,0.45), transparent)' }} />
            </div>

            <h2
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#0E3858',
                textShadow: '0 2px 16px rgba(255,255,255,0.4)',
              }}
            >
              Ra Khơi
            </h2>

            <p
              className="text-base italic max-w-xl"
              style={{ color: 'rgba(14,58,96,0.75)', fontFamily: '"Be Vietnam Pro", sans-serif', lineHeight: 1.8 }}
            >
              "Những dự án cá nhân được xây dựng từ nhu cầu khám phá công nghệ,<br />
              tư duy sản phẩm và mong muốn làm chủ toàn bộ quá trình triển khai."
            </p>
          </motion.div>

          {/* ── Voyage Log Cards ── */}
          <div className="space-y-8 mb-20">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className="rounded-sm overflow-hidden flex flex-col md:flex-row"
                  style={{
                    background: 'rgba(255,255,255,0.88)',
                    border: '1.5px solid rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 40px rgba(14,58,96,0.2), 0 2px 8px rgba(255,255,255,0.5)',
                  }}
                >
                  <div className={`w-full md:w-2/5 relative overflow-hidden bg-[#0A4E80] flex-shrink-0 h-[220px] sm:h-[260px] md:h-auto md:min-h-[300px] ${i % 2 === 1 ? 'md:order-2 md:border-l' : 'md:border-r'} border-[rgba(42,130,184,0.15)]`}>
                    {/* @ts-ignore - Image property exists in object but not strongly typed above */}
                    {(proj as any).image && (
                      <img 
                        src={(proj as any).image} 
                        alt={proj.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.55] mix-blend-luminosity filter transition-transform duration-700 group-hover:scale-105" 
                      />
                    )}
                    {/* Overlay gradient */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(14,58,96,0.65) 0%, rgba(42,130,184,0.25) 100%)'
                      }}
                    />
                    {/* Centered big icon as decoration */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-35">
                      <i className={`${proj.icon} text-[5.5rem] md:text-[7.5rem] text-white`} />
                    </div>
                  </div>

                  <div className={`w-full md:w-3/5 p-5 sm:p-6 md:p-8 flex flex-col justify-center relative ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    {/* top gradient accent restricted to the content side */}
                    <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: 'linear-gradient(90deg, #2A82B8, #5AAAD8, #88CCE8, #5AAAD8, #2A82B8)' }} />

                    {/* Header */}
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 sm:gap-5 mb-5 md:mb-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-sm flex-shrink-0"
                          style={{ background: 'rgba(42,130,184,0.1)', border: '1.5px solid rgba(42,130,184,0.3)' }}
                        >
                          <i className={`${proj.icon} text-lg sm:text-xl`} style={{ color: '#1A6898' }} />
                        </div>
                        <div>
                          <h3
                            className="text-lg sm:text-xl font-bold leading-tight"
                            style={{ fontFamily: 'Montserrat, sans-serif', color: '#0E3858', letterSpacing: '0.03em' }}
                          >
                            {proj.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs" style={{ color: 'rgba(42,130,184,0.6)', fontFamily: 'monospace' }}>
                              {proj.voyageCode}
                            </span>
                            <span className="text-xs hidden sm:inline" style={{ color: 'rgba(42,130,184,0.4)' }}>·</span>
                            <span className="text-xs italic" style={{ color: 'rgba(30,80,120,0.55)', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                              {proj.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      {proj.link ? (
                        <a
                          href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                          target="_blank"
                          rel="nofollow noreferrer"
                          className="flex items-center gap-2 text-sm px-4 py-2 rounded-sm transition-all whitespace-nowrap cursor-pointer hover:bg-[rgba(42,130,184,0.12)] self-start"
                          style={{
                            color: '#1A6898',
                            border: '1px solid rgba(42,130,184,0.35)',
                            background: 'rgba(42,130,184,0.06)',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                          }}
                        >
                          <i className="ri-compass-3-line" />
                          {proj.linkLabel || proj.link}
                        </a>
                      ) : (
                        <div
                          className="flex items-center gap-2 text-sm px-4 py-2 rounded-sm whitespace-nowrap self-start"
                          style={{
                            color: '#1A6898',
                            border: '1px solid rgba(42,130,184,0.22)',
                            background: 'rgba(42,130,184,0.04)',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                          }}
                        >
                          <i className="ri-radar-line" />
                          {proj.linkLabel ?? 'Private voyage'}
                        </div>
                      )}
                    </div>

                    {/* divider */}
                    <div className="mb-5" style={{ height: 2, background: 'repeating-linear-gradient(90deg, rgba(42,130,184,0.25) 0, rgba(42,130,184,0.25) 8px, transparent 8px, transparent 14px)' }} />

                    {/* Captain's log */}
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(26,74,106,0.5)', fontFamily: 'Cinzel, serif' }}>
                        ✦ Nhật ký thuyền trưởng
                      </p>
                      <ul className="space-y-3">
                        {proj.logEntries.map((entry, k) => (
                          <li key={k} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#1A3A5C', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                            <span className="flex-shrink-0 mt-1" style={{ color: '#2A82B8' }}>›</span>
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.tags.map((tag, j) => (
                        <span key={j} className="text-xs px-3 py-1 rounded-sm font-medium" style={{ color: '#1A6898', background: 'rgba(42,130,184,0.1)', border: '1px solid rgba(42,130,184,0.25)', fontFamily: 'monospace' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="pt-4 grid sm:grid-cols-2 gap-3" style={{ borderTop: '1px solid rgba(42,130,184,0.15)' }}>
                      {proj.highlights.map((h, k) => (
                        <div key={k} className="flex gap-2 text-sm" style={{ color: '#1A4868', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                          <span style={{ color: '#2A82B8', flexShrink: 0 }}>✦</span>
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education — Port of Origin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-[0.32em] uppercase font-semibold" style={{ color: '#1A4A6A', fontFamily: 'Cinzel, serif' }}>
                {education.portName}
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(26,74,106,0.4), transparent)' }} />
            </div>

            <div
              className="flex items-center gap-5 p-6 rounded-sm"
              style={{
                background: 'rgba(255,255,255,0.82)',
                border: '1.5px solid rgba(255,255,255,0.9)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 4px 20px rgba(14,58,96,0.15)',
              }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-sm flex-shrink-0" style={{ background: 'rgba(42,130,184,0.1)', border: '1.5px solid rgba(42,130,184,0.3)' }}>
                <i className={`${education.icon} text-2xl`} style={{ color: '#1A6898' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0E3858' }}>
                  {education.degree}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'rgba(26,74,106,0.6)', fontFamily: '"Be Vietnam Pro", sans-serif' }}>{education.school}</p>
                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-sm italic" style={{ color: '#1A6898', background: 'rgba(42,130,184,0.08)', border: '1px solid rgba(42,130,184,0.22)', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                  {education.note}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* bottom wave → dark footer */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 60, zIndex: 15 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,30 C360,58 1080,4 1440,30 L1440,60 L0,60 Z" fill="#1A0A04" />
        </svg>
      </div>
    </section>
  );
}
