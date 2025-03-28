// 模块加载器脚本
// 用于动态加载网站各个模块内容

/**
 * 初始化模块加载器
 * 绑定导航事件，实现模块动态加载功能
 */
function initModuleLoader() {
    console.log('初始化模块加载器...');

    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');

    // 获取动态内容容器
    const dynamicContent = document.getElementById('dynamic-content');

    // 如果没有找到动态内容容器，则退出
    if (!dynamicContent) {
        console.error('错误：未找到动态内容容器元素！');
        return;
    }

    // 为每个导航项绑定点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取模块ID
            const moduleId = this.getAttribute('data-module');

            // 如果没有模块ID，则退出
            if (!moduleId) {
                console.error('错误：导航项没有指定模块ID！');
                return;
            }

            // 加载对应的模块
            loadModule(moduleId, dynamicContent);

            // 更新导航项状态
            updateNavActiveState(this);
        });
    });

    // 处理首页上的导航按钮
    const moduleButtons = document.querySelectorAll('[data-navigate-to]');
    moduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-navigate-to');

            // 找到对应的导航项并触发点击事件
            const navItem = document.querySelector(`.nav-item[data-module="${moduleId}"]`);
            if (navItem) {
                navItem.click();
            } else {
                console.error(`错误：未找到导航项：${moduleId}`);
            }
        });
    });

    // 默认选中首页，除非URL中有特定参数
    const urlParams = new URLSearchParams(window.location.search);
    const moduleParam = urlParams.get('module');

    if (moduleParam) {
        // 如果URL中指定了模块，则加载该模块
        const targetNavItem = document.querySelector(`.nav-item[data-module="${moduleParam}"]`);
        if (targetNavItem) {
            targetNavItem.click();
        } else {
            // 如果指定的模块不存在，则加载首页
            const homeNavItem = document.querySelector('.nav-item[data-module="home"]');
            if (homeNavItem) {
                homeNavItem.click();
            }
        }
    } else {
        // 否则加载首页
        const homeNavItem = document.querySelector('.nav-item[data-module="home"]');
        if (homeNavItem) {
            homeNavItem.click();
        }
    }
}

/**
 * 加载指定模块的内容
 * @param {string} moduleId - 模块ID
 * @param {HTMLElement} container - 内容容器元素
 */
function loadModule(moduleId, container) {
    console.log(`加载模块：${moduleId}`);

    // 显示加载指示器
    showLoading(container);

    // 通过AJAX请求获取模块内容
    fetch(`/module/${moduleId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP错误，状态码：${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // 更新容器内容
            container.innerHTML = html;

            // 加载模块特定的CSS
            loadModuleCSS(moduleId);

            // 加载模块特定的JS
            loadModuleJS(moduleId);

            // 更新浏览器历史记录，便于浏览器前进后退按钮
            updateHistory(moduleId);

            // 触发模块加载完成事件
            triggerModuleLoadedEvent(moduleId);

            // 处理图片加载错误
            handleImageErrors();

            // 滚动到页面顶部
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error(`加载模块"${moduleId}"时出错：`, error);

            // 显示错误信息
            container.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">
                        <i class="fa fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="error-title">模块加载失败</h3>
                    <p class="error-message">${error.message}</p>
                    <div class="error-actions">
                        <button class="btn btn-primary" onclick="retryLoadModule('${moduleId}')">重试</button>
                        <button class="btn btn-secondary" onclick="loadFallbackContent('${moduleId}')">加载简化内容</button>
                    </div>
                </div>
            `;
        })
        .finally(() => {
            // 隐藏加载指示器
            hideLoading();
        });
}

/**
 * 更新导航项的激活状态
 * @param {HTMLElement} activeItem - 当前激活的导航项
 */
function updateNavActiveState(activeItem) {
    // 移除所有导航项的active类
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // 为当前项添加active类
    activeItem.classList.add('active');
}

/**
 * 显示加载指示器
 * @param {HTMLElement} container - 内容容器元素
 */
function showLoading(container) {
    // 创建加载指示器
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'module-loading';
    loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <p>正在加载模块内容...</p>
    `;

    // 清空容器并添加加载指示器
    container.innerHTML = '';
    container.appendChild(loadingIndicator);
}

/**
 * 隐藏加载指示器
 */
function hideLoading() {
    // 移除所有加载指示器
    document.querySelectorAll('.module-loading').forEach(el => {
        el.remove();
    });
}

/**
 * 加载模块特定的CSS文件
 * @param {string} moduleId - 模块ID
 */
function loadModuleCSS(moduleId) {
    // 检查是否已加载该模块的CSS
    const cssId = `css-module-${moduleId}`;
    if (document.getElementById(cssId)) {
        return; // 已经加载过，不需要重复加载
    }

    // 创建link元素加载CSS
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.href = `/static/css/modules/${moduleId}.css`;
    link.setAttribute('data-module-resource', 'true');

    // 添加到head
    document.head.appendChild(link);

    // 处理加载错误
    link.onerror = function() {
        console.log(`模块CSS文件不存在: ${moduleId}.css（这是正常的，如果没有特定的CSS文件）`);
        // 移除无效的link元素
        this.remove();
    };
}

/**
 * 加载模块特定的JS文件
 * @param {string} moduleId - 模块ID
 */
function loadModuleJS(moduleId) {
    // 检查是否已加载该模块的JS
    const jsId = `js-module-${moduleId}`;
    if (document.getElementById(jsId)) {
        return; // 已经加载过，不需要重复加载
    }

    // 创建script元素加载JS
    const script = document.createElement('script');
    script.id = jsId;
    script.src = `/static/js/modules/${moduleId}.js`;
    script.setAttribute('data-module-resource', 'true');

    // 添加到body末尾
    document.body.appendChild(script);

    // 处理加载错误
    script.onerror = function() {
        console.log(`模块JS文件不存在: ${moduleId}.js（这是正常的，如果没有特定的JS文件）`);
        // 移除无效的script元素
        this.remove();
    };

    // JS加载完成后初始化通用图表
    script.onload = function() {
        // 如果存在图表初始化函数，则调用
        if (typeof initializeCharts === 'function') {
            initializeCharts();
        }

        // 如果存在更多图表初始化函数，则调用
        if (typeof initializeMoreCharts === 'function') {
            initializeMoreCharts();
        }

        // 如果模块有自己的初始化函数，则调用
        const moduleInitFunction = window[`init${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}`];
        if (typeof moduleInitFunction === 'function') {
            moduleInitFunction();
        }

        // 初始化滚动动画
        initScrollAnimations();
    };
}

/**
 * 更新浏览器历史记录
 * @param {string} moduleId - 模块ID
 */
function updateHistory(moduleId) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('module', moduleId);

    // 更新URL，但不重新加载页面
    window.history.pushState({moduleId: moduleId}, '', newUrl);
}

/**
 * 触发模块加载完成事件
 * @param {string} moduleId - 模块ID
 */
function triggerModuleLoadedEvent(moduleId) {
    const event = new CustomEvent('moduleLoaded', {
        detail: {
            moduleId: moduleId
        }
    });

    document.dispatchEvent(event);
}

/**
 * 处理图片加载错误
 */
function handleImageErrors() {
    // 为所有图片添加onerror处理
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            // 图片加载失败时，添加默认样式
            this.classList.add('img-error');
            this.alt = this.alt || '图片加载失败';

            // 尝试从原始路径提取文件名作为替代文本
            const pathParts = this.src.split('/');
            const fileName = pathParts[pathParts.length - 1];

            // 设置默认样式
            this.style.backgroundColor = '#f8f4e6';
            this.style.border = '1px dashed #ccc';
            this.style.padding = '10px';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.minHeight = '100px';
            this.style.position = 'relative';

            // 插入错误提示
            const parent = this.parentNode;
            const errorMsg = document.createElement('div');
            errorMsg.className = 'img-error-msg';
            errorMsg.textContent = `图片加载失败: ${fileName}`;
            errorMsg.style.position = 'absolute';
            errorMsg.style.top = '50%';
            errorMsg.style.left = '50%';
            errorMsg.style.transform = 'translate(-50%, -50%)';
            errorMsg.style.color = '#9d2933';
            errorMsg.style.fontSize = '12px';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.width = '80%';
            parent.appendChild(errorMsg);
        };
    });
}

/**
 * 加载后备内容
 * @param {string} moduleId - 模块ID
 */
function loadFallbackContent(moduleId) {
    const dynamicContent = document.getElementById('dynamic-content');
    if (!dynamicContent) return;

    switch(moduleId) {
        case 'home':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>华夏瑰宝</h2>
                    <p>探索中华五千年文明的灿烂瑰宝</p>
                    <div class="simple-buttons">
                        <button class="btn" onclick="loadModule('civilization_overview', document.getElementById('dynamic-content'))">文明概述</button>
                        <button class="btn" onclick="loadModule('scientific_achievements', document.getElementById('dynamic-content'))">科学成就</button>
                    </div>
                </div>
            `;
            break;
        case 'civilization_overview':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中华文明概述</h2>
                    <p>中华文明是世界上历史最悠久的文明之一，从距今约5000年前的新石器时代晚期开始，经历了黄河流域和长江流域文明的诞生与融合，逐渐形成了统一的文化体系。</p>
                </div>
            `;
            break;
        case 'scientific_achievements':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代科学成就</h2>
                    <p>中国古代科学技术在世界科技发展史上占有重要地位，在天文、数学、医学、农学、工艺等领域取得了丰硕成果，其中尤以四大发明为代表。</p>
                    <h3>四大发明</h3>
                    <ul>
                        <li>造纸术</li>
                        <li>印刷术</li>
                        <li>火药</li>
                        <li>指南针</li>
                    </ul>
                </div>
            `;
            break;
        case 'notable_works':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代杰出著作</h2>
                    <p>中国古代留下了大量珍贵的典籍著作，包括经史子集四大类。</p>
                </div>
            `;
            break;
        case 'notable_scholars':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代杰出学者</h2>
                    <p>中国历史上涌现出众多杰出的思想家、科学家、文学家和艺术家，他们的成就对中国和世界产生了深远影响。</p>
                </div>
            `;
            break;
        case 'cultural_stories':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代文化典故</h2>
                    <p>中国古代流传下来的文化典故蕴含丰富的历史知识和哲理智慧，是中华文化的重要组成部分。</p>
                </div>
            `;
            break;
        case 'cultural_customs':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国传统文化习俗</h2>
                    <p>中国传统节日和习俗是中华文化的重要组成部分，体现了中国人的生活方式和价值观念。</p>
                </div>
            `;
            break;
        case 'data_summary':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中华文明数据汇总</h2>
                    <p>通过数据可视化的方式，展示中华文明在各个方面的成就和影响。</p>
                </div>
            `;
            break;
        default:
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>${moduleId.replace(/_/g, ' ')}</h2>
                    <p>简化内容正在加载中...</p>
                </div>
            `;
    }
}

/**
 * 重试加载模块
 * @param {string} moduleId - 模块ID
 */
function retryLoadModule(moduleId) {
    console.log(`重试加载模块：${moduleId}`);

    // 获取动态内容容器
    const dynamicContent = document.getElementById('dynamic-content');

    if (dynamicContent) {
        // 重新加载模块
        loadModule(moduleId, dynamicContent);
    }
}

/**
 * 初始化滚动动画
 */
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    if (scrollElements.length === 0) return;

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // 添加滚动事件监听
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 初始触发一次滚动动画检查
    handleScrollAnimation();
}

// 监听浏览器前进/后退按钮事件
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.moduleId) {
        // 获取动态内容容器
        const dynamicContent = document.getElementById('dynamic-content');

        if (dynamicContent) {
            // 加载历史记录中的模块
            const moduleId = event.state.moduleId;

            // 更新导航项状态
            const navItem = document.querySelector(`.nav-item[data-module="${moduleId}"]`);
            if (navItem) {
                updateNavActiveState(navItem);
            }

            // 加载模块
            loadModule(moduleId, dynamicContent);
        }
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化模块加载器
    // 注意：此函数通常在index.html中调用，这里仅作为备份
    if (typeof window.moduleLoaderInitialized === 'undefined') {
        window.moduleLoaderInitialized = true;
        initModuleLoader();
    }
});