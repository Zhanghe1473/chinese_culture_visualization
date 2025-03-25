// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 页面加载完成后隐藏加载动画
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // 导航菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // 导航项点击事件
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有导航项的active类
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // 为当前点击的导航项添加active类
            this.classList.add('active');
            
            // 获取目标section的id
            const targetId = this.getAttribute('data-target');
            
            // 隐藏所有section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 显示目标section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // 在移动设备上点击导航项后关闭导航菜单
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });

    // 默认激活首页
    const defaultNavItem = document.querySelector('.nav-item[data-target="home"]');
    if (defaultNavItem) {
        defaultNavItem.click();
    }

    // 滚动动画
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
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
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 初始触发一次滚动动画检查
    handleScrollAnimation();

    // 图表初始化（如果页面中有图表容器）
    initializeCharts();
});

// 初始化图表函数
function initializeCharts() {
    // 检查是否加载了ECharts库
    if (typeof echarts !== 'undefined') {
        // 朝代时间线图表
        const dynastyTimelineChart = document.getElementById('dynasty-timeline-chart');
        if (dynastyTimelineChart) {
            const chart = echarts.init(dynastyTimelineChart);
            const option = {
                title: {
                    text: '中国古代朝代时间线',
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 20,
                        color: '#9d2933'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}: {c}年'
                },
                xAxis: {
                    type: 'category',
                    data: ['夏朝', '商朝', '周朝', '秦朝', '汉朝', '三国', '晋朝', '南北朝', '隋朝', '唐朝', '五代十国', '宋朝', '元朝', '明朝', '清朝'],
                    axisLabel: {
                        rotate: 45,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '持续时间（年）',
                    nameLocation: 'middle',
                    nameGap: 40
                },
                series: [{
                    data: [471, 554, 790, 15, 426, 60, 155, 170, 38, 289, 53, 319, 97, 276, 268],
                    type: 'bar',
                    itemStyle: {
                        color: function(params) {
                            const colorList = ['#9d2933', '#d4a017', '#1a3263', '#9d2933', '#d4a017', '#1a3263', '#9d2933', '#d4a017', '#1a3263', '#9d2933', '#d4a017', '#1a3263', '#9d2933', '#d4a017', '#1a3263'];
                            return colorList[params.dataIndex];
                        }
                    }
                }]
            };
            chart.setOption(option);
            
            // 窗口大小变化时重新调整图表大小
            window.addEventListener('resize', function() {
                chart.resize();
            });
        }

        // 科学成就分布图表
        const scienceAchievementChart = document.getElementById('science-achievement-chart');
        if (scienceAchievementChart) {
            const chart = echarts.init(scienceAchievementChart);
            const option = {
                title: {
                    text: '中国古代科学成就分布',
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 20,
                        color: '#9d2933'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['天文学', '数学', '医学', '农学', '工艺技术', '建筑', '地理']
                },
                series: [
                    {
                        name: '科学成就',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 148, name: '天文学' },
                            { value: 135, name: '数学' },
                            { value: 165, name: '医学' },
                            { value: 120, name: '农学' },
                            { value: 180, name: '工艺技术' },
                            { value: 110, name: '建筑' },
                            { value: 95, name: '地理' }
                        ]
                    }
                ]
            };
            chart.setOption(option);
            
            // 窗口大小变化时重新调整图表大小
            window.addEventListener('resize', function() {
                chart.resize();
            });
        }

        // 著作数量变化趋势图表
        const booksChart = document.getElementById('books-trend-chart');
        if (booksChart) {
            const chart = echarts.init(booksChart);
            const option = {
                title: {
                    text: '中国古代著作数量变化趋势',
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 20,
                        color: '#9d2933'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['经典著作', '科技著作', '文学著作', '哲学著作'],
                    bottom: 10
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清']
                },
                yAxis: {
                    type: 'value',
                    name: '著作数量'
                },
                series: [
                    {
                        name: '经典著作',
                        type: 'line',
                        stack: '总量',
                        data: [30, 85, 120, 180, 250, 320],
                        smooth: true
                    },
                    {
                        name: '科技著作',
                        type: 'line',
                        stack: '总量',
                        data: [15, 45, 80, 135, 190, 240],
                        smooth: true
                    },
                    {
                        name: '文学著作',
                        type: 'line',
                        stack: '总量',
                        data: [20, 60, 110, 170, 230, 310],
                        smooth: true
                    },
                    {
                        name: '哲学著作',
                        type: 'line',
                        stack: '总量',
                        data: [25, 70, 100, 150, 210, 280],
                        smooth: true
                    }
                ]
            };
            chart.setOption(option);
            
            // 窗口大小变化时重新调整图表大小
            window.addEventListener('resize', function() {
                chart.resize();
            });
        }
    }
}
