import IconSave from '@/assets/icons/bookmark.svg';
import IconSaveFill from '@/assets/icons/bookmark-fill.svg';
import { getSave, saveItem, SaveServiceProps } from '@/services/interaction/saveService';
import { Interaction, ItemType } from '@/models/Interaction';

class SaveButtonViewModel {
  private _itemId: string;
  private _itemType: ItemType;
  private _userId: string;
  private _loading: boolean = true;
  private _isSelected: boolean = false;
  private _saveInteraction: Interaction | null = null;

  constructor(userId: string, itemId: string, itemType: ItemType) {
    this._userId = userId;
    this._itemId = itemId;
    this._itemType = itemType;
  }

  get loading(): boolean {
    return this._loading;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  async handleSave() {
    const save: SaveServiceProps = {
      userId: this._userId,
      itemId: this._itemId,
      itemType: this._itemType
    };
    return save;
  }


  async saveItem(): Promise<void> {
    this._loading = true;
    await saveItem(await this.handleSave());
    this._loading = false;
    await this.fetchSavedState();
  }

  async fetchSavedState(): Promise<void> {
    this._loading = true;
    this._saveInteraction = await getSave(await this.handleSave());
    console.log('SAVED INTER: ', this._saveInteraction);
    this._loading = false;
  }

  async handlePress(): Promise<void> {
    this._isSelected = !this._isSelected;
    console.log(
      `Save button with itemtId ${this._itemId} pressed. State: ${
        this._isSelected ? 'selected' : 'unselected'
      }`
    );
    await this.saveItem();
  }

  get buttonState() {
    let text = 'save';

    if (this._saveInteraction) {
      text = 'saved';
      this._isSelected = true;
    }
  
    return {
      text,
      icon: IconSave,
      iconFill: IconSaveFill,
      onPress: async () => await this.handlePress(), 
      isSelected: this._isSelected,
      pending: false,
    };
  }
}

export default SaveButtonViewModel;