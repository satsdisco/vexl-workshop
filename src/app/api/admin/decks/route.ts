import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all custom decks from database
    const decks = await prisma.template.findMany({
      where: {
        category: 'deck'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Also include hardcoded decks from decks.ts
    const hardcodedDecks = [
      {
        id: 'main-workshop',
        name: 'Complete Workshop',
        description: 'The full Vexl experience',
        slides: [],
        duration: 45,
        audience: 'General audience',
        difficulty: 'intermediate',
        tags: ['complete', 'workshop']
      }
    ]

    return NextResponse.json({
      success: true,
      decks: [...hardcodedDecks, ...decks]
    })
  } catch (error) {
    console.error('Failed to fetch decks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch decks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deck = await request.json()

    // Save deck to database
    const savedDeck = await prisma.template.create({
      data: {
        name: deck.name,
        description: deck.description,
        category: 'deck',
        sections: deck,
        isActive: false
      }
    })

    return NextResponse.json({
      success: true,
      deck: savedDeck
    })
  } catch (error) {
    console.error('Failed to save deck:', error)
    return NextResponse.json(
      { error: 'Failed to save deck' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await request.json()

    await prisma.template.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Deck deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete deck:', error)
    return NextResponse.json(
      { error: 'Failed to delete deck' },
      { status: 500 }
    )
  }
}