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

# 文明概述页面
@app.route('/civilization-overview')
def civilization_overview():
    return render_template('index.html', active_section='civilization-overview')

# 科学成就页面
@app.route('/scientific-achievements')
def scientific_achievements():
    return render_template('index.html', active_section='scientific-achievements')

# 杰出著作页面
@app.route('/notable-works')
def notable_works():
    return render_template('index.html', active_section='notable-works')

# 杰出学者页面
@app.route('/notable-scholars')
def notable_scholars():
    return render_template('index.html', active_section='notable-scholars')

# 文化典故页面
@app.route('/cultural-stories')
def cultural_stories():
    return render_template('index.html', active_section='cultural-stories')

# 文化习俗页面
@app.route('/cultural-customs')
def cultural_customs():
    return render_template('index.html', active_section='cultural-customs')

# 数据汇总页面
@app.route('/data-summary')
def data_summary():
    return render_template('index.html', active_section='data-summary')

# 政策法规页面
@app.route('/policies')
def policies():
    return render_template('index.html', active_section='policies')

# API路由 - 获取各朝代文化成就数据
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

# API路由 - 获取四大发明影响力数据
@app.route('/api/inventions-impact')
def get_inventions_impact():
    # 示例数据
    data = {
        'inventions': ['造纸术', '印刷术', '火药', '指南针'],
        'china_impact': [90, 95, 80, 85],
        'world_impact': [95, 100, 90, 95]
    }
    return jsonify(data)

# 错误处理 - 404页面
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html', error='页面未找到'), 404

# 错误处理 - 500页面
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('index.html', error='服务器内部错误'), 500

if __name__ == '__main__':
    # 确保应用监听所有网络接口，便于外部访问
    app.run(host='0.0.0.0', port=8190, debug=True)
