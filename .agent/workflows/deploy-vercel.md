---
description: Guía paso a paso para desplegar FacturaPro en Vercel
---

Para desplegar FacturaPro en Vercel de forma exitosa, sigue estos pasos:

### 1. Preparación del Repositorio
Asegúrate de que todos tus cambios estén guardados y subidos a un repositorio de GitHub, GitLab o Bitbucket.

### 2. Importar en Vercel
1. Ve a [Vercel](https://vercel.com) e inicia sesión.
2. Haz clic en **"Add New"** > **"Project"**.
3. Importa el repositorio de FacturaPro.

### 3. Configuración de Variables de Entorno (CRÍTICO)
En la sección **"Environment Variables"**, debes añadir exactamente las mismas variables que tienes en tu archivo `.env.local`:

| Variable | Valor |
| :--- | :--- |
| `DATABASE_URL` | Tu URL de conexión de Supabase (Pooler) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu llave pública anónima |
| `SUPABASE_SERVICE_ROLE_KEY` | Tu llave de rol de servicio (secreta) |

### 4. Comando de Despliegue
Vercel detectará automáticamente que es un proyecto de Next.js. El comando de construcción estándar es `npm run build` o `pnpm build`.

### 5. Post-Despliegue
Una vez desplegado, Vercel te proporcionará una URL (ej. `mifactura-iota.vercel.app`). Recuerda añadir esta URL en la configuración de **Authentication > Site URL** de tu panel de Supabase si vas a usar Social Login.

// turbo
### 6. Ejecutar Build Local (Opcional para Verificar)
Para asegurarte de que no haya errores de compilación antes de subir:
```powershell
pnpm build
```
