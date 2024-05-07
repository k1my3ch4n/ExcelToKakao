import { useState } from 'react';
import styles from './app.module.scss';
import { ExcelRecord, excelFileToRecords } from '@utils/excelUtil';

const kakao = (window as any).Kakao;

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [record, setRecord] = useState<ExcelRecord | null>(null);

  const handleClick = async () => {
    if (!record) {
      return;
    }

    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: record['content_title'],
        description: record['content_description'],
        imageUrl: record['content_image_url'],
        link: {
          mobileWebUrl: record['content_web_url'],
          webUrl: record['conten_mobile_web_url'],
        },
      },
    });
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> & {
      target: EventTarget & { files: FileList };
    },
  ) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const record = await excelFileToRecords(file);

    console.log(record['objectType']);

    setFile(file);
    setRecord(record);
  };

  console.log('record : ', record);

  return (
    <div className={styles.wrapper}>
      <span>엑셀 파일 첨부</span>
      <input id="file" type="file" onChange={handleFileChange} accept=".xlsx, .xls, .csv" />
      <button onClick={handleClick}>메세지 보내기</button>
    </div>
  );
};

export default App;
