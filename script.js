import { fakerVI } from 'https://cdn.jsdelivr.net/npm/@faker-js/faker@8.4.1/+esm';

const faker = fakerVI;
const UPDATE_INTERVAL_MS = 10000;
const MAX_EXPENSE_ITEMS = 20;

const faqData = [
    {
        question: 'Tại sao bạn lại làm trang này?',
        answer: 'Vì tôi muốn thử nghiệm mô hình “xin tiền vui vẻ” nhưng theo phong cách siêu mập mờ cho vui. Khi chạy thật thì có thể chuyển sang minh bạch nếu muốn.'
    },
    {
        question: 'Sao kê có thật không?',
        answer: 'Hiện tại là dữ liệu FAKE, sinh bởi Faker (locale tiếng Việt) mỗi 10 giây để minh họa. Khi chạy thật, bạn hãy nối API hoặc Google Sheets để cập nhật log real.'
    },
    {
        question: 'Log realtime có thể tạm dừng không?',
        answer: 'Có. Nút “Tạm dừng log” trong phần sao kê cho phép dừng/bật lại luồng fake log. Khi bật lại, một log mới sẽ được thêm ngay để báo “đã tiếp tục”.'
    },
    {
        question: 'Tôi có thể fork và đổi giao diện không?',
        answer: 'Thoải mái. Fork repo, đổi màu trong file styles.css (các biến :root), thay qr.png, và cập nhật nội dung hero/faq theo ý bạn.'
    },
    {
        question: 'Có lưu dữ liệu người dùng không?',
        answer: 'Không. Trang tĩnh chỉ lưu lựa chọn dark mode (localStorage) và trạng thái tạm dừng log (trong session JS) khi bạn còn ở trang.'
    },
    {
        question: 'Muốn kết nối donate thật thì làm sao?',
        answer: 'Bạn cần tự nối cổng thanh toán (Momo/ZaloPay/Ngân hàng) hoặc backend riêng. Các nút donate hiện chỉ minh họa, QR thay bằng mã của bạn.'
    },
    {
        question: 'Biểu đồ chi tiêu có tự cập nhật không?',
        answer: 'Chart đang cố định dữ liệu mẫu. Nếu muốn realtime, bạn có thể tính lại dataset và gọi chart.update() khi log mới hoặc số liệu thật thay đổi.'
    },
    {
        question: 'Có hỗ trợ đa ngôn ngữ không?',
        answer: 'Hiện là tiếng Việt. Bạn có thể chuyển locale Faker sang ngôn ngữ khác và thay text trong HTML để đa ngôn ngữ.'
    }
];

renderFaqItems();
attachFaqListeners();

function renderFaqItems() {
    const container = document.getElementById('faq-container');
    if (!container) return;
    container.innerHTML = '';
    faqData.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question" role="button" tabindex="0">
                <span>${item.question}</span>
                <span class="faq-toggle">▼</span>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        container.appendChild(faqItem);
    });
}

function attachFaqListeners() {
    const toggleItem = (faqItem) => {
        faqItem.classList.toggle('active');
    };

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => toggleItem(question.parentElement));
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem(question.parentElement);
            }
        });
    });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

// Default to dark mode unless the user saved a preference
const savedDarkMode = localStorage.getItem('darkMode');
const defaultDarkMode = true;
const isDarkMode = savedDarkMode !== null ? savedDarkMode === 'true' : defaultDarkMode;

if (isDarkMode) {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isNowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isNowDark);
    updateDarkModeIcon(isNowDark);
});

function updateDarkModeIcon(isDark) {
    darkModeToggle.innerHTML = isDark ? '<span class="mode-icon">☀️</span>' : '<span class="mode-icon">🌙</span>';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chart.js - Expense Breakdown Chart
const ctx = document.getElementById('expenseChart');
if (ctx) {
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Ăn uống (20%)',
                'Điện, nước, internet (15%)',
                'Tiền phòng (10%)',
                'Sức khỏe (10%)',
                'Học & nâng cấp bản thân (5%)',
                'Giải trí lành mạnh (40%)'
            ],
            datasets: [{
                data: [20, 15, 10, 10, 5, 40],
                backgroundColor: [
                    '#b8f26c',
                    '#8ee05f',
                    '#63d67f',
                    '#c6f3ad',
                    '#9fe977',
                    '#7fd4a6'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

const expenseList = document.getElementById('expense-list');
const summaryAmountEl = document.getElementById('summary-amount');
const summaryCountEl = document.getElementById('summary-count');
const updateTimeEl = document.getElementById('update-time');
const liveBadge = document.querySelector('.live-badge');
const toggleStreamBtn = document.getElementById('toggle-stream');
let expenseIntervalId = null;
let isAutoUpdateOn = true;

const expenseTemplates = [
    {
        title: 'Bánh mì pate',
        reasons: ['Lót dạ buổi sáng', 'Ăn nhanh cho kịp giờ'],
        min: 12000,
        max: 28000
    },
    {
        title: 'Cà phê sữa đá',
        reasons: ['Cho tỉnh táo', 'Tranh thủ brainstorm'],
        min: 15000,
        max: 35000
    },
    {
        title: 'Bún bò lề đường',
        reasons: ['Ăn trưa cùng bạn dev', 'Tự thưởng sau khi fix bug'],
        min: 30000,
        max: 70000
    },
    {
        title: 'Trà tắc',
        reasons: ['Giải khát trời nóng', 'Giảm stress trước deadline'],
        min: 12000,
        max: 25000
    },
    {
        title: 'Mì trứng xúc xích',
        reasons: ['Ăn tối tiết kiệm', 'Còn việc phải làm'],
        min: 15000,
        max: 40000
    },
    {
        title: 'Cơm gà xối mỡ',
        reasons: ['Bữa trưa no bụng', 'Ăn ngon để có động lực'],
        min: 35000,
        max: 65000
    }
];

let totalExpenseAmount = 0;
let expenseCount = 0;

// Simulate real-time expense updates
function generateFakeExpense() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const template = faker.helpers.arrayElement(expenseTemplates);
    const companion = Math.random() < 0.35 ? faker.person.firstName() : '';
    const name = companion ? `${template.title} cùng ${companion}` : template.title;
    const reason = faker.helpers.arrayElement(template.reasons);
    const randomAmount = roundToNearestThousand(faker.number.int({ min: template.min, max: template.max }));
    
    return {
        time: timeString,
        name,
        reason,
        amount: randomAmount
    };
}

function addNewExpense() {
    if (!expenseList) return;
    const expense = generateFakeExpense();
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    expenseItem.innerHTML = `
        <div class="expense-time">${expense.time}</div>
        <div class="expense-details">
            <div class="expense-name">${expense.name}</div>
            <div class="expense-reason">${expense.reason}</div>
        </div>
        <div class="expense-amount">-${formatCurrency(expense.amount)}</div>
    `;
    
    // Add to the top of the list
    expenseList.insertBefore(expenseItem, expenseList.firstChild);
    
    // Add animation
    expenseItem.style.animation = 'slideInUp 0.5s ease forwards';
    
    expenseCount += 1;
    totalExpenseAmount += expense.amount;

    // Keep only last 20 expenses
    const items = expenseList.querySelectorAll('.expense-item');
    if (items.length > MAX_EXPENSE_ITEMS) {
        const lastItem = items[items.length - 1];
        const lastAmountText = lastItem.querySelector('.expense-amount')?.textContent || '0';
        totalExpenseAmount -= Math.abs(parseAmount(lastAmountText));
        expenseCount = Math.max(expenseCount - 1, 0);
        lastItem.remove();
    }

    updateExpenseSummary();
}

// Auto-update fake expenses every 10 seconds
if (expenseList) {
    initializeExpenseStats();
    startAutoUpdate();
}

if (toggleStreamBtn) {
    toggleStreamBtn.addEventListener('click', () => {
        if (!expenseList) return;
        if (isAutoUpdateOn) {
            stopAutoUpdate();
        } else {
            addNewExpense();
            startAutoUpdate();
        }
    });
}

function parseAmount(amountText) {
    const numeric = parseInt(amountText.replace(/[^\d-]/g, ''), 10);
    return Number.isNaN(numeric) ? 0 : numeric;
}

function formatCurrency(amount) {
    return `${amount.toLocaleString('vi-VN')}₫`;
}

function roundToNearestThousand(amount) {
    return Math.round(amount / 1000) * 1000;
}

function initializeExpenseStats() {
    const items = expenseList.querySelectorAll('.expense-item');
    expenseCount = items.length;
    totalExpenseAmount = Array.from(items).reduce((total, item) => {
        const amountText = item.querySelector('.expense-amount')?.textContent || '0';
        return total + Math.abs(parseAmount(amountText));
    }, 0);
    updateExpenseSummary();
}

function updateExpenseSummary() {
    if (summaryCountEl) {
        summaryCountEl.textContent = expenseCount.toString();
    }
    if (summaryAmountEl) {
        summaryAmountEl.textContent = formatCurrency(totalExpenseAmount);
    }
    bumpSummary();
}

function bumpSummary() {
    document.querySelectorAll('.summary-value').forEach(el => {
        el.classList.remove('bump');
        // Force reflow to restart the animation
        void el.offsetWidth;
        el.classList.add('bump');
    });
}

function startAutoUpdate() {
    if (!expenseList) return;
    if (expenseIntervalId) {
        clearInterval(expenseIntervalId);
    }
    expenseIntervalId = setInterval(addNewExpense, UPDATE_INTERVAL_MS);
    isAutoUpdateOn = true;
    updateLiveControls();
}

function stopAutoUpdate() {
    if (expenseIntervalId) {
        clearInterval(expenseIntervalId);
        expenseIntervalId = null;
    }
    isAutoUpdateOn = false;
    updateLiveControls();
}

function updateLiveControls() {
    if (updateTimeEl) {
        updateTimeEl.textContent = isAutoUpdateOn
            ? `Cập nhật mỗi ${Math.round(UPDATE_INTERVAL_MS / 1000)} giây`
            : 'Đang tạm dừng';
    }
    if (toggleStreamBtn) {
        toggleStreamBtn.textContent = isAutoUpdateOn ? 'Tạm dừng log' : 'Tiếp tục log';
        toggleStreamBtn.classList.toggle('is-paused', !isAutoUpdateOn);
        toggleStreamBtn.setAttribute('aria-pressed', isAutoUpdateOn ? 'true' : 'false');
    }
    if (liveBadge) {
        liveBadge.classList.toggle('is-paused', !isAutoUpdateOn);
        const liveText = liveBadge.querySelector('.live-text');
        if (liveText) {
            liveText.textContent = isAutoUpdateOn ? 'Đang live' : 'Đang tạm dừng';
        }
    }
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start).toLocaleString('vi-VN');
    }, 16);
}

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.5s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.why-card, .usage-card, .faq-item').forEach(el => {
    observer.observe(el);
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Animate stat numbers
    const totalAmount = document.getElementById('total-amount');
    const supporterCount = document.getElementById('supporter-count');
    
    if (totalAmount && totalAmount.textContent === '420.000₫') {
        // Keep values as they are (already set in HTML)
    }
});

// Mobile menu toggle (if needed in future)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Donate button functionality
document.querySelectorAll('[class*="donate"]').forEach(button => {
    if (button.classList.contains('btn')) {
        button.addEventListener('click', function() {
            const text = this.textContent;
            if (text.includes('Momo')) {
                alert('Chuyển hướng đến Momo...\nVui lòng cập nhật link Momo của bạn');
            } else if (text.includes('ZaloPay')) {
                alert('Chuyển hướng đến ZaloPay...\nVui lòng cập nhật link ZaloPay của bạn');
            } else if (text.includes('Ngân hàng')) {
                alert('Thông tin ngân hàng:\nVui lòng cập nhật thông tin ngân hàng của bạn');
            }
        });
    }
});

// Dynamic donor log (demo data)
function simulateDonor() {
    const names = ['Anh Tuấn', 'Chị Linh', 'Bác Long', 'Anh Minh', 'Chị Hương'];
    const messages = [
        'Cố lên bro!',
        'Ăn cơm thôi đừng ăn mì',
        'Keep coding!',
        'Thêm trứng vào cơm nha',
        'Bao người ủng hộ anh'
    ];
    const amounts = [50000, 75000, 100000, 150000, 200000];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    const now = new Date().toLocaleString('vi-VN');
    
    return {
        time: now,
        name: randomName,
        message: randomMessage,
        amount: randomAmount.toLocaleString('vi-VN')
    };
}

// Navbar active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add active state styling for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: rgba(255, 255, 255, 0.8);
        border-bottom: 2px solid white;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Form submission for newsletter/updates (placeholder)
function setupFormListeners() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn sớm.');
            form.reset();
        });
    });
}

setupFormListeners();

// Track page analytics (optional)
console.log('Nuôi Nam - Landing Page Loaded');
console.log('Cảm ơn bạn đã ghé thăm!');
