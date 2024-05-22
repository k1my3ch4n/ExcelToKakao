import styles from './ItemList.module.scss';

const ItemList = ({
  title = 'title 이 존재하지 않습니다.',
  description = 'description 이 존재하지 않습니다.',
  imageSrc,
}: {
  title: string | null;
  description: string | null;
  imageSrc: string | null;
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {imageSrc && (
        <div className={styles.image}>
          <img src={imageSrc} />
        </div>
      )}
    </div>
  );
};

export default ItemList;
