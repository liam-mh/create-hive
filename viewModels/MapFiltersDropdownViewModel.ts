import { IconNameType } from '@/utils/iconUtils';

interface FilterItem {
  filterText: string;
  icon: IconNameType;
  iconFill: IconNameType;
  filterKey: string;
}

export class MapFiltersDropdownViewModel {
  private _expanded: boolean = false;
  private _selectedFilters: string[] = [];
  private _filters: FilterItem[] = [
    {
      filterText: 'verified only',
      icon: 'personCheck',
      iconFill: 'personFillCheck',
      filterKey: 'verified',
    },
    {
      filterText: 'hide artwork',
      icon: 'palette',
      iconFill: 'paletteFill',
      filterKey: 'artwork',
    },
    {
      filterText: 'casual',
      icon: 'cupHot',
      iconFill: 'cupHotFill',
      filterKey: 'casual',
    },
    {
      filterText: 'workshop',
      icon: 'brush',
      iconFill: 'brushFill',
      filterKey: 'workshop',
    },
    {
      filterText: 'exhibition',
      icon: 'easel2',
      iconFill: 'easel2Fill',
      filterKey: 'exhibition',
    },
  ];

  get expanded() {
    return this._expanded;
  }

  get selectedFilters() {
    return this._selectedFilters;
  }

  get filters() {
    return this._filters;
  }

  toggleDropdown = () => {
    this._expanded = !this._expanded;
  };

  toggleFilter = (filter: string): string[] => { 
    if (this._selectedFilters.includes(filter)) {
      this._selectedFilters = this._selectedFilters.filter((item) => item !== filter);
    } else {
      this._selectedFilters = [...this._selectedFilters, filter];
    }
    return this._selectedFilters; 
  };
}