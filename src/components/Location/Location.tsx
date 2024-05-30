import { ILocationData } from '@interface/excel';
import ContentButtons from '../ContentButtons';
import styles from './Location.module.scss';

const Location = ({ sendData }: { sendData: ILocationData }) => {
  const {
    address,
    content: { title, description, imageUrl, link },
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
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
        <ContentButtons
          buttonTitle={buttonTitle}
          link={link}
          buttons={buttons}
          isLocation
          address={address}
        />
      </div>
    </>
  );
};

export default Location;
