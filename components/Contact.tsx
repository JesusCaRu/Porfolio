import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -right-20 bottom-20 w-96 h-96 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
        >
          <div className="grid md:grid-cols-5">
            {/* Contact Info Side */}
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
                      <a href="mailto:jesuscanicio33@gmail.com" className="hover:text-white transition-colors">jesuscanicio33@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-200 mt-1" />
                    <div>
                       <div className="font-medium text-sm text-blue-200">{t.contact.phone}</div>
                       <a href="tel:+34684410041" className="hover:text-white transition-colors">+34 684 41 00 41</a>
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

            {/* Form Side */}
            <div className="md:col-span-3 p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.contact.form.name}</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.form.namePlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.contact.form.email}</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.form.emailPlaceholder} />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.contact.form.message}</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none" placeholder={t.contact.form.messagePlaceholder}></textarea>
                </div>
                <button type="button" className="w-full py-3.5 px-6 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  <Send size={18} />
                  {t.contact.form.btnSend}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;