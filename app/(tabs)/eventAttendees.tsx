import CustomHeader from '@/components/CustomHeader';
import { Attendee } from '@/models/Attendee';
import { getAttendeesByEventId } from '@/services/attendeeService';
import TEXT, { COLOURS, DIVS, SIZES, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface EventAttendeesParams {
  sessionUserId: string;
  eventId: string;
}

function isEventAttendeesParams(params: Record<string, any>): params is EventAttendeesParams {
  return (
    typeof params.sessionUserId === 'string' &&
    typeof params.eventId === 'string'
  );
}

const EventAttendees = () => {
  const inputParams = useLocalSearchParams();
  if (!isEventAttendeesParams(inputParams)) {
    throw new Error('Invalid or missing route parameters');
  }
  const params: EventAttendeesParams = inputParams;
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const iconApproved = getIcon('checkSquareFill', SIZES.m, COLOURS.primary);
  const iconPending = getIcon('plusSquare', SIZES.m, COLOURS.secondary);
  const iconDecline = getIcon('xCircle', SIZES.m, COLOURS.red);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAttendees = await getAttendeesByEventId(params.eventId);
      setAttendees(fetchedAttendees)
    };

    fetchData();
  }, [params.eventId]);

  
  return (
    <>
      <CustomHeader>
        <Text style={TEXT.h1}>attendees</Text>
      </CustomHeader>

      <View style={styles.container}>
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <React.Fragment key={attendee.attendeeId}>
              <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.optionContainer}>
                  <Text style={TEXT.regular}>{attendee.attendeeId}</Text>
                  {attendee.approved ? (
                    iconApproved
                  ) : (
                    <View style={{ flexDirection: 'row', gap: UNIT * 2 }}>
                      {iconDecline}
                      {iconPending}
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={DIVS.offwhite} />
            </React.Fragment>
          ))
        ) : (
          <View style={styles.sectionContainer}>
            <Text>nobody has registered to attend yet</Text>
          </View>
        )}
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

export default EventAttendees;