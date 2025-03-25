// 增强网站的交互功能脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有交互功能
    initSearchFunction();
    initCarousel();
    initModals();
    initFilterTabs();
    initTimelineExpand();
    initFeatureInteractive();
    initInventionTabs();
    initStoryExpand();
    initBackToTop();
    enhanceChartContainers();
    initFestivalCalendar();
    initCustomsTabs();
    initDataDashboard();
    initDataExplorer();
});

// 搜索功能初始化
function initSearchFunction() {
    const globalSearch = document.getElementById('global-search');
    const searchBtn = document.getElementById('search-btn');

    if (globalSearch && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(globalSearch.value);
        });

        globalSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(globalSearch.value);
            }
        });
    }

    // 专门的搜索功能初始化（学者、著作、典故等）
    const scholarSearch = document.getElementById('scholar-search');
    const scholarSearchBtn = document.getElementById('scholar-search-btn');

    if (scholarSearch && scholarSearchBtn) {
        scholarSearchBtn.addEventListener('click', function() {
            searchScholar(scholarSearch.value);
        });
    }

    const worksSearch = document.getElementById('works-search');
    const worksSearchBtn = document.getElementById('works-search-btn');

    if (worksSearch && worksSearchBtn) {
        worksSearchBtn.addEventListener('click', function() {
            searchWorks(worksSearch.value);
        });
    }

    const storySearch = document.getElementById('story-search');
    const storySearchBtn = document.getElementById('story-search-btn');

    if (storySearch && storySearchBtn) {
        storySearchBtn.addEventListener('click', function() {
            searchStories(storySearch.value);
        });
    }
}

// 全局搜索实现
function performSearch(keyword) {
    if (!keyword.trim()) return;

    // 搜索范围：标题、内容
    const searchableElements = document.querySelectorAll('.card-title, .card-content, h4, p');
    let results = [];

    searchableElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(keyword.toLowerCase())) {
            // 找到最近的卡片或小节
            const card = element.closest('.card') || element.closest('.section');
            if (card && !results.includes(card)) {
                results.push(card);
            }
        }
    });

    // 显示搜索结果
    if (results.length > 0) {
        // 高亮搜索结果
        results.forEach(result => {
            result.classList.add('search-highlight');
            setTimeout(() => {
                result.classList.remove('search-highlight');
            }, 3000);
        });

        // 滚动到第一个结果
        results[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 显示结果数量
        showMessage(`找到 ${results.length} 个匹配结果`);
    } else {
        showMessage('未找到匹配内容');
    }
}

// 显示消息提示
function showMessage(message) {
    // 检查是否已存在消息元素
    let messageElement = document.getElementById('message-box');

    if (!messageElement) {
        // 创建消息元素
        messageElement = document.createElement('div');
        messageElement.id = 'message-box';
        messageElement.className = 'message-box';
        document.body.appendChild(messageElement);
    }

    // 显示消息
    messageElement.textContent = message;
    messageElement.classList.add('show');

    // 3秒后隐藏消息
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 3000);
}

// 初始化轮播图
function initCarousel() {
    const carousel = document.querySelector('.carousel-container');

    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');

    if (slides.length === 0) return;

    let currentSlide = 0;

    // 隐藏所有幻灯片，只显示当前幻灯片
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    // 显示下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 显示上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 初始显示第一张幻灯片
    showSlide(currentSlide);

    // 绑定按钮事件
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // 自动轮播
    let slideInterval = setInterval(nextSlide, 5000);

    // 鼠标悬停时暂停轮播
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // 鼠标离开时继续轮播
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// 初始化模态框
function initModals() {
    // 学者详情模态框
    const scholarModal = document.getElementById('scholar-detail-modal');
    const scholarDetailBtns = document.querySelectorAll('.scholar-detail-btn');

    if (scholarModal && scholarDetailBtns.length > 0) {
        const closeBtn = scholarModal.querySelector('.close-btn');
        const modalContent = scholarModal.querySelector('#scholar-detail-content');

        scholarDetailBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const scholarId = this.getAttribute('data-scholar');
                loadScholarDetail(scholarId, modalContent);
                scholarModal.style.display = 'block';
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                scholarModal.style.display = 'none';
            });
        }

        // 点击模态框外部关闭
        window.addEventListener('click', function(e) {
            if (e.target === scholarModal) {
                scholarModal.style.display = 'none';
            }
        });
    }

    // 著作详情模态框
    const workModal = document.getElementById('work-detail-modal');
    const workDetailBtns = document.querySelectorAll('.work-detail-btn');

    if (workModal && workDetailBtns.length > 0) {
        const closeBtn = workModal.querySelector('.close-btn');
        const modalContent = workModal.querySelector('#work-detail-content');

        workDetailBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const workId = this.getAttribute('data-work');
                loadWorkDetail(workId, modalContent);
                workModal.style.display = 'block';
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                workModal.style.display = 'none';
            });
        }

        // 点击模态框外部关闭
        window.addEventListener('click', function(e) {
            if (e.target === workModal) {
                workModal.style.display = 'none';
            }
        });
    }
}

// 加载学者详情数据
function loadScholarDetail(scholarId, container) {
    // 这里可以通过AJAX从服务器获取数据，但在此示例中使用模拟数据
    const scholarDetails = {
        'confucius': {
            name: '孔子',
            lifespan: '前551年-前479年',
            dynasty: '春秋时期',
            birthplace: '鲁国陬邑（今山东曲阜）',
            title: '至圣先师',
            image: '../static/images/scholars/confucius_large.jpg',
            biography: `孔子（前551年-前479年），名丘，字仲尼，春秋末期鲁国人，中国古代伟大的思想家、教育家、儒家学派创始人。孔子开创了私人讲学的风气，是中国古代第一位平民教育家。他倡导"有教无类"，主张因材施教、启发诱导的教育方法。

                孔子周游列国十四年，晚年修订六经，即《诗》《书》《礼》《乐》《易》《春秋》。相传他有弟子三千，其中贤人七十二。孔子去世后，其弟子及后学整理其言行，编成《论语》一书，成为儒家经典著作之一。

                孔子思想的核心是"仁"，主张"己所不欲，勿施于人"，倡导"克己复礼"、"忠恕之道"，提出了"仁、义、礼、智、信"的道德规范，对中国和东亚地区的政治、教育、文化等方面产生了深远影响。`,
            contributions: [
                '创立了儒家学派，成为中国传统文化的主流思想',
                '开创了私人讲学的风气，是中国古代第一位平民教育家',
                '提出"仁"的思想，主张"仁者爱人"，强调道德修养',
                '修订六经，整理了中国古代的文化典籍',
                '提出了"有教无类"、"因材施教"等先进的教育思想'
            ],
            quotes: [
                '学而不思则罔，思而不学则殆。',
                '己所不欲，勿施于人。',
                '三人行，必有我师焉。择其善者而从之，其不善者而改之。',
                '知之者不如好之者，好之者不如乐之者。',
                '德不孤，必有邻。'
            ]
        },
        'laozi': {
            // 老子详情
        },
        'mozi': {
            // 墨子详情
        }
        // 其他学者数据
    };

    const scholar = scholarDetails[scholarId];

    if (!scholar) {
        container.innerHTML = '<p>抱歉，未找到学者详情</p>';
        return;
    }

    // 渲染学者详情
    let html = `
        <div class="scholar-detail-header">
            <h3>${scholar.name}</h3>
            <p class="scholar-lifespan">${scholar.lifespan}</p>
            <div class="scholar-tags">
                <span class="tag">${scholar.dynasty}</span>
                <span class="tag">${scholar.title}</span>
            </div>
        </div>
        <div class="scholar-detail-body">
            <div class="scholar-image">
                <img src="${scholar.image}" alt="${scholar.name}" class="img-fluid">
            </div>
            <div class="scholar-info">
                <h4>个人简介</h4>
                <p>${scholar.biography}</p>
                
                <h4>主要贡献</h4>
                <ul class="contribution-list">
                    ${scholar.contributions.map(item => `<li>${item}</li>`).join('')}
                </ul>
                
                <h4>名言名句</h4>
                <div class="quotes-container">
                    ${scholar.quotes.map(quote => `<div class="quote">"${quote}"</div>`).join('')}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// 加载著作详情数据
function loadWorkDetail(workId, container) {
    // 这里可以通过AJAX从服务器获取数据，但在此示例中使用模拟数据
    const workDetails = {
        'lunyu': {
            title: '论语',
            author: '孔子弟子及再传弟子',
            dynasty: '春秋战国时期',
            category: '儒家经典',
            image: '../static/images/works/lunyu_large.jpg',
            intro: `《论语》是记录孔子及其弟子言行的语录集，由孔子弟子及再传弟子编撰而成。全书共20篇，492章，主要记录了孔子及其弟子的言行，集中体现了孔子的政治主张、伦理思想、道德观念和教育原则等。

                《论语》与《大学》《中庸》《孟子》并称"四书"，是儒家学派的经典著作之一，对中国古代的教育、政治、思想等方面产生了深远的影响。`,
            content: [
                {
                    chapter: '学而第一',
                    excerpts: [
                        '子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"',
                        '曾子曰："吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？"',
                        '子曰："温故而知新，可以为师矣。"'
                    ]
                },
                {
                    chapter: '为政第二',
                    excerpts: [
                        '子曰："为政以德，譬如北辰，居其所而众星共之。"',
                        '子曰："学而不思则罔，思而不学则殆。"',
                        '子曰："由，诲女知之乎？知之为知之，不知为不知，是知也。"'
                    ]
                }
            ],
            influence: [
                '成为儒家学派的重要经典，是研究孔子思想的最可靠资料',
                '对中国传统教育产生了深远影响，是科举考试的重要内容',
                '对中国传统伦理道德观念的形成具有奠基性作用',
                '不仅在中国，在日本、朝鲜半岛等东亚地区也有广泛影响'
            ]
        },
        'daodejing': {
            // 道德经详情
        },
        'sunzi': {
            // 孙子兵法详情
        }
        // 其他著作数据
    };

    const work = workDetails[workId];

    if (!work) {
        container.innerHTML = '<p>抱歉，未找到著作详情</p>';
        return;
    }

    // 渲染著作详情
    let html = `
        <div class="work-detail-header">
            <h3>${work.title}</h3>
            <div class="work-tags">
                <span class="tag">${work.dynasty}</span>
                <span class="tag">${work.category}</span>
                <span class="tag">作者：${work.author}</span>
            </div>
        </div>
        <div class="work-detail-body">
            <div class="work-image">
                <img src="${work.image}" alt="${work.title}" class="img-fluid">
            </div>
            <div class="work-info">
                <h4>著作简介</h4>
                <p>${work.intro}</p>
                
                <h4>典型内容</h4>
                <div class="work-content">
                    ${work.content.map(chapter => `
                        <div class="work-chapter">
                            <h5>${chapter.chapter}</h5>
                            <div class="chapter-excerpts">
                                ${chapter.excerpts.map(excerpt => `<p class="excerpt">${excerpt}</p>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <h4>历史影响</h4>
                <ul class="influence-list">
                    ${work.influence.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// 初始化筛选标签功能
function initFilterTabs() {
    // 文化典故筛选
    const storyFilterBtns = document.querySelectorAll('.stories-filter .filter-btn');
    const storyCards = document.querySelectorAll('.story-card');

    if (storyFilterBtns.length > 0 && storyCards.length > 0) {
        storyFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                storyFilterBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                storyCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 著作分类筛选
    const worksCategoryItems = document.querySelectorAll('.works-categories .category-item');
    const workCards = document.querySelectorAll('.work-card');
    const categoryDescText = document.getElementById('category-desc-text');

    if (worksCategoryItems.length > 0 && workCards.length > 0) {
        const categoryDescs = {
            'all': '四部分类是中国古代图书分类法，将典籍分为经、史、子、集四大类。经部为儒家经典，史部为历史著作，子部为诸子百家著作，集部为文学作品集。',
            'jing': '经部是四部分类法中的第一部，主要收录儒家经典及其相关注疏著作，包括《易》《书》《诗》《礼》《春秋》等经典及四书。',
            'shi': '史部是四部分类法中的第二部，主要收录历史著作，包括正史、编年、纪事本末、别史、杂史、传记、地理、政书等类别。',
            'zi': '子部是四部分类法中的第三部，主要收录诸子百家著作，包括儒家、道家、法家、兵家、农家、医家、天文算法、艺术等类别。',
            'ji': '集部是四部分类法中的第四部，主要收录文学作品集，包括楚辞、别集、总集、诗文评、词曲等类别。'
        };

        worksCategoryItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有项的active类
                worksCategoryItems.forEach(i => i.classList.remove('active'));
                // 为当前项添加active类
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                // 更新描述文本
                if (categoryDescText && categoryDescs[category]) {
                    categoryDescText.textContent = categoryDescs[category];
                }

                // 筛选作品卡片
                if (category === 'all') {
                    workCards.forEach(card => card.style.display = 'block');
                } else {
                    workCards.forEach(card => {
                        if (card.getAttribute('data-category').includes(category)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
}

// 初始化时间线展开功能
function initTimelineExpand() {
    const timelineExpandBtn = document.getElementById('timeline-expand-btn');
    const timeline = document.querySelector('.timeline');

    if (timelineExpandBtn && timeline) {
        const timelineItems = timeline.querySelectorAll('.timeline-item');
        let expanded = false;

        // 默认只显示前5个时间线项
        if (timelineItems.length > 5) {
            for (let i = 5; i < timelineItems.length; i++) {
                timelineItems[i].style.display = 'none';
            }
        }

        timelineExpandBtn.addEventListener('click', function() {
            if (!expanded) {
                // 展开所有时间线项
                timelineItems.forEach(item => {
                    item.style.display = 'block';
                });
                timelineExpandBtn.textContent = '收起时间线';
                expanded = true;
            } else {
                // 收起，只显示前5个
                for (let i = 0; i < timelineItems.length; i++) {
                    if (i < 5) {
                        timelineItems[i].style.display = 'block';
                    } else {
                        timelineItems[i].style.display = 'none';
                    }
                }
                timelineExpandBtn.textContent = '查看完整时间线';
                expanded = false;
            }
        });
    }
}

// 初始化特点互动功能
function initFeatureInteractive() {
    const featureItems = document.querySelectorAll('.feature-item');

    if (featureItems.length > 0) {
        featureItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有项的active类
                featureItems.forEach(i => i.classList.remove('active'));
                // 为当前项添加active类
                this.classList.add('active');
            });
        });
    }
}

// 初始化四大发明标签切换功能
function initInventionTabs() {
    const inventionTabs = document.querySelectorAll('.invention-tab');
    const inventionPanels = document.querySelectorAll('.invention-panel');

    if (inventionTabs.length > 0 && inventionPanels.length > 0) {
        inventionTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的active类
                inventionTabs.forEach(t => t.classList.remove('active'));
                // 为当前标签添加active类
                this.classList.add('active');

                const invention = this.getAttribute('data-invention');

                // 隐藏所有面板
                inventionPanels.forEach(panel => {
                    panel.classList.remove('active');
                });

                // 显示对应面板
                const targetPanel = document.getElementById(`${invention}-panel`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // 演示按钮事件
    const demoBtns = document.querySelectorAll('.invention-demo-btn');

    if (demoBtns.length > 0) {
        demoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const invention = this.getAttribute('data-invention');
                showInventionDemo(invention);
            });
        });
    }
}

// 显示发明演示
function showInventionDemo(invention) {
    // 这里可以实现更复杂的演示效果，例如弹出模态框播放动画或视频
    const demoMessages = {
        'paper': '正在演示造纸过程...',
        'printing': '正在演示印刷过程...',
        'gunpowder': '正在演示火药制作和使用...',
        'compass': '正在演示指南针原理...'
    };

    showMessage(demoMessages[invention] || '演示即将推出');
}

// 初始化典故展开功能
function initStoryExpand() {
    const expandBtns = document.querySelectorAll('.story-expand-btn');

    if (expandBtns.length > 0) {
        expandBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const storyId = this.getAttribute('data-story');
                const storyCard = this.closest('.story-card');
                const storyFull = document.getElementById(`story-${storyId}`);

                if (storyCard && storyFull) {
                    storyCard.classList.add('expanded');
                    storyFull.style.display = 'block';
                }
            });
        });
    }

    const collapseBtns = document.querySelectorAll('.story-collapse-btn');

    if (collapseBtns.length > 0) {
        collapseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const storyCard = this.closest('.story-card');
                const storyFull = this.closest('.story-full');

                if (storyCard && storyFull) {
                    storyCard.classList.remove('expanded');
                    storyFull.style.display = 'none';
                }
            });
        });
    }
}

// 初始化返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (backToTopBtn) {
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // 点击返回顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 确保所有图表容器都有正确的高度
function enhanceChartContainers() {
    const chartContainers = document.querySelectorAll('.chart-container');

    chartContainers.forEach(container => {
        if(!container.style.height) {
            container.style.height = '400px';
        }
    });
}

// 初始化节日日历
function initFestivalCalendar() {
    const calendarBody = document.querySelector('.calendar-body');
    const calendarTitle = document.querySelector('.calendar-title');
    const prevBtn = document.querySelector('.calendar-nav-btn[data-direction="prev"]');
    const nextBtn = document.querySelector('.calendar-nav-btn[data-direction="next"]');

    if (!calendarBody || !calendarTitle) return;

    // 中国传统节日数据（农历）
    const festivals = [
        { name: '春节', month: 1, day: 1, description: '农历新年，是中国最重要的传统节日' },
        { name: '元宵节', month: 1, day: 15, description: '又称上元节，赏花灯、猜灯谜、吃元宵' },
        { name: '清明节', month: '清明', day: '', description: '扫墓祭祖，寄托哀思，也是春游踏青的好时节' },
        { name: '端午节', month: 5, day: 5, description: '赛龙舟、吃粽子、挂艾草，纪念爱国诗人屈原' },
        { name: '七夕节', month: 7, day: 7, description: '中国情人节，纪念牛郎织女的美丽爱情故事' },
        { name: '中秋节', month: 8, day: 15, description: '赏月、吃月饼，象征团圆和丰收' },
        { name: '重阳节', month: 9, day: 9, description: '登高远眺、佩插茱萸、饮菊花酒，敬老、孝老' },
        { name: '冬至', month: '冬至', day: '', description: '北方吃饺子，南方吃汤圆，是一个重要的阳气回升的节气' }
    ];

    // 当前显示的月份（农历）
    let currentMonth = 1;

    // 更新日历显示
    function updateCalendar() {
        // 更新标题
        calendarTitle.textContent = `农历${currentMonth}月节日`;

        // 清空日历内容
        calendarBody.innerHTML = '';

        // 筛选当前月份的节日
        const monthFestivals = festivals.filter(festival => {
            if (typeof festival.month === 'number') {
                return festival.month === currentMonth;
            } else {
                // 处理节气节日（如清明、冬至）
                // 简化处理，实际应考虑更复杂的逻辑
                return (festival.month === '清明' && currentMonth === 3) ||
                       (festival.month === '冬至' && currentMonth === 11);
            }
        });

        // 创建日历内容
        if (monthFestivals.length > 0) {
            monthFestivals.forEach(festival => {
                const festivalItem = document.createElement('div');
                festivalItem.className = 'calendar-item';

                const dayText = festival.day ? `${festival.day}日` : '';

                festivalItem.innerHTML = `
                    <div class="festival-date">${festival.name} ${dayText}</div>
                    <div class="festival-desc">${festival.description}</div>
                `;

                festivalItem.addEventListener('click', function() {
                    // 显示对应节日的详情
                    showFestivalDetail(festival.name.toLowerCase());
                });

                calendarBody.appendChild(festivalItem);
            });
        } else {
            // 如果当月没有节日
            const noFestival = document.createElement('div');
            noFestival.className = 'no-festival';
            noFestival.textContent = '本月无重要传统节日';
            calendarBody.appendChild(noFestival);
        }
    }

    // 显示节日详情
    function showFestivalDetail(festivalName) {
        // 隐藏所有节日详情
        const festivalDetails = document.querySelectorAll('.festival-detail');
        festivalDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        // 显示对应节日详情
        const targetDetail = document.getElementById(`festival-${festivalName}`);
        if (targetDetail) {
            targetDetail.classList.add('active');
        }
    }

    // 初始化日历
    updateCalendar();

    // 绑定导航按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentMonth = currentMonth === 1 ? 12 : currentMonth - 1;
            updateCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentMonth = currentMonth === 12 ? 1 : currentMonth + 1;
            updateCalendar();
        });
    }
}

// 初始化文化习俗标签切换
function initCustomsTabs() {
    const customTabs = document.querySelectorAll('.custom-tab');
    const seasonBtns = document.querySelectorAll('.season-btn');

    if (customTabs.length > 0) {
        customTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的active类
                customTabs.forEach(t => t.classList.remove('active'));
                // 为当前标签添加active类
                this.classList.add('active');

                // 这里可以添加切换内容的逻辑
                const tabName = this.getAttribute('data-tab');
                switchCustomsContent(tabName);
            });
        });
    }

    if (seasonBtns.length > 0) {
        seasonBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                seasonBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                // 这里可以添加按季节筛选的逻辑
                const season = this.getAttribute('data-season');
                filterBySeason(season);
            });
        });
    }
}

// 切换文化习俗内容
function switchCustomsContent(tabName) {
    // 实现内容切换逻辑
    console.log(`Switching to ${tabName} content`);
}

// 按季节筛选
function filterBySeason(season) {
    // 实现季节筛选逻辑
    console.log(`Filtering by ${season} season`);
}

// 初始化数据仪表板
function initDataDashboard() {
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
                });

                // 显示对应视图
                const targetView = document.getElementById(`view-${view}`);
                if (targetView) {
                    targetView.classList.add('active');
                }
            });
        });
    }
}

// 初始化数据探索工具
function initDataExplorer() {
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

// 生成探索图表
function generateExplorerChart(dimension, metric, chartType) {
    const chartContainer = document.getElementById('explorer-chart');

    if (!chartContainer) return;

    // 这里可以实现根据用户选择生成不同类型的图表
    // 为简化示例，仅显示消息
    showMessage(`生成图表：维度-${dimension}，指标-${metric}，类型-${chartType}`);
}

// 搜索学者
function searchScholar(keyword) {
    if (!keyword.trim()) return;

    const scholarCards = document.querySelectorAll('.scholar-card');
    let found = false;

    scholarCards.forEach(card => {
        const name = card.querySelector('h4').textContent;
        const content = card.querySelector('p').textContent;

        if (name.toLowerCase().includes(keyword.toLowerCase()) ||
            content.toLowerCase().includes(keyword.toLowerCase())) {
            card.style.display = 'block';
            card.classList.add('search-highlight');
            setTimeout(() => {
                card.classList.remove('search-highlight');
            }, 3000);
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (found) {
        showMessage('找到匹配的学者');
    } else {
        showMessage('未找到匹配的学者');
        // 显示所有学者
        scholarCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// 搜索著作
function searchWorks(keyword) {
    if (!keyword.trim()) return;

    const workCards = document.querySelectorAll('.work-card');
    let found = false;

    workCards.forEach(card => {
        const title = card.querySelector('h4').textContent;
        const content = card.querySelector('p').textContent;

        if (title.toLowerCase().includes(keyword.toLowerCase()) ||
            content.toLowerCase().includes(keyword.toLowerCase())) {
            card.style.display = 'block';
            card.classList.add('search-highlight');
            setTimeout(() => {
                card.classList.remove('search-highlight');
            }, 3000);
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (found) {
        showMessage('找到匹配的著作');
    } else {
        showMessage('未找到匹配的著作');
        // 显示所有著作
        workCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// 搜索典故
function searchStories(keyword) {
    if (!keyword.trim()) return;

    const storyCards = document.querySelectorAll('.story-card');
    let found = false;

    storyCards.forEach(card => {
        const title = card.querySelector('h4').textContent;
        const content = card.querySelector('p').textContent;

        if (title.toLowerCase().includes(keyword.toLowerCase()) ||
            content.toLowerCase().includes(keyword.toLowerCase())) {
            card.style.display = 'flex';
            card.classList.add('search-highlight');
            setTimeout(() => {
                card.classList.remove('search-highlight');
            }, 3000);
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (found) {
        showMessage('找到匹配的典故');
    } else {
        showMessage('未找到匹配的典故');
        // 显示所有典故
        storyCards.forEach(card => {
            card.style.display = 'flex';
        });
    }
}