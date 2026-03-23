import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LuFacebook, LuInstagram, LuLinkedin, LuYoutube } from "react-icons/lu";
import { FaTiktok } from "react-icons/fa";
import { ShoppingBagIcon } from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export function FindUsSection() {
  const socialLinks: SocialLink[] = [
    {
      name: "TikTok",
      icon: <FaTiktok size={20} />,
      href: "https://tiktok.com/@onibiocare_official?_t=ZS-8wx7tpjYqq0&_r=1",
      color: "hover:bg-[#010101] hover:text-white hover:border-[#010101]",
    },
    {
      name: "YouTube",
      icon: <LuYoutube size={20} />,
      href: "https://www.youtube.com/@oni-biocare",
      color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
    },
    {
      name: "Shopee",
      icon: <ShoppingBagIcon size={20} />,
      href: "https://shopee.vn/thietbispaoni",
      color: "hover:bg-[#EE4D2D] hover:text-white hover:border-[#EE4D2D]",
    },
    {
      name: "Facebook",
      icon: <LuFacebook size={20} />,
      href: "https://facebook.com/share/1CKvEhEo5W/?mibextid=wwXIfr",
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
    {
      name: "LinkedIn",
      icon: <LuLinkedin size={20} />,
      href: "https://www.linkedin.com/company/oni-co-ltd",
      color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    },
  ];

  return (
    <section id="find-us" className="container py-24 sm:py-32">
      <div className="flex flex-col items-center text-center">
        <span className="section-label mb-4">Mạng xã hội</span>
        <h2 className="text-4xl md:text-5xl font-bold">
          Tìm chúng tôi{" "}
          <span className="shimmer-text">trực tuyến</span>
        </h2>
        <div className="petal-divider mt-4 mb-6" />
        <p className="text-lg text-muted-foreground max-w-2xl">
          Theo dõi Oni Biocare trên mạng xã hội để cập nhật những khuyến mãi,
          mẹo chăm sóc sức khỏe và nội dung giá trị mỗi ngày.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-border/60 bg-white/80 backdrop-blur-sm text-foreground transition-all duration-200 cursor-pointer font-medium text-sm ${social.color}`}
            >
              <span>{social.icon}</span>
              <span>{social.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}