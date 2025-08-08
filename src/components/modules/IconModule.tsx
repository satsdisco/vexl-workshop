export default function IconModule({ icon = '🚀', config = {} }: any) {
  const size = config.size || 'large'
  const sizeClasses: Record<string, string> = {
    small: 'text-4xl',
    medium: 'text-6xl',
    large: 'text-8xl',
    huge: 'text-9xl'
  }
  return (
    <div className={`${sizeClasses[size]} text-center`}>
      {icon}
    </div>
  )
}