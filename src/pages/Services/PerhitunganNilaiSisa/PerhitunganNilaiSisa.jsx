import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { USER_ROLES, PERMISSIONS } from '../../../context/AuthContext';
import { PerhitunganNilaiSisaRequest, SERVICE_TYPES } from '../../../models/ServiceRequest';
import serviceRequestService from '../../../services/serviceRequestService';
import Button from '../../../components/atoms/Button';
import Typography from '../../../components/atoms/Typography';
import FormField from '../../../components/molecules/FormField';
import FileUpload from '../../../components/molecules/FileUpload';
import Card from '../../../components/molecules/Card';
import './PerhitunganNilaiSisa.css';

const PerhitunganNilaiSisa = () => {
  const navigate = useNavigate();
  const { user, hasPermission, hasRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [draftId, setDraftId] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Data Pemohon/Instansi
    namaOPD: '',
    alamatOPD: '',
    namaPenanggungJawab: '',
    jabatan: '',
    nomorTelepon: '',
    email: '',
    perihalTujuan: '',
    suratPermohonan: null,
    
    // Data Teknis
    namaBangunan: '',
    lokasiBangunan: '',
    fungsiBangunan: '',
    luasBangunan: '',
    tahunDibangun: '',
    kondisiSaatIni: '',
    
    // Files
    fotoBangunanDepan: null,
    fotoBangunanBelakang: null,
    fotoBangunanKanan: null,
    fotoBangunanKiri: null,
    denahBangunan: null,
    
    // Additional
    keteranganTambahan: ''
  });

  // Check permissions
  useEffect(() => {
    if (!hasRole(USER_ROLES.PEMOHON) || !hasPermission(PERMISSIONS.CREATE_REQUEST)) {
      navigate('/dashboard');
      return;
    }
  }, [hasRole, hasPermission, navigate]);

  // Auto-save functionality
  const saveAsDraft = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const draftKey = serviceRequestService.saveDraft(
        SERVICE_TYPES.PERHITUNGAN_NILAI_SISA,
        formData,
        user.id
      );
      
      if (!draftId) setDraftId(draftKey);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [formData, user?.id, draftId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (Object.values(formData).some(value => value && value !== '')) {
      const timer = setInterval(saveAsDraft, 30000);
      return () => clearInterval(timer);
    }
  }, [saveAsDraft, formData]);

  // Load existing draft on mount
  useEffect(() => {
    if (user?.id) {
      const drafts = serviceRequestService.getDrafts(user.id);
      const existingDraft = Object.entries(drafts).find(([key, draft]) => 
        draft.serviceType === SERVICE_TYPES.PERHITUNGAN_NILAI_SISA
      );
      
      if (existingDraft) {
        const [key, draft] = existingDraft;
        setFormData(prev => ({ ...prev, ...draft.formData }));
        setDraftId(key);
        setLastSaved(new Date(draft.savedAt));
      }
    }
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (fieldName) => (file) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));

    // Clear file error
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const handleFileError = (fieldName) => (errorMessages) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessages.join(', ')
    }));
  };

  const validateForm = () => {
    const request = new PerhitunganNilaiSisaRequest(formData);
    const validationErrors = request.validate();
    
    const errorObj = {};
    validationErrors.forEach(error => {
      const field = error.toLowerCase().includes('nama opd') ? 'namaOPD' :
                   error.toLowerCase().includes('alamat opd') ? 'alamatOPD' :
                   error.toLowerCase().includes('nama penanggung jawab') ? 'namaPenanggungJawab' :
                   error.toLowerCase().includes('jabatan') ? 'jabatan' :
                   error.toLowerCase().includes('nomor telepon') ? 'nomorTelepon' :
                   error.toLowerCase().includes('email') ? 'email' :
                   error.toLowerCase().includes('perihal') ? 'perihalTujuan' :
                   error.toLowerCase().includes('surat permohonan') ? 'suratPermohonan' :
                   error.toLowerCase().includes('nama bangunan') ? 'namaBangunan' :
                   error.toLowerCase().includes('lokasi bangunan') ? 'lokasiBangunan' :
                   error.toLowerCase().includes('fungsi bangunan') ? 'fungsiBangunan' :
                   error.toLowerCase().includes('luas bangunan') ? 'luasBangunan' :
                   error.toLowerCase().includes('tahun dibangun') ? 'tahunDibangun' :
                   error.toLowerCase().includes('kondisi') ? 'kondisiSaatIni' :
                   error.toLowerCase().includes('foto tampak depan') ? 'fotoBangunanDepan' :
                   error.toLowerCase().includes('foto tampak belakang') ? 'fotoBangunanBelakang' :
                   error.toLowerCase().includes('foto tampak kanan') ? 'fotoBangunanKanan' :
                   error.toLowerCase().includes('foto tampak kiri') ? 'fotoBangunanKiri' :
                   'general';
      
      errorObj[field] = error;
    });
    
    setErrors(errorObj);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.form-field--error input, .form-field--error select, .file-upload.has-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmitting(true);
    
    try {
      // Create service request
      const request = await serviceRequestService.createRequest(
        SERVICE_TYPES.PERHITUNGAN_NILAI_SISA,
        formData,
        user.id
      );

      // Submit the request
      await serviceRequestService.submitRequest(request.id, user.id);

      // Remove draft since request is submitted
      if (draftId) {
        serviceRequestService.removeDraft(draftId, user.id);
      }

      // Navigate to success page or dashboard
      navigate('/dashboard/pemohon', {
        state: {
          message: 'Permohonan perhitungan nilai sisa berhasil diajukan!',
          requestId: request.id
        }
      });

    } catch (error) {
      setErrors({
        submit: error.message || 'Terjadi kesalahan saat mengajukan permohonan'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    await saveAsDraft();
    alert('Draft berhasil disimpan!');
  };

  const kondisiOptions = [
    { value: '', label: 'Pilih kondisi bangunan' },
    { value: 'Baik', label: 'Baik' },
    { value: 'Rusak Ringan', label: 'Rusak Ringan' },
    { value: 'Rusak Sedang', label: 'Rusak Sedang' },
    { value: 'Rusak Berat', label: 'Rusak Berat' }
  ];

  return (
    <div className="perhitungan-nilai-sisa-page">
      {/* Header */}
      <div className="service-header">
        <div className="container">
          <div className="header-content">
            <button 
              onClick={() => navigate('/dashboard/pemohon')}
              className="back-button"
            >
              <i className="fas fa-arrow-left"></i>
              Kembali ke Dashboard
            </button>
            
            <div className="service-title-section">
              <Typography variant="h2" className="service-title">
                Perhitungan Nilai Sisa dan Layak Jual
              </Typography>
              <Typography variant="body1" className="service-subtitle">
                Permohonan perhitungan nilai sisa bangunan untuk keperluan layak jual aset negara
              </Typography>
            </div>

            {lastSaved && (
              <div className="auto-save-status">
                <i className="fas fa-save"></i>
                <span>Terakhir disimpan: {lastSaved.toLocaleTimeString('id-ID')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="service-content">
        <div className="container">
          <form onSubmit={handleSubmit} className="service-form">
            
            {/* Data Pemohon/Instansi */}
            <Card className="form-section">
              <div className="section-header">
                <Typography variant="h4" className="section-title">
                  <i className="fas fa-building"></i>
                  Data Pemohon / Instansi
                </Typography>
                <Typography variant="body2" className="section-description">
                  Informasi lengkap tentang OPD/Instansi yang mengajukan permohonan
                </Typography>
              </div>

              <div className="form-grid">
                <FormField
                  label="Nama OPD/Instansi"
                  type="text"
                  name="namaOPD"
                  value={formData.namaOPD}
                  onChange={handleInputChange}
                  placeholder="Contoh: Dinas PUPR Sulawesi Tengah"
                  required
                  error={errors.namaOPD}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-building"></i>}
                />

                <FormField
                  label="Alamat OPD/Instansi"
                  type="textarea"
                  name="alamatOPD"
                  value={formData.alamatOPD}
                  onChange={handleInputChange}
                  placeholder="Alamat lengkap OPD/Instansi"
                  required
                  error={errors.alamatOPD}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-map-marker-alt"></i>}
                  rows={3}
                />

                <FormField
                  label="Nama Penanggung Jawab"
                  type="text"
                  name="namaPenanggungJawab"
                  value={formData.namaPenanggungJawab}
                  onChange={handleInputChange}
                  placeholder="Nama lengkap penanggung jawab"
                  required
                  error={errors.namaPenanggungJawab}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-user"></i>}
                />

                <FormField
                  label="Jabatan"
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  placeholder="Jabatan penanggung jawab"
                  required
                  error={errors.jabatan}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-id-badge"></i>}
                />

                <FormField
                  label="Nomor Telepon/HP"
                  type="tel"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleInputChange}
                  placeholder="Contoh: 08123456789"
                  required
                  error={errors.nomorTelepon}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-phone"></i>}
                />

                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@domain.com"
                  required
                  error={errors.email}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-envelope"></i>}
                />
              </div>

              <FormField
                label="Perihal Maksud dan Tujuan"
                type="textarea"
                name="perihalTujuan"
                value={formData.perihalTujuan}
                onChange={handleInputChange}
                placeholder="Jelaskan secara singkat maksud dan tujuan permohonan perhitungan nilai sisa dan layak jual..."
                required
                error={errors.perihalTujuan}
                disabled={loading || submitting}
                leftIcon={<i className="fas fa-file-text"></i>}
                rows={4}
                helperText="Contoh: Permohonan perhitungan nilai sisa bangunan untuk keperluan layak jual aset negara"
              />

              <FileUpload
                label="Surat Permohonan"
                description="Upload surat permohonan resmi yang ditandatangani dan dicap oleh kepala/lembaga pemohon"
                accept="application/pdf"
                maxSize={10 * 1024 * 1024} // 10MB
                value={formData.suratPermohonan}
                onChange={handleFileChange('suratPermohonan')}
                onError={handleFileError('suratPermohonan')}
                required
                disabled={loading || submitting}
              />
              {errors.suratPermohonan && (
                <span className="field-error">{errors.suratPermohonan}</span>
              )}
            </Card>

            {/* Data Teknis */}
            <Card className="form-section">
              <div className="section-header">
                <Typography variant="h4" className="section-title">
                  <i className="fas fa-tools"></i>
                  Data Teknis
                </Typography>
                <Typography variant="body2" className="section-description">
                  Informasi teknis detail tentang bangunan yang akan dihitung nilai sisanya
                </Typography>
              </div>

              <div className="form-grid">
                <FormField
                  label="Nama Bangunan"
                  type="text"
                  name="namaBangunan"
                  value={formData.namaBangunan}
                  onChange={handleInputChange}
                  placeholder="Nama atau identitas bangunan"
                  required
                  error={errors.namaBangunan}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-building"></i>}
                />

                <FormField
                  label="Lokasi Bangunan"
                  type="text"
                  name="lokasiBangunan"
                  value={formData.lokasiBangunan}
                  onChange={handleInputChange}
                  placeholder="Alamat lengkap lokasi bangunan"
                  required
                  error={errors.lokasiBangunan}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-map-marker-alt"></i>}
                />

                <FormField
                  label="Fungsi Bangunan"
                  type="text"
                  name="fungsiBangunan"
                  value={formData.fungsiBangunan}
                  onChange={handleInputChange}
                  placeholder="Contoh: Kantor, Sekolah, Puskesmas"
                  required
                  error={errors.fungsiBangunan}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-home"></i>}
                />

                <FormField
                  label="Luas Bangunan (m²)"
                  type="number"
                  name="luasBangunan"
                  value={formData.luasBangunan}
                  onChange={handleInputChange}
                  placeholder="Luas dalam meter persegi"
                  required
                  error={errors.luasBangunan}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-ruler-combined"></i>}
                  min="1"
                  step="0.01"
                />

                <FormField
                  label="Tahun Dibangun"
                  type="number"
                  name="tahunDibangun"
                  value={formData.tahunDibangun}
                  onChange={handleInputChange}
                  placeholder="Tahun konstruksi bangunan"
                  required
                  error={errors.tahunDibangun}
                  disabled={loading || submitting}
                  leftIcon={<i className="fas fa-calendar"></i>}
                  min="1900"
                  max={new Date().getFullYear()}
                />

                <div className="form-field">
                  <Typography variant="body2" className="form-field__label" weight="medium">
                    Kondisi Saat Ini <span className="form-field__required">*</span>
                  </Typography>
                  <div className="select-wrapper">
                    <i className="fas fa-clipboard-check select-icon"></i>
                    <select
                      name="kondisiSaatIni"
                      value={formData.kondisiSaatIni}
                      onChange={handleInputChange}
                      className={`form-select ${errors.kondisiSaatIni ? 'form-select--error' : ''}`}
                      disabled={loading || submitting}
                      required
                    >
                      {kondisiOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.kondisiSaatIni && (
                    <span className="field-error">{errors.kondisiSaatIni}</span>
                  )}
                </div>
              </div>
            </Card>

            {/* Dokumen dan Foto Pendukung */}
            <Card className="form-section">
              <div className="section-header">
                <Typography variant="h4" className="section-title">
                  <i className="fas fa-images"></i>
                  Dokumen dan Foto Pendukung
                </Typography>
                <Typography variant="body2" className="section-description">
                  Upload foto bangunan dari berbagai sisi dan dokumen pendukung lainnya
                </Typography>
              </div>

              <div className="file-grid">
                <FileUpload
                  label="Foto Tampak Depan"
                  description="Foto bangunan dari sisi depan"
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} // 5MB
                  value={formData.fotoBangunanDepan}
                  onChange={handleFileChange('fotoBangunanDepan')}
                  onError={handleFileError('fotoBangunanDepan')}
                  required
                  disabled={loading || submitting}
                  preview={true}
                />
                {errors.fotoBangunanDepan && (
                  <span className="field-error">{errors.fotoBangunanDepan}</span>
                )}

                <FileUpload
                  label="Foto Tampak Belakang"
                  description="Foto bangunan dari sisi belakang"
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                  value={formData.fotoBangunanBelakang}
                  onChange={handleFileChange('fotoBangunanBelakang')}
                  onError={handleFileError('fotoBangunanBelakang')}
                  required
                  disabled={loading || submitting}
                  preview={true}
                />
                {errors.fotoBangunanBelakang && (
                  <span className="field-error">{errors.fotoBangunanBelakang}</span>
                )}

                <FileUpload
                  label="Foto Tampak Kanan"
                  description="Foto bangunan dari sisi kanan"
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                  value={formData.fotoBangunanKanan}
                  onChange={handleFileChange('fotoBangunanKanan')}
                  onError={handleFileError('fotoBangunanKanan')}
                  required
                  disabled={loading || submitting}
                  preview={true}
                />
                {errors.fotoBangunanKanan && (
                  <span className="field-error">{errors.fotoBangunanKanan}</span>
                )}

                <FileUpload
                  label="Foto Tampak Kiri"
                  description="Foto bangunan dari sisi kiri"
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                  value={formData.fotoBangunanKiri}
                  onChange={handleFileChange('fotoBangunanKiri')}
                  onError={handleFileError('fotoBangunanKiri')}
                  required
                  disabled={loading || submitting}
                  preview={true}
                />
                {errors.fotoBangunanKiri && (
                  <span className="field-error">{errors.fotoBangunanKiri}</span>
                )}
              </div>

              <FileUpload
                label="Denah Bangunan / Aset"
                description="Upload denah atau layout bangunan (format PDF atau gambar)"
                accept="image/*,application/pdf"
                maxSize={5 * 1024 * 1024}
                value={formData.denahBangunan}
                onChange={handleFileChange('denahBangunan')}
                onError={handleFileError('denahBangunan')}
                disabled={loading || submitting}
                preview={true}
              />
              {errors.denahBangunan && (
                <span className="field-error">{errors.denahBangunan}</span>
              )}
            </Card>

            {/* Catatan Tambahan */}
            <Card className="form-section">
              <div className="section-header">
                <Typography variant="h4" className="section-title">
                  <i className="fas fa-sticky-note"></i>
                  Catatan Tambahan
                </Typography>
              </div>

              <FormField
                label="Keterangan Tambahan (Opsional)"
                type="textarea"
                name="keteranganTambahan"
                value={formData.keteranganTambahan}
                onChange={handleInputChange}
                placeholder="Tuliskan informasi tambahan terkait bangunan/aset, jika ada..."
                error={errors.keteranganTambahan}
                disabled={loading || submitting}
                leftIcon={<i className="fas fa-comment"></i>}
                rows={4}
              />
            </Card>

            {/* Form Actions */}
            <div className="form-actions">
              {errors.submit && (
                <div className="submit-error">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="action-buttons">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSaveDraft}
                  disabled={loading || submitting}
                  loading={false}
                >
                  <i className="fas fa-save"></i>
                  Simpan Draft
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || submitting}
                  loading={submitting}
                  size="large"
                >
                  {submitting ? 'Mengirim...' : 'Ajukan Permohonan'}
                  {!submitting && <i className="fas fa-paper-plane"></i>}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerhitunganNilaiSisa;