import ContentDropdownContainer from '@/components/ContentDropdownContainer';
import CustomHeader from '@/components/CustomHeader';
import DetailsContainer from '@/components/DetailsContainer';
import TEXT, { COLOURS, DIVS, SIZES, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Settings() {
  const iconChevronRight = getIcon('chevronRight', SIZES.m, COLOURS.primary);
  
  return (
    <>
      <CustomHeader>
        <Text style={TEXT.h1}>settings</Text>
      </CustomHeader>

      <View style={styles.container}>

        <View style={styles.sectionContainer}>
          <DetailsContainer>
            <ContentDropdownContainer 
              title={'your account'} 
              addPadding
              children={
                <View style={{ gap: UNIT }}>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>accounts centre</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>edit profile</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                </View>
              } 
            />
          </DetailsContainer>
        </View>

        <View style={DIVS.offwhite} />

        <View style={styles.sectionContainer}>
          <DetailsContainer>
            <ContentDropdownContainer 
              title={'account verification'} 
              addPadding
              children={
                <View style={{ gap: UNIT }}>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>identity</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>email</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>phone</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>location</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                </View>
              } 
            />
          </DetailsContainer>
        </View>

        <View style={DIVS.offwhite} />

        <View style={styles.sectionContainer}>
          <DetailsContainer>
            <ContentDropdownContainer 
              title={'more information'} 
              addPadding
              children={
                <View style={{ gap: UNIT }}>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>help</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>privacy policy</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionContainer}>
                    <Text style={TEXT.regular}>about</Text>
                    {iconChevronRight}
                  </TouchableOpacity>
                </View>
              } 
            />
          </DetailsContainer>
        </View>

        <View style={DIVS.offwhite} />

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.optionContainer}>
            <Text style={TEXT.regularPrimary}>add account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer}>
            <Text style={TEXT.regularError}>log out</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingVertical: UNIT,
    backgroundColor: COLOURS.white,
    gap: UNIT,
  },
  sectionContainer: {
    paddingInline: UNIT,
    gap: UNIT / 2
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
  }

});