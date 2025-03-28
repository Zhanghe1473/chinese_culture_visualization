// 修复按钮功能
document.addEventListener('DOMContentLoaded', function() {
    console.log("修复按钮功能...");

    // 修复导航按钮
    function fixNavigationButtons() {
        // 处理data-navigate-to按钮
        const navButtons = document.querySelectorAll('[data-navigate-to]');
        navButtons.forEach(button => {
            console.log("找到导航按钮:", button);
            button.addEventListener('click', function() {
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
                        window.location.href = `/?module=${moduleId}`;
                    }
                }
            });
        });
    }

    // 在页面加载和内容更新时修复按钮
    fixNavigationButtons();

    // 监听模块加载完成事件，重新绑定按钮
    document.addEventListener('moduleLoaded', function(e) {
        console.log("模块加载完成，重新绑定按钮:", e.detail.moduleId);
        setTimeout(fixNavigationButtons, 100); // 延迟执行，确保DOM更新完成
    });
});