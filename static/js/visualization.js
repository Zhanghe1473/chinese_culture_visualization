// 改进的可视化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 等待DOM和依赖库完全加载
    setTimeout(function() {
        // 确保所有图表容器都有正确的高度
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            if(!container.style.height) {
                container.style.height = '400px';
            }
        });

        // 初始化图表
        initializeCharts();
        initializeMoreCharts();
        initializeDataSummaryCharts();

        // 添加学者地图
        initializeScholarsMap();

        // 添加天文互动地图
        initializeAstronomyMap();

        // 添加世界影响力地图
        initializeWorldInfluenceMap();
    }, 200);
});

// 文化典故分布图表
function createCulturalStoriesChart() {
    const ctx = document.getElementById('cultural-stories-chart');

    if (!ctx) return;

    const data = {
        labels: ['哲理典故', '历史典故', '寓言故事', '成语典故', '民间传说'],
        datasets: [{
            label: '典故数量分布',
            data: [35, 42, 28, 65, 30],
            backgroundColor: [
                'rgba(214, 48, 49, 0.7)',
                'rgba(9, 132, 227, 0.7)',
                'rgba(253, 203, 110, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(162, 155, 254, 0.7)'
            ],
            borderColor: [
                'rgba(214, 48, 49, 1)',
                'rgba(9, 132, 227, 1)',
                'rgba(253, 203, 110, 1)',
                'rgba(46, 204, 113, 1)',
                'rgba(162, 155, 254, 1)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        family: "'Ma Shan Zheng', cursive",
                        size: 14
                    },
                    color: '#333'
                }
            },
            title: {
                display: true,
                text: '中国古代文化典故分类统计',
                font: {
                    family: "'Ma Shan Zheng', cursive",
                    size: 18
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    try {
        // 检查Chart是否已定义
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'pie',
                data: data,
                options: options
            });
        } else {
            console.error('Chart.js 未加载');
        }
    } catch (error) {
        console.error('创建文化典故图表时出错:', error);
    }
}

// 传统节日分布图表
function createFestivalDistributionChart() {
    const ctx = document.getElementById('festival-distribution-chart');

    if (!ctx) return;

    const data = {
        labels: ['春节', '元宵节', '清明节', '端午节', '七夕节', '中秋节', '重阳节', '冬至'],
        datasets: [{
            label: '传统节日分布',
            data: [10, 8, 7, 9, 6, 9, 5, 7],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(199, 199, 199, 0.7)',
                'rgba(83, 102, 255, 0.7)'
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 2
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '文化影响力指数',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: '传统节日',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '中国传统节日文化影响力',
                font: {
                    family: "'Ma Shan Zheng', cursive",
                    size: 18
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    try {
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
        } else {
            console.error('Chart.js 未加载');
        }
    } catch (error) {
        console.error('创建传统节日图表时出错:', error);
    }
}

// 杰出学者分布图表
function createScholarsDistributionChart() {
    const ctx = document.getElementById('scholars-distribution-chart');

    if (!ctx) return;

    const data = {
        labels: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        datasets: [
            {
                label: '思想家',
                data: [15, 8, 5, 7, 10, 6],
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: '科学家',
                data: [5, 10, 7, 12, 8, 15],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: '文学家',
                data: [8, 12, 15, 20, 18, 14],
                backgroundColor: 'rgba(255, 206, 86, 0.7)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: '艺术家',
                data: [3, 8, 12, 15, 10, 9],
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '人数',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: '朝代',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: '中国古代杰出学者朝代分布',
                font: {
                    family: "'Ma Shan Zheng', cursive",
                    size: 18
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    try {
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
        } else {
            console.error('Chart.js 未加载');
        }
    } catch (error) {
        console.error('创建学者分布图表时出错:', error);
    }
}

// 四大发明影响力图表
function createInventionsImpactChart() {
    const ctx = document.getElementById('inventions-impact-chart');

    if (!ctx) return;

    const data = {
        labels: ['造纸术', '印刷术', '火药', '指南针'],
        datasets: [
            {
                label: '对中国的影响',
                data: [90, 95, 80, 85],
                backgroundColor: 'rgba(214, 48, 49, 0.7)',
                borderColor: 'rgba(214, 48, 49, 1)',
                borderWidth: 1
            },
            {
                label: '对世界的影响',
                data: [95, 100, 90, 95],
                backgroundColor: 'rgba(9, 132, 227, 0.7)',
                borderColor: 'rgba(9, 132, 227, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: '中国古代四大发明影响力评估',
                font: {
                    family: "'Ma Shan Zheng', cursive",
                    size: 18
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    try {
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'radar',
                data: data,
                options: options
            });
        } else {
            console.error('Chart.js 未加载');
        }
    } catch (error) {
        console.error('创建四大发明图表时出错:', error);
    }
}

// 科学成就趋势图表
function createScienceAchievementChart() {
    const ctx = document.getElementById('science-achievement-chart');

    if (!ctx) return;

    const data = {
        labels: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        datasets: [
            {
                label: '天文学',
                data: [30, 45, 40, 60, 75, 65],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: '数学',
                data: [40, 50, 45, 55, 70, 60],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: '医学',
                data: [50, 65, 60, 70, 75, 80],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: '农学',
                data: [60, 55, 50, 65, 80, 75],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: '工艺技术',
                data: [45, 60, 70, 80, 85, 90],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '发展水平',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: '朝代',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: '中国古代科学技术发展趋势',
                font: {
                    family: "'Ma Shan Zheng', cursive",
                    size: 18
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    try {
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'line',
                data: data,
                options: options
            });
        } else if (typeof echarts !== 'undefined') {
            // 如果Chart.js不可用，尝试使用ECharts
            const chart = echarts.init(ctx);
            const echartsOption = {
                title: {
                    text: '中国古代科学技术发展趋势',
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
                    data: ['天文学', '数学', '医学', '农学', '工艺技术'],
                    top: 30
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清']
                },
                yAxis: {
                    type: 'value',
                    name: '发展水平'
                },
                series: [
                    {
                        name: '天文学',
                        type: 'line',
                        smooth: true,
                        data: [30, 45, 40, 60, 75, 65]
                    },
                    {
                        name: '数学',
                        type: 'line',
                        smooth: true,
                        data: [40, 50, 45, 55, 70, 60]
                    },
                    {
                        name: '医学',
                        type: 'line',
                        smooth: true,
                        data: [50, 65, 60, 70, 75, 80]
                    },
                    {
                        name: '农学',
                        type: 'line',
                        smooth: true,
                        data: [60, 55, 50, 65, 80, 75]
                    },
                    {
                        name: '工艺技术',
                        type: 'line',
                        smooth: true,
                        data: [45, 60, 70, 80, 85, 90]
                    }
                ]
            };
            chart.setOption(echartsOption);

            // 窗口大小变化时重新调整图表大小
            window.addEventListener('resize', function() {
                chart.resize();
            });
        } else {
            console.error('未找到可用的图表库');
        }
    } catch (error) {
        console.error('创建科学成就图表时出错:', error);
    }
}

// 古代著作趋势图表
function createBooksTrendChart() {
    const ctx = document.getElementById('books-trend-chart');

    if (!ctx) return;

    const data = {
        labels: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        datasets: [
            {
                label: '经部',
                data: [15, 25, 30, 40, 60, 80],
                backgroundColor: 'rgba(214, 48, 49, 0.7)',
                stack: 'Stack 0'
            },
            {
                label: '史部',
                data: [10, 30, 40, 50, 70, 90],
                backgroundColor: 'rgba(9, 132, 227, 0.7)',
                stack: 'Stack 0'
            },
            {
                label: '子部',
                data: [20, 35, 45, 55, 65, 85],
                backgroundColor: 'rgba(253, 203, 110, 0.7)',
                stack: 'Stack 0'
            },
            {
                label: '集部',
                data: [25, 40, 50, 70, 80, 100],
                backgroundColor: 'rgba(46, 204, 113, 0.7)',
                stack: 'Stack 0'
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '著作数量（相对值）',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: '朝代',
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 14
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: '中国古代著作数量变化趋势',
                font: {
                    family: "'Ma Shan Zheng', cursive",
                    size: 18
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    try {
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
        } else if (typeof echarts !== 'undefined') {
            // 如果Chart.js不可用，尝试使用ECharts
            const chart = echarts.init(ctx);
            const echartsOption = {
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
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['经部', '史部', '子部', '集部'],
                    top: 30
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清']
                },
                yAxis: {
                    type: 'value',
                    name: '著作数量（相对值）'
                },
                series: [
                    {
                        name: '经部',
                        type: 'bar',
                        stack: '总量',
                        data: [15, 25, 30, 40, 60, 80]
                    },
                    {
                        name: '史部',
                        type: 'bar',
                        stack: '总量',
                        data: [10, 30, 40, 50, 70, 90]
                    },
                    {
                        name: '子部',
                        type: 'bar',
                        stack: '总量',
                        data: [20, 35, 45, 55, 65, 85]
                    },
                    {
                        name: '集部',
                        type: 'bar',
                        stack: '总量',
                        data: [25, 40, 50, 70, 80, 100]
                    }
                ]
            };
            chart.setOption(echartsOption);

            // 窗口大小变化时重新调整图表大小
            window.addEventListener('resize', function() {
                chart.resize();
            });
        } else {
            console.error('未找到可用的图表库');
        }
    } catch (error) {
        console.error('创建古代著作图表时出错:', error);
    }
}

// 朝代时间线图表
function createDynastyTimelineChart() {
    const chartContainers = [
        document.getElementById('dynasty-timeline-chart'),
        document.getElementById('dynasty-timeline-chart-large')
    ];

    chartContainers.forEach(ctx => {
        if (!ctx) return;

        const data = {
            labels: ['夏朝', '商朝', '周朝', '秦朝', '汉朝', '三国', '晋朝', '南北朝', '隋朝', '唐朝', '五代十国', '宋朝', '元朝', '明朝', '清朝'],
            datasets: [{
                data: [471, 554, 790, 15, 426, 60, 155, 170, 38, 289, 53, 319, 97, 276, 268],
                backgroundColor: [
                    '#9d2933', '#d4a017', '#1a3263', '#9d2933', '#d4a017',
                    '#1a3263', '#9d2933', '#d4a017', '#1a3263', '#9d2933',
                    '#d4a017', '#1a3263', '#9d2933', '#d4a017', '#1a3263'
                ],
                borderColor: '#fff',
                borderWidth: 1
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '持续时间（年）',
                        font: {
                            family: "'Noto Sans SC', sans-serif",
                            size: 14
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '朝代',
                        font: {
                            family: "'Noto Sans SC', sans-serif",
                            size: 14
                        }
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '中国古代朝代时间线',
                    font: {
                        family: "'Ma Shan Zheng', cursive",
                        size: 18
                    },
                    color: '#333',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `持续时间: ${context.raw}年`;
                        }
                    }
                }
            }
        };

        try {
            if (typeof Chart !== 'undefined') {
                new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: options
                });
            } else if (typeof echarts !== 'undefined') {
                // 如果Chart.js不可用，尝试使用ECharts
                const chart = echarts.init(ctx);
                const echartsOption = {
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
                chart.setOption(echartsOption);

                // 窗口大小变化时重新调整图表大小
                window.addEventListener('resize', function() {
                    chart.resize();
                });
            } else {
                console.error('未找到可用的图表库');
            }
        } catch (error) {
            console.error('创建朝代时间线图表时出错:', error);
        }
    });
}

// 学者地图初始化
function initializeScholarsMap() {
    const mapContainer = document.getElementById('scholars-map-container');

    if (!mapContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(mapContainer);

    // 地图的边界轮廓借用一个中国地图数据
    // 实际应用中可以加载真实的地图数据
    const option = {
        title: {
            text: '中国古代杰出学者地理分布',
            left: 'center',
            textStyle: {
                fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                fontSize: 18,
                color: '#9d2933'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}人'
        },
        visualMap: {
            min: 0,
            max: 100,
            text: ['多', '少'],
            inRange: {
                color: ['#e8f7fc', '#91c7ae', '#1a3263']
            },
            calculable: true
        },
        series: [
            {
                name: '学者分布',
                type: 'map',
                map: 'china',
                roam: true,
                label: {
                    show: true
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {name: '山东', value: 85},
                    {name: '河南', value: 78},
                    {name: '陕西', value: 65},
                    {name: '江苏', value: 72},
                    {name: '浙江', value: 68},
                    {name: '安徽', value: 45},
                    {name: '湖北', value: 42},
                    {name: '福建', value: 38},
                    {name: '湖南', value: 35},
                    {name: '四川', value: 40},
                    {name: '河北', value: 55}
                ]
            }
        ]
    };

    // 尝试加载地图
    try {
        chart.setOption(option);

        // 窗口大小变化时重新调整图表大小
        window.addEventListener('resize', function() {
            chart.resize();
        });

        // 切换区域按钮事件
        const mapButtons = document.querySelectorAll('.map-controls .btn');

        if (mapButtons.length > 0) {
            mapButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const region = this.getAttribute('data-region');
                    switchMapRegion(chart, region);
                });
            });
        }
    } catch (error) {
        console.error('创建学者地图时出错:', error);

        // 如果加载失败，显示一个占位图
        mapContainer.innerHTML = '<div class="map-placeholder">地图加载失败，请确保已加载中国地图数据</div>';
    }
}

// 切换地图区域
function switchMapRegion(chart, region) {
    // 根据区域切换地图视图
    if (region === 'all') {
        chart.dispatchAction({
            type: 'restore'
        });
    } else {
        // 设置不同区域的中心点和缩放级别
        const regionCenter = {
            'north': [115, 40],
            'south': [113, 25],
            'east': [120, 30],
            'west': [105, 35]
        };

        chart.setOption({
            series: [{
                center: regionCenter[region],
                zoom: 2
            }]
        });
    }
}

// 天文互动地图初始化
function initializeAstronomyMap() {
    const skyMapContainer = document.getElementById('ancient-sky-map');

    if (!skyMapContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(skyMapContainer);

    // 创建模拟的星空图
    const option = {
        backgroundColor: '#0a1128',
        tooltip: {},
        series: [
            {
                name: '恒星',
                type: 'scatter',
                coordinateSystem: 'none',
                symbolSize: function(val) {
                    return val[2] * 2;
                },
                data: generateStarData(200),
                itemStyle: {
                    color: '#fff'
                }
            }
        ]
    };

    // 尝试加载星空图
    try {
        chart.setOption(option);

        // 窗口大小变化时重新调整图表大小
        window.addEventListener('resize', function() {
            chart.resize();
        });

        // 天象按钮事件
        const skyButtons = document.querySelectorAll('.astronomy-controls .btn');

        if (skyButtons.length > 0) {
            skyButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const skyObject = this.getAttribute('data-sky-object');
                    showSkyObject(chart, skyObject);
                });
            });
        }
    } catch (error) {
        console.error('创建天文互动地图时出错:', error);

        // 如果加载失败，显示一个占位图
        skyMapContainer.innerHTML = '<div class="sky-map-placeholder">星空图加载失败</div>';
    }
}

// 生成随机星星数据
function generateStarData(count) {
    const data = [];

    for (let i = 0; i < count; i++) {
        const x = Math.round(Math.random() * 400);
        const y = Math.round(Math.random() * 400);
        const size = Math.random() * 0.8 + 0.2;

        data.push([x, y, size]);
    }

    return data;
}

// 显示天象物体
function showSkyObject(chart, skyObject) {
    // 根据不同的天象对象更新图表
    let newOption = {};

    switch (skyObject) {
        case 'sun':
            newOption = {
                series: [
                    {
                        name: '日食记录',
                        type: 'effectScatter',
                        coordinateSystem: 'none',
                        symbolSize: 20,
                        data: [[200, 200, 1]],
                        itemStyle: {
                            color: '#ff9800'
                        },
                        rippleEffect: {
                            brushType: 'stroke'
                        }
                    }
                ],
                graphic: [
                    {
                        type: 'text',
                        left: 'center',
                        top: 'bottom',
                        style: {
                            text: '《春秋》记载了37次日食',
                            textAlign: 'center',
                            fill: '#fff',
                            fontSize: 14
                        }
                    }
                ]
            };
            break;

        case 'moon':
            // 绘制月相变化
            const moonPhases = [];
            for (let i = 0; i < 8; i++) {
                moonPhases.push({
                    type: 'circle',
                    shape: {
                        cx: 50 + i * 40,
                        cy: 150,
                        r: 15
                    },
                    style: {
                        fill: i === 0 || i === 7 ? '#333' : (i < 4 ? {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: '#333'
                            }, {
                                offset: i / 3,
                                color: '#333'
                            }, {
                                offset: i / 3,
                                color: '#fff'
                            }, {
                                offset: 1,
                                color: '#fff'
                            }]
                        } : {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: '#fff'
                            }, {
                                offset: (i - 4) / 3,
                                color: '#fff'
                            }, {
                                offset: (i - 4) / 3,
                                color: '#333'
                            }, {
                                offset: 1,
                                color: '#333'
                            }]
                        })
                    }
                });
            }

            newOption = {
                graphic: [
                    ...moonPhases,
                    {
                        type: 'text',
                        left: 'center',
                        top: 50,
                        style: {
                            text: '中国古代月相观测',
                            textAlign: 'center',
                            fill: '#fff',
                            fontSize: 18
                        }
                    },
                    {
                        type: 'text',
                        left: 'center',
                        top: 'bottom',
                        style: {
                            text: '《夏小正》是我国最早记录月相变化的著作',
                            textAlign: 'center',
                            fill: '#fff',
                            fontSize: 14
                        }
                    }
                ]
            };
            break;

        default:
            newOption = {};
    }

    // 更新图表
    chart.setOption(newOption);
}

// 世界影响力地图初始化
function initializeWorldInfluenceMap() {
    const mapContainer = document.getElementById('world-influence-map');

    if (!mapContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(mapContainer);

    // 世界影响力热力图
    const option = {
        title: {
            text: '中华文明世界影响力分布',
            left: 'center',
            textStyle: {
                fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                fontSize: 16,
                color: '#9d2933'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: 影响力指数 {c}'
        },
        visualMap: {
            min: 0,
            max: 100,
            text: ['高', '低'],
            inRange: {
                color: ['#e8f7fc', '#9bbdcc', '#1a3263']
            },
            calculable: true
        },
        series: [
            {
                name: '文化影响力',
                type: 'map',
                map: 'world',
                roam: true,
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {name: 'China', value: 100},
                    {name: 'Japan', value: 90},
                    {name: 'Korea', value: 85},
                    {name: 'Vietnam', value: 80},
                    {name: 'Mongolia', value: 75},
                    {name: 'Thailand', value: 65},
                    {name: 'Myanmar', value: 60},
                    {name: 'Malaysia', value: 55},
                    {name: 'Indonesia', value: 50},
                    {name: 'India', value: 45},
                    {name: 'Iran', value: 40},
                    {name: 'Russia', value: 35},
                    {name: 'Italy', value: 30},
                    {name: 'France', value: 30},
                    {name: 'United Kingdom', value: 25},
                    {name: 'Germany', value: 25},
                    {name: 'United States', value: 20},
                    {name: 'Australia', value: 15}
                ]
            }
        ]
    };

    // 尝试加载世界地图
    try {
        chart.setOption(option);

        // 窗口大小变化时重新调整图表大小
        window.addEventListener('resize', function() {
            chart.resize();
        });
    } catch (error) {
        console.error('创建世界影响力地图时出错:', error);

        // 如果加载失败，显示一个占位图
        mapContainer.innerHTML = '<div class="map-placeholder">世界地图加载失败，请确保已加载世界地图数据</div>';
    }
}

// 初始化所有图表
function initializeCharts() {
    console.log('初始化图表...');

    // 创建朝代时间线图表
    createDynastyTimelineChart();

    // 创建科学成就图表
    createScienceAchievementChart();

    // 创建著作趋势图表
    createBooksTrendChart();
}

// 初始化更多图表
function initializeMoreCharts() {
    console.log('初始化更多图表...');

    // 创建文化典故分布图表
    createCulturalStoriesChart();

    // 创建传统节日分布图表
    createFestivalDistributionChart();

    // 创建学者分布图表
    createScholarsDistributionChart();

    // 创建四大发明影响力图表
    createInventionsImpactChart();
}

// 初始化数据汇总图表
function initializeDataSummaryCharts() {
    // 如果数据汇总模块存在，初始化图表
    if (document.getElementById('data-summary')) {
        console.log('初始化数据汇总图表...');

        // 这里可以添加数据汇总页面特有的图表

        // 探索图表初始化
        initializeExplorerChart();
    }
}

// 初始化数据探索图表
function initializeExplorerChart() {
    const explorerChart = document.getElementById('explorer-chart');

    if (!explorerChart) return;

    if (typeof echarts !== 'undefined') {
        const chart = echarts.init(explorerChart);

        // 设置初始图表
        const option = {
            title: {
                text: '数据探索图表',
                left: 'center',
                textStyle: {
                    fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                    fontSize: 18,
                    color: '#9d2933'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '示例数据',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '科学技术' },
                        { value: 735, name: '文学艺术' },
                        { value: 580, name: '哲学思想' },
                        { value: 484, name: '历史政治' },
                        { value: 300, name: '其他' }
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

        // 将chart对象存储在window对象上，以便外部访问
        window.explorerChart = chart;
    }
}

// 生成探索图表的函数（供interactive.js调用）
function generateExplorerChart(dimension, metric, chartType) {
    if (!window.explorerChart) return;

    // 根据用户选择生成不同的图表数据
    let option = {};

    // 示例数据，实际应用中可以从服务器获取
    const dynastyData = {
        categories: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        counts: [120, 180, 160, 210, 240, 290],
        impacts: [85, 90, 75, 95, 88, 92],
        durations: [1000, 441, 385, 327, 416, 544],
        innovations: [75, 85, 70, 90, 80, 78]
    };

    const categoryData = {
        categories: ['经典著作', '科技著作', '历史著作', '文学著作', '哲学著作'],
        counts: [150, 120, 180, 210, 90],
        impacts: [95, 90, 85, 88, 92],
        durations: [1500, 1300, 1400, 1200, 1000],
        innovations: [80, 95, 75, 85, 90]
    };

    const regionData = {
        categories: ['北方', '南方', '东部', '西部', '中部'],
        counts: [210, 180, 190, 150, 170],
        impacts: [88, 85, 90, 80, 86],
        durations: [1400, 1200, 1300, 1100, 1250],
        innovations: [85, 80, 88, 75, 82]
    };

    const timeData = {
        categories: ['公元前', '公元1-500年', '公元501-1000年', '公元1001-1500年', '公元1501-1911年'],
        counts: [140, 160, 190, 220, 240],
        impacts: [80, 85, 90, 88, 85],
        durations: [1000, 500, 500, 500, 411],
        innovations: [70, 75, 85, 90, 88]
    };

    // 选择数据集
    let data = {};
    switch (dimension) {
        case 'dynasty':
            data = dynastyData;
            break;
        case 'category':
            data = categoryData;
            break;
        case 'region':
            data = regionData;
            break;
        case 'time':
            data = timeData;
            break;
        default:
            data = dynastyData;
    }

    // 选择指标
    let metricData = [];
    switch (metric) {
        case 'count':
            metricData = data.counts;
            metricName = '数量';
            break;
        case 'impact':
            metricData = data.impacts;
            metricName = '影响力';
            break;
        case 'duration':
            metricData = data.durations;
            metricName = '持续时间';
            break;
        case 'innovation':
            metricData = data.innovations;
            metricName = '创新程度';
            break;
        default:
            metricData = data.counts;
            metricName = '数量';
    }

    // 生成图表选项
    switch (chartType) {
        case 'bar':
            option = {
                title: {
                    text: `按${getDimensionName(dimension)}统计的${metricName}`,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: data.categories
                },
                yAxis: {
                    type: 'value',
                    name: metricName
                },
                series: [
                    {
                        name: metricName,
                        type: 'bar',
                        data: metricData,
                        itemStyle: {
                            color: function(params) {
                                const colorList = ['#9d2933', '#d4a017', '#1a3263', '#46a832', '#8a2be2'];
                                return colorList[params.dataIndex % colorList.length];
                            }
                        }
                    }
                ]
            };
            break;

        case 'line':
            option = {
                title: {
                    text: `按${getDimensionName(dimension)}统计的${metricName}趋势`,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: data.categories
                },
                yAxis: {
                    type: 'value',
                    name: metricName
                },
                series: [
                    {
                        name: metricName,
                        type: 'line',
                        data: metricData,
                        smooth: true,
                        itemStyle: {
                            color: '#1a3263'
                        },
                        lineStyle: {
                            width: 3,
                            color: '#1a3263'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(26, 50, 99, 0.5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(26, 50, 99, 0)'
                                }]
                            }
                        }
                    }
                ]
            };
            break;

        case 'pie':
            option = {
                title: {
                    text: `按${getDimensionName(dimension)}统计的${metricName}分布`,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: data.categories
                },
                series: [
                    {
                        name: metricName,
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
                        data: data.categories.map((category, index) => {
                            return {
                                value: metricData[index],
                                name: category
                            };
                        })
                    }
                ]
            };
            break;

        case 'radar':
            option = {
                title: {
                    text: `按${getDimensionName(dimension)}统计的${metricName}雷达图`,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                radar: {
                    indicator: data.categories.map(category => {
                        return {
                            name: category,
                            max: Math.max(...metricData) * 1.2
                        };
                    })
                },
                series: [
                    {
                        name: metricName,
                        type: 'radar',
                        data: [
                            {
                                value: metricData,
                                name: metricName,
                                areaStyle: {
                                    color: 'rgba(26, 50, 99, 0.5)'
                                },
                                lineStyle: {
                                    color: '#1a3263'
                                },
                                itemStyle: {
                                    color: '#1a3263'
                                }
                            }
                        ]
                    }
                ]
            };
            break;

        default:
            option = {};
    }

    // 设置图表选项
    window.explorerChart.setOption(option, true);
}

// 获取维度名称
function getDimensionName(dimension) {
    const dimensionNames = {
        'dynasty': '朝代',
        'category': '类别',
        'region': '地区',
        'time': '时间'
    };

    return dimensionNames[dimension] || dimension;
}