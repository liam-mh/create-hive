import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import ContentDropdownContainer from './ContentDropdownContainer';
import { DIVS, UNIT } from '@/styles';
import ProfileTabVerificationViewModel from '@/viewModels/ProfileTabVerificationViewModel';
import DetailsContainer from './DetailsContainer';
import KeyValueRow from './KeyValueRow';
import DetailsRow from './DetailsRow';

interface ProfileTabVerificationProps {
  userId: string;
}

const ProfileTabVerification: React.FC<ProfileTabVerificationProps> = ( props ) => {
  const viewModel = new ProfileTabVerificationViewModel(props.userId);
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  const [verification, setVerification] = useState(viewModel.verification);
  const [formattedDate, setFormattedDate] = useState(viewModel.formattedJoinedDate);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchData();
      setLoading(viewModel.loading);
      setError(viewModel.error);

      setVerification(viewModel.verification);
      setFormattedDate(viewModel.formattedJoinedDate)
    };
    fetchData();
  }, [props.userId]);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }
  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }
  if (!verification || !formattedDate) {
    return <View style={styles.contentContainer}><Text>No verification to show.</Text></View>;
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer 
          title={'details'} 
          addPadding={true}
          expanded={true}
          children={
            <DetailsContainer>
              <KeyValueRow rowType={'text'} textData={{key: 'joined', value: formattedDate.toLowerCase()}} />
              <KeyValueRow rowType={'text'} textData={{key: 'events', value: verification.events.toString()}} />
            </DetailsContainer>
          }
        />
      </View>
      <View style={DIVS.offwhite} />
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer 
          title={'reviews'} 
          addPadding={true}
          expanded={true}
          children={
            <DetailsContainer>
              <KeyValueRow rowType={'text'} textData={{key: 'rating', value: verification.rating.toString()}} />
              <KeyValueRow rowType={'text'} textData={{key: 'reviews', value: verification.reviews.toString()}} />
            </DetailsContainer>
          }
        />
      </View>
      <View style={DIVS.offwhite} />
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer 
          title={'confirmed information'} 
          addPadding={true}
          expanded={true}
          children={
            <DetailsContainer>
              <DetailsRow iconName={'passport'} text={'identity'} verificationTick={verification.identity} />
              <DetailsRow iconName={'envelopeAt'} text={'email address'} verificationTick={verification.email} />
              <DetailsRow iconName={'telephone'} text={'phone number'} verificationTick={verification.mobile} />
              <DetailsRow iconName={'geoAlt'} text={'location'} verificationTick={verification.location} />
            </DetailsContainer>
          }
        />
      </View>
      <View style={DIVS.offwhite} />
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer 
          title={'report'} 
          addPadding={true}
          expanded={true}
          children={
            <DetailsContainer>
              <DetailsRow iconName={'flag'} text={'report this profile'} />
            </DetailsContainer>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: UNIT,
    paddingBottom: UNIT
  },
  sectionContainer: {
    paddingInline: UNIT
  }
});

export default ProfileTabVerification;