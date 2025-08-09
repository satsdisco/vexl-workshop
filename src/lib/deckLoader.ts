// Deck loader utility to fetch custom decks from database
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface CustomDeck {
  id: string
  name: string
  description: string
  slides: any[]
  duration: number
  audience: string
  difficulty: string
  tags: string[]
}

// Load a custom deck from database
export async function loadCustomDeck(deckId: string): Promise<CustomDeck | null> {
  try {
    const template = await prisma.template.findFirst({
      where: {
        id: deckId,
        category: 'deck'
      }
    })

    if (!template) {
      return null
    }

    // The sections field contains the full deck data
    const deckData = template.sections as any
    
    return {
      id: template.id,
      name: deckData.name || template.name,
      description: deckData.description || template.description || '',
      slides: deckData.slides || [],
      duration: deckData.duration || 30,
      audience: deckData.audience || 'General',
      difficulty: deckData.difficulty || 'intermediate',
      tags: deckData.tags || []
    }
  } catch (error) {
    console.error('Failed to load custom deck:', error)
    return null
  }
}

// Get all custom decks
export async function getAllCustomDecks(): Promise<CustomDeck[]> {
  try {
    const templates = await prisma.template.findMany({
      where: {
        category: 'deck'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return templates.map(template => {
      const deckData = template.sections as any
      return {
        id: template.id,
        name: deckData.name || template.name,
        description: deckData.description || template.description || '',
        slides: deckData.slides || [],
        duration: deckData.duration || 30,
        audience: deckData.audience || 'General',
        difficulty: deckData.difficulty || 'intermediate',
        tags: deckData.tags || []
      }
    })
  } catch (error) {
    console.error('Failed to load custom decks:', error)
    return []
  }
}