import PropTypes from 'prop-types';
import Input from '../../atoms/Input';
import Typography from '../../atoms/Typography';
import './FormField.css';

const FormField = ({
  label,
  required = false,
  error,
  helperText,
  children,
  className = '',
  id,
  ...inputProps
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  
  const fieldClass = [
    'form-field',
    error && 'form-field--error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fieldClass}>
      {label && (
        <Typography
          variant="body2"
          component="label"
          htmlFor={fieldId}
          className="form-field__label"
          weight="medium"
        >
          {label}
          {required && (
            <span className="form-field__required" aria-label="required">
              *
            </span>
          )}
        </Typography>
      )}
      
      <div className="form-field__input">
        {children || (
          <Input
            id={fieldId}
            error={!!error}
            helperText={error || helperText}
            required={required}
            {...inputProps}
          />
        )}
      </div>
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string
};

export default FormField;