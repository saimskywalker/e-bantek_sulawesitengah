import PropTypes from 'prop-types';
import './Icon.css';

// Common SVG icons used throughout the app
const iconPaths = {
  // Navigation
  'chevron-left': 'M15 18l-6-6 6-6',
  'chevron-right': 'M9 18l6-6-6-6', 
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-up': 'M18 15l-6-6-6 6',
  'menu': 'M3 12h18M3 6h18M3 18h18',
  'close': 'M18 6L6 18M6 6l12 12',
  
  // Actions
  'plus': 'M12 5v14m-7-7h14',
  'minus': 'M5 12h14',
  'edit': 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
  'trash': 'M14 5h-4M5 5h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 5z',
  'search': 'm21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  'filter': 'M4 6h16M6 12h12M8 18h8',
  
  // Status
  'check': 'M20 6L9 17l-5-5',
  'check-circle': 'M22 11.08V12a10 10 0 1 1-5.93-9.14',
  'x-circle': 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  'alert-circle': 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-6h2v4h-2V9z',
  'info': 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-6h2v4h-2V9z',
  
  // Communication
  'mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
  'phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  'bell': 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  
  // Files
  'file': 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z',
  'download': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5 5-5m-5-7v12',
  'upload': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5-5 5 5m-5 7V3',
  
  // Settings
  'settings': 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.97 19.05,5.05L16.56,6.05C16.04,5.65 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
  'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'users': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  
  // Business
  'building': 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01M13 15v.01M13 18v.01',
  'chart': 'M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3',
  'dollar': 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
};

const Icon = ({
  name,
  size = 'medium',
  color = 'default',
  strokeWidth = 2,
  className = '',
  ...props
}) => {
  const iconClass = [
    'icon',
    `icon--${size}`,
    `icon--color-${color}`,
    className
  ].filter(Boolean).join(' ');

  // Size mapping
  const sizeMap = {
    'small': 16,
    'medium': 20,
    'large': 24,
    'xl': 32
  };

  const iconSize = sizeMap[size] || 20;
  const pathData = iconPaths[name];

  if (!pathData) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg
      className={iconClass}
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={pathData} />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconPaths)).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xl']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary', 'inverse', 'success', 'warning', 'error', 'info']),
  strokeWidth: PropTypes.number,
  className: PropTypes.string
};

export default Icon;