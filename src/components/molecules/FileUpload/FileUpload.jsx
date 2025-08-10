import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import './FileUpload.css';

const FileUpload = ({
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
  label = 'Upload File',
  description = '',
  required = false,
  value = null,
  onChange = () => {},
  onError = () => {},
  disabled = false,
  preview = true,
  className = '',
  id = '',
  name = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const validateFile = (file) => {
    const errors = [];

    // Size validation
    if (file.size > maxSize) {
      errors.push(`Ukuran file terlalu besar. Maksimal ${formatFileSize(maxSize)}`);
    }

    // Type validation
    if (accept !== '*/*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

      const isAccepted = acceptedTypes.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return acceptedType.toLowerCase() === fileExtension;
        } else if (acceptedType.includes('*')) {
          const [mainType] = acceptedType.split('/');
          const [fileMainType] = fileType.split('/');
          return mainType === fileMainType;
        } else {
          return acceptedType === fileType;
        }
      });

      if (!isAccepted) {
        errors.push(`Tipe file tidak didukung. Format yang diterima: ${accept}`);
      }
    }

    return errors;
  };

  const processFiles = async (files) => {
    setUploading(true);
    const fileArray = Array.from(files);
    
    try {
      if (!multiple && fileArray.length > 1) {
        onError(['Hanya dapat mengupload satu file']);
        return;
      }

      // Validate each file
      const allErrors = [];
      fileArray.forEach((file, index) => {
        const errors = validateFile(file);
        if (errors.length > 0) {
          allErrors.push(`File ${index + 1}: ${errors.join(', ')}`);
        }
      });

      if (allErrors.length > 0) {
        onError(allErrors);
        return;
      }

      // Process files
      const processedFiles = await Promise.all(
        fileArray.map(async (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = () => {
              resolve({
                id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: file.name,
                type: file.type,
                size: file.size,
                data: reader.result, // Base64 data
                uploadedAt: new Date().toISOString(),
                preview: file.type.startsWith('image/') ? reader.result : null
              });
            };
            
            reader.onerror = () => {
              reject(new Error(`Gagal membaca file: ${file.name}`));
            };
            
            reader.readAsDataURL(file);
          });
        })
      );

      if (multiple) {
        onChange(processedFiles);
      } else {
        onChange(processedFiles[0] || null);
      }

    } catch (error) {
      onError([error.message || 'Terjadi kesalahan saat mengupload file']);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled || uploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (disabled || uploading) return;
    
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const handleClick = () => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  const handleRemove = (fileId = null) => {
    if (multiple && fileId) {
      const updatedFiles = value.filter(file => file.id !== fileId);
      onChange(updatedFiles);
    } else {
      onChange(null);
    }
  };

  const renderFilePreview = (file) => {
    if (!preview) return null;

    if (file.type.startsWith('image/') && file.preview) {
      return (
        <div className="file-preview-image">
          <img src={file.preview} alt={file.name} />
        </div>
      );
    }

    return (
      <div className="file-preview-icon">
        <i className={getFileIcon(file.type)}></i>
      </div>
    );
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'fas fa-image';
    if (fileType === 'application/pdf') return 'fas fa-file-pdf';
    if (fileType.includes('word')) return 'fas fa-file-word';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'fas fa-file-excel';
    return 'fas fa-file';
  };

  const hasFiles = multiple ? (value && value.length > 0) : !!value;
  const files = multiple ? (value || []) : (value ? [value] : []);

  return (
    <div className={`file-upload ${className}`}>
      {label && (
        <Typography variant="body2" className="file-upload-label">
          {label} {required && <span className="required">*</span>}
        </Typography>
      )}
      
      {description && (
        <Typography variant="caption" className="file-upload-description">
          {description}
        </Typography>
      )}

      <div
        className={`file-upload-zone ${dragActive ? 'drag-active' : ''} ${hasFiles ? 'has-files' : ''} ${disabled ? 'disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled || uploading}
          className="file-upload-input"
          id={id}
          name={name}
        />

        {!hasFiles && (
          <div className="file-upload-placeholder">
            <div className="upload-icon">
              {uploading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-cloud-upload-alt"></i>
              )}
            </div>
            <Typography variant="body1" className="upload-text">
              {uploading ? 'Mengupload...' : 'Klik untuk pilih file atau seret file ke sini'}
            </Typography>
            <Typography variant="caption" className="upload-hint">
              Maksimal {formatFileSize(maxSize)} • {accept === '*/*' ? 'Semua format' : accept}
            </Typography>
          </div>
        )}

        {hasFiles && (
          <div className="file-upload-files">
            {files.map((file, index) => (
              <div key={file.id || index} className="uploaded-file">
                {renderFilePreview(file)}
                <div className="file-info">
                  <Typography variant="body2" className="file-name">
                    {file.name}
                  </Typography>
                  <Typography variant="caption" className="file-size">
                    {formatFileSize(file.size)}
                  </Typography>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(file.id);
                  }}
                  className="remove-file-btn"
                  disabled={disabled || uploading}
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {multiple && hasFiles && (
        <div className="file-upload-footer">
          <Typography variant="caption">
            {files.length} file(s) dipilih
          </Typography>
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  onError: PropTypes.func,
  disabled: PropTypes.bool,
  preview: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

export default FileUpload;