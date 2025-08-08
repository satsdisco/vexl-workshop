export default function QuoteModule({ text = 'Quote', author = '' }: any) {
  return (
    <blockquote className="border-l-4 border-vexl-yellow pl-6 py-2">
      <p className="text-xl italic text-white mb-2">"{text}"</p>
      {author && <cite className="text-vexl-gray-400">— {author}</cite>}
    </blockquote>
  )
}