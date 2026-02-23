# Anleitung: Contentful Integration mit Next.js auf Vercel

Diese Anleitung dokumentiert, wie man Contentful als CMS für Next.js Projekte auf Vercel einrichtet und häufige Fehler behebt.

## Inhalt
1. [Grundlegende Einrichtung](#grundlegende-einrichtung)
2. [Häufige Fehler und Lösungen](#häufige-fehler-und-lösungen)
3. [Vercel CLI Workflow](#vercel-cli-workflow)
4. [Troubleshooting](#troubleshooting)

---

## Grundlegende Einrichtung

### 1. Contentful Einrichtung

1. Contentful Space erstellen oder bestehenden verwenden
2. Content Type erstellen (z.B. `newsArtikel`)
3. API Keys generieren:
   - Gehe zu Settings → API keys
   - Content Delivery API Token erstellen
   - Space ID notieren

### 2. Lokale Entwicklung

`.env.local` Datei erstellen:

```bash
CONTENTFUL_SPACE_ID=deine_space_id
CONTENTFUL_ACCESS_TOKEN=dein_token
```

### 3. Contentful Client erstellen

```typescript
// lib/contentful.ts
import { createClient } from 'contentful'

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'TODO',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'TODO',
})
```

### 4. Next.js Page mit dynamischem Rendering

```typescript
// app/news/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 120 // Sekunden

export default async function NewsPage() {
  const newsItems = await getNews()
  // ... render logic
}
```

**Wichtig:** Ohne `dynamic = 'force-dynamic'` wird die Seite bei Build-Zeit statisch generiert und aktualisiert sich nicht automatisch.

---

## Häufige Fehler und Lösungen

### ❌ Fehler 1: "Derzeit sind keine News veröffentlicht"

**Ursache:** Environment Variables sind auf Vercel nicht gesetzt.

**Lösung:**
1. Vercel Dashboard öffnen
2. Project Settings → Environment Variables
3. Folgende Variablen hinzufügen:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
4. Neu deployen

### ❌ Fehler 2: Contentful API 404 Fehler

**Ursache:** Falsche Content Type ID.

**Beispiel Fehlermeldung:**
```
The resource could not be found.
```

**Lösung:**
Content Type ID prüfen:
```bash
curl -s "https://cdn.contentful.com/spaces/$SPACE_ID/content_types" \
  -H "Authorization: Bearer $TOKEN"
```

### ❌ Fehler 3: Space ID enthält falsche Zeichen

**Ursache:** Environment Variable enthält zusätzlichen Text wie `CONTENTFUL_SPACE_ID=`

**Falsch:** ❌
```
CONTENTFUL_SPACE_ID=CONTENTFUL_SPACE_ID=4wwsd5b3f66i
```

**Richtig:** ✅
```
CONTENTFUL_SPACE_ID=4wwsd5b3f66i
```

**Prüfung:** In den Build-Logs nach der URL suchen:
```
https://cdn.contentful.com/spaces/CONTENTFUL_SPACE_ID=4wwsd5b3f66i
                                                ^^^^^^^^^^^^^^^^^^^^
                                                Das ist falsch!
```

---

## Vercel CLI Workflow

### Projekt verlinken

```bash
# Im Projektverzeichnis
vercel link
```

### Environment Variables prüfen

```bash
vercel env list
```

### Environment Variable hinzufügen

```bash
# Interaktiv
echo "dein_wert" | vercel env add VARIABLE_NAME production

# Für alle Umgebungen
echo "dein_wert" | vercel env add VARIABLE_NAME
```

### Environment Variable entfernen

```bash
vercel env rm VARIABLE_NAME -y
```

### Production Deploy

```bash
vercel --prod
```

---

## Troubleshooting

### API Test mit curl

```bash
# Content Types auflisten
curl -s "https://cdn.contentful.com/spaces/$SPACE_ID/content_types" \
  -H "Authorization: Bearer $TOKEN"

# Entries abrufen
curl -s "https://cdn.contentful.com/spaces/$SPACE_ID/entries?content_type=newsArtikel" \
  -H "Authorization: Bearer $TOKEN"
```

### Build-Logs prüfen

1. Vercel Dashboard → Deployments
2. Letzten Deploy auswählen
3. "Build Logs" öffnen
4. Nach Fehlermeldungen suchen

### Lokale Simulation

```bash
# Mit Production Env Vars lokal testen
vercel env pull .env.production.local
npm run build
npm start
```

### Cache invalidieren

Falls alte Daten angezeigt werden:

```bash
# Vercel Cache leeren (im Dashboard)
# Deployments → ... → "Redeploy"
```

---

## Checkliste für neue Projekte

- [ ] Contentful Space erstellt
- [ ] Content Type definiert
- [ ] API Keys generiert
- [ ] `.env.local` für lokale Entwicklung erstellt
- [ ] `dynamic = 'force-dynamic'` in der Page gesetzt
- [ ] Environment Variables auf Vercel gesetzt
- [ ] Production Deploy durchgeführt
- [ ] API-Response mit curl geprüft
- [ ] Website im Browser getestet

---

## Nützliche Links

- [Contentful Delivery API Docs](https://www.contentful.com/developers/docs/references/content-delivery-api/)
- [Next.js Static & Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## Beispiel: Vollständiger Workflow

```bash
# 1. Projekt verlinken
vercel link

# 2. Alte fehlerhafte Variable entfernen (falls vorhanden)
vercel env rm CONTENTFUL_SPACE_ID -y

# 3. Variablen korrekt setzen
echo "4wwsd5b3f66i" | vercel env add CONTENTFUL_SPACE_ID production
echo "e2a7be5qS26XyG5ypoQ0EZQnzi0hf_07wheGuNXxHZY" | vercel env add CONTENTFUL_ACCESS_TOKEN production

# 4. Variablen prüfen
vercel env list

# 5. API testen
curl -s "https://cdn.contentful.com/spaces/4wwsd5b3f66i/entries?content_type=newsArtikel" \
  -H "Authorization: Bearer e2a7be5qS26XyG5ypoQ0EZQnzi0hf_07wheGuNXxHZY"

# 6. Deployen
vercel --prod

# 7. Ergebnis prüfen
curl -s https://deine-domain.at/news | grep "News Titel"
```

---

**Hinweis:** Nach jeder Änderung an den Environment Variables muss ein neuer Deploy durchgeführt werden, damit die Änderungen wirksam werden.
