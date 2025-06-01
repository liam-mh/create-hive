import { BUTTON_COLOURS } from '@/styles';
import { IconNameType } from '@/utils/iconUtils';

// Possible visual states a button can have
export type ButtonStateOptions = 'default' | 'active' | 'pending' | 'disabled';

// Configuration for each state
interface ButtonStateConfig {
  text?: string;
  icon?: IconNameType;
  onPress: () => void;
}

// Required `default`, optional `active` / `pending` / `disabled`
export type ButtonStateConfigs = {
  default: ButtonStateConfig;
} & Partial<Record<Exclude<ButtonStateOptions, 'default'>, ButtonStateConfig>>;

// Props for the BaseButton component
export interface ButtonProps {
  state: ButtonStateOptions;
  states: ButtonStateConfigs;
  isIconButton?: boolean;
  isFullWidth?: boolean;
  variant?: VariantLevel;
}

// Visual variants: theme types
export type VariantLevel = 'primary' | 'secondary' | 'tertiary';

// Visual style config for a given state
export type ButtonVisualStyle = {
  backgroundColor?: string | null;
  textColor: string;
};

// All style combinations for all variants and states
export type ButtonStyleVariants = Record<
  VariantLevel,
  Record<ButtonStateOptions, ButtonVisualStyle>
>;

// Final button style config 
export const BUTTON_STATE_STYLES: ButtonStyleVariants = {
  primary: {
    default:  { backgroundColor: BUTTON_COLOURS.primaryBackground,        textColor: BUTTON_COLOURS.primaryText },
    pending:  { backgroundColor: BUTTON_COLOURS.primaryBackgroundPressed, textColor: BUTTON_COLOURS.primaryText },
    active:   { backgroundColor: BUTTON_COLOURS.primaryBackgroundPressed, textColor: BUTTON_COLOURS.primaryText },
    disabled: { backgroundColor: BUTTON_COLOURS.disabledBackground,       textColor: BUTTON_COLOURS.disabledText },
  },
  secondary: {
    default:  { backgroundColor: BUTTON_COLOURS.secondaryBackground,        textColor: BUTTON_COLOURS.secondaryText },
    pending:  { backgroundColor: BUTTON_COLOURS.secondaryBackgroundPressed, textColor: BUTTON_COLOURS.secondaryText },
    active:   { backgroundColor: BUTTON_COLOURS.secondaryBackgroundPressed, textColor: BUTTON_COLOURS.secondaryText },
    disabled: { backgroundColor: BUTTON_COLOURS.disabledBackground,         textColor: BUTTON_COLOURS.disabledText },
  },
  tertiary: {
    default:  { backgroundColor: BUTTON_COLOURS.tertiaryBackground,        textColor: BUTTON_COLOURS.tertiaryText },
    pending:  { backgroundColor: BUTTON_COLOURS.tertiaryBackgroundPressed, textColor: BUTTON_COLOURS.tertiaryText },
    active:   { backgroundColor: BUTTON_COLOURS.tertiaryBackgroundPressed, textColor: BUTTON_COLOURS.tertiaryText },
    disabled: { backgroundColor: BUTTON_COLOURS.tertiaryBackground,        textColor: BUTTON_COLOURS.disabledText },
  },
};