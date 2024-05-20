import styles from './Content.module.scss';

import Feed from '@components/Feed';
import Text from '@components/Text';
import List from '@components/List';
import Commerce from '@components/Commerce';
import Location from '@components/Location';
import { ExcelRecord, MessageType } from '@utils/excelUtil';

const Content = ({
  objectType,
  record,
}: {
  objectType: MessageType | null;
  record: ExcelRecord | null;
}) => {
  if (!record) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {objectType === 'feed' && <Feed record={record} />}
      {objectType === 'text' && <Text record={record} />}
      {objectType === 'list' && <List record={record} />}
      {objectType === 'commerce' && <Commerce record={record} />}
      {objectType === 'location' && <Location record={record} />}
    </div>
  );
};

export default Content;
