import { useRef } from 'react';
import styles from './Home.module.scss';

import Header from './Header';
import Footer from './Footer';
import Feed from '@components/Feed';
import Text from '@components/Text';
import List from '@components/List';
import Wrapper from '@components/Wrapper';
import Commerce from '@components/Commerce';
import Location from '@components/Location';
import MissingData from '@components/MissingData';
import useExcelFile from '@hooks/useExcelFile';
import { ICommerceData, IFeedData, IListData, ILocationData, ITextData } from '@interface/excel';

const Home = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    file,
    missingData,
    objectType,
    sendData,
    handleSendMessage,
    handleFileChange,
    handleFileReset,
  } = useExcelFile();

  const handleFileUpdate = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
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
