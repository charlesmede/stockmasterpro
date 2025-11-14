// GestionStock Pro - Main JavaScript File
// Application de gestion des stocks et ventes

class GestionStockApp {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.companyData = {};
        this.products = [];
        this.stockMovements = [];
        this.sales = [];
        this.categories = [
            'Alimentation', 'Électronique', 'Vêtements', 'Cosmétiques', 
            'Maison & Jardin', 'Automobile', 'Santé', 'Éducation', 'Autre'
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStoredData();
        this.initializeAnimations();
        this.createBackgroundEffect();
        this.checkExistingCompany();
    }

    setupEventListeners() {
        // Registration modal
        document.getElementById('startNowBtn')?.addEventListener('click', () => this.openRegistrationModal());
        document.getElementById('registerBtn')?.addEventListener('click', () => this.openRegistrationModal());
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeRegistrationModal());
        document.getElementById('loginBtn')?.addEventListener('click', () => this.showLoginForm());

        // Registration form navigation
        document.getElementById('nextBtn')?.addEventListener('click', () => this.nextStep());
        document.getElementById('prevBtn')?.addEventListener('click', () => this.prevStep());
        document.getElementById('registrationForm')?.addEventListener('submit', (e) => this.handleRegistration(e));

        // Logo upload
        document.getElementById('logoPreview')?.addEventListener('click', () => {
            document.getElementById('logoInput').click();
        });
        document.getElementById('logoInput')?.addEventListener('change', (e) => this.handleLogoUpload(e));

        // Form validation
        document.querySelectorAll('input[required], select[required]').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    createBackgroundEffect() {
        // P5.js background animation
        if (typeof p5 !== 'undefined' && document.getElementById('p5-container')) {
            new p5((p) => {
                let particles = [];
                
                p.setup = () => {
                    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                    canvas.parent('p5-container');
                    canvas.id('p5-canvas');
                    
                    // Create particles
                    for (let i = 0; i < 50; i++) {
                        particles.push({
                            x: p.random(p.width),
                            y: p.random(p.height),
                            size: p.random(2, 8),
                            speedX: p.random(-0.5, 0.5),
                            speedY: p.random(-0.5, 0.5),
                            opacity: p.random(0.1, 0.3)
                        });
                    }
                };
                
                p.draw = () => {
                    p.clear();
                    
                    // Update and draw particles
                    particles.forEach(particle => {
                        particle.x += particle.speedX;
                        particle.y += particle.speedY;
                        
                        // Wrap around edges
                        if (particle.x < 0) particle.x = p.width;
                        if (particle.x > p.width) particle.x = 0;
                        if (particle.y < 0) particle.y = p.height;
                        if (particle.y > p.height) particle.y = 0;
                        
                        // Draw particle
                        p.fill(255, 255, 255, particle.opacity * 255);
                        p.noStroke();
                        p.circle(particle.x, particle.y, particle.size);
                    });
                };
                
                p.windowResized = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight);
                };
            });
        }
    }

    initializeAnimations() {
        // Animate hero elements on load
        anime({
            targets: '.hero-bg h1',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeOutQuart',
            delay: 300
        });

        anime({
            targets: '.hero-bg p',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutQuart',
            delay: 600
        });

        anime({
            targets: '.hero-bg button',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            easing: 'easeOutBack',
            delay: 900
        });

        // Animate feature cards
        anime({
            targets: '.hero-bg .card-hover',
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            easing: 'easeOutQuart',
            delay: anime.stagger(200, {start: 1200})
        });
    }

    openRegistrationModal() {
        document.getElementById('registrationModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        anime({
            targets: '#registrationModal .bg-white',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
    }

    closeRegistrationModal() {
        anime({
            targets: '#registrationModal .bg-white',
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInBack',
            complete: () => {
                document.getElementById('registrationModal').classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    showLoginForm() {
        // Simple login form (for existing users)
        const email = prompt('Email de connexion:');
        const password = prompt('Mot de passe:');
        
        if (email && password) {
            this.handleLogin(email, password);
        }
    }

    handleLogin(email, password) {
        const storedData = localStorage.getItem('gestionstock_company');
        if (storedData) {
            const companyData = JSON.parse(storedData);
            if (companyData.email === email) {
                // In a real app, you'd verify the password hash
                this.redirectToDashboard();
            } else {
                alert('Email ou mot de passe incorrect');
            }
        } else {
            alert('Aucune entreprise enregistrée. Veuillez vous inscrire.');
        }
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStepDisplay();
                this.animateStepTransition();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
            this.animateStepTransition();
        }
    }

    updateStepDisplay() {
        // Update step indicators
        for (let i = 1; i <= this.totalSteps; i++) {
            const indicator = document.getElementById(`step${i}Indicator`);
            const section = document.getElementById(`step${i}`);
            
            if (i < this.currentStep) {
                indicator.className = 'step-indicator step-completed';
                indicator.innerHTML = '<i class="fas fa-check text-sm"></i>';
            } else if (i === this.currentStep) {
                indicator.className = 'step-indicator step-active';
                indicator.textContent = i;
            } else {
                indicator.className = 'step-indicator step-inactive';
                indicator.textContent = i;
            }
            
            // Show/hide form sections
            if (i === this.currentStep) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        }

        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        prevBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
        
        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    animateStepTransition() {
        anime({
            targets: '.form-section.active',
            opacity: [0, 1],
            translateX: [20, 0],
            duration: 400,
            easing: 'easeOutQuart'
        });
    }

    validateCurrentStep() {
        const currentSection = document.getElementById(`step${this.currentStep}`);
        const requiredFields = currentSection.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Ce champ est obligatoire';
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Email invalide';
                isValid = false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                errorMessage = 'Numéro de téléphone invalide';
                isValid = false;
            }
        }

        // Password confirmation
        if (field.id === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (value !== password) {
                errorMessage = 'Les mots de passe ne correspondent pas';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('border-red-500');
        
        // Create or update error message
        let errorDiv = field.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    handleLogoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Le fichier est trop volumineux. Maximum 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const logoPreview = document.getElementById('logoPreview');
                logoPreview.innerHTML = `<img src="${e.target.result}" alt="Logo">`;
                this.companyData.logo = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    handleRegistration(event) {
        event.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }

        // Collect all form data
        const formData = new FormData(event.target);
        const companyData = {
            id: this.generateId(),
            name: formData.get('companyName') || document.getElementById('companyName').value,
            registration: formData.get('companyReg') || document.getElementById('companyReg').value,
            taxNumber: formData.get('taxNumber') || document.getElementById('taxNumber').value,
            sector: formData.get('businessSector') || document.getElementById('businessSector').value,
            description: formData.get('businessDescription') || document.getElementById('businessDescription').value,
            phone: formData.get('companyPhone') || document.getElementById('companyPhone').value,
            email: formData.get('companyEmail') || document.getElementById('companyEmail').value,
            address: formData.get('companyAddress') || document.getElementById('companyAddress').value,
            logo: this.companyData.logo || null,
            currency: formData.get('currency') || document.getElementById('currency').value,
            tvaRate: parseFloat(formData.get('tvaRate') || document.getElementById('tvaRate').value),
            password: formData.get('password') || document.getElementById('password').value,
            createdAt: new Date().toISOString(),
            settings: {
                lowStockAlert: true,
                autoBackup: false,
                theme: 'light'
            }
        };

        // Save company data
        localStorage.setItem('gestionstock_company', JSON.stringify(companyData));
        
        // Initialize default data
        this.initializeDefaultData(companyData.id);
        
        // Show success message
        this.showSuccessMessage();
        
        // Redirect to dashboard after delay
        setTimeout(() => {
            this.redirectToDashboard();
        }, 2000);
    }

    initializeDefaultData(companyId) {
        // Initialize empty arrays for data storage
        const initialData = {
            products: [],
            stockMovements: [],
            sales: [],
            customers: [],
            suppliers: [],
            categories: this.categories
        };

        // Store in localStorage with company prefix
        Object.keys(initialData).forEach(key => {
            localStorage.setItem(`gestionstock_${key}_${companyId}`, JSON.stringify(initialData[key]));
        });
    }

    showSuccessMessage() {
        const modal = document.getElementById('registrationModal');
        const modalContent = modal.querySelector('.bg-white');
        
        modalContent.innerHTML = `
            <div class="p-8 text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-3xl text-green-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Félicitations!</h3>
                <p class="text-gray-600 mb-6">Votre espace de gestion a été créé avec succès.</p>
                <p class="text-sm text-gray-500">Redirection vers le tableau de bord...</p>
                <div class="mt-4">
                    <div class="w-16 h-1 bg-green-600 rounded-full mx-auto animate-pulse"></div>
                </div>
            </div>
        `;
    }

    redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }

    checkExistingCompany() {
        const existingCompany = localStorage.getItem('gestionstock_company');
        if (existingCompany) {
            // Update UI for existing user
            const registerBtn = document.getElementById('registerBtn');
            if (registerBtn) {
                registerBtn.textContent = 'Tableau de bord';
                registerBtn.onclick = () => this.redirectToDashboard();
            }
        }
    }

    loadStoredData() {
        const companyData = localStorage.getItem('gestionstock_company');
        if (companyData) {
            this.companyData = JSON.parse(companyData);
            this.loadCompanyData();
        }
    }

    loadCompanyData() {
        const companyId = this.companyData.id;
        this.products = JSON.parse(localStorage.getItem(`gestionstock_products_${companyId}`) || '[]');
        this.stockMovements = JSON.parse(localStorage.getItem(`gestionstock_stockMovements_${companyId}`) || '[]');
        this.sales = JSON.parse(localStorage.getItem(`gestionstock_sales_${companyId}`) || '[]');
        this.categories = JSON.parse(localStorage.getItem(`gestionstock_categories_${companyId}`) || JSON.stringify(this.categories));
    }

    generateId() {
        return 'comp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Utility methods
    formatCurrency(amount, currency = 'FCFA') {
        const formatter = new Intl.NumberFormat('fr-TG', {
            style: 'currency',
            currency: currency === 'FCFA' ? 'XOF' : currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        return formatter.format(amount);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('fr-FR');
    }

    calculateTVA(amount, tvaRate) {
        return amount * (tvaRate / 100);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' :
                    type === 'warning' ? 'fa-exclamation-triangle' :
                    'fa-info-circle'
                } mr-2"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });

        // Remove after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => notification.remove()
            });
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gestionStockApp = new GestionStockApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GestionStockApp;
}