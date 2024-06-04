import styles from './Text.module.scss';
import ContentButtons from '../ContentButtons';
import { ITextData } from '@interface/excel';

const Text = ({ sendData }: { sendData: ITextData }) => {
  const { text, link, buttonTitle, buttons } = sendData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{text ?? 'text가 없습니다.'}</div>
      <ContentButtons buttonTitle={buttonTitle} link={link} buttons={buttons} />
    </div>
  );
};

export default Text;
