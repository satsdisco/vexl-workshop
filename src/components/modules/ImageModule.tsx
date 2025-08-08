export default function ImageModule({ src = '/placeholder.jpg', alt = '', caption = '' }: any) {
  return (
    <figure className="w-full h-full">
      <img src={src} alt={alt} className="w-full h-full object-contain rounded-lg" />
      {caption && <figcaption className="text-sm text-vexl-gray-400 mt-2 text-center">{caption}</figcaption>}
    </figure>
  )
}