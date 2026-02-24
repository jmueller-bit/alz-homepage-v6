import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const secret = request.headers.get('x-revalidate-secret')
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse body for specific slug (optional)
    let slug: string | null = null
    try {
      const body = await request.json()
      slug = body.slug || null
    } catch {
      // No body provided, revalidate all
    }

    if (slug) {
      // Revalidate specific news article
      revalidatePath(`/news/${slug}`)
      console.log(`Revalidated: /news/${slug}`)
    } else {
      // Revalidate all news pages
      revalidatePath('/news')
      revalidatePath('/')
      console.log('Revalidated all news pages')
    }
    
    return NextResponse.json({ 
      revalidated: true,
      slug: slug || 'all',
      message: slug 
        ? `Revalidated /news/${slug}` 
        : 'All news pages revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}
