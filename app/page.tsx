import Link from "next/link";


export default function HomePage() {
  return (
    <main className="p-8 max-w-xl mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">ヴヂュヴのホームページ</h1>
        <img src="/avatar.png" alt="Profile" className="w-48 h-48 mx-auto" />
      </div>

      <section id="about" className="space-y-3">
        <h2 className="text-xl font-semibold text-center">自己紹介</h2>
        <p className="text-sm text-center">
          制作物や活動のまとめ、連絡先などをこのサイトに整理しています。
        </p>
      </section>
    </main>
  );
}
