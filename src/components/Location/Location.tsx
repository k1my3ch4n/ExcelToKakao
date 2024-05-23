import ContentButtons from '../ContentButtons';
import styles from './Location.module.scss';
import { ExcelRecord, parsingButtonUtil } from '@utils/excelUtil';

const Location = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const imageUrl = record['content_image_url'];
  const title = record['content_title'];
  const description = record['content_description'];

  const buttons = parsingButtonUtil(record);

  // todo : 버튼이 기본으로 2개인 경우임 . 수정 필요

  return (
    <>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{title ?? 'title 이 없습니다.'}</div>
        <div className={styles.description}>{description ?? 'description이 없습니다.'}</div>

        <ContentButtons buttons={buttons} />
      </div>
    </>
  );
};

export default Location;
