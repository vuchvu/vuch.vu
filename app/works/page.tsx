import Image from "next/image";

type Work = {
  title: string;
  description: string;
  url: string;
  icon?: string;
};

const works: Work[] = [
  {
    title: "QR Print Helper",
    description:
      "QRコード画像からPDFラベルを生成するユーティリティ。GUI・CLI両対応。",
    url: "https://github.com/vuchvu/qr-print-helper",
    icon: "qr-print-helper.png",
  },
];

export default function WorksPage() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-center text-4xl font-bold">作品</h1>
      <ul className="space-y-6">
        {works.map((work) => (
          <li key={work.url}>
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border border-black/10 p-4 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/5 dark:bg-white/10">
                {work.icon ? (
                  <Image
                    src={work.icon}
                    alt={work.title}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-black/20 dark:text-white/20">
                    ?
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold">{work.title}</h2>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {work.description}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
