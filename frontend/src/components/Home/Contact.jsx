import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050014] via-[#08001f] to-[#050014] text-slate-100">
      <Navbar />

      <main className="relative pt-28 md:pt-32 pb-20 md:pb-24 px-6 overflow-hidden">
        {/* Background gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-fuchsia-600/40 blur-3xl" />
          <div className="absolute top-40 -right-40 h-[420px] w-[420px] rounded-full bg-purple-500/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left: intro + contact cards */}
          <section className="w-full lg:w-1/2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium text-fuchsia-200 shadow-sm">
              <Sparkles className="h-4 w-4 text-fuchsia-400" />
              <span>We’d love to hear from you</span>
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
              Get in touch with
              <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                the JobTracker team
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-slate-300">
              Whether you&apos;re a university, company, or student, our team can help
              you streamline recruitment, onboarding, and everything in between.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-purple-500/40 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/30">
                    <Mail className="h-4 w-4 text-fuchsia-100" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300">Email</p>
                    <p className="text-sm font-semibold text-slate-50">
                      support@jobtracker.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-500/40 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/30">
                    <Phone className="h-4 w-4 text-cyan-100" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300">Phone</p>
                    <p className="text-sm font-semibold text-slate-50">
                      +91-00000-00000
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-500/40 bg-white/5 p-4 sm:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/30">
                    <MapPin className="h-4 w-4 text-indigo-100" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300">
                      Headquarters
                    </p>
                    <p className="text-sm font-semibold text-slate-50">
                      Remote-first · India
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Supporting universities and companies worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right: contact form */}
          <section className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/40 bg-[#070017]/80 px-6 py-7 shadow-[0_0_35px_rgba(129,140,248,0.55)] backdrop-blur">
              <div className="pointer-events-none absolute -right-16 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/40 blur-3xl" />
              <div className="pointer-events-none absolute -left-14 bottom-0 h-28 w-28 rounded-full bg-cyan-500/30 blur-3xl" />

              <div className="relative">
                <h2 className="text-lg md:text-xl font-semibold text-slate-50">
                  Send us a message
                </h2>
                <p className="mt-1 text-xs md:text-sm text-slate-300">
                  Share a few details and we&apos;ll get back to you within 1–2
                  business days.
                </p>

                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Full name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Aarav Sharma"
                        className="w-full rounded-xl border border-purple-500/40 bg-white/5 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/60"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Work email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-purple-500/40 bg-white/5 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/60"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      I&apos;m contacting as
                    </label>
                    <select
                      id="role"
                      className="w-full rounded-xl border border-purple-500/40 bg-white/5 px-3 py-2.5 text-sm text-slate-50 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/60"
                    >
                      <option className="bg-[#070017] text-slate-100">
                        Student
                      </option>
                      <option className="bg-[#070017] text-slate-100">
                        Company
                      </option>
                      <option className="bg-[#070017] text-slate-100">
                        University / T&P cell
                      </option>
                      <option className="bg-[#070017] text-slate-100">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Share how JobTracker can help your hiring or placement process..."
                      className="w-full rounded-xl border border-purple-500/40 bg-white/5 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/60 resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.55)] transition-all hover:scale-[1.02]"
                  >
                    Send message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <p className="pt-2 text-[10px] text-slate-500">
                    By submitting this form you agree to our privacy policy. We&apos;ll
                    only use your details to contact you about JobTracker.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

