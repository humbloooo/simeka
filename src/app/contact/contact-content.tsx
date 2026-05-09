"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { PageTransition } from "@/components/effects/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations";
import { SITE_CONFIG } from "@/lib/constants";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function ContactContent() {
  const settings = useSiteSettings();

  const phone = settings?.phone || SITE_CONFIG.phone;
  const mobile = settings?.mobile || SITE_CONFIG.mobile;
  const email = settings?.email || SITE_CONFIG.email;
  const whatsapp = settings?.whatsapp || SITE_CONFIG.whatsapp;
  const address = settings?.address || SITE_CONFIG.address;
  const hours = settings?.operatingHours || SITE_CONFIG.operatingHours;

  const contactInfo = [
    { icon: Phone, label: "Landline", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: Phone, label: "Mobile", value: mobile, href: `tel:${mobile.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${whatsapp}` },
    { icon: MapPin, label: "Address", value: `${address.street}, ${address.city}`, href: "#" },
  ];
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to send enquiry");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <RevealOnScroll>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Get In Touch
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-amber/30 hover:shadow-sm transition-all group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber group-hover:bg-amber group-hover:text-navy transition-colors">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="font-medium text-foreground">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-amber" />
                    <h3 className="font-heading font-semibold text-sm">Office Hours</h3>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Mon - Fri: {hours.weekdays}</p>
                    <p>Saturday: {hours.saturday}</p>
                    <p>Sunday: {hours.sunday}</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-3">
              <RevealOnScroll direction="right">
                <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Send Us an Enquiry
                  </h2>
                  <p className="text-muted-foreground text-sm mb-8">
                    Fill in the form below and we&apos;ll get back to you within 24 hours.
                  </p>

                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                        Enquiry Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button
                        onClick={() => setStatus("idle")}
                        variant="outline"
                        className="mt-6"
                      >
                        Send Another Enquiry
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Full Name *
                          </label>
                          <Input
                            {...register("name")}
                            placeholder="Your full name"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Email *
                          </label>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="your@email.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Phone
                          </label>
                          <Input
                            {...register("phone")}
                            type="tel"
                            placeholder="0XX XXX XXXX"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Enquiry Type *
                          </label>
                          <Select onValueChange={(v) => { if (typeof v === "string") setValue("enquiryType", v as EnquiryFormData["enquiryType"]); }}>
                            <SelectTrigger className={errors.enquiryType ? "border-destructive" : ""}>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Enquiry</SelectItem>
                              <SelectItem value="availability">Room Availability</SelectItem>
                              <SelectItem value="pricing">Pricing</SelectItem>
                              <SelectItem value="nsfas">NSFAS</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.enquiryType && (
                            <p className="text-xs text-destructive mt-1">{errors.enquiryType.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Message *
                        </label>
                        <Textarea
                          {...register("message")}
                          placeholder="How can we help you?"
                          rows={5}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {errorMessage}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-amber hover:bg-amber-dim text-navy font-semibold h-12"
                      >
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-4 w-4 border-2 border-navy/30 border-t-navy rounded-full"
                            />
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Enquiry
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
