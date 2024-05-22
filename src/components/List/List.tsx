import ContentButtons from '../ContentButtons';
import ItemList from '../ItemList';
import styles from './List.module.scss';
import { ExcelRecord } from '@utils/excelUtil';

const List = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const headerTitle = record['header_title'] as string;
  const contentTitle1 = record['content_title1'] as string;
  const contentDescription1 = record['content_description1'] as string;
  const contentImage1 = record['content_image_url1'] as string;

  const contentTitle2 = record['content_title2'] as string;
  const contentDescription2 = record['content_description2'] as string;
  const contentImage2 = record['content_image_url2'] as string;

  const singleButtonTitle = record['button_title'];
  const buttonTitle1 = record['buttons_title1'];
  const buttonTitle2 = record['buttons_title2'];

  const hasButtonTitle1 = !!buttonTitle1;
  const hasButtonTitle2 = !!buttonTitle2;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{headerTitle ?? '메인 타이틀이 없습니다.'}</div>
      <ItemList title={contentTitle1} description={contentDescription1} imageSrc={contentImage1} />
      <ItemList title={contentTitle2} description={contentDescription2} imageSrc={contentImage2} />
      <ContentButtons
        hasManyButtons={hasButtonTitle1 && hasButtonTitle2}
        buttonTitle1={buttonTitle1}
        buttonTitle2={buttonTitle2}
        singleButtonTitle={singleButtonTitle}
      />
    </div>
  );
};

export default List;
