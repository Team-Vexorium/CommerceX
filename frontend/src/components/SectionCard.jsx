import { motion } from 'framer-motion'

function SectionCard({ title, description, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-md'
    >
      <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
      {description ? <p className='mt-2 text-zinc-400'>{description}</p> : null}
      <div className='mt-4'>{children}</div>
    </motion.section>
  )
}

export default SectionCard
