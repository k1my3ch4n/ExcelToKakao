import { useRef, useState } from 'react';
import styles from './Home.module.scss';
import { excelFileToRecords, recordsToSendData } from '@utils/excelUtil';

import Header from './Header';
import Footer from './Footer';
import Wrapper from '@components/Wrapper';
import Feed from '@components/Feed';
import Text from '@components/Text';
import List from '@components/List';
import Commerce from '@components/Commerce';
import Location from '@components/Location';
import {
  ICommerce,
  ICommerceData,
  IFeedData,
  IListData,
  ILocationData,
  ITextData,
  MessageType,
  MissingDataType,
} from '@interface/excel';
import MissingData from '@src/components/MissingData';

export type FileChangeEvent = React.ChangeEvent<HTMLInputElement> & {
  target: EventTarget & { files: FileList };
};

const kakao = (window as any).Kakao;

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [missingData, setMissingData] = useState<Set<MissingDataType>>();
  const [objectType, setObjectType] = useState<MessageType | null>(null);
  const [sendData, setSendData] = useState<
    ITextData | ILocationData | IFeedData | IListData | ICommerce | null
  >(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
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
    setFile(file);
  };

  const handleFileReset = () => {
    setMissingData(undefined);
    setSendData(null);
    setObjectType(null);
    setSendData(null);
    setFile(null);
  };

  const hasMissingData = !!missingData && missingData?.size > 0;

  return (
    <div className={styles.wrapper}>
      <Header />

      {sendData && (
        <Wrapper>
          {objectType === 'feed' && <Feed sendData={sendData as IFeedData} />}
          {objectType === 'text' && <Text sendData={sendData as ITextData} />}
          {objectType === 'location' && <Location sendData={sendData as ILocationData} />}
          {objectType === 'list' && <List sendData={sendData as IListData} />}
          {objectType === 'commerce' && <Commerce sendData={sendData as ICommerceData} />}
        </Wrapper>
      )}

      {hasMissingData && (
        <Wrapper>
          <MissingData missingData={missingData} />
        </Wrapper>
      )}

      <Footer
        file={file}
        fileRef={fileRef}
        hasMissingData={hasMissingData}
        onFileChange={handleFileChange}
        onFileReset={handleFileReset}
        onSendMessage={handleSendMessage}
        onFileUpdate={handleFileUpdate}
      />
    </div>
  );
};

export default Home;
