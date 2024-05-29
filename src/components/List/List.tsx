import { IContentData, IListData } from '@interface/excel';
import ContentButtons from '../ContentButtons';
import ItemList from '../ItemList';
import styles from './List.module.scss';

const List = ({ sendData }: { sendData: IListData }) => {
  const { headerTitle, headerLink, contents, buttonTitle, buttons } = sendData;

  const hasButtons = !!buttons && buttons?.length > 0;

  const normalButton = {
    title: buttonTitle ?? '자세히 보기',
    link: headerLink,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{headerTitle ?? '메인 타이틀이 없습니다.'}</div>
      <div className={styles.line} />
      {contents.map(({ title, description, imageUrl }: IContentData) => (
        <ItemList title={title} description={description} imageSrc={imageUrl} />
      ))}
      <div className={styles.line} />
      <ContentButtons buttons={hasButtons ? buttons : [normalButton]} />
    </div>
  );
};

export default List;
