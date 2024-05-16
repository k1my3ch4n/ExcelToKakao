import styles from './Location.module.scss';
import { ExcelRecord } from '@utils/excelUtil';

const Location = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const imageUrl = record['content_image_url'] as string;
  const title = record['content_title'] as string;
  const description = record['content_description'] as string;

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.buttons}>
          <div className={styles.button}>자세히 보기</div>
          <div className={styles.button}>위치 보기</div>
        </div>
      </div>
    </div>
  );
};

export default Location;
