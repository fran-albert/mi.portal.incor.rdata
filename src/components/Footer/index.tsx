import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-muted py-1 w-full mt-20">
      <div className="container max-w-7xl flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="https://incor-ranking.s3.us-east-1.amazonaws.com/storage/images/mi-portal-logo-verde.png"
            width={200}
            height={100}
            className="logo-img"
            alt="Incor Logo"
          />
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="https://api.whatsapp.com/send?phone=3465650200"
            className="text-muted-foreground hover:text-incor"
            prefetch={false}
          >
            <FaWhatsapp className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.instagram.com/incorprevencion"
            className="text-muted-foreground hover:text-incor"
            prefetch={false}
          >
            <FaInstagram className="w-5 h-5 " />
          </Link>
        </nav>
        <p className="text-muted-foreground text-sm">
          &copy; 2024 Incor Centro Médico.
        </p>
      </div>
    </footer>
  );
}
