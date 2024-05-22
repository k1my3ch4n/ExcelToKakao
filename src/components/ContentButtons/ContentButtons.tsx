import Button from '../Button';
import styles from './ContentButtons.module.scss';

const ContentButtons = ({
  hasManyButtons,
  buttonTitle1,
  buttonTitle2,
  singleButtonTitle,
}: {
  hasManyButtons: boolean;
  buttonTitle1?: string | null;
  buttonTitle2?: string | null;
  singleButtonTitle?: string | null;
}) => {
  if (hasManyButtons) {
    return (
      <div className={styles.buttons}>
        <Button className={styles.button} color="none">
          {buttonTitle1}
        </Button>
        <Button className={styles.button} color="none">
          {buttonTitle2}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button className={styles.button} color="none">
        {buttonTitle1 ?? buttonTitle2 ?? singleButtonTitle ?? '자세히 보기'}
      </Button>
    </div>
  );
};

export default ContentButtons;
