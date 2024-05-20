import { useRef, useState } from 'react';
import styles from './Home.module.scss';
import { MessageType, ExcelRecord, excelFileToRecords, recordsToSendData } from '@utils/excelUtil';

import Feed from '@components/Feed';
import Text from '@components/Text';
import { Close, Excel, Hamburger } from '@images/index';
import List from '@components/List';
import Commerce from '@components/Commerce';
import Location from '@components/Location';
import Button from '@components/Button';
import Header from './Header';

const kakao = (window as any).Kakao;

const Home = () => {
  const [file, setFile] = useState<File | null>(null);

  const [record, setRecord] = useState<ExcelRecord | null>(null);
  const [objectType, setObjectType] = useState<MessageType | null>(null);
  const [sendData, setSendData] = useState<any>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (!sendData) {
      return;
    }

    kakao.Share.sendDefault(sendData);
  };

  const handleFileUpdateClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
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
      <Header />

      {record && (
        <div className={styles.content}>
          {objectType === 'feed' && <Feed record={record} />}
          {objectType === 'text' && <Text record={record} />}
          {objectType === 'list' && <List record={record} />}
          {objectType === 'commerce' && <Commerce record={record} />}
          {objectType === 'location' && <Location record={record} />}
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.label}>{file ? file.name : '파일을 선택해 주세요'}</div>
        <input
          id="file"
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          accept=".xlsx, .xls, .csv"
        />

        {file ? (
          <div className={styles.buttons}>
            <Button color="none" onClick={handleResetFile} hasIcon>
              <Close />
            </Button>
            <Button onClick={handleClick}>전송</Button>
          </div>
        ) : (
          <Button onClick={handleFileUpdateClick}>파일 선택</Button>
        )}
      </div>
    </div>
  );
};

export default Home;
