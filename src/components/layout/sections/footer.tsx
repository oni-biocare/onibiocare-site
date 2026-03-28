import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import OniImage from "@/components/ui/oni-image";
import { LuFacebook, LuInstagram, LuLinkedin, LuYoutube } from "react-icons/lu";
import { FaTiktok } from "react-icons/fa";

export const FooterSection = () => {
  const socialLinks = [
    { name: "Facebook", icon: <LuFacebook size={18} />, href: "https://facebook.com/share/1CKvEhEo5W/?mibextid=wwXIfr" },
    { name: "TikTok", icon: <FaTiktok size={18} />, href: "https://tiktok.com/@onibiocare_official?_t=ZS-8wx7tpjYqq0&_r=1" },
    { name: "YouTube", icon: <LuYoutube size={18} />, href: "https://www.youtube.com/@oni-biocare" },
    { name: "LinkedIn", icon: <LuLinkedin size={18} />, href: "https://www.linkedin.com/company/oni-co-ltd" },
  ];

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(210 77% 16%) 0%, hsl(156 82% 13%) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="blob w-[400px] h-[400px] top-[-100px] right-[-80px] opacity-12"
        style={{ background: "#1E88E5" }}
      />
      <div
        className="blob w-[300px] h-[300px] bottom-[-60px] left-[-60px] opacity-10"
        style={{ background: "#12C37D" }}
      />

      <div className="container py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="xl:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <OniImage
                className="rounded-xl w-10 h-10 border border-white/20"
                src="/onibiocare-logo.png"
                width={48}
                height={48}
                alt="Oni Biocare Logo"
                priority
              />
              <h3 className="text-2xl font-bold text-white">Oni Biocare</h3>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Mang đến những liệu trình thư giãn, phục hồi và làm đẹp đẳng cấp tại
              không gian riêng tư của bạn.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-white/50 hover:text-white transition-colors duration-200 cursor-pointer p-2 rounded-lg hover:bg-white/10"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Giúp đỡ</h4>
            <ul className="space-y-2">
              {[
                { label: "Liên hệ với chúng tôi", href: "/#contact" },
                { label: "FAQ", href: "/#faq" },
                { label: "Góp ý", href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Khám phá</h4>
            <ul className="space-y-2">
              {[
                { label: "Sản phẩm & Dịch vụ", href: "/products" },
                { label: "Bài viết", href: "/blog" },
                // { label: "Đội ngũ", href: "/#team" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <span>© 2025 Oni Biocare. Thiết kế và phát triển bởi đội ngũ Oni Biocare.</span>
          <Link href="/#contact" className="hover:text-white transition-colors cursor-pointer">
            onibiocare@gmail.com
          </Link>
        </div>
      </div>
    </footer>
  );
};
