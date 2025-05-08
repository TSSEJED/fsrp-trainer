document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const pdfEmbed = document.getElementById('pdf-embed');
    const pdfIframe = document.getElementById('pdf-iframe');
    const currentDocumentTitle = document.getElementById('current-document-title');
    const themeToggle = document.querySelector('.theme-toggle');
    const closeButton = document.getElementById('close-pdf');
    const viewButtons = document.querySelectorAll('.view-btn');
    const quickAccessButtons = document.querySelectorAll('.quick-access-btn');
    const fullTrainingBtn = document.getElementById('full-training-btn');
    const warningPolicyBtn = document.getElementById('warning-policy-btn');
    const joinGameBtn = document.getElementById('join-game-btn');
    
    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const toggleBall = document.querySelector('.toggle-ball');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            toggleBall.style.transform = 'translateX(30px)';
        } else {
            toggleBall.style.transform = 'translateX(0)';
        }
    }
    
    // Initialize theme
    initTheme();
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        
        // Update the toggle ball position
        const toggleBall = document.querySelector('.toggle-ball');
        if (document.body.classList.contains('dark-mode')) {
            toggleBall.style.transform = 'translateX(30px)';
        } else {
            toggleBall.style.transform = 'translateX(0)';
        }
    });
    
    // Check if device is mobile
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }
    
    // PDF Viewing Functions
    function openPdfViewer(pdfUrl, title) {
        // Set the title in the viewer
        currentDocumentTitle.textContent = title;
        
        // Show the PDF viewer
        pdfEmbed.classList.remove('hidden');
        
        // Get the open in browser link
        const openInBrowserLink = document.getElementById('open-in-browser');
        const mobilePdfMessage = document.getElementById('mobile-pdf-message');
        
        // Set the direct link for the "Open in Browser" button
        openInBrowserLink.href = pdfUrl;
        
        // Handle mobile devices differently
        if (isMobileDevice()) {
            // Show mobile controls
            document.querySelector('.mobile-pdf-controls').style.display = 'block';
            
            // For mobile devices, use direct PDF embedding
            // This works better than Google Docs Viewer in most cases
            pdfIframe.src = pdfUrl;
            
            // Show mobile message immediately
            mobilePdfMessage.classList.remove('hidden');
            setTimeout(() => {
                mobilePdfMessage.classList.add('hidden');
            }, 5000); // Hide after 5 seconds
        } else {
            // For desktop, use direct PDF embedding and hide mobile controls
            document.querySelector('.mobile-pdf-controls').style.display = 'none';
            pdfIframe.src = pdfUrl;
        }
        
        console.log('Opening PDF:', pdfUrl);
    }

    // Add click listeners to view buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pdfUrl = button.getAttribute('data-pdf');
            const title = button.getAttribute('data-title');
            
            if (pdfUrl && title) {
                openPdfViewer(pdfUrl, title);
            }
        });
    });
    
    // Close PDF viewer
    closeButton.addEventListener('click', () => {
        pdfEmbed.classList.add('hidden');
        pdfIframe.src = '';
    });
    
    // Quick access buttons
    fullTrainingBtn.addEventListener('click', () => {
        const pdfUrl = fullTrainingBtn.getAttribute('data-pdf');
        const title = fullTrainingBtn.getAttribute('data-title');
        if (pdfUrl && title) {
            openPdfViewer(pdfUrl, title);
        }
    });
    
    warningPolicyBtn.addEventListener('click', () => {
        const pdfUrl = warningPolicyBtn.getAttribute('data-pdf');
        const title = warningPolicyBtn.getAttribute('data-title');
        if (pdfUrl && title) {
            openPdfViewer(pdfUrl, title);
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (pdfEmbed.classList.contains('hidden')) return;
        
        if (e.key === 'Escape') {
            pdfEmbed.classList.add('hidden');
            pdfIframe.src = '';
        }
    });

    // Join Game button functionality
    joinGameBtn.addEventListener('click', () => {
        window.open('https://policeroleplay.community/join/AebBj', '_blank');
    });

    // Console Branding
    console.log('%cFSRP Trainers Portal', 'color: #3a86ff; font-size: 20px; font-weight: bold;');
    console.log('%cDesigned by Sejed TRABELLSSI | sejed.pages.dev', 'color: #8338ec; font-size: 12px;');
    
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable keyboard shortcuts for saving, printing, etc.
    document.addEventListener('keydown', function(e) {
        // Prevent Ctrl+S, Ctrl+P, Ctrl+Shift+I
        if ((e.ctrlKey && e.key === 's') || 
            (e.ctrlKey && e.key === 'p') || 
            (e.ctrlKey && e.shiftKey && e.key === 'i')) {
            e.preventDefault();
            return false;
        }
    });
});
