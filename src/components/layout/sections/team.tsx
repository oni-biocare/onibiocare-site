import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Facebook, YoutubeIcon } from "lucide-react";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import GithubIcon from "@/components/icons/github-icon";
import OniImage from "@/components/ui/oni-image";
import Link from "next/link";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}

interface SocialNetworkProps {
  name: string;
  url: string;
}

export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "/img_trang_trinh.jpg",
      firstName: "Trịnh",
      lastName: "Thu Trang",
      positions: ["Hơn 6 năm kinh nghiệm điều hành trung tâm vật lý trị liệu"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/trang-trinh-thu-1539b1186",
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/share/15cSoJCv3C/?mibextid=wwXIfr",
        },
      ],
    },
    {
      imageUrl: "/img_van_tan.jpeg",
      firstName: "Nguyễn",
      lastName: "Văn Tân",
      positions: ["Hơn 5 năm xây dựng và phát triển sản phẩm công nghệ"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/tân-nguyễn-văn-35167b1a5/",
        },
        {
          name: "Github",
          url: "https://github.com/doctor-blue",
        },
        {
          name: "Youtube",
          url: "https://www.youtube.com/@daniel-ng.official",
        },
      ],
    },
    {
      imageUrl: "/img_tram.jpg",
      firstName: "Nguyễn",
      lastName: "Ngọc Trâm",
      positions: ["Gần 10 năm hoạt động trong lĩnh vực tài chính doanh nghiệp"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/nguyễn-ng%E1%BB%8Dc-trâm-889156259",
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/share/18hvx4sgFG/",
        },
      ],
    },
  ];

  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "Facebook":
        return <Facebook className="size-5" />;
      case "Youtube":
        return <YoutubeIcon className="size-5" />;
    }
  };

  return (
    <section id="team" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(210 40% 97%) 0%, hsl(156 30% 96%) 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="blob w-[300px] h-[300px] top-0 left-0 opacity-12"
        style={{ background: "#1E88E5" }}
      />
      <div
        className="blob w-[250px] h-[250px] bottom-0 right-0 opacity-10"
        style={{ background: "#12C37D" }}
      />

      <div className="container lg:w-[85%] relative z-10">
        <div className="text-center mb-14 space-y-4">
          <span className="section-label">Đội ngũ</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Những <span className="shimmer-text">người sáng lập</span>
          </h2>
          <div className="petal-divider" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Đội ngũ tâm huyết đứng sau mỗi liệu trình, mỗi sản phẩm của Oni Biocare.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamList.map(({ imageUrl, firstName, lastName, positions, socialNetworks }, index) => (
            <div key={index} className="group">
              <Card className="glass-card rounded-3xl h-full overflow-hidden border-0 flex flex-col cursor-default transition-all duration-300">
                {/* Photo */}
                <div className="relative overflow-hidden h-64">
                  <OniImage
                    src={imageUrl}
                    alt={`${firstName} ${lastName}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:saturate-100 saturate-0"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                <CardHeader className="pt-5 pb-1 px-6">
                  <CardTitle className="text-xl">
                    {firstName}{" "}
                    <span className="shimmer-text">{lastName}</span>
                  </CardTitle>
                </CardHeader>

                {positions.map((position, i) => (
                  <CardContent
                    key={i}
                    className="px-6 py-0 text-sm text-muted-foreground leading-relaxed"
                  >
                    {position}
                  </CardContent>
                ))}

                <CardFooter className="px-6 pt-5 pb-6 mt-auto flex items-center gap-3">
                  {socialNetworks.map(({ name, url }, i) => (
                    <Link
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                      aria-label={name}
                    >
                      {socialIcon(name)}
                    </Link>
                  ))}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
