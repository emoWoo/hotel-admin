# 酒店行李管理后台操作系统

**项目地址：**[text](https://github.com/emoWoo/hotel-admin.git)

项目基于 Vue3+Vite+ant-design-vue+axios 进行搭建

**项目启动**：npm run dev

网站实现了基本的登录功能、酒店行李寄存信息的概览、app 用户的基本信息以及对 app 账户的增删改查。利用ant-design 的 layout 组件实现页面的基本布局，通过 axios 的 http 请求与后端进行数据交互。

酒店行李管理后台操作系统搭配移动端 app 进行使用，移动端 app 主要实现对酒店行李寄存单信息的录入和取件功能，具体实现过程为：酒店管理人员使用app创建寄存单，其中包含顾客的基本信息、行李绑定的标签和放置的房间、寄存相关的照片。寄存单创建后会生成对应的取件码，以便顾客将行李取回。取件时通过app上的取件功能对绑定在行李上的标签进行呼唤，从而找到相应的行李取出。后台系统主要是对 app 用户信息、酒店信息、标签信息和寄存信息的管理，由于时间有限只实现了前面 3 个页面。
