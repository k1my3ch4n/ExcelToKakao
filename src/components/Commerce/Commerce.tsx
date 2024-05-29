import { ICommerceData } from '@interface/excel';
import ContentButtons from '../NewContentButtons';
import styles from './Commerce.module.scss';

const Commerce = ({ sendData }: { sendData: ICommerceData }) => {
  const {
    commerce: {
      productName,
      regularPrice,
      discountPrice,
      discountRate,
      fixedDiscountPrice,
      currencyUnit,
      currencyUnitPosition,
    },
    content: { title, description, link, imageUrl },
    buttonTitle,
    buttons,
  } = sendData;

  const hasButtons = !!buttons && buttons?.length > 0;

  const normalButton = {
    title: buttonTitle ?? '자세히 보기',
    link,
  };

  return (
    <>
      {imageUrl && (
        <div className={styles.image}>
          <img src={imageUrl}></img>
        </div>
      )}
      <div className={styles.detail}>
        {productName && <p className={styles.title}>{productName}</p>}

        {/* todo : price 분리 */}

        <div className={styles.price}>
          <p className={styles.finalPrice}>
            {(currencyUnitPosition === 1 && currencyUnit) ?? '원'}
            {discountPrice ? discountPrice.toLocaleString() : regularPrice?.toLocaleString()}
            {(currencyUnitPosition === 0 && currencyUnit) ?? '원'}
          </p>

          {discountPrice && !!regularPrice && (
            <s className={styles.beforePrice}>{regularPrice.toLocaleString()}</s>
          )}
          <p className={styles.discount}>
            {discountRate
              ? `${discountRate}%`
              : fixedDiscountPrice && `${fixedDiscountPrice.toLocaleString()}↓`}
          </p>
        </div>

        <div className={styles.line} />
        {title && <p className={styles.description}>{title}</p>}

        {!title && description && <p className={styles.description}>{description}</p>}

        <ContentButtons buttons={hasButtons ? buttons : [normalButton]} />
      </div>
    </>
  );
};

export default Commerce;
