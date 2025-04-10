import CustomHeader from '@/components/CustomHeader';
import TEXT, { UNIT } from '@/styles';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function Search() {
  const { tag } = useLocalSearchParams();

  return (
    <>
      <CustomHeader hideBackButton>
        <Text style={TEXT.h1}>search</Text>
      </CustomHeader>
      
      <View style={styles.container}>
        <Text>{tag ? tag : 'no search term'}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: UNIT,
  },
});