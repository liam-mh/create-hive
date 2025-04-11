import { StyleSheet, View } from 'react-native';
import Map from '@/components/Map';
import { useAuth } from '@/context/authContext';

export default function Explore() {
  const user = useAuth().user;
  if (!user) return null;
  
  return (
    <View style={styles.container}>
      <Map inputLocation={user.location} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});