import React, { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("https://formsubmit.co/ajax/jesuscanicio33@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Nuevo mensaje de contacto de ${formData.name}`,
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus('error');
    }
  };

  useGSAP(() => {
    gsap.from(".contact-card", {
      scrollTrigger: {
        trigger: ".contact-card",
        start: "top 75%",
      },
      y: 50,
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      clearProps: "all"
    });

    gsap.from(".contact-blob", {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "elastic.out(1, 0.5)",
      clearProps: "all"
    });
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-24 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Decoracion de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="contact-blob absolute -right-20 bottom-20 w-96 h-96 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          onMouseMove={handleMouseMove}
          className="contact-card glow-card max-w-4xl mx-auto bg-slate-50/50 dark:bg-[#0f172a]/30 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800 relative"
        >
          {/* Glow de fondo */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid md:grid-cols-5 relative z-10">
            {/* Informacion de contacto */}
            <div className="md:col-span-2 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 font-display">{t.contact.title}</h3>
                <p className="text-blue-100 mb-8 text-sm leading-relaxed">
                  {t.contact.desc}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-200 mt-1" />
                    <div>
                      <div className="font-medium text-sm text-blue-200">{t.contact.email}</div>
                      <a href="mailto:jesuscanicio33@gmail.com" className="hover:text-white transition-colors select-none font-semibold">jesuscanicio33@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-200 mt-1" />
                    <div>
                      <div className="font-medium text-sm text-blue-200">{t.contact.phone}</div>
                      <a href="tel:+34684410041" className="hover:text-white transition-colors select-none font-semibold">+34 684 41 00 41</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-200 mt-1" />
                    <div>
                      <div className="font-medium text-sm text-blue-200">{t.contact.location}</div>
                      <span className="font-semibold">Pinoso, Alicante</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-0 relative z-10">
                <div className="text-xs text-blue-250 font-semibold">{t.contact.availability}</div>
              </div>
            </div>

            {/* Formulario */}
            <div className="md:col-span-3 p-10 md:p-12 bg-white/40 dark:bg-[#0f172a]/20 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot para evitar spam */}
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/30 dark:bg-[#0c101b]/40 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 font-medium text-sm"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 transition-all duration-200 pointer-events-none 
                                 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal
                                 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary-500 dark:peer-focus:text-primary-400"
                    >
                      {t.contact.form.name}
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/30 dark:bg-[#0c101b]/40 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 font-medium text-sm"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 transition-all duration-200 pointer-events-none 
                                 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal
                                 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary-500 dark:peer-focus:text-primary-400"
                    >
                      {t.contact.form.email}
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/30 dark:bg-[#0c101b]/40 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 resize-none font-medium text-sm"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 transition-all duration-200 pointer-events-none 
                               peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal
                               peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary-500 dark:peer-focus:text-primary-400"
                  >
                    {t.contact.form.message}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full py-4 px-6 rounded-xl font-bold shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer
                    ${status === 'loading' 
                      ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed text-slate-200' 
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 shadow-slate-900/10 dark:shadow-white/5'}`}
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                  {status === 'loading' ? 'Enviando...' : t.contact.form.btnSend}
                </button>

                {/* Mensajes de feedback */}
                {status === 'success' && (
                  <div className="flex items-center gap-2.5 text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={20} className="shrink-0" />
                    <span className="text-sm font-semibold">{t.contact.feedback.success}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-green-950/20 border border-red-200/50 dark:border-red-800/30 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="text-sm font-semibold">{t.contact.feedback.error}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
