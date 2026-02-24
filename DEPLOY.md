# ALZ Homepage V6 - Notion CMS

Dies ist die Version 6 der ALZ Homepage mit **Notion als CMS** für News.

## Features

- ✅ **Notion CMS** - News werden direkt aus einer Notion Datenbank geladen
- ✅ **Rich Text Support** - Alle Notion Formatierungen werden korrekt dargestellt:
  - Überschriften, Absätze, Listen
  - Fett, Kursiv, Code, Links, Farben
  - Bilder, Zitate, Code-Blöcke, Callouts
  - Tabellen, Toggle-Listen
- ✅ **Bilder aus Notion** - Werden automatisch geladen und optimiert
- ✅ **Lustige Error-Seite** - Bei Fehlern werden humorvolle Nachrichten angezeigt
- ✅ **ISR (Incremental Static Regeneration)** - Seiten werden alle 2 Minuten aktualisiert

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Notion API (@notionhq/client)
- **Deployment:** Vercel
- **TypeScript:** Ja

## Notion Datenbank Setup

Die Notion Datenbank muss folgende Properties haben:

| Property | Type | Beschreibung |
|----------|------|--------------|
| `Titel` | Title | News-Titel |
| `Slug` | Text | URL-freundlicher Identifier (z.B. "neue-website") |
| `Datum` | Date | Veröffentlichungsdatum |
| `Kategorie` | Select | z.B. "Allgemein", "Events", "Termine" |
| `Status` | Select | "Published", "Draft", "Archived" |
| `Vorschautext` | Text | Kurze Zusammenfassung für Listen |
| `Bild` | Files | Titelbild (optional) |
| `Inhalt` | Page Content | Rich Text Content mit allen Formatierungen |

## Umgebungsvariablen

Folgende Variablen müssen in Vercel gesetzt werden:

```bash
NOTION_API_KEY=dein_notion_api_key_hier_einfügen
NOTION_DATABASE_ID=31185ad01fa58015a2b0d8a93c3226e1
```

**Hinweis:** Den Notion API Key erhalten Sie vom Projekt-Administrator.

## Manuelle Vercel Einrichtung

Da das Vercel CLI auf diesem System nicht funktioniert, hier die manuelle Anleitung:

### Schritt 1: Vercel Projekt erstellen

1. Gehe zu https://vercel.com/dashboard
2. Klicke auf "Add New..." → "Project"
3. Wähle "Import Git Repository"
4. Wähle das Repository: `foozy74/alz-homepage-v6`
5. Klicke "Import"

### Schritt 2: Konfiguration

- **Framework Preset:** Next.js
- **Root Directory:** `./` (Standard)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### Schritt 3: Umgebungsvariablen

Klicke auf "Environment Variables" und füge hinzu:

```
Name: NOTION_API_KEY
Value: dein_notion_api_key_hier_einfügen

Name: NOTION_DATABASE_ID
Value: 31185ad01fa58015a2b0d8a93c3226e1
```

**Hinweis:** Den API Key erhalten Sie vom Projekt-Administrator.

**Wichtig:** Aktiviere alle Umgebungen (Production, Preview, Development)

### Schritt 4: Deploy

Klicke auf "Deploy" und warte ca. 2-3 Minuten.

### Schritt 5: Domain einrichten

1. Gehe zu Project Settings → Domains
2. Füge deine Domain hinzu (z.B. `alz6.thesolution.at`)
3. Folge den DNS-Anweisungen

## Automatisches Deployment

Das Projekt ist für automatisches Deployment konfiguriert:
- Bei jedem Push zu `main` wird automatisch deployed
- ISR aktualisiert die Seiten alle 2 Minuten

## Fehlerbehebung

### "NOTION_API_KEY is not set"
- Prüfe ob die Umgebungsvariable in Vercel gesetzt ist
- Stelle sicher dass alle Umgebungen (Prod/Preview/Dev) aktiviert sind
- Trigger einen neuen Deploy

### Bilder werden nicht angezeigt
- Notion Bilder haben temporäre URLs (1 Stunde gültig)
- ISR sollte dies automatisch aktualisieren
- Alternativ: Bilder zu einem externen CDN migrieren

### Rich Text wird nicht formatiert
- Prüfe ob der Content im Notion Page Content Bereich ist (nicht als Property)
- Stelle sicher dass keine unsupported Block Types verwendet werden

## Contentful für andere Features

Contentful wird weiterhin verwendet für:
- Team Mitglieder (`teamMitglied`)
- Galerie Bilder (`galleryImage`)

Diese bleiben unverändert und funktionieren mit den bestehenden Contentful Zugangsdaten.

## Entwicklung

```bash
# Lokale Entwicklung
npm install
npm run dev

# Build testen
npm run build

# Linting
npm run lint
```

## Support

Bei Problemen:
1. Vercel Build Logs prüfen
2. Notion API Key validieren
3. Datenbank-ID prüfen
4. Umgebungsvariablen in Vercel kontrollieren

---

**Repository:** https://github.com/foozy74/alz-homepage-v6
