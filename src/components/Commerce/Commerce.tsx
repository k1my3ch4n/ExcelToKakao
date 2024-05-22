import ContentButtons from '../ContentButtons';
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

  const singleButtonTitle = record['button_title'];
  const buttonTitle1 = record['buttons_title1'];
  const buttonTitle2 = record['buttons_title2'];

  const hasButtonTitle1 = !!buttonTitle1;
  const hasButtonTitle2 = !!buttonTitle2;

  return (
    <>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{productName}</div>
        <div className={styles.price}>{Number(regularPrice).toLocaleString()}원</div>
        <div className={styles.description}>{description}</div>

        <ContentButtons
          hasManyButtons={hasButtonTitle1 && hasButtonTitle2}
          buttonTitle1={buttonTitle1}
          buttonTitle2={buttonTitle2}
          singleButtonTitle={singleButtonTitle}
        />
      </div>
    </>
  );
};

export default Commerce;
