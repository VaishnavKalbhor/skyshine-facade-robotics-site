import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

type AnimatedSectionProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0 },
}

const staggerVariant: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={staggerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.16 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={fadeUpVariant}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
