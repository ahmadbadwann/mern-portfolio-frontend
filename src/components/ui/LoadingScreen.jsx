import { motion } from 'framer-motion';

export default function LoadingScreen({ name }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '//';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--color-bg)' }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo mark */}
        <motion.div
          className="relative w-20 h-20"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <motion.rect
              x="4" y="4" width="72" height="72" rx="16"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeDasharray="280"
              strokeDashoffset="280"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.text
              x="40" y="48"
              textAnchor="middle"
              fill="var(--color-primary)"
              fontSize="22"
              fontFamily="var(--font-display)"
              fontWeight="700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {initials}
            </motion.text>
          </svg>
          {/* Orbital ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-full border border-dashed"
            style={{ borderColor: 'rgba(110,231,183,0.2)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Loading bar */}
        <div className="w-40 h-[1px]" style={{ background: 'var(--color-surface-2)' }}>
          <motion.div
            className="h-full"
            style={{ background: 'var(--color-primary)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}
