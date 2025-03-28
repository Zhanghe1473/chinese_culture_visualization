// 修复按钮功能
document.addEventListener('DOMContentLoaded', function() {
    console.log("修复按钮功能...");

    // 修复导航按钮
    function fixNavigationButtons() {
        console.log("修复导航按钮开始...");
        // 处理data-navigate-to按钮
        const navButtons = document.querySelectorAll('[data-navigate-to]');
        console.log(`找到 ${navButtons.length} 个导航按钮`);

        navButtons.forEach(button => {
            // 移除旧的事件监听器，通过克隆替换
            const newButton = button.cloneNode(true);
            if (button.parentNode) {
                button.parentNode.replaceChild(newButton, button);
            }

            // 添加新的事件监听器
            newButton.addEventListener('click', function(event) {
                // 阻止默认行为和冒泡
                event.preventDefault();
                event.stopPropagation();

                const moduleId = this.getAttribute('data-navigate-to');
                console.log("按钮点击，导航到:", moduleId);

                // 找到对应的导航项
                const navItem = document.querySelector(`.nav-item[data-module="${moduleId}"]`);
                if (navItem) {
                    console.log("触发导航项点击:", navItem);
                    navItem.click();
                } else {
                    // 如果找不到导航项，直接加载模块
                    console.log("未找到导航项，直接加载模块:", moduleId);
                    const dynamicContent = document.getElementById('dynamic-content');
                    if (dynamicContent && typeof loadModule === 'function') {
                        loadModule(moduleId, dynamicContent);
                    } else {
                        // 最后的备用方案：直接跳转
                        console.log("无法加载模块，尝试直接跳转");
                        window.location.href = `/?module=${moduleId}`;
                    }
                }

                return false;
            });

            // 确保按钮有正确的样式
            newButton.style.cursor = 'pointer';
        });
        console.log("修复导航按钮完成");
    }

    // 修复模块中的按钮和交互元素
    function fixModuleButtons() {
        // 修复典故详情按钮
        const storyButtons = document.querySelectorAll('.story-expand-btn, .story-collapse-btn');
        storyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const storyId = this.getAttribute('data-story');
                const isExpand = this.classList.contains('story-expand-btn');

                if (isExpand) {
                    // 展开详情
                    const storyFull = document.getElementById(`story-${storyId}`);
                    if (storyFull) {
                        storyFull.style.display = 'block';
                    }
                } else {
                    // 收起详情
                    const storyFull = this.closest('.story-full');
                    if (storyFull) {
                        storyFull.style.display = 'none';
                    }
                }
            });
        });

        // 修复学者详情按钮
        const scholarButtons = document.querySelectorAll('.scholar-detail-btn');
        scholarButtons.forEach(button => {
            button.addEventListener('click', function() {
                const scholarId = this.getAttribute('data-scholar');
                const modal = document.getElementById('scholar-detail-modal');

                if (modal) {
                    const modalContent = modal.querySelector('#scholar-detail-content');
                    if (modalContent && typeof loadScholarDetail === 'function') {
                        loadScholarDetail(scholarId, modalContent);
                        modal.style.display = 'block';
                    }
                }
            });
        });

        // 修复著作详情按钮
        const workButtons = document.querySelectorAll('.work-detail-btn');
        workButtons.forEach(button => {
            button.addEventListener('click', function() {
                const workId = this.getAttribute('data-work');
                const modal = document.getElementById('work-detail-modal');

                if (modal) {
                    const modalContent = modal.querySelector('#work-detail-content');
                    if (modalContent && typeof loadWorkDetail === 'function') {
                        loadWorkDetail(workId, modalContent);
                        modal.style.display = 'block';
                    }
                }
            });
        });

        // 修复模态框关闭按钮
        const closeButtons = document.querySelectorAll('.close-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // 修复标签切换
        const tabs = document.querySelectorAll('.invention-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const invention = this.getAttribute('data-invention');

                // 移除所有标签的active类
                tabs.forEach(t => t.classList.remove('active'));

                // 为当前标签添加active类
                this.classList.add('active');

                // 隐藏所有面板
                const panels = document.querySelectorAll('.invention-panel');
                panels.forEach(panel => {
                    panel.style.display = 'none';
                });

                // 显示对应面板
                const targetPanel = document.getElementById(`${invention}-panel`);
                if (targetPanel) {
                    targetPanel.style.display = 'block';
                }
            });
        });
    }

    // 在页面加载和内容更新时修复按钮
    fixNavigationButtons();

    // 添加延迟修复模块内部的按钮
    setTimeout(fixModuleButtons, 1000);

    // 监听模块加载完成事件，重新绑定按钮
    document.addEventListener('moduleLoaded', function(e) {
        console.log("模块加载完成，重新绑定按钮:", e.detail.moduleId);
        setTimeout(fixNavigationButtons, 200); // 延迟执行，确保DOM更新完成
        setTimeout(fixModuleButtons, 500); // 修复模块内部按钮
    });

    // 定期检查和修复按钮
    setInterval(fixNavigationButtons, 5000);
});

// 全局函数：生成演示四大发明的对话框
function showInventionDemo(invention) {
    const demoMessages = {
        'paper': '正在演示造纸过程...',
        'printing': '正在演示印刷过程...',
        'gunpowder': '正在演示火药制作和使用...',
        'compass': '正在演示指南针原理...'
    };

    // 显示消息
    const message = demoMessages[invention] || '演示即将推出';

    // 创建消息元素
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    // 显示消息
    setTimeout(() => {
        messageBox.classList.add('show');
    }, 100);

    // 3秒后隐藏消息
    setTimeout(() => {
        messageBox.classList.remove('show');
        setTimeout(() => {
            messageBox.remove();
        }, 300);
    }, 3000);
}

// 全局函数：加载学者详情（如果interactive.js中的函数不可用）
function loadScholarDetail(scholarId, container) {
    if (typeof window.originalLoadScholarDetail === 'function') {
        return window.originalLoadScholarDetail(scholarId, container);
    }

    // 默认学者详情
    const scholarDetails = {
        'confucius': {
            name: '孔子',
            lifespan: '前551年-前479年',
            dynasty: '春秋时期',
            birthplace: '鲁国陬邑（今山东曲阜）',
            title: '至圣先师',
            image: '../static/images/scholars/confucius_large.jpg',
            biography: `孔子（前551年-前479年），名丘，字仲尼，春秋末期鲁国人，中国古代伟大的思想家、教育家、儒家学派创始人。`,
            contributions: [
                '创立了儒家学派，成为中国传统文化的主流思想',
                '开创了私人讲学的风气，是中国古代第一位平民教育家',
                '提出"仁"的思想，主张"仁者爱人"，强调道德修养'
            ],
            quotes: [
                '学而不思则罔，思而不学则殆。',
                '己所不欲，勿施于人。',
                '三人行，必有我师焉。'
            ]
        }
    };

    const scholar = scholarDetails[scholarId] || {
        name: scholarId,
        lifespan: '未知',
        dynasty: '未知',
        biography: '详细信息加载中...'
    };

    // 渲染学者详情
    let html = `
        <div class="scholar-detail-header">
            <h3>${scholar.name}</h3>
            <p class="scholar-lifespan">${scholar.lifespan}</p>
            <div class="scholar-tags">
                <span class="tag">${scholar.dynasty}</span>
                ${scholar.title ? `<span class="tag">${scholar.title}</span>` : ''}
            </div>
        </div>
        <div class="scholar-detail-body">
            <div class="scholar-info">
                <h4>个人简介</h4>
                <p>${scholar.biography}</p>
                
                ${scholar.contributions ? `
                <h4>主要贡献</h4>
                <ul class="contribution-list">
                    ${scholar.contributions.map(item => `<li>${item}</li>`).join('')}
                </ul>
                ` : ''}
                
                ${scholar.quotes ? `
                <h4>名言名句</h4>
                <div class="quotes-container">
                    ${scholar.quotes.map(quote => `<div class="quote">"${quote}"</div>`).join('')}
                </div>
                ` : ''}
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// 全局函数：加载著作详情（如果interactive.js中的函数不可用）
function loadWorkDetail(workId, container) {
    if (typeof window.originalLoadWorkDetail === 'function') {
        return window.originalLoadWorkDetail(workId, container);
    }

    // 默认著作详情
    const workDetails = {
        'lunyu': {
            title: '论语',
            author: '孔子弟子及再传弟子',
            dynasty: '春秋战国时期',
            category: '儒家经典',
            intro: '《论语》是记录孔子及其弟子言行的语录集，由孔子弟子及再传弟子编撰而成。'
        }
    };

    const work = workDetails[workId] || {
        title: workId,
        author: '未知',
        dynasty: '未知',
        intro: '详细信息加载中...'
    };

    // 渲染著作详情
    let html = `
        <div class="work-detail-header">
            <h3>${work.title}</h3>
            <div class="work-tags">
                <span class="tag">${work.dynasty}</span>
                <span class="tag">${work.category || '未分类'}</span>
                <span class="tag">作者：${work.author}</span>
            </div>
        </div>
        <div class="work-detail-body">
            <div class="work-info">
                <h4>著作简介</h4>
                <p>${work.intro}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}