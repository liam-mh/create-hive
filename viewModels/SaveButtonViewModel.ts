import { SaveButtonProps } from '@/components/buttons/Savebutton';
import { useAuth } from '@/context/authContext';
import { Interaction } from '@/models/Interaction';
import { getSave, saveItem, SaveServiceProps, unsaveItem } from '@/services/interaction/saveService';
import { ButtonStateOptions } from '@/types/Button';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useSaveButtonViewModel(props: Omit<SaveButtonProps, 'isIconButton'>) {
  const { 
    itemId,
    itemType,
  } = props;

  const auth = useAuth();
  const userId = auth.user!.userId;
  const saveServiceProps: SaveServiceProps = { userId, itemId, itemType };

  const [state, setState] = useState<ButtonStateOptions>('default');
  const [save, setSave] = useState<Interaction | null>(null);

  const fetchSave = async () => {
    try {
      const result = await getSave(saveServiceProps);
      setSave(result);
      if (result) setState('active');
      else setState('default');
    } catch {
      setSave(null);
      setState('default');
    }
  }

  useEffect(() => {
    fetchSave();
  }, [itemId])

  const handleSave = async () => {
    setState('pending');
    try {
      await saveItem(saveServiceProps);
      await fetchSave();
    } catch {
      Alert.alert("Save Failed", "Please try again.");
      await fetchSave();
    }
  }

  const handleUnsave = async () => {
    if (!save) return;
    await unsaveItem(saveServiceProps);
    await fetchSave();
  }

  return {
    state,
    handlers: {
      default: handleSave,
      pending: handleUnsave,
      active: handleUnsave,
      disabled: () => {}
    }
  };
}