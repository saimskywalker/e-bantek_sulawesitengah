/**
 * Service Request Models
 * Defines data structures for all service request types
 */

// Request status workflow
export const REQUEST_STATUS = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED', 
  UNDER_REVIEW: 'UNDER_REVIEW',
  VERIFIED: 'VERIFIED',
  APPROVED: 'APPROVED',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

// Service types
export const SERVICE_TYPES = {
  PERHITUNGAN_NILAI_SISA: 'PERHITUNGAN_NILAI_SISA',
  ASSESSMENT_BANGUNAN: 'ASSESSMENT_BANGUNAN',
  USULAN_PEMBIAYAAN: 'USULAN_PEMBIAYAAN',
  TIM_TEKNIS: 'TIM_TEKNIS',
  PENELITI_KONTRAK: 'PENELITI_KONTRAK',
  PENDAMPINGAN_PHO_FHO: 'PENDAMPINGAN_PHO_FHO',
  PENGELOLA_TEKNIS: 'PENGELOLA_TEKNIS'
};

// Base service request class
export class BaseServiceRequest {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.serviceType = data.serviceType;
    this.requesterId = data.requesterId;
    this.requesterInfo = data.requesterInfo || {};
    this.status = data.status || REQUEST_STATUS.DRAFT;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.submittedAt = data.submittedAt || null;
    this.assignedTo = data.assignedTo || null;
    this.assignedBy = data.assignedBy || null;
    this.assignedAt = data.assignedAt || null;
    this.completedAt = data.completedAt || null;
    this.files = data.files || [];
    this.comments = data.comments || [];
    this.statusHistory = data.statusHistory || [];
  }

  generateId() {
    return `REQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  updateStatus(newStatus, comment = '', updatedBy = null) {
    const oldStatus = this.status;
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();

    // Add to status history
    this.statusHistory.push({
      id: `status_${Date.now()}`,
      from: oldStatus,
      to: newStatus,
      comment,
      updatedBy,
      timestamp: new Date().toISOString()
    });

    // Set specific timestamps
    if (newStatus === REQUEST_STATUS.SUBMITTED) {
      this.submittedAt = new Date().toISOString();
    } else if (newStatus === REQUEST_STATUS.COMPLETED) {
      this.completedAt = new Date().toISOString();
    }
  }

  addComment(comment, author) {
    this.comments.push({
      id: `comment_${Date.now()}`,
      text: comment,
      author,
      timestamp: new Date().toISOString()
    });
    this.updatedAt = new Date().toISOString();
  }

  addFile(file) {
    this.files.push({
      id: `file_${Date.now()}`,
      ...file,
      uploadedAt: new Date().toISOString()
    });
    this.updatedAt = new Date().toISOString();
  }

  assignTo(userId, assignedBy) {
    this.assignedTo = userId;
    this.assignedBy = assignedBy;
    this.assignedAt = new Date().toISOString();
    this.updateStatus(REQUEST_STATUS.ASSIGNED, `Ditugaskan kepada ${userId}`, assignedBy);
  }
}

// Perhitungan Nilai Sisa dan Layak Jual
export class PerhitunganNilaiSisaRequest extends BaseServiceRequest {
  constructor(data = {}) {
    super({ ...data, serviceType: SERVICE_TYPES.PERHITUNGAN_NILAI_SISA });
    
    // Specific fields for this service type
    this.namaOPD = data.namaOPD || '';
    this.alamatOPD = data.alamatOPD || '';
    this.namaPenanggungJawab = data.namaPenanggungJawab || '';
    this.jabatan = data.jabatan || '';
    this.nomorTelepon = data.nomorTelepon || '';
    this.email = data.email || '';
    this.perihalTujuan = data.perihalTujuan || '';
    this.suratPermohonan = data.suratPermohonan || null; // PDF file
    
    // Data Teknis
    this.namaBangunan = data.namaBangunan || '';
    this.lokasiBangunan = data.lokasiBangunan || '';
    this.fungsiBangunan = data.fungsiBangunan || '';
    this.luasBangunan = data.luasBangunan || '';
    this.tahunDibangun = data.tahunDibangun || '';
    this.kondisiSaatIni = data.kondisiSaatIni || '';
    
    // Files
    this.fotoBangunanDepan = data.fotoBangunanDepan || null;
    this.fotoBangunanBelakang = data.fotoBangunanBelakang || null;
    this.fotoBangunanKanan = data.fotoBangunanKanan || null;
    this.fotoBangunanKiri = data.fotoBangunanKiri || null;
    this.denahBangunan = data.denahBangunan || null;
    
    this.keteranganTambahan = data.keteranganTambahan || '';
  }

  validate() {
    const errors = [];
    
    if (!this.namaOPD) errors.push('Nama OPD/Instansi wajib diisi');
    if (!this.alamatOPD) errors.push('Alamat OPD/Instansi wajib diisi');
    if (!this.namaPenanggungJawab) errors.push('Nama Penanggung Jawab wajib diisi');
    if (!this.jabatan) errors.push('Jabatan wajib diisi');
    if (!this.nomorTelepon) errors.push('Nomor Telepon wajib diisi');
    if (!this.email) errors.push('Email wajib diisi');
    if (!this.perihalTujuan) errors.push('Perihal Maksud dan Tujuan wajib diisi');
    if (!this.suratPermohonan) errors.push('Surat Permohonan wajib diupload');
    
    if (!this.namaBangunan) errors.push('Nama Bangunan wajib diisi');
    if (!this.lokasiBangunan) errors.push('Lokasi Bangunan wajib diisi');
    if (!this.fungsiBangunan) errors.push('Fungsi Bangunan wajib diisi');
    if (!this.luasBangunan) errors.push('Luas Bangunan wajib diisi');
    if (!this.tahunDibangun) errors.push('Tahun Dibangun wajib diisi');
    if (!this.kondisiSaatIni) errors.push('Kondisi Saat Ini wajib dipilih');
    
    if (!this.fotoBangunanDepan) errors.push('Foto Tampak Depan wajib diupload');
    if (!this.fotoBangunanBelakang) errors.push('Foto Tampak Belakang wajib diupload');
    if (!this.fotoBangunanKanan) errors.push('Foto Tampak Kanan wajib diupload');
    if (!this.fotoBangunanKiri) errors.push('Foto Tampak Kiri wajib diupload');
    
    // Email validation
    if (this.email && !/\S+@\S+\.\S+/.test(this.email)) {
      errors.push('Format email tidak valid');
    }
    
    // Phone validation
    if (this.nomorTelepon && !/^\d+$/.test(this.nomorTelepon.replace(/[\s-]/g, ''))) {
      errors.push('Format nomor telepon tidak valid');
    }
    
    return errors;
  }
}

// Assessment Bangunan
export class AssessmentBangunanRequest extends BaseServiceRequest {
  constructor(data = {}) {
    super({ ...data, serviceType: SERVICE_TYPES.ASSESSMENT_BANGUNAN });
    
    this.namaOPD = data.namaOPD || '';
    this.alamatOPD = data.alamatOPD || '';
    this.namaPenanggungJawab = data.namaPenanggungJawab || '';
    this.jabatan = data.jabatan || '';
    this.nomorTelepon = data.nomorTelepon || '';
    this.email = data.email || '';
    this.perihalTujuan = data.perihalTujuan || '';
    this.suratPermohonan = data.suratPermohonan || null;
    
    // Data Teknis
    this.namaBangunan = data.namaBangunan || '';
    this.lokasiBangunan = data.lokasiBangunan || '';
    this.fungsiBangunan = data.fungsiBangunan || '';
    this.luasBangunan = data.luasBangunan || '';
    this.tahunDibangun = data.tahunDibangun || '';
    this.kondisiSaatIni = data.kondisiSaatIni || '';
    
    // Files
    this.fotoBangunanDepan = data.fotoBangunanDepan || null;
    this.fotoBangunanBelakang = data.fotoBangunanBelakang || null;
    this.fotoBangunanKanan = data.fotoBangunanKanan || null;
    this.fotoBangunanKiri = data.fotoBangunanKiri || null;
    this.denahBangunan = data.denahBangunan || null;
    this.dokumenPendukungLainnya = data.dokumenPendukungLainnya || [];
    
    this.keteranganTambahan = data.keteranganTambahan || '';
  }

  validate() {
    const errors = [];
    
    if (!this.namaOPD) errors.push('Nama OPD/Instansi wajib diisi');
    if (!this.alamatOPD) errors.push('Alamat OPD/Instansi wajib diisi'); 
    if (!this.namaPenanggungJawab) errors.push('Nama Penanggung Jawab wajib diisi');
    if (!this.jabatan) errors.push('Jabatan wajib diisi');
    if (!this.nomorTelepon) errors.push('Nomor Telepon wajib diisi');
    if (!this.email) errors.push('Email wajib diisi');
    if (!this.perihalTujuan) errors.push('Perihal Maksud dan Tujuan wajib diisi');
    if (!this.suratPermohonan) errors.push('Surat Permohonan wajib diupload');
    
    if (!this.namaBangunan) errors.push('Nama Bangunan wajib diisi');
    if (!this.lokasiBangunan) errors.push('Lokasi Bangunan wajib diisi');
    if (!this.fungsiBangunan) errors.push('Fungsi Bangunan wajib diisi');
    if (!this.luasBangunan) errors.push('Luas Bangunan wajib diisi');
    if (!this.tahunDibangun) errors.push('Tahun Dibangun wajib diisi');
    if (!this.kondisiSaatIni) errors.push('Kondisi Saat Ini wajib dipilih');
    
    if (!this.fotoBangunanDepan) errors.push('Foto Tampak Depan wajib diupload');
    if (!this.fotoBangunanBelakang) errors.push('Foto Tampak Belakang wajib diupload');
    if (!this.fotoBangunanKanan) errors.push('Foto Tampak Kanan wajib diupload');
    if (!this.fotoBangunanKiri) errors.push('Foto Tampak Kiri wajib diupload');
    
    // Email validation
    if (this.email && !/\S+@\S+\.\S+/.test(this.email)) {
      errors.push('Format email tidak valid');
    }
    
    return errors;
  }
}

// Additional service request classes will be added in the next iteration
// UsulanPembiayaanRequest, TimTeknisRequest, PenelitiKontrakRequest, etc.