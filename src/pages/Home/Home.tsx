import { useRef, useState } from 'react';
import styles from './Home.module.scss';
import { ExcelRecord, excelFileToRecords, recordsToSendData } from '@utils/excelUtil';

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
  const [missingData, setMissingData] = useState<Set<string>>();
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

    const { objectType, sendData, missingData } = recordsToSendData(record);

    setObjectType(objectType);
    setMissingData(missingData);
    setSendData(sendData);
    setRecord(record);
    setFile(file);
  };

  const handleFileReset = () => {
    setObjectType(null);
    setSendData(null);
    setRecord(null);
    setFile(null);
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      {record && (
        <Wrapper>
          {objectType === 'list' && <List record={record} />}
          {objectType === 'commerce' && <Commerce record={record} />}
        </Wrapper>
      )}

      {sendData && (
        <Wrapper>
          {objectType === 'feed' && <Feed sendData={sendData} />}
          {objectType === 'text' && <Text sendData={sendData} />}
          {objectType === 'location' && <Location sendData={sendData} />}
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
