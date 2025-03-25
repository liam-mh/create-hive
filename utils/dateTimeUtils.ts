import { Timestamp } from "firebase/firestore";
import { format, parseISO } from 'date-fns';

// Output Example: "11/15/2023, 3:30:45 PM" (Locale-dependent)
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

// Output Example: "11/15/2023" (Locale-dependent)
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

// Output Example: "3:30:45 PM" (Locale-dependent)
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

// Output Example: "15 november"
export const timestampToFormattedDate = (timestamp: Timestamp | null | undefined): string | null => {
  if (!timestamp) {
    return null;
  }

  try {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });

    return `${day} ${month}`.toLowerCase();
  } catch (error) {
    console.error("Error converting timestamp to formatted date:", error);
    return null;
  }
};

interface EventDateTime {
  date: string | null;
  time: string | null;
}

// Output Example: "wednesday 15 november", "03:30 - 04:30"
export const calculateEventDateTime = (
  startTimestamp: Timestamp | null | undefined,
  endTimestamp: Timestamp | null | undefined
): EventDateTime => {
  const result: EventDateTime = {
    date: null,
    time: null,
  };

  if (!startTimestamp || !endTimestamp) {
    return result;
  }

  try {
    const startDate = startTimestamp.toDate();
    const endDate = endTimestamp.toDate();

    const day = startDate.getDate();
    const month = startDate.toLocaleString("en-US", { month: "long" });
    const weekday = startDate.toLocaleString("en-US", { weekday: "long" });

    result.date = `${weekday} ${day} ${month}`.toLowerCase();

    const startTimeString = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTimeString = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    result.time = `${startTimeString} - ${endTimeString}`;
  } catch (error) {
    console.error("Error calculating event date and time:", error);
  }

  return result;
};

// Output Example: "November 2023"
export const timestampToMonthYear = (timestamp: Timestamp | null | undefined): string | null => {
  if (!timestamp) {
    return null;
  }

  try {
    const date = timestamp.toDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${month} ${year}`;
  } catch (error) {
    console.error("Error converting timestamp to month year:", error);
    return null;
  }
};

export const checkExpired = (comparisonDate: Timestamp): boolean => {
  const now = new Date(); 
  const comparison = comparisonDate.toDate(); 
  return comparison < now;
}

// Output Example: "monday 24 march"
export const formatDateForCalendar = (dateString: string): string => {
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'EEEE d MMMM');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 0) {
    return "0m";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (remainingMinutes > 0) {
    if (hours > 0) {
      result += " ";
    }
    result += `${remainingMinutes}m`;
  }

  if (result === "") {
    result = "0m";
  }

  return result;
};