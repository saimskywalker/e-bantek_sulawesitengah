/**
 * Service Request Management Service
 * Mock implementation for handling all service requests
 */

import { 
  BaseServiceRequest, 
  PerhitunganNilaiSisaRequest, 
  AssessmentBangunanRequest,
  REQUEST_STATUS,
  SERVICE_TYPES 
} from '../models/ServiceRequest';

const REQUESTS_STORAGE_KEY = 'e_bantek_service_requests';
const DRAFTS_STORAGE_KEY = 'e_bantek_request_drafts';

class ServiceRequestService {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(REQUESTS_STORAGE_KEY)) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(DRAFTS_STORAGE_KEY)) {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify({}));
    }
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all requests
  getAllRequests() {
    return JSON.parse(localStorage.getItem(REQUESTS_STORAGE_KEY) || '[]');
  }

  // Save all requests
  saveAllRequests(requests) {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
  }

  // Get user's requests
  async getUserRequests(userId) {
    await this.delay();
    const allRequests = this.getAllRequests();
    return allRequests.filter(req => req.requesterId === userId);
  }

  // Get requests by status
  async getRequestsByStatus(status, userId = null) {
    await this.delay();
    const allRequests = this.getAllRequests();
    let filteredRequests = allRequests.filter(req => req.status === status);
    
    if (userId) {
      filteredRequests = filteredRequests.filter(req => req.requesterId === userId);
    }
    
    return filteredRequests;
  }

  // Get assigned requests (for technical managers)
  async getAssignedRequests(userId) {
    await this.delay();
    const allRequests = this.getAllRequests();
    return allRequests.filter(req => req.assignedTo === userId);
  }

  // Create new request
  async createRequest(serviceType, requestData, userId) {
    await this.delay();
    
    let request;
    
    switch (serviceType) {
      case SERVICE_TYPES.PERHITUNGAN_NILAI_SISA:
        request = new PerhitunganNilaiSisaRequest(requestData);
        break;
      case SERVICE_TYPES.ASSESSMENT_BANGUNAN:
        request = new AssessmentBangunanRequest(requestData);
        break;
      // Add other service types here
      default:
        request = new BaseServiceRequest(requestData);
    }
    
    request.requesterId = userId;
    request.status = REQUEST_STATUS.DRAFT;
    
    const allRequests = this.getAllRequests();
    allRequests.push(request);
    this.saveAllRequests(allRequests);
    
    return request;
  }

  // Update request
  async updateRequest(requestId, updateData, userId) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    const requestIndex = allRequests.findIndex(req => 
      req.id === requestId && req.requesterId === userId
    );
    
    if (requestIndex === -1) {
      throw new Error('Request not found or access denied');
    }
    
    const request = allRequests[requestIndex];
    
    // Only allow updates to draft or rejected requests by owner
    if (![REQUEST_STATUS.DRAFT, REQUEST_STATUS.REJECTED].includes(request.status)) {
      throw new Error('Cannot edit submitted request');
    }
    
    // Update fields
    Object.assign(request, updateData);
    request.updatedAt = new Date().toISOString();
    
    allRequests[requestIndex] = request;
    this.saveAllRequests(allRequests);
    
    return request;
  }

  // Submit request
  async submitRequest(requestId, userId) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    const requestIndex = allRequests.findIndex(req => 
      req.id === requestId && req.requesterId === userId
    );
    
    if (requestIndex === -1) {
      throw new Error('Request not found or access denied');
    }
    
    const request = allRequests[requestIndex];
    
    if (request.status !== REQUEST_STATUS.DRAFT) {
      throw new Error('Only draft requests can be submitted');
    }
    
    // Validate request
    let validationErrors = [];
    if (request.validate) {
      validationErrors = request.validate();
    }
    
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
    }
    
    request.updateStatus(REQUEST_STATUS.SUBMITTED, 'Request submitted by user', userId);
    
    allRequests[requestIndex] = request;
    this.saveAllRequests(allRequests);
    
    // Remove from drafts if exists
    this.removeDraft(requestId, userId);
    
    return request;
  }

  // Delete request (only drafts)
  async deleteRequest(requestId, userId) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    const requestIndex = allRequests.findIndex(req => 
      req.id === requestId && req.requesterId === userId
    );
    
    if (requestIndex === -1) {
      throw new Error('Request not found or access denied');
    }
    
    const request = allRequests[requestIndex];
    
    if (request.status !== REQUEST_STATUS.DRAFT) {
      throw new Error('Only draft requests can be deleted');
    }
    
    allRequests.splice(requestIndex, 1);
    this.saveAllRequests(allRequests);
    
    // Remove from drafts
    this.removeDraft(requestId, userId);
    
    return { message: 'Request deleted successfully' };
  }

  // Get single request
  async getRequest(requestId, userId = null) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    const request = allRequests.find(req => req.id === requestId);
    
    if (!request) {
      throw new Error('Request not found');
    }
    
    // Check access permissions based on user role
    // For now, allow owner and system users to access
    if (userId && request.requesterId !== userId) {
      // TODO: Add role-based access check here
    }
    
    return request;
  }

  // Draft management
  saveDraft(serviceType, formData, userId) {
    const drafts = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
    const userDrafts = drafts[userId] || {};
    
    const draftKey = `${serviceType}_${Date.now()}`;
    userDrafts[draftKey] = {
      serviceType,
      formData,
      savedAt: new Date().toISOString()
    };
    
    drafts[userId] = userDrafts;
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    
    return draftKey;
  }

  updateDraft(draftKey, formData, userId) {
    const drafts = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
    const userDrafts = drafts[userId] || {};
    
    if (userDrafts[draftKey]) {
      userDrafts[draftKey].formData = formData;
      userDrafts[draftKey].savedAt = new Date().toISOString();
      
      drafts[userId] = userDrafts;
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    }
  }

  getDrafts(userId) {
    const drafts = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
    return drafts[userId] || {};
  }

  removeDraft(draftKey, userId) {
    const drafts = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
    const userDrafts = drafts[userId] || {};
    
    delete userDrafts[draftKey];
    
    drafts[userId] = userDrafts;
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  }

  // File upload handling (Base64 mock)
  async uploadFile(file) {
    await this.delay(500);
    
    // Validate file size (10MB max for PDF, 5MB for images)
    const maxSize = file.type === 'application/pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    
    if (file.size > maxSize) {
      throw new Error(`File size too large. Maximum ${maxSize / 1024 / 1024}MB allowed.`);
    }
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve({
          id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result, // Base64 data
          uploadedAt: new Date().toISOString()
        });
      };
      
      reader.onerror = () => {
        reject(new Error('File upload failed'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  // Admin functions (for operators, managers, etc.)
  async updateRequestStatus(requestId, newStatus, comment, updatedBy) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    const requestIndex = allRequests.findIndex(req => req.id === requestId);
    
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }
    
    const request = allRequests[requestIndex];
    request.updateStatus(newStatus, comment, updatedBy);
    
    allRequests[requestIndex] = request;
    this.saveAllRequests(allRequests);
    
    return request;
  }

  async assignRequest(requestId, assignedTo, assignedBy) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    const requestIndex = allRequests.findIndex(req => req.id === requestId);
    
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }
    
    const request = allRequests[requestIndex];
    request.assignTo(assignedTo, assignedBy);
    
    allRequests[requestIndex] = request;
    this.saveAllRequests(allRequests);
    
    return request;
  }

  async addComment(requestId, comment, author) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    const requestIndex = allRequests.findIndex(req => req.id === requestId);
    
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }
    
    const request = allRequests[requestIndex];
    request.addComment(comment, author);
    
    allRequests[requestIndex] = request;
    this.saveAllRequests(allRequests);
    
    return request;
  }

  // Statistics
  async getStatistics(userId = null) {
    await this.delay();
    
    const allRequests = this.getAllRequests();
    let requests = allRequests;
    
    if (userId) {
      requests = allRequests.filter(req => req.requesterId === userId);
    }
    
    const stats = {
      total: requests.length,
      draft: requests.filter(req => req.status === REQUEST_STATUS.DRAFT).length,
      submitted: requests.filter(req => req.status === REQUEST_STATUS.SUBMITTED).length,
      inProgress: requests.filter(req => 
        [REQUEST_STATUS.UNDER_REVIEW, REQUEST_STATUS.VERIFIED, REQUEST_STATUS.APPROVED, REQUEST_STATUS.ASSIGNED, REQUEST_STATUS.IN_PROGRESS].includes(req.status)
      ).length,
      completed: requests.filter(req => req.status === REQUEST_STATUS.COMPLETED).length,
      rejected: requests.filter(req => req.status === REQUEST_STATUS.REJECTED).length
    };
    
    return stats;
  }
}

export default new ServiceRequestService();