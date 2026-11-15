import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
  prerender: ["/", "/works", "/links", "/404"],
} satisfies Config;
