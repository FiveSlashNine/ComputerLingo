import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Computer Lingo Logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="font-semibold">Computer Lingo</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Computer Lingo. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
