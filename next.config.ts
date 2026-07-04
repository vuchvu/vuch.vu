import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // ワークスペースルートの誤検出を防ぐ (親ディレクトリに別のlockfileがあっても警告しない)
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
