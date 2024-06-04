import { useState } from 'react';
import { excelFileToRecords, recordsToSendData } from '@utils/excelUtil';
import {
  IFeedData,
  IListData,
  ITextData,
  ILocationData,
  ICommerceData,
  MessageType,
  MissingDataType,
} from '@interface/excel';

const kakao = (window as any).Kakao;

export type FileChangeEvent = React.ChangeEvent<HTMLInputElement> & {
  target: EventTarget & { files: FileList };
};

const useExcelFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [missingData, setMissingData] = useState<Set<MissingDataType>>();
  const [objectType, setObjectType] = useState<MessageType | null>(null);
  const [sendData, setSendData] = useState<
    ITextData | ILocationData | IFeedData | IListData | ICommerceData | null
  >(null);

  const handleSendMessage = () => {
    if (!sendData) {
      return;
    }

    kakao.Share.sendDefault(sendData);
  };

  const handleFileChange = async (e: FileChangeEvent) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) {
      return;
    }

    const record = await excelFileToRecords(file);

    const { objectType, sendData, missingData } = recordsToSendData(record);

    setObjectType(objectType);
    setMissingData(missingData);
    setSendData(sendData);
    setFile(file);
  };

  const handleFileReset = () => {
    setMissingData(undefined);
    setSendData(null);
    setObjectType(null);
    setSendData(null);
    setFile(null);
  };

  return {
    file,
    missingData,
    objectType,
    sendData,
    handleSendMessage,
    handleFileChange,
    handleFileReset,
  };
};

export default useExcelFile;
