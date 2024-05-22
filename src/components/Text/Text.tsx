import { ExcelRecord } from '@utils/excelUtil';
import styles from './Text.module.scss';
import ContentButtons from '../ContentButtons';

const Text = ({ record }: { record: ExcelRecord }) => {
  if (!record) {
    return null;
  }

  const title = record['content'];
  const singleButtonTitle = record['button_title'];
  const buttonTitle1 = record['buttons_title1'];
  const buttonTitle2 = record['buttons_title2'];

  const hasButtonTitle1 = !!buttonTitle1;
  const hasButtonTitle2 = !!buttonTitle2;

  // ! todo : 링크 설정 추가 예정

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title ?? 'title이 없습니다.'}</div>

      <ContentButtons
        hasManyButtons={hasButtonTitle1 && hasButtonTitle2}
        buttonTitle1={buttonTitle1}
        buttonTitle2={buttonTitle2}
        singleButtonTitle={singleButtonTitle}
      />
    </div>
  );
};

export default Text;
