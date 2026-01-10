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

// AI路线推荐表单提交
document.getElementById('generate-route').addEventListener('click', function() {
    const productType = document.getElementById('product-type').value;
    const budget = document.getElementById('budget').value;
    const duration = document.getElementById('duration').value;
    const specialNeeds = document.getElementById('special-needs').value;
    
    // 表单验证
    if (!productType || !budget || !duration) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 显示加载状态
    document.getElementById('route-empty').classList.add('hidden');
    document.getElementById('route-result').classList.add('hidden');
    document.getElementById('route-loading').classList.remove('hidden');
    
    // 模拟API请求延迟
    setTimeout(() => {
        // 隐藏加载状态，显示结果
        document.getElementById('route-loading').classList.add('hidden');
        document.getElementById('route-result').classList.remove('hidden');
        
        // 更新结果
        document.getElementById('result-duration').textContent = `${duration}天`;
        
        const cityCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let cities = [];
        cityCheckboxes.forEach(checkbox => {
            if (checkbox.value === 'guangzhou') cities.push('广州');
            if (checkbox.value === 'yiwu') cities.push('义乌');
            if (checkbox.value === 'both') {
                cities = ['广州', '义乌'];
            }
        });
        
        if (cities.length === 0) {
            cities = ['广州', '义乌'];
        }
        
        document.getElementById('result-cities').textContent = cities.join('、');
        document.getElementById('result-budget').textContent = `$${budget.toLocaleString()}`;
        
        // 生成每日行程
        const dailySchedule = document.getElementById('daily-schedule');
        dailySchedule.innerHTML = '';
        
        let scheduleHTML = '';
        
        if (cities.includes('广州') && cities.includes('义乌')) {
            // 广州义乌组合路线
            const guangzhouDays = Math.floor(duration * 0.4);
            const yiwuDays = duration - guangzhouDays;
            
            for (let i = 1; i <= guangzhouDays; i++) {
                scheduleHTML += `
                    <div class="border-l-4 border-[#e63946] pl-4 mb-4">
                        <h5 class="font-bold mb-2">第${i}天 - 广州</h5>
                        <p class="text-gray-700 mb-2">上午：参观广州国际轻纺城</p>
                        <p class="text-gray-700 mb-2">午餐：品尝广州特色美食</p>
                        <p class="text-gray-700">下午：与供应商商务洽谈</p>
                    </div>
                `;
            }
            
            scheduleHTML += `
                <div class="border-l-4 border-gray-400 pl-4 mb-4">
                    <h5 class="font-bold mb-2">第${guangzhouDays + 1}天 - 广州 → 义乌</h5>
                    <p class="text-gray-700 mb-2">上午：广州-义乌高铁/飞机</p>
                    <p class="text-gray-700 mb-2">下午：入住酒店，休息调整</p>
                    <p class="text-gray-700">晚上：欢迎晚宴</p>
                </div>
            `;
            
            for (let i = 1; i <= yiwuDays; i++) {
                scheduleHTML += `
                    <div class="border-l-4 border-[#457b9d] pl-4 mb-4">
                        <h5 class="font-bold mb-2">第${guangzhouDays + 1 + i}天 - 义乌</h5>
                        <p class="text-gray-700 mb-2">上午：参观义乌国际商贸城${i % 4 === 0 ? 4 : i % 4}区</p>
                        <p class="text-gray-700 mb-2">午餐：品尝义乌特色美食</p>
                        <p class="text-gray-700">下午：与供应商商务洽谈</p>
                    </div>
                `;
            }
        } else if (cities.includes('广州')) {
            // 仅广州路线
            for (let i = 1; i <= duration; i++) {
                scheduleHTML += `
                    <div class="border-l-4 border-[#e63946] pl-4 mb-4">
                        <h5 class="font-bold mb-2">第${i}天 - 广州</h5>
                        <p class="text-gray-700 mb-2">上午：参观${i === 1 ? '广州国际轻纺城' : i === 2 ? '白马服装市场' : i === 3 ? '广州uus服装城' : '沙河服装批发市场'}</p>
                        <p class="text-gray-700 mb-2">午餐：品尝广州特色美食</p>
                        <p class="text-gray-700">下午：与供应商商务洽谈</p>
                    </div>
                `;
            }
        } else {
            // 仅义乌路线
            for (let i = 1; i <= duration; i++) {
                scheduleHTML += `
                    <div class="border-l-4 border-[#457b9d] pl-4 mb-4">
                        <h5 class="font-bold mb-2">第${i}天 - 义乌</h5>
                        <p class="text-gray-700 mb-2">上午：参观义乌国际商贸城${i % 4 === 0 ? 4 : i % 4}区</p>
                        <p class="text-gray-700 mb-2">午餐：品尝义乌特色美食</p>
                        <p class="text-gray-700">下午：与供应商商务洽谈</p>
                    </div>
                `;
            }
        }
        
        dailySchedule.innerHTML = scheduleHTML;
        
        // 生成推荐供应商
        const recommendedSuppliers = document.getElementById('recommended-suppliers');
        let suppliersHTML = '';
        
        if (productType === 'textile') {
            suppliersHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">广州纺织品有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：高品质面料、纺织品</p>
                        <p class="text-gray-700 mb-1">优势：20年行业经验，出口非洲多国</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star-half-alt text-yellow-400"></i>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">义乌服装制造有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：服装、配饰</p>
                        <p class="text-gray-700 mb-1">优势：价格实惠，支持小批量订单</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                        </div>
                    </div>
                </div>
            `;
        } else if (productType === 'electronics') {
            suppliersHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">广州电子科技有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：手机配件、电子产品</p>
                        <p class="text-gray-700 mb-1">优势：产品新颖，价格竞争力强</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">义乌数码科技有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：小型电子产品、数码配件</p>
                        <p class="text-gray-700 mb-1">优势：品种齐全，起订量低</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star-half-alt text-yellow-400"></i>
                        </div>
                    </div>
                </div>
            `;
        } else if (productType === 'home') {
            suppliersHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">广州家居用品有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：家居装饰品、厨房用品</p>
                        <p class="text-gray-700 mb-1">优势：设计新颖，质量可靠</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">义乌家居制造有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：家居用品、装饰品</p>
                        <p class="text-gray-700 mb-1">优势：价格实惠，品种丰富</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                        </div>
                    </div>
                </div>
            `;
        } else {
            suppliersHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">广州国际贸易有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：各类商品出口</p>
                        <p class="text-gray-700 mb-1">优势：多年非洲市场经验</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star-half-alt text-yellow-400"></i>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h5 class="font-bold mb-2">义乌环球贸易有限公司</h5>
                        <p class="text-gray-700 mb-1">主营：各类小商品</p>
                        <p class="text-gray-700 mb-1">优势：品种齐全，价格竞争力强</p>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                        </div>
                    </div>
                </div>
            `;
        }
        
        recommendedSuppliers.innerHTML = suppliersHTML;
        
    }, 2000);
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
