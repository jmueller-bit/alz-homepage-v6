require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

async function check() {
    try {
        const types = await client.getContentTypes();
        console.log('Available Content Types:', types.items.map(t => t.sys.id));

        // Check if newsArtikel exists exactly
        const entries = await client.getEntries({ content_type: 'neuigkeiten' }).catch(() => null);
        if (entries) console.log('neuigkeiten entries count:', entries.total);

        const entries2 = await client.getEntries({ content_type: 'newsArtikel' }).catch(() => null);
        if (entries2) console.log('newsArtikel entries count:', entries2.total);
    } catch (e) {
        console.error(e);
    }
}
check();
