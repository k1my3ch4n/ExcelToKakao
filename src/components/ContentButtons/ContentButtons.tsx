import { IButtonData, ILinkData } from '@interface/excel';
import Button from '../Button';
import styles from './ContentButtons.module.scss';

const ContentButtons = ({
  buttonTitle = '자세히 보기',
  link,
  buttons = [],
  isLocation = false,
  address = null,
}: {
  buttonTitle?: string;
  link: ILinkData;
  buttons?: IButtonData[];
  isLocation?: boolean;
  address?: string | null;
}) => {
  const hasButtons = !!buttons && buttons?.length > 0;

  const normalButton = [
    {
      title: buttonTitle,
      link,
    },
  ];

  const locationButtons = [
    {
      title: buttons[0]?.title ?? buttonTitle,
      link: buttons[0]?.link ?? link,
    },
    {
      title: '위치 보기',
      link: {
        webUrl: `https://map.kakao.com/?q=${address}`,
      },
    },
  ];

  const finalButtons = isLocation ? locationButtons : hasButtons ? buttons : normalButton;

  return (
    <div className={styles.buttons}>
      {finalButtons.map((button, index) => {
        const { title, link } = button;

        const buttonLink = link.webUrl ?? link.mobileWebUrl;

        const handleClick = () => {
          window.open(buttonLink);
        };

        return (
          <Button className={styles.button} onClick={handleClick} key={index} color="none">
            {title}
          </Button>
        );
      })}
    </div>
  );
};

export default ContentButtons;
