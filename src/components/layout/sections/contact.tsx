"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  phone: z.string().min(9).max(15).regex(/^[0-9+\-\s]+$/, "Số điện thoại không hợp lệ"),
  message: z.string(),
});

const contactInfoList = [
  {
    icon: <Mail className="size-5 text-primary" />,
    label: "Email chúng tôi",
    value: "onibiocare@gmail.com",
  },
  {
    icon: <Phone className="size-5 text-primary" />,
    label: "Gọi cho chúng tôi",
    value: "Liên hệ qua mạng xã hội",
  },
  {
    icon: <Clock className="size-5 text-primary" />,
    label: "Giờ hoạt động",
    value: "Thứ 2 – Chủ nhật, 8:00 – 21:00",
  },
];

export const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitStatus("success");
      form.reset();
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <section id="contact" className="container py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="section-label">Liên hệ</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Kết nối với{" "}
              <span className="shimmer-text">chúng tôi</span>
            </h2>
            <div className="petal-divider !ml-0" />
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Hãy liên hệ với chúng tôi để đặt lịch hoặc biết thêm thông tin
              về dịch vụ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
          </div>

          {/* Contact info cards */}
          <div className="space-y-4">
            {contactInfoList.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 glass-card rounded-2xl p-4 border-0">
                <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">{icon}</div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                    {label}
                  </div>
                  <div className="font-semibold text-foreground text-sm">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <Card className="glass-card rounded-3xl border-0 shadow-xl shadow-primary/10">
          <CardHeader className="px-8 pt-8 pb-0">
            <h3 className="text-xl font-bold text-foreground">Gửi tin nhắn</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Chúng tôi sẽ liên lạc lại với bạn sớm nhất.
            </p>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-5"
              >
                <div className="flex flex-col md:!flex-row gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Họ</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Họ của bạn"
                            className="rounded-xl border-border/60 focus:border-primary focus-visible:ring-primary/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tên</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tên của bạn"
                            className="rounded-xl border-border/60 focus:border-primary focus-visible:ring-primary/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="0912 345 678"
                          className="rounded-xl border-border/60 focus:border-primary focus-visible:ring-primary/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Lời nhắn
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Nội dung bạn muốn chia sẻ..."
                          className="resize-none rounded-xl border-border/60 focus:border-primary focus-visible:ring-primary/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="btn-premium mt-2 text-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitStatus === "loading" ? "Đang gửi..." : "Gửi tin nhắn"}
                </button>
                {submitStatus === "success" && (
                  <p className="text-sm text-green-500 text-center font-medium">
                    ✅ Tin nhắn đã được gửi! Chúng tôi sẽ liên hệ sớm.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-sm text-red-500 text-center font-medium">
                    ❌ Đã có lỗi xảy ra. Vui lòng thử lại sau.
                  </p>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </section>
  );
};
