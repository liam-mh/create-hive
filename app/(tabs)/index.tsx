import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import TEXT, { COLOURS, SIZES, UNIT } from '@/styles';
import { useAuth } from '@/context/authContext';
import { getIcon } from '@/utils/iconUtils';
import { Href, router } from 'expo-router';

export default function Index() {
  const userFirstname = useAuth().user!.firstName;

  const iconCreate = getIcon('plusSquare', SIZES.l, COLOURS.white);
  const iconExplore = getIcon('geoAlt', SIZES.l, COLOURS.black);
  const iconSearch = getIcon('search', SIZES.l, COLOURS.white);

  const topCurve = require('@/assets/images/index-curve-top-primary.png');
  const middleCurveFirst = require('@/assets/images/index-curve-middle-primary-top.png');
  const middleCurveSecond = require('@/assets/images/index-curve-middle-secondary-top.png');
  const bottomCurve = require('@/assets/images/index-curve-bottom-primary.png');

  type routerOptions = 'create' | 'explore' | 'search';
  const handlePress = (path: routerOptions) => {
    let pathname:Href = '/'; 
    if (path == 'create') pathname = '/(tabs)/create';
    if (path == 'explore') pathname = '/(tabs)/explore';
    if (path == 'search') pathname = '/(tabs)/search';
    router.push(pathname);
  }

  return (
    <>
      <CustomHeader 
        hideBackButton
        showLogo
      />

      <View style={styles.container}>

        <View style={styles.centralSectionContainer}>
          <Text 
            style={TEXT.h1} 
            testID='header-text' 
          >
            hi, {userFirstname}!
          </Text>
          <Text 
            style={TEXT.regular}
            testID='subheader-text' 
          >
            let's make something amazing
          </Text>
        </View>

        <View> 

          <Image
            source={topCurve}
            style={{ width: '100%', height: UNIT * 4 }}
            resizeMode='stretch'
            testID='top-image'
          />

          <View>
            <TouchableOpacity 
              style={styles.option} 
              onPress={() => handlePress('create')}
              activeOpacity={1}
              testID='create-navigation'
            >
              {iconCreate}
              <View>
                <Text style={TEXT.h1White}>create</Text>
                <Text style={TEXT.regularWhite}>host events, and post your artwork</Text>
              </View>
            </TouchableOpacity>
            <Image
              source={middleCurveFirst}
              style={{ width: '100%', height: UNIT * 4 }}
              resizeMode='stretch'
              testID='middle-first-image'
            />
            <TouchableOpacity 
              style={[styles.option, styles.backgroundSecondary]} 
              onPress={() => handlePress('explore')}
              activeOpacity={1}
              testID='explore-navigation'
            >
              {iconExplore}
              <View>
                <Text style={TEXT.h1Black}>explore</Text>
                <Text style={TEXT.regular}>discover local creative minds</Text>
              </View>
            </TouchableOpacity>
            <Image
              source={middleCurveSecond}
              style={{ width: '100%', height: UNIT * 4 }}
              resizeMode='stretch'
              testID='middle-second-image'
            />
            <TouchableOpacity 
              style={styles.option} 
              onPress={() => handlePress('search')}
              activeOpacity={1}
              testID='discover-navigation'
            >
              {iconSearch}
              <View>
                <Text style={TEXT.h1White}>discover</Text>
                <Text style={TEXT.regularWhite}>find art, events, people, tags</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Image
            source={bottomCurve}
            style={{ width: '100%', height: UNIT * 4 }}
            resizeMode='stretch'
            testID='bottom-image'
          />

        </View>
          
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: UNIT * 2,
    backgroundColor: COLOURS.white,
  },
  centralSectionContainer: {
    alignItems: 'center',
    gap: UNIT,
    paddingBottom: UNIT,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '10%',
    gap: UNIT, 
    paddingInline: UNIT,
    backgroundColor: COLOURS.primary
  },
  backgroundSecondary: {
    backgroundColor: COLOURS.secondary
  },

});