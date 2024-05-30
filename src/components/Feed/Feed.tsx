import { IFeedData } from '@interface/excel';
import ContentButtons from '../ContentButtons';
import styles from './Feed.module.scss';
import ItemContents from './ItemContents';

const Feed = ({ sendData }: { sendData: IFeedData }) => {
  const {
    content: { imageUrl, title, description, link },
    itemContent,
    buttonTitle,
    buttons,
  } = sendData;

  return (
    <>
      {imageUrl && (
        <div className={styles.image}>
          <img src={imageUrl}></img>
        </div>
      )}
      <div className={styles.detail}>
        <ItemContents itemContent={itemContent} />
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
        {/* social 추가해야함 */}
        <ContentButtons buttonTitle={buttonTitle} link={link} buttons={buttons} />
      </div>
    </>
  );
};

export default Feed;
