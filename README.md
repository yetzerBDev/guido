# GUIDO PWA

Aplicacion web progresiva (PWA) construida con React + Vite + Tailwind + Supabase.

## Stack

- React.js con Vite
- JavaScript ES6+
- Tailwind CSS
- Supabase Client SDK (`@supabase/supabase-js`)
- `vite-plugin-pwa` (service worker y manifest)

## Estructura

```text
src/
	components/
		Header.jsx
		CardLugar.jsx
		BotonWhatsApp.jsx
		PersonajeGuido.jsx
	hooks/
		usePlaces.js
		useAuth.js
	pages/
		Home.jsx
		DetalleLugar.jsx
		LoginRegistro.jsx
	lib/
		supabaseClient.js
```

## Variables de entorno

Crear un archivo `.env` local tomando como base `.env.example`:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

No incluir claves reales en el repositorio.

## Scripts

- `npm run dev`: desarrollo local
- `npm run build`: build de produccion
- `npm run preview`: previsualizacion local del build

## PWA

- Manifest generado como `manifest.json`
- `display: standalone`
- `registerType: autoUpdate`
- Iconos en `public/icons` (192, 512 y apple-touch)

## Flujo recomendado

1. Desarrollar en local (`npm run dev`).
2. Subir cambios a GitHub.
3. Hacer merge a `main`.
4. Vercel despliega automaticamente a produccion.

## Seguridad Supabase

- Mantener RLS activado en tablas productivas.
- Validar politicas para lecturas/escrituras segun roles.
