from PIL import Image, ImageDraw, ImageFont
import os

# 确保目录存在
os.makedirs('static/images', exist_ok=True)

# 创建英雄背景图
img = Image.new('RGB', (1920, 1080), (157, 36, 47))  # 暗红色背景
draw = ImageDraw.Draw(img)

# 添加一些装饰性元素
for i in range(50):
    x1 = i * 40
    draw.line([(x1, 0), (x1, 1080)], fill=(170, 45, 55), width=2)
for i in range(30):
    y1 = i * 40
    draw.line([(0, y1), (1920, y1)], fill=(170, 45, 55), width=2)

# 添加文字
try:
    font = ImageFont.truetype("arial.ttf", 120)
    draw.text((960, 540), "华夏瑰宝", fill=(250, 250, 250), font=font, anchor="mm")
except:
    # 如果没有找到字体，使用默认字体
    draw.text((860, 540), "华夏瑰宝", fill=(250, 250, 250))

# 保存图片
img.save('static/images/hero_background.png')
print("已创建: static/images/hero_background.png")