import PropTypes from 'prop-types';
import Typography from '../../atoms/Typography';
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  headerActions,
  footer,
  variant = 'default',
  padding = 'default',
  hover = false,
  clickable = false,
  className = '',
  onClick,
  ...props
}) => {
  const cardClass = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hover && 'card--hover',
    clickable && 'card--clickable',
    onClick && 'card--clickable',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (onClick && (clickable || onClick)) {
      onClick(e);
    }
  };

  return (
    <div
      className={cardClass}
      onClick={handleClick}
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      onKeyDown={clickable || onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      } : undefined}
      {...props}
    >
      {(title || subtitle || headerActions) && (
        <div className="card__header">
          <div className="card__header-content">
            {title && (
              <Typography
                variant="h6"
                className="card__title"
                color="default"
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body2"
                className="card__subtitle"
                color="secondary"
              >
                {subtitle}
              </Typography>
            )}
          </div>
          {headerActions && (
            <div className="card__header-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}

      <div className="card__content">
        {children}
      </div>

      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerActions: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'flat']),
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large']),
  hover: PropTypes.bool,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;