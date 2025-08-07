import PropTypes from 'prop-types';
import './Input.css';

const Input = ({
  type = 'text',
  value,
  defaultValue,
  placeholder,
  disabled = false,
  required = false,
  readOnly = false,
  autoFocus = false,
  size = 'medium',
  variant = 'default',
  error = false,
  success = false,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const inputWrapperClass = [
    'input-wrapper',
    `input-wrapper--${size}`,
    `input-wrapper--${variant}`,
    error && 'input-wrapper--error',
    success && 'input-wrapper--success',
    disabled && 'input-wrapper--disabled',
    readOnly && 'input-wrapper--readonly',
    leftIcon && 'input-wrapper--with-left-icon',
    rightIcon && 'input-wrapper--with-right-icon',
    className
  ].filter(Boolean).join(' ');

  const inputClass = [
    'input',
    leftIcon && 'input--with-left-icon',
    rightIcon && 'input--with-right-icon'
  ].filter(Boolean).join(' ');

  return (
    <div className={inputWrapperClass}>
      <div className="input-container">
        {leftIcon && (
          <span className="input-icon input-icon--left">
            {leftIcon}
          </span>
        )}
        
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className={inputClass}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
        
        {rightIcon && (
          <span className="input-icon input-icon--right">
            {rightIcon}
          </span>
        )}
      </div>
      
      {helperText && (
        <span className={`input-helper ${error ? 'input-helper--error' : success ? 'input-helper--success' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'filled', 'outlined']),
  error: PropTypes.bool,
  success: PropTypes.bool,
  helperText: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default Input;