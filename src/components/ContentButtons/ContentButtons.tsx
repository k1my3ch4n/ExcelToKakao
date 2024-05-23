import Button from '../Button';
import styles from './ContentButtons.module.scss';

const ContentButtons = ({
  buttons,
}: {
  buttons: {
    buttonTitle: string;
    buttonLink: string;
  }[];
}) => {
  return (
    <div className={styles.buttons}>
      {buttons.map((button, index) => {
        const { buttonTitle, buttonLink } = button;

        const handleClick = () => {
          window.open(buttonLink);
        };

        return (
          <Button className={styles.button} onClick={handleClick} key={index} color="none">
            {buttonTitle}
          </Button>
        );
      })}
    </div>
  );
};

export default ContentButtons;
