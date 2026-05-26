// ========== HAMBURGER MENU ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Tutup menu saat klik link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ========== FILTER BUTTONS ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active dari semua button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter untuk halaman Rumus
            const formulaArticles = document.querySelectorAll('.formula-article');
            if (formulaArticles.length > 0) {
                formulaArticles.forEach(article => {
                    if (category === 'all' || article.getAttribute('data-category') === category) {
                        article.classList.remove('hidden');
                    } else {
                        article.classList.add('hidden');
                    }
                });
            }

            // Filter untuk halaman Shortcut
            const shortcutCategories = document.querySelectorAll('.shortcut-category');
            if (shortcutCategories.length > 0) {
                shortcutCategories.forEach(cat => {
                    if (category === 'all' || cat.getAttribute('data-category') === category) {
                        cat.classList.remove('hidden');
                    } else {
                        cat.classList.add('hidden');
                    }
                });
            }
        });
    });

    // ========== SEARCH FUNCTIONALITY ==========
    // Search untuk halaman Rumus
    const searchFormula = document.getElementById('searchFormula');
    if (searchFormula) {
        searchFormula.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const articles = document.querySelectorAll('.formula-article');

            articles.forEach(article => {
                const text = article.textContent.toLowerCase();
                if (text.includes(query)) {
                    article.classList.remove('hidden');
                } else {
                    article.classList.add('hidden');
                }
            });

            // Reset filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
        });
    }

    // Search untuk halaman Shortcut
    const searchShortcut = document.getElementById('searchShortcut');
    if (searchShortcut) {
        searchShortcut.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const items = document.querySelectorAll('.shortcut-item');
            const categories = document.querySelectorAll('.shortcut-category');

            if (query === '') {
                // Tampilkan semua jika kosong
                categories.forEach(cat => cat.classList.remove('hidden'));
                items.forEach(item => item.style.display = '');
            } else {
                categories.forEach(cat => cat.classList.remove('hidden'));
                
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(query)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Sembunyikan kategori yang semua itemnya tersembunyi
                categories.forEach(cat => {
                    const visibleItems = cat.querySelectorAll('.shortcut-item:not([style*="display: none"])');
                    if (visibleItems.length === 0) {
                        cat.classList.add('hidden');
                    }
                });
            }

            // Reset filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.filter-btn[data-category="all"]');
            if (allBtn) allBtn.classList.add('active');
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========== COPY CODE FUNCTION ==========
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✅ Tersalin!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(() => {
        // Fallback untuk browser lama
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const originalText = button.textContent;
        button.textContent = '✅ Tersalin!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    });
}
