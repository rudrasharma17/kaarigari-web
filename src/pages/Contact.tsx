import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react';

const R='#EE2C57', N='#010D1A', C='#F8F6DA', D='#010D1A', BLACK='#000000';
const ease=[0.16,1,0.3,1] as const;

function FU({children,delay=0,className=''}:any){
  const ref=useRef<HTMLDivElement>(null);
  const v=useInView(ref,{once:true,margin:'-50px'});
  return(
    <motion.div ref={ref} className={className}
      initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}}
      transition={{delay,duration:0.9,ease}}>
      {children}
    </motion.div>
  );
}

const SERVICES=['Brand Films','Documentary','Social Content','Corporate Films','Music Videos','Event Coverage'];

export default function Contact(){
  const [form,setForm]=useState({name:'',email:'',company:'',service:'',budget:'',message:''});
  const [sent,setSent]=useState(false);
  const [focused,setFocused]=useState('');

  function handleChange(e:any){setForm(p=>({...p,[e.target.name]:e.target.value}));}
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://formspree.io/f/mgoqojlr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          _subject: `New Inquiry from ${form.name}`,
        })
      });
      setSent(true);
      setForm({ name:'', email:'', company:'', service:'', budget:'', message:'' });
      setTimeout(() => setSent(false), 8000);
    } catch (err) {
      console.error(err);
      alert('There was an error sending your message. Please email us directly.');
    }
    setLoading(false);
  }

  const inputStyle=(field:string)=>({
    background:'transparent',
    border:'none',
    borderBottom:`1px solid ${focused===field?R:'rgba(248,246,218,0.12)'}`,
    color:C,
    outline:'none',
    width:'100%',
    padding:'12px 0',
    fontSize:'14px',
    fontFamily:'inherit',
    transition:'border-color 0.3s',
  } as React.CSSProperties);

  return(
    <div className="min-h-screen">

      <section className="relative pt-40 pb-20 px-8 md:px-16 overflow-hidden">
        <div className="absolute right-0 top-12 font-display font-black leading-none select-none pointer-events-none opacity-[0.02]"
          style={{fontSize:'min(26vw,280px)',color:C,letterSpacing:'-0.06em'}}>TALK</div>
        <motion.p className="label-tag mb-8" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:0.8}}>
          Get In Touch
        </motion.p>
        {["Let's Make","Something Real."].map((line,i)=>(
          <div key={i} className="overflow-hidden">
            <motion.div initial={{y:'110%'}} animate={{y:0}} transition={{delay:0.35+i*0.12,duration:1.1,ease}}>
              <span className="block font-display tracking-tighter leading-[0.88]"
                style={{fontSize:'clamp(2.8rem,7vw,7rem)',color:i===1?R:C,fontStyle:i===1?'italic':'normal',fontWeight:i===1?300:700}}>
                {line}
              </span>
            </motion.div>
          </div>
        ))}
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.8,duration:0.8}}
          className="mt-8 text-lg max-w-md leading-relaxed" style={{color:`rgba(248,246,218,0.45)`}}>
          Every great film starts with a conversation. Tell us about your project.
        </motion.p>
      </section>

      <section className="px-8 md:px-16 py-16 grid md:grid-cols-5 gap-16" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>

        {/* Left: Info */}
        <div className="md:col-span-2 flex flex-col gap-12">
          <FU>
            <p className="label-tag mb-6">Contact Info</p>
            <div className="flex flex-col gap-6">
              {[
                {icon:<Mail className="w-4 h-4"/>, label:'Email', val:'kaarigari.productions@gmail.com', href:'mailto:kaarigari.productions@gmail.com'},
                {icon:<Phone className="w-4 h-4"/>, label:'Phone', val:'+91 93523 35417', href:'tel:+919352335417'},
              ].map(({icon,label,val,href},i)=>(
                <a key={i} href={href}
                  className="flex items-start gap-4 group"
                  style={{color:`rgba(248,246,218,0.45)`}}>
                  <div className="mt-0.5 transition-colors duration-300 group-hover:text-red-400" style={{color:R}}>{icon}</div>
                  <div>
                    <div className="font-mono text-[8px] tracking-widest uppercase mb-1" style={{color:`rgba(248,246,218,0.2)`}}>{label}</div>
                    <div className="text-sm leading-relaxed group-hover:text-white transition-colors duration-300" style={{color:`rgba(248,246,218,0.6)`}}>{val}</div>
                  </div>
                </a>
              ))}
            </div>
          </FU>

          <FU delay={0.1}>
            <p className="label-tag mb-6">Follow Us</p>
            <div className="flex gap-4">
              {[
                {icon:<Instagram className="w-5 h-5"/>, label:'Instagram', href:'https://www.instagram.com/kaarigari.productions?igsh=MW82YnJpcnY0aW1rMw%3D%3D&utm_source=qr'},
                {icon:<Youtube className="w-5 h-5"/>, label:'YouTube', href:'https://youtube.com/@kaarigari.productions?si=TND7MDmMytxE9t98'},
                {icon:<Linkedin className="w-5 h-5"/>, label:'LinkedIn', href:'#'},
              ].map(({icon,label,href},i)=>(
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center transition-all duration-300 group"
                  style={{border:`1px solid rgba(248,246,218,0.1)`,color:`rgba(248,246,218,0.4)`}}
                  title={label}>
                  <div className="group-hover:scale-110 transition-transform duration-300 group-hover:text-white">{icon}</div>
                </a>
              ))}
            </div>
          </FU>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-3">
          <FU delay={0.1}>
            <div className="p-10" style={{border:`1px solid rgba(248,246,218,0.06)`,background:`rgba(0,51,91,0.08)`}}>
              {sent ? (
                <motion.div className="text-center py-16"
                  initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease}}>
                  <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-6"
                    style={{borderColor:R}}>
                    <ArrowUpRight className="w-6 h-6" style={{color:R}}/>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3" style={{color:C}}>Message Sent!</h3>
                  <p className="text-sm" style={{color:`rgba(248,246,218,0.4)`}}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    {[
                      {name:'name',label:'Full Name',type:'text',placeholder:'Full Name'},
                      {name:'email',label:'Email Address',type:'email',placeholder:'email@example.com'},
                      {name:'company',label:'Company / Brand',type:'text',placeholder:'Company Name'},
                      {name:'budget',label:'Estimated Budget',type:'text',placeholder:'Estimated Budget'},
                    ].map(({name,label,type,placeholder})=>(

                      <div key={name}>
                        <label className="font-mono text-[9px] tracking-widest uppercase block mb-2"
                          style={{color:focused===name?R:`rgba(248,246,218,0.25)`}}>{label}</label>
                        <input name={name} type={type} placeholder={placeholder} required
                          value={(form as any)[name]} onChange={handleChange}
                          onFocus={()=>setFocused(name)} onBlur={()=>setFocused('')}
                          style={inputStyle(name)}
                          className="placeholder-opacity-20"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Service select */}
                  <div>
                    <label className="font-mono text-[9px] tracking-widest uppercase block mb-3"
                      style={{color:focused==='service'?R:`rgba(248,246,218,0.25)`}}>Service Needed</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map(s=>(
                        <button key={s} type="button" onClick={()=>setForm(p=>({...p,service:s}))}
                          className="px-4 py-2 font-mono text-[8px] tracking-widest uppercase transition-all duration-300"
                          style={{
                            background:form.service===s?R:'transparent',
                            color:form.service===s?C:`rgba(248,246,218,0.3)`,
                            border:`1px solid ${form.service===s?R:'rgba(248,246,218,0.1)'}`,
                          }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Message */}
                  <div>
                    <label className="font-mono text-[9px] tracking-widest uppercase block mb-2"
                      style={{color:focused==='message'?R:`rgba(248,246,218,0.25)`}}>Your Message</label>
                    <textarea name="message" rows={4} required
                      placeholder="Tell us about your project, vision, timeline..."
                      value={form.message} onChange={handleChange}
                      onFocus={()=>setFocused('message')} onBlur={()=>setFocused('')}
                      style={{...inputStyle('message'),resize:'none',borderBottom:'none',borderTop:`1px solid ${focused==='message'?R:'rgba(248,246,218,0.12)'}`}}
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="flex items-center justify-center gap-3 py-5 font-bold text-[10px] tracking-[0.4em] uppercase transition-all duration-300 hover:gap-5 mt-2 disabled:opacity-50"
                    style={{background:R,color:C}}>
                    {loading ? 'Sending...' : 'Send Message'} <ArrowUpRight className="w-4 h-4"/>
                  </button>
                </form>
              )}
            </div>
          </FU>
        </div>
      </section>

      {/* Brands & Footer CTA */}
      <section className="px-8 md:px-16 py-24 flex flex-col items-center justify-center text-center" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
        <FU>
          <div className="relative overflow-hidden p-14 text-center"
            style={{border:`1px solid rgba(248,246,218,0.06)`}}>
            {/* Ghost text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              style={{fontSize:'min(20vw,220px)',fontWeight:900,color:'rgba(248,246,218,0.02)',fontFamily:'var(--font-display)',letterSpacing:'-0.05em'}}>
              kaarigari
            </div>
            <p className="font-mono text-[9px] tracking-widest uppercase mb-4" style={{color:R}}>Jaipur · India</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-6" style={{color:C}}>
              The studio is<br/><span style={{color:R,fontStyle:'italic',fontWeight:300}}>always open.</span>
            </h2>
            <p className="text-sm max-w-md mx-auto leading-relaxed mb-10" style={{color:`rgba(248,246,218,0.4)`}}>
              Walk in, call us, or send a message. We respond to every serious inquiry within 24 hours.
            </p>
            <a href="mailto:kaarigari.productions@gmail.com"
              className="relative z-[100] pointer-events-auto inline-flex items-center gap-2 px-10 py-4 font-bold text-[10px] tracking-[0.4em] uppercase transition-all duration-300 hover:gap-4"
              style={{background:R,color:C}}>
              kaarigari.productions@gmail.com <ArrowUpRight className="w-3.5 h-3.5"/>
            </a>
          </div>
        </FU>
      </section>
    </div>
  );
}
