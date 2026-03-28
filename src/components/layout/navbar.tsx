"use client";
import { Menu, ShoppingCart, X } from "lucide-react";
import React from "react";
import { useCartCount } from "@/lib/cartStore";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import OniImage from "@/components/ui/oni-image";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  // { href: "/#team", label: "Đội ngũ" },
  { href: "/#contact", label: "Liên hệ" },
  { href: "/blog", label: "Bài viết" },
  { href: "/products", label: "Sản phẩm & Dịch vụ" },
];

const featureList: FeatureProps[] = [
  {
    title: "Tận tâm",
    description: "Chúng tôi đặt khách hàng làm trọng tâm và tận tâm phục vụ mọi nhu cầu.",
  },
  {
    title: "Trao đi yêu thương",
    description: "Chúng tôi tin rằng sự chăm sóc phải đến từ tình yêu thương và lòng trắc ẩn.",
  },
  {
    title: "Đề cao chính trực",
    description: "Chúng tôi luôn minh bạch, trung thực và có trách nhiệm trong mọi hoạt động.",
  },
  {
    title: "Sẵn sàng đổi mới",
    description: "Chúng tôi không ngừng cải tiến để mang đến dịch vụ tốt nhất cho khách hàng.",
  },
  {
    title: "Học hỏi liên tục",
    description: "Chúng tôi luôn cập nhật kiến thức và kỹ năng để nâng cao chất lượng dịch vụ.",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const cartCount = useCartCount();

  return (
    <header className="w-[90%] md:w-[75%] lg:w-[80%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-2xl flex justify-between items-center p-2 pl-4 bg-white/85 backdrop-blur-md border border-primary/15 shadow-lg shadow-primary/5">
      {/* Logo */}
      <Link href="/" className="font-bold text-lg flex items-center gap-2 cursor-pointer">
        <OniImage
          className="rounded-xl w-9 h-9 border border-primary/20"
          src="/onibiocare-logo.png"
          width={48}
          height={48}
          alt="Oni Biocare Logo"
          priority
        />
        <span className="text-foreground font-display text-xl">Oni Biocare</span>
      </Link>

      {/* Mobile menu */}
      <div className="flex items-center gap-1 lg:hidden">
        {/* Mobile cart icon */}
        <Link href="/cart" aria-label="Giỏ hàng" className="relative p-2 hover:bg-primary/10 rounded-lg transition-colors">
          <ShoppingCart className="size-5 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-primary/10 cursor-pointer"
              aria-label="Mở menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-white border-primary/10"
          >
            <div>
              <SheetHeader className="mb-6 ml-2">
                <SheetTitle className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(false)}>
                    <OniImage
                      className="rounded-xl w-9 h-9 border border-primary/20"
                      src="/onibiocare-logo.png"
                      width={48}
                      height={48}
                      alt="Oni Biocare Logo"
                      priority
                    />
                    <span className="font-display text-lg text-foreground">Oni Biocare</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base text-foreground hover:text-primary hover:bg-primary/8 cursor-pointer"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-4 bg-border" />
              <Link href="/#contact" onClick={() => setIsOpen(false)}>
                <button className="btn-premium w-full text-center text-sm">
                  Đặt lịch ngay
                </button>
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop menu */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-base text-foreground hover:text-primary hover:bg-primary/8 data-[active]:bg-transparent data-[state=open]:bg-transparent cursor-pointer">
              Chúng tôi
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[760px] grid-cols-2 gap-5 p-5 bg-white rounded-2xl border border-primary/10 shadow-xl shadow-primary/10">
                <OniImage
                  src="/onibiocare-logo-full.png"
                  alt="Oni Biocare Logo"
                  className="h-full w-full rounded-xl object-cover"
                  width={800}
                  height={800}
                />
                <ul className="flex flex-col gap-1">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-xl p-3 text-sm hover:bg-primary/5 transition-colors cursor-default"
                    >
                      <p className="mb-0.5 font-semibold text-foreground">{title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  href={href}
                  className="text-sm text-foreground px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer rounded-lg hover:bg-primary/5"
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Desktop CTA */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Desktop cart icon */}
        <Link href="/cart" aria-label="Giỏ hàng" className="relative p-2 hover:bg-primary/10 rounded-lg transition-colors cursor-pointer">
          <ShoppingCart className="size-5 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </Link>
        <Link href="/#contact" className="cursor-pointer">
          <button className="btn-premium text-sm px-5 py-2.5">
            Đặt lịch
          </button>
        </Link>
      </div>
    </header>
  );
};
