import CustomHeader from '@/components/CustomHeader';
import TEXT, { COLOURS, DIVS, SIZES, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface ReportProps {
  sessionUserId: string;
  profileUserId: string;
  profileUserAt: string;
}

const Report: React.FC<ReportProps> = ( props ) => {
  const iconChevronRight = getIcon('chevronRight', SIZES.m, COLOURS.red);
  
  return (
    <>
      <CustomHeader>
        <Text style={TEXT.h1}>report</Text>
      </CustomHeader>

      <View style={styles.container}>

        <View style={styles.sectionContainer}>
          <Text style={TEXT.bold}>what do you want to report?</Text>
          <Text style={TEXT.regularGrey}>We won't let the account know who reported them. If someone is in immediate danger, call the local emergency services - don't wait.</Text>
        </View>

        <View style={DIVS.offwhite} />

        <TouchableOpacity style={styles.optionContainer}>
          <Text style={TEXT.regular}>a specific artwork post</Text>
          {iconChevronRight}
        </TouchableOpacity>

        <View style={DIVS.offwhite} />

        <TouchableOpacity style={styles.optionContainer}>
          <Text style={TEXT.regular}>a specific event</Text>
          {iconChevronRight}
        </TouchableOpacity>

        <View style={DIVS.offwhite} />

        <TouchableOpacity style={styles.optionContainer}>
          <Text style={TEXT.regular}>recent messages that they sent you</Text>
          {iconChevronRight}
        </TouchableOpacity>

        <View style={DIVS.offwhite} />

        <TouchableOpacity style={styles.optionContainer}>
          <Text style={TEXT.regular}>something about this account</Text>
          {iconChevronRight}
        </TouchableOpacity>

        <View style={DIVS.offwhite} />

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
    paddingHorizontal: UNIT,
    gap: UNIT / 2
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: UNIT,
  }

});

export default Report;