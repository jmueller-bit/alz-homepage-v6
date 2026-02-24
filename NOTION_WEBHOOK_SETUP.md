# Automatisches Update bei Notion Änderungen

Da Notion **keine nativen Webhooks** für Datenbank-Änderungen bietet, gibt es 3 Lösungen:

## Option 1: On-Demand Revalidation mit API (BESTE) ✅

**Funktionsweise:** Ein API-Endpoint wird von extern getriggert.

### Einrichtung:

1. **Umgebungsvariable setzen** (in Vercel):
   ```
   REVALIDATE_SECRET=ein_zufälliges_passwort_123
   ```

2. **Make.com / Zapier einrichten:**
   - Erstelle einen Account bei https://make.com (kostenlos)
   - Scenario erstellen: "Notion → HTTP Request"
   - Trigger: "New Database Item in Notion"
   - Action: HTTP POST
     ```
     URL: https://deine-domain.vercel.app/api/revalidate
     Headers:
       x-revalidate-secret: ein_zufälliges_passwort_123
     ```

3. **Manueller Trigger** (ohne Make.com):
   ```bash
   curl -X POST https://deine-domain.vercel.app/api/revalidate \
     -H "x-revalidate-secret: ein_zufälliges_passwort_123"
   ```

**Vorteil:** Sofortiges Update nach Notion Änderung

---

## Option 2: Vercel Cron Job (EINFACH)

**Funktionsweise:** Automatischer Rebuild alle X Minuten/Stunden.

### Einrichtung:

In `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/revalidate",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

Das triggert alle 6 Stunden einen Rebuild.

**Vorteil:** Einfach, funktioniert ohne externe Dienste
**Nachteil:** Verzögerung bis zu 6 Stunden

---

## Option 3: Server-Side Rendering (SSR) (SCHNELLSTE)

**Funktionsweise:** Kein Caching, Daten werden bei jedem Request frisch geladen.

### Einrichtung:

In `app/news/page.tsx`:
```typescript
export const dynamic = 'force-dynamic'
// KEIN export const revalidate!
```

**Vorteil:** Immer aktuelle Daten
**Nachteil:** Langsamere Ladezeiten, höhere Server-Kosten

---

## Empfehlung

Für ALZ Homepage: **Option 1 mit Make.com**

- Kostenlos (bis 1000 Requests/Monat)
- Sofortiges Update
- Einmal einrichten, dann automatisch

---

## Quick Fix für jetzt

Falls du sofort aktuelle Daten brauchst:

```bash
# Trigger manuell einen Rebuild
curl -X POST https://alz-homepage-v6.vercel.app/api/revalidate \
  -H "x-revalidate-secret: dein_secret_hier"
```

Oder: **Vercel Dashboard** → Deployments → "Redeploy"

---

## Troubleshooting

### "Page not found" bei API-Call
- Stelle sicher dass `REVALIDATE_SECRET` gesetzt ist
- Prüfe die URL: muss exakt die Domain sein

### Daten werden immer noch nicht aktualisiert
- ISR Cache hat noch 120 Sekunden alte Daten
- Warte 2 Minuten und lade neu (Ctrl+F5)
- Oder: `revalidate = 0` für Testing (aber langsam!)

### Make.com funktioniert nicht
- Stelle sicher dass die Notion-Integration Zugriff auf die DB hat
- Prüfe das Scenario-Log auf Fehler
