# 沐阳花舍 - 鲜花配送平台电商小程序

## 项目简介
沐阳花舍是一款基于微信小程序原生语法和 Vant UI 组件库开发的鲜花配送电商平台。该小程序旨在为用户提供便捷的鲜花购买体验，支持多种业务功能，包括商品浏览、用户登录、购物车管理及订单处理等。


## 功能特性
- **首页**：展示分类信息和推荐信息与促销活动。
- **商品分类**：按照不同类别浏览鲜花。
- **商品列表**：显示某一类别下的所有鲜花商品。
- **商品详情**：查看单个商品的详细信息。
- **微信登录**：使用微信账号快速登录。
- **获取用户信息**：自动获取用户的微信头像和昵称。
- **收货地址管理**：添加、编辑、删除用户的收货地址。
- **地理定位**：获取用户的当前经纬度信息。
- **LBS逆地址解析**：通过经纬度获取详细地址。
- **购物车**：管理用户想要购买的商品。
- **订单管理**：提交订单并查看历史订单。

## 技术栈
- 微信小程序原生框架
- Vant Weapp UI 组件库
- 微信开放接口（如微信登录API）
- 腾讯位置服务


主要页面截图如下：

<p align="center">
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my%E9%A6%96%E9%A1%B5.png"/>
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my%E5%88%86%E7%B1%BB%E9%A1%B5.png"/>
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my%E8%B4%AD%E7%89%A9%E8%BD%A6.png"/>
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85.png"/>
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my-%E8%AE%A2%E5%8D%95%E7%BB%93%E7%AE%97.png"/>
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my%E8%AE%A2%E5%8D%95%E9%A1%B5.png"/>
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my%E4%BD%8D%E7%BD%AE%E6%90%9C%E7%B4%A2.png"/>
<img src="https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/my%E4%BF%AE%E6%94%B9%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF.png"/>
</p>


## 环境搭建
### 前提条件
- 安装了最新版[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 注册了微信小程序账号，并获得了AppID
### 步骤
1. 克隆仓库到本地：
   ```bash
   git clone [仓库URL]
   cd muyangh-flower
   npm install
   ```
2. 打开微信开发者工具，选择“导入项目”，然后填写你的AppID。
3. 在微信小程序后台设置中，配置合法域名，确保可以正常访问后端服务。
4. 根据需要配置其他微信开放平台的功能，例如地理位置权限等。

## 关键文件说明
- app.js 和 app.json 是小程序的核心配置文件。
- components/ 目录存放可复用的UI组件。
- pages/ 目录下的每个子目录代表一个页面，其中包含了页面的视图层 .wxml、样式 .wxss 和逻辑 .js 文件。
- utils/ 目录包含了一些辅助函数，用于简化代码实现。
## 运行与调试
- 使用微信开发者工具打开项目。
- 选择真机调试或模拟器进行预览。
- 利用控制台输出日志进行问题排查。
- 注意检查网络请求是否成功，特别是涉及到后端交互的部分。
