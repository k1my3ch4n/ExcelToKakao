import Button from '@components/Button';
import styles from './Header.module.scss';
import { Excel, Hamburger } from '@images/index';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.lhs}>
        <div className={styles.logo}>
          <Excel />
        </div>
        <div className={styles.title}>ETK ( Excel To Kakao )</div>
      </div>
      <Button size="m" color="none" hasIcon>
        <Hamburger />
      </Button>
    </div>
  );
};

export default Header;
