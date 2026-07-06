# MVP 功能规格

## 用户流程

```
Landing → 开始制作 → 填写表单 → 选模板 → 实时预览 → 下载/分享
                                              ↓
                                    免费：水印 PDF / 分享链接
                                    付费：Lemon Squeezy 结账 → 无水印 PDF
```

## 表单字段

### 基本信息
- 姓名 / Name
- 性别 / Gender
- 出生年份 / Birth year
- 身高 / Height
- 现居地（城市 + 国家）/ Location

### 背景
- 籍贯 / Hometown
- 语言 / Languages
- 移民身份（可选）/ Visa status (optional)

### 教育与职业
- 学历 / Education
- 毕业院校 / School
- 职业 / Occupation
- 工作单位 / Employer
- 年收入范围（可选）/ Income range (optional)

### 家庭
- 父母情况 / Parents
- 兄弟姐妹 / Siblings

### 个人介绍
- 自我介绍 / About me（支持 AI 生成 +$2.99）
- 兴趣爱好 / Hobbies
- 择偶期望 / Partner expectations（支持 AI 生成）

### 联系方式
- 微信 / WeChat
- 邮箱 / Email
- 电话（可选）/ Phone (optional)

### 照片
- 头像上传（Base64 存 localStorage，不上传服务器）

## 模板（3 款）

| ID | 名称 | 风格 | 付费层级 |
|----|------|------|----------|
| minimal | 简约 | 黑白、留白、专业 | 基础 $4.99 |
| traditional | 传统 | 红金点缀、适合父母辈 | 高级 $9.99 |
| modern | 现代 | 渐变、圆角、年轻化 | 高级 $9.99 |

## 付费流程

1. 用户点击「下载无水印 PDF」或「解锁高级模板」
2. 调用 `/api/checkout` 创建 Lemon Squeezy 结账链接
3. 支付成功跳转 `/payment/success?checkout_id=...`
4. `/api/verify-checkout` 验证订单，返回 `unlocked: true`
5. 客户端 `sessionStorage` 记录解锁状态（当次会话可重复下载）

## 非功能需求

- **无登录**：数据仅存 `localStorage`
- **隐私**：照片与个人信息不发送到服务器（分享链接为 URL 编码）
- **双语**：中文 / English 切换
- **移动端友好**：表单与预览响应式布局

## 技术栈

- Next.js 16 App Router + TypeScript + Tailwind CSS 4
- jspdf + html2canvas（客户端 PDF）
- lz-string（分享链接压缩编码）
- Lemon Squeezy（支付，环境变量配置）
- Vercel 部署

## 环境变量

```env
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_VARIANT_BASIC=      # $4.99
LEMONSQUEEZY_VARIANT_PREMIUM=     # $9.99
LEMONSQUEEZY_VARIANT_AI_ADDON=    # +$2.99
LEMONSQUEEZY_WEBHOOK_SECRET=
OPENAI_API_KEY=                   # 可选，无则 AI 使用模板文案
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
