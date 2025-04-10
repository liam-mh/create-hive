import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback, 
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TEXT, { COLOURS, CORNERS, SIZES, UNIT } from '@/styles';
import CustomHeader from '@/components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InteractionServicePost } from '@/services/interaction/interactionService';
import { Timestamp } from 'firebase/firestore';
import { getIcon } from '@/utils/iconUtils';

export interface messageParams {
  primaryUserId: string,
  primaryUserName: string,
  secondaryUserId: string,
  secondaryUserName: string
}

function isMessageParams(params: Record<string, any>): params is messageParams {
  return (
    typeof params.primaryUserId === 'string' &&
    typeof params.primaryUserName === 'string' &&
    typeof params.secondaryUserId === 'string' &&
    typeof params.secondaryUserName === 'string'
  );
}

const displayMessage = (isPrimaryUser: boolean, content: string) => {
  return (
    <View
      style={[
        {
          alignSelf: isPrimaryUser ? 'flex-end' : 'flex-start',
          backgroundColor: isPrimaryUser ? COLOURS.primary : COLOURS.white,
        },
        {
          padding: UNIT / 2,
          borderRadius: CORNERS.default,
          marginBottom: UNIT / 2,
          maxWidth: '80%',
        }
      ]}
    >
      <Text style={[TEXT.regular, { color: isPrimaryUser ? COLOURS.white : COLOURS.black }]}>
        {content}
      </Text>
    </View>
  );
};

const Message = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const inputParams = useLocalSearchParams();
  if (!isMessageParams(inputParams)) {
    throw new Error('Invalid or missing route parameters');
  }
  const params: messageParams = inputParams;

  const iconSend = getIcon('send', SIZES.l, COLOURS.primary);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<InteractionServicePost[]>([]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const message: InteractionServicePost = {
      userId: params.primaryUserId,
      itemId: params.secondaryUserId,
      itemType: 'comment',
      actionType: 'comment',
      timestamp: Timestamp.now(),
      content: inputText
    }

    setMessages((prevMessages) => [...prevMessages, message]);
    setInputText('')
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <CustomHeader 
            children={<Text style={TEXT.h1}>{params.secondaryUserName}</Text>} 
          />

          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <View key={index}>
                {displayMessage(msg.userId === params.primaryUserId, msg.content!)}
              </View>
              ))
            ) : (
              <Text style={TEXT.regular}>say hi to {params.secondaryUserName}</Text>
            )}
          </ScrollView>

          <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
            <TextInput
              style={styles.textInput}
              placeholder="type a message..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity style={{ paddingBottom: UNIT}} onPress={handleSend}>
              {iconSend}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.offwhite,
    flex: 1,
  },
  contentContainer: {
    padding: UNIT,
    paddingBottom: UNIT * 2,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: UNIT,
    padding: UNIT,
    backgroundColor: COLOURS.white,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLOURS.offwhite,
    borderRadius: CORNERS.default,
    padding: UNIT,
    textAlignVertical: 'top',
  },
});

export default Message;
