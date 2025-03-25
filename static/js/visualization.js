// 文化典故分布图表
function createCulturalStoriesChart() {
    const ctx = document.getElementById('cultural-stories-chart').getContext('2d');
    
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
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}

// 传统节日分布图表
function createFestivalDistributionChart() {
    const ctx = document.getElementById('festival-distribution-chart').getContext('2d');
    
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
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

// 杰出学者分布图表
function createScholarsDistributionChart() {
    const ctx = document.getElementById('scholars-distribution-chart').getContext('2d');
    
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
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

// 四大发明影响力图表
function createInventionsImpactChart() {
    const ctx = document.getElementById('inventions-impact-chart').getContext('2d');
    
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
    
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}

// 科学成就趋势图表
function createScienceAchievementChart() {
    const ctx = document.getElementById('science-achievement-chart').getContext('2d');
    
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
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

// 古代著作趋势图表
function createBooksTrendChart() {
    const ctx = document.getElementById('books-trend-chart').getContext('2d');
    
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
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

// 数据汇总图表
function createDataSummaryCharts() {
    // 文化遗产分布图
    const heritageCtx = document.getElementById('heritage-distribution-chart').getContext('2d');
    
    const heritageData = {
        labels: ['建筑遗产', '文物藏品', '非物质文化遗产', '古籍文献', '历史遗址'],
        datasets: [{
            label: '文化遗产分布',
            data: [35, 45, 25, 30, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    const heritageOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        family: "'Noto Sans SC', sans-serif",
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: '中国文化遗产类型分布',
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
    
    new Chart(heritageCtx, {
        type: 'doughnut',
        data: heritageData,
        options: heritageOptions
    });
    
    // 朝代文化成就对比图
    const dynastyCtx = document.getElementById('dynasty-achievement-chart').getContext('2d');
    
    const dynastyData = {
        labels: ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        datasets: [
            {
                label: '科学技术',
                data: [60, 75, 65, 85, 90, 80],
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: '文学艺术',
                data: [70, 80, 90, 95, 85, 75],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: '哲学思想',
                data: [95, 85, 75, 70, 80, 65],
                backgroundColor: 'rgba(255, 206, 86, 0.7)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    };
    
    const dynastyOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '成就指数',
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
                text: '中国各朝代文化成就对比',
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
    
    new Chart(dynastyCtx, {
        type: 'radar',
        data: dynastyData,
        options: dynastyOptions
    });
    
    // 文化影响力世界分布图
    const worldInfluenceCtx = document.getElementById('world-influence-chart').getContext('2d');
    
    const worldInfluenceData = {
        labels: ['东亚', '东南亚', '南亚', '中亚', '西亚', '欧洲', '非洲', '北美', '南美', '大洋洲'],
        datasets: [{
            label: '中国文化影响力',
            data: [95, 80, 60, 70, 50, 65, 40, 55, 35, 45],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
        }]
    };
    
    const worldInfluenceOptions = {
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
                text: '中国文化在世界各地区的影响力',
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
    
    new Chart(worldInfluenceCtx, {
        type: 'radar',
        data: worldInfluenceData,
        options: worldInfluenceOptions
    });
}

// 图片占位符功能
function setupPlaceholderImages() {
    const placeholders = document.querySelectorAll('.placeholder-image');
    const patterns = [
        'repeating-linear-gradient(45deg, #f9ca24 0px, #f9ca24 20px, #f0932b 20px, #f0932b 40px)',
        'repeating-linear-gradient(-45deg, #eb4d4b 0px, #eb4d4b 20px, #c23616 20px, #c23616 40px)',
        'repeating-linear-gradient(90deg, #6ab04c 0px, #6ab04c 20px, #badc58 20px, #badc58 40px)',
        'repeating-radial-gradient(circle at 50% 50%, #7ed6df 0px, #7ed6df 20px, #22a6b3 20px, #22a6b3 40px)',
        'repeating-linear-gradient(0deg, #686de0 0px, #686de0 20px, #4834d4 20px, #4834d4 40px)'
    ];
    
    placeholders.forEach(placeholder => {
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        placeholder.style.background = randomPattern;
        placeholder.style.height = '150px';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#fff';
        placeholder.style.fontWeight = 'bold';
        placeholder.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.5)';
        placeholder.style.borderRadius = '8px';
        placeholder.style.margin = '10px 0';
    });
}

// 初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    // 加载图表库
    if (typeof Chart !== 'undefined') {
        // 创建各种图表
        createCulturalStoriesChart();
        createFestivalDistributionChart();
        createScholarsDistributionChart();
        createInventionsImpactChart();
        createScienceAchievementChart();
        createBooksTrendChart();
        createDataSummaryCharts();
        
        // 设置图片占位符
        setupPlaceholderImages();
    } else {
        console.error('Chart.js 库未加载！');
    }
});
