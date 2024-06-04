import { MissingDataType } from '@interface/excel';
import styles from './MissingData.module.scss';

const MISSING_DATA_MESSAGE: Record<MissingDataType, string> = {
  objectType: 'objectType 이 없거나 유효하지 않습니다.',
  text: 'content_text 값이 존재하지 않습니다.',
  link: '"content_web_url" 또는 "content_mobile_web_url" 중 1개는 필수값 입니다.',
  content:
    '"content_title", "content_description" 또는 "content_image_url" 값 중 1개는 존재해야 합니다.',
  regularPrice: 'regular_price 값이 존재하지 않거나 , 숫자가 아닌 값이 입력되었습니다.',
  address: 'address 값이 존재하지 않습니다.',
  headerTitle: 'header_title 값이 존재하지 않습니다.',
  contents: 'contents 의 유효한 값이 2개 이상이어야 합니다.',
};

const MissingData = ({ missingData }: { missingData: Set<MissingDataType> }) => {
  if (!missingData) {
    return;
  }

  return (
    <div className={styles.wrapper}>
      {[...missingData].map((value, index) => {
        return (
          <p key={index} className={styles.message}>
            {index + 1} : {MISSING_DATA_MESSAGE[value]}
          </p>
        );
      })}
    </div>
  );
};

export default MissingData;
