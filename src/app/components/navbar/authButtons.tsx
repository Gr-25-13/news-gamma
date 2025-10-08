import Link from "next/link";

export default function AuthButtons({ onClick }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
      <Link
        href="/login"
        onClick={onClick}
        className="text-gray-600 hover:text-black"
      >
        Logga in
      </Link>
      <Link
        href="/prenumerera"
        onClick={onClick}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm"
      >
        Prenumerera
      </Link>
    </div>
  );
}
