import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import './GoogleSignIn.css';

const GoogleSignIn = ({ 
  text = 'Masuk dengan Google',
  variant = 'secondary',
  size = 'large',
  fullWidth = true,
  disabled = false,
  className = '',
  onSuccess,
  onError
}) => {
  const { googleLogin, isLoading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationStep, setSimulationStep] = useState(null);

  const handleGoogleLogin = async () => {
    setIsProcessing(true);
    setSimulationStep('redirect');

    try {
      // Simulate OAuth redirect flow
      setTimeout(() => {
        setSimulationStep('processing');
      }, 800);

      setTimeout(async () => {
        try {
          setSimulationStep('success');
          const result = await googleLogin();
          
          setTimeout(() => {
            setIsProcessing(false);
            setSimulationStep(null);
            onSuccess?.(result);
          }, 500);
        } catch (error) {
          setIsProcessing(false);
          setSimulationStep(null);
          onError?.(error);
        }
      }, 1500);
    } catch (error) {
      setIsProcessing(false);
      setSimulationStep(null);
      onError?.(error);
    }
  };

  const getButtonContent = () => {
    if (!isProcessing) {
      return {
        icon: <i className="fab fa-google"></i>,
        text: text
      };
    }

    switch (simulationStep) {
      case 'redirect':
        return {
          icon: <i className="fas fa-external-link-alt"></i>,
          text: 'Mengarahkan ke Google...'
        };
      case 'processing':
        return {
          icon: <i className="fas fa-spinner fa-spin"></i>,
          text: 'Memproses login...'
        };
      case 'success':
        return {
          icon: <i className="fas fa-check"></i>,
          text: 'Berhasil! Mengalihkan...'
        };
      default:
        return {
          icon: <i className="fab fa-google"></i>,
          text: text
        };
    }
  };

  const buttonContent = getButtonContent();
  const isButtonDisabled = disabled || isLoading || isProcessing;

  return (
    <div className={`google-signin ${className}`}>
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={handleGoogleLogin}
        disabled={isButtonDisabled}
        icon={buttonContent.icon}
        className={`google-signin-button ${simulationStep ? `google-signin--${simulationStep}` : ''}`}
      >
        {buttonContent.text}
      </Button>
      
      {isProcessing && (
        <div className="google-signin-simulation">
          <Typography variant="caption" className="simulation-notice">
            🧪 <strong>Mode Demo:</strong> Simulasi login Google untuk pengembangan frontend
          </Typography>
        </div>
      )}
    </div>
  );
};

GoogleSignIn.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'ghost', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default GoogleSignIn;