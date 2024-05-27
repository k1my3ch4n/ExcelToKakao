import { IFeedData } from '@interface/excel';
import ContentButtons from '../NewContentButtons';
import styles from './Feed.module.scss';

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
        <div>
          {itemContent?.profileImageUrl && (
            <div>
              <img src={itemContent?.profileImageUrl}></img>
            </div>
          )}
          {itemContent?.profileText && (
            <div className={styles.title}>{itemContent?.profileText}</div>
          )}
        </div>
        <div>
          {itemContent?.titleImageText && (
            <div className={styles.title}>{itemContent?.titleImageText}</div>
          )}
          {itemContent?.titleImageCategory && (
            <div className={styles.title}>{itemContent?.titleImageCategory}</div>
          )}
          {itemContent?.titleImageUrl && (
            <div>
              <img src={itemContent?.titleImageUrl}></img>
            </div>
          )}
        </div>

        {/* items */}

        {/* sum */}

        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
        {/* social 추가해야함 */}
        <ContentButtons buttons={hasButtons ? buttons : [normalButton]} />
      </div>
    </>
  );
};

export default Feed;
