import { Section } from "@/app/components/Section";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-xl space-y-8 p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">ヴヂュヴのホームページ</h1>
        <Image
          src="/avatar.png"
          alt="ヴヂュヴのアバター"
          width={192}
          height={192}
          priority
          className="mx-auto h-48 w-48"
        />
      </div>

      <Section title="自己紹介">
        <p>絵描き兼エンジニア。</p>
      </Section>
      <Section title="絵描きの部分について">
        <ul>
          <li>描いてます。</li>
          <li>
            <Link href="/links" className="underline underline-offset-4">
              描いているものはこちらに載せています。
            </Link>
          </li>
        </ul>
      </Section>
      <Section title="エンジニアの部分について">
        <ul>
          <li>フロントエンドもバックエンドもどっちもできます。</li>
          <li>システム設計もできなくもない。</li>
          <li>TypeScript, Pythonなどが書けます。</li>
        </ul>
      </Section>
      <Section title="連絡先">
        <p>vudjuvu@gmail.com</p>
      </Section>
    </main>
  );
}
