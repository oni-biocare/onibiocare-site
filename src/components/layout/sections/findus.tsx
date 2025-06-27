import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { LuFacebook, LuInstagram, LuLinkedin, LuYoutube } from "react-icons/lu";
import { FaTiktok } from "react-icons/fa";
import { ShoppingBagIcon } from "lucide-react";

export function FindUsSection() {
  const socialLinks = [
    { name: "TikTok", icon: <FaTiktok size={24} />, href: "https://tiktok.com/@onibiocare_official?_t=ZS-8wx7tpjYqq0&_r=1" },
    { name: "YouTube", icon: <LuYoutube size={24} />, href: "https://www.youtube.com/@oni-biocare" },
    { name: "Shopee", icon: <ShoppingBagIcon size={24} />, href: "https://shopee.vn/thietbispaoni" },
    { name: "Facebook", icon: <LuFacebook size={24} />, href: "https://facebook.com/share/1CKvEhEo5W/?mibextid=wwXIfr" },
    { name: "LinkedIn", icon: <LuLinkedin size={24} />, href: "https://www.linkedin.com/company/oni-co-ltd" },
  ];

  return (
    <section id="find-us" className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <SectionTitle>Tìm chúng tôi trên mạng xã hội</SectionTitle>
          <p className="mt-4 text-lg text-muted-foreground max-w-[800px]">
            Kết nối với chúng tôi trên mạng xã hội để cập nhật thông tin mới nhất, sự kiện và mẹo chăm sóc sức khỏe.
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 rounded-lg border border-border hover:bg-accent transition duration-300 w-full md:w-auto"
              >
                <span className="text-primary">{social.icon}</span>
                <span>{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
} 