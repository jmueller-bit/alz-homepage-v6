# Make.com Einrichtung für Notion → Vercel Revalidation

Diese Anleitung zeigt Schritt für Schritt, wie du Make.com einrichtest, damit neue Notion Einträge automatisch die Website aktualisieren.

## Voraussetzungen

- Make.com Account (kostenlos): https://www.make.com/en/register
- Deine Website ist live auf Vercel
- Notion Datenbank existiert mit Einträgen

---

## Schritt 1: Make.com Account erstellen

1. Gehe zu https://www.make.com/en/register
2. Wähle "Sign up with email"
3. Gib deine E-Mail-Adresse ein
4. Erstelle ein Passwort
5. Bestätige die E-Mail (Check dein Postfach)
6. Wähle bei der Einrichtung:
   - "I am a: Developer"
   - Company size: "1-10"
   - Use case: "Other"

---

## Schritt 2: Neues Scenario erstellen

1. Nach dem Login klickst du auf **"Create a new scenario"**
2. Klicke auf das **große Plus-Symbol** in der Mitte
3. Suche nach **"Notion"** und wähle es aus

---

## Schritt 3: Notion Trigger einrichten

### 3.1 Verbindung zu Notion herstellen

1. Wähle **"Watch Database Items"** als Trigger
2. Klicke auf **"Add"** um eine neue Verbindung zu erstellen
3. Ein Popup öffnet sich - klicke **"Create a connection"**
4. Du wirst zu Notion weitergeleitet
5. Wähle deinen Workspace und klicke **"Select pages"**
6. Wähle die Seite mit deiner News-Datenbank aus
7. Klicke **"Allow access"**
8. Du wirst zurück zu Make.com geleitet

### 3.2 Datenbank auswählen

1. Unter **"Database ID"** klickst du auf **"Select"**
2. Wähle deine News Datenbank aus
3. **Limit:** Lass den Standard (10) oder erhöhe auf 50
4. Klicke **"OK"**

### 3.3 Testen

1. Klicke auf **"Run once"** (oben rechts)
2. Erstelle einen Test-Eintrag in Notion (falls noch keiner existiert)
3. Warte 10-20 Sekunden
4. Das Scenario sollte den Eintrag anzeigen (grünes Häkchen)

---

## Schritt 4: HTTP Request zu Vercel senden

### 4.1 Modul hinzufügen

1. Klicke auf das **Plus-Symbol** rechts vom Notion-Modul
2. Suche nach **"HTTP"** und wähle **"Make a request"**
3. Verbinde oder überspringe (HTTP braucht keine Auth)

### 4.2 Request konfigurieren

Fülle folgende Felder aus:

**URL:**
```
https://alz-homepage-v6.vercel.app/api/revalidate
```
*(Ersetze mit deiner tatsächlichen Domain)*

**Method:**
```
POST
```

**Headers:**
```
Key: x-revalidate-secret
Value: dein_geheimes_passwort_123
```
*(Das ist das REVALIDATE_SECRET aus Vercel)*

**Body type:**
```
Raw
```

**Content type:**
```
JSON (application/json)
```

**Request content:**
```json
{
  "slug": "{{1.properties.Slug}}"
}
```

**Wichtig:** Das `{{1.properties.Slug}}` fügt automatisch den Slug aus Notion ein!

### 4.3 Speichern

1. Klicke **"OK"**
2. Klicke **"Save"** (oben links, Disketten-Symbol)
3. Gib dem Scenario einen Namen: "Notion News Update"

---

## Schritt 5: Scenario aktivieren

### 5.1 Scheduling einrichten

1. Klicke auf das **Uhr-Symbol** links vom Notion-Modul
2. Wähle **"On demand"** oder **"At regular intervals"**
3. Wenn regelmäßig: Setze auf **"Every 15 minutes"**
4. Klicke **"OK"**

### 5.2 Aktivieren

1. Schalte den **Schalter unten links** auf **"ON"**
2. Das Scenario läuft jetzt!

---

## Schritt 6: Testen

### 6.1 Manueller Test

1. Gehe zu deiner Notion Datenbank
2. Erstelle einen neuen Eintrag:
   - Titel: "Test Artikel"
   - Slug: "test-artikel"
   - Veröffentlicht: ✅ (Checkbox aktivieren!)
3. Warte 30-60 Sekunden
4. Gehe zu https://alz-homepage-v6.vercel.app/news
5. Der Artikel sollte erscheinen!

### 6.2 In Make.com prüfen

1. Gehe zurück zu Make.com
2. Klicke auf **"History"** (oben)
3. Du solltest einen erfolgreichen Run sehen:
   - Notion: Grünes Häkchen
   - HTTP: Grünes Häkchen mit Status 200

---

## Fehlerbehebung

### "401 Unauthorized"
- REVALIDATE_SECRET in Vercel prüfen
- Muss exakt gleich sein in Make.com Header

### "404 Not Found"
- URL prüfen: Muss https://deine-domain.vercel.app/api/revalidate sein
- Kein Slash am Ende!

### Notion findet keine Einträge
- Stelle sicher, dass die Datenbank in Notion "Veröffentlicht" hat
- Check die Datenbank-ID in Make.com

### HTTP Request schlägt fehl
- Klicke auf das HTTP-Modul → "Run this module only"
- Prüfe die Response
- Body muss valides JSON sein

---

## Wichtige Hinweise

### Kostenlose Limits (Make.com)
- **1.000 Operations/Monat** (kostenlos)
- Ein Run = 2 Operations (Notion + HTTP)
- Also ~500 Artikel-Updates/Monat kostenlos
- Danach: $9/Monat für 10.000 Operations

### Sicherheit
- Teile das REVALIDATE_SECRET **niemals** öffentlich
- In Make.com ist es verschlüsselt gespeichert
- Rotiere das Secret regelmäßig (alle 6 Monate)

### Alternative: Zapier
Falls Make.com nicht funktioniert:
- https://zapier.com
- Gleicher Ablauf: Notion Trigger → Webhook Action
- Kostenlos bis 100 Runs/Monat

---

## Schnell-Checkliste

- [ ] Make.com Account erstellt
- [ ] Notion verbunden
- [ ] Datenbank-ID korrekt
- [ ] HTTP Request URL richtig
- [ ] REVALIDATE_SECRET in Header
- [ ] Body mit Slug-Variable
- [ ] Scenario auf ON geschaltet
- [ ] Test-Eintrag in Notion erstellt
- [ ] Website zeigt neuen Artikel

---

## Support

Falls es nicht funktioniert:
1. Screenshot vom Make.com Error
2. Vercel Function Logs prüfen
3. Notion Integration Berechtigungen checken

**Glückwunsch!** 🎉 Ab jetzt werden alle Notion Änderungen automatisch auf der Website angezeigt!
