import { useRef, useState } from 'react';
import styles from './Home.module.scss';
import {
  ExcelRecord,
  excelFileToRecords,
  recordsToText,
  recordsToLocation,
  recordsToFeed,
  recordsToList,
  recordsToCommerce,
} from '@utils/excelUtil';

import Header from './Header';
import Footer from './Footer';
import Wrapper from '@components/Wrapper';
import Feed from '@components/Feed';
import Text from '@components/Text';
import List from '@components/List';
import Commerce from '@components/Commerce';
import Location from '@components/Location';
import { MessageType } from '@interface/excel';

export type FileChangeEvent = React.ChangeEvent<HTMLInputElement> & {
  target: EventTarget & { files: FileList };
};

const kakao = (window as any).Kakao;

const Home = () => {
  const [file, setFile] = useState<File | null>(null);

  const [record, setRecord] = useState<ExcelRecord | null>(null);
  const [objectType, setObjectType] = useState<MessageType | null>(null);
  const [sendData, setSendData] = useState<any>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!sendData) {
      return;
    }

    kakao.Share.sendDefault(sendData);
  };

  const handleFileUpdate = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = async (e: FileChangeEvent) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) {
      return;
    }

    const record = await excelFileToRecords(file);
    // todo : objectType 이 없는 경우 추가 예정
    const objectType = record['objectType'] as MessageType;

    // todo : sendData 를 만드는 util을 합친 util이 필요
    if (objectType === 'feed') {
      const { sendData } = recordsToFeed(record);

      setSendData(sendData);
    }

    if (objectType === 'text') {
      const { sendData } = recordsToText(record);

      setSendData(sendData);
    }

    if (objectType === 'location') {
      const { sendData } = recordsToLocation(record);

      setSendData(sendData);
    }

    if (objectType === 'list') {
      const { sendData } = recordsToList(record);

      setSendData(sendData);
    }

    if (objectType === 'commerce') {
      const { sendData } = recordsToCommerce(record);

      setSendData(sendData);
    }

    setObjectType(objectType);
    setRecord(record);

    setFile(file);
  };

  const handleFileReset = () => {
    setObjectType(null);
    setSendData(null);
    setRecord(null);
    setFile(null);
  };

  console.log('sendData : ', sendData);

  return (
    <div className={styles.wrapper}>
      <Header />

      {record && (
        <Wrapper>
          {objectType === 'feed' && <Feed record={record} />}
          {objectType === 'text' && <Text record={record} />}
          {objectType === 'list' && <List record={record} />}
          {objectType === 'commerce' && <Commerce record={record} />}
          {objectType === 'location' && <Location record={record} />}
        </Wrapper>
      )}

      <Footer
        file={file}
        fileRef={fileRef}
        onFileChange={handleFileChange}
        onFileReset={handleFileReset}
        onSendMessage={handleSendMessage}
        onFileUpdate={handleFileUpdate}
      />
    </div>
  );
};

export default Home;
