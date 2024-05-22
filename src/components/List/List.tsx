import ContentButtons from '../ContentButtons';
import ItemList from '../ItemList';
import styles from './List.module.scss';
import { ExcelRecord } from '@utils/excelUtil';

const List = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const headerTitle = record['header_title'] as string;
  const contentTitle1 = record['content_title1'];
  const contentDescription1 = record['content_description1'];
  const contentImage1 = record['content_image_url1'];

  const contentTitle2 = record['content_title2'];
  const contentDescription2 = record['content_description2'];
  const contentImage2 = record['content_image_url2'];

  const contentTitle3 = record['content_title3'];
  const contentDescription3 = record['content_description3'];
  const contentImage3 = record['content_image_url3'];

  const singleButtonTitle = record['button_title'];
  const buttonTitle1 = record['buttons_title1'];
  const buttonTitle2 = record['buttons_title2'];

  const hasButtonTitle1 = !!buttonTitle1;
  const hasButtonTitle2 = !!buttonTitle2;

  // todo : link 설정 , 필수값과 아닌값 분기 설정

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{headerTitle ?? '메인 타이틀이 없습니다.'}</div>
      <ItemList title={contentTitle1} description={contentDescription1} imageSrc={contentImage1} />
      <ItemList title={contentTitle2} description={contentDescription2} imageSrc={contentImage2} />

      {/* 3번째 데이터는 선택 */}
      {(contentTitle3 || contentDescription3 || contentImage3) && (
        <ItemList
          title={contentTitle3}
          description={contentDescription3}
          imageSrc={contentImage3}
        />
      )}

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
