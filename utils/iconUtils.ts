import React from 'react';
import { SvgProps } from 'react-native-svg';
import { COLOURS, SIZES } from '@/styles';
import { EventType } from '@/models/Event';

// Icon imports
import At from '@/assets/icons/at.svg';
import BookmarkFill from '@/assets/icons/bookmark-fill.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import BrushFill from '@/assets/icons/brush-fill.svg';
import Brush from '@/assets/icons/brush.svg';
import CalendarPlus from '@/assets/icons/calendar-plus.svg';
import Calendar from '@/assets/icons/calendar.svg';
import CardHeading from '@/assets/icons/card-heading.svg';
import ChatFill from '@/assets/icons/chat-fill.svg';
import Chat from '@/assets/icons/chat.svg';
import CheckCircle from '@/assets/icons/check-circle.svg';
import CheckSquareFill from '@/assets/icons/check-square-fill.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ChevronUp from '@/assets/icons/chevron-up.svg';
import Clock from '@/assets/icons/clock.svg';
import CupHotFill from '@/assets/icons/cup-hot-fill.svg';
import CupHot from '@/assets/icons/cup-hot.svg';
import Easel2Fill from '@/assets/icons/easel2-fill.svg';
import Easel2 from '@/assets/icons/easel2.svg';
import EnvelopeAt from '@/assets/icons/envelope-at.svg';
import FlagFill from '@/assets/icons/flag-fill.svg';
import Flag from '@/assets/icons/flag.svg';
import GeoAltFill from '@/assets/icons/geo-alt-fill.svg';
import GeoAlt from '@/assets/icons/geo-alt.svg';
import HeartFill from '@/assets/icons/heart-fill.svg';
import Heart from '@/assets/icons/heart.svg';
import HouseDoorFill from '@/assets/icons/house-door-fill.svg';
import HouseDoor from '@/assets/icons/house-door.svg';
import InfoSquareFill from '@/assets/icons/info-square-fill.svg';
import InfoSquare from '@/assets/icons/info-square.svg';
import List from '@/assets/icons/list.svg';
import LockFill from '@/assets/icons/lock-fill.svg';
import Lock from '@/assets/icons/lock.svg';
import PaletteFill from '@/assets/icons/palette-fill.svg';
import Palette from '@/assets/icons/palette.svg';
import Passport from '@/assets/icons/passport.svg';
import PencilSquare from '@/assets/icons/pencil-square.svg';
import People from '@/assets/icons/people.svg';
import PeopleFill from '@/assets/icons/people-fill.svg';
import PersonAdd from '@/assets/icons/person-add.svg';
import PersonCheck from '@/assets/icons/person-check.svg';
import PersonFillCheck from '@/assets/icons/person-fill-check.svg';
import PersonFill from '@/assets/icons/person-fill.svg';
import Person from '@/assets/icons/person.svg';
import PlusSquareFill from '@/assets/icons/plus-square-fill.svg';
import PlusSquare from '@/assets/icons/plus-square.svg';
import Search from '@/assets/icons/search.svg';
import SlashSquare from '@/assets/icons/slash-square.svg';
import Tag from '@/assets/icons/tag.svg';
import TagFill from '@/assets/icons/tag-fill.svg';
import Telephone from '@/assets/icons/telephone.svg';
import UnlockFill from '@/assets/icons/unlock-fill.svg';
import Unlock from '@/assets/icons/unlock.svg';
import XCircle from '@/assets/icons/x-circle.svg';

const iconMap: Record<string, React.ComponentType<SvgProps>> = {
  at: At,
  bookmarkFill: BookmarkFill,
  bookmark: Bookmark,
  brushFill: BrushFill,
  brush: Brush,
  calendarPlus: CalendarPlus,
  calendar: Calendar,
  cardHeading: CardHeading,
  chatFill: ChatFill,
  chat: Chat,
  checkCircle: CheckCircle,
  checkSquareFill: CheckSquareFill,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  clock: Clock,
  cupHotFill: CupHotFill,
  cupHot: CupHot,
  easel2Fill: Easel2Fill,
  easel2: Easel2,
  envelopeAt: EnvelopeAt,
  flagFill: FlagFill,
  flag: Flag,
  geoAltFill: GeoAltFill,
  geoAlt: GeoAlt,
  heartFill: HeartFill,
  heart: Heart,
  houseDoorFill: HouseDoorFill,
  houseDoor: HouseDoor,
  infoSquareFill: InfoSquareFill,
  infoSquare: InfoSquare,
  list: List,
  lockFill: LockFill,
  lock: Lock,
  paletteFill: PaletteFill,
  palette: Palette,
  passport: Passport,
  pencilSquare: PencilSquare,
  people: People,
  peopleFill: PeopleFill,
  personAdd: PersonAdd,
  personCheck: PersonCheck,
  personFillCheck: PersonFillCheck,
  personFill: PersonFill,
  person: Person,
  plusSquareFill: PlusSquareFill,
  plusSquare: PlusSquare,
  search: Search,
  slashSquare: SlashSquare,
  tag: Tag,
  tagFill: TagFill,
  telephone: Telephone,
  unlockFill: UnlockFill,
  unlock: Unlock,
  xCircle: XCircle,
};

export type IconNameType =
  | 'at'
  | 'bookmarkFill'
  | 'bookmark'
  | 'brushFill'
  | 'brush'
  | 'calendarPlus'
  | 'calendar'
  | 'cardHeading'
  | 'chatFill'
  | 'chat'
  | 'checkCircle'
  | 'checkSquareFill'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronUp'
  | 'clock'
  | 'cupHotFill'
  | 'cupHot'
  | 'easel2Fill'
  | 'easel2'
  | 'envelopeAt'
  | 'flagFill'
  | 'flag'
  | 'geoAltFill'
  | 'geoAlt'
  | 'heartFill'
  | 'heart'
  | 'houseDoorFill'
  | 'houseDoor'
  | 'infoSquareFill'
  | 'infoSquare'
  | 'list'
  | 'lockFill'
  | 'lock'
  | 'paletteFill'
  | 'palette'
  | 'passport'
  | 'pencilSquare'
  | 'people'
  | 'peopleFill'
  | 'personAdd'
  | 'personCheck'
  | 'personFillCheck'
  | 'personFill'
  | 'person'
  | 'plusSquareFill'
  | 'plusSquare'
  | 'search'
  | 'slashSquare'
  | 'tag'
  | 'tagFill'
  | 'telephone'
  | 'unlockFill'
  | 'unlock'
  | 'xCircle';

const searchForIcon = (name: IconNameType): React.ComponentType<SvgProps> => {
  return iconMap[name];
};

const createIconElement = (
  Icon: React.ComponentType<SvgProps>,
  size: number,
  color: string
) : React.ReactElement<SvgProps> => {
  return React.createElement(Icon, {
    width: size,
    height: size,
    fill: color,
  });
};

export const getIcon = (
  name: IconNameType, 
  size: number = SIZES.m, 
  color: string = COLOURS.black
): React.ReactElement<SvgProps> => {
  const icon = searchForIcon(name);
  return createIconElement(icon, size, color)
}

export const getEventIconName = (eventType: EventType): IconNameType => {
  if (eventType === 'workshop') {
    return 'brushFill';
  } else if (eventType === 'exhibition') {
    return 'easel2Fill';
  } else {
    return 'cupHotFill'; 
  }
};