import Wrapper from '../Wrapper';
import styles from './Feed.module.scss';
import { ExcelRecord } from '@utils/excelUtil';

const Feed = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const imageUrl = record['content_image_url'] as string;
  const title = record['content_title'] as string;
  const description = record['content_description'] as string;

  return (
    <Wrapper>
      <div className={styles.image}>
        {imageUrl ? <img src={imageUrl}></img> : '이미지가 없습니다.'}
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{title ?? 'title이 없습니다.'}</div>
        {/* itemContent 추가해야함 */}
        <div className={styles.description}>{description ?? 'description이 없습니다.'}</div>
        {/* social 추가해야함 */}
        <div className={styles.button}>자세히 보기</div>
      </div>
    </Wrapper>
  );
};

export default Feed;
