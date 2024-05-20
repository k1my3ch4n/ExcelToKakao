import styles from './Wrapper.module.scss';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
