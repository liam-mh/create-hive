import { SharedButtonProps } from '@/types/SharedButtonProps';
import { IconNameType } from '@/utils/iconUtils';

class BaseButtonViewModel {
  private _text: string;
  private _icon: IconNameType;
  private _iconFill: IconNameType;
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

  get icon(): IconNameType {
    return this._icon;
  }

  get iconFill(): IconNameType {
    return this._iconFill;
  }

  get iconToUse() {
    if (this._isSelected && this._iconFill) {
      if(!this._iconFill){
        return this._icon;
      }
      return this._iconFill;
    }
    return this._icon;
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

export default BaseButtonViewModel;