import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/* ── data ─────────────────────────────────────────────── */
const contacts = [
  {
    icon: 'ri-mail-send-line',
    label: 'Email',
    value: 'interact.congvu@gmail.com',
    short: 'interact.congvu\n@gmail.com',
    href: 'mailto:interact.congvu@gmail.com',
  },
  {
    icon: 'ri-phone-line',
    label: 'Phone',
    value: '0966.238.334',
    short: '0966.238.334',
    href: 'tel:0966238334',
  },
];

const socials = [
  { icon: 'ri-github-line',       href: 'https://github.com',              label: 'GitHub',   sub: 'congvu-dev' },
  { icon: 'ri-linkedin-box-line', href: 'https://linkedin.com/in/congvu',  label: 'LinkedIn', sub: 'in/congvu' },
  { icon: 'ri-telegram-line',     href: 'https://t.me/congvu_dev',         label: 'Telegram', sub: '@congvu_dev' },
  { icon: 'ri-message-2-line',    href: 'https://zalo.me/0966238334',      label: 'Zalo',     sub: '0966.238.334' },
];

/* ── postage stamp ────────────────────────────────────── */
function PostageStamp({ small = false }: { small?: boolean }) {
  const w = small ? 52 : 68;
  const h = small ? 62 : 82;
  const cols = small ? 5 : 7;
  const rows = small ? 7 : 9;
  return (
    <div style={{
      width: w, height: h,
      border: '2.5px solid #8B5E3C',
      borderRadius: 2,
      background: 'linear-gradient(145deg,#FAF0D7,#F0DFB0)',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={`t${i}`} style={{ position:'absolute', top:-4, left:3+i*(w/cols), width:6, height:6, borderRadius:'50%', background:'rgba(0,0,0,0.18)' }} />
      ))}
      {Array.from({ length: cols }).map((_, i) => (
        <div key={`b${i}`} style={{ position:'absolute', bottom:-4, left:3+i*(w/cols), width:6, height:6, borderRadius:'50%', background:'rgba(0,0,0,0.18)' }} />
      ))}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={`l${i}`} style={{ position:'absolute', left:-4, top:3+i*(h/rows), width:6, height:6, borderRadius:'50%', background:'rgba(0,0,0,0.18)' }} />
      ))}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={`r${i}`} style={{ position:'absolute', right:-4, top:3+i*(h/rows), width:6, height:6, borderRadius:'50%', background:'rgba(0,0,0,0.18)' }} />
      ))}
      <div style={{ padding:'6px 4px', textAlign:'center', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:1 }}>
        <i className="ri-ship-2-line" style={{ fontSize: small ? 14 : 18, color:'#5C3D1E' }} />
        <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize: small ? 5.5 : 6.5, fontWeight:700, color:'#5C3D1E', letterSpacing:'0.1em', lineHeight:1.2, textAlign:'center' }}>
          VIỆT NAM<br/>MMXXVI
        </p>
      </div>
    </div>
  );
}

/* ── wax seal button ──────────────────────────────────── */
function WaxSealButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  const [pressing, setPressing] = useState(false);
  const handleClick = () => {
    if (disabled) return;
    setPressing(true);
    setTimeout(() => { setPressing(false); onClick(); }, 700);
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        animate={pressing ? { scale:[1,1.3,0.88,1], rotate:[0,-6,4,0] } : { scale:1 }}
        transition={{ duration:0.65, ease:'easeInOut' }}
        className="cursor-pointer disabled:cursor-not-allowed"
        style={{ background:'none', border:'none', padding:0 }}
        aria-label="Đóng dấu và gửi thư"
      >
        <div style={{
          width:80, height:80, borderRadius:'50%',
          background: pressing
            ? 'radial-gradient(circle at 38% 32%,#C0392B,#7B1A10)'
            : 'radial-gradient(circle at 38% 32%,#A93226,#641E16)',
          boxShadow: pressing
            ? '0 2px 10px rgba(160,30,20,0.7),inset 0 2px 5px rgba(255,180,160,0.25)'
            : '0 5px 18px rgba(160,30,20,0.5),inset 0 2px 6px rgba(255,180,160,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center',
          position:'relative', overflow:'hidden', transition:'box-shadow 0.3s',
        }}>
          <div style={{
            width:64, height:64, borderRadius:'50%',
            border:'1.5px solid rgba(255,200,170,0.35)',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:1,
          }}>
            <i className="ri-anchor-line" style={{ fontSize:15, color:'rgba(255,220,200,0.9)' }} />
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:6.5, letterSpacing:'0.2em', color:'rgba(255,220,200,0.85)', fontWeight:700, textTransform:'uppercase', lineHeight:1 }}>
              V.CHÍ CÔNG
            </p>
          </div>
          {pressing && (
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(circle at 50% 50%,rgba(255,180,150,0.3),transparent 70%)' }} />
          )}
        </div>
      </motion.button>
      <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 11, fontStyle: 'italic', color: '#8B5E3C' }}>
        Đóng dấu &amp; gửi thư
      </p>
    </div>
  );
}

/* ── european sealed envelope ─────────────────────────── */
function EuropeanEnvelope() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.65, y:50 }}
      animate={{ opacity:1, scale:1, y:0 }}
      transition={{ duration:0.85, ease:[0.22,1,0.36,1], delay:0.1 }}
      className="flex flex-col items-center gap-5"
    >
      <div style={{ width:300, position:'relative', filter:'drop-shadow(0 10px 28px rgba(60,30,10,0.4))' }}>
        <div style={{
          width:'100%', paddingBottom:'64%',
          background:'linear-gradient(155deg,#FBF4E4 0%,#F5E4BB 60%,#EDD89A 100%)',
          border:'1.5px solid rgba(180,130,70,0.55)',
          borderRadius:'4px 4px 5px 5px',
          position:'relative', overflow:'hidden',
        }}>
          {/* airmail border stripes */}
          <div style={{
            position:'absolute', inset:0,
            background:'repeating-linear-gradient(45deg,#C0392B 0,#C0392B 5px,transparent 5px,transparent 10px,#1a3a7c 10px,#1a3a7c 15px,transparent 15px,transparent 20px)',
            opacity:0.35,
            WebkitMaskImage:'linear-gradient(to bottom,#000 0,#000 5px,transparent 5px,transparent calc(100% - 5px),#000 calc(100% - 5px),#000 100%), linear-gradient(to right,#000 0,#000 5px,transparent 5px,transparent calc(100% - 5px),#000 calc(100% - 5px),#000 100%)',
            WebkitMaskComposite:'source-over',
            maskImage:'linear-gradient(to bottom,#000 0,#000 5px,transparent 5px,transparent calc(100% - 5px),#000 calc(100% - 5px),#000 100%), linear-gradient(to right,#000 0,#000 5px,transparent 5px,transparent calc(100% - 5px),#000 calc(100% - 5px),#000 100%)',
            maskComposite:'add',
            pointerEvents:'none',
          }} />
          {/* V flap */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:0, overflow:'visible' }}>
            <div style={{ width:'100%', height:0, borderLeft:'150px solid transparent', borderRight:'150px solid transparent', borderTop:'82px solid rgba(224,200,140,0.9)' }} />
          </div>
          {/* bottom triangles */}
          <div style={{ position:'absolute', bottom:0, left:0, width:0, height:0, borderBottom:'96px solid rgba(214,190,120,0.7)', borderRight:'150px solid transparent' }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:0, height:0, borderBottom:'96px solid rgba(214,190,120,0.7)', borderLeft:'150px solid transparent' }} />
          {/* center content */}
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddingTop:55, gap:4 }}>
            <div style={{
              width:64, height:64, borderRadius:'50%',
              background:'radial-gradient(circle at 38% 32%,#C0392B,#7B1A10)',
              boxShadow:'0 3px 14px rgba(120,20,10,0.55),inset 0 2px 5px rgba(255,160,140,0.2)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <div style={{ width:52, height:52, borderRadius:'50%', border:'1.5px solid rgba(255,200,170,0.35)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:1 }}>
                <i className="ri-anchor-line" style={{ fontSize:14, color:'rgba(255,220,200,0.92)' }} />
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:6, letterSpacing:'0.18em', color:'rgba(255,210,190,0.85)', fontWeight:700, textTransform:'uppercase', lineHeight:1 }}>
                  V.CHÍ CÔNG
                </p>
              </div>
            </div>
            <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontStyle: 'italic', fontSize: 12, color: 'rgba(60,30,10,0.55)' }}>To: Vũ Chí Công</p>
            <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontStyle: 'italic', fontSize: 10, color: 'rgba(60,30,10,0.38)' }}>Ho Chi Minh City · Vietnam</p>
          </div>
          {/* stamp */}
          <div style={{ position:'absolute', top:10, right:12, zIndex:3 }}><PostageStamp small /></div>
          {/* postmark */}
          <div style={{ position:'absolute', top:14, right:44, zIndex:4, width:40, height:40, borderRadius:'50%', border:'1.5px solid rgba(139,94,60,0.4)', display:'flex', alignItems:'center', justifyContent:'center', transform:'rotate(-22deg)' }}>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:5.5, color:'rgba(139,94,60,0.5)', fontWeight:700, letterSpacing:'0.08em', lineHeight:1.4, textAlign:'center' }}>
              TP.HCM<br/>2026
            </p>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity:0, y:10 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.55, duration:0.6 }}
        className="text-center"
      >
        <p style={{ fontFamily:'Cormorant SC,serif', fontSize:17, color:'rgba(242,200,74,0.85)', letterSpacing:'0.12em' }}>Thư Đã Cập Bến</p>
        <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(220,200,160,0.55)', marginTop: 3 }}>
          Hẹn gặp ở bến tiếp theo!
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── thank you ────────────────────────────────────────── */
function ThankYouMessage() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.88 }}
      animate={{ opacity:1, scale:1 }}
      exit={{ opacity:0, scale:0.94 }}
      transition={{ duration:0.55, ease:'easeOut' }}
      className="flex flex-col items-center justify-center"
      style={{ minHeight:320, textAlign:'center', padding:'32px 16px' }}
    >
      <motion.div
        animate={{ rotate:[0,360] }}
        transition={{ duration:4, ease:'linear', repeat:Infinity }}
        style={{ marginBottom:16, opacity:0.7 }}
      >
        <i className="ri-compass-3-line" style={{ fontSize:36, color:'rgba(242,200,74,0.8)' }} />
      </motion.div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(242,200,74,0.55)', marginBottom: 10 }}>
        — Nhật Ký Hàng Hải —
      </p>
      <h3 style={{ fontFamily:'Cormorant SC,serif', fontSize:32, color:'#FFFAEE', letterSpacing:'0.07em', lineHeight:1.1, marginBottom:12 }}>
        Cảm ơn bạn đã liên hệ
      </h3>
      <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(220,200,160,0.7)', maxWidth: 340, lineHeight: 1.75 }}>
        Tôi đã nhận được thông tin của bạn và sẽ phản hồi trong thời gian sớm nhất. Cảm ơn bạn đã dành thời gian kết nối.
      </p>
      <div className="flex items-center gap-2 mt-5" style={{ opacity:0.4 }}>
        <span style={{ width:20, height:1, background:'rgba(242,200,74,0.5)' }} />
        <i className="ri-anchor-line" style={{ fontSize:12, color:'rgba(242,200,74,0.7)' }} />
        <span style={{ width:20, height:1, background:'rgba(242,200,74,0.5)' }} />
      </div>
    </motion.div>
  );
}

/* ── validation helpers ───────────────────────────────── */
function validateName(v: string) {
  if (!v.trim()) return 'Vui lòng nhập họ và tên của bạn.';
  if (v.trim().length < 2) return 'Tên cần có ít nhất 2 ký tự.';
  return '';
}

function validateContact(v: string) {
  if (!v.trim()) return 'Vui lòng để lại email hoặc số điện thoại để mình có thể phản hồi.';
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneReg = /^(\+84|0)[0-9]{8,10}$/;
  if (!emailReg.test(v.trim()) && !phoneReg.test(v.trim().replace(/[\s.]/g, '')))
    return 'Email hoặc số điện thoại chưa đúng định dạng.';
  return '';
}

function validateMessage(v: string) {
  if (!v.trim()) return 'Vui lòng nhập nội dung tin nhắn.';
  if (v.trim().length < 10) return 'Nội dung cần có ít nhất 10 ký tự.';
  if (v.length > 500) return 'Nội dung không được vượt quá 500 ký tự.';
  return '';
}

/* ── vintage letter form ──────────────────────────────── */
type Stage = 'writing' | 'folding' | 'thankyou' | 'envelope';

function VintageLetterForm() {
  const [formData, setFormData] = useState({ name:'', contact:'', message:'' });
  const [errors, setErrors] = useState({ name:'', contact:'', message:'' });
  const [touched, setTouched] = useState({ name:false, contact:false, message:false });
  const [stage, setStage] = useState<Stage>('writing');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      const err = name === 'name' ? validateName(value)
        : name === 'contact' ? validateContact(value)
        : validateMessage(value);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = name === 'name' ? validateName(value)
      : name === 'contact' ? validateContact(value)
      : validateMessage(value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSend = async () => {
    const nameErr = validateName(formData.name);
    const contactErr = validateContact(formData.contact);
    const messageErr = validateMessage(formData.message);
    setErrors({ name: nameErr, contact: contactErr, message: messageErr });
    setTouched({ name:true, contact:true, message:true });
    if (nameErr || contactErr || messageErr) return;
    setStage('folding');
    try {
      const body = new URLSearchParams({ name: formData.name, contact: formData.contact, message: formData.message });
      await fetch('https://readdy.ai/api/form/d75ne15r5g02gnd69jv0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    } catch { /* silent */ }
    setTimeout(() => {
      setStage('thankyou');
      setTimeout(() => setStage('envelope'), 2800);
    }, 1400);
  };

  const lineStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(139,94,60,0.28)',
    padding: '5px 3px',
    fontFamily: '"Be Vietnam Pro", sans-serif',
    fontSize: 14,
    color: '#3B1E08',
    outline: 'none',
    letterSpacing: '0.01em',
    lineHeight: 1.55,
  };

  return (
    <div style={{ position:'relative', minHeight:300 }}>
      <AnimatePresence mode="wait">

        {/* writing */}
        {stage === 'writing' && (
          <motion.div
            key="writing"
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.6, ease:'easeOut' }}
          >
            {/* shadow */}
            <div style={{ position:'absolute', inset:0, transform:'translate(4px,5px)', background:'rgba(60,30,10,0.14)', borderRadius:3, filter:'blur(6px)' }} />
            <div style={{
              position:'relative',
              background:'linear-gradient(155deg,#FBF2DC 0%,#F5E8C4 40%,#F0DFB0 100%)',
              border:'1px solid rgba(180,130,70,0.4)',
              borderRadius:3,
              padding:'28px 32px 26px',
              backgroundImage:`
                linear-gradient(155deg,#FBF2DC 0%,#F5E8C4 40%,#F0DFB0 100%),
                repeating-linear-gradient(transparent,transparent 28px,rgba(139,94,60,0.09) 28px,rgba(139,94,60,0.09) 29px)
              `,
              backgroundBlendMode:'multiply',
            }}>
              {/* fold corner */}
              <div style={{ position:'absolute', top:0, right:0, width:0, height:0, borderStyle:'solid', borderWidth:'0 32px 32px 0', borderColor:'transparent rgba(180,130,70,0.28) transparent transparent' }} />
              <div style={{ position:'absolute', top:0, right:0, width:0, height:0, borderStyle:'solid', borderWidth:'32px 32px 0 0', borderColor:'rgba(240,210,160,0.75) transparent transparent transparent' }} />
              {/* stamp */}
              <div style={{ position:'absolute', top:12, right:44 }}><PostageStamp small /></div>
              {/* postmark */}
              <div style={{ position:'absolute', top:16, right:54, width:42, height:42, borderRadius:'50%', border:'1.5px solid rgba(139,94,60,0.25)', display:'flex', alignItems:'center', justifyContent:'center', transform:'rotate(-18deg)' }}>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:6, color:'rgba(139,94,60,0.42)', fontWeight:700, letterSpacing:'0.08em', lineHeight:1.4, textAlign:'center' }}>
                  TP.HCM<br/>2026
                </p>
              </div>

              {/* to field */}
              <div style={{ marginBottom:16, paddingRight:110 }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(139,94,60,0.52)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 2 }}>Người nhận</p>
                <p style={{ fontFamily:'Cormorant SC,serif', fontSize:16, color:'#3B1E08', fontWeight:700, letterSpacing:'0.05em' }}>Vũ Chí Công</p>
                <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 12, fontStyle: 'italic', color: 'rgba(139,94,60,0.6)' }}>Senior Fullstack Developer · HCMC</p>
              </div>

              <div style={{ width:'100%', height:1, background:'linear-gradient(90deg,transparent,rgba(139,94,60,0.28) 30%,rgba(139,94,60,0.28) 70%,transparent)', marginBottom:18 }} />

              <form id="vintage-contact-form" data-readdy-form>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(139,94,60,0.58)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Họ và tên</label>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} onBlur={handleBlur} required
                    placeholder="Nhập họ và tên của bạn"
                    style={{ ...lineStyle, borderBottomColor: errors.name ? 'rgba(180,60,40,0.7)' : 'rgba(139,94,60,0.28)' }}
                  />
                  {errors.name && (
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:5 }}>
                      <i className="ri-error-warning-line" style={{ fontSize:11, color:'rgba(190,70,50,0.85)', flexShrink:0 }} />
                      <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontStyle: 'italic', fontSize: 11.5, color: 'rgba(190,70,50,0.85)', lineHeight: 1.4 }}>{errors.name}</p>
                    </div>
                  )}
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(139,94,60,0.58)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Thông tin liên hệ</label>
                  <input
                    type="text" name="contact" value={formData.contact}
                    onChange={handleChange} onBlur={handleBlur} required
                    placeholder="Email hoặc số điện thoại"
                    style={{ ...lineStyle, borderBottomColor: errors.contact ? 'rgba(180,60,40,0.7)' : 'rgba(139,94,60,0.28)' }}
                  />
                  {errors.contact && (
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:5 }}>
                      <i className="ri-error-warning-line" style={{ fontSize:11, color:'rgba(190,70,50,0.85)', flexShrink:0 }} />
                      <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontStyle: 'italic', fontSize: 11.5, color: 'rgba(190,70,50,0.85)', lineHeight: 1.4 }}>{errors.contact}</p>
                    </div>
                  )}
                </div>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(139,94,60,0.58)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Nội dung</label>
                  <textarea
                    name="message" value={formData.message}
                    onChange={handleChange} onBlur={handleBlur}
                    required maxLength={500} rows={4}
                    placeholder="Chia sẻ ngắn gọn về nhu cầu hoặc dự án của bạn"
                    className="no-scrollbar"
                    style={{ ...lineStyle, resize:'none', borderBottom: errors.message ? '1px solid rgba(180,60,40,0.7)' : '1px solid rgba(139,94,60,0.28)', backgroundImage:'repeating-linear-gradient(transparent,transparent 24px,rgba(139,94,60,0.09) 24px,rgba(139,94,60,0.09) 25px)', lineHeight:'25px', paddingTop:4 }}
                  />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:2 }}>
                    {errors.message ? (
                      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <i className="ri-error-warning-line" style={{ fontSize:11, color:'rgba(190,70,50,0.85)', flexShrink:0 }} />
                        <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontStyle: 'italic', fontSize: 11.5, color: 'rgba(190,70,50,0.85)', lineHeight: 1.4 }}>{errors.message}</p>
                      </div>
                    ) : <span />}
                    <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 10, color: formData.message.length > 450 ? 'rgba(190,70,50,0.7)' : 'rgba(139,94,60,0.38)', flexShrink: 0 }}>{formData.message.length}/500</p>
                  </div>
                </div>
                {/* signature */}
                <div style={{ textAlign:'right', marginBottom:4 }}>
                  <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 12, fontStyle: 'italic', color: 'rgba(139,94,60,0.42)' }}>Trân trọng,</p>
                  <p style={{ fontFamily:'Cormorant SC,serif', fontSize:13, color:'rgba(139,94,60,0.5)', letterSpacing:'0.07em' }}>{formData.name || '_______________'}</p>
                </div>
              </form>

              <div style={{ textAlign:'center', marginTop:10 }}>
                <WaxSealButton disabled={false} onClick={handleSend} />
              </div>

              <div style={{ textAlign:'center', marginTop:18, opacity:0.18 }}>
                <span style={{ fontFamily:'Cormorant SC,serif', fontSize:10, color:'#8B5E3C', letterSpacing:'0.28em' }}>✦ · · · ✦ · · · ✦</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* folding */}
        {stage === 'folding' && (
          <motion.div
            key="folding"
            initial={{ opacity:1, scaleY:1, rotateX:0, y:0 }}
            animate={{ scaleY:[1,0.5,0.2,0,0], rotateX:[0,-20,-40,-60,-60], y:[0,-20,-100,-280,-400], opacity:[1,1,0.8,0.3,0] }}
            transition={{ duration:1.4, ease:[0.4,0,0.2,1] }}
            style={{ transformOrigin:'top center', perspective:900 }}
          >
            <div style={{ position:'absolute', inset:0, transform:'translate(4px,5px)', background:'rgba(60,30,10,0.14)', borderRadius:3, filter:'blur(6px)' }} />
            <div style={{ position:'relative', background:'linear-gradient(155deg,#FBF2DC 0%,#F5E8C4 40%,#F0DFB0 100%)', border:'1px solid rgba(180,130,70,0.4)', borderRadius:3, padding:'28px 32px 100px', opacity:0.92 }}>
              <div style={{ position:'absolute', top:12, right:44 }}><PostageStamp small /></div>
              <p style={{ fontFamily:'Cormorant SC,serif', fontSize:16, color:'#3B1E08', fontWeight:700, marginBottom:12 }}>Vũ Chí Công</p>
              <div style={{ width:'100%', height:1, background:'rgba(139,94,60,0.22)', marginBottom:14 }} />
              <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 13, color: 'rgba(60,30,10,0.45)', fontStyle: 'italic' }}>
                {formData.message.slice(0,70)}{formData.message.length > 70 ? '...' : ''}
              </p>
            </div>
          </motion.div>
        )}

        {/* thank you */}
        {stage === 'thankyou' && (
          <motion.div key="thankyou" exit={{ opacity:0, scale:0.94 }} transition={{ duration:0.55 }}>
            <ThankYouMessage />
          </motion.div>
        )}

        {/* envelope */}
        {stage === 'envelope' && (
          <motion.div key="envelope" className="flex justify-center py-6">
            <EuropeanEnvelope />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

/* ── left panel — contacts ────────────────────────────── */
function ContactsPanel() {
  return (
    <motion.div
      initial={{ opacity:0, x:-24 }}
      whileInView={{ opacity:1, x:0 }}
      transition={{ duration:0.7, delay:0.1 }}
      viewport={{ once:true }}
      className="flex flex-col gap-4"
    >
      {/* decorative header */}
      <div className="mb-2">
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(242,200,74,0.5)', marginBottom: 6 }}>Liên Hệ</p>
        <div style={{ width:28, height:1, background:'rgba(242,200,74,0.3)' }} />
      </div>

      {contacts.map((c, i) => (
        <a
          key={i}
          href={c.href}
          className="flex items-start gap-3 group cursor-pointer"
          style={{ textDecoration:'none' }}
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
            style={{ background:'rgba(242,200,74,0.08)', border:'1px solid rgba(242,200,74,0.2)' }}>
            <i className={c.icon} style={{ fontSize:14, color:'#F2C84A' }} />
          </div>
          <div>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(220,200,160,0.45)', marginBottom:1 }}>{c.label}</p>
            <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 13, color: 'rgba(220,200,160,0.82)', lineHeight: 1.4, wordBreak: 'break-word' }}>{c.value}</p>
          </div>
        </a>
      ))}

      {/* decorative compass */}
      <div className="mt-4 flex flex-col items-center" style={{ opacity:0.18 }}>
        <div style={{ width:1, height:32, background:'linear-gradient(to bottom,rgba(242,200,74,0.5),transparent)' }} />
        <i className="ri-compass-3-line" style={{ fontSize:22, color:'rgba(242,200,74,0.9)', marginTop:6 }} />
      </div>
    </motion.div>
  );
}

/* ── right panel — socials ────────────────────────────── */
function SocialsPanel() {
  return (
    <motion.div
      initial={{ opacity:0, x:24 }}
      whileInView={{ opacity:1, x:0 }}
      transition={{ duration:0.7, delay:0.1 }}
      viewport={{ once:true }}
      className="flex flex-col gap-4"
    >
      {/* decorative header */}
      <div className="mb-2">
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(242,200,74,0.5)', marginBottom: 6 }}>Mạng Xã Hội</p>
        <div style={{ width:28, height:1, background:'rgba(242,200,74,0.3)' }} />
      </div>

      {socials.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="nofollow noreferrer"
          aria-label={s.label}
          className="flex items-center gap-3 group cursor-pointer"
          style={{ textDecoration:'none' }}
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ background:'rgba(242,200,74,0.08)', border:'1px solid rgba(242,200,74,0.2)' }}>
            <i className={`${s.icon} text-sm`} style={{ color:'rgba(220,200,160,0.7)' }} />
          </div>
          <div>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:13, color:'rgba(220,200,160,0.82)', letterSpacing:'0.04em' }}>{s.label}</p>
            <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 11, fontStyle: 'italic', color: 'rgba(220,200,160,0.38)', lineHeight: 1.3 }}>{s.sub}</p>
          </div>
        </a>
      ))}

      {/* decorative anchor */}
      <div className="mt-4 flex flex-col items-center" style={{ opacity:0.18 }}>
        <div style={{ width:1, height:32, background:'linear-gradient(to bottom,rgba(242,200,74,0.5),transparent)' }} />
        <i className="ri-anchor-line" style={{ fontSize:22, color:'rgba(242,200,74,0.9)', marginTop:6 }} />
      </div>
    </motion.div>
  );
}

/* ── mobile contact row ───────────────────────────────── */
function MobileContactRow() {
  return (
    <div className="flex flex-col gap-5 mb-8">
      <div className="grid grid-cols-2 gap-3">
        {contacts.map((c, i) => (
          <a key={i} href={c.href}
            className="flex items-center gap-2 rounded-lg px-3 py-3 cursor-pointer"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(242,200,74,0.13)', textDecoration:'none' }}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0"
              style={{ background:'rgba(242,200,74,0.09)', border:'1px solid rgba(242,200,74,0.2)' }}>
              <i className={c.icon} style={{ fontSize:12, color:'#F2C84A' }} />
            </div>
            <div className="min-w-0">
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(220,200,160,0.42)' }}>{c.label}</p>
              <p style={{ fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: 11, color: 'rgba(220,200,160,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.value}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="flex justify-center gap-3 flex-wrap">
        {socials.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="nofollow noreferrer" aria-label={s.label}
            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(242,200,74,0.13)', textDecoration:'none' }}
          >
            <div className="w-7 h-7 flex items-center justify-center">
              <i className={`${s.icon} text-sm`} style={{ color:'rgba(220,200,160,0.65)' }} />
            </div>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:12, color:'rgba(220,200,160,0.7)', whiteSpace:'nowrap' }}>{s.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── main footer ──────────────────────────────────────── */
export default function PortfolioFooter() {
  return (
    <footer
      id="contact"
      className="relative py-24 px-5 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#1A0A04 0%,#0E0615 50%,#060D1F 100%)' }}
    >
      {/* chapter watermark */}
      <div className="absolute right-6 top-6 select-none pointer-events-none" style={{
        fontFamily:'Playfair Display,serif',
        fontSize:'clamp(7rem,18vw,16rem)',
        fontWeight:700,
        color:'rgba(242,200,74,0.035)',
        lineHeight:1,
      }}>IV</div>

      {/* glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:`
          radial-gradient(ellipse at 20% 50%,rgba(255,220,80,0.07) 0%,transparent 50%),
          radial-gradient(ellipse at 80% 30%,rgba(200,140,255,0.06) 0%,transparent 50%)
        `
      }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* chapter header */}
        <motion.div
          initial={{ opacity:0, y:36 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.75 }}
          viewport={{ once:true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-16" style={{ background:'linear-gradient(90deg,transparent,rgba(242,200,74,0.38))' }} />
            <span className="text-xs tracking-[0.35em] uppercase font-semibold" style={{ color:'#F2C84A', fontFamily:'Inter,sans-serif' }}>Chapter IV</span>
            <span className="h-px w-16" style={{ background:'linear-gradient(90deg,rgba(242,200,74,0.38),transparent)' }} />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-3" style={{ fontFamily:'Playfair Display,serif', color:'#FFFAEE' }}>
            Kết Nối
          </h2>
          <p className="max-w-lg mx-auto text-sm" style={{ color:'rgba(220,200,160,0.65)', fontFamily:'Inter,sans-serif', fontWeight:300 }}>
            Nếu bạn đang tìm một người đồng hành cho sản phẩm, hệ thống hoặc bài toán kỹ thuật mới, tôi luôn sẵn sàng kết nối và trao đổi.
          </p>
        </motion.div>

        {/* ── DESKTOP: 3 columns ── */}
        <div className="hidden lg:grid gap-8 items-start mb-12" style={{ gridTemplateColumns:'1fr 2.4fr 1fr' }}>
          <ContactsPanel />
          <VintageLetterForm />
          <SocialsPanel />
        </div>

        {/* ── MOBILE: stacked ── */}
        <div className="lg:hidden mb-10">
          <MobileContactRow />
          <VintageLetterForm />
        </div>

        {/* bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop:'1px solid rgba(242,200,74,0.1)' }}>
          <p className="text-sm" style={{ color:'rgba(200,180,140,0.45)' }}>
            © 2026 Vũ Chí Công — All rights reserved.
          </p>
          <p className="text-sm" style={{ color:'rgba(200,180,140,0.35)' }}>
            Xây dựng giải pháp chỉn chu, bền vững và có thể mở rộng.
          </p>
        </div>
      </div>
    </footer>
  );
}
