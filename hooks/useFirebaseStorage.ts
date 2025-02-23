import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/config/firebase";

export const getImageUrl = async (folder: string, filename: string): Promise<string | null> => {
  try {
    const fileRef = ref(storage, `${folder}/${filename}`);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error retrieving image from Firebase Storage:", error);
    return null;
  }
};