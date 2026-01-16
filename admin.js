// API 基础URL
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : '/api';

// DOM 元素
const exhibitionsList = document.getElementById('exhibitions-list');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const success = document.getElementById('success');
const successMessage = document.getElementById('success-message');
const addBtn = document.getElementById('add-btn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const modalTitle = document.getElementById('modal-title');
const form = document.getElementById('exhibition-form');

// 显示/隐藏提示消息
function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    setTimeout(() => {
        error.classList.add('hidden');
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    success.classList.remove('hidden');
    setTimeout(() => {
        success.classList.add('hidden');
    }, 3000);
}

// 加载展会列表
async function loadExhibitions() {
    try {
        loading.classList.remove('hidden');
        exhibitionsList.innerHTML = '';
        
        const response = await fetch(`${API_BASE}/exhibitions`);
        if (!response.ok) {
            throw new Error('获取展会信息失败');
        }
        
        const exhibitions = await response.json();
        loading.classList.add('hidden');
        
        if (exhibitions.length === 0) {
            exhibitionsList.innerHTML = '<div class="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">暂无展会信息</div>';
            return;
        }
        
        exhibitionsList.innerHTML = exhibitions.map(exhibition => {
            // 根据 badgeColor 选择对应的样式
            let badgeStyle = '';
            if (exhibition.badge) {
                if (exhibition.badgeColor === '#e63946') {
                    badgeStyle = '<span class="bg-[#e63946] text-white px-3 py-1 rounded-full text-sm">' + exhibition.badge + '</span>';
                } else if (exhibition.badgeColor === '#457b9d') {
                    badgeStyle = '<span class="bg-[#457b9d] text-white px-3 py-1 rounded-full text-sm">' + exhibition.badge + '</span>';
                } else {
                    badgeStyle = `<span style="background-color: ${exhibition.badgeColor}" class="text-white px-3 py-1 rounded-full text-sm">${exhibition.badge}</span>`;
                }
            }
            
            return `
            <div class="bg-white rounded-lg shadow-md p-6 fade-in">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <h3 class="text-xl font-bold text-[#1a365d] mr-3">${exhibition.title}</h3>
                            ${badgeStyle}
                        </div>
                        <div class="flex items-center text-gray-600 text-sm mb-2">
                            <i class="far fa-calendar-alt mr-2"></i>
                            <span>${exhibition.date}</span>
                            <span class="mx-3">|</span>
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            <span>${exhibition.location}</span>
                        </div>
                        <p class="text-gray-700 text-sm mb-3 line-clamp-2">${exhibition.description}</p>
                        <div class="flex flex-wrap gap-2">
                            ${exhibition.tags.map(tag => `<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="ml-4 flex space-x-2">
                        <button onclick="editExhibition(${exhibition.id})" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                            <i class="fas fa-edit mr-1"></i>编辑
                        </button>
                        <button onclick="deleteExhibition(${exhibition.id})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                            <i class="fas fa-trash mr-1"></i>删除
                        </button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
        
    } catch (err) {
        loading.classList.add('hidden');
        showError(err.message);
        exhibitionsList.innerHTML = '<div class="bg-white rounded-lg shadow-md p-8 text-center text-red-500">加载失败，请刷新页面重试</div>';
    }
}

// 打开编辑模态框
async function editExhibition(id) {
    try {
        const response = await fetch(`${API_BASE}/exhibitions/${id}`);
        if (!response.ok) {
            throw new Error('获取展会信息失败');
        }
        
        const exhibition = await response.json();
        
        // 填充表单
        document.getElementById('exhibition-id').value = exhibition.id;
        document.getElementById('title').value = exhibition.title;
        document.getElementById('date').value = exhibition.date;
        document.getElementById('location').value = exhibition.location;
        document.getElementById('description').value = exhibition.description;
        document.getElementById('tags').value = exhibition.tags.join('\n');
        document.getElementById('badge').value = exhibition.badge || '';
        document.getElementById('badge-color').value = exhibition.badgeColor || '#e63946';
        document.getElementById('link-color').value = exhibition.linkColor || '#1a365d';
        document.getElementById('detail-link').value = exhibition.detailLink || '#';
        
        modalTitle.textContent = '编辑展会';
        modal.classList.remove('hidden');
        
    } catch (err) {
        showError(err.message);
    }
}

// 打开添加模态框
function openAddModal() {
    form.reset();
    document.getElementById('exhibition-id').value = '';
    document.getElementById('badge-color').value = '#e63946';
    document.getElementById('link-color').value = '#1a365d';
    modalTitle.textContent = '添加展会';
    modal.classList.remove('hidden');
}

// 删除展会
async function deleteExhibition(id) {
    if (!confirm('确定要删除这个展会吗？此操作不可恢复。')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/exhibitions/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('删除失败');
        }
        
        showSuccess('删除成功');
        loadExhibitions();
        
    } catch (err) {
        showError(err.message);
    }
}

// 保存展会（添加或更新）
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('exhibition-id').value;
    const tagsText = document.getElementById('tags').value;
    const tags = tagsText.split('\n').map(t => t.trim()).filter(t => t);
    
    const exhibitionData = {
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
        tags: tags,
        badge: document.getElementById('badge').value || null,
        badgeColor: document.getElementById('badge-color').value,
        linkColor: document.getElementById('link-color').value,
        detailLink: document.getElementById('detail-link').value || '#'
    };
    
    try {
        let response;
        if (id) {
            // 更新
            response = await fetch(`${API_BASE}/exhibitions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exhibitionData)
            });
        } else {
            // 添加
            response = await fetch(`${API_BASE}/exhibitions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exhibitionData)
            });
        }
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || '保存失败');
        }
        
        showSuccess(id ? '更新成功' : '添加成功');
        modal.classList.add('hidden');
        loadExhibitions();
        
    } catch (err) {
        showError(err.message);
    }
});

// 关闭模态框
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// 点击模态框外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// 添加按钮事件
addBtn.addEventListener('click', openAddModal);

// 将函数暴露到全局作用域
window.editExhibition = editExhibition;
window.deleteExhibition = deleteExhibition;

// 页面加载时获取展会列表
loadExhibitions();
