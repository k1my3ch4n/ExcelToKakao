import { ExcelRecord } from '@utils/excelUtil';
import styles from './Text.module.scss';

const Text = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const title = record['content'] as string;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title ?? 'title이 없습니다.'}</div>
      <div className={styles.button}>자세히 보기</div>
    </div>
  );
};

export default Text;
