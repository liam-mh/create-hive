import { useAuth } from '@/context/authContext';
import { Interaction } from '@/models/Interaction';
import { FollowServiceProps, followUser, getFollow, unfollowUser } from '@/services/interaction/followService';
import { ButtonStateOptions } from '@/types/Button';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface UseFollowButtonViewModelProps {
  userToFollowId: string;
}

export function useFollowButtonViewModel(props: UseFollowButtonViewModelProps) {
  const { userToFollowId } = props;
  const auth = useAuth();
  const userId = auth.user!.userId;
  const followServiceProps: FollowServiceProps = { userId, userToFollowId };

  const [state, setState] = useState<ButtonStateOptions>('default');
  const [follow, setFollow] = useState<Interaction | null>(null);

  const fetchFollow = async () => {
    try {
      const result = await getFollow(followServiceProps);
      setFollow(result);
      if (result) setState('active');
      else setState('default');
    } catch {
      setFollow(null);
      setState('default');
    }
  }

  useEffect(() => {
    fetchFollow();
  }, [userToFollowId])

  const handleFollow = async () => {
    setState('pending');
    try {
      await followUser(followServiceProps);
      await fetchFollow();
    } catch {
      Alert.alert("Follow Failed", "Please try again.");
      await fetchFollow();
    }
  }

  const handleUnfollow = async () => {
    if (!follow) return;
    await unfollowUser(followServiceProps);
    await fetchFollow();
  }

  const confirmUnfollow = () => {
    Alert.alert(
      "Unfollow User?",
      "This will remove their content from your feed.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: handleUnfollow },
      ]
    );
  };

  return {
    state,
    handlers: {
      default: handleFollow,
      pending: confirmUnfollow,
      active: confirmUnfollow,
      disabled: () => {}
    }
  };
}