# 📋 Instrucciones para Configurar Google Drive API

## Paso 1: Instalar Dependencias

En la terminal, dentro de la carpeta `portfolio-backend-express`, ejecuta:

```bash
npm install googleapis
```

## Paso 2: Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Crea un nuevo proyecto:
   - Haz clic en el selector de proyectos (arriba a la izquierda)
   - Haz clic en "New Project"
   - Ingresa un nombre (ej: "Portfolio Blog Images")
   - Haz clic en "Create"

## Paso 3: Habilitar Google Drive API

1. En el menú lateral, ve a **"APIs & Services"** > **"Library"**
2. Busca **"Google Drive API"**
3. Haz clic en el resultado
4. Haz clic en el botón **"Enable"** (Habilitar)

## Paso 4: Crear Cuenta de Servicio

1. Ve a **"APIs & Services"** > **"Credentials"**
2. Haz clic en **"Create Credentials"** > **"Service Account"**
3. Completa el formulario:
   - **Service account name**: `portfolio-drive-service`
   - **Service account ID**: Se genera automáticamente
   - Haz clic en **"Create and Continue"**
4. En "Grant this service account access to project":
   - Selecciona el rol: **"Editor"** o **"Owner"**
   - Haz clic en **"Continue"**
5. Haz clic en **"Done"** (puedes omitir los pasos opcionales)

## Paso 5: Generar Clave JSON

1. En la lista de cuentas de servicio, haz clic en la que acabas de crear
2. Ve a la pestaña **"Keys"**
3. Haz clic en **"Add Key"** > **"Create new key"**
4. Selecciona el formato **"JSON"**
5. Haz clic en **"Create"**
6. Se descargará automáticamente un archivo JSON

## Paso 6: Configurar el Archivo de Credenciales

1. **Renombra** el archivo descargado a: `google-drive-credentials.json`
2. **Crea** la carpeta `credentials` en la raíz de `portfolio-backend-express`:
   ```
   portfolio-backend-express/
   └── credentials/
       └── google-drive-credentials.json
   ```
3. **Mueve** el archivo JSON a esa carpeta

## Paso 7: Crear Carpeta en Google Drive (Opcional pero Recomendado)

1. Abre [Google Drive](https://drive.google.com)
2. Crea una nueva carpeta llamada "Blog Images" o similar
3. Haz clic derecho en la carpeta > **"Share"** (Compartir)
4. En el campo de búsqueda, pega el **email de la cuenta de servicio**
   - El email se encuentra en el archivo JSON: `"client_email": "tu-cuenta@proyecto.iam.gserviceaccount.com"`
5. Dale permisos de **"Editor"**
6. Haz clic en **"Send"** (Enviar)
7. **Copia el ID de la carpeta**:
   - Abre la carpeta en Drive
   - La URL será algo como: `https://drive.google.com/drive/folders/1ABC123xyz...`
   - El ID es la parte después de `/folders/` (ej: `1ABC123xyz...`)

## Paso 8: Configurar Variables de Entorno

1. En la raíz de `portfolio-backend-express`, crea o edita el archivo `.env`
2. Agrega la siguiente variable:

```env
GOOGLE_DRIVE_FOLDER_ID=tu-folder-id-aqui
```

**Ejemplo:**
```env
GOOGLE_DRIVE_FOLDER_ID=1ABC123xyz456DEF789ghi012JKL345mno
```

> **Nota:** Si no quieres usar una carpeta específica, puedes dejar esta variable vacía y las imágenes se subirán a la raíz de Drive.

## Paso 9: Verificar la Configuración

1. Asegúrate de que la estructura de archivos sea:
   ```
   portfolio-backend-express/
   ├── credentials/
   │   └── google-drive-credentials.json ✅
   ├── src/
   │   └── services/
   │       └── googleDrive.service.js ✅
   ├── .env ✅
   └── package.json ✅
   ```

2. Reinicia el servidor:
   ```bash
   npm run dev
   ```

## ✅ Verificación

Para verificar que todo funciona:

1. Intenta crear un nuevo blog con una imagen desde el panel de administración
2. La imagen debería subirse a Google Drive
3. Verifica en Google Drive que la imagen aparezca en la carpeta configurada

## 🔒 Seguridad

- **NUNCA** subas el archivo `google-drive-credentials.json` a Git
- Agrega `credentials/` a tu `.gitignore`
- El archivo `.env` también debe estar en `.gitignore`

## 🐛 Solución de Problemas

### Error: "Cannot find module 'googleapis'"
```bash
npm install googleapis
```

### Error: "File not found: credentials/google-drive-credentials.json"
- Verifica que el archivo esté en la ruta correcta
- Verifica que el nombre del archivo sea exactamente `google-drive-credentials.json`

### Error: "Permission denied"
- Verifica que hayas compartido la carpeta de Drive con el email de la cuenta de servicio
- Verifica que los permisos sean "Editor" o "Owner"

### Las imágenes no se muestran
- Verifica que el archivo tenga permisos públicos (el código lo hace automáticamente)
- Verifica que la URL generada sea correcta

## 📝 Notas Importantes

- Las imágenes se suben automáticamente cuando creas o actualizas un blog
- Las imágenes antiguas (guardadas como Buffer) seguirán funcionando (compatibilidad hacia atrás)
- Las nuevas imágenes se guardarán en Google Drive
- Al eliminar un blog, la imagen también se elimina de Drive

