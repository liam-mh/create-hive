import { COLOURS } from '@/styles';
import { SharedButtonProps } from '@/types/SharedButtonProps';

class BaseButtonViewModel {
  private _text: string;
  private _icon: React.ComponentType<any> | undefined;
  private _iconFill: React.ComponentType<any> | undefined;
  private _pending: boolean;
  private _isSelected: boolean;
  private _onPress: () => void;
  private _isIconButton: boolean;

  constructor(props: SharedButtonProps) {
    this._text = props.text;
    this._icon = props.icon;
    this._iconFill = props.iconFill;
    this._pending = props.pending;
    this._isSelected = props.isSelected;
    this._onPress = props.onPress;
    this._isIconButton = props.isIconButton;
  }

  get text(): string {
    return this._text;
  }

  get icon(): React.ComponentType<any> | undefined {
    return this._icon;
  }

  get iconFill(): React.ComponentType<any> | undefined {
    return this._iconFill;
  }

  get pending(): boolean {
    return this._pending;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  get isIconButton(): boolean {
    return this._isIconButton;
  }

  toggleSelected(): void {
    this._isSelected = !this._isSelected;
  }

  get onPress() {
    return this._onPress;
  }
}

const styles = {
  unselectedContainer: {
    backgroundColor: COLOURS.secondary,
  },
  selectedContainer: {
    backgroundColor: COLOURS.primary,
  },
  pendingContainer: {
    backgroundColor: COLOURS.offwhite,
  },
};

export default BaseButtonViewModel;