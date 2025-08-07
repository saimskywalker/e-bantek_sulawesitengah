import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClass = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    fullWidth && 'btn--full-width',
    icon && `btn--with-icon btn--icon-${iconPosition}`,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <span className="btn__spinner">
          <svg className="spinner" width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}
      
      {children && (
        <span className="btn__text">{children}</span>
      )}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'ghost', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
};

export default Button;