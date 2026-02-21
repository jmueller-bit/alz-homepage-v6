import { createClient } from 'contentful';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function run() {
  const entries = await contentfulClient.getEntries({
    content_type: 'newsArtikel',
  });
  console.log('News items raw:', entries.items.map(i => i.fields));
  
  const mapped = entries.items.map(entry => {
  const fields = entry.fields;
  const title = fields.titel || fields.title
  const slug = fields.slug
  const date = fields.datum || fields.publishDate || fields.date
  return { title, slug, date, valid: !!(title && slug && date) };
  });
  console.log('News items mapped:', mapped);
}
run();
