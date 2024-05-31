import styles from './MissingData.module.scss';

const data = {
  text: '텍스트가 필수값인데 존재하지 않습니다.',
};

const MissingData = ({ missingData }: { missingData: Set<string> }) => {
  if (!missingData) {
    return;
  }

  return <div className={styles.wrapper}>{[...missingData].map((value) => value)}</div>;
};

export default MissingData;
