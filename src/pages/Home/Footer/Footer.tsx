import Button from '@components/Button';
import styles from './Footer.module.scss';
import { Close } from '@images/index';
import { RefObject } from 'react';
import { FileChangeEvent } from '../Home';

interface FooterParams {
  file: File | null;
  fileRef: RefObject<HTMLInputElement>;
  onFileChange: (e: FileChangeEvent) => void;
  onFileReset: () => void;
  onSendMessage: () => void;
  onFileUpdate: () => void;
  hasMissingData: boolean;
}

const Footer = ({
  file,
  fileRef,
  hasMissingData,
  onFileChange,
  onFileReset,
  onSendMessage,
  onFileUpdate,
}: FooterParams) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{file ? file.name : '파일을 선택해 주세요'}</div>
      <input
        id="file"
        type="file"
        ref={fileRef}
        onChange={onFileChange}
        accept=".xlsx, .xls, .csv"
      />

      {file ? (
        <div className={styles.buttons}>
          <Button color="none" onClick={onFileReset} hasIcon>
            <Close />
          </Button>
          <Button disabled={hasMissingData} onClick={onSendMessage}>
            전송
          </Button>
        </div>
      ) : (
        <Button onClick={onFileUpdate}>파일 선택</Button>
      )}
    </div>
  );
};

export default Footer;
