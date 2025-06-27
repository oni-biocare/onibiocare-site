"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ModalVideo from "@/components/ui/modal-video";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import OniImage from "@/components/ui/oni-image";
import Link from "next/link";

export const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>Nhiều hơn</Badge>
            </span>
            <span> cả một dịch vụ! </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Hãy để
              <span className="text-transparent px-2 bg-gradient-to-r from-[#66BB6A] to-primary bg-clip-text">
                Oni Biocare
              </span><br/>
              chăm sóc bạn
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`Chúng tôi tự tin giúp khách hàng của mình tiết kiệm thời gian, giảm căng thẳng, mệt mỏi với những dịch vụ dành riêng cho bạn!`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {/* <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              Get Started
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                href="https://github.com/nobruf/shadcn-landing-page.git"
                target="_blank"
              >
                Github respository
              </Link>
            </Button> */}
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          {/* <OniImage
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={
              theme === "light"
                ? "/img_banner.png"
                : "/img_banner.png"
            }
            alt="dashboard"
          /> */}
           <ModalVideo
            thumb="/images/banner/web_banner.png"
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="videos//video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
