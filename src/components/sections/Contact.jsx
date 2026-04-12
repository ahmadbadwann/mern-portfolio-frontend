<<<<<<< HEAD
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiSend, FiCheck, FiAlertCircle, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { contactApi } from '../../utils/api';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Too short').max(100),
  email: yup.string().required('Email is required').email('Invalid email format'),
  message: yup.string().required('Message is required').min(10, 'Too short (min 10 chars)').max(2000),
});

function InputField({ label, name, type = 'text', placeholder, register, error, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-medium mb-2 tracking-wide"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          rows={5}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-all duration-200"
          style={{
            background: 'var(--color-surface)',
            border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'var(--color-border)'}`,
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--color-primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'var(--color-border)';
            e.target.style.boxShadow = 'none';
          }}
          {...register(name)}
          {...props}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
          style={{
            background: 'var(--color-surface)',
            border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'var(--color-border)'}`,
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--color-primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'var(--color-border)';
            e.target.style.boxShadow = 'none';
          }}
          {...register(name)}
        />
      )}
      {error && (
        <p className="mt-1.5 text-xs flex items-center gap-1.5" style={{ color: '#f87171' }}>
          <FiAlertCircle size={12} /> {error.message}
        </p>
      )}
    </div>
  );
}

=======
>>>>>>> 80a2761 (coleer)
export default function Contact({ config }) {
  return (
    <section id="contact" className="section-padding" aria-label="Contact section">
      <div className="container-max">
        <div className="max-w-5xl mx-auto">
<<<<<<< HEAD
          <div className="text-center mb-16">
            <p className="section-label mb-3">03. Get In Touch</p>
            <h2
              className="text-4xl md:text-5xl font-display font-extrabold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              {contact.heading}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {contact.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="glass-card rounded-2xl p-6"
                style={{ background: 'var(--color-surface)' }}
              >
                <h3
                  className="font-display font-bold text-lg mb-6"
                  style={{ color: 'var(--color-text)' }}
                >
                  Contact Info
                </h3>
                <div className="space-y-5">
                  {[
                    { icon: FiMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                    { icon: FiMapPin, label: 'Location', value: personal.location, href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-primary)' }}
                      >
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs section-label mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm transition-colors hover:text-primary"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-8 pt-6"
                  style={{ borderTop: '1px solid var(--color-border)' }}
                >
                  <p className="text-xs section-label mb-4">Follow me</p>
                  <div className="flex gap-3">
                    {personal.social.github && (
                      <a
                        href={personal.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          background: 'var(--color-surface-2)',
                          color: 'var(--color-text-muted)',
                          border: '1px solid var(--color-border)',
                        }}
                        aria-label="GitHub"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                    {personal.social.linkedin && (
                      <a
                        href={personal.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          background: 'var(--color-surface-2)',
                          color: 'var(--color-text-muted)',
                          border: '1px solid var(--color-border)',
                        }}
                        aria-label="LinkedIn"
                      >
                        <FiLinkedin size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="glass-card rounded-2xl p-8">
                {status === 'success' ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.4 }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-primary)' }}
                    >
                      <FiCheck size={36} />
                    </div>
                    <h3
                      className="font-display font-bold text-2xl mb-3"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Message Sent!
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                      {contact.successMessage}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline mt-6 text-sm"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField
                        label="Your Name"
                        name="name"
                        placeholder="Jane Smith"
                        register={register}
                        error={errors.name}
                      />
                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        register={register}
                        error={errors.email}
                      />
                    </div>
                    <InputField
                      label="Message"
                      name="message"
                      type="textarea"
                      placeholder="Tell me about your project..."
                      register={register}
                      error={errors.message}
                    />

                    {status === 'error' && (
                      <motion.p
                        className="text-sm flex items-center gap-2 px-4 py-3 rounded-lg"
                        style={{
                          background: 'rgba(239,68,68,0.08)',
                          color: '#f87171',
                          border: '1px solid rgba(239,68,68,0.2)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <FiAlertCircle size={14} /> {errorMsg}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center text-sm"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <div
                            className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                            style={{ borderColor: '#ffffff', borderTopColor: 'transparent' }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FiSend size={14} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
=======
          {/* Empty contact section - all content removed */}
>>>>>>> 80a2761 (coleer)
        </div>
      </div>
    </section>
  );
}
