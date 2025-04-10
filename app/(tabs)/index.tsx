import { StyleSheet, View, Text } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { UNIT } from '@/styles';

export default function Index() {
  return (
    <>
      <CustomHeader 
        hideBackButton
        showLogo
      />

      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: UNIT
  }
});