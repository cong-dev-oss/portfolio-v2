import { motion } from 'framer-motion';

/* ── Compass Rose SVG ─────────────────────────────── */
function CompassRose({ size = 200, opacity = 0.18 }: { size?: number; opacity?: number }) {
  const c = size / 2;
  const r = size / 2 - 4;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ opacity }}>
      {/* outer rings */}
      <circle cx={c} cy={c} r={r}     stroke="#3A2810" strokeWidth="0.8" />
      <circle cx={c} cy={c} r={r - 10} stroke="#3A2810" strokeWidth="0.5" />
      <circle cx={c} cy={c} r={r - 24} stroke="#3A2810" strokeWidth="0.5" strokeDasharray="3 3" />
      <circle cx={c} cy={c} r={12}    stroke="#3A2810" strokeWidth="1" fill="rgba(58,40,16,0.1)" />
      {/* cross hair lines */}
      <line x1={c} y1={6}        x2={c}      y2={size - 6} stroke="#3A2810" strokeWidth="0.6" />
      <line x1={6} y1={c}        x2={size-6} y2={c}        stroke="#3A2810" strokeWidth="0.6" />
      {/* diagonal lines */}
      <line x1={20} y1={20}      x2={size-20} y2={size-20} stroke="#3A2810" strokeWidth="0.4" />
      <line x1={size-20} y1={20} x2={20}      y2={size-20} stroke="#3A2810" strokeWidth="0.4" />
      {/* N arrow (bold red) */}
      <polygon points={`${c},12 ${c-7},${c-4} ${c+7},${c-4}`} fill="#8B2010" opacity="0.8" />
      <polygon points={`${c},${c+4} ${c-7},${c+26} ${c+7},${c+26}`} fill="#3A2810" opacity="0.45" />
      {/* E arrow */}
      <polygon points={`${size-12},${c} ${c+4},${c-7} ${c+4},${c+7}`} fill="#3A2810" opacity="0.45" />
      {/* W arrow */}
      <polygon points={`12,${c} ${c-4},${c-7} ${c-4},${c+7}`} fill="#3A2810" opacity="0.45" />
      {/* S arrow */}
      <polygon points={`${c},${size-12} ${c-7},${c-26} ${c+7},${c-26}`} fill="#3A2810" opacity="0.35" />
      {/* cardinal labels */}
      <text x={c}      y={9}       textAnchor="middle" fontSize="10" fontFamily="serif" fontWeight="bold" fill="#8B2010" opacity="0.9">N</text>
      <text x={c}      y={size-1}  textAnchor="middle" fontSize="9"  fontFamily="serif" fill="#3A2810" opacity="0.5">S</text>
      <text x={size-2} y={c+3}     textAnchor="end"    fontSize="9"  fontFamily="serif" fill="#3A2810" opacity="0.5">E</text>
      <text x={2}      y={c+3}     textAnchor="start"  fontSize="9"  fontFamily="serif" fill="#3A2810" opacity="0.5">W</text>
      {/* tick marks */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 16;
        const inner = r - 6;
        const outer = r - 2;
        const x1 = c + inner * Math.sin(angle);
        const y1 = c - inner * Math.cos(angle);
        const x2 = c + outer * Math.sin(angle);
        const y2 = c - outer * Math.cos(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3A2810" strokeWidth="0.8" />;
      })}
    </svg>
  );
}

/* ── Route dot ───────────────────────────────────── */
function PortDot({ label }: { label: string }) {
  return (
    <div className="relative flex flex-col items-center" style={{ zIndex: 2 }}>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{
          background: '#8B2010',
          border: '2px solid #F0E2B0',
          boxShadow: '0 0 0 3px rgba(139,32,16,0.25)',
        }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: '#F5E6C0' }} />
      </div>
      <span
        className="mt-1 text-xs whitespace-nowrap"
        style={{ color: '#8B2010', fontFamily: 'Montserrat, sans-serif', fontSize: '0.55rem', letterSpacing: '0.12em', fontWeight: 600 }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────── */
const ports = [
  {
    portName: 'Green Ruby — Cruise Booking',
    coords: '21°02\'N  105°51\'E',
    subtitle: 'Multi-market Booking & Payment Platform · AMITECH',
    icon: 'ri-ship-2-line',
    year: '2021 – nay',
    points: [
      'Thiết kế payment flow theo mô hình idempotent + retry-safe cho luồng thanh toán đa quốc gia (Stripe, PayPal, SePay) — xử lý webhook với cơ chế deduplication, loại trừ hoàn toàn rủi ro duplicate transaction trong môi trường phân tán.',
      'Xây dựng real-time state synchronization giữa Payment ↔ Booking bằng event-driven pattern; phân tách domain service độc lập (Pricing / Booking / Payment) theo DDD, đưa tỷ lệ lệch trạng thái đơn hàng về gần 0%.',
    ],
    tags: ['Stripe', 'PayPal', 'SePay', 'DDD', 'Idempotency', 'Event-Driven', 'SignalR'],
  },
  {
    portName: 'Carbon Ledger — GHG Inventory',
    coords: '10°47\'N  106°42\'E',
    subtitle: 'National Greenhouse Gas Reporting System · Government',
    icon: 'ri-leaf-line',
    year: '2022 – 2023',
    points: [
      'Áp dụng DDD-lite để cô lập hoàn toàn domain logic tính toán phát thải khỏi tầng infrastructure; kết hợp SQL indexing strategy và query restructuring giúp giảm thời gian tổng hợp báo cáo từ 50% đến 70%.',
      'Thiết kế kiến trúc dashboard theo nguyên tắc open/closed — module mới từ các bộ ngành được onboard mà không chạm vào core, đảm bảo khả năng mở rộng dài hạn cho hệ thống cấp quốc gia.',
    ],
    tags: ['DDD-lite', 'SQL Optimization', 'Modular Architecture', 'Gov Report', 'Multi-Agency'],
  },
  {
    portName: 'Iron Grid — Healthcare & Power',
    coords: '16°04\'N  108°13\'E',
    subtitle: 'Hospital Guarantee & Power Grid Digitization · AMITECH',
    icon: 'ri-hospital-line',
    year: '2023 – nay',
    points: [
      'Xây dựng API Gateway tập trung điều phối đa hệ thống y tế; triển khai background workers kết hợp WebSocket (SignalR) để sync dữ liệu bảo lãnh viện phí và cập nhật trạng thái realtime tới client.',
      'Chuẩn hóa geospatial data (GeoJSON → normalized schema) và tái cấu trúc API response format, cải thiện đáng kể tốc độ render biểu đồ Highcharts trên dashboard lưới điện phân phối.',
    ],
    tags: ['API Gateway', 'WebSocket', 'SignalR', 'Highcharts', 'GeoJSON', 'Background Workers'],
  },
];

/* ── Main ─────────────────────────────────────────── */
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #F2E4B4 0%, #EDD9A0 25%, #F0E2B0 55%, #E8D498 100%)',
      }}
    >
      {/* map grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(58,40,16,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,40,16,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* aged vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(100,60,10,0.18) 100%)',
        }}
      />

      {/* stain spots — vintage effect */}
      <div className="absolute top-16 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,90,20,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-32 left-16 w-64 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100,60,10,0.07) 0%, transparent 70%)' }} />

      {/* Large compass rose — top right bg */}
      <div className="absolute top-8 right-8 pointer-events-none hidden lg:block">
        <CompassRose size={260} opacity={0.22} />
      </div>

      {/* Small compass — bottom left */}
      <div className="absolute bottom-16 left-8 pointer-events-none hidden lg:block">
        <CompassRose size={120} opacity={0.14} />
      </div>

      {/* Decorative border corners */}
      {[
        'top-4 left-4 border-t border-l',
        'top-4 right-4 border-t border-r',
        'bottom-4 left-4 border-b border-l',
        'bottom-4 right-4 border-b border-r',
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-12 h-12 pointer-events-none ${cls}`}
          style={{ borderColor: 'rgba(58,40,16,0.3)' }}
        />
      ))}

      {/* coordinate labels along edges */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:flex flex-col gap-8">
        {['16°N', '14°N', '12°N', '10°N'].map((c) => (
          <span key={c} className="text-xs" style={{ color: 'rgba(58,40,16,0.3)', fontFamily: 'monospace', letterSpacing: '0.05em', writingMode: 'horizontal-tb' }}>
            {c}
          </span>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Cartouche Title Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-20 flex flex-col items-start"
        >
          {/* cartouche decorative frame */}
          <div
            className="relative p-8 pr-16"
            style={{
              border: '1.5px solid rgba(58,40,16,0.28)',
              borderRadius: '4px 40px 4px 40px',
              background: 'rgba(240,226,176,0.55)',
              backdropFilter: 'blur(2px)',
              maxWidth: 520,
            }}
          >
            <div className="absolute -top-2.5 left-6">
              <span
                className="px-3 text-xs tracking-[0.32em] uppercase"
                style={{
                  color: '#8B2010',
                  fontFamily: 'Montserrat, sans-serif',
                  background: '#EDD9A0',
                  letterSpacing: '0.3em',
                }}
              >
                Chapter I
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl mb-3 leading-none"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#3A2810', fontWeight: 700, letterSpacing: '0.04em' }}
            >
              Hành Trình
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(58,40,16,0.4), rgba(58,40,16,0.1))' }} />
              <span style={{ color: 'rgba(58,40,16,0.4)', fontSize: '0.7rem', fontFamily: 'monospace' }}>✦ ✦ ✦</span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(58,40,16,0.1), rgba(58,40,16,0.4))' }} />
            </div>

            <p
              className="text-sm leading-relaxed italic"
              style={{ color: '#6B4820', fontFamily: '"Be Vietnam Pro", sans-serif', maxWidth: 380 }}
            >
              "4+ năm xây dựng hệ thống thực tế với quy mô doanh nghiệp — từ payment platform đa quốc gia, báo cáo cấp chính phủ, đến hạ tầng y tế và lưới điện. Mỗi dự án là một bài toán kiến trúc cụ thể, không phải bài tập kỹ thuật."
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded"
                style={{ background: 'rgba(139,32,16,0.08)', border: '1px solid rgba(139,32,16,0.2)' }}
              >
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse inline-block" />
                <span className="text-xs font-semibold" style={{ color: '#8B2010', fontFamily: 'monospace' }}>
                  AMITECH · 06/2021 - Hiện tại
                </span>
              </div>
            </div>

            {/* decorative corner ornaments */}
            {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3`}
                style={{ background: 'rgba(58,40,16,0.25)', borderRadius: i % 2 === 0 ? '50% 0 50% 0' : '0 50% 0 50%' }} />
            ))}
          </div>
        </motion.div>

        {/* ── Sea Route Timeline ── */}
        <div className="relative">
          {/* vertical route line */}
          <div
            className="absolute left-[18px] top-8 bottom-8 w-px hidden md:block"
            style={{
              background: 'repeating-linear-gradient(180deg, #8B2010 0, #8B2010 6px, transparent 6px, transparent 14px)',
              opacity: 0.5,
            }}
          />

          <div className="space-y-10">
            {ports.map((port, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex gap-6 md:gap-10"
              >
                {/* Port dot */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0">
                  <PortDot label={`Port ${['I', 'II', 'III'][i]}`} />
                </div>

                {/* Port card */}
                <div
                  className="flex-1 rounded-sm p-6 hover:-translate-y-0.5 transition-all duration-200 group relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,234,192,0.9) 0%, rgba(240,226,170,0.85) 100%)',
                    border: '1px solid rgba(58,40,16,0.22)',
                    boxShadow: '3px 3px 12px rgba(100,60,10,0.12), inset 0 1px 0 rgba(255,248,220,0.6)',
                  }}
                >
                  {/* top fold corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
                    style={{
                      background: 'linear-gradient(225deg, rgba(100,60,10,0.12) 50%, transparent 50%)',
                      borderBottomLeftRadius: '2px',
                    }}
                  />

                  {/* card header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded flex-shrink-0"
                        style={{
                          background: 'rgba(139,32,16,0.1)',
                          border: '1px solid rgba(139,32,16,0.25)',
                        }}
                      >
                        <i className={`${port.icon} text-base`} style={{ color: '#8B2010' }} />
                      </div>
                      <div>
                        <h4
                          className="font-bold text-base"
                          style={{ fontFamily: 'Montserrat, sans-serif', color: '#3A2810', letterSpacing: '0.02em' }}
                        >
                          {port.portName}
                        </h4>
                        <p className="text-xs mt-0.5 italic" style={{ color: '#8B7040', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                          {port.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span
                        className="text-xs px-2 py-0.5 rounded-sm"
                        style={{
                          fontFamily: 'monospace',
                          color: '#1A3858',
                          background: 'rgba(26,56,88,0.08)',
                          border: '1px solid rgba(26,56,88,0.2)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {port.coords}
                      </span>
                      <span className="text-xs" style={{ color: 'rgba(58,40,16,0.4)', fontFamily: 'monospace' }}>
                        anno {port.year}
                      </span>
                    </div>
                  </div>

                  {/* divider rule */}
                  <div className="mb-4" style={{ borderTop: '1px dashed rgba(58,40,16,0.2)' }} />

                  {/* points */}
                  <ul className="space-y-2.5 mb-4">
                    {port.points.map((point, k) => (
                      <li key={k} className="text-sm leading-relaxed flex gap-2.5" style={{ color: '#4A2C10', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: '#8B2010', fontWeight: 700 }}>›</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* tags — styled as map stamps */}
                  <div className="flex flex-wrap gap-2">
                    {port.tags.map((tag, t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-sm font-medium tracking-wide"
                        style={{
                          color: '#1A3858',
                          background: 'rgba(26,56,88,0.07)',
                          border: '1px solid rgba(26,56,88,0.22)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* End of route marker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex gap-6 md:gap-10 mt-6"
          >
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(58,40,16,0.15)', border: '1.5px dashed rgba(58,40,16,0.4)' }}
              >
                <i className="ri-more-line text-xs" style={{ color: '#6B4820' }} />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <span
                className="text-xs italic px-4 py-2 rounded-sm"
                style={{
                  color: '#8B7040',
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  background: 'rgba(58,40,16,0.05)',
                  border: '1px dashed rgba(58,40,16,0.2)',
                }}
              >
                ✦ &nbsp;Đang định hướng Solution Architect — thiết kế hệ thống từ bài toán nghiệp vụ đến vận hành thực tế.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
