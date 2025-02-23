import { Timestamp } from "firebase/firestore";

export const timestampToDateTime = (timestamp: Timestamp | null | undefined): string | null => {
  if (!timestamp) {
    return null;
  }

  try {
    const date = timestamp.toDate();
    const dateTimeString = date.toLocaleString(); 
    return dateTimeString;
  } catch (error) {
    console.error("Error converting timestamp to date/time:", error);
    return null;
  }
};

export const timestampToDate = (timestamp: Timestamp | null | undefined): string | null => {
  if (!timestamp) {
    return null;
  }

  try {
    const date = timestamp.toDate();
    const dateString = date.toLocaleDateString();
    return dateString;
  } catch (error) {
    console.error("Error converting timestamp to date:", error);
    return null;
  }
};

export const timestampToTime = (timestamp: Timestamp | null | undefined): string | null => {
  if (!timestamp) {
    return null;
  }

  try {
    const date = timestamp.toDate();
    const timeString = date.toLocaleTimeString();
    return timeString;
  } catch (error) {
    console.error("Error converting timestamp to time:", error);
    return null;
  }
};