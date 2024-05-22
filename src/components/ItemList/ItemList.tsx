import styles from './ItemList.module.scss';

const ItemList = ({
  title = '',
  description = '',
  imageSrc = '',
}: {
  title?: string;
  description?: string;
  imageSrc?: string;
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div>{title}</div>
        <div>{description}</div>
      </div>
      <div className={styles.image}>
        <img src={imageSrc} />
      </div>
    </div>
  );
};

export default ItemList;
