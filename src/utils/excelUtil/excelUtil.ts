import { read, Range, Sheet, utils } from 'xlsx';

export type ExcelRecord = Record<string, string | number | null>;
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
      objectType,
      content: {
        title: record['content_title'],
        description: record['content_description'],
        imageUrl: record['content_image_url'],
        link: {
          mobileWebUrl: record['content_web_url'],
          webUrl: record['content_mobile_web_url'],
        },
      },
    };
  }

  if (objectType === 'text') {
    sendData = {
      objectType,
      text: record['content'],
      link: {
        mobileWebUrl: record['content_web_url'],
        webUrl: record['content_mobile_web_url'],
      },
    };
  }

  if (objectType === 'list') {
    sendData = {
      objectType,
      headerTitle: record['header_title'],
      headerLink: {
        mobileWebUrl: record['header_web_url'],
        webUrl: record['header_mobile_web_url'],
      },
      contents: [
        {
          title: record['content_title1'],
          description: record['content_description1'],
          imageUrl: record['content_image_url1'],
          link: {
            mobileWebUrl: record['content_web_url1'],
            webUrl: record['content_mobile_web_url1'],
          },
        },
        {
          title: record['content_title2'],
          description: record['content_description2'],
          imageUrl: record['content_image_url2'],
          link: {
            mobileWebUrl: record['content_web_url2'],
            webUrl: record['content_mobile_web_url2'],
          },
        },
      ],
    };
  }

  if (objectType === 'location') {
    sendData = {
      objectType,
      address: record['address'],
      content: {
        title: record['content_title'],
        description: record['content_description'],
        imageUrl: record['content_image_url'],
        link: {
          mobileWebUrl: record['content_web_url'],
          webUrl: record['content_mobile_web_url'],
        },
      },
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
          mobileWebUrl: record['content_web_url'],
          webUrl: record['content_mobile_web_url'],
        },
      },
      commerce: {
        productName: record['product_name'],
        regularPrice: record['regular_price'],
      },
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
          mobileWebUrl: record['content_web_url'],
          webUrl: record['content_mobile_web_url'],
        },
      },
    };
  }

  return sendData;
};
