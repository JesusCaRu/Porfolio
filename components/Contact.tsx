import React, { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, AlertCircle, Sparkles, Copy, Check, Clock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  const copyEmail = () => {
    navigator.clipboard.writeText('jesuscanicio33@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

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
          subject: formData.subject || `Nuevo mensaje de ${formData.name}`,
          message: formData.message,
          _subject: `[Portfolio Contact] ${formData.subject || formData.name}`,
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus('error');
    }
  };

  useGSAP(() => {
    gsap.from(".contact-badge", {
      scrollTrigger: {
        trigger: ".contact-header",
        start: "top 80%",
      },
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".contact-title", {
      scrollTrigger: {
        trigger: ".contact-header",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".contact-wrapper", {
      scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 80%",
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all"
    });
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-24 relative overflow-hidden bg-white dark:bg-[#080B11] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="contact-header text-center mb-16">
          <div className="contact-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full card-surface text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-4">
            <Sparkles size={12} className="text-cyan-500" />
            <span>{t.contact.badge || 'Contacto Directo'}</span>
          </div>
          <h2 className="contact-title text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.contact.desc}
          </p>
        </div>

        {/* Tarjeta de Contacto Principal */}
        <div 
          onMouseMove={handleMouseMove}
          className="contact-wrapper card-surface glow-card max-w-5xl mx-auto rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-12">
            
            {/* Columna Izquierda: Información de Contacto */}
            <div className="md:col-span-5 bg-slate-900 dark:bg-[#0C101B] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
              <div className="relative z-10">
                <div className="inline-block text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
                  Canales de Comunicación
                </div>
                <h3 className="text-xl font-bold font-heading mb-6 leading-tight">
                  {t.contact.badge}
                </h3>

                <div className="space-y-6">
                  {/* Email con botón de copiar */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-400 font-mono mb-0.5">{t.contact.email}</div>
                      <a href="mailto:jesuscanicio33@gmail.com" className="text-sm font-semibold hover:text-cyan-400 transition-colors block truncate">
                        jesuscanicio33@gmail.com
                      </a>
                      <button
                        onClick={copyEmail}
                        className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[11px] font-mono text-cyan-300 border border-white/10 transition-colors cursor-pointer"
                      >
                        {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedEmail ? (t.contact.emailCopied || '¡Copiado!') : (t.contact.copyEmail || 'Copiar Email')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono mb-0.5">{t.contact.phone}</div>
                      <a href="tel:+34684410041" className="text-sm font-semibold hover:text-indigo-400 transition-colors font-mono">
                        +34 684 41 00 41
                      </a>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono mb-0.5">{t.contact.location}</div>
                      <span className="text-sm font-semibold text-slate-200">
                        {t.contact.locationVal || 'Pinoso (Alicante), España (Presencial / Remoto / Híbrido)'}
                      </span>
                    </div>
                  </div>

                  {/* Bonificación Garantía Juvenil */}
                  {t.contact.youthGuaranteeTitle && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                        <Sparkles size={13} className="text-amber-400" />
                        <span>{t.contact.youthGuaranteeTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                        {t.contact.youthGuaranteeDesc}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status de respuesta garantizada */}
              <div className="mt-8 pt-6 border-t border-white/10 relative z-10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Clock size={14} className="shrink-0" />
                <span>{t.contact.responseTime || 'Respuesta garantizada en <24h'}</span>
              </div>
            </div>

            {/* Columna Derecha: Formulario de Contacto */}
            <div className="md:col-span-7 p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.form.namePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.contact.form.subject || 'Asunto / Motivo'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.contact.form.subjectPlaceholder || 'Propuesta de trabajo / Proyecto web...'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer
                    ${status === 'loading'
                      ? 'bg-slate-400 dark:bg-slate-700 text-white cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 shadow-slate-900/10'}`}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>{t.contact.form.sending || 'Enviando...'}</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>{t.contact.form.btnSend}</span>
                    </>
                  )}
                </button>

                {/* Feedback Toasts */}
                {status === 'success' && (
                  <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 p-3.5 rounded-xl text-xs font-semibold">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                    <span>{t.contact.feedback.success}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2.5 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 p-3.5 rounded-xl text-xs font-semibold">
                    <AlertCircle size={16} className="shrink-0 text-rose-500" />
                    <span>{t.contact.feedback.error}</span>
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
