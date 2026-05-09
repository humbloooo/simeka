"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/effects/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ArrowRight, ArrowLeft, User, GraduationCap, Bed, Wallet, FileCheck, AlertCircle } from "lucide-react";
import { applicationSchema, type ApplicationFormData } from "@/lib/validations";
import { rooms } from "@/data/rooms";
import { cn, formatPrice } from "@/lib/utils";

const steps = [
  { label: "Personal", icon: User },
  { label: "Academic", icon: GraduationCap },
  { label: "Room", icon: Bed },
  { label: "Funding", icon: Wallet },
  { label: "Review", icon: FileCheck },
];

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      university: "University of Venda",
      fundingSource: "nsfas",
    },
  });

  const values = watch();

  const stepFields: (keyof ApplicationFormData)[][] = [
    ["fullName", "idNumber", "dateOfBirth", "gender", "phone", "email", "homeAddress"],
    ["university", "studentNumber", "yearOfStudy", "faculty"],
    ["roomType", "preferredMoveIn"],
    ["fundingSource", "nsfasRef"],
    ["popiConsent", "termsAccepted"],
  ];

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: ApplicationFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to submit application");
      }
      
      const dataJson = await res.json();
      router.push(`/apply/success?ref=${dataJson.referenceNumber || ""}`);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const selectedRoom = rooms.find((r) => r.id === values.roomType);

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all",
                      i < step
                        ? "bg-success text-white"
                        : i === step
                          ? "bg-amber text-navy"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {i < step ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </div>
                  <span className={cn(
                    "text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-medium",
                    i <= step ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn(
                    "h-0.5 w-4 sm:w-16 mx-0.5 sm:mx-2 transition-colors",
                    i < step ? "bg-success" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Personal */}
                  {step === 0 && (
                    <div className="space-y-5">
                      <h3 className="font-heading text-xl font-bold mb-6">Personal Information</h3>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                        <Input {...register("fullName")} placeholder="As per your ID" className={errors.fullName ? "border-destructive" : ""} />
                        {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">ID Number *</label>
                          <Input {...register("idNumber")} placeholder="13-digit ID" maxLength={13} className={errors.idNumber ? "border-destructive" : ""} />
                          {errors.idNumber && <p className="text-xs text-destructive mt-1">{errors.idNumber.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Date of Birth *</label>
                          <Input {...register("dateOfBirth")} type="date" className={errors.dateOfBirth ? "border-destructive" : ""} />
                          {errors.dateOfBirth && <p className="text-xs text-destructive mt-1">{errors.dateOfBirth.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Gender *</label>
                        <Select onValueChange={(v) => { if (typeof v === "string") setValue("gender", v as ApplicationFormData["gender"]); }}>
                          <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                          <Input {...register("phone")} type="tel" placeholder="0XX XXX XXXX" className={errors.phone ? "border-destructive" : ""} />
                          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email *</label>
                          <Input {...register("email")} type="email" placeholder="your@email.com" className={errors.email ? "border-destructive" : ""} />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Home Address *</label>
                        <Input {...register("homeAddress")} placeholder="Your home address" className={errors.homeAddress ? "border-destructive" : ""} />
                        {errors.homeAddress && <p className="text-xs text-destructive mt-1">{errors.homeAddress.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Academic */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <h3 className="font-heading text-xl font-bold mb-6">Academic Information</h3>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">University</label>
                        <Input {...register("university")} disabled className="bg-muted/50" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Student Number *</label>
                          <Input {...register("studentNumber")} placeholder="e.g. 11234567" className={errors.studentNumber ? "border-destructive" : ""} />
                          {errors.studentNumber && <p className="text-xs text-destructive mt-1">{errors.studentNumber.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Year of Study *</label>
                          <Select onValueChange={(v) => { if (typeof v === "string") setValue("yearOfStudy", parseInt(v)); }}>
                            <SelectTrigger className={errors.yearOfStudy ? "border-destructive" : ""}>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((y) => (
                                <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.yearOfStudy && <p className="text-xs text-destructive mt-1">{errors.yearOfStudy.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Faculty / Department *</label>
                        <Input {...register("faculty")} placeholder="e.g. School of Mathematical & Natural Sciences" className={errors.faculty ? "border-destructive" : ""} />
                        {errors.faculty && <p className="text-xs text-destructive mt-1">{errors.faculty.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Room */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <h3 className="font-heading text-xl font-bold mb-6">Room Selection</h3>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Room Type *</label>
                        <Select onValueChange={(v) => { if (typeof v === "string") setValue("roomType", v); }}>
                          <SelectTrigger className={errors.roomType ? "border-destructive" : ""}>
                            <SelectValue placeholder="Choose a room type" />
                          </SelectTrigger>
                          <SelectContent>
                            {rooms.filter((r) => r.available).map((room) => (
                              <SelectItem key={room.id} value={room.id}>
                                {room.name} — R{formatPrice(room.pricePerMonth)}/month
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.roomType && <p className="text-xs text-destructive mt-1">{errors.roomType.message}</p>}
                      </div>
                      {selectedRoom && (
                        <div className="p-4 rounded-xl bg-amber/5 border border-amber/20">
                          <p className="font-heading font-semibold text-foreground">{selectedRoom.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{selectedRoom.description}</p>
                          <p className="text-amber font-bold text-lg mt-2">R{formatPrice(selectedRoom.pricePerMonth)}/month</p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Preferred Move-In Date *</label>
                        <Input {...register("preferredMoveIn")} type="date" className={errors.preferredMoveIn ? "border-destructive" : ""} />
                        {errors.preferredMoveIn && <p className="text-xs text-destructive mt-1">{errors.preferredMoveIn.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Funding */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <h3 className="font-heading text-xl font-bold mb-6">Funding Information</h3>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Funding Source *</label>
                        <Select defaultValue="nsfas" onValueChange={(v) => { if (typeof v === "string") setValue("fundingSource", v as ApplicationFormData["fundingSource"]); }}>
                          <SelectTrigger>
                            <SelectValue placeholder="How will you fund your stay?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nsfas">NSFAS</SelectItem>
                            <SelectItem value="bursary">Bursary</SelectItem>
                            <SelectItem value="self">Self-funded</SelectItem>
                            <SelectItem value="parent">Parent/Guardian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {values.fundingSource === "nsfas" && (
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">NSFAS Reference Number</label>
                          <Input {...register("nsfasRef")} placeholder="If available" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 5: Review */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="font-heading text-xl font-bold mb-6">Review Your Application</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Full Name", value: values.fullName },
                          { label: "Email", value: values.email },
                          { label: "Phone", value: values.phone },
                          { label: "Student Number", value: values.studentNumber },
                          { label: "Year of Study", value: values.yearOfStudy ? `Year ${values.yearOfStudy}` : "" },
                          { label: "Faculty", value: values.faculty },
                          { label: "Room Type", value: selectedRoom?.name || values.roomType },
                          { label: "Move-In Date", value: values.preferredMoveIn },
                          { label: "Funding", value: values.fundingSource?.toUpperCase() },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/30">
                            <span className="text-sm text-muted-foreground">{item.label}</span>
                            <span className="text-sm font-medium text-foreground">{item.value || "—"}</span>
                          </div>
                        ))}
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {errorMessage}
                        </div>
                      )}

                      <div className="space-y-4 pt-4 border-t border-border/30">
                        <div className="flex items-start space-x-3">
                          <input 
                            type="checkbox" 
                            id="popiConsent" 
                            className="mt-1 h-4 w-4 rounded border-border text-amber focus:ring-amber"
                            {...register("popiConsent")}
                          />
                          <div className="space-y-1 leading-none">
                            <label htmlFor="popiConsent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              I consent to Simeka Heights collecting and processing my personal information in accordance with the Protection of Personal Information Act (POPIA). View our <Link href="/privacy" className="text-amber hover:underline">Privacy Policy</Link>.
                            </label>
                            {errors.popiConsent && <p className="text-xs text-destructive">{errors.popiConsent.message}</p>}
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <input 
                            type="checkbox" 
                            id="termsAccepted" 
                            className="mt-1 h-4 w-4 rounded border-border text-amber focus:ring-amber"
                            {...register("termsAccepted")}
                          />
                          <div className="space-y-1 leading-none">
                            <label htmlFor="termsAccepted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              I have read and agree to the <Link href="/terms" className="text-amber hover:underline">Terms & Conditions</Link>.
                            </label>
                            {errors.termsAccepted && <p className="text-xs text-destructive">{errors.termsAccepted.message}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep} className="bg-amber hover:bg-amber-dim text-navy font-semibold">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-success hover:bg-success/90 text-white font-semibold"
                >
                  {status === "loading" ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
