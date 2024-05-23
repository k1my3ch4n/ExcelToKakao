import ContentButtons from '../ContentButtons';
import styles from './Commerce.module.scss';
import { ExcelRecord, parsingButtonUtil } from '@utils/excelUtil';

const Commerce = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const imageUrl = record['content_image_url'] as string;
  const description = record['content_description'] as string;
  const productName = record['product_name'] as string;
  const regularPrice = record['regular_price'] as string;

  const buttons = parsingButtonUtil(record);

  return (
    <>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{productName}</div>
        <div className={styles.price}>{Number(regularPrice).toLocaleString()}원</div>
        <div className={styles.description}>{description}</div>

        <ContentButtons buttons={buttons} />
      </div>
    </>
  );
};

export default Commerce;
