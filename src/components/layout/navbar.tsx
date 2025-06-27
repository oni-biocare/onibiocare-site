"use client";
import { Menu } from "lucide-react";
import React from "react";
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
import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [

  {
    href: "/#team",
    label: "Đội ngũ",
  },
  {
    href: "/#contact",
    label: "Liên hệ",
  },
  {
    href: "/blog",
    label: "Bài viết",
  },
  {
    href: "/products",
    label: "Sản phẩm & Dịch vụ",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Tận tâm",
    description: "Chúng tôi đặt khách hàng làm trọng tâm và tận tâm phục vụ mọi nhu cầu.",
  },
  {
    title: "Trao đi yêu thương",
    description:
      "Chúng tôi tin rằng sự chăm sóc phải đến từ tình yêu thương và lòng trắc ẩn.",
  },

  {
    title: "Đề cao chính trực",
    description:
      "Chúng tôi luôn minh bạch, trung thực và có trách nhiệm trong mọi hoạt động.",
  },
  {
    title: "Sẵn sàng đổi mới",
    description:
      "Chúng tôi không ngừng cải tiến để mang đến dịch vụ tốt nhất cho khách hàng.",
  },
  {
    title: "Học hỏi liên tục",
    description:
      "Chúng tôi luôn cập nhật kiến thức và kỹ năng để nâng cao chất lượng dịch vụ.",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        {/* <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" /> */}
        <OniImage
          className="border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white"
          src="/onibiocare-logo.png"
          width={48}
          height={48}
          alt="Home Page"
          priority
        />
        Oni Biocare
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    {/* <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" /> */}
                    <OniImage
                      className="border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white"
                      src="/onibiocare-logo.png"
                      width={48}
                      height={48}
                      alt="Home Page"
                      priority
                    />
                    Oni Biocare
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Chúng tôi
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[800px] grid-cols-2 gap-5 p-4">
                <OniImage
                  src="/onibiocare-logo-full.png"
                  alt="Oni Biocare Logo"
                  className="h-full w-full rounded-md object-cover"
                  width={800}
                  height={800}
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">

        <div className="size-5" />
        <ToggleTheme />

      </div>
    </header>
  );
};
