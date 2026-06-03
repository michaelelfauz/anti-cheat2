// =============================================
// TAB SWITCHING — FIXED VERSION
// =============================================

var currentTab = 'beranda';
var switching = false; // mencegah double-click bug

function switchTab(tabId) {
    // Cegah jika tab sama atau sedang proses switch
    if (tabId === currentTab || switching) return;
    switching = true;

    // 1. Sembunyikan semua page
    var allPages = document.querySelectorAll('.page');
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].classList.remove('visible');
        allPages[i].classList.remove('active');
    }

    // 2. Tampilkan page baru
    var newPage = document.getElementById('page-' + tabId);
    if (newPage) {
        newPage.classList.add('active');

        // Gunakan requestAnimationFrame ganda agar browser
        // sempat render display:block sebelum transisi opacity
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                newPage.classList.add('visible');
                switching = false;
            });
        });
    } else {
        switching = false;
    }

    currentTab = tabId;

    // 3. Update tombol tab desktop
    var tabBtns = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < tabBtns.length; i++) {
        if (tabBtns[i].getAttribute('data-tab') === tabId) {
            tabBtns[i].classList.add('active');
        } else {
            tabBtns[i].classList.remove('active');
        }
    }

    // 4. Update tombol tab mobile
    var mobileLinks = document.querySelectorAll('.mobile-link');
    for (var i = 0; i < mobileLinks.length; i++) {
        if (mobileLinks[i].getAttribute('data-tab') === tabId) {
            mobileLinks[i].classList.add('active');
        } else {
            mobileLinks[i].classList.remove('active');
        }
    }

    // 5. Animasi khusus per tab
    if (tabId === 'skill') {
        setTimeout(animateSkillBars, 400);
    }
    if (tabId === 'beranda') {
        setTimeout(animateStats, 400);
    }

    // 6. Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// =============================================
// MOBILE MENU
// =============================================

function openMobile() {
    document.getElementById('mobileMenu').classList.add('open');
    document.getElementById('overlay').classList.add('open');
}

function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
}


// =============================================
// STATS COUNTER ANIMATION
// =============================================

var statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    var statElements = document.querySelectorAll('.stat-num');
    for (var i = 0; i < statElements.length; i++) {
        (function (el) {
            var target = parseInt(el.getAttribute('data-target'));
            var current = 0;
            var step = Math.ceil(target / 40);
            var interval = setInterval(function () {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                el.innerHTML = current + '<span class="plus">+</span>';
            }, 30);
        })(statElements[i]);
    }
}


// =============================================
// SKILL BAR ANIMATION
// =============================================

function animateSkillBars() {
    var bars = document.querySelectorAll('.skill-bar-fill');
    for (var i = 0; i < bars.length; i++) {
        bars[i].style.width = bars[i].getAttribute('data-width') + '%';
    }
}

function resetSkillBars() {
    var bars = document.querySelectorAll('.skill-bar-fill');
    for (var i = 0; i < bars.length; i++) {
        bars[i].style.width = '0';
    }
}


// =============================================
// CONTACT FORM
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var toast = document.getElementById('toast');
            toast.classList.add('show');
            form.reset();
            setTimeout(function () {
                toast.classList.remove('show');
            }, 3000);
        });
    }
});


// =============================================
// KEYBOARD NAVIGATION (Arrow Left / Right)
// =============================================

var tabOrder = ['beranda', 'tentang', 'pengalaman', 'sertifikat', 'skill', 'kontak'];

document.addEventListener('keydown', function (e) {
    var activeBtn = document.querySelector('.tab-btn.active');
    if (!activeBtn) return;

    var currentId = activeBtn.getAttribute('data-tab');
    var idx = tabOrder.indexOf(currentId);

    if (e.key === 'ArrowRight' && idx < tabOrder.length - 1) {
        switchTab(tabOrder[idx + 1]);
    } else if (e.key === 'ArrowLeft' && idx > 0) {
        switchTab(tabOrder[idx - 1]);
    }
});


// =============================================
// INIT — Jalankan saat halaman dimuat
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    // Animasi stats di beranda
    animateStats();
    // Reset skill bars agar siap animasi saat tab dibuka
    resetSkillBars();
});