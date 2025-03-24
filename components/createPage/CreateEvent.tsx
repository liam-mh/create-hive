import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { COLOURS, CORNERS, DIVS, SIZES, UNIT } from '@/styles';
import CreateEventViewModel from '@/viewModels/CreateEventViewModel';
import { getIcon } from '@/utils/iconUtils';

interface CreateEventProps {
  userId: string;
}

const CreateEvent: React.FC<CreateEventProps> = ( props ) => {
  const [viewModel] = useState(() => new CreateEventViewModel(props.userId));
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  const iconCasual = getIcon('cupHotFill', SIZES.l, COLOURS.primary);
  const iconWorkshop = getIcon('brushFill', SIZES.l, COLOURS.primary);
  const iconExhibition = getIcon('easel2Fill', SIZES.l, COLOURS.primary);

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(viewModel.loading);
      setError(viewModel.error);
      setLoading(false);
    };

    fetchData();
  }, [props.userId]);


  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }

  return (
    <View style={styles.contentContainer}>

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="event type" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regularGrey}>what kind of event would you be hosting?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.panelContainer}>
                {iconCasual}
                <Text style={TEXT.regularPrimary}>casual</Text>
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
  loadMoreContainer: {
    padding: UNIT,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
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
  gapContainer: {
    gap:UNIT
  }
});

export default CreateEvent;