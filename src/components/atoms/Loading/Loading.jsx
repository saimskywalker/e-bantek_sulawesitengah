import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({
  variant = 'spinner',
  size = 'medium',
  color = 'primary',
  text,
  fullScreen = false,
  overlay = false,
  className = ''
}) => {
  const loadingClass = [
    'loading',
    `loading--${variant}`,
    `loading--${size}`,
    `loading--${color}`,
    fullScreen && 'loading--full-screen',
    overlay && 'loading--overlay',
    className
  ].filter(Boolean).join(' ');

  const renderSpinner = () => (
    <div className="loading__spinner">
      <svg viewBox="0 0 24 24" className="spinner-svg">
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  const renderDots = () => (
    <div className="loading__dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );

  const renderPulse = () => (
    <div className="loading__pulse">
      <div className="pulse-ring"></div>
    </div>
  );

  const renderBars = () => (
    <div className="loading__bars">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );

  const renderSkeleton = () => (
    <div className="loading__skeleton">
      <div className="skeleton-line skeleton-line--title"></div>
      <div className="skeleton-line skeleton-line--subtitle"></div>
      <div className="skeleton-line skeleton-line--content"></div>
    </div>
  );

  const renderLoadingContent = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bars':
        return renderBars();
      case 'skeleton':
        return renderSkeleton();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={loadingClass}>
      <div className="loading__content">
        {renderLoadingContent()}
        {text && (
          <div className="loading__text">{text}</div>
        )}
      </div>
    </div>
  );
};

Loading.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'bars', 'skeleton']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'neutral']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string
};

export default Loading;