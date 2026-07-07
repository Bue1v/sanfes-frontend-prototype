# SANFES Frontend Prototype

This repository is a standalone static frontend prototype for team review.

It is only for checking screens, UI direction, and page transitions.

- No Spring Boot backend
- No Oracle connection
- No real API calls
- No real business logic
- Mock data only
- Hash-based page transitions only

## How to Open

Open `index.html` directly in a browser, or publish this repository with GitHub Pages.

Recommended GitHub Pages settings:

```text
Settings -> Pages -> Build and deployment
Source: Deploy from a branch
Branch: main
Folder: /root
```

After Pages is enabled, the URL should usually be:

```text
https://bue1v.github.io/sanfes-frontend-prototype/
```

## Demo Accounts

Use the selector in the top-right corner to switch views:

- 未ログイン
- 山田太郎 / 集計委員
- 佐藤花子 / 招集誘導委員
- 村田健 / 競技審判
- 小川美咲 / 救護委員
- 田中葵 / 委員未割当
- 学校側管理者

## 中文说明

这是一个单独的纯前端演示工程，只用来给组员点击页面、确认画面结构和页面跳转。

它不包含真实后端代码、数据库连接、业务逻辑或真实接口。顶部的账号选择器可以切换学生、不同委员、未分配委员和管理员视角。
