// 数据汇总模块初始化
function initDataSummary() {
    console.log('初始化数据汇总模块...');

    // 初始化成就分布饼图
    initAchievementsPieChart();

    // 初始化科技发展趋势图
    initScienceTrendChart();

    // 初始化文明对比图
    initCivilizationComparisonChart();

    // 初始化朝代雷达图
    initDynastyRadarChart();

    // 初始化探索图表
    initExplorerChart();

    // 初始化文明发展趋势图
    initCivilizationTrendChart();

    // 初始化文化中心图
    initCultureCentersChart();

    // 绑定数据仪表板控件事件
    bindDashboardControls();

    // 绑定数据探索工具事件
    bindExplorerControls();
}

// 初始化成就分布饼图
function initAchievementsPieChart() {
    const chartContainer = document.getElementById('achievements-pie-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(chartContainer);
    const option = {
        title: {
            text: '各领域成就分布',
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
            data: ['科学技术', '文学艺术', '哲学思想', '制度文明', '风俗习惯']
        },
        series: [
            {
                name: '成就分布',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data: [
                    {value: 148, name: '科学技术'},
                    {value: 135, name: '文学艺术'},
                    {value: 165, name: '哲学思想'},
                    {value: 120, name: '制度文明'},
                    {value: 110, name: '风俗习惯'}
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

// 初始化科技发展趋势图
function initScienceTrendChart() {
    const chartContainer = document.getElementById('science-trend-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(chartContainer);
    const option = {
        title: {
            text: '各朝代科技发展趋势',
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
    chart.setOption(option);

    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 初始化文明对比图
function initCivilizationComparisonChart() {
    const chartContainer = document.getElementById('civilization-comparison-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(chartContainer);
    const option = {
        title: {
            text: '世界古代文明对比',
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
            data: ['中国', '埃及', '巴比伦', '印度', '希腊/罗马'],
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
            data: ['科学技术', '文学艺术', '哲学思想', '政治制度', '农业发展']
        },
        yAxis: {
            type: 'value',
            name: '发展水平'
        },
        series: [
            {
                name: '中国',
                type: 'bar',
                data: [90, 85, 95, 88, 92]
            },
            {
                name: '埃及',
                type: 'bar',
                data: [80, 75, 70, 85, 75]
            },
            {
                name: '巴比伦',
                type: 'bar',
                data: [85, 65, 75, 80, 70]
            },
            {
                name: '印度',
                type: 'bar',
                data: [75, 80, 90, 75, 85]
            },
            {
                name: '希腊/罗马',
                type: 'bar',
                data: [75, 90, 95, 95, 70]
            }
        ]
    };
    chart.setOption(option);

    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 初始化朝代雷达图
function initDynastyRadarChart() {
    const chartContainer = document.getElementById('dynasty-radar-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(chartContainer);
    const option = {
        title: {
            text: '朝代成就雷达图',
            left: 'center',
            textStyle: {
                fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                fontSize: 20,
                color: '#9d2933'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: ['先秦', '秦汉', '隋唐', '宋元', '明清'],
            bottom: 0
        },
        radar: {
            indicator: [
                { name: '科学技术', max: 100 },
                { name: '文学艺术', max: 100 },
                { name: '哲学思想', max: 100 },
                { name: '政治制度', max: 100 },
                { name: '经济发展', max: 100 }
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [65, 70, 95, 75, 60],
                    name: '先秦'
                },
                {
                    value: [85, 80, 80, 95, 85],
                    name: '秦汉'
                },
                {
                    value: [90, 95, 75, 85, 90],
                    name: '隋唐'
                },
                {
                    value: [95, 90, 85, 80, 95],
                    name: '宋元'
                },
                {
                    value: [80, 85, 75, 85, 80],
                    name: '明清'
                }
            ]
        }]
    };
    chart.setOption(option);

    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 初始化探索图表
function initExplorerChart() {
    const chartContainer = document.getElementById('explorer-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(chartContainer);
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

// 初始化文明发展趋势图
function initCivilizationTrendChart() {
    const chartContainer = document.getElementById('civilization-trend-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(chartContainer);
    const option = {
        title: {
            text: '中华文明发展指数历史趋势',
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
            data: ['综合发展指数', '科技指数', '文化指数', '社会指数'],
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
            data: ['夏商周', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清']
        },
        yAxis: {
            type: 'value',
            name: '发展指数'
        },
        series: [
            {
                name: '综合发展指数',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 3,
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 8
                },
                data: [60, 75, 65, 90, 85, 80]
            },
            {
                name: '科技指数',
                type: 'line',
                smooth: true,
                data: [55, 70, 60, 85, 95, 75]
            },
            {
                name: '文化指数',
                type: 'line',
                smooth: true,
                data: [65, 80, 70, 95, 85, 90]
            },
            {
                name: '社会指数',
                type: 'line',
                smooth: true,
                data: [60, 75, 65, 85, 75, 70]
            }
        ]
    };
    chart.setOption(option);

    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 初始化文化中心图
function initCultureCentersChart() {
    const chartContainer = document.getElementById('culture-centers-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;

    const chart = echarts.init(chartContainer);
    const option = {
        title: {
            text: '中国历史文化中心变迁',
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
            data: ['政治中心', '经济中心', '文化中心'],
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
            data: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清']
        },
        yAxis: {
            type: 'value',
            name: '重要性指数',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name: '政治中心',
                type: 'bar',
                data: [85, 95, 70, 90, 80, 95]
            },
            {
                name: '经济中心',
                type: 'bar',
                data: [80, 90, 75, 85, 95, 90]
            },
            {
                name: '文化中心',
                type: 'bar',
                data: [90, 85, 80, 95, 90, 85]
            }
        ]
    };
    chart.setOption(option);

    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 绑定数据仪表板控件事件
function bindDashboardControls() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const dashboardViews = document.querySelectorAll('.dashboard-view');

    if (viewBtns.length > 0 && dashboardViews.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                viewBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                const view = this.getAttribute('data-view');

                // 隐藏所有视图
                dashboardViews.forEach(v => {
                    v.classList.remove('active');
                    v.style.display = 'none';
                });

                // 显示对应视图
                const targetView = document.getElementById(`view-${view}`);
                if (targetView) {
                    targetView.classList.add('active');
                    targetView.style.display = 'block';
                }
            });
        });
    }

    // 绑定朝代选择器事件
    const dynastySelect = document.getElementById('dynasty-select');
    if (dynastySelect) {
        dynastySelect.addEventListener('change', function() {
            // 更新朝代雷达图
            updateDynastyRadarChart();
        });
    }

    // 绑定指标选择器事件
    const metricSelect = document.getElementById('metric-select');
    if (metricSelect) {
        metricSelect.addEventListener('change', function() {
            // 更新朝代雷达图
            updateDynastyRadarChart();
        });
    }

    // 绑定类别按钮事件
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                categoryBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                // 隐藏所有类别内容
                const categoryContents = document.querySelectorAll('.category-content');
                categoryContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });

                // 显示对应类别内容
                const targetContent = document.getElementById(`${category}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block';
                }
            });
        });
    }

    // 绑定地图控制按钮事件
    const mapControlBtns = document.querySelectorAll('.map-control-btn');
    if (mapControlBtns.length > 0) {
        mapControlBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                mapControlBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                const period = this.getAttribute('data-period');
                // 更新地区地图
                updateRegionMap(period);
            });
        });
    }

    // 绑定分析标签事件
    const analysisTabs = document.querySelectorAll('.analysis-tab');
    if (analysisTabs.length > 0) {
        analysisTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的active类
                analysisTabs.forEach(t => t.classList.remove('active'));
                // 为当前标签添加active类
                this.classList.add('active');

                const tabName = this.getAttribute('data-tab');

                // 隐藏所有标签内容
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });

                // 显示对应标签内容
                const targetContent = document.getElementById(`${tabName}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block';
                }
            });
        });
    }
}

// 更新朝代雷达图（模拟函数，实际应该根据选择的朝代和指标进行更新）
function updateDynastyRadarChart() {
    console.log('更新朝代雷达图...');
    // 实际应该根据选择的朝代和指标更新雷达图数据
}

// 更新地区地图（模拟函数，实际应该根据选择的时期显示不同的地图数据）
function updateRegionMap(period) {
    console.log(`更新地区地图为${period}时期...`);
    // 实际应该根据选择的时期更新地图数据
}

// 绑定数据探索工具事件
function bindExplorerControls() {
    const generateChartBtn = document.getElementById('generate-chart-btn');

    if (generateChartBtn) {
        generateChartBtn.addEventListener('click', function() {
            const dimension = document.getElementById('explorer-dimension').value;
            const metric = document.getElementById('explorer-metric').value;
            const chartType = document.getElementById('explorer-chart-type').value;

            generateExplorerChart(dimension, metric, chartType);
        });
    }
}

// 生成探索图表的函数
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
    let metricName = '';
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
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 18,
                        color: '#9d2933'
                    }
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
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 18,
                        color: '#9d2933'
                    }
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
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Ma Shan Zheng, STZhongsong, SimSun, serif',
                        fontSize: 18,
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

    // 更新分析结果
    updateExplorerAnalysis(dimension, metric, chartType);
}

// 更新数据探索分析结果（模拟函数）
function updateExplorerAnalysis(dimension, metric, chartType) {
    const analysisParagraph = document.getElementById('explorer-analysis');
    if (!analysisParagraph) return;

    const dimensionName = getDimensionName(dimension);
    const metricName = getMetricName(metric);

    let analysisHTML = `<h4>数据分析结果</h4>`;

    switch(dimension) {
        case 'dynasty':
            analysisHTML += `<p>从朝代维度分析${metricName}，我们可以看出宋元时期在该指标上表现最为突出，这与当时社会经济文化的繁荣密切相关。秦汉和明清时期也有较高的表现，反映了这些朝代在文化发展上的重要地位。</p>`;
            break;
        case 'category':
            analysisHTML += `<p>从类别维度分析${metricName}，文学著作在数量上占据明显优势，这反映了中国传统文化中文学创作的繁荣程度。哲学著作虽然数量相对较少，但其影响力指数很高，表明其在中华文化中的重要地位。</p>`;
            break;
        case 'region':
            analysisHTML += `<p>从地区维度分析${metricName}，北方和东部地区在各项指标上普遍较高，这与历史上政治中心多位于这些地区有关。南方地区在文学和艺术方面表现尤为突出，特别是在宋代以后。</p>`;
            break;
        case 'time':
            analysisHTML += `<p>从时间维度分析${metricName}，可以看出中华文明呈现出稳步发展的趋势，尤其是公元1001-1500年间（对应宋元时期）达到一个高峰。这也符合中国古代文明发展的一般规律。</p>`;
            break;
    }

    analysisHTML += `<p>通过${chartType}类型图表展示，直观地体现了${dimensionName}与${metricName}之间的关系，揭示了中华文明发展的重要特点。</p>`;

    analysisParagraph.innerHTML = analysisHTML;
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

// 获取指标名称
function getMetricName(metric) {
    const metricNames = {
        'count': '数量',
        'impact': '影响力',
        'duration': '持续时间',
        'innovation': '创新程度'
    };

    return metricNames[metric] || metric;
}

// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', initDataSummary);