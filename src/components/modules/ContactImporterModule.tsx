export default function ContactImporterModule({ title = 'Import Contacts', description = '' }: any) {
  return (
    <div className="vexl-card p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-vexl-gray-400 mb-4">{description}</p>
      <button className="px-6 py-3 bg-vexl-yellow text-black rounded-lg font-bold">
        Import Contacts
      </button>
    </div>
  )
}