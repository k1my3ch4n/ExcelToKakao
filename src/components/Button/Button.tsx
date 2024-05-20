import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'm' | 'l';
  color?: 'none' | 'yellow';
  className?: string;
  hasIcon?: boolean;
}

const Button = ({
  size = 'l',
  color = 'yellow',
  className = '',
  hasIcon = false,
  ...props
}: ButtonProps) => {
  const commonStyles = `
    ${styles.button}
    ${styles[size]}
    ${styles[color]}
    ${hasIcon ? styles.hasIcon : ''}
    ${className}
  `;

  return (
    <button className={commonStyles} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
