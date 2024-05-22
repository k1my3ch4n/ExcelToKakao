import { ExcelRecord, parsingButtonUtil } from '@utils/excelUtil';
import styles from './Text.module.scss';
import ContentButtons from '../ContentButtons';

const Text = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const title = record['content'];

  const buttons = parsingButtonUtil(record);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title ?? 'title이 없습니다.'}</div>

      <ContentButtons buttons={buttons} />
    </div>
  );
};

export default Text;
