# 🚀 Configuración de Google Drive para Imágenes de Blog

## 📋 Resumen

Este proyecto está configurado para guardar las imágenes de los blogs en **Google Drive** en lugar de la base de datos. Esto mejora el rendimiento y reduce el tamaño de la base de datos.

## 💰 Plan Gratuito de Google Drive

Este proyecto está optimizado para usar **Google Drive de forma gratuita**. Aquí están los límites importantes:

### Límites del Plan Gratuito:
- ✅ **15 GB de almacenamiento** compartido entre Gmail, Drive y Photos
- ✅ **1,000,000 de requests por día** a la API (más que suficiente para un portfolio)
- ✅ **Sin costo** para uso personal y proyectos pequeños
- ⚠️ **Límite de 750 GB por día** de subida de archivos

### Para un Portfolio Personal:
- Con imágenes optimizadas (100-500 KB cada una)
- Puedes almacenar **miles de imágenes** sin problemas
- El límite de requests diarios es muy generoso

### Recomendaciones:
1. **Optimiza las imágenes** antes de subirlas (usa herramientas como TinyPNG)
2. **Elimina imágenes antiguas** cuando elimines blogs
3. **Usa formatos modernos** (WebP cuando sea posible)
4. **Monitorea tu uso** en Google Cloud Console

## ✅ Estado Actual

- ✅ Servicio de Google Drive configurado (`src/services/googleDrive.service.js`)
- ✅ Controlador de blog actualizado para usar Google Drive
- ✅ Modelo de blog actualizado para almacenar URLs de Drive
- ✅ Frontend actualizado para mostrar imágenes desde Drive

## 🔧 Pasos para Conectar tu Cuenta de Google Drive

### 1️⃣ Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto:
   - Haz clic en el selector de proyectos (arriba)
   - Clic en "New Project"
   - Nombre: `portfolio-blog-images` (o el que prefieras)
   - Clic en "Create"

### 2️⃣ Habilitar Google Drive API

1. En el menú lateral, ve a **"APIs & Services"** > **"Library"**
2. Busca **"Google Drive API"**
3. Haz clic en el resultado y luego en **"Enable"**

### 3️⃣ Crear Service Account

1. Ve a **"APIs & Services"** > **"Credentials"**
2. Clic en **"Create Credentials"** > **"Service Account"**
3. Completa el formulario:
   - **Service account name**: `portfolio-drive-service`
   - **Service account ID**: se genera automáticamente
   - Clic en **"Create and Continue"**
4. En **"Grant this service account access to project"**:
   - Rol: **Editor** (o **Owner**)
   - Clic en **"Continue"** y luego **"Done"**

### 4️⃣ Crear y Descargar Clave JSON

1. En la lista de Service Accounts, haz clic en el que acabas de crear
2. Ve a la pestaña **"Keys"**
3. Clic en **"Add Key"** > **"Create new key"**
4. Selecciona **"JSON"** y haz clic en **"Create"**
5. Se descargará automáticamente un archivo JSON

### 5️⃣ Configurar Archivo de Credenciales

1. **Renombra** el archivo descargado a: `google-drive-credentials.json`
2. **Crea** la carpeta `credentials/` en la raíz del proyecto backend si no existe:
   ```
   portfolio-backend-express/
   └── credentials/
   ```
3. **Mueve** el archivo `google-drive-credentials.json` a esa carpeta:
   ```
   portfolio-backend-express/
   └── credentials/
       └── google-drive-credentials.json  ← Aquí
   ```

### 6️⃣ Crear Carpeta en Google Drive

1. Ve a tu [Google Drive](https://drive.google.com/)
2. Crea una nueva carpeta (ejemplo: **"Portfolio Blog Images"**)
3. **Haz clic derecho** en la carpeta > **"Share"**
4. En el campo de compartir, pega el **email del Service Account**
   - El email está en el archivo JSON que descargaste
   - Busca `"client_email"` en el archivo
   - Ejemplo: `portfolio-drive-service@tu-proyecto.iam.gserviceaccount.com`
5. Dale permisos de **Editor**
6. Clic en **"Send"**

### 7️⃣ Obtener ID de la Carpeta

1. Abre la carpeta que acabas de crear en Google Drive
2. Mira la URL en el navegador:
   ```
   https://drive.google.com/drive/folders/1ABC123xyz...
   ```
3. Copia el **ID** (la parte después de `/folders/`)
   - Ejemplo: Si la URL es `...folders/1ABC123xyz...`, el ID es `1ABC123xyz...`

### 8️⃣ Configurar Variable de Entorno

1. Abre el archivo `.env` en la raíz del proyecto backend
2. Agrega esta línea (si no existe):
   ```env
   GOOGLE_DRIVE_FOLDER_ID=tu_id_de_carpeta_aqui
   ```
3. Reemplaza `tu_id_de_carpeta_aqui` con el ID que copiaste en el paso anterior

### 9️⃣ Verificar Instalación

1. Asegúrate de que `googleapis` esté instalado:
   ```bash
   cd portfolio-backend-express
   npm install googleapis
   ```

2. Reinicia el servidor backend:
   ```bash
   npm run dev
   ```

## 🧪 Probar la Configuración

1. Inicia sesión en el panel de administración
2. Ve a la sección de Blog
3. Crea un nuevo blog con una imagen
4. La imagen debería subirse automáticamente a Google Drive
5. Verifica en tu carpeta de Drive que la imagen se haya subido

## 📁 Estructura de Archivos Final

```
portfolio-backend-express/
├── credentials/
│   └── google-drive-credentials.json  ← Tu archivo JSON aquí
├── .env                                ← Con GOOGLE_DRIVE_FOLDER_ID
├── .gitignore                          ← Ya configurado para ignorar credentials/
└── src/
    └── services/
        └── googleDrive.service.js     ← Servicio ya configurado
```

## ⚠️ Importante

- **NUNCA** subas el archivo `google-drive-credentials.json` a Git
- El archivo `.gitignore` ya está configurado para ignorar `credentials/`
- Mantén el archivo JSON seguro y privado
- Si compartes el proyecto, no incluyas las credenciales

## 🔍 Solución de Problemas

### Error: "File not found"
- Verifica que el archivo `google-drive-credentials.json` esté en `credentials/`
- Verifica que el nombre del archivo sea exactamente `google-drive-credentials.json`

### Error: "Permission denied"
- Asegúrate de haber compartido la carpeta con el email del Service Account
- Verifica que el Service Account tenga permisos de **Editor** en la carpeta

### Error: "API not enabled"
- Ve a Google Cloud Console > APIs & Services > Library
- Busca "Google Drive API" y verifica que esté habilitada

### Las imágenes no se muestran
- Verifica que la carpeta esté compartida correctamente
- Verifica que el `GOOGLE_DRIVE_FOLDER_ID` esté correcto en el `.env`
- Revisa la consola del servidor para ver errores

## 📝 Notas Adicionales

- Las imágenes se hacen públicas automáticamente para que se puedan ver en la web
- Cuando elimines un blog, la imagen también se eliminará de Drive
- Cuando actualices un blog con nueva imagen, la anterior se eliminará de Drive
- El formato de URL de las imágenes será: `https://drive.google.com/uc?export=view&id=FILE_ID`

## 💡 Optimización para Uso Gratuito

### 1. Optimizar Imágenes Antes de Subir
Para maximizar el espacio disponible, optimiza las imágenes:

**Opción A: Usar herramientas online**
- [TinyPNG](https://tinypng.com/) - Comprime PNG y JPG
- [Squoosh](https://squoosh.app/) - Compresión avanzada con preview

**Opción B: Agregar validación en el frontend**
```javascript
// Ejemplo: Validar tamaño máximo de imagen
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
if (file.size > MAX_IMAGE_SIZE) {
  alert('La imagen debe ser menor a 5MB');
  return;
}
```

### 2. Monitorear Uso
- Ve a [Google Cloud Console](https://console.cloud.google.com/)
- Selecciona tu proyecto
- Ve a "APIs & Services" > "Dashboard"
- Revisa el uso de "Drive API"

### 3. Limpiar Imágenes No Usadas
El sistema elimina automáticamente las imágenes cuando:
- Eliminas un blog
- Actualizas un blog con nueva imagen

### 4. Consideraciones de Rendimiento
- Las imágenes se cargan desde Google Drive (CDN de Google)
- Las URLs son públicas pero seguras (solo quien tenga el ID puede acceder)
- El rendimiento es excelente gracias a la infraestructura de Google

## ⚠️ Límites y Consideraciones

### Si Excedes los Límites:
- **Almacenamiento**: Google te notificará cuando te acerques al límite
- **API Requests**: Muy difícil de alcanzar (1M por día)
- **Solución**: Optimiza imágenes o considera Google Workspace (pago)

### Alternativas si Necesitas Más Espacio:
1. **Google Workspace Individual**: ~$6/mes, 1TB de almacenamiento
2. **Otra cuenta de Google**: Crear cuenta adicional gratuita
3. **Otros servicios**: Cloudinary (plan gratuito con límites), AWS S3, etc.

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google Drive API habilitada
- [ ] Service Account creado
- [ ] Archivo JSON descargado y colocado en `credentials/`
- [ ] Carpeta creada en Google Drive
- [ ] Carpeta compartida con el Service Account
- [ ] ID de carpeta copiado
- [ ] Variable `GOOGLE_DRIVE_FOLDER_ID` agregada al `.env`
- [ ] Servidor reiniciado
- [ ] Prueba de subida de imagen realizada

---

**¡Listo!** Una vez completados estos pasos, las imágenes de los blogs se guardarán automáticamente en Google Drive. 🎉

