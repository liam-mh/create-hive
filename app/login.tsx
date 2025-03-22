import LoginCard from '@/components/LoginCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TEXT, { COLOURS, UNIT } from '@/styles';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function LoginPage() {
  const insets = useSafeAreaInsets();
  const logo = require('@/assets/images/create-hive-logo.png');
  const footer = require('@/assets/images/login-footer.png');

  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.centralContainer}>
        <Text style={TEXT.boldGrey}>unleash your art</Text>
        <Text style={TEXT.boldGrey}>discover your community</Text>
      </View>
      <LoginCard />
      <View style={styles.footerContainer}>
        <Image source={footer} style={styles.footer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: UNIT,
    backgroundColor: COLOURS.white,
    gap: UNIT*4,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    paddingTop: UNIT*4
  },
  logo: {
    width: '70%',
    resizeMode: 'contain',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  footer: {
    width: '110%',
    resizeMode: 'contain',
  },
  centralContainer: {
    alignItems: 'center',
  }
});