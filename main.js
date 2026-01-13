/**
 * Main JavaScript File
 * Handles general site functionality
 */

(function() {
    'use strict';
    
    // Initialize
    document.addEventListener('DOMContentLoaded', init);
    
    function init() {
        setupMobileMenu();
        setupSearchBox();
    }
    
    // Mobile Menu Toggle
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
            });
        }
    }
    
    // Load Recent Videos on Home Page
    
    // Render Video Cards
    function renderVideos(videos, container) {
        container.innerHTML = '';
        
        videos.forEach(video => {
            const videoCard = createVideoCard(video);
            container.appendChild(videoCard);
        });
    }
    
    // Create Video Card Element
    function createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card fade-in';
        
        card.innerHTML = `
            <a href="/v/${escapeHtml(video.video_id)}" class="video-thumbnail">
                <img src="assets/img/default-thumbnail.jpg" alt="${escapeHtml(video.title)}">
                ${video.duration ? `<span class="duration">${escapeHtml(video.duration)}</span>` : ''}
            </a>
            <div class="video-info">
                <h3>
                    <a href="/v/${escapeHtml(video.video_id)}">
                        ${escapeHtml(video.title)}
                    </a>
                </h3>
                <p class="video-meta">
                    <span>${formatNumber(video.views)} views</span>
                    <span>â€¢</span>
                    <span>${video.upload_date_formatted}</span>
                </p>
            </div>
        `;
        
        return card;
    }
    
    // Setup Search Box
    function setupSearchBox() {
        const searchForm = document.querySelector('.search-box');
        
        if (searchForm) {
            const form = searchForm.tagName === 'FORM' ? searchForm : searchForm.querySelector('form');
            
            if (form) {
                form.addEventListener('submit', (e) => {
                    const input = form.querySelector('input[type="text"]');
                    if (input && !input.value.trim()) {
                        e.preventDefault();
                        alert('Please enter a search term');
                    }
                });
            }
        }
    }
    
    // Utility Functions
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
    
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    // Format Bytes
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
})();
