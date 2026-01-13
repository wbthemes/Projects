/**
 * Upload Page JavaScript
 * Handles drag-and-drop, file selection, and upload progress
 */

(function() {
    'use strict';
    
    const MAX_FILES = 10;
    const MAX_FILE_SIZE = 53687091200; // 50GB in bytes
    const ALLOWED_TYPES = ['video/*'];
    const ALLOWED_EXTENSIONS = [
      'avi', 'mpeg', 'mp4', 'wmv', 'dv', 'rm', 'dat', 'wm', 'qt', 'divx',
        'm2v', 'ogm', 'vob', 'mpg', 'mpe', 'm2p', 'mov', '3gp', 'asf', 'flv',
    'm4v', 'm2ts', '3g2', 'evo', 'f4v', 'mkv', 'mcf', 'ts', 'mxf', 'ogg',
    'rmvb', 'webm', 'vcd', 'svcd'

    ];
    
    let selectedFiles = [];
    
    // DOM Elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const uploadForm = document.getElementById('uploadForm');
    const videoForms = document.getElementById('videoForms');
    const startUploadBtn = document.getElementById('startUpload');
    const clearAllBtn = document.getElementById('clearAll');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressList = document.getElementById('progressList');
    const uploadResults = document.getElementById('uploadResults');
    const resultsList = document.getElementById('resultsList');
    
    // Initialize
    init();
    
    function init() {
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Drop zone events
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);
        
        // Choose Files button (primary button)
        const chooseFilesBtn = document.getElementById('chooseFilesBtn');
        if (chooseFilesBtn) {
            chooseFilesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                fileInput.click();
            });
        }
        
        // Remote Upload button (secondary button)
        const remoteUploadBtn = document.getElementById('remoteUploadBtn');
        if (remoteUploadBtn) {
            remoteUploadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Remote upload functionality is handled in index.php
            });
        }
        
        // Drop zone click (entire area clickable except buttons)
        dropZone.addEventListener('click', (e) => {
            // Don't trigger if clicking on button or input
            if (e.target.closest('button') || e.target.closest('input')) return;
            fileInput.click();
        });
        
        // File input change
        fileInput.addEventListener('change', handleFileSelect);
        
        // Button events
        if (startUploadBtn) {
            startUploadBtn.addEventListener('click', startUpload);
        }
        
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', clearAllFiles);
        }
        
        // Prevent default drag behaviors on document
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => e.preventDefault());
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
        
        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    }
    
    function handleFileSelect(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        processFiles(files);
        
        // Reset file input to allow selecting same files again if needed
        e.target.value = '';
    }
    
    function processFiles(files) {
        // Filter video files
        const videoFiles = files.filter(file => {
            // Get file extension
            const extension = file.name.split('.').pop().toLowerCase();
            
            // Check by MIME type or extension
            const isValidType = file.type.startsWith('video/') || ALLOWED_EXTENSIONS.includes(extension);
            
            if (!isValidType) {
                console.log('Invalid file type:', file.name, 'MIME:', file.type, 'Extension:', extension);
                showNotification(`${file.name} is not a supported video format`, 'error');
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                showNotification(`${file.name} exceeds the 50GB limit`, 'error');
                return false;
            }
            return true;
        });
        
        // Check total file count
        if (selectedFiles.length + videoFiles.length > MAX_FILES) {
            showNotification(`You can only upload up to ${MAX_FILES} videos at once`, 'error');
            return;
        }
        
        // Add files to selection
        selectedFiles.push(...videoFiles);
        
        // Update UI
        updateFileList();
        showUploadForm();
    }
    
    function updateFileList() {
        if (selectedFiles.length === 0) {
            fileList.style.display = 'none';
            fileList.innerHTML = '';
            return;
        }
        
        fileList.style.display = 'block';
        fileList.innerHTML = '<h3>Selected Files (' + selectedFiles.length + '/' + MAX_FILES + ')</h3>';
        
        // Scroll to file list after a short delay
        setTimeout(() => {
            fileList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        selectedFiles.forEach((file, index) => {
            if (!file.privacy) {
                file.privacy = 'public'; // Default privacy
            }
            
            const displayTitle = file.title || file.name;
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item fade-in';
            fileItem.innerHTML = `
                <svg class="file-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M12 18v-6"></path>
                    <path d="m9 15 3 3 3-3"></path>
                </svg>
                <div class="file-item-info">
                    <div class="file-item-name" title="${escapeHtml(displayTitle)}">${escapeHtml(displayTitle)}</div>
                    <div class="file-item-size">${formatBytes(file.size)}</div>
                    <div class="file-item-privacy">
                        <span class="privacy-badge ${file.privacy}">${ucFirst(file.privacy)}</span>
                    </div>
                </div>
                <div class="file-item-actions">
                    <button type="button" class="file-item-settings" data-index="${index}" title="Video Settings">
                       <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path></g></svg>
                    </button>
                    <button type="button" class="file-item-remove" data-index="${index}" title="Remove">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            `;
            
            fileList.appendChild(fileItem);
            
            // Add settings event listener
            fileItem.querySelector('.file-item-settings').addEventListener('click', function() {
                showPrivacyModal(parseInt(this.dataset.index));
            });
            
            // Add remove event listener
            fileItem.querySelector('.file-item-remove').addEventListener('click', function() {
                removeFile(parseInt(this.dataset.index));
            });
        });
    }
    
    function removeFile(index) {
        selectedFiles.splice(index, 1);
        updateFileList();
        showUploadForm();
        
        if (selectedFiles.length === 0) {
            uploadForm.style.display = 'none';
        }
    }
    
    function showPrivacyModal(index) {
        const file = selectedFiles[index];
        const currentPrivacy = file.privacy || 'public';
        const currentPassword = file.password || '';
        const currentTitle = file.title || file.name.replace(/\.[^/.]+$/, '');
        
        const modal = document.createElement('div');
        modal.className = 'privacy-modal';
        modal.innerHTML = `
            <div class="privacy-modal-content">
                <div class="privacy-modal-header">
                    <h3>Video Settings</h3>
                    <button type="button" class="modal-close">&times;</button>
                </div>
                <div class="privacy-modal-body">
                    <p class="modal-filename"><strong>File:</strong> ${escapeHtml(file.name)}</p>
                    <div class="form-group">
                        <label>Video Title *</label>
                        <input type="text" id="modal_title" class="form-control" value="${escapeHtml(currentTitle)}" placeholder="Enter video title" required>
                    </div>
                    <div class="form-group">
                        <label>Privacy Level</label>
                        <select id="modal_privacy" class="form-control">
                            <option value="public" ${currentPrivacy === 'public' ? 'selected' : ''}>Public - Anyone can watch</option>
                            <option value="unlisted" ${currentPrivacy === 'unlisted' ? 'selected' : ''}>Unlisted - Only with link</option>
                            <option value="password" ${currentPrivacy === 'password' ? 'selected' : ''}>Password Protected</option>
                        </select>
                    </div>
                    <div class="form-group" id="modal_password_group" style="display: ${currentPrivacy === 'password' ? 'block' : 'none'};">
                        <label>Password *</label>
                        <input type="password" id="modal_password" class="form-control" value="${escapeHtml(currentPassword)}" placeholder="Enter password">
                    </div>
                </div>
                <div class="privacy-modal-footer">
                    <button type="button" class="btn btn-secondary modal-cancel">Cancel</button>
                    <button type="button" class="btn btn-primary modal-save">Save</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const privacySelect = modal.querySelector('#modal_privacy');
        const passwordGroup = modal.querySelector('#modal_password_group');
        
        privacySelect.addEventListener('change', function() {
            passwordGroup.style.display = this.value === 'password' ? 'block' : 'none';
        });
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-cancel').addEventListener('click', () => modal.remove());
        
        modal.querySelector('.modal-save').addEventListener('click', function() {
            const newTitle = modal.querySelector('#modal_title').value.trim();
            const newPrivacy = privacySelect.value;
            const newPassword = modal.querySelector('#modal_password').value;
            
            if (!newTitle) {
                alert('Please enter a video title');
                return;
            }
            
            if (newPrivacy === 'password' && !newPassword) {
                alert('Please enter a password');
                return;
            }
            
            selectedFiles[index].title = newTitle;
            selectedFiles[index].privacy = newPrivacy;
            if (newPrivacy === 'password') {
                selectedFiles[index].password = newPassword;
            } else {
                delete selectedFiles[index].password;
            }
            
            updateFileList();
            showUploadForm();
            modal.remove();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function showUploadForm() {
        if (selectedFiles.length === 0) {
            uploadForm.style.display = 'none';
            return;
        }
        
        uploadForm.style.display = 'block';
        videoForms.innerHTML = ''; // Keep empty, no individual forms needed
    }
    
    function clearAllFiles() {
        if (!confirm('Are you sure you want to clear all files?')) {
            return;
        }
        
        selectedFiles = [];
        updateFileList();
        uploadForm.style.display = 'none';
    }
    
    async function startUpload() {
        // Validate files
        let isValid = true;
        
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            
            // Set default title if not set
            if (!file.title) {
                file.title = file.name.replace(/\.[^/.]+$/, '');
            }
            
            if (!file.title.trim()) {
                showNotification(`Please set a title for video ${i + 1} using settings icon`, 'error');
                isValid = false;
                break;
            }
            
            if (file.privacy === 'password' && !file.password) {
                showNotification(`Please set a password for video ${i + 1}`, 'error');
                isValid = false;
                break;
            }
        }
        
        if (!isValid) return;
        
        // Store files to upload (create a copy)
        const filesToUpload = [...selectedFiles];
        
        // Reset upload box immediately
        resetUploadBox();
        
        // Hide forms and show progress
        fileList.style.display = 'none';
        uploadForm.style.display = 'none';
        uploadProgress.style.display = 'block';
        progressList.innerHTML = '';
        
        // Add upload status header
        const statusHeader = document.createElement('div');
        statusHeader.className = 'upload-status-header';
        statusHeader.innerHTML = `
            <div class="status-main">
                <div class="status-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                </div>
                <div class="status-text">
                    <h3>Uploading Videos</h3>
                    <p class="status-current">Processing <span id="currentUpload">0</span> of <span id="totalUploads">${filesToUpload.length}</span></p>
                    <div class="status-progress">
                        <div class="status-progress-bar">
                            <div class="status-progress-fill" id="overallProgressFill"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="status-badges">
                <span class="badge badge-success">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span id="completedUploads">0</span> Completed
                </span>
                <span class="badge badge-error">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span id="failedUploads">0</span> Failed
                </span>
            </div>
        `;
        progressList.appendChild(statusHeader);
        
        // Create completed section
        const completedSection = document.createElement('div');
        completedSection.id = 'completedSection';
        completedSection.className = 'completed-section';
        progressList.appendChild(completedSection);
        
        // Create uploading section
        const uploadingSection = document.createElement('div');
        uploadingSection.id = 'uploadingSection';
        uploadingSection.className = 'uploading-section';
        progressList.appendChild(uploadingSection);
        
        // Create progress items for all files and upload them in parallel
        const progressItems = filesToUpload.map((file, index) => {
            const progressItem = createProgressItem(file, index);
            uploadingSection.appendChild(progressItem);
            return progressItem;
        });

        const results = new Array(filesToUpload.length);
        let completedCount = 0;
        let failedCount = 0;

        const uploadPromises = filesToUpload.map((file, index) => {
            const progressItem = progressItems[index];
            return uploadFile(file, index, progressItem).then(result => {
                results[index] = result;

                if (result && result.success) {
                    completedCount++;
                } else {
                    failedCount++;
                }

                const processed = completedCount + failedCount;
                const currentEl = document.getElementById('currentUpload');
                const completedEl = document.getElementById('completedUploads');
                const failedEl = document.getElementById('failedUploads');
                const overallFillEl = document.getElementById('overallProgressFill');
                if (currentEl) currentEl.textContent = processed;
                if (completedEl) completedEl.textContent = completedCount;
                if (failedEl) failedEl.textContent = failedCount;

                if (overallFillEl) {
                    const total = filesToUpload.length || 1;
                    const overallPercent = Math.max(0, Math.min(100, Math.round((processed / total) * 100)));
                    overallFillEl.style.width = overallPercent + '%';
                }

                if (progressItem && progressItem.parentNode === uploadingSection) {
                    completedSection.appendChild(progressItem);
                }

                return result;
            });
        });

        await Promise.all(uploadPromises);

        // Show results summary
        showResults(results);
    }
    
    // Helper function to get video duration
    function getVideoDuration(file) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            
            video.onloadedmetadata = function() {
                window.URL.revokeObjectURL(video.src);
                const duration = Math.floor(video.duration);
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;
                resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`);
            };
            
            video.onerror = function() {
                reject('Could not load video metadata');
            };
            
            video.src = URL.createObjectURL(file);
        });
    }
    
    async function uploadFile(file, index, progressItem) {
        if (!progressItem) {
            console.error('Progress item not found for index:', index);
            return { success: false, error: 'Progress item not found', file: file };
        }

        // Mark this row as actively uploading (enables animated styling)
        progressItem.classList.add('is-uploading');
        
        // Get video duration
        let videoDuration = null;
        try {
            videoDuration = await getVideoDuration(file);
        } catch (e) {
            console.log('Could not get video duration:', e);
        }
        
        // First, create database entry and get upload URL
        const formData = new FormData();
        formData.append('filename', file.name);
        formData.append('title', file.title || file.name.replace(/\.[^/.]+$/, ''));
        formData.append('privacy', file.privacy || 'public');
        
        if (file.privacy === 'password' && file.password) {
            formData.append('password', file.password);
        }
        
        try {
            // Dynamic waiting messages
            const waitingMessages = [
                'Looking for nearest server...',
                'Connecting to upload server...',
                'Preparing upload session...',
                'Initializing secure connection...'
            ];
            let messageIndex = 0;
            
            // Update message every 1 second
            const messageInterval = setInterval(() => {
                if (messageIndex < waitingMessages.length) {
                    updateProgressItem(progressItem, 0, 'uploading', waitingMessages[messageIndex]);
                    messageIndex++;
                }
            }, 1000);
            
            const serverFormData = new FormData();
            serverFormData.append('filename', file.name);
            serverFormData.append('title', file.title || file.name.replace(/\.[^/.]+$/, ''));
            // Use global token generation function from index.php
            if (typeof window.generateClientToken === 'function') {
                serverFormData.append('client_token', window.generateClientToken());
            } else {
                console.error('Token generation function not found');
            }
            
            const serverResponse = await fetch('/get-video-server', {
                method: 'POST',
                body: serverFormData
            });
            
            // Clear message interval
            clearInterval(messageInterval);
            
            const serverResult = await serverResponse.json();
            
            if (serverResult.status !== 'success') {
                updateProgressItem(progressItem, 0, 'error', serverResult.message || 'Failed to get upload server');
                progressItem.classList.remove('is-uploading');
                return { success: false, error: serverResult.message, file: file };
            }
            
            // Step 2: Upload video in chunks to the returned URL (OPTIMIZED MODE)
            const uploadUrl = serverResult.upload_url;
            const fileId = serverResult.file_id || null; // Get fileId from server response
            
            // Fixed chunk size for consistent performance
            const chunkSize = 2 * 1024 * 1024; // 2MB chunks for all file sizes
            
            const totalChunks = Math.ceil(file.size / chunkSize);
            const maxConcurrent = 12; // Increased concurrent uploads
            let uploadedChunks = 0;
            let failedChunks = new Set();
            
            // Time tracking for ETA calculation - using bytes instead of chunks for accuracy
            const uploadStartTime = Date.now();
            let lastProgressUpdate = uploadStartTime;
            let bytesUploadedAtLastUpdate = 0;
            const speedSamples = []; // Track recent speed samples for smoothing
            
            // Function to upload a single chunk with retry logic
            let lastChunkResponse = null; // Store last chunk response
            
            const uploadChunk = async (chunkIndex, retryCount = 0) => {
                const maxRetries = 3;
                const start = (chunkIndex - 1) * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);
                
                // Determine if this is the last chunk
                const isLastChunk = (chunkIndex === totalChunks);
                
                const chunkStartTime = Date.now();
                
                try {
                    // Create FormData with chunk and metadata
                    const chunkFormData = new FormData();
                    chunkFormData.append('chunk', chunk);
                    chunkFormData.append('chunkIndex', chunkIndex);
                    chunkFormData.append('totalChunks', totalChunks);
                    chunkFormData.append('filename', file.name);
                    
                    // Add fileId if available (for regular chunk uploads)
                    if (fileId) {
                        chunkFormData.append('file_id', fileId);
                    }
                    
                    // Add title and privacy on last chunk
                    if (isLastChunk) {
                        chunkFormData.append('title', file.title || file.name.replace(/\.[^/.]+$/, ''));
                        chunkFormData.append('privacy', file.privacy || 'public');
                        
                        if (file.privacy === 'password' && file.password) {
                            chunkFormData.append('password', file.password);
                        }
                        
                        if (videoDuration) {
                            chunkFormData.append('duration', videoDuration);
                        }
                    }
                    
                    // Upload chunk with timeout
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
                    
                    const chunkResponse = await fetch(uploadUrl, {
                        method: 'POST',
                        body: chunkFormData,
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (!chunkResponse.ok) {
                        throw new Error(`HTTP ${chunkResponse.status}`);
                    }
                    
                    // If this is the last chunk, parse and store the response
                    if (isLastChunk) {
                        try {
                            lastChunkResponse = await chunkResponse.json();
                        } catch (e) {
                            console.log('Could not parse last chunk response as JSON');
                        }
                    }
                    
                    // Update progress atomically
                    uploadedChunks++;
                    const progress = Math.round((uploadedChunks / totalChunks) * 100);
                    
                    // Calculate upload speed and time remaining with smoothing
                    const currentTime = Date.now();
                    const totalElapsedTime = (currentTime - uploadStartTime) / 1000; // in seconds
                    
                    // Calculate actual bytes uploaded (more accurate than chunk count)
                    const bytesUploaded = Math.min(uploadedChunks * chunkSize, file.size);
                    const bytesRemaining = file.size - bytesUploaded;
                    
                    // Calculate current upload speed based on total time
                    const overallSpeed = bytesUploaded / totalElapsedTime; // bytes per second
                    
                    // Calculate recent speed (last 500ms) for more responsive updates
                    const timeSinceLastUpdate = (currentTime - lastProgressUpdate) / 1000;
                    if (timeSinceLastUpdate >= 0.5) { // Update every 500ms minimum
                        const bytesSinceLastUpdate = bytesUploaded - bytesUploadedAtLastUpdate;
                        const recentSpeed = bytesSinceLastUpdate / timeSinceLastUpdate;
                        
                        // Add to speed samples for smoothing
                        speedSamples.push(recentSpeed);
                        if (speedSamples.length > 5) {
                            speedSamples.shift(); // Keep only last 5 samples
                        }
                        
                        lastProgressUpdate = currentTime;
                        bytesUploadedAtLastUpdate = bytesUploaded;
                    }
                    
                    // Use weighted average: 70% overall speed, 30% recent speed
                    let displaySpeed = overallSpeed;
                    if (speedSamples.length > 0) {
                        const avgRecentSpeed = speedSamples.reduce((a, b) => a + b, 0) / speedSamples.length;
                        displaySpeed = (overallSpeed * 0.7) + (avgRecentSpeed * 0.3);
                    }
                    
                    // Calculate time remaining based on speed
                    // Use overall speed for consistency, but minimum of recent speed for safety
                    const speedForETA = Math.max(overallSpeed * 0.8, displaySpeed * 0.5); // Conservative estimate
                    const estimatedTimeRemaining = bytesRemaining / speedForETA; // in seconds
                    
                    const speedText = formatSpeed(displaySpeed);
                    
                    // Format time remaining with better accuracy
                    let timeRemainingText = '';
                    if (uploadedChunks > 3 && estimatedTimeRemaining > 0) { // Show after 3 chunks
                        if (estimatedTimeRemaining < 60) {
                            const secs = Math.max(1, Math.ceil(estimatedTimeRemaining));
                            timeRemainingText = ` - ${secs}s left`;
                        } else if (estimatedTimeRemaining < 3600) {
                            const minutes = Math.floor(estimatedTimeRemaining / 60);
                            const seconds = Math.ceil(estimatedTimeRemaining % 60);
                            if (seconds === 60) {
                                timeRemainingText = ` - ${minutes + 1}m left`;
                            } else if (seconds > 0 && minutes < 5) {
                                timeRemainingText = ` - ${minutes}m ${seconds}s left`;
                            } else {
                                timeRemainingText = ` - ${minutes}m left`;
                            }
                        } else {
                            const hours = Math.floor(estimatedTimeRemaining / 3600);
                            const minutes = Math.floor((estimatedTimeRemaining % 3600) / 60);
                            timeRemainingText = ` - ${hours}h ${minutes}m left`;
                        }
                    }
                    
                    updateProgressItem(progressItem, progress, 'uploading', `Uploading... ${progress}%  ${speedText}${timeRemainingText}`);
                    
                    return chunkIndex;
                    
                } catch (error) {
                    // Retry logic
                    if (retryCount < maxRetries) {
                        console.log(`Retrying chunk ${chunkIndex} (attempt ${retryCount + 1}/${maxRetries})`);
                        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
                        return uploadChunk(chunkIndex, retryCount + 1);
                    } else {
                        failedChunks.add(chunkIndex);
                        throw new Error(`Chunk ${chunkIndex} failed after ${maxRetries} retries: ${error.message}`);
                    }
                }
            };
            
            // Step 2a: Upload first chunk sequentially to initialize server
            updateProgressItem(progressItem, 0, 'uploading', 'Initializing upload...');
            try {
                await uploadChunk(1);
            } catch (error) {
                throw new Error(`Failed to initialize upload: ${error.message}`);
            }
            
            // Step 2b: Upload remaining chunks in parallel with concurrency limit
            if (totalChunks > 1) {
                const chunkQueue = [];
                for (let i = 2; i <= totalChunks; i++) {
                    chunkQueue.push(i);
                }
                
                // Process chunks in parallel batches
                while (chunkQueue.length > 0) {
                    const batch = chunkQueue.splice(0, maxConcurrent);
                    const results = await Promise.allSettled(batch.map(chunkIndex => uploadChunk(chunkIndex)));
                    
                    // Check for failures
                    const failures = results.filter(r => r.status === 'rejected');
                    if (failures.length > 0 && failedChunks.size > 3) {
                        // If more than 3 chunks fail, abort the upload
                        throw new Error(`Too many chunk failures (${failedChunks.size} chunks failed)`);
                    }
                }
            }
            
            // All chunks uploaded - server will handle the response
            updateProgressItem(progressItem, 100, 'success', 'Upload complete!');
            progressItem.classList.remove('is-uploading');
            
            // Check if we got response from last chunk
            if (lastChunkResponse && lastChunkResponse.success) {
                // Add thumbnail and action buttons if available
                if (lastChunkResponse.thumbnail) {
                    addThumbnailToProgress(progressItem, lastChunkResponse.thumbnail);
                }
                if (lastChunkResponse.watch_url && lastChunkResponse.delete_url) {
                    addActionButtonsToProgress(progressItem, lastChunkResponse.watch_url, lastChunkResponse.delete_url);
                }
                return { success: true, data: lastChunkResponse, file: file };
            }
            
            // If no response from server, return basic success
            return { success: true, file: file };
            
        } catch (error) {
            updateProgressItem(progressItem, 0, 'error', error.message || 'Network error');
            progressItem.classList.remove('is-uploading');
            return { success: false, error: error.message, file: file };
        }
    }
    
    function createProgressItem(file, index) {
        const div = document.createElement('div');
        div.className = 'progress-item fade-in';
        div.innerHTML = `
            <div class="progress-item-content">
                <div class="progress-thumbnail">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                </div>
                <div class="progress-details">
                    <div class="progress-header">
                        <span>${escapeHtml(file.name)}</span>
                        <span class="progress-percentage">0%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: 0%"></div>
                    </div>
                    <div class="progress-status">Preparing...</div>
                </div>
            </div>
        `;
        return div;
    }
    
    function updateProgressItem(progressItem, percentage, status, message) {
        const progressBar = progressItem.querySelector('.progress-bar');
        const progressPercentage = progressItem.querySelector('.progress-percentage');
        const progressStatus = progressItem.querySelector('.progress-status');
        
        progressBar.style.width = percentage + '%';
        progressPercentage.textContent = percentage + '%';
        progressStatus.textContent = message;
        progressStatus.className = 'progress-status ' + status;

        if (typeof percentage === 'number') {
            try {
                progressItem.style.setProperty('--row-progress', percentage + '%');
            } catch (e) {
                // ignore style errors
            }
        }
    }
    
    function addThumbnailToProgress(progressItem, thumbnailUrl) {
        if (!thumbnailUrl) return;
        
        const thumbnailDiv = progressItem.querySelector('.progress-thumbnail');
        if (thumbnailDiv) {
            thumbnailDiv.innerHTML = `<img src="${thumbnailUrl}" alt="Video thumbnail" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" onerror="this.style.display='none';">`;
        }
    }
    
    function addActionButtonsToProgress(progressItem, watchUrl, deleteUrl) {
        // Check if buttons already exist
        if (progressItem.querySelector('.action-btns-progress')) return;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'action-btns-progress';
        actionsDiv.style.cssText = 'display: flex; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap;';
        
        actionsDiv.innerHTML = `
            <a href="${escapeHtml(watchUrl)}" target="_blank" title="Watch Video" style="padding: 0.75rem; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); border: none; border-radius: 8px; color: #fff; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            </a>
            <button class="btn btn-secondary" onclick="copyToClipboard('${watchUrl}')" style="flex: 1; min-width: 150px; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy Link</span>
            </button>
            <button class="btn btn-danger" onclick="copyToClipboard('${escapeHtml(deleteUrl)}')" style="flex: 1; min-width: 150px; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy Delete Link</span>
            </button>
        `;
        
        const contentDiv = progressItem.querySelector('.progress-item-content') || progressItem;
        contentDiv.appendChild(actionsDiv);
    }
    
    function resetUploadBox() {
        // Clear selected files
        selectedFiles = [];
        
        // Reset file input
        if (fileInput) {
            fileInput.value = '';
        }
        
        // Clear file list
        if (fileList) {
            fileList.innerHTML = '';
        }
        
        // Hide upload form
        if (uploadForm) {
            uploadForm.style.display = 'none';
        }
        
        // Clear video forms
        if (videoForms) {
            videoForms.innerHTML = '';
        }
    }
    
    function showResults(results) {
        // Keep uploadProgress visible, just show results summary
        uploadResults.style.display = 'block';
        resultsList.innerHTML = '';
        
        const successCount = results.filter(r => r.success).length;
        const failCount = results.length - successCount;
        
        // Collect all successful video links
        const successfulLinks = results.filter(r => r.success).map(r => r.data.watch_url);
        const allDeleteLinks = results.filter(r => r.success).map(r => r.data.delete_url);
        
      
        // Store links globally for copy all functions
        window.uploadedVideoLinks = successfulLinks;
        window.uploadedDeleteLinks = allDeleteLinks;
    }
    
    // Utility functions
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
    function formatSpeed(bytesPerSecond) {
        if (bytesPerSecond === 0) return '0 KB/s';
        
        const k = 1024;
        const speeds = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
        const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k));
        const speed = (bytesPerSecond / Math.pow(k, i)).toFixed(1);
        
        return speed + ' ' + speeds[i];
    }
    
    function encodeRFC5987(str) {
        // Encode filename for HTTP headers (RFC 5987)
        // This allows UTF-8 characters in headers
        return encodeURIComponent(str)
            .replace(/['()]/g, escape)
            .replace(/\*/g, '%2A')
            .replace(/%(?:7C|60|5E)/g, unescape);
    }
    
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // Copy to clipboard function
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            }).catch(err => {
                // Fallback
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    };
    
    // Copy all watch links function
    window.copyAllLinks = function() {
        if (window.uploadedVideoLinks && window.uploadedVideoLinks.length > 0) {
            const allLinks = window.uploadedVideoLinks.join('\n');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(allLinks).then(() => {
                    showNotification(`${window.uploadedVideoLinks.length} watch links copied to clipboard!`, 'success');
                }).catch(err => {
                    fallbackCopyToClipboard(allLinks);
                });
            } else {
                fallbackCopyToClipboard(allLinks);
            }
        }
    };
    
    // Copy all delete links function
    window.copyAllDeleteLinks = function() {
        if (window.uploadedDeleteLinks && window.uploadedDeleteLinks.length > 0) {
            const allLinks = window.uploadedDeleteLinks.join('\n');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(allLinks).then(() => {
                    showNotification(`${window.uploadedDeleteLinks.length} delete links copied to clipboard!`, 'success');
                }).catch(err => {
                    fallbackCopyToClipboard(allLinks);
                });
            } else {
                fallbackCopyToClipboard(allLinks);
            }
        }
    };
    
    // Fallback copy function for older browsers
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification('Link copied to clipboard!', 'success');
            } else {
                showNotification('Failed to copy link', 'error');
            }
        } catch (err) {
            showNotification('Failed to copy link', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    function showNotification(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Get icon based on type
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                break;
            case 'error':
                icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
                break;
            case 'warning':
                icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
                break;
            default:
                icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        }
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">${escapeHtml(message)}</div>
            <button class="toast-close" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Add close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            removeToast(toast);
        });
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            removeToast(toast);
        }, 4000);
    }
    
    function removeToast(toast) {
        if (!toast || !toast.parentElement) return;
        
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }
    
})();
