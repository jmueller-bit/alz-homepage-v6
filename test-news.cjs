require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful');
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});
async function check() {
    const entries = await client.getEntries({ content_type: 'newsArtikel' });
    console.log(JSON.stringify(entries.items[0].fields, null, 2));
}
check();
