import styles from './Text.module.scss';
import ContentButtons from '../ContentButtons';
import { ITextData } from '@interface/excel';

const Text = ({ sendData }: { sendData: ITextData }) => {
  const { text, link, buttonTitle, buttons } = sendData;

  const hasButtons = !!buttons && buttons?.length > 0;

  const normalButton = {
    title: buttonTitle ?? '자세히 보기',
    link,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{text ?? 'text가 없습니다.'}</div>
      <ContentButtons buttons={hasButtons ? buttons : [normalButton]} />
    </div>
  );
};

export default Text;
