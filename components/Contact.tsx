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
        <div className="contact-card max-w-4xl mx-auto bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="grid md:grid-cols-5">
            {/* Informacion de contacto */}
            <div className="md:col-span-2 bg-gradient-to-br from-primary-600 to-blue-700 p-8 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">{t.contact.title}</h3>
                <p className="text-blue-100 mb-8 text-sm leading-relaxed">
                  {t.contact.desc}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-200 mt-1" />
                    <div>
                      <div className="font-medium text-sm text-blue-200">{t.contact.email}</div>
                      <a href="mailto:jesuscanicio33@gmail.com" className="hover:text-white transition-colors select-none">jesuscanicio33@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-200 mt-1" />
                    <div>
                      <div className="font-medium text-sm text-blue-200">{t.contact.phone}</div>
                      <a href="tel:+34684410041" className="hover:text-white transition-colors select-none">+34 684 41 00 41</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-200 mt-1" />
                    <div>
                      <div className="font-medium text-sm text-blue-200">{t.contact.location}</div>
                      <span>Pinoso, Alicante</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-0">
                <div className="text-xs text-blue-200">{t.contact.availability}</div>
              </div>
            </div>

            {/* Formulario */}
            <div className="md:col-span-3 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot para evitar spam */}
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.contact.form.name}</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.contact.form.email}</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.contact.form.message}</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full py-3.5 px-6 rounded-lg font-bold shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer
                    ${status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'}`}
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
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-medium">{t.contact.feedback.success}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">{t.contact.feedback.error}</span>
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
