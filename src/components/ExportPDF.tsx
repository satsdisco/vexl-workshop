'use client'

import { useState } from 'react'
import { Download, FileText, Loader2 } from 'lucide-react'

interface ExportPDFProps {
  deckName?: string
}

export default function ExportPDF({ deckName = 'Vexl Workshop' }: ExportPDFProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    setIsExporting(true)
    
    try {
      // Import jsPDF dynamically to avoid SSR issues
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default
      
      // Get all slide sections
      const sections = document.querySelectorAll('.slide-section')
      
      // Create new PDF document
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080]
      })
      
      // Process each slide
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement
        
        // Capture the section as canvas
        const canvas = await html2canvas(section, {
          useCORS: true,
          logging: false
        })
        
        // Add to PDF
        const imgData = canvas.toDataURL('image/png')
        if (i > 0) pdf.addPage()
        
        pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080)
        
        // Add slide number
        pdf.setFontSize(12)
        pdf.setTextColor(150, 150, 150)
        pdf.text(`${i + 1} / ${sections.length}`, 1850, 1050)
      }
      
      // Save the PDF
      pdf.save(`${deckName.toLowerCase().replace(/ /g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`)
      
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={exportToPDF}
      disabled={isExporting}
      className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700 transition-colors disabled:opacity-50"
      title="Export presentation as PDF"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <FileText className="w-4 h-4" />
          <span>Export PDF</span>
        </>
      )}
    </button>
  )
}