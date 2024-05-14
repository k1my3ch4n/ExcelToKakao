import styles from './List.module.scss';
import { ExcelRecord } from '@utils/excelUtil';

const List = ({ record }: { record: ExcelRecord }) => {
  const headerTitle = record['header_title'] as string;
  const contentTitle1 = record['content_title1'] as string;
  const contentDescription1 = record['content_description1'] as string;
  const contentImage1 = record['content_image_url1'] as string;

  const contentTitle2 = record['content_title2'] as string;
  const contentDescription2 = record['content_description2'] as string;
  const contentImage2 = record['content_image_url2'] as string;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{headerTitle}</div>
      <div className={styles.list}>
        <div className={styles.content}>
          <div>{contentTitle1}</div>
          <div>{contentDescription1}</div>
        </div>
        <div className={styles.image}>
          <img src={contentImage1} />
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.content}>
          <div>{contentTitle2}</div>
          <div>{contentDescription2}</div>
        </div>
        <div className={styles.image}>
          <img src={contentImage2} />
        </div>
      </div>
      <div className={styles.button}>자세히 보기</div>
    </div>
  );
};

export default List;
