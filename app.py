from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
import os
from PIL import Image, ImageDraw, ImageFont
import io

app = Flask(__name__)

# Ensure static files are correctly configured
app.static_folder = 'static'
app.template_folder = 'templates'

# Set debug mode to see detailed error messages
app.config['DEBUG'] = True

# Add proper MIME types for static files
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Disable caching for development


# Set up proper paths for templates and static files
@app.context_processor
def inject_paths():
    return dict(
        static_url=app.static_url_path,
        base_url=request.url_root
    )


# Homepage route
@app.route('/')
def index():
    # Get module parameter from URL if exists
    module = request.args.get('module', default='home')
    return render_template('index.html', initial_module=module)


# Modified route for module loading
@app.route('/module/<module_id>')
def load_module(module_id):
    try:
        # Define module ID to file name mapping
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

        # Get the module template file name
        template_file = module_templates.get(module_id)

        if template_file:
            # Render the module template
            app.logger.info(f"Loading module: {module_id} from template: {template_file}")
            return render_template(template_file)
        else:
            # If the module ID is invalid, return an error message
            app.logger.error(f"Invalid module ID: {module_id}")
            return render_template('error.html', error='模块不存在'), 404
    except Exception as e:
        # Log detailed error information
        import traceback
        app.logger.error(f"Module loading error {module_id}: {str(e)}")
        app.logger.error(traceback.format_exc())
        return render_template('error.html', error=f'加载模块时出错: {str(e)}'), 500


# API routes - kept as they were in the original file
@app.route('/api/dynasty-achievements')
def get_dynasty_achievements():
    # Example data
    data = {
        'dynasties': ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        'science': [60, 75, 65, 85, 90, 80],
        'literature': [70, 80, 90, 95, 85, 75],
        'philosophy': [95, 85, 75, 70, 80, 65]
    }
    return jsonify(data)


@app.route('/api/inventions-impact')
def get_inventions_impact():
    # Example data
    data = {
        'inventions': ['造纸术', '印刷术', '火药', '指南针'],
        'china_impact': [90, 95, 80, 85],
        'world_impact': [95, 100, 90, 95]
    }
    return jsonify(data)


@app.route('/api/scholars-distribution')
def get_scholars_distribution():
    # Example data
    data = {
        'dynasties': ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        'philosophers': [15, 8, 5, 7, 10, 6],
        'scientists': [5, 10, 7, 12, 8, 15],
        'writers': [8, 12, 15, 20, 18, 14],
        'artists': [3, 8, 12, 15, 10, 9]
    }
    return jsonify(data)


@app.route('/api/books-trend')
def get_books_trend():
    # Example data
    data = {
        'dynasties': ['先秦', '秦汉', '魏晋南北朝', '隋唐', '宋元', '明清'],
        'classics': [30, 85, 120, 180, 250, 320],
        'technology': [15, 45, 80, 135, 190, 240],
        'literature': [20, 60, 110, 170, 230, 310],
        'philosophy': [25, 70, 100, 150, 210, 280]
    }
    return jsonify(data)


@app.route('/api/stories-distribution')
def get_stories_distribution():
    # Example data
    data = {
        'categories': ['哲理典故', '历史典故', '寓言故事', '成语典故', '民间传说'],
        'counts': [35, 42, 28, 65, 30]
    }
    return jsonify(data)


@app.route('/api/festival-distribution')
def get_festival_distribution():
    # Example data
    data = {
        'festivals': ['春节', '元宵节', '清明节', '端午节', '七夕节', '中秋节', '重阳节', '冬至'],
        'impact': [10, 8, 7, 9, 6, 9, 5, 7]
    }
    return jsonify(data)


@app.route('/api/astronomy-data/<data_type>')
def get_astronomy_data(data_type):
    # Return appropriate astronomical data based on data_type
    if data_type == 'sun':
        # Solar eclipse records
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
        # Lunar phase observations
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
        # Star distribution data
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
        # Comet records
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
        # If data type is invalid, return an error message
        return jsonify({'error': '无效的数据类型'}), 400

    return jsonify(data)


# Improved placeholder image route for missing images
@app.route('/static/images/<path:filename>')
def placeholder_image(filename):
    """Provide placeholder image for missing images"""
    # First check if the requested image exists
    image_path = os.path.join(app.static_folder, 'images', filename)
    if os.path.exists(image_path):
        return send_file(image_path)

    # If image doesn't exist, create a placeholder
    try:
        # Get directory structure
        directory = os.path.dirname(os.path.join(app.static_folder, 'images', filename))
        os.makedirs(directory, exist_ok=True)

        # Create a placeholder image
        img = Image.new('RGB', (400, 300), color=(248, 244, 230))  # Use theme background color
        d = ImageDraw.Draw(img)

        # Try to load font, if fails use default font
        try:
            font = ImageFont.truetype("Arial", 20)
        except IOError:
            font = ImageFont.load_default()

        # Add text
        d.text((50, 150), f"图片占位符: {os.path.basename(filename)}", fill=(157, 41, 51), font=font)  # Use theme color

        # Add decorative border
        d.rectangle([(0, 0), (399, 299)], outline=(212, 160, 23), width=2)  # Gold accent color

        # Save to memory
        img_io = io.BytesIO()
        img.save(img_io, 'JPEG', quality=70)
        img_io.seek(0)

        return send_file(img_io, mimetype='image/jpeg')
    except Exception as e:
        # If creating placeholder image fails, return simple text
        app.logger.error(f"Failed to create placeholder image: {str(e)}")
        return f"图片占位符: {filename} (错误: {str(e)})", 200


# Static file structure check route
@app.route('/check_static')
def check_static():
    """Check static file structure"""
    static_folder = app.static_folder
    structure = {}

    # Check CSS files
    css_folder = os.path.join(static_folder, 'css')
    structure['css'] = os.path.exists(css_folder)
    if structure['css']:
        structure['css_files'] = os.listdir(css_folder)

    # Check JS files
    js_folder = os.path.join(static_folder, 'js')
    structure['js'] = os.path.exists(js_folder)
    if structure['js']:
        structure['js_files'] = os.listdir(js_folder)

    # Check images folder
    images_folder = os.path.join(static_folder, 'images')
    structure['images'] = os.path.exists(images_folder)
    if structure['images']:
        structure['image_subfolders'] = []
        for root, dirs, files in os.walk(images_folder):
            rel_path = os.path.relpath(root, images_folder)
            if rel_path != '.':
                structure['image_subfolders'].append(rel_path)

    return jsonify(structure)


# Test page route
@app.route('/test_page')
def test_page():
    return """
    <html>
    <head>
        <title>测试页面</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .test-box { padding: 20px; margin: 20px 0; border: 1px solid #ccc; }
        </style>
    </head>
    <body>
        <h1>测试页面</h1>
        <div class="test-box">
            <h2>静态内容测试</h2>
            <p>这是一个简单的测试页面，检查静态内容是否正常显示。</p>
        </div>
        <div class="test-box">
            <h2>中文显示测试</h2>
            <p>测试中文内容是否正常显示：华夏瑰宝-文化科学可视化展示系统</p>
        </div>
    </body>
    </html>
    """


# Direct module test route
@app.route('/direct_module/<module_id>')
def direct_module(module_id):
    try:
        # Define module ID to file name mapping
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

        # Get the module template file name
        template_file = module_templates.get(module_id)

        if template_file:
            # Render the module template with base.html
            return render_template('base.html') + render_template(template_file)
        else:
            return f"Invalid module: {module_id}", 404
    except Exception as e:
        return f"Error loading module: {str(e)}", 500


# Module debug info route
@app.route('/debug_modules')
def debug_modules():
    # List all available modules and their paths
    modules = {
        'home': 'modules/home.html',
        'civilization_overview': 'modules/civilization_overview.html',
        'scientific_achievements': 'modules/scientific_achievements.html',
        'notable_works': 'modules/notable_works.html',
        'notable_scholars': 'modules/notable_scholars.html',
        'cultural_stories': 'modules/cultural_stories.html',
        'cultural_customs': 'modules/cultural_customs.html',
        'data_summary': 'modules/data_summary.html'
    }

    # Check if each module file exists
    module_status = {}
    for module_id, path in modules.items():
        full_path = os.path.join('templates', path)
        module_status[module_id] = {
            'path': path,
            'exists': os.path.exists(full_path),
            'size': os.path.getsize(full_path) if os.path.exists(full_path) else 0,
            'direct_link': f'/direct_module/{module_id}'
        }

    # Return HTML format debug info
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>模块调试信息</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .exists { color: green; }
            .missing { color: red; }
            .header { display: flex; justify-content: space-between; align-items: center; }
            .action-btn { padding: 5px 10px; margin: 5px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>模块调试信息</h1>
            <div>
                <a href="/" class="action-btn">返回首页</a>
                <a href="/check_static" class="action-btn">检查静态文件</a>
                <a href="/test_page" class="action-btn">测试页面</a>
            </div>
        </div>

        <h2>可用模块</h2>
        <table>
            <tr>
                <th>模块ID</th>
                <th>模板路径</th>
                <th>状态</th>
                <th>文件大小</th>
                <th>操作</th>
            </tr>
    """

    for module_id, status in module_status.items():
        exists_class = "exists" if status['exists'] else "missing"
        exists_text = "存在" if status['exists'] else "缺失"
        html += f"""
            <tr>
                <td>{module_id}</td>
                <td>{status['path']}</td>
                <td class="{exists_class}">{exists_text}</td>
                <td>{status['size']} 字节</td>
                <td>
                    <a href="/module/{module_id}" target="_blank">API调用</a> | 
                    <a href="{status['direct_link']}" target="_blank">直接查看</a>
                </td>
            </tr>
        """

    html += """
        </table>

        <h2>系统信息</h2>
        <table>
            <tr>
                <th>属性</th>
                <th>值</th>
            </tr>
            <tr>
                <td>模板目录</td>
                <td>""" + app.template_folder + """</td>
            </tr>
            <tr>
                <td>静态文件目录</td>
                <td>""" + app.static_folder + """</td>
            </tr>
        </table>
    </body>
    </html>
    """

    return html


# Error handling - 404 page
@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', error='页面未找到'), 404


# Error handling - 500 page
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('error.html', error='服务器内部错误'), 500


if __name__ == '__main__':
    # Check if necessary directories exist, create if not
    for directory in ['static/css', 'static/js', 'static/images']:
        os.makedirs(os.path.join(os.path.dirname(__file__), directory), exist_ok=True)

    # Run the Flask application
    app.run(host='0.0.0.0', port=8190, debug=True)