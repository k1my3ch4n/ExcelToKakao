import { IButtonData } from '@interface/excel';
import Button from '../Button';
import styles from './ContentButtons.module.scss';

const ContentButtons = ({ buttons }: { buttons: IButtonData[] }) => {
  return (
    <div className={styles.buttons}>
      {buttons.map((button, index) => {
        const { title, link } = button;

        const buttonLink = link.webUrl ?? link.mobileWebUrl;

        const handleClick = () => {
          window.open(buttonLink);
        };

        return (
          <Button className={styles.button} onClick={handleClick} key={index} color="none">
            {title}
          </Button>
        );
      })}
    </div>
  );
};

export default ContentButtons;
