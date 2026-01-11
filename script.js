// 导航菜单切换
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// 导航链接高亮
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
    
    // 返回顶部按钮显示/隐藏
    const backToTopButton = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

// 返回顶部按钮点击事件
document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 轮播图
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.carousel-indicator');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    document.querySelector('.carousel-inner').style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((indicator, i) => {
        if (i === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 自动轮播
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// 点击指示器切换轮播
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(i);
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });
});

// 滚动动画
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

scrollAnimateElements.forEach(element => {
    observer.observe(element);
});

// 数字计数器动画
function animateCounter(id, target) {
    const counter = document.getElementById(id);
    const duration = 2000; // 动画持续时间（毫秒）
    const step = target / (duration / 16); // 每16ms更新一次
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// 当滚动到计数器部分时启动动画
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter('counter-clients', 5000);
            animateCounter('counter-countries', 30);
            animateCounter('counter-trips', 2000);
            animateCounter('counter-satisfaction', 98);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counterObserver.observe(document.getElementById('counter-clients').parentElement.parentElement);

// 语言切换功能
const translations = {
    zh: {
        'nav.home': '首页',
        'nav.services': '我们的服务',
        'nav.routes': '商务路线',
        'nav.exhibitions': '展会信息',
        'nav.cases': '成功案例',
        'nav.about': '关于我们',
        'nav.contact': '联系帮助',
        'contact.title': '联系帮助'
    },
    en: {
        'nav.home': 'Home',
        'nav.services': 'Our Services',
        'nav.routes': 'Business Routes',
        'nav.exhibitions': 'Exhibitions',
        'nav.cases': 'Success Cases',
        'nav.about': 'About Us',
        'nav.contact': 'Contact & Help',
        'contact.title': 'Contact & Help'
    },
    sw: {
        'nav.home': 'Nyumbani',
        'nav.services': 'Huduma Zetu',
        'nav.routes': 'Njia za Biashara',
        'nav.exhibitions': 'Maonyesho',
        'nav.cases': 'Kesi za Mafanikio',
        'nav.about': 'Kuhusu Sisi',
        'nav.contact': 'Wasiliana na Usaidizi',
        'contact.title': 'Wasiliana na Usaidizi'
    }
};

// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh';
}

// 设置当前语言
function setCurrentLanguage(lang) {
    localStorage.setItem('language', lang);
    updateLanguage(lang);
}

// 更新页面语言
function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // 更新语言按钮显示
    const langNames = {
        'zh': '中文',
        'en': 'English',
        'sw': 'Kiswahili'
    };
    
    const currentLangEl = document.getElementById('current-language');
    const mobileCurrentLangEl = document.getElementById('mobile-current-language');
    
    if (currentLangEl) currentLangEl.textContent = langNames[lang];
    if (mobileCurrentLangEl) mobileCurrentLangEl.textContent = langNames[lang];
}

// 语言切换事件
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        setCurrentLanguage(lang);
    });
});

// 页面加载时应用保存的语言
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    updateLanguage(currentLang);
});

// 联系表单提交
document.getElementById('submit-contact').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // 表单验证
    if (!name || !email || !phone || !country || !service || !message) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 模拟表单提交
    alert('感谢您的留言！我们的团队将在24小时内与您联系。');
    
    // 重置表单
    document.getElementById('contact-form').reset();
});

// 3D地球效果
function initGlobe() {
    const container = document.getElementById('globe-container');
    
    if (!container) return;
    
    // 创建场景
    const scene = new THREE.Scene();
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // 创建地球
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // 加载地球纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
    
    const material = new THREE.MeshBasicMaterial({
        map: texture
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        globe.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// 页面加载完成后初始化3D地球
window.addEventListener('load', initGlobe);
