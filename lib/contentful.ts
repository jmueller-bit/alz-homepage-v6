import { createClient } from 'contentful'

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'TODO',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'TODO',
})

export interface NewsItem {
  sys: {
    id: string
    createdAt: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: string
    coverImage?: {
      fields: {
        file: {
          url: string
          details: {
            image: {
              width: number
              height: number
            }
          }
        }
      }
    }
    author?: string
    publishDate: string
  }
}

export interface TeamMember {
  sys: {
    id: string
  }
  fields: {
    name: string
    role: string
    bio?: string
    photo?: {
      fields: {
        file: {
          url: string
          details: {
            image: {
              width: number
              height: number
            }
          }
        }
      }
    }
  }
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'news',
      order: ['-fields.publishDate'],
      limit: 10,
    })
    return entries.items as unknown as NewsItem[]
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'news',
      'fields.slug': slug,
      limit: 1,
    })
    return (entries.items[0] as unknown as NewsItem) || null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

export async function getLatestNews(count: number = 3): Promise<NewsItem[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'news',
      order: ['-fields.publishDate'],
      limit: count,
    })
    return entries.items as unknown as NewsItem[]
  } catch (error) {
    console.error('Error fetching latest news:', error)
    return []
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'teamMember',
      order: ['fields.order'],
    })
    return entries.items as unknown as TeamMember[]
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}
