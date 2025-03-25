# 华夏瑰宝-文化科学可视化展示系统重构指南

本文档提供了将单一HTML文件重构为模块化架构的详细步骤。

## 步骤一：创建目录结构

首先，按照下面的目录结构创建必要的文件夹：

```
templates/
  ├── base.html
  ├── index.html
  ├── error.html
  ├── modules/
  │   ├── home.html
  │   ├── civilization_overview.html
  │   ├── scientific_achievements.html
  │   ├── notable_works.html
  │   ├── notable_scholars.html
  │   ├── cultural_stories.html
  │   ├── cultural_customs.html
  │   └── data_summary.html
  └── components/
      ├── header.html
      ├── footer.html
      ├── navigation.html
      ├── loader.html
      └── error.html

static/
  ├── css/
  │   ├── style.css
  │   ├── additional.css
  │   └── modules/
  │       ├── home.css
  │       ├── civilization.css
  │       ├── science.css
  │       └── ...
  ├── js/
  │   ├── main.js
  │   ├── module_loader.js
  │   └── modules/
  │       ├── home.js
  │       ├── civilization.js
  │       ├── science.js
  │       └── ...
  └── ...
```

## 步骤二：分解原始HTML文件

1. 创建基础模板 `base.html`，包含所有共享元素（头部、导航、页脚）
2. 创建 `index.html` 作为入口点，继承 `base.html`
3. 提取原始HTML文件中的各个部分到相应的模块文件中

### 提取规则：
- 每个主要部分（section）提取到对应的模块文件
- 共享元素（头部、页脚等）提取到组件文件
- 确保保留所有类名和ID以维持CSS样式

## 步骤三：更新后端路由

修改Flask应用的路由，支持模块化加载：

1. 添加模块加载路由 `/module/<module_id>`
2. 更新API路由，确保与前端请求匹配

## 步骤四：实现前端模块加载

创建 `module_loader.js` 实现动态模块加载：

1. 注册导航事件监听
2. 实现AJAX请求获取模块内容
3. 动态加载模块特定的CSS和JS资源

## 步骤五：分离JS和CSS

1. 将原始文件中的CSS和JS分离到各自的模块文件
2. 保留主样式和脚本文件中的通用功能
3. 模块特定的样式和脚本放在相应的模块文件中

## 步骤六：测试和优化

1. 测试所有模块的加载和功能
2. 确保导航正确切换模块
3. 验证所有图表和交互元素正常工作
4. 优化加载性能，添加适当的加载提示

## 实施注意事项

### 模块ID命名规则
- 使用小写字母和下划线
- 保持与原始HTML中的ID一致
- 示例：`civilization_overview`、`scientific_achievements`

### 模块加载优化
- 考虑预加载常用模块
- 添加缓存机制避免重复加载相同模块
- 实现懒加载图表和图片资源

### 错误处理
- 添加模块加载失败的错误处理
- 提供友好的错误信息和重试选项
- 记录错误日志以便调试

## 完成标准

重构完成后，系统应该：

1. 保持原有的所有功能和视觉效果
2. 实现模块化加载，减少初始加载时间
3. 提高代码的可维护性和可扩展性
4. 支持独立开发和测试各个模块