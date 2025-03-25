from flask import Flask, render_template, request, jsonify, send_from_directory
import os

app = Flask(__name__)


# 配置静态文件目录
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


# 主页路由
@app.route('/')
def index():
    return render_template('index.html')


# 模块加载路由 - 用于AJAX加载各个模块内容
@app.route('/module/<module_id>')
def load_module(module_id):
    # 根据模块ID返回相应的模块HTML
    try:
        # 定义模块ID到文件名的映射
        module_templates = {
            'home': 'modules/home.html',
            'civilization_overview': 'modules/civilization_overview.html',
            'scientific_achievements': 'modules/scientific_achievements.html',
            'notable_works': 'modules/notable_works.html',
            'notable_scholars': 'modules/notable_scholars.html',
            'cultural_stories': 'modules/cultural_stories.html',
            'cultural_customs': 'modules/cultural_customs.html',
            'data_summary': 'modules/data_summary.html'
        }

        # 获取模块模板文件名
        template_file = module_templates.get(module_id)

        if template_file:
            # 渲染模块模板
            return render_template(template_file)
        else:
            # 如果模块ID无效，返回错误信息
            return render_template('components/error.html', message='模块不存在'), 404
    except Exception as e:
        # 如果发生异常，返回错误信息
        return render_template('components/error.html', message=str(e)), 500


# API路由 - 朝代成就数据
@app.route('/api/dynasty-achievements')
def get_dynasty_achievements():
    # 示例数据
    data = {
        'dynasties': ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        'science': [60, 75, 65, 85, 90, 80],
        'literature': [70, 80, 90, 95, 85, 75],
        'philosophy': [95, 85, 75, 70, 80, 65]
    }
    return jsonify(data)


# API路由 - 四大发明影响力数据
@app.route('/api/inventions-impact')
def get_inventions_impact():
    # 示例数据
    data = {
        'inventions': ['造纸术', '印刷术', '火药', '指南针'],
        'china_impact': [90, 95, 80, 85],
        'world_impact': [95, 100, 90, 95]
    }
    return jsonify(data)


# API路由 - 学者分布数据
@app.route('/api/scholars-distribution')
def get_scholars_distribution():
    # 示例数据
    data = {
        'dynasties': ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        'philosophers': [15, 8, 5, 7, 10, 6],
        'scientists': [5, 10, 7, 12, 8, 15],
        'writers': [8, 12, 15, 20, 18, 14],
        'artists': [3, 8, 12, 15, 10, 9]
    }
    return jsonify(data)


# API路由 - 著作数量数据
@app.route('/api/books-trend')
def get_books_trend():
    # 示例数据
    data = {
        'dynasties': ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        'classics': [30, 85, 120, 180, 250, 320],
        'technology': [15, 45, 80, 135, 190, 240],
        'literature': [20, 60, 110, 170, 230, 310],
        'philosophy': [25, 70, 100, 150, 210, 280]
    }
    return jsonify(data)


# API路由 - 文化典故分布数据
@app.route('/api/stories-distribution')
def get_stories_distribution():
    # 示例数据
    data = {
        'categories': ['哲理典故', '历史典故', '寓言故事', '成语典故', '民间传说'],
        'counts': [35, 42, 28, 65, 30]
    }
    return jsonify(data)


# API路由 - 传统节日数据
@app.route('/api/festival-distribution')
def get_festival_distribution():
    # 示例数据
    data = {
        'festivals': ['春节', '元宵节', '清明节', '端午节', '七夕节', '中秋节', '重阳节', '冬至'],
        'impact': [10, 8, 7, 9, 6, 9, 5, 7]
    }
    return jsonify(data)


# API路由 - 天文互动数据
@app.route('/api/astronomy-data/<data_type>')
def get_astronomy_data(data_type):
    # 根据请求的数据类型返回相应的天文数据
    if data_type == 'sun':
        # 日食记录数据
        data = {
            'title': '中国古代日食记录',
            'description': '中国是世界上最早记录日食的国家之一，早在公元前2137年就有了日食记录。',
            'records': [
                {'year': '-2137', 'description': '相传夏朝时期，由于"羲和"之子不尽职守，导致"十日并出"。'},
                {'year': '-776', 'description': '《春秋》中记载的第一次日食，发生在鲁隐公三年。'},
                {'year': '-360', 'description': '战国时期，司天官甘德预测了一次日食。'},
                {'year': '28', 'description': '东汉时期张衡预测并记录了一次日食。'}
            ]
        }
    elif data_type == 'moon':
        # 月相观测数据
        data = {
            'title': '中国古代月相观测',
            'description': '中国古代很早就开始观测月相变化，并根据月相变化制定农历。',
            'phases': ['朔', '上弦', '望', '下弦'],
            'records': [
                {'source': '夏小正', 'era': '夏代', 'description': '中国最早记录月相变化的著作。'},
                {'source': '诗经', 'era': '周代', 'description': '多处提到月亮盈亏现象。'},
                {'source': '淮南子·天文训', 'era': '汉代', 'description': '详细描述了月相变化规律。'}
            ]
        }
    elif data_type == 'stars':
        # 星象分布数据
        data = {
            'title': '中国古代星象系统',
            'description': '中国古代将天空分为三垣二十八宿。',
            'systems': [
                {
                    'name': '三垣',
                    'parts': ['紫微垣', '太微垣', '天市垣'],
                    'description': '三垣是中国古代天文学中，环绕北极的三组星官。'
                },
                {
                    'name': '二十八宿',
                    'parts': [
                        {'name': '东方青龙七宿', 'stars': ['角', '亢', '氐', '房', '心', '尾', '箕']},
                        {'name': '北方玄武七宿', 'stars': ['斗', '牛', '女', '虚', '危', '室', '壁']},
                        {'name': '西方白虎七宿', 'stars': ['奎', '娄', '胃', '昴', '毕', '觜', '参']},
                        {'name': '南方朱雀七宿', 'stars': ['井', '鬼', '柳', '星', '张', '翼', '轸']}
                    ]
                }
            ]
        }
    elif data_type == 'comets':
        # 彗星记录数据
        data = {
            'title': '中国古代彗星记录',
            'description': '中国古代天文学家对彗星的观测非常重视，有大量详细记载。',
            'records': [
                {'year': '-240', 'dynasty': '秦朝', 'description': '《史记·天官书》记载的一颗大彗星，可能是哈雷彗星。'},
                {'year': '12', 'dynasty': '西汉', 'description': '《汉书·天文志》记载的长彗，被视为王莽篡位的征兆。'},
                {'year': '240', 'dynasty': '三国', 'description': '《晋书·天文志》记载的扫帚星，持续数月。'},
                {'year': '837', 'dynasty': '唐朝', 'description': '《旧唐书》记载的一次哈雷彗星回归。'}
            ]
        }
    else:
        # 如果请求的数据类型无效，返回错误信息
        return jsonify({'error': '无效的数据类型'}), 400

    return jsonify(data)


# 错误处理 - 404页面
@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', error='页面未找到'), 404


# 错误处理 - 500页面
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('error.html', error='服务器内部错误'), 500


if __name__ == '__main__':
    # 确保应用监听所有网络接口，便于外部访问
    app.run(host='0.0.0.0', port=8190, debug=True)