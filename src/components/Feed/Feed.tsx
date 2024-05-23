import ContentButtons from '../ContentButtons';
import styles from './Feed.module.scss';
import { ExcelRecord, parsingButtonUtil } from '@utils/excelUtil';

const Feed = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const imageUrl = record['content_image_url'] as string;
  const title = record['content_title'] as string;
  const description = record['content_description'] as string;

  const buttons = parsingButtonUtil(record);

  return (
    <>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{title ?? 'title이 없습니다.'}</div>
        {/* itemContent 추가해야함 */}
        <div className={styles.description}>{description ?? 'description이 없습니다.'}</div>
        {/* social 추가해야함 */}
        <ContentButtons buttons={buttons} />
      </div>
    </>
  );
};

export default Feed;
