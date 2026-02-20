import type { Link } from "../lib/types";

type DisplayLinkProps = {
  header: string;
  links: Link[];
  styles: string;
};

function DisplayLinks({ header, links, styles }: DisplayLinkProps) {
  return (
    <>
      <h2 className="mt-4 mb-2 text-center text-2xl">{header}</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              className={`mx-auto block max-w-xs rounded-lg p-4 text-center ${styles} transition`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function LinksPage() {
  const snsLinks: Link[] = [
    { label: "X (旧Twitter)", url: "https://x.com/x_vuchvu_x" },
    { label: "Misskey", url: "https://misskey.dev/@x_vuchvu_x" },
    { label: "Discord", url: "https://discord.com/users/258213639486439425" },
    { label: "Bluesky", url: "https://bsky.app/profile/vuchvu.bsky.social" },
  ];
  const creatorLinks: Link[] = [
    { label: "BOOTH", url: "https://vuchvu.booth.pm/" },
    { label: "Skeb", url: "https://skeb.jp/@x_vuchvu_x" },
    { label: "Pixiv", url: "https://www.pixiv.net/users/6518175" },
    { label: "SKIMA", url: "https://skima.jp/profile?id=134804" },
  ];
  const developerLinks: Link[] = [
    { label: "GitHub", url: "https://github.com/vuchvu" },
  ];
  const buttonStyles = "bg-sky-400 hover:bg-sky-300 text-white";

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-center text-4xl font-bold">リンク</h1>
      <DisplayLinks header="SNS" links={snsLinks} styles={buttonStyles} />
      <DisplayLinks header="創作" links={creatorLinks} styles={buttonStyles} />
      <DisplayLinks
        header="開発"
        links={developerLinks}
        styles={buttonStyles}
      />
    </main>
  );
}
