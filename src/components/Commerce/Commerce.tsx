import styles from './Commerce.module.scss';
import { ExcelRecord } from '@utils/excelUtil';

const Commerce = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const imageUrl = record['content_image_url'] as string;
  const description = record['content_description'] as string;
  const productName = record['product_name'] as string;
  const regularPrice = record['regular_price'] as string;

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{productName}</div>
        <div className={styles.price}>{regularPrice}원</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.button}>자세히 보기</div>
      </div>
    </div>
  );
};

export default Commerce;
