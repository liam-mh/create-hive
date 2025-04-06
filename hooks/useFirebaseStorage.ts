import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

export type folderOptions = 'user' | 'artwork' | 'event';

export const getImageUrl = async (folder: folderOptions, id: string): Promise<string | null> => {
  try {
    const fileRef = ref(storage, `${folder}/${id}.jpg`);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.log("Error retrieving image from Firebase Storage:", error);
    return null;
  }
};

async function uriToBlob(uri: string): Promise<Blob> {
  const res = await fetch(uri);
  return await res.blob();
}

export async function uploadImageAsJPG(uri: string, folder: folderOptions, id: string): Promise<string> {
  const imageBlob = await uriToBlob(uri);

  const jpgMetadata = {
    contentType: 'image/jpeg',
  };

  const storageRef = ref(storage, `${folder}/${id}.jpg`);
  await uploadBytes(storageRef, imageBlob, jpgMetadata);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}