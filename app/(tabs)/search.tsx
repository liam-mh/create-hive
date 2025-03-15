import InformationButton from '@/components/buttons/InformationButton';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Search() {
  const { tag } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <InformationButton type={'event'} id={'Tj8LZQ3UjkDPHkJ77hNB'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});