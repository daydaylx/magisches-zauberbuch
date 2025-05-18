# Das Magische Zauberbuch – PWA Textadventure

Willkommen zum PWA Textadventure „Das Magische Zauberbuch“! Dieses Projekt umfasst ein React-Frontend (erstellt mit Vite und TypeScript) für das Spiel und ein Admin-Panel zur Verwaltung der Spielinhalte.

---

## Features (Geplant & Teilimplementiert)

### Spieler-Frontend
- PWA für Offline-Fähigkeit
- KI-gesteuerte Story-Generierung über OpenRouter (via Supabase Edge Function)
- Dynamische Szenen und Entscheidungen

### Admin-Panel
- Login-System
- CRUD-Operationen für Szenen, Charaktere, Flags und Spieleinstellungen
- Vorschau-Modus für Spielszenen

### Backend (Supabase)
- PostgreSQL-Datenbank
- Benutzerauthentifizierung
- Edge Functions für serverseitige Logik (z. B. KI-Anbindung, Spieler-Session-Management)

---

## Projektstruktur (Vorschlag)

```
/
├── public/                 # Statische Assets (Icons, Avatare, manifest.json)
│   ├── icons/
│   └── avatars/
├── supabase/
│   ├── migrations/         # SQL Datenbankmigrationen
│   └── functions/          # Supabase Edge Functions
│       ├── _shared/
│       ├── generate-next-scene/
│       └── create-player-session/
├── src/
│   ├── assets/             # Frontend-spezifische Assets (Bilder, Schriftarten)
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── Characters/
│   │   │   ├── Flags/
│   │   │   ├── Preview/
│   │   │   ├── Scenes/     # z.B. SceneEditor.tsx, SceneList.tsx
│   │   │   ├── Settings/
│   │   │   └── Shared/     # z.B. KeyValueEditor.tsx
│   │   ├── Game/           # z.B. SceneDisplay.tsx, PlayerUI.tsx
│   │   └── Common/         # z.B. LoadingSpinner.tsx, ErrorMessage.tsx
│   ├── context/            # React Context APIs (AuthContext.tsx, NotificationContext.tsx)
│   ├── hooks/              # Benutzerdefinierte React Hooks
│   ├── layout/             # Layout-Komponenten (AdminLayout.tsx, GameLayout.tsx)
│   ├── pages/
│   │   ├── admin/          # Admin-Seiten (DashboardPage.tsx, EditScenePage.tsx)
│   │   ├── game/           # Spieler-Frontend Seiten (PlayPage.tsx, StartPage.tsx)
│   │   ├── LoginPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/           # API-Aufrufe, Supabase-Interaktionen (supabaseClient.ts, sceneService.ts)
│   ├── styles/             # Globale Styles, Theme (adminTheme.ts)
│   ├── types/              # TypeScript Typdefinitionen (sceneTypes.ts, gameTypes.ts)
│   ├── utils/              # Hilfsfunktionen
│   ├── App.tsx             # Haupt-App-Komponente mit Routing
│   ├── main.tsx            # Einstiegspunkt der Vite-Anwendung
│   └── vite-env.d.ts       # Vite Umgebungs-Typdefinitionen
├── .env.local              # Lokale Umgebungsvariablen (NIE ins Git!)
├── .env.example            # Beispiel für Umgebungsvariablen
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js      # Falls Tailwind CSS verwendet wird
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Setup & Installation

1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd zauberbuch-pwa
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   # oder
   # yarn install
   ```

3. **Supabase Setup:**
   - Erstelle ein Projekt auf [Supabase](https://supabase.com).
   - Navigiere zu "Project Settings" > "API". Kopiere die **Project URL** und den **anon public Key**.
   - Erstelle die Datenbanktabellen mit den SQL-Skripten aus `supabase/migrations/`.
   - Konfiguriere Row-Level Security (RLS) Policies für deine Tabellen.
   - Hinterlege deinen OpenRouter API Key als Secret in den Supabase Edge Function Einstellungen (`OPENROUTER_API_KEY`).
   - Hinterlege deinen Supabase Service Role Key als Secret (`SUPABASE_SERVICE_ROLE_KEY`).

4. **Umgebungsvariablen einrichten:**
   - Kopiere `.env.example` zu `.env.local`.
     ```bash
     cp .env.example .env.local
     ```
   - Trage deine Supabase URL und den Anon Key in `.env.local` ein:
     ```env
     VITE_SUPABASE_URL=DEINE_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY=DEIN_SUPABASE_ANON_KEY
     ```
     *(Für Vite müssen Umgebungsvariablen, die im Client-Code verfügbar sein sollen, mit `VITE_` beginnen.)*

5. **Supabase CLI (Optional, empfohlen für Functions & Migrationen):**
   - [Supabase CLI installieren](https://supabase.com/docs/guides/cli)
   - CLI mit Projekt verbinden:
     ```bash
     supabase login
     supabase link --project-ref <DEIN_PROJEKT_REF>
     # Optional: supabase start für lokale Entwicklung
     ```
   - Edge Functions deployen:
     ```bash
     supabase functions deploy generate-next-scene
     supabase functions deploy create-player-session
     # Prüfe, dass die Secrets (OPENROUTER_API_KEY, SUPABASE_SERVICE_ROLE_KEY) im Dashboard gesetzt sind.
     ```

6. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   # oder
   # yarn dev
   ```
   Die Anwendung ist dann unter `http://localhost:5173` erreichbar.

---

## Verfügbare Skripte

- `npm run dev`: Startet den Vite Entwicklungsserver.
- `npm run build`: Erstellt einen optimierten Build für die Produktion im `dist` Ordner.
- `npm run preview`: Startet einen lokalen Server, um den Produktionsbuild zu testen.
- `npm run lint`: Führt ESLint aus, um Code-Qualität zu prüfen.

---

## Admin Panel

Das Admin Panel ist unter `/admin` erreichbar. Anmeldung erforderlich!

---

## Technologie-Stack

- **Frontend:** React, TypeScript, Vite, Material UI
- **Backend:** Supabase (Auth, PostgreSQL, Edge Functions)
- **KI-Anbindung:** OpenRouter API

---

## Beitragende

- Dein Name / Dein Team

---
