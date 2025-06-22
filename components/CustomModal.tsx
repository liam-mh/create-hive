import React, { ReactNode, ReactElement, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import BaseButton from "@/components/buttons/BaseButton";
import { CORNERS, SHADOWS, UNIT } from "@/styles";

interface ModalProps {
  children: ReactNode;
  trigger?: (show: () => void) => ReactElement; 
}

const CustomModal: React.FC<ModalProps> = ({ children, trigger }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          hideModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modal, SHADOWS.containerShadow]}>
            {children}
            <View style={styles.buttonContainer}>
            <BaseButton 
              state='default'
              variant='tertiary'
              states={{
                default: {
                  text: 'cancel',
                  onPress: hideModal
                }
              }}
            />
            <BaseButton 
              state='default'
              variant='primary'
              states={{
                default: {
                  text: 'okay',
                  onPress: hideModal
                }
              }}
            />
          </View>
          </View>
        </View>
      </Modal>

      {trigger ? (
        trigger(showModal)
      ) : (
        <BaseButton 
            state='default'
            variant='primary'
            states={{
              default: {
                text: 'show modal',
                onPress: showModal
              }
            }}
          />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    paddingHorizontal: UNIT
  },
  modal: {
    backgroundColor: "white",
    borderRadius: CORNERS.default,
    padding: UNIT,
    gap: UNIT,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: UNIT
  }

});

export default CustomModal;