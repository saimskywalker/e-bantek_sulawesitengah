import PropTypes from 'prop-types';
import './Typography.css';

const Typography = ({
  variant = 'body1',
  component,
  color = 'default',
  align = 'left',
  weight = 'default',
  children,
  className = '',
  ...props
}) => {
  // Default component mapping
  const defaultComponents = {
    h1: 'h1',
    h2: 'h2', 
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span'
  };

  const Component = component || defaultComponents[variant] || 'p';

  const typographyClass = [
    'typography',
    `typography--${variant}`,
    `typography--color-${color}`,
    `typography--align-${align}`,
    weight !== 'default' && `typography--weight-${weight}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={typographyClass} {...props}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'caption', 'overline'
  ]),
  component: PropTypes.elementType,
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'tertiary', 'inverse',
    'success', 'warning', 'error', 'info'
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  weight: PropTypes.oneOf(['default', 'light', 'regular', 'medium', 'semibold', 'bold']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Typography;