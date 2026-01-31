[![build passed](https://img.shields.io/github/actions/workflow/status/vuchvu/vuch.vu/deploy.yml?branch=main&style=flat-square)](https://github.com/vuchvu/vuch.vu/actions/workflows/deploy.yml) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind%20CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)

## vuch.vu

このリポジトリは [https://vuch.vu](https://vuch.vu) のWebサイトのソースコードです。デザイン、コンテンツ、機能に関する変更はここで管理しています。

ローカルで動作確認する場合は以下を実行してください。

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開くと確認できます。

デプロイには[GitHub Actions](.github/workflows/deploy.yml)を使っています。S3の静的ウェブサイトホスト機能を利用しています。
