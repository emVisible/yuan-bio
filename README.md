# 缘简 YuanBio

海外华人相亲简历在线制作器。填写 → 选模板 → 导出 PDF 简历与名片图。免费、无需注册，数据保存在浏览器。

## 开发

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 部署

推送到 GitHub，用 [Vercel](https://vercel.com) 导入项目，配置环境变量后部署：

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 站点地址，如 `https://yuanbio.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console 验证（可选） |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster 验证（可选） |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense 发布商 ID（可选） |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | 广告位 ID（可选） |

## 技术栈

Next.js · TypeScript · Tailwind CSS · jspdf · html2canvas
