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

export default function Contact({ config }) {
  const { personal, contact } = config;
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await contactApi.sendMessage(data);
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="section-padding" aria-label="Contact section">
      <div className="container-max">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3">03. Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4" style={{ color: 'var(--color-text)' }}>
              {contact.heading}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {contact.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <motion.div className="lg:col-span-2 flex flex-col gap-6" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass-card rounded-2xl p-6" style={{ background: 'var(--color-surface)' }}>
                <h3 className="font-display font-bold text-lg mb-6" style={{ color: 'var(--color-text)' }}>Contact Info</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-primary)' }}>
                      <FiMail size={16} />
                    </div>
                    <div>
                      <p className="text-xs section-label mb-0.5">Email</p>
                      <a href={`mailto:${personal.email}`} className="text-sm" style={{ color: 'var(--color-text)' }}>{personal.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass-card rounded-2xl p-8">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <FiCheck size={36} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <button onClick={() => setStatus('idle')} className="btn-outline">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Your Name" name="name" register={register} error={errors.name} />
                      <InputField label="Email" name="email" type="email" register={register} error={errors.email} />
                    </div>
                    <InputField label="Message" name="message" type="textarea" register={register} error={errors.message} />
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}