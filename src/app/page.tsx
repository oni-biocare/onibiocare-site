import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FindUsSection } from "@/components/layout/sections/findus";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ServicesSection } from "@/components/layout/sections/services";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "Onibiocare - Vì bạn xứng đáng với sự chăm sóc tuyệt vời!",
  description: "Vì bạn xứng đáng với sự chăm sóc tuyệt vời!",
  openGraph: {
    type: "website",
    url: "https://onibiocare.com",
    title: "Onibiocare - Vì bạn xứng đáng với sự chăm sóc tuyệt vời!",
    description: "Vì bạn xứng đáng với sự chăm sóc tuyệt vời!",
    images: [
      // {
      //   url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
      //   width: 1200,
      //   height: 630,
      //   alt: "Shadcn - Landing template",
      // },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "https://github.com/nobruf/shadcn-landing-page.git",
  //   title: "Shadcn - Landing template",
  //   description: "Vì bạn xứng đáng với sự chăm sóc tuyệt vời!",
  //   images: [
  //     "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
  //   ],
  // },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SponsorsSection /> */}
      {/* <BenefitsSection /> */}
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <FindUsSection />
      {/* <CommunitySection /> */}
      {/* <PricingSection /> */}
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
