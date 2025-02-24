import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/config/firebase";

export const getImageUrl = async (folder: string, id: string): Promise<string | null> => {
  try {
    const fileRef = ref(storage, `${folder}/${id}.jpg`);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error retrieving image from Firebase Storage:", error);
    return null;
  }
};