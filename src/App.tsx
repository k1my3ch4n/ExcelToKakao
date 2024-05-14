import { useState } from 'react';
import styles from './app.module.scss';
import { MessageType, ExcelRecord, excelFileToRecords, recordsToSendData } from '@utils/excelUtil';

import Feed from '@components/Feed';
import Text from '@components/Text';
import { Close, Excel, Hamburger } from '@images/index';

const kakao = (window as any).Kakao;

const App = () => {
  const [file, setFile] = useState<File | null>(null);

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
    e.target.value = '';

    if (!file) {
      return;
    }

    const record = await excelFileToRecords(file);
    const objectType = record['objectType'] as MessageType;

    const sendData = recordsToSendData({ objectType, record });

    setObjectType(objectType);
    setSendData(sendData);
    setRecord(record);

    setFile(file);
  };

  const handleResetFile = () => {
    setObjectType(null);
    setSendData(null);
    setRecord(null);
    setFile(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>
        <div className={styles.lhs}>
          <div className={styles.logo}>
            <Excel />
          </div>
          <div className={styles.title}>ETK ( Excel To Kakao )</div>
        </div>

        <div className={styles.rhs}>
          <button>
            <Hamburger />
          </button>
        </div>
      </div>

      {record && (
        <div className={styles.content}>
          {objectType === 'feed' && <Feed record={record} />}
          {objectType === 'text' && <Text />}
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.label}>{file ? file.name : '파일을 선택해 주세요'}</div>
        <input id="file" type="file" onChange={handleFileChange} accept=".xlsx, .xls, .csv" />

        {file ? (
          <>
            <button onClick={handleResetFile}>
              <Close />
            </button>
            <button onClick={handleClick}>전송</button>
          </>
        ) : (
          <label htmlFor="file">파일 선택</label>
        )}
      </div>
    </div>
  );
};

export default App;
