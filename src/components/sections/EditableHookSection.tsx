import { motion } from 'framer-motion'
import EditableWrapper from '@/components/EditableWrapper'

interface EditableHookSectionProps {
  content: any
  onUpdate: (key: string, value: any) => void
  editMode: boolean
}

export default function EditableHookSection({ content, onUpdate, editMode }: EditableHookSectionProps) {
  // Use provided content or defaults
  const title = content.title || 'KYC is killing Bitcoin'
  const subtitle = content.subtitle || "Every time you upload your ID to buy bitcoin, you're building the surveillance state."
  const stats = content.stats || [
    { id: 'stat1', value: '500M+', label: 'KYC records leaked in crypto exchange hacks' },
    { id: 'stat2', value: '100%', label: 'of your transactions tracked forever' },
    { id: 'stat3', value: '0', label: 'privacy once you\'re in the system' }
  ]
  const cta = content.cta || "There's a better way"
  
  // Parse title to maintain the KYC highlighting
  const titleParts = title.split(' ')
  const firstWord = titleParts[0]
  const restOfTitle = titleParts.slice(1).join(' ')

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    const newStats = [...stats]
    newStats[index] = { ...newStats[index], [field]: value }
    onUpdate('stats', newStats)
  }
  
  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl mb-8 leading-tight text-center uppercase"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        {editMode ? (
          <EditableWrapper
            value={title}
            onChange={(value) => onUpdate('title', value)}
            tag="span"
            className="text-white"
            editMode={editMode}
          >
            <span className="text-vexl-yellow relative">
              {firstWord}
              <span className="absolute bottom-0 left-0 w-full h-2 bg-vexl-yellow"></span>
            </span>{' '}
            {restOfTitle}
          </EditableWrapper>
        ) : (
          <>
            <span className="text-vexl-yellow relative">
              {firstWord}
              <span className="absolute bottom-0 left-0 w-full h-2 bg-vexl-yellow"></span>
            </span>{' '}
            {restOfTitle}
          </>
        )}
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <EditableWrapper
          value={subtitle}
          onChange={(value) => onUpdate('subtitle', value)}
          tag="p"
          className="text-xl md:text-2xl text-vexl-gray-400 max-w-3xl mx-auto"
          editMode={editMode}
        />
      </motion.div>

      <div className="mt-12 space-y-8 text-xl md:text-2xl text-vexl-gray-400 max-w-3xl mx-auto text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => {
            const bgColors = ['bg-vexl-yellow text-vexl-black', 'bg-vexl-black', 'bg-vexl-green-dark text-vexl-white']
            const borderColors = ['border-vexl-black', 'border-vexl-yellow', 'border-vexl-black']
            const accentColors = ['bg-vexl-pink', 'bg-vexl-green-light', 'bg-vexl-yellow']
            
            return (
              <motion.div 
                key={stat.id}
                whileHover={{ scale: editMode ? 1 : 1.05 }}
                className={`p-8 ${bgColors[index]} border-4 ${borderColors[index]} transition-all ${editMode ? '' : 'cursor-pointer'} text-center relative overflow-hidden`}
              >
                <div className={`absolute ${index === 0 ? 'top-0 right-0' : index === 1 ? 'bottom-0 left-0' : 'top-0 left-0'} ${index === 1 ? 'w-32 h-32' : 'w-20 h-20'} ${accentColors[index]} rounded-full ${index === 0 ? '-translate-x-1/2 translate-y-1/2' : index === 1 ? 'translate-x-1/2 -translate-y-1/2' : '-translate-x-1/2 -translate-y-1/2'} opacity-${index === 0 ? '50' : index === 1 ? '30' : '40'}`}></div>
                
                <EditableWrapper
                  value={stat.value}
                  onChange={(value) => updateStat(index, 'value', value)}
                  tag="div"
                  className={`text-3xl lg:text-4xl ${index === 1 ? 'text-vexl-yellow' : ''} mb-4 uppercase relative z-10`}
                  editMode={editMode}
                />
                
                <EditableWrapper
                  value={stat.label}
                  onChange={(value) => updateStat(index, 'label', value)}
                  tag="p"
                  className={`text-sm lg:text-base ${index === 0 ? 'font-semibold' : index === 1 ? 'text-vexl-white' : ''} relative z-10`}
                  editMode={editMode}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 flex justify-center"
      >
        <div className="inline-flex items-center gap-3 bg-vexl-black px-8 py-4 border-4 border-vexl-yellow">
          <EditableWrapper
            value={cta}
            onChange={(value) => onUpdate('cta', value)}
            tag="span"
            className="text-2xl md:text-3xl text-vexl-yellow"
            editMode={editMode}
          />
          <motion.svg 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-8 md:w-10 md:h-10 text-vexl-yellow" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </div>
      </motion.div>
    </div>
  )
}