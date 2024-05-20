import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'm' | 'l';
  color?: 'none' | 'yellow';
  className?: string;
}

const Button = ({ size = 'm', color = 'none', className = '', ...props }: ButtonProps) => {
  const commonStyles = `
    ${styles.button}
    ${styles[size]}
    ${styles[color]}
    ${className}
  `;

  return (
    <button className={commonStyles} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
