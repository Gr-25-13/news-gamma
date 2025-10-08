import Link from "next/link";

type NavLinksProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function NavLinks({ onClick }: NavLinksProps) {
  const links = [
    { href: "/", label: "Senaste" },
    { href: "/inrikes", label: "Inrikes" },
    { href: "/varlden", label: "Världen" },
    { href: "/ekonomi", label: "Ekonomi" },
    { href: "/sport", label: "Sport" },
    { href: "/vader", label: "Väder" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className="text-gray-700 hover:text-black block md:inline"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
