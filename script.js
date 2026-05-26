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
            const items = document.querySelectorAll('.shortcut-item-interactive');
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
                    const visibleItems = cat.querySelectorAll('.shortcut-item-interactive:not([style*="display: none"])');
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

// ========== TOGGLE DEMO FOR SHORTCUT ITEMS ==========
function toggleDemo(element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        element.classList.add('active');
    }
}

// ========== QUIZ FUNCTION ==========
function checkQuiz(button) {
    const question = button.closest('.quiz-question');
    const correctAnswer = question.getAttribute('data-correct');
    const selectedAnswer = button.getAttribute('data-answer');
    const feedback = question.querySelector('.quiz-feedback');
    const allBtns = question.querySelectorAll('.quiz-btn');

    allBtns.forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct');
        feedback.textContent = '✅ Benar! Jawaban kamu tepat.';
        feedback.style.color = '#155724';
    } else {
        button.classList.add('wrong');
        allBtns.forEach(btn => {
            if (btn.getAttribute('data-answer') === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        feedback.textContent = '❌ Salah. Jawaban yang benar ditandai hijau.';
        feedback.style.color = '#721c24';
    }
}

// ========== LIVE SEARCH (Homepage) ==========
const liveSearch = document.getElementById('liveSearch');
if (liveSearch) {
    const searchData = [
        { title: 'IF - Fungsi Logika', url: 'rumus.html#if', category: 'Rumus' },
        { title: 'VLOOKUP - Pencarian Vertikal', url: 'rumus.html#vlookup', category: 'Rumus' },
        { title: 'HLOOKUP - Pencarian Horizontal', url: 'rumus.html#hlookup', category: 'Rumus' },
        { title: 'XLOOKUP - Pencarian Modern', url: 'rumus.html#xlookup', category: 'Rumus' },
        { title: 'INDEX + MATCH', url: 'rumus.html#indexmatch', category: 'Rumus' },
        { title: 'SUMIF - Jumlah Bersyarat', url: 'rumus.html#sumif', category: 'Rumus' },
        { title: 'COUNTIF - Hitung Bersyarat', url: 'rumus.html#countif', category: 'Rumus' },
        { title: 'IFERROR - Penanganan Error', url: 'rumus.html#iferror', category: 'Rumus' },
        { title: 'Nested IF, AND, OR', url: 'rumus.html#nestedif', category: 'Rumus' },
        { title: 'TRIM, PROPER, UPPER, LOWER', url: 'rumus.html#trim', category: 'Rumus' },
        { title: 'CONCATENATE / CONCAT', url: 'rumus.html#concatenate', category: 'Rumus' },
        { title: 'LEFT, RIGHT, MID', url: 'rumus.html#leftmid', category: 'Rumus' },
        { title: 'Fungsi Tanggal (TODAY, DATEDIF)', url: 'rumus.html#tanggal', category: 'Rumus' },
        { title: 'EOMONTH dan NETWORKDAYS', url: 'rumus.html#eomonth', category: 'Rumus' },
        { title: 'Pivot Table', url: 'visualisasi.html#pivot', category: 'Visualisasi' },
        { title: 'Shortcut Navigasi', url: 'shortcut.html', category: 'Shortcut' },
        { title: 'Shortcut Copy Paste', url: 'shortcut.html', category: 'Shortcut' },
        { title: 'Shortcut Format', url: 'shortcut.html', category: 'Shortcut' },
        { title: 'Sorting dan Filtering', url: 'olahdata.html', category: 'Olah Data' },
        { title: 'Data Validation', url: 'olahdata.html', category: 'Olah Data' },
        { title: 'Format Cell', url: 'dasar.html', category: 'Dasar' },
        { title: 'Freeze Panes', url: 'dasar.html', category: 'Dasar' },
        { title: 'Chart dan Grafik', url: 'visualisasi.html', category: 'Visualisasi' },
        { title: 'Download Template Latihan', url: 'latihan.html', category: 'Latihan' },
    ];

    const searchResults = document.getElementById('searchResults');

    liveSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            searchResults.innerHTML = results.slice(0, 8).map(item =>
                '<a href="' + item.url + '" class="search-result-item">' +
                '<span class="search-result-title">' + item.title + '</span>' +
                '<span class="search-result-cat">' + item.category + '</span>' +
                '</a>'
            ).join('');
        } else {
            searchResults.innerHTML = '<div class="search-result-item">Tidak ditemukan. Coba kata kunci lain.</div>';
        }
    });
}

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
