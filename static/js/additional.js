// 添加更多数据可视化图表
function initializeMoreCharts() {
    if (typeof echarts !== 'undefined') {
        // 文化典故分布图表
        const culturalStoriesChart = document.getElementById('cultural-stories-chart');
        if (culturalStoriesChart) {
            const chart = echarts.init(culturalStoriesChart);
            const option = {
                title: {
                    text: '中国古代文化典故来源分布',
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
                    data: ['历史典故', '神话传说', '寓言故事', '民间传说', '文学作品']
                },
                series: [
                    {
                        name: '典故来源',
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
                            { value: 135, name: '历史典故' },
                            { value: 110, name: '神话传说' },
                            { value: 90, name: '寓言故事' },
                            { value: 75, name: '民间传说' },
                            { value: 120, name: '文学作品' }
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

        // 传统节日分布图表
        const festivalChart = document.getElementById('festival-distribution-chart');
        if (festivalChart) {
            const chart = echarts.init(festivalChart);
            const option = {
                title: {
                    text: '中国传统节日季节分布',
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
                    data: ['春季', '夏季', '秋季', '冬季']
                },
                series: [
                    {
                        name: '节日分布',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 8, name: '春季', itemStyle: { color: '#91c46c' } },
                            { value: 5, name: '夏季', itemStyle: { color: '#ff7e67' } },
                            { value: 6, name: '秋季', itemStyle: { color: '#ffc05c' } },
                            { value: 7, name: '冬季', itemStyle: { color: '#8ecae6' } }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            chart.setOption(option);
            
            // 窗口大小变化时重新调整图表大小
            window.addEventListener('resize', function() {
                chart.resize();
            });
        }

        // 杰出学者分布图表
        const scholarsChart = document.getElementById('scholars-distribution-chart');
        if (scholarsChart) {
            const chart = echarts.init(scholarsChart);
            const option = {
                title: {
                    text: '中国古代杰出学者朝代分布',
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 20,
                        color: '#9d2933'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['思想家', '科学家', '文学家', '艺术家'],
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
                    data: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
                    axisLabel: {
                        rotate: 45,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '人数'
                },
                series: [
                    {
                        name: '思想家',
                        type: 'bar',
                        stack: '总量',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [25, 18, 12, 15, 22, 20]
                    },
                    {
                        name: '科学家',
                        type: 'bar',
                        stack: '总量',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [10, 15, 12, 18, 25, 22]
                    },
                    {
                        name: '文学家',
                        type: 'bar',
                        stack: '总量',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [15, 20, 25, 30, 28, 35]
                    },
                    {
                        name: '艺术家',
                        type: 'bar',
                        stack: '总量',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [12, 15, 18, 22, 20, 25]
                    }
                ]
            };
            chart.setOption(option);
            
            // 窗口大小变化时重新调整图表大小
            window.addEventListener('resize', function() {
                chart.resize();
            });
        }

        // 四大发明影响力图表
        const inventionsChart = document.getElementById('inventions-impact-chart');
        if (inventionsChart) {
            const chart = echarts.init(inventionsChart);
            const option = {
                title: {
                    text: '四大发明全球影响力评估',
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 20,
                        color: '#9d2933'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['文化影响', '科技影响', '经济影响', '军事影响'],
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
                    data: ['造纸术', '印刷术', '火药', '指南针']
                },
                yAxis: {
                    type: 'value',
                    name: '影响力指数'
                },
                series: [
                    {
                        name: '文化影响',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [95, 98, 60, 75]
                    },
                    {
                        name: '科技影响',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [85, 90, 80, 95]
                    },
                    {
                        name: '经济影响',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [90, 95, 70, 85]
                    },
                    {
                        name: '军事影响',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [30, 40, 98, 85]
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

// 在页面加载完成后初始化更多图表
document.addEventListener('DOMContentLoaded', function() {
    // 初始化基本图表
    initializeCharts();
    
    // 初始化更多图表
    initializeMoreCharts();
    
    // 添加滚动动画
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
    
    // 添加图片占位符
    const placeholders = document.querySelectorAll('.img-fluid, .img-thumbnail');
    placeholders.forEach(placeholder => {
        if (!placeholder.src || placeholder.src.includes('{{ url_for')) {
            const parent = placeholder.parentElement;
            const placeholderDiv = document.createElement('div');
            placeholderDiv.className = 'placeholder-image';
            placeholderDiv.innerHTML = '图片占位符<br>请添加相关图片';
            parent.replaceChild(placeholderDiv, placeholder);
        }
    });
});
