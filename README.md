# Astrid Lindgren Zentrum - Website

Eine moderne Website für die Privatschule "Astrid Lindgren Zentrum" in Wien.

## Tech-Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animationen**: Framer Motion
- **CMS**: Contentful (für News & Team)
- **Kontaktformular**: Resend API

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Umgebungsvariablen

Kopieren Sie `.env.example` nach `.env.local` und füllen Sie die Werte aus:

```bash
cp .env.example .env.local
```

### 3. Development-Server starten

```bash
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser.

## Projektstruktur

```
/
├── app/                    # Next.js App Router Seiten
│   ├── layout.tsx         # Hauptlayout
│   ├── page.tsx           # Startseite
│   ├── ueber-uns/         # Über uns
│   ├── schule/            # Schule
│   ├── news/              # News (Blog)
│   ├── galerie/           # Galerie
│   ├── kontakt/           # Kontakt
│   ├── impressum/         # Impressum
│   └── datenschutz/       # Datenschutz
├── components/            # React-Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   ├── navbar.tsx         # Navigation
│   └── footer.tsx         # Footer
├── lib/                   # Utilities
│   ├── utils.ts          # Hilfsfunktionen
│   └── contentful.ts     # Contentful Client
├── public/                # Statische Dateien
│   ├── robots.txt
│   └── sitemap.xml
└── styles/               # CSS-Dateien
```

## Features

- ✅ Responsive Design (Mobile First)
- ✅ DSGVO-konform (österreichisches Recht)
- ✅ SEO-optimiert
- ✅ Barrierefrei (WCAG 2.1 AA)
- ✅ Animationen mit Framer Motion
- ✅ Lightbox-Galerie

## Anpassungen

### Farben anpassen

Die Farben sind in `tailwind.config.ts` definiert:

- Primary: `#5C8A3C` (Waldgrün)
- Secondary: `#F4A827` (Sonnengelb)
- Accent: `#E07B54` (Terrakotta)
- Background: `#FDFAF4` (Cremeweiß)

### Contentful integrieren

1. Contentful Space erstellen
2. Content Types anlegen:
   - `news`: title, slug, excerpt, content, coverImage, author, publishDate
   - `teamMember`: name, role, bio, photo, order
3. Umgebungsvariablen in `.env.local` setzen
4. Die `lib/contentful.ts` Functions verwenden

## Deployment

Auf Vercel deployen:

```bash
vercel deploy
```

Oder mit GitHub Actions auf Vercel verbinden.

## Lizenz

Proprietär - Alle Rechte vorbehalten.
