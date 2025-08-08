import VexlLogo from '@/components/VexlLogo'
import { useContent } from '@/hooks/useContent'

export default function PitchSection() {
  const { content } = useContent('pitchSection')
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <div className="mb-12">
          <VexlLogo className="w-48 h-auto mx-auto mb-8" />
        </div>
        <h2 className="text-5xl md:text-7xl mb-6" style={{ 
          fontFamily: 'Monument Extended', 
          fontWeight: 900,
          color: '#FFFFFF'
        }}>
          {content.title}<br />
          <span style={{ color: '#FCCD6C' }}>{content.subtitle}</span>
        </h2>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
          {content.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
        <div className="space-y-8">
          {content.items?.slice(0, 3).map((item) => (
            <div key={item.id} className="group">
              <h3 className="text-2xl mb-3 flex items-center gap-2" style={{ 
                fontFamily: 'Monument Extended', 
                fontWeight: 700,
                color: '#FFFFFF'
              }}>
                <span style={{ color: '#FCCD6C' }}>→</span> {item.title}
              </h3>
              <p className="pl-8" style={{ color: '#9CA3AF' }}>{item.content}</p>
            </div>
          ))}
        </div>
        <div className="space-y-8">
          {content.items?.slice(3, 6).map((item) => (
            <div key={item.id} className="group">
              <h3 className="text-2xl mb-3 flex items-center gap-2" style={{ 
                fontFamily: 'Monument Extended', 
                fontWeight: 700,
                color: '#FFFFFF'
              }}>
                <span style={{ color: '#FCCD6C' }}>→</span> {item.title}
              </h3>
              <p className="pl-8" style={{ color: '#9CA3AF' }}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-6 vexl-card">
          <span className="text-sm" style={{ color: '#6B7280' }}>Available on</span>
          <span className="font-bold text-xl" style={{ color: '#FFFFFF' }}>iOS</span>
          <span style={{ color: '#374151' }}>•</span>
          <span className="font-bold text-xl" style={{ color: '#FFFFFF' }}>Android</span>
        </div>
      </div>

    </div>
  )
}