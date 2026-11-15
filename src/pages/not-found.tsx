import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-4 p-8 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p>ページが見つかりませんでした。</p>
      <Link to="/" className="underline underline-offset-4">
        トップへ戻る
      </Link>
    </div>
  );
}
