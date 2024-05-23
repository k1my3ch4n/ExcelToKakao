import { ExcelRecord, parsingTextUtil } from '@utils/excelUtil';
import styles from './Text.module.scss';
import ContentButtons from '../ContentButtons';

const Text = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const { text, buttons } = parsingTextUtil(record);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{text ?? 'text가 없습니다.'}</div>
      <ContentButtons buttons={buttons} />
    </div>
  );
};

export default Text;
