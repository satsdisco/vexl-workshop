'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, ChevronUp, ChevronDown } from 'lucide-react'

interface DataTableEditorProps {
  data: any[]
  columns: {
    key: string
    label: string
    type?: 'text' | 'number' | 'select' | 'boolean'
    options?: string[]
    editable?: boolean
    min?: number
    max?: number
    step?: number
  }[]
  onSave: (data: any[]) => void
  onAdd?: () => any
  className?: string
}

export default function DataTableEditor({
  data,
  columns,
  onSave,
  onAdd,
  className = ''
}: DataTableEditorProps) {
  const [items, setItems] = useState(data)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)

  const handleEdit = (item: any) => {
    setEditingId(item.id)
    setEditingItem({ ...item })
  }

  const handleSaveItem = () => {
    const updated = items.map(item => 
      item.id === editingId ? editingItem : item
    )
    setItems(updated)
    onSave(updated)
    setEditingId(null)
    setEditingItem(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingItem(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this item?')) {
      const updated = items.filter(item => item.id !== id)
      setItems(updated)
      onSave(updated)
    }
  }

  const handleAdd = () => {
    const newItem = onAdd ? onAdd() : {
      id: `new-${Date.now()}`,
      ...columns.reduce((acc, col) => ({
        ...acc,
        [col.key]: col.type === 'boolean' ? false : ''
      }), {})
    }
    setItems([...items, newItem])
    handleEdit(newItem)
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    
    if (newIndex >= 0 && newIndex < items.length) {
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]]
      setItems(newItems)
      onSave(newItems)
    }
  }

  const renderCell = (item: any, column: any) => {
    const isEditing = editingId === item.id
    const value = isEditing ? editingItem[column.key] : item[column.key]

    if (!isEditing || !column.editable !== false) {
      return <span>{value?.toString() || '-'}</span>
    }

    switch (column.type) {
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [column.key]: e.target.checked
            })}
            className="w-4 h-4"
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [column.key]: Number(e.target.value)
            })}
            className="w-full px-2 py-1 bg-vexl-gray-800 rounded"
          />
        )
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [column.key]: e.target.value
            })}
            className="w-full px-2 py-1 bg-vexl-gray-800 rounded"
          >
            {column.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [column.key]: e.target.value
            })}
            className="w-full px-2 py-1 bg-vexl-gray-800 rounded"
          />
        )
    }
  }

  return (
    <div className={`bg-vexl-gray-900 rounded-lg overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-vexl-gray-800">
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-vexl-gray-400">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-sm font-semibold text-vexl-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-t border-vexl-gray-800 hover:bg-vexl-gray-800/50">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-sm">
                    {renderCell(item, col)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {editingId === item.id ? (
                      <>
                        <button
                          onClick={handleSaveItem}
                          className="p-1 text-green-500 hover:text-green-400"
                          title="Save"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 text-red-500 hover:text-red-400"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleMove(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-vexl-gray-400 hover:text-vexl-white disabled:opacity-50"
                          title="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => handleMove(index, 'down')}
                          disabled={index === items.length - 1}
                          className="p-1 text-vexl-gray-400 hover:text-vexl-white disabled:opacity-50"
                          title="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 text-vexl-yellow hover:text-vexl-yellow/80"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-500 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-vexl-gray-800">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-vexl-yellow text-vexl-black font-semibold rounded-lg hover:bg-vexl-yellow/90"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>
    </div>
  )
}