import { useState } from 'react';
import styles from './app.module.scss';
import { MessageType, ExcelRecord, excelFileToRecords, recordsToSendData } from '@utils/excelUtil';

import Feed from './Feed';
import Text from './Text';

const kakao = (window as any).Kakao;

const App = () => {
  // const [file, setFile] = useState<File | null>(null);

  const [record, setRecord] = useState<ExcelRecord | null>(null);
  const [objectType, setObjectType] = useState<MessageType | null>(null);
  const [sendData, setSendData] = useState<any>(null);

  const handleClick = async () => {
    if (!sendData) {
      return;
    }

    kakao.Share.sendDefault(sendData);
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
    const objectType = record['objectType'] as MessageType;

    const sendData = recordsToSendData({ objectType, record });

    setObjectType(objectType);
    setSendData(sendData);
    setRecord(record);

    // setFile(file);
  };

  return (
    <div className={styles.wrapper}>
      <span>엑셀 파일 첨부</span>
      <input id="file" type="file" onChange={handleFileChange} accept=".xlsx, .xls, .csv" />
      {record && (
        <div className={styles.content}>
          {objectType === 'feed' && <Feed record={record} />}
          {objectType === 'text' && <Text />}
        </div>
      )}

      <button onClick={handleClick}>메세지 보내기</button>
    </div>
  );
};

export default App;
