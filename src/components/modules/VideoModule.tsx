export default function VideoModule({ src = '', poster = '' }: any) {
  return (
    <video 
      src={src} 
      poster={poster}
      controls 
      className="w-full h-full rounded-lg"
    />
  )
}