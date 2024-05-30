import { IContentData, IListData } from '@interface/excel';
import ContentButtons from '../ContentButtons';
import ItemList from '../ItemList';
import styles from './List.module.scss';

const List = ({ sendData }: { sendData: IListData }) => {
  const { headerTitle, headerLink, contents, buttonTitle, buttons } = sendData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{headerTitle ?? '메인 타이틀이 없습니다.'}</div>
      <div className={styles.line} />
      {contents.map(({ title, description, imageUrl }: IContentData, index) => (
        <ItemList key={index} title={title} description={description} imageSrc={imageUrl} />
      ))}
      <div className={styles.line} />
      <ContentButtons buttonTitle={buttonTitle} link={headerLink} buttons={buttons} />
    </div>
  );
};

export default List;
