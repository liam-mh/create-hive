import { useState, useEffect, useRef } from 'react';
import { Artwork } from '@/models/Artwork';
import { getArtworkDetailsById, getArtwork as getArtwork, getArtworkById } from '@/services/artworkService'; // Import getArtworkById
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DisplayAllArtwork = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const detailsFetched = useRef(false);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const fetchedArtworks = await getArtwork();
        setArtworks(fetchedArtworks);
      } catch (err) {
        setError("Failed to load artworks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      if (artworks.length > 0 && !detailsFetched.current) {
        const artworkId = artworks[0].artworkId;
        try {
          const fetchedArtworkDetails = await getArtworkDetailsById(artworkId);
          setArtworks((prevArtworks) => {
            const updatedArtworks = [...prevArtworks];
            updatedArtworks[0] = { ...updatedArtworks[0], details: fetchedArtworkDetails };
            detailsFetched.current = true;
            return updatedArtworks;
          });
        } catch (err) {
          setError("Failed to load artwork details.");
          console.error(err);
        }
      }
    };

    if (!loading && artworks.length > 0) {
      fetchArtworkDetails();
    }
  }, [artworks, loading]);

  if (loading) {
    return <Text>Loading artworks...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={artworks}
      keyExtractor={(item) => item.artworkId}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text>{JSON.stringify(item, null, 2)}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default DisplayAllArtwork;