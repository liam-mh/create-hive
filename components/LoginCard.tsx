import TEXT, { COLOURS, CORNERS, SIZES, UNIT } from '@/styles';
import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Text } from 'react-native';
import LoginButton from './buttons/LoginButton';
import { getIcon } from '@/utils/iconUtils';

const LoginCard = () => {
  const [userAtInput, setUserAtInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const iconAt = getIcon('at', SIZES.l, COLOURS.primary);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.textInput}>
        {iconAt}
        <TextInput 
          placeholder="username" 
          placeholderTextColor={COLOURS.darkgrey}
          value={userAtInput} 
          onChangeText={setUserAtInput}
          autoCapitalize='none'
          style={TEXT.regular}
        />
      </View>
      {loginError && 
        <View style={styles.centralContainer}>
          <Text style={TEXT.regularError}>{loginError}</Text>
        </View>
      }
      <View style={styles.buttonContainer}>
        <LoginButton 
          userAt={userAtInput}
          onLoginResult={(error) => setLoginError(error)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: UNIT,
  },
  buttonContainer: {
    alignSelf: 'center',
    gap: UNIT,
  },
  centralContainer: {
    alignItems: 'center',
  },
  textInput: {
    flexDirection: 'row',
    gap: UNIT,
    borderWidth: 2,
    borderColor: COLOURS.offwhite,
    borderRadius: CORNERS.default,
    padding: UNIT,
  },
});

export default LoginCard;