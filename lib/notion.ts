import { Client } from '@notionhq/client'

const NOTION_DATABASE_ID = '31185ad01fa58015a2b0d8a93c3226e1'

// Validate environment variables
if (!process.env.NOTION_API_KEY) {
  console.warn('⚠️ WARNING: NOTION_API_KEY is not set in environment variables!')
}

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY || 'TODO',
})

export type NewsEntry = {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  content?: any[] // Notion blocks
  contentHtml?: string
  image?: {
    url: string
    width?: number
    height?: number
  }
  category?: string
  status: 'Published' | 'Draft' | 'Archived'
}

// Helper: Extract plain text from rich text array
function extractPlainText(richText: any[]): string {
  return richText.map((text: any) => text.plain_text || '').join('')
}

// Helper: Convert rich text to HTML
function richTextToHtml(richText: any[]): string {
  return richText.map((text: any) => {
    let content = text.plain_text || ''
    const annotations = text.annotations || {}
    
    // Apply annotations
    if (annotations.code) {
      content = `<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">${content}</code>`
    }
    if (annotations.bold) content = `<strong>${content}</strong>`
    if (annotations.italic) content = `<em>${content}</em>`
    if (annotations.strikethrough) content = `<s>${content}</s>`
    if (annotations.underline) content = `<u>${content}</u>`
    
    // Color support
    if (annotations.color && annotations.color !== 'default') {
      const color = annotations.color.replace('_background', '')
      content = `<span style="color: ${color}">${content}</span>`
    }
    
    // Links
    if (text.href) {
      content = `<a href="${text.href}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${content}</a>`
    }
    
    return content
  }).join('')
}

// Convert Notion blocks to HTML
export function blocksToHtml(blocks: any[]): string {
  if (!blocks || blocks.length === 0) return ''
  
  let html = ''
  let inList = false
  let listType = ''
  
  for (const block of blocks) {
    const type = block.type
    
    // Close previous list if type changes
    if (inList && type !== listType) {
      html += listType === 'bulleted_list_item' ? '</ul>' : '</ol>'
      inList = false
      listType = ''
    }
    
    switch (type) {
      case 'paragraph':
        const text = richTextToHtml(block.paragraph?.rich_text || [])
        if (text.trim()) {
          html += `<p class="mb-4 font-serif text-charcoal/80 leading-relaxed">${text}</p>`
        } else {
          html += '<br/>'
        }
        break
        
      case 'heading_1':
        const h1Text = extractPlainText(block.heading_1?.rich_text || [])
        html += `<h2 class="text-3xl font-bold text-charcoal mt-8 mb-4">${h1Text}</h2>`
        break
        
      case 'heading_2':
        const h2Text = extractPlainText(block.heading_2?.rich_text || [])
        html += `<h3 class="text-2xl font-bold text-charcoal mt-6 mb-3">${h2Text}</h3>`
        break
        
      case 'heading_3':
        const h3Text = extractPlainText(block.heading_3?.rich_text || [])
        html += `<h4 class="text-xl font-bold text-charcoal mt-4 mb-2">${h3Text}</h4>`
        break
        
      case 'bulleted_list_item':
        if (!inList || listType !== 'bulleted_list_item') {
          html += '<ul class="list-disc list-inside mb-4 ml-4 font-serif text-charcoal/80">'
          inList = true
          listType = 'bulleted_list_item'
        }
        const bulletText = richTextToHtml(block.bulleted_list_item?.rich_text || [])
        html += `<li class="mb-1">${bulletText}</li>`
        break
        
      case 'numbered_list_item':
        if (!inList || listType !== 'numbered_list_item') {
          html += '<ol class="list-decimal list-inside mb-4 ml-4 font-serif text-charcoal/80">'
          inList = true
          listType = 'numbered_list_item'
        }
        const numberText = richTextToHtml(block.numbered_list_item?.rich_text || [])
        html += `<li class="mb-1">${numberText}</li>`
        break
        
      case 'quote':
        const quoteText = richTextToHtml(block.quote?.rich_text || [])
        html += `<blockquote class="border-l-4 border-primary pl-4 italic my-6 font-serif text-charcoal/70">${quoteText}</blockquote>`
        break
        
      case 'divider':
        html += '<hr class="my-8 border-charcoal/20"/>'
        break
        
      case 'code':
        const codeText = extractPlainText(block.code?.rich_text || [])
        const language = block.code?.language || 'plain text'
        html += `<pre class="bg-charcoal text-cream p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono">${codeText}</code></pre>`
        break
        
      case 'image':
        const imageUrl = block.image?.file?.url || block.image?.external?.url
        const caption = block.image?.caption?.length > 0 
          ? extractPlainText(block.image.caption) 
          : ''
        if (imageUrl) {
          html += `<figure class="my-6">
            <img src="${imageUrl}" alt="${caption}" class="w-full rounded-lg shadow-md"/>
            ${caption ? `<figcaption class="text-center text-sm text-charcoal/60 mt-2 font-serif">${caption}</figcaption>` : ''}
          </figure>`
        }
        break
        
      case 'callout':
        const calloutText = richTextToHtml(block.callout?.rich_text || [])
        const calloutIcon = block.callout?.icon?.emoji || '💡'
        html += `<div class="bg-secondary/10 border-l-4 border-secondary p-4 my-6 rounded-r-lg">
          <div class="flex items-start gap-3">
            <span class="text-2xl">${calloutIcon}</span>
            <div class="font-serif text-charcoal/80">${calloutText}</div>
          </div>
        </div>`
        break
        
      case 'toggle':
        const toggleTitle = richTextToHtml(block.toggle?.rich_text || [])
        // Toggle children would need recursive fetching
        html += `<details class="my-4 border border-charcoal/20 rounded-lg p-4">
          <summary class="font-bold cursor-pointer">${toggleTitle}</summary>
          <div class="mt-2">...</div>
        </details>`
        break
        
      case 'table':
        // Tables need special handling with table_width and children
        html += '<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-charcoal/20">'
        // Table rows would be in block.children
        html += '</table></div>'
        break
        
      default:
        // Unknown block type - try to render content if available
        if (block[type]?.rich_text) {
          const fallbackText = richTextToHtml(block[type].rich_text)
          html += `<p class="mb-4 font-serif text-charcoal/80">${fallbackText}</p>`
        }
    }
  }
  
  // Close any open list
  if (inList) {
    html += listType === 'bulleted_list_item' ? '</ul>' : '</ol>'
  }
  
  return html
}

// Helper: Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[ä]/g, 'ae')
    .replace(/[ö]/g, 'oe')
    .replace(/[ü]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Map Notion page to NewsEntry
function mapNotionPage(page: any): NewsEntry | null {
  const properties = page.properties
  
  // Extract properties (Deutsche Namen wie in Notion)
  const titleProperty = properties.Titel?.title
  const dateProperty = properties.Datum?.date
  const categoryProperty = properties.Kategorie?.multi_select
  const statusProperty = properties.Veröffentlicht?.checkbox
  const excerptProperty = properties.Beschreibung?.rich_text
  const imageProperty = properties.foto?.files
  
  const title = titleProperty ? extractPlainText(titleProperty) : ''
  const date = dateProperty?.start || new Date().toISOString()
  // Use first category if available, otherwise default
  const category = categoryProperty?.[0]?.name || 'Allgemein'
  const isPublished = statusProperty || false
  const excerpt = excerptProperty ? extractPlainText(excerptProperty) : ''
  
  // Generate slug from title (since Slug property doesn't exist in Notion)
  const slug = generateSlug(title)
  
  // Get image from files property
  let image = undefined
  if (imageProperty && imageProperty.length > 0) {
    const file = imageProperty[0]
    const imageUrl = file.file?.url || file.external?.url
    if (imageUrl) {
      image = {
        url: imageUrl,
        width: undefined,
        height: undefined,
      }
    }
  }
  
  if (!title || !slug) {
    return null
  }
  
  return {
    id: page.id,
    title,
    slug,
    excerpt,
    date,
    category,
    status: isPublished ? 'Published' : 'Draft',
    image,
  }
}

// Get all published news
export async function getNews(limit = 10): Promise<NewsEntry[]> {
  if (!process.env.NOTION_API_KEY || process.env.NOTION_API_KEY === 'TODO') {
    return [{
      id: 'env-error',
      title: '🚨 Server-Fehler: Notion API Key fehlt',
      slug: 'fehlende-konfiguration',
      excerpt: 'Die Umgebungsvariable NOTION_API_KEY ist nicht gesetzt. Bitte im Vercel Dashboard eintragen!',
      date: new Date().toISOString(),
      status: 'Published',
    }]
  }

  try {
    const response = await notionClient.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Veröffentlicht',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Datum',
          direction: 'descending',
        },
      ],
      page_size: limit,
    })

    return response.results
      .map(mapNotionPage)
      .filter((entry): entry is NewsEntry => entry !== null)
      
  } catch (error: any) {
    console.error('Error fetching news from Notion:', error)
    return [{
      id: 'api-error',
      title: '🚨 Notion API Fehler',
      slug: 'api-error',
      excerpt: `Fehler beim Laden der News: ${error.message}. Bitte später erneut versuchen.`,
      date: new Date().toISOString(),
      status: 'Published',
    }]
  }
}

// Get single news by slug
export async function getNewsBySlug(slug: string): Promise<NewsEntry | null> {
  if (!process.env.NOTION_API_KEY || process.env.NOTION_API_KEY === 'TODO') {
    return null
  }

  try {
    // Get all published entries and filter by generated slug
    // (since we generate slugs from titles, we can't query by slug directly)
    const response = await notionClient.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Veröffentlicht',
        checkbox: {
          equals: true,
        },
      },
    })

    // Find entry with matching slug
    const page = response.results.find((p: any) => {
      const title = p.properties.Titel?.title?.[0]?.plain_text || ''
      return generateSlug(title) === slug
    })

    if (!page) {
      return null
    }

    const entry = mapNotionPage(page)
    
    if (!entry) {
      return null
    }

    // Fetch content blocks
    const blocksResponse = await notionClient.blocks.children.list({
      block_id: page.id,
    })

    entry.content = blocksResponse.results
    entry.contentHtml = blocksToHtml(blocksResponse.results)

    return entry
    
  } catch (error: any) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

// Get latest news (for homepage)
export async function getLatestNews(count: number = 3): Promise<NewsEntry[]> {
  return getNews(count)
}

export default notionClient
