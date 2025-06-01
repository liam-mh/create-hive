import { getIcon } from '@/utils/iconUtils';
import { ButtonProps, ButtonStateOptions, VariantLevel, ButtonVisualStyle, BUTTON_STATE_STYLES } from '@/types/Button';
import { SIZES } from '@/styles';

export function useButtonViewModel(props: ButtonProps) {
  const {
    state, 
    states,
    isIconButton = false,
    isFullWidth = false,
    variant,
  } = props;

  const currentButtonDisplayState: ButtonStateOptions = state;
  const config = states[currentButtonDisplayState] || states.default;
  const isDisabled = currentButtonDisplayState === 'disabled';

  const resolvedVariant: VariantLevel = isIconButton
    ? 'tertiary'
    : variant ?? 'primary';

  const styleConfig: ButtonVisualStyle =
    BUTTON_STATE_STYLES[resolvedVariant][currentButtonDisplayState];

  const iconElement = config.icon
    ? getIcon(config.icon, isIconButton ? SIZES.icon : undefined, styleConfig.textColor)
    : null;

  const handlePress = () => {
    if (isDisabled) return;
    config.onPress();
  };

  return {
    isIconButton,
    isFullWidth,
    isDisabled,
    config,
    styleConfig,
    iconElement,
    handlePress,
  };
}