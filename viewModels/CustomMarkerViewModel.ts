import { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';
import { getImageUrl } from "@/hooks/useFirebaseStorage";

export function useMarkerImage(type: "artwork" | "event", id: string) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const defaultImage = type === 'event'
    ? require('@/assets/images/default-event-pin.jpg')
    : require('@/assets/images/default-artwork-photo.jpg');

  useEffect(() => {
    let isMounted = true;
    setError(false);
    setLoading(true);

    const fetchImage = async () => {
      try {
        const url = await getImageUrl(type, id);
        if (isMounted) {
          setImageUri(url);
        }
      } catch (err) {
        console.log("Error fetching image URL:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [type, id]);

  const handleImageLoad = () => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleImageError = () => {
    setImageUri(null);
  };

  return {
    imageUri,
    imageOpacity,
    defaultImage,
    handleImageLoad,
    handleImageError,
    loading,
    error,
  };
}