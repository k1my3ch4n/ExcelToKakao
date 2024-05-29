import { ILocationData } from '@interface/excel';
import ContentButtons from '../ContentButtons';
import styles from './Location.module.scss';

const Location = ({ sendData }: { sendData: ILocationData }) => {
  const {
    content: { title, description, imageUrl, link },
    buttonTitle,
    buttons,
  } = sendData;

  // todo : button 기본값 수정 예정 . location 은 기본 2개이기 때문.
  const hasButtons = !!buttons && buttons?.length > 0;

  // todo : normalButton 은 내부로 갈 수 도 있을 것 같은데 ..
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
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
        <ContentButtons buttons={hasButtons ? buttons : [normalButton]} />
      </div>
    </>
  );
};

export default Location;
