import { IFeedData } from '@interface/excel';
import ContentButtons from '../NewContentButtons';
import styles from './Feed.module.scss';
import ItemContents from './ItemContents';

const Feed = ({ sendData }: { sendData: IFeedData }) => {
  const {
    content: { imageUrl, title, description, link },
    itemContent,
    buttonTitle,
    buttons,
  } = sendData;

  const hasButtons = !!buttons && buttons?.length > 0;

  const normalButton = {
    title: buttonTitle ?? '자세히 보기',
    link,
  };

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
        <ContentButtons buttons={hasButtons ? buttons : [normalButton]} />
      </div>
    </>
  );
};

export default Feed;
