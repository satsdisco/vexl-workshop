import { useState, useEffect } from 'react'
import { FeatureConfig, defaultFeatures } from '@/lib/features'

export function useFeatures() {
  const [features, setFeatures] = useState<FeatureConfig[]>(defaultFeatures)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeatures()
    // Refresh features every 10 seconds to catch admin updates
    const interval = setInterval(loadFeatures, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadFeatures = async () => {
    try {
      const response = await fetch('/api/admin/features')
      const data = await response.json()
      if (data.success && data.features) {
        setFeatures(data.features)
      }
    } catch (error) {
      console.error('Failed to load features:', error)
    } finally {
      setLoading(false)
    }
  }

  const isEnabled = (featureId: string): boolean => {
    const feature = features.find(f => f.id === featureId)
    return feature?.enabled ?? false
  }

  const getSettings = (featureId: string): any => {
    const feature = features.find(f => f.id === featureId)
    return feature?.settings || {}
  }

  const getFeature = (featureId: string): FeatureConfig | undefined => {
    return features.find(f => f.id === featureId)
  }

  return {
    features,
    loading,
    isEnabled,
    getSettings,
    getFeature,
    refresh: loadFeatures
  }
}