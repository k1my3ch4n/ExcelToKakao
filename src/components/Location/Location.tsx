import ContentButtons from '../ContentButtons';
import styles from './Location.module.scss';
import { ExcelRecord } from '@utils/excelUtil';

const Location = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const imageUrl = record['content_image_url'];
  const title = record['content_title'];
  const description = record['content_description'];

  const singleButtonTitle = record['button_title'];
  const buttonTitle1 = record['buttons_title1'];
  const buttonTitle2 = record['buttons_title2'];

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{title ?? 'title 이 없습니다.'}</div>
        <div className={styles.description}>{description ?? 'description이 없습니다.'}</div>

        <ContentButtons
          hasManyButtons={true}
          buttonTitle1={buttonTitle1 ?? singleButtonTitle ?? '자세히 보기'}
          buttonTitle2={buttonTitle2 ?? '위치 보기'}
        />
      </div>
    </div>
  );
};

export default Location;
