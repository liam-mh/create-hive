import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { COLOURS, CORNERS, DIVS, SIZES, UNIT } from '@/styles';
import CreateEventViewModel from '@/viewModels/CreateEventViewModel';
import { getIcon } from '@/utils/iconUtils';
import { Medium, PrimaryMedium, primaryOptions, SecondaryMedium, secondaryOptions } from '@/types/Medium';
import {Calendar, CalendarList, Agenda, DateData} from 'react-native-calendars';
import { Timestamp } from 'firebase/firestore';
import CalendarDateTimeSelection from './CalendarDateTimeSelection';

interface CreateEventProps {
  userId: string;
}

const CreateEvent: React.FC<CreateEventProps> = ( props ) => {
  const [viewModel] = useState(() => new CreateEventViewModel(props.userId));
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  const [selected, setSelected] = useState('');

  const iconCasual = getIcon('cupHotFill', SIZES.l, COLOURS.primary);
  const iconWorkshop = getIcon('brushFill', SIZES.l, COLOURS.primary);
  const iconExhibition = getIcon('easel2Fill', SIZES.l, COLOURS.primary);

  const [selectedPrimary, setSelectedPrimary] = useState<PrimaryMedium | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryMedium | null>(null);

  const handlePrimarySelect = (primary: PrimaryMedium) => {
    setSelectedPrimary(primary);
    setSelectedSecondary(null); 
  };

  const handleSecondarySelect = (secondary: SecondaryMedium) => {
    setSelectedSecondary(secondary);
    console.log("Selected Secondary:", secondary); 
  };

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(viewModel.loading);
      setError(viewModel.error);
      setLoading(false);
    };

    fetchData();
  }, [props.userId]);

  const [selectedTimestamp, setSelectedTimestamp] = useState<Timestamp | null>(null);

  const handleDateSelection = (timestamp: Timestamp | null) => {
    setSelectedTimestamp(timestamp);
    if (timestamp) {
      console.log('Selected Timestamp:', timestamp.toDate()); // Log the date
      // Or perform other actions with the timestamp (e.g., save to Firestore)
    } else {
      console.log('No Timestamp selected');
    }
  };


  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }

  let test: PrimaryMedium = 'digital art'
  let testSecondar: SecondaryMedium = 'watercolour' 

  return (
    <View style={styles.contentContainer}>

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title='event type' addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>what kind of event would you be hosting?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.panelContainer}>
                {iconCasual}
                <Text style={TEXT.regularPrimary}
                >casual</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.panelContainer} >
                {iconWorkshop}
                <Text style={TEXT.regularPrimary}>workshop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.panelContainer} >
                {iconExhibition}
                <Text style={TEXT.regularPrimary}>exhibition</Text>
              </TouchableOpacity>
            </View>
            <Text style={TEXT.smallGrey}>
              casual: connect and craft in a friendly space{'\n'}
              workshop: educate others with practical skills{'\n'}
              exhibition: showcase art for public viewing
            </Text>
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title='art medium' addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>what medium will you be using in the event? pick the most dominant one.</Text>
            <View style={styles.buttonContainer}>
              {primaryOptions.map((primary) => (
                <TouchableOpacity
                  key={primary}
                  style={[
                    styles.panelContainer,
                    selectedPrimary === primary && styles.selectedButton,
                  ]}
                  onPress={() => handlePrimarySelect(primary)}
                >
                  <Text style={TEXT.regularPrimary}>{primary}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {selectedPrimary && (
              <>
                <Text style={TEXT.boldGrey}>sub medium</Text>
                <View style={styles.buttonContainer}>
                  {secondaryOptions[selectedPrimary].map((secondary) => (
                    <TouchableOpacity
                      key={secondary}
                      style={[
                        styles.panelContainer,
                        styles.wrapPanel,
                        selectedSecondary === secondary && styles.selectedButton,
                      ]}
                      onPress={() => handleSecondarySelect(secondary)}
                    >
                      <Text style={TEXT.regularPrimary}>{secondary}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title='date' addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>when will you be hosting the event?</Text>
            <CalendarDateTimeSelection onDateSelection={handleDateSelection} />
            {selectedTimestamp && (
              <Text>Selected Date and Time: {selectedTimestamp.toDate().toString()}</Text>
            )}
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: UNIT,
    overflow: 'visible',
    paddingBottom: UNIT,
  },
  sectionContainer: {
    paddingHorizontal: UNIT,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
    flexWrap: 'wrap'
  },
  panelContainer: {
    flex: 1,
    gap: UNIT/2,
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: UNIT,
    backgroundColor: COLOURS.white,
    borderRadius: CORNERS.default,
    borderWidth: 2,
    borderColor: COLOURS.primary
  },
  wrapPanel: {
    flex: 0
  },
  gapContainer: {
    gap:UNIT
  },
  selectedButton:{
    backgroundColor: `${COLOURS.primary}30`
  },

});

export default CreateEvent;