import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Configuración de Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Función para autenticar y obtener el cliente de Drive
const getDriveClient = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'credentials', 'google-drive-credentials.json'),
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
};

// Función para subir una imagen a Google Drive
export const uploadImageToDrive = async (fileBuffer, fileName, mimeType) => {
  try {
    const drive = getDriveClient();
    
    // Obtener el ID de la carpeta desde las variables de entorno
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Metadatos del archivo
    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : [], // Si no hay folderId, se sube a la raíz
    };

    // Metadatos de medios
    const media = {
      mimeType: mimeType,
      body: fileBuffer,
    };

    // Subir el archivo
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink, webContentLink',
    });

    // Hacer el archivo público para que se pueda acceder desde la web
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Obtener la URL pública de la imagen
    const imageUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
    
    return {
      fileId: response.data.id,
      fileName: response.data.name,
      imageUrl: imageUrl,
      webViewLink: response.data.webViewLink,
    };
  } catch (error) {
    console.error('Error al subir imagen a Google Drive:', error);
    throw new Error(`Error al subir imagen a Google Drive: ${error.message}`);
  }
};

// Función para eliminar una imagen de Google Drive
export const deleteImageFromDrive = async (fileId) => {
  try {
    const drive = getDriveClient();
    
    await drive.files.delete({
      fileId: fileId,
    });

    return true;
  } catch (error) {
    console.error('Error al eliminar imagen de Google Drive:', error);
    throw new Error(`Error al eliminar imagen de Google Drive: ${error.message}`);
  }
};

// Función para actualizar una imagen en Google Drive
export const updateImageInDrive = async (fileId, fileBuffer, fileName, mimeType) => {
  try {
    const drive = getDriveClient();

    // Si hay un fileId, actualizar el archivo existente
    if (fileId) {
      const media = {
        mimeType: mimeType,
        body: fileBuffer,
      };

      await drive.files.update({
        fileId: fileId,
        media: media,
      });

      const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      return {
        fileId: fileId,
        fileName: fileName,
        imageUrl: imageUrl,
      };
    } else {
      // Si no hay fileId, subir un nuevo archivo
      return await uploadImageToDrive(fileBuffer, fileName, mimeType);
    }
  } catch (error) {
    console.error('Error al actualizar imagen en Google Drive:', error);
    throw new Error(`Error al actualizar imagen en Google Drive: ${error.message}`);
  }
};

