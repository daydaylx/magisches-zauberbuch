Zusammenfassung der Datenbankstruktur für "Das Magische Zauberbuch"
Dieses Dokument beschreibt die Struktur der PostgreSQL-Datenbank, die über Supabase für das PWA-Textadventure "Das Magische Zauberbuch" verwaltet wird.
Hilfsfunktionen
* public.handle_updated_at(): Eine Trigger-Funktion, die automatisch das Feld updated_at jeder Tabelle aktualisiert, wenn eine Zeile geändert wird.
Tabellenübersicht
1. public.game_settings
   * Zweck: Speichert globale Einstellungen für das Spiel. Es ist so konzipiert, dass es idealerweise nur eine Zeile für die primären Einstellungen gibt, identifiziert durch setting_key.
   * Spalten:
      * id (UUID, PK, DEFAULT gen_random_uuid()): Eindeutiger Identifikator.
      * created_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der Erstellung.
      * updated_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der letzten Aktualisierung.
      * setting_key (TEXT, UNIQUE, NOT NULL, DEFAULT 'primary_settings'): Ein Schlüssel, um die Einstellungszeile eindeutig zu identifizieren (z.B. "primary_settings").
      * main_plot_outline_for_ai (TEXT): Grobe Handlungsübersicht für die KI.
      * global_tone_style_for_ai (TEXT): Globaler Ton und Stil für KI-generierte Inhalte.
      * default_player_char_id (UUID, FK REFERENCES characters(id) ON DELETE SET NULL): ID des Standard-Spielercharakters (optional).
      * default_start_scene_slug (TEXT): Slug der Standard-Startszene (optional).
      * ai_model_preference (TEXT, DEFAULT 'openai/gpt-4o'): Bevorzugtes KI-Modell.
      * global_ai_params (JSONB, DEFAULT '{}'): Globale Parameter für die KI (z.B. Temperatur, max_tokens).
   * Trigger: on_game_settings_updated (ruft handle_updated_at auf).
   * RLS Policies:
      * Allow public read access to game settings: Erlaubt Lesezugriff für alle.
      * Allow admin full access to game settings: Erlaubt vollen Zugriff für die service_role (oder eine spezifische Admin-Rolle).
2. public.characters
   * Zweck: Definiert Spielercharaktere und NPCs.
   * Spalten:
      * id (UUID, PK, DEFAULT gen_random_uuid()): Eindeutiger Identifikator.
      * created_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der Erstellung.
      * updated_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der letzten Aktualisierung.
      * character_slug (TEXT, UNIQUE, NOT NULL): Eindeutiger Kurzname/Slug für den Charakter.
      * name (TEXT, NOT NULL): Anzeigename des Charakters.
      * is_player_character (BOOLEAN, NOT NULL, DEFAULT FALSE): Gibt an, ob dies ein Spielercharakter ist.
      * description_for_ai (TEXT): Beschreibung des Charakters für den KI-Kontext.
      * initial_stats (JSONB, DEFAULT '{}'): Initiale Charakterstatistiken.
      * initial_inventory (JSONB, DEFAULT '[]'): Initiales Inventar des Charakters.
      * initial_flags (JSONB, DEFAULT '{}'): Initiale Flags, die für diesen Charakter gesetzt sind.
      * avatar_url (TEXT): URL zu einem Avatarbild.
   * Indizes: idx_character_slug, idx_is_player_character.
   * Trigger: on_characters_updated (ruft handle_updated_at auf).
   * RLS Policies:
      * Allow public read access to characters: Erlaubt Lesezugriff für alle.
      * Allow admin full access to characters: Erlaubt vollen Zugriff für die service_role.
3. public.scenes
   * Zweck: Speichert die einzelnen Szenen des Spiels.
   * Spalten:
      * id (UUID, PK, DEFAULT gen_random_uuid()): Eindeutiger Identifikator.
      * created_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der Erstellung.
      * updated_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der letzten Aktualisierung.
      * scene_slug (TEXT, UNIQUE, NOT NULL): Eindeutiger Kurzname/Slug für die Szene.
      * title_for_admin (TEXT): Titel der Szene für das Admin-Panel.
      * text_for_player (TEXT): Hauptbeschreibungstext der Szene für den Spieler.
      * image_url (TEXT): Optionale URL zu einem Szenenbild.
      * music_url (TEXT): Optionale URL zu Hintergrundmusik.
      * context_description_for_ai (TEXT): Kontextbeschreibung für die KI, wenn von dieser Szene aus generiert wird.
      * initial_prompt_for_ai (TEXT): Spezifischer Prompt für die KI, falls diese Szene ein Startpunkt für die Generierung ist.
      * is_ai_generated (BOOLEAN, NOT NULL, DEFAULT FALSE): Gibt an, ob der Szeneninhalt KI-generiert wurde.
      * tags (TEXT[] DEFAULT '{}'): Array für Tags
   * Indizes: idx_scene_slug, idx_scene_tags (GIN-Index für Array-Suche).
   * Trigger: on_scenes_updated (ruft handle_updated_at auf).
   * RLS Policies:
      * Allow public read access to scenes: Erlaubt Lesezugriff für alle.
      * Allow admin full access to scenes: Erlaubt vollen Zugriff für die service_role.
4. public.choices
   * Zweck: Speichert die Entscheidungsoptionen, die einem Spieler in einer bestimmten Szene zur Verfügung stehen.
   * Spalten:
      * id (UUID, PK, DEFAULT gen_random_uuid()): Eindeutiger Identifikator.
      * created_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der Erstellung.
      * updated_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der letzten Aktualisierung.
      * scene_id (UUID, NOT NULL, FK REFERENCES scenes(id) ON DELETE CASCADE): ID der Szene, zu der diese Option gehört. Wird die Szene gelöscht, werden auch die Optionen gelöscht.
      * order_in_scene (INTEGER, NOT NULL, DEFAULT 0): Reihenfolge der Anzeige der Optionen in der Szene.
      * player_facing_text (TEXT, NOT NULL): Text der Option, der dem Spieler angezeigt wird.
      * ai_prompt_modifier_for_next (TEXT): Zusätzlicher Text, der dem KI-Prompt hinzugefügt wird, wenn diese Option gewählt wird.
      * leads_to_specific_scene_slug (TEXT): Slug einer vordefinierten Szene, zu der diese Option führt (optional).
      * einfluss_level (TEXT, CHECK (einfluss_level IN ('niedrig', 'mittel', 'hoch')), DEFAULT 'niedrig'): Einflusslevel der Entscheidung.
      * flags_to_set (JSONB, DEFAULT '{}'): Flags, die gesetzt/aktualisiert werden, wenn diese Option gewählt wird.
      * required_flags (JSONB, DEFAULT '{}'): Flags, die erforderlich sind, damit diese Option sichtbar/verfügbar ist.
   * Indizes: idx_choices_scene_id, idx_choices_order.
   * Trigger: on_choices_updated (ruft handle_updated_at auf).
   * RLS Policies:
      * Allow public read access to choices: Erlaubt Lesezugriff für alle.
      * Allow admin full access to choices: Erlaubt vollen Zugriff für die service_role.
5. public.flags_definitions
   * Zweck: Definiert die im Spiel verfügbaren Flags/Variablen, deren Typen und Standardwerte zur Referenz im Admin-Panel.
   * Spalten:
      * id (UUID, PK, DEFAULT gen_random_uuid()): Eindeutiger Identifikator.
      * created_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der Erstellung.
      * updated_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der letzten Aktualisierung.
      * flag_name (TEXT, UNIQUE, NOT NULL): Eindeutiger Name des Flags (z.B. "hatMagischenSchluessel", "spielerGesundheit").
      * flag_type (TEXT, NOT NULL, CHECK (flag_type IN ('BOOLEAN', 'NUMBER', 'STRING'))): Datentyp des Flags.
      * default_value (TEXT): Standardwert des Flags (als Text gespeichert, wird basierend auf flag_type interpretiert).
      * description (TEXT): Beschreibung des Flags für das Admin-Panel.
   * Indizes: idx_flag_name.
   * Trigger: on_flags_definitions_updated (ruft handle_updated_at auf).
   * RLS Policies:
      * Allow public read access to flag definitions: Erlaubt Lesezugriff für alle.
      * Allow admin full access to flag definitions: Erlaubt vollen Zugriff für die service_role.
6. public.player_sessions
   * Zweck: Speichert den Zustand der aktuellen Spielsitzung eines Spielers.
   * Spalten:
      * id (UUID, PK, DEFAULT gen_random_uuid()): Eindeutiger Identifikator der Spielsitzung.
      * created_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der Erstellung.
      * updated_at (TIMESTAMPTZ, NOT NULL, DEFAULT now()): Zeitstempel der letzten Aktualisierung.
      * player_id (UUID, FK REFERENCES auth.users(id) ON DELETE SET NULL): ID des Supabase-Auth-Benutzers (optional, falls anonyme Sessions erlaubt sind).
      * current_scene_id (UUID, FK REFERENCES scenes(id) ON DELETE SET NULL): ID der aktuellen Szene, in der sich der Spieler befindet.
      * player_flags (JSONB, DEFAULT '{}'): Aktueller Zustand der Flags des Spielers.
      * player_stats (JSONB, DEFAULT '{}'): Aktuelle Statistiken des Spielers.
      * player_inventory (JSONB, DEFAULT '[]'): Aktuelles Inventar des Spielers.
      * last_played_at (TIMESTAMPTZ, DEFAULT now()): Zeitstempel der letzten Interaktion.
   * Indizes: idx_player_sessions_player_id, idx_player_sessions_current_scene_id.
   * Trigger: on_player_sessions_updated (ruft handle_updated_at auf).
   * RLS Policies:
      * Players can manage their own sessions: Erlaubt Spielern vollen Zugriff (Lesen, Schreiben, Löschen) nur auf ihre eigenen Sessions (basierend auf auth.uid() = player_id).
      * Service role full access to player sessions: Erlaubt der service_role vollen Zugriff auf alle Sessions.
Beziehungen zwischen den Tabellen
* game_settings kann auf einen default_player_char_id aus characters verweisen.
* scenes ist die zentrale Tabelle für Spielinhalte.
* choices gehört immer zu genau einer scene (1:N Beziehung, scenes zu choices).
* player_sessions verweist auf die current_scene_id aus scenes und optional auf einen player_id aus auth.users.
* flags_definitions ist eine Referenztabelle, die im Spiel-Logik und im Admin-Panel verwendet wird, um Flags zu definieren und zu verwalten. Die tatsächlichen Werte der Flags für einen Spieler werden in player_sessions.player_flags oder characters.initial_flags gespeichert.
Diese Struktur bietet eine flexible Basis für dein textbasiertes Abenteuerspiel und das zugehörige Admin-Panel.
Projekt-Setup und Konfigurationsdateien
README.md
# Das Magische Zauberbuch - PWA Textadventure

Willkommen zum PWA Textadventure "Das Magische Zauberbuch"! Dieses Projekt umfasst ein React-Frontend (erstellt mit Vite und TypeScript) für das Spiel und ein Admin-Panel zur Verwaltung der Spielinhalte, sowie ein Supabase-Backend für die Datenspeicherung und serverseitige Logik (Edge Functions).

## Features (Geplant & Teilimplementiert)

* **Spieler-Frontend**:
   * PWA für Offline-Fähigkeit.
   * KI-gesteuerte Story-Generierung über OpenRouter (via Supabase Edge Function).
   * Dynamische Szenen und Entscheidungen.
* **Admin-Panel**:
   * Login-System.
   * CRUD-Operationen für Szenen, Charaktere, Flags und Spieleinstellungen.
   * Vorschau-Modus für Spielszenen.
* **Backend (Supabase)**:
   * PostgreSQL-Datenbank.
   * Benutzerauthentifizierung.
   * Edge Functions für serverseitige Logik (z.B. KI-Anbindung, Spieler-Session-Management).

## Projektstruktur (Vorschlag)


/
├── public/ # Statische Assets (Icons, Avatare, manifest.json)
│ ├── icons/
│ └── avatars/
├── supabase/
│ ├── migrations/ # SQL Datenbankmigrationen
│ └── functions/ # Supabase Edge Functions
│ ├── _shared/
│ ├── generate-next-scene/
│ └── create-player-session/
├── src/
│ ├── assets/ # Frontend-spezifische Assets (Bilder, Schriftarten)
│ ├── components/
│ │ ├── Admin/
│ │ │ ├── Characters/
│ │ │ ├── Flags/
│ │ │ ├── Preview/
│ │ │ ├── Scenes/ # z.B. SceneEditor.tsx, SceneList.tsx
│ │ │ ├── Settings/
│ │ │ └── Shared/ # z.B. KeyValueEditor.tsx
│ │ ├── Game/ # z.B. SceneDisplay.tsx, PlayerUI.tsx
│ │ └── Common/ # z.B. LoadingSpinner.tsx, ErrorMessage.tsx
│ ├── context/ # React Context APIs (AuthContext.tsx, NotificationContext.tsx)
│ ├── hooks/ # Benutzerdefinierte React Hooks
│ ├── layout/ # Layout-Komponenten (AdminLayout.tsx, GameLayout.tsx)
│ ├── pages/
│ │ ├── admin/ # Admin-Seiten (DashboardPage.tsx, EditScenePage.tsx)
│ │ ├── game/ # Spieler-Frontend Seiten (PlayPage.tsx, StartPage.tsx)
│ │ ├── LoginPage.tsx
│ │ └── NotFoundPage.tsx
│ ├── services/ # API-Aufrufe, Supabase-Interaktionen (supabaseClient.ts, sceneService.ts)
│ ├── styles/ # Globale Styles, Theme (adminTheme.ts)
│ ├── types/ # TypeScript Typdefinitionen (sceneTypes.ts, gameTypes.ts)
│ ├── utils/ # Hilfsfunktionen
│ ├── App.tsx # Haupt-App-Komponente mit Routing
│ ├── main.tsx # Einstiegspunkt der Vite-Anwendung
│ └── vite-env.d.ts # Vite Umgebungs-Typdefinitionen
├── .env.local # Lokale Umgebungsvariablen (NIE ins Git!)
├── .env.example # Beispiel für Umgebungsvariablen
├── .eslintrc.cjs
├── .gitignore
├── netlify.toml # Netlify Konfigurationsdatei
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js # Falls Tailwind CSS verwendet wird
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
## Setup & Installation

1.  **Repository klonen**:
   ```bash
   git clone <repository-url>
   cd zauberbuch-pwa
   ```

2.  **Abhängigkeiten installieren**:
   ```bash
   npm install
   # oder
   # yarn install
   ```

3.  **Supabase Setup**:
   * Erstelle ein Projekt auf [Supabase](https://supabase.com).
   * Navigiere zu "Project Settings" > "API". Kopiere die **Project URL** und den **anon public Key**.
   * Erstelle die Datenbanktabellen. Du kannst die SQL-Skripte aus `supabase/migrations/` im Supabase SQL Editor ausführen.
   * Konfiguriere Row-Level Security (RLS) Policies für deine Tabellen.
   * Hinterlege deinen OpenRouter API Key als Secret in den Supabase Edge Function Einstellungen (z.B. `OPENROUTER_API_KEY`).
   * Hinterlege deinen Supabase Service Role Key als Secret (z.B. `SUPABASE_SERVICE_ROLE_KEY`).
   * Hinterlege deine Supabase URL als Secret (z.B. `SUPABASE_URL`) für die Edge Functions.

4.  **Umgebungsvariablen einrichten**:
   * Kopiere `.env.example` zu `.env.local`.
       ```bash
       cp .env.example .env.local
       ```
   * Trage deine Supabase URL, den Anon Key und die Projekt-Referenz in `.env.local` ein:
       ```env
       VITE_SUPABASE_URL=DEINE_SUPABASE_URL
       VITE_SUPABASE_ANON_KEY=DEIN_SUPABASE_ANON_KEY
       VITE_SUPABASE_PROJECT_REF=DEIN_PROJEKT_REF # Wird für PWA Caching in vite.config.ts benötigt
       ```
       *(Für Vite müssen Umgebungsvariablen, die im Client-Code verfügbar sein sollen, mit `VITE_` beginnen.)*

5.  **Supabase CLI (Optional, aber empfohlen für Functions & Migrationen)**:
   * [Installiere die Supabase CLI](https://supabase.com/docs/guides/cli).
   * Verbinde die CLI mit deinem Projekt:
       ```bash
       supabase login
       supabase link --project-ref <DEIN_PROJEKT_REF>
       # Ggf. supabase start, falls lokal entwickelt wird
       ```
   * Deploye die Edge Functions:
       ```bash
       supabase functions deploy generate-next-scene
       supabase functions deploy create-player-session
       # Stelle sicher, dass die Secrets (OPENROUTER_API_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL) im Supabase Dashboard gesetzt sind.
       ```

6.  **Entwicklungsserver starten**:
   ```bash
   npm run dev
   # oder
   # yarn dev
   ```
   Die Anwendung sollte unter `http://localhost:3000` (oder einem ähnlichen Port) erreichbar sein.

## Deployment auf Netlify

1.  **Projekt mit Git verknüpfen**: Stelle sicher, dass dein Projekt in einem Git-Repository (z.B. auf GitHub, GitLab, Bitbucket) liegt.
2.  **Netlify-Konto**: Erstelle ein Konto auf [Netlify](https://www.netlify.com/) und verbinde es mit deinem Git-Provider.
3.  **Neue Seite aus Git erstellen**:
   * Wähle in Netlify "Add new site" > "Import an existing project".
   * Wähle dein Git-Repository aus.
4.  **Build-Einstellungen konfigurieren**:
   * **Build command**: `npm run build` (oder `yarn build`)
   * **Publish directory**: `dist`
   * Die `netlify.toml`-Datei im Root deines Projekts sollte die Weiterleitungsregeln für die SPA automatisch übernehmen.
5.  **Umgebungsvariablen in Netlify setzen**:
   * Gehe zu "Site settings" > "Build & deploy" > "Environment".
   * Füge folgende Umgebungsvariablen hinzu:
       * `VITE_SUPABASE_URL`: Deine Supabase Projekt URL.
       * `VITE_SUPABASE_ANON_KEY`: Dein Supabase Anon Public Key.
       * `VITE_SUPABASE_PROJECT_REF`: Deine Supabase Projekt-Referenz (wird für PWA Caching in `vite.config.ts` verwendet).
6.  **Deploy auslösen**: Netlify wird das Projekt automatisch bauen und deployen, wenn du Änderungen an den konfigurierten Branch (z.B. `main` oder `master`) pushst.

## Verfügbare Skripte

* `npm run dev`: Startet den Vite Entwicklungsserver.
* `npm run build`: Erstellt einen optimierten Build für die Produktion im `dist` Ordner.
* `npm run preview`: Startet einen lokalen Server, um den Produktionsbuild zu testen.
* `npm run lint`: Führt ESLint aus, um Code-Qualität zu prüfen.

## Admin Panel

Das Admin Panel ist unter `/admin` zugänglich. Du musst dich mit den konfigurierten Admin-Benutzerdaten anmelden.

## Technologie-Stack

* **Frontend**: React, TypeScript, Vite, Material UI
* **Backend**: Supabase (Auth, PostgreSQL, Edge Functions)
* **KI-Anbindung**: OpenRouter API

## Beitragende

* Dein Name / Dein Team

package.json
{
 "name": "zauberbuch-pwa",
 "private": true,
 "version": "0.0.1",
 "type": "module",
 "scripts": {
   "dev": "vite",
   "build": "tsc && vite build",
   "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
   "preview": "vite preview"
 },
 "dependencies": {
   "@emotion/react": "^11.11.4",
   "@emotion/styled": "^11.11.5",
   "@mui/icons-material": "^5.15.18",
   "@mui/material": "^5.15.18",
   "@supabase/supabase-js": "^2.43.4",
   "notistack": "^3.0.1",
   "react": "^18.2.0",
   "react-dom": "^18.2.0",
   "react-router-dom": "^6.23.1",
   "uuid": "^9.0.1"
 },
 "devDependencies": {
   "@types/react": "^18.2.66",
   "@types/react-dom": "^18.2.22",
   "@types/uuid": "^9.0.8",
   "@typescript-eslint/eslint-plugin": "^7.2.0",
   "@typescript-eslint/parser": "^7.2.0",
   "@vitejs/plugin-react": "^4.2.1",
   "autoprefixer": "^10.4.19",
   "eslint": "^8.57.0",
   "eslint-plugin-react-hooks": "^4.6.0",
   "eslint-plugin-react-refresh": "^0.4.6",
   "postcss": "^8.4.38",
   "tailwindcss": "^3.4.3",
   "typescript": "^5.2.2",
   "vite": "^5.2.0",
   "vite-plugin-pwa": "^0.20.0"
 }
}

vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
 // Lade Umgebungsvariablen für den aktuellen Modus
 // process.cwd() ist das aktuelle Arbeitsverzeichnis
 // '' als Präfix, um alle Variablen zu laden (nicht nur VITE_)
 const env = loadEnv(mode, process.cwd(), '');

 let supabaseApiCacheUrlPattern: ({ url: URL }) => boolean = () => false;
 if (env.VITE_SUPABASE_URL) {
   try {
       const supabaseServiceHostname = new URL(env.VITE_SUPABASE_URL).hostname;
       supabaseApiCacheUrlPattern = ({ url }) => url.hostname === supabaseServiceHostname;
   } catch (e) {
       console.warn(`[vite.config.ts] Invalid VITE_SUPABASE_URL: ${env.VITE_SUPABASE_URL}. Supabase API Caching might not work as expected.`);
   }
 } else {
   console.warn(`[vite.config.ts] VITE_SUPABASE_URL is not defined. Supabase API Caching will be disabled.`);
 }


 return {
   plugins: [
     react(),
     VitePWA({
       registerType: 'autoUpdate',
       injectRegister: 'auto',
       workbox: {
         globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2,woff,ttf,otf,webp,avif}'],
         runtimeCaching: [
           {
             urlPattern: supabaseApiCacheUrlPattern, // Dynamisch basierend auf VITE_SUPABASE_URL
             handler: 'NetworkFirst',
             options: {
               cacheName: 'supabase-api-cache',
               networkTimeoutSeconds: 10, // Fallback auf Cache nach 10 Sekunden
               expiration: {
                 maxEntries: 50,
                 maxAgeSeconds: 60 * 60 * 24 // 1 Tag
               },
               cacheableResponse: {
                 statuses: [0, 200] // Cache auch opake Antworten (0) für Cross-Origin-Anfragen
               }
             }
           },
           {
             urlPattern: ({ url }) => url.origin === 'https://openrouter.ai',
             handler: 'NetworkFirst',
             options: {
               cacheName: 'openrouter-api-cache',
               networkTimeoutSeconds: 15,
               expiration: {
                 maxEntries: 20,
                 maxAgeSeconds: 60 * 60 * 1 // 1 Stunde
               },
               cacheableResponse: {
                 statuses: [0, 200]
               }
             }
           },
           {
             urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp|avif)$/,
             handler: 'CacheFirst',
             options: {
               cacheName: 'image-cache',
               expiration: {
                 maxEntries: 100,
                 maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Tage
               },
               cacheableResponse: { // Sicherstellen, dass auch Bilder vom Cache bedient werden, wenn sie opake Antworten sind
                   statuses: [0, 200]
               }
             }
           },
           { // Caching für Google Fonts (Stylesheets und Font-Dateien)
             urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
             handler: 'StaleWhileRevalidate',
             options: {
               cacheName: 'google-fonts-stylesheets',
             },
           },
           {
             urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
             handler: 'CacheFirst',
             options: {
               cacheName: 'google-fonts-webfonts',
               expiration: {
                 maxEntries: 20,
                 maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Jahr
               },
               cacheableResponse: {
                 statuses: [0, 200],
               },
             },
           },
         ]
       },
       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/icon-maskable-512x512.png'], // Pfade relativ zum 'public' Ordner
       manifest: {
         name: 'Das Magische Zauberbuch',
         short_name: 'Zauberbuch',
         description: 'Ein textbasiertes PWA Abenteuerspiel mit KI-gesteuerter Story.',
         theme_color: '#00695c', // Deine Primärfarbe
         background_color: '#ffffff', // Hintergrundfarbe für Splash Screen
         display: 'standalone', // App öffnet sich im eigenen Fenster
         scope: '/',
         start_url: '/', // Start-URL der App
         icons: [ // Stelle sicher, dass diese Icons im 'public/icons/' Ordner existieren
           {
             src: 'icons/icon-192x192.png',
             sizes: '192x192',
             type: 'image/png'
           },
           {
             src: 'icons/icon-512x512.png',
             sizes: '512x512',
             type: 'image/png'
           },
           {
             src: 'icons/icon-maskable-192x192.png', // Wichtig für adaptive Icons auf Android
             sizes: '192x192',
             type: 'image/png',
             purpose: 'maskable'
           },
           {
             src: 'icons/icon-maskable-512x512.png',
             sizes: '512x512',
             type: 'image/png',
             purpose: 'maskable'
           }
         ]
       }
     })
   ],
   server: {
     port: 3000, // Port für den Vite Entwicklungsserver
   },
 }
})

.env.example
# Supabase Client-seitige Variablen (sicher für das Frontend)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_PROJECT_REF=your-project-ref # Wird in vite.config.ts für PWA Caching verwendet

# Die folgenden Schlüssel sind GEHEIM und dürfen NUR serverseitig
# in den Supabase Edge Function Settings (im Supabase Dashboard) hinterlegt werden:
# OPENROUTER_API_KEY=DEIN_OPENROUTER_API_KEY
# SUPABASE_SERVICE_ROLE_KEY=DEIN_SUPABASE_SERVICE_ROLE_KEY
# SUPABASE_URL=https://your-project-ref.supabase.co (Ja, die URL auch hier für Functions)

netlify.toml (NEU)
Diese Datei wird im Root-Verzeichnis deines Projekts erstellt.
# File: netlify.toml

# Build-Einstellungen für Netlify
[build]
 command = "npm run build" # Oder "yarn build", falls du Yarn verwendest
 publish = "dist"          # Das Verzeichnis, das nach dem Build deployed wird (Standard für Vite)
 environment = { NODE_VERSION = "18" } # Spezifiziere eine Node.js Version, falls nötig

# Weiterleitungsregeln für eine Single Page Application (SPA)
# Alle Anfragen, die nicht auf eine existierende Datei im "dist"-Verzeichnis passen,
# werden auf die index.html umgeleitet, damit React Router das Routing übernehmen kann.
[[redirects]]
 from = "/*"
 to = "/index.html"
 status = 200

# Optional: Header-Regeln für Sicherheit und Caching
# [[headers]]
#   for = "/*"
#   [headers.values]
#     # Beispiel: Content Security Policy (sehr restriktiv, muss angepasst werden!)
#     # Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.supabase.co; connect-src 'self' https://*.supabase.co https://openrouter.ai;"
#     X-Frame-Options = "DENY"
#     X-XSS-Protection = "1; mode=block"
#     X-Content-Type-Options = "nosniff"
#     Referrer-Policy = "strict-origin-when-cross-origin"
#     Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
#     # Cache-Control für statische Assets (kann auch über Netlify UI oder workbox konfiguriert werden)
# [[headers]]
#   for = "/assets/*" # Pfad zu deinen gebuildeten Assets (JS, CSS)
#   [headers.values]
#     Cache-Control = "public, max-age=31536000, immutable"

index.html (Basis)
<!doctype html>
<html lang="de">
 <head>
   <meta charset="UTF-8" />
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta name="theme-color" content="#00695c"> <link rel="apple-touch-icon" href="/apple-touch-icon.png"> <link rel="manifest" href="/manifest.webmanifest"> <title>Das Magische Zauberbuch</title>
   <link
     rel="stylesheet"
     href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
   />
   <link
     rel="stylesheet"
     href="https://fonts.googleapis.com/icon?family=Material+Icons"
   />
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@400;700&family=Quintessential&family=MedievalSharp&family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
 </head>
 <body>
   <div id="root"></div>
   <script type="module" src="/src/main.tsx"></script>
 </body>
</html>

Datenbank Migrationen (supabase/migrations/initial_schema.sql)
-- supabase/migrations/YYYYMMDDHHMMSS_initial_schema.sql
-- Ersetze