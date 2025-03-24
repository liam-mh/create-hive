import CustomHeader from '@/components/CustomHeader';
import TEXT from '@/styles';
import { StyleSheet, View, Text } from 'react-native';

export default function Create() {
  return (
    <>
      <CustomHeader
        hideBackButton
        children={
          <Text style={TEXT.h1}>create</Text> 
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});