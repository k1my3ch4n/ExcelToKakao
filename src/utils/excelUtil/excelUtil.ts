import {
  IButtonData,
  IButtonsData,
  ICommerce,
  ICommerceData,
  IContentData,
  IFeedData,
  IItemContent,
  IItems,
  ILinkData,
  IListData,
  ILocationData,
  ITextData,
  MessageType,
  MissingDataType,
} from '@interface/excel';
import { read, Range, Sheet, utils } from 'xlsx';

export type ExcelRecord = Record<string, string | null>;

export interface ButtonsType {
  buttonTitle: string;
  buttonLink: string;
}

const checkIsNumber = /^[0-9]*$/;

const trimColumns = (records: ExcelRecord): ExcelRecord => {
  return Object.entries(records).reduce<ExcelRecord>((acc, [key, value]) => {
    acc[key.trim()] = value;

    return acc;
  }, {});
};

export const excelFileToRecords = async (excelFile: File) => {
  try {
    const sheet: Sheet = await (() =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (e: ProgressEvent<FileReader>) => {
          if (!e.target?.result) {
            return;
          }

          const arrayBuffer = e.target.result;

          const workbook = read(arrayBuffer);

          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          // ? sheet['!merges']는 병합된 셀의 range 객체를 포함하는 리스트를 반환
          sheet['!merges']?.forEach((range: Range) => {
            // ? encode_range 메서드를 사용하여 top-left 셀 구하기 (병합된 셀의 값은 top-left 셀에만 적용되기 때문)
            const topLeftCell = utils.encode_range(range).split(':')[0];

            for (let column = range.s.c; column <= range.e.c; column++) {
              for (let row = range.s.r; row <= range.e.r; row++) {
                sheet[String.fromCharCode(65 + column) + (row + 1)] = sheet[topLeftCell];
              }
            }
          });

          resolve(sheet);
        };

        fileReader.onerror = () => {
          reject(new Error('fileReader error'));
        };

        fileReader.readAsArrayBuffer(excelFile);
      }))();

    return utils
      .sheet_to_json<ExcelRecord>(sheet, { defval: null })
      .map((row) => trimColumns(row))[0];
  } catch (e) {
    console.error(e);
    throw Error('excelFileToRecords error');
  }
};

const checkLinkData = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  const linkData = {} as ILinkData;

  // ? link : 두 값중 하나만 존재하면 필수
  const webLink = record['content_web_url'];
  const mobileWebLink = record['content_mobile_web_url'];

  // ? link 존재여부 확인
  const hasLink = !!webLink || !!mobileWebLink;

  if (!hasLink) {
    missingData.add('link');
  }

  if (webLink) {
    linkData['webUrl'] = webLink;
  }

  if (mobileWebLink) {
    linkData['mobileWebUrl'] = mobileWebLink;
  }

  return linkData;
};

const checkButtonsData = (record: ExcelRecord) => {
  const buttonsData: IButtonsData = {};
  const buttons: IButtonData[] = [];

  // ? buttonTitle : 값이 없다면 , '자세히 보기' 가 기본값
  const buttonTitle = record['button_title'];

  // ? buttons : 버튼이 여러개인 경우. buttonTitle 과 같이 사용되는 경우 , buttons 가 우선
  const buttonsTitle1 = record['buttons_title1'];
  const buttonsWebLink1 = record['buttons_web_url1'];
  const buttonsMobileWebLink1 = record['buttons_mobile_web_url1'];

  const buttonsTitle2 = record['buttons_title2'];
  const buttonsWebLink2 = record['buttons_web_url2'];
  const buttonsMobileWebLink2 = record['buttons_mobile_web_url2'];

  // ? 버튼이 완전하게 존재하는 지 , 존재하지 않는지 확인
  const hasButton1 = !!buttonsTitle1 && (!!buttonsWebLink1 || !!buttonsMobileWebLink1);
  const hasButton2 = !!buttonsTitle2 && (!!buttonsWebLink2 || !!buttonsMobileWebLink2);

  if (hasButton1) {
    const linkData = {} as ILinkData;

    if (!!buttonsWebLink1) {
      linkData['webUrl'] = buttonsWebLink1;
    }

    if (!!buttonsMobileWebLink1) {
      linkData['mobileWebUrl'] = buttonsMobileWebLink1;
    }

    buttons.push({
      title: buttonsTitle1,
      link: linkData,
    });
  }

  if (hasButton2) {
    const linkData = {} as ILinkData;

    if (!!buttonsWebLink2) {
      linkData['webUrl'] = buttonsWebLink2;
    }

    if (!!buttonsMobileWebLink2) {
      linkData['mobileWebUrl'] = buttonsMobileWebLink2;
    }

    buttons.push({
      title: buttonsTitle2,
      link: linkData,
    });
  }

  if (!!buttonTitle) {
    buttonsData['buttonTitle'] = buttonTitle;
  }

  if (buttons.length > 0) {
    buttonsData['buttons'] = buttons;
  }

  return buttonsData;
};

const checkContentData = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  const title = record['content_title'];
  const description = record['content_description'];
  const imageUrl = record['content_image_url'];

  const linkData = checkLinkData({ record, missingData });

  const contentData = {
    link: linkData,
  } as IContentData;

  const hasContentData = !!title || !!description || !!imageUrl;

  if (!hasContentData) {
    missingData.add('content');
  }

  if (!!title) {
    contentData['title'] = title;
  }

  if (!!description) {
    contentData['description'] = description;
  }

  if (!!imageUrl) {
    contentData['imageUrl'] = imageUrl;
  }

  return contentData;
};

const checkCommerceData = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  const productName = record['product_name']; // 필수 아님
  const regularPrice =
    !!record['regular_price'] && checkIsNumber.test(record['regular_price'])
      ? Number(record['regular_price'])
      : null; // 필수
  const discountPrice = record['discount_price']; // 필수 아님
  const discountRate = record['discount_rate']; // 필수 아님
  const fixedDiscountPrice = record['fixed_discount_price']; // 필수 아님
  const currencyUnit = record['currency_unit']; // 필수 아님
  const currencyUnitPosition = record['currency_unit_position']; // 필수 아님

  if (!regularPrice) {
    missingData.add('regularPrice');
  }

  const commerceData: ICommerce = {
    regularPrice,
    currencyUnitPosition: Number(currencyUnitPosition) === 1 ? 1 : 0,
  };

  if (!!productName) {
    commerceData['productName'] = productName;
  }

  if (!!discountPrice && checkIsNumber.test(discountPrice)) {
    commerceData['discountPrice'] = Number(discountPrice);
  }

  if (!!discountRate && checkIsNumber.test(discountRate)) {
    commerceData['discountRate'] = Number(discountRate);
  }

  if (!!fixedDiscountPrice && checkIsNumber.test(fixedDiscountPrice)) {
    commerceData['fixedDiscountPrice'] = Number(fixedDiscountPrice);
  }

  if (!!currencyUnit) {
    commerceData['currencyUnit'] = currencyUnit;
  }

  return commerceData;
};

const checkItemData = ({ record, count }: { record: ExcelRecord; count: number }) => {
  const itemData: IItems[] = [];

  for (var i = 1; i <= count; i++) {
    const item = record[`item${i}`];
    const itemOp = record[`item_op${i}`];

    const hasItem = !!item && !!itemOp;

    if (hasItem) {
      itemData.push({
        item,
        itemOp,
      });
    }
  }

  return itemData;
};

const checkContentsData = ({ record, count }: { record: ExcelRecord; count: number }) => {
  // ? contents 값 확인
  const contents = [];

  for (var i = 1; i <= count; i++) {
    const title = record[`content_title${i}`];
    const description = record[`content_description${i}`];
    const imageUrl = record[`content_image_url${i}`];
    const webLink = record[`content_web_url${i}`];
    const mobileWebLink = record[`content_mobile_web_url${i}`];

    const hasLink = !!webLink || !!mobileWebLink;
    const hasContentData = (!!title || !!description || !!imageUrl) && hasLink;

    if (hasContentData) {
      const linkData = {} as ILinkData;

      if (webLink) {
        linkData['webUrl'] = webLink;
      }

      if (mobileWebLink) {
        linkData['mobileWebUrl'] = mobileWebLink;
      }

      const contentData = {
        link: linkData,
      } as IContentData;

      if (!!title) {
        contentData['title'] = title;
      }

      if (!!description) {
        contentData['description'] = description;
      }

      if (!!imageUrl) {
        contentData['imageUrl'] = imageUrl;
      }

      contents.push(contentData);
    }
  }

  return contents;
};

const recordsToText = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  // ? objectType
  const objectType = record['objectType'] as MessageType;

  // ? title : 필수값
  const text = record['content_text'];

  // ? link 값 확인
  const linkData = checkLinkData({ record, missingData });

  // ? button 값 확인
  const buttonsData = checkButtonsData(record);

  if (!text) {
    missingData.add('text');
  }

  const sendData: ITextData = {
    objectType,
    text,
    link: linkData,
    ...buttonsData,
  };

  return {
    sendData,
    missingData,
  };
};

const recordsToLocation = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  // ? objectType
  const objectType = record['objectType'] as MessageType;

  // ? address 필수 / addressTitle 은 필수 아님
  const address = record['address'];
  const addressTitle = record['address_title'];

  // ? content 확인
  const contentData = checkContentData({ record, missingData });

  // ? button 값 확인
  const buttonsData = checkButtonsData(record);

  if (!address) {
    missingData.add('address');
  }

  const sendData: ILocationData = {
    objectType,
    address,
    content: contentData,
    ...buttonsData,
  };

  if (addressTitle) {
    sendData['addressTitle'] = addressTitle;
  }

  return {
    sendData,
    missingData,
  };
};

const recordsToFeed = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  // ? objectType
  const objectType = record['objectType'] as MessageType;

  // ? content 확인
  const contentData = checkContentData({ record, missingData });

  // ? button 값 확인
  const buttonsData = checkButtonsData(record);

  const profileText = record['profile_text'];
  const profileImageUrl = record['profile_image_url'];
  const titleImageText = record['profile_image_text'];
  const titleImageUrl = record['title_image_url'];
  const titleImageCategory = record['title_image_category'];

  const itemData = checkItemData({ record, count: 5 });

  const sum = record['sum'];
  const sumOp = record['sum_op'];

  const sendData: IFeedData = {
    objectType,
    content: contentData,
    ...buttonsData,
  };

  const itemContent: IItemContent = {};

  if (!!profileText) {
    itemContent['profileText'] = profileText;
  }

  if (!!profileImageUrl) {
    itemContent['profileImageUrl'] = profileImageUrl;
  }

  if (!!titleImageText) {
    itemContent['titleImageText'] = titleImageText;
  }

  if (!!titleImageUrl) {
    itemContent['titleImageUrl'] = titleImageUrl;
  }

  if (!!titleImageCategory) {
    itemContent['titleImageCategory'] = titleImageCategory;
  }

  if (!!sum) {
    itemContent['sum'] = sum;
  }

  if (!!sumOp) {
    itemContent['sumOp'] = sumOp;
  }

  if (itemData.length > 0) {
    itemContent['items'] = itemData;
  }

  sendData['itemContent'] = itemContent;

  return {
    sendData,
    missingData,
  };
};

const recordsToList = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  // ? objectType
  const objectType = record['objectType'] as MessageType;

  // ? headerTitle 필수값
  const headerTitle = record['header_title'];

  // ? link 값 확인
  const headerLink = checkLinkData({ record, missingData });

  // ? button 값 확인
  const buttonsData = checkButtonsData(record);

  // ? contents 값 확인
  const contents = checkContentsData({ record, count: 3 });

  if (!headerTitle) {
    missingData.add('headerTitle');
  }

  if (contents.length < 2) {
    missingData.add('contents');
  }

  const sendData: IListData = {
    objectType,
    headerTitle,
    headerLink,
    ...buttonsData,
    contents,
  };

  return {
    sendData,
    missingData,
  };
};

const recordsToCommerce = ({
  record,
  missingData,
}: {
  record: ExcelRecord;
  missingData: Set<MissingDataType>;
}) => {
  // ? objectType
  const objectType = record['objectType'] as MessageType;

  //
  const commerce = checkCommerceData({ record, missingData });

  // ? content 확인
  const content = checkContentData({ record, missingData });

  // ? button 값 확인
  const buttonsData = checkButtonsData(record);

  const sendData: ICommerceData = {
    objectType,
    content,
    commerce,
    ...buttonsData,
  };

  return {
    sendData,
    missingData,
  };
};

export const recordsToSendData = (record: ExcelRecord) => {
  const missingData = new Set<MissingDataType>();

  const objectType = record['objectType'] as MessageType | null;

  if (!objectType) {
    missingData.add('objectType');

    return {
      objectType,
      missingData,
      sendData: null,
    };
  }

  if (objectType === 'feed') {
    const { sendData } = recordsToFeed({ record, missingData });

    return {
      objectType,
      missingData,
      sendData,
    };
  }

  if (objectType === 'text') {
    const { sendData } = recordsToText({ record, missingData });

    return {
      objectType,
      missingData,
      sendData,
    };
  }

  if (objectType === 'location') {
    const { sendData } = recordsToLocation({ record, missingData });

    return {
      objectType,
      missingData,
      sendData,
    };
  }

  if (objectType === 'list') {
    const { sendData } = recordsToList({ record, missingData });

    return {
      objectType,
      missingData,
      sendData,
    };
  }

  if (objectType === 'commerce') {
    const { sendData } = recordsToCommerce({ record, missingData });

    return {
      objectType,
      missingData,
      sendData,
    };
  }

  return {
    objectType,
    missingData,
    sendData: null,
  };
};
