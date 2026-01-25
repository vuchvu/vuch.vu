import Image from "next/image";

type Link = {
  label: string;
  url: string;
}

type displayLinkProps = {
  header: string;
  links: Link[];
  styles: string;
}

function DisplayLinks({header, links, styles}: displayLinkProps) {
  return (
    <>
      <h2 className="text-2xl mt-4 mb-2 text-center">{header}</h2>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link.url}>
            <a
              href={link.url}
              className={`block max-w-xs mx-auto p-4 text-center rounded-lg ${styles} transition`}
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

export default function HomePage() {
  const sns_links: Link[] = [
    { label: "X (旧Twitter)", url: "https://x.com/x_vuchvu_x" },
    { label: "Misskey", url: "https://misskey.dev/@x_vuchvu_x" },
    { label: "Discord", url: "https://discord.com/users/258213639486439425" },
    { label: "Bluesky", url: "https://bsky.social/vuchvu.bsky.social" },
  ];
  const creator_links: Link[] = [
    { label: "BOOTH", url: "https://vuchvu.booth.pm/" },
    { label: "Skeb", url: "https://skeb.jp/@x_vuchvu_x" },
    { label: "Pixiv", url: "https://www.pixiv.net/users/6518175" },
    { label: "SKIMA", url: "https://skima.jp/profile?id=134804" },
  ];
  const developer_links: Link[] = [
    { label: "GitHub", url: "https://github.com/vuchvu" },
  ];
  const button_styles: string = "bg-sky-400 hover:bg-sky-300 text-white";

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">ヴヂュヴ</h1>
      <img
          src="/avatar.png"
          alt="Profile"
          className="w-48 h-48 mx-auto mb-4"
      />
      <DisplayLinks
        header="SNS"
        links={sns_links}
        styles={button_styles}
      />
      <DisplayLinks
        header="創作"
        links={creator_links}
        styles={button_styles}
      />
      <DisplayLinks
        header="開発"
        links={developer_links}
        styles={button_styles}
      />
    </main>
  );
}
