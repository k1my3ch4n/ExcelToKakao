import { read, Range, Sheet, utils } from 'xlsx';

export type ExcelRecord = Record<string, string | null>;
export type MessageType = 'feed' | 'list' | 'location' | 'commerce' | 'text' | 'calendar';

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

export const recordsToSendData = ({
  objectType,
  record,
}: {
  objectType: MessageType;
  record: ExcelRecord;
}) => {
  let sendData = {};

  if (objectType === 'feed') {
    sendData = {
      objectType, // 필수
      content: {
        title: record['content_title'], // 필수 아님 . a 중 1개 필요
        description: record['content_description'], // 필수 아님 . a 중 1개 필요
        imageUrl: record['content_image_url'], // 필수 아님 . a 중 1개 필요
        link: {
          webUrl: record['content_web_url'], // 필수 아님 . b 중 1개 필요
          mobileWebUrl: record['content_mobile_web_url'], // 필수 아님 . b 중 1개 필요
        },
      },
      itemContent: {
        // 필수 아님
        profileText: record['content_title'],
        profileImageUrl: record['content_image_url'],
        titleImageText: record['content_title'],
        titleImageUrl: record['content_image_url'],
        titleImageCategory: record['content_description'],
        items: [
          {
            item: record['content_title'],
            itemOp: '20000',
          },
          {
            item: record['content_title'],
            itemOp: '20000',
          },
          {
            item: record['content_title'],
            itemOp: '20000',
          },
        ],
        sum: '20000',
        sumOp: '20000',
      },
      social: {
        // 필수 아님 , 이 중 3개만 사용 ( 우선순위는 위부터 아래 순 )
        likeCount: 999,
        commentCount: 999,
        sharedCount: 999,
        viewCount: 999,
        subscriberCount: 999,
      },
      button_title: 'buttonTitle', // 버튼 이름 변경
      buttons: [
        // 버튼이 여러개인 경우 ( 최대 2개 )
        {
          title: 'buttonTitle1',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
        {
          title: 'buttonTitle2',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
      ],
    };
  }

  if (objectType === 'text') {
    // 필수와 필수 아닌 것 비교
    sendData = {
      objectType,
      text: record['content'],
      link: {
        mobileWebUrl: record['content_web_url'],
        webUrl: record['content_mobile_web_url'],
      },
      buttonTitle: record['button_title'], // 버튼 이름 변경
      buttons: [
        // 버튼이 여러개인 경우 ( 최대 2개 )
        {
          title: record['buttons_title1'],
          link: {
            webUrl: record['buttons_web_url1'],
            mobileWebUrl: record['buttons_mobile_web_url1'],
          },
        },
        {
          title: record['buttons_title2'],
          link: {
            webUrl: record['buttons_web_url2'],
            mobileWebUrl: record['buttons_mobile_web_url2'],
          },
        },
      ],
    };
  }

  if (objectType === 'list') {
    sendData = {
      objectType,
      headerTitle: record['header_title'],
      headerLink: {
        webUrl: record['header_web_url'],
        mobileWebUrl: record['header_mobile_web_url'],
      },
      contents: [
        {
          title: record['content_title1'],
          description: record['content_description1'],
          imageUrl: record['content_image_url1'],
          link: {
            webUrl: record['content_web_url1'],
            mobileWebUrl: record['content_mobile_web_url1'],
          },
        },
        {
          title: record['content_title2'],
          description: record['content_description2'],
          imageUrl: record['content_image_url2'],
          link: {
            webUrl: record['content_web_url2'],
            mobileWebUrl: record['content_mobile_web_url2'],
          },
        },
        {
          title: record['content_title3'],
          description: record['content_description3'],
          imageUrl: record['content_image_url3'],
          link: {
            webUrl: record['content_web_url3'],
            mobileWebUrl: record['content_mobile_web_url3'],
          },
        },
      ],
      button_title: 'buttonTitle', // 버튼 이름 변경
      buttons: [
        // 버튼이 여러개인 경우 ( 최대 2개 )
        {
          title: 'buttonTitle1',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
        {
          title: 'buttonTitle2',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
      ],
    };
  }

  if (objectType === 'location') {
    sendData = {
      objectType,
      address: record['address'],
      addressTitle: 'addressTitle', // 필수 아님 , 지도 뷰 타이틀
      content: {
        title: record['content_title'],
        description: record['content_description'],
        imageUrl: record['content_image_url'],
        link: {
          webUrl: record['content_web_url'],
          mobileWebUrl: record['content_mobile_web_url'],
        },
      },
      social: {
        // 필수 아님 , 이 중 3개만 사용 ( 우선순위는 위부터 아래 순 )
        likeCount: 999,
        commentCount: 999,
        sharedCount: 999,
        viewCount: 999,
        subscriberCount: 999,
      },
      button_title: 'buttonTitle', // 버튼 이름 변경
      buttons: [
        // 버튼이 여러개인 경우 ( 최대 2개 )
        {
          title: 'buttonTitle1',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
        {
          title: 'buttonTitle2',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
      ],
    };
  }

  if (objectType === 'commerce') {
    sendData = {
      objectType,
      content: {
        title: record['content_title'],
        description: record['content_description'],
        imageUrl: record['content_image_url'],
        link: {
          webUrl: record['content_web_url'],
          mobileWebUrl: record['content_mobile_web_url'],
        },
      },
      commerce: {
        productName: record['product_name'], // 필수 아님
        regularPrice: record['regular_price'], // 필수
        discountPrice: 'discountPrice', // 필수 아님
        discountRate: 'discountRate', // 필수 아님
        fixedDiscountPrice: 'fixedDiscountPrice', // 필수 아님
        currency_unit: 'currency_unit', // 필수 아님
        currencyUnitPosition: 1, // 필수 아님
      },
      button_title: 'buttonTitle', // 버튼 이름 변경
      buttons: [
        // 버튼이 여러개인 경우 ( 최대 2개 )
        {
          title: 'buttonTitle1',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
        {
          title: 'buttonTitle2',
          link: {
            webUrl: record['content_web_url'],
            mobileWebUrl: record['content_mobile_web_url'],
          },
        },
      ],
    };
  }

  // todo : calendar id 해결해야 함.
  if (objectType === 'calendar') {
    sendData = {
      objectType,
      idType: record['IdType'],
      id: record['id'],
      content: {
        title: record['content_title'],
        description: record['content_description'],
        imageUrl: record['content_image_url'],
        link: {
          webUrl: record['content_web_url'],
          mobileWebUrl: record['content_mobile_web_url'],
        },
      },
    };
  }

  return sendData;
};
