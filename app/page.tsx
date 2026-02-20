import Image from "next/image";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-xl space-y-8 p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">ヴヂュヴのホームページ</h1>
        <Image
          src="/avatar.png"
          alt="Profile"
          width={192}
          height={192}
          className="mx-auto h-48 w-48"
        />
      </div>

      <section id="about" className="space-y-3">
        <h2 className="text-center text-xl font-semibold">自己紹介</h2>
        <p className="text-center text-sm">
          制作物や活動のまとめ、連絡先などをこのサイトに整理しています。
        </p>
      </section>
    </main>
  );
}
