export type MessageType = 'feed' | 'list' | 'location' | 'commerce' | 'text' | 'calendar';

export interface ILinkData {
  webUrl?: string;
  mobileWebUrl?: string;
}

export interface IButtonData {
  title: string;
  link: ILinkData;
}

export interface IButtonsData {
  buttonTitle?: string;
  buttons?: IButtonData[];
}

export interface IContentData {
  title?: string;
  description?: string;
  imageUrl?: string;
  link: ILinkData;
}

export interface IItems {
  item: string;
  itemOp: string;
}

export interface IItemContent {
  profileText?: string;
  profileImageUrl?: string;
  titleImageText?: string;
  titleImageUrl?: string;
  titleImageCategory?: string;
  items?: IItems[];
  sum?: string;
  sumOp?: string;
}

// ? record interface

export interface ITextData {
  objectType: MessageType;
  text: string | null;
  link: ILinkData;
  buttonTitle?: string;
  buttons?: IButtonData[];
}

export interface ILocationData {
  objectType: MessageType;
  address: string | null;
  addressTitle?: string;
  content: IContentData;
  buttonTitle?: string;
  buttons?: IButtonData[];
}

export interface IFeedData {
  objectType: MessageType;
  content: IContentData;
  itemContent?: IItemContent;
  buttonTitle?: string;
  buttons?: IButtonData[];
}
