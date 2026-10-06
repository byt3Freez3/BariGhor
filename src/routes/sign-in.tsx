import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Lock, Phone, ShieldCheck, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — BariGhor Buyer Portal" },
      {
        name: "description",
        content:
          "Access your saved properties, WBRERA due diligence dossiers, and direct advisory appointments.",
      },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10 || email.includes("@")) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setLoggedIn(true);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      <div className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">Sign In</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link to="/">
              <ArrowLeft className="mr-1 size-3.5" /> Back to home
            </Link>
          </Button>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid overflow-hidden border border-black/5 bg-card shadow-lg md:grid-cols-[1.1fr_1fr]">
          {/* Left Hero Box */}
          <div className="bg-primary p-8 text-primary-foreground md:p-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
              <Sparkles className="size-3.5" /> Private Client Desk
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Your Kolkata property portfolio, curated.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
              Sign in to unlock verified developer floorplans, HIDCO sanction drawing copies, and
              direct advisory appointments.
            </p>

            <div className="mt-8 space-y-3.5 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/90">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-accent" />
                <span>Confidential, zero-spam portal (no marketing calls)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-accent" />
                <span>Save shortlists and share with family members</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-accent" />
                <span>Direct WBRERA registration certificate downloads</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Sign-In Form */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            {loggedIn ? (
              <div className="text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-sage/20 text-primary">
                  <ShieldCheck className="size-8 text-emerald-600" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Welcome Back</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  You are now authenticated into the BariGhor Client Portal.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild size="lg">
                    <Link to="/properties">Explore Handpicked Homes</Link>
                  </Button>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full cursor-not-allowed">
                          <Button
                            variant="secondary"
                            disabled
                            className="w-full opacity-60 text-xs"
                          >
                            Pay Token Advance (Escrow Gateway)
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-primary text-primary-foreground max-w-xs text-center text-xs"
                      >
                        Coming Soon: Online statutory escrow payment gateway under regulatory
                        compliance testing. Contact your advisor for RTGS details.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setLoggedIn(false);
                      setOtpSent(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : !otpSent ? (
              <div>
                <div className="flex gap-4 border-b border-border pb-3 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setMethod("phone")}
                    className={`pb-1 ${method === "phone" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
                  >
                    Mobile Phone OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("email")}
                    className={`pb-1 ${method === "email" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
                  >
                    Email Authentication
                  </button>
                </div>

                <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
                  {method === "phone" ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Mobile Number
                      </label>
                      <div className="mt-1.5 flex rounded-xs border border-border bg-background px-3 py-2 focus-within:border-primary">
                        <span className="mr-2 text-sm font-semibold text-muted-foreground">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="98765 43210"
                          className="w-full bg-transparent text-sm font-medium outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="mt-1.5 w-full rounded-xs border border-border bg-background px-3 py-2 text-sm font-medium outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full mt-4">
                    Send Verification Code
                  </Button>
                </form>

                <p className="mt-6 text-[11px] text-center text-muted-foreground">
                  By continuing, you agree to BariGhor's Privacy Policy & Client Terms of Service.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-xl font-bold">Enter 4-Digit Code</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sent to {method === "phone" ? `+91 ${phoneNumber}` : email} (Demo code: any 4
                  digits)
                </p>

                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="1 2 3 4"
                    className="w-full text-center tracking-widest font-mono text-2xl rounded-xs border border-border bg-background py-3 font-bold outline-none focus:border-primary"
                  />

                  <Button type="submit" size="lg" className="w-full">
                    Verify & Enter Portal
                  </Button>
                </form>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="mt-4 block w-full text-center text-xs text-accent hover:underline"
                >
                  Change mobile number / email
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="home" />
    </main>
  );
}
