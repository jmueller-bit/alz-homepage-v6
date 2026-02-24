import { put, del, list } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { notionClient, NOTION_DATABASE_ID } from '@/lib/notion';

// GET handler for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'Image migration API is running',
    hint: 'Use POST to migrate images from Notion to Vercel Blob',
    timestamp: new Date().toISOString()
  });
}

// POST handler to migrate images
export async function POST(request: NextRequest) {
  try {
    // Verify secret
    const secret = request.headers.get('x-revalidate-secret') || 
                   request.nextUrl.searchParams.get('secret');
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Get all published entries
    const response = await notionClient.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Veröffentlicht',
        checkbox: { equals: true }
      }
    });

    const results = [];
    
    // Process each entry
    for (const page of response.results) {
      const properties = (page as any).properties;
      const title = properties.Titel?.title?.[0]?.plain_text || 'Untitled';
      const fotoProperty = properties.foto?.files;
      
      if (fotoProperty && fotoProperty.length > 0) {
        const file = fotoProperty[0];
        const originalUrl = file.file?.url;
        
        if (originalUrl) {
          try {
            // Download image from Notion
            const imageResponse = await fetch(originalUrl);
            if (!imageResponse.ok) {
              throw new Error(`Failed to fetch: ${imageResponse.status}`);
            }
            
            const imageBlob = await imageResponse.blob();
            const fileName = file.name || `image-${Date.now()}.png`;
            
            // Upload to Vercel Blob
            const { url } = await put(`news/${page.id}/${fileName}`, imageBlob, {
              access: 'public',
              addRandomSuffix: true,
            });
            
            results.push({
              pageId: page.id,
              title,
              originalUrl: originalUrl.substring(0, 50) + '...',
              blobUrl: url,
              status: 'success'
            });
            
            console.log(`✅ Migrated: ${title} → ${url}`);
          } catch (error) {
            results.push({
              pageId: page.id,
              title,
              status: 'error',
              error: (error as Error).message
            });
            console.error(`❌ Failed: ${title}`, error);
          }
        }
      }
    }

    // Revalidate news pages
    revalidatePath('/news');
    revalidatePath('/');
    
    return NextResponse.json({
      success: true,
      migrated: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE handler to delete all migrated images
export async function DELETE(request: NextRequest) {
  try {
    // Verify secret
    const secret = request.headers.get('x-revalidate-secret') || 
                   request.nextUrl.searchParams.get('secret');
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // List all blobs in the news folder
    const { blobs } = await list({ prefix: 'news/' });
    
    const deleted = [];
    const failed = [];
    
    // Delete each blob
    for (const blob of blobs) {
      try {
        await del(blob.url);
        deleted.push(blob.pathname);
        console.log(`🗑️ Deleted: ${blob.pathname}`);
      } catch (error) {
        failed.push({ pathname: blob.pathname, error: (error as Error).message });
        console.error(`❌ Failed to delete: ${blob.pathname}`, error);
      }
    }

    // Revalidate news pages
    revalidatePath('/news');
    revalidatePath('/');
    
    return NextResponse.json({
      success: true,
      deleted: deleted.length,
      failed: failed.length,
      deletedFiles: deleted,
      failedFiles: failed,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
