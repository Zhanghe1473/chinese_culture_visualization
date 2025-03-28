// Chart initializer - ensures charts are properly rendered
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chart initializer loaded');
function waitForEcharts() {
    let attempts = 0;
    const maxAttempts = 10; // Maximum number of attempts

    function check() {
        attempts++;
        if (typeof echarts !== 'undefined') {
            console.log('ECharts is available, initializing charts');
            initChartsWithDelay();
        } else if (attempts < maxAttempts) {
            console.log('ECharts not available yet, waiting... (Attempt ' + attempts + '/' + maxAttempts + ')');
            setTimeout(check, 200);
        } else {
            console.error('ECharts failed to load after ' + maxAttempts + ' attempts. Continuing without charts.');
            // Show placeholder for chart containers
            document.querySelectorAll('.chart-container').forEach(container => {
                container.innerHTML = '<div class="chart-error">图表加载失败，请刷新页面重试</div>';
            });
        }
    }

    check();
}

    // Initialize charts with delay
    function initChartsWithDelay() {
        // Call chart initialization functions with delays
        setTimeout(function() {
            if (typeof initializeCharts === 'function') {
                console.log('Calling initializeCharts');
                initializeCharts();
            } else {
                console.log('initializeCharts function not available');
            }
        }, 500);

        setTimeout(function() {
            if (typeof initializeMoreCharts === 'function') {
                console.log('Calling initializeMoreCharts');
                initializeMoreCharts();
            } else {
                console.log('initializeMoreCharts function not available');
            }
        }, 1000);

        // Initialize specific charts that might not be covered by the general functions
        initSpecificCharts();
    }

    // Initialize specific charts based on their containers
    function initSpecificCharts() {
        setTimeout(function() {
            console.log('Initializing specific charts');

            // Dynasty timeline chart
            initializeChartIfContainerExists('dynasty-timeline-chart',
                function(container) {
                    console.log('Initializing dynasty timeline chart');
                    const chart = echarts.init(container);
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

                    // Window resize event
                    window.addEventListener('resize', function() {
                        chart.resize();
                    });
                    return chart;
                }
            );

            // Science achievement chart
            initializeChartIfContainerExists('science-achievement-chart',
                function(container) {
                    console.log('Initializing science achievement chart');
                    const chart = echarts.init(container);
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

                    // Window resize event
                    window.addEventListener('resize', function() {
                        chart.resize();
                    });
                    return chart;
                }
            );

            // Cultural stories chart
            initializeChartIfContainerExists('cultural-stories-chart',
                function(container) {
                    console.log('Initializing cultural stories chart');
                    const chart = echarts.init(container);
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
                            data: ['历史典故', '神话传说', '寓言故事', '成语典故', '民间传说']
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
                                    { value: 75, name: '成语典故' },
                                    { value: 120, name: '民间传说' }
                                ]
                            }
                        ]
                    };
                    chart.setOption(option);

                    // Window resize event
                    window.addEventListener('resize', function() {
                        chart.resize();
                    });
                    return chart;
                }
            );

            // Inventions impact chart
            initializeChartIfContainerExists('inventions-impact-chart',
                function(container) {
                    console.log('Initializing inventions impact chart');
                    const chart = echarts.init(container);
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

                    // Window resize event
                    window.addEventListener('resize', function() {
                        chart.resize();
                    });
                    return chart;
                }
            );

            // Scholars distribution chart
            initializeChartIfContainerExists('scholars-distribution-chart',
                function(container) {
                    console.log('Initializing scholars distribution chart');
                    const chart = echarts.init(container);
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

                    // Window resize event
                    window.addEventListener('resize', function() {
                        chart.resize();
                    });
                    return chart;
                }
            );

            // Books trend chart
            initializeChartIfContainerExists('books-trend-chart',
                function(container) {
                    console.log('Initializing books trend chart');
                    const chart = echarts.init(container);
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
                            data: ['经部', '史部', '子部', '集部'],
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
                                name: '经部',
                                type: 'line',
                                stack: '总量',
                                data: [15, 25, 30, 40, 60, 80],
                                smooth: true
                            },
                            {
                                name: '史部',
                                type: 'line',
                                stack: '总量',
                                data: [10, 30, 40, 50, 70, 90],
                                smooth: true
                            },
                            {
                                name: '子部',
                                type: 'line',
                                stack: '总量',
                                data: [20, 35, 45, 55, 65, 85],
                                smooth: true
                            },
                            {
                                name: '集部',
                                type: 'line',
                                stack: '总量',
                                data: [25, 40, 50, 70, 80, 100],
                                smooth: true
                            }
                        ]
                    };
                    chart.setOption(option);

                    // Window resize event
                    window.addEventListener('resize', function() {
                        chart.resize();
                    });
                    return chart;
                }
            );

            // Initialize data summary charts if they exist
            if (document.getElementById('achievements-pie-chart') ||
                document.getElementById('science-trend-chart') ||
                document.getElementById('civilization-comparison-chart')) {
                console.log('Initializing data summary charts');
                if (typeof initDataSummary === 'function') {
                    initDataSummary();
                }
            }

        }, 1500);
    }

    // Helper function to initialize a chart if its container exists
    function initializeChartIfContainerExists(containerId, initFunction) {
    try {
        const container = document.getElementById(containerId);
        if (container) {
            console.log(`Container ${containerId} found, initializing chart`);
            try {
                const chart = initFunction(container);
                return chart;
            } catch (error) {
                console.error(`Error initializing chart in container ${containerId}:`, error);
                // Show error message in container
                container.innerHTML = `
                    <div class="chart-error">
                        <p>图表加载失败</p>
                        <small>${error.message}</small>
                    </div>
                `;
            }
        } else {
            console.log(`Container ${containerId} not found, skipping chart initialization`);
        }
        return null;
    } catch (error) {
        console.error(`Error in initializeChartIfContainerExists for ${containerId}:`, error);
        return null;
    }
}

    // Fix chart container heights
    function fixChartContainerHeights() {
    try {
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            if (!container.style.height || container.style.height === '') {
                console.log('Setting height for chart container', container);
                container.style.height = '400px';
            }
        });
    } catch (error) {
        console.error('Error fixing chart container heights:', error);
    }
}

    // Begin chart initialization process
    fixChartContainerHeights();
    waitForEcharts();
});