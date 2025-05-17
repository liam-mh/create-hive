import React, { useEffect, useRef, useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import FollowButtonViewModel from '@/viewModels/FollowButtonViewModel';

interface FollowButtonProps {
  userToFollowId: string;
  isIconButton?: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ( props ) => {
  const viewModel = useRef<FollowButtonViewModel>(new FollowButtonViewModel(props.userToFollowId)).current;
  const [buttonState, setButtonState] = useState(viewModel.buttonState);
  
  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchFollowData();
      setButtonState(viewModel.buttonState);
    };
    fetchData();
  }, [props]);

  const handlePress = async () => {
    await viewModel.handlePress();
    setButtonState(viewModel.buttonState);
  };

  return (
    <BaseButton
      text={buttonState.text}
      icon={buttonState.icon}
      iconFill={buttonState.iconFill}
      pending={buttonState.pending}
      onPress={handlePress}
      isSelected={buttonState.isSelected} 
      isIconButton={props.isIconButton ?? false}
    />
  );
};

export default FollowButton;