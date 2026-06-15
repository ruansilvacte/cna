import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle, Loader2, AlertCircle, Phone, Mail, MapPin, ShieldCheck,
  ChevronRight, ChevronLeft, CalendarDays, Clock, Sun, CloudSun, Sparkles, DollarSign, ArrowRight, Star
} from "lucide-react";
import { z } from "zod";
import { format, addDays, isSunday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Calendar } from "@/components/ui/calendar";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  zip_code: z.string().trim().min(3, "Zip Code is required").max(20),
  square_footage: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(1000).optional(),
});

type LeadFields = z.infer<typeof leadSchema>;
type FieldErrors = Partial<Record<keyof LeadFields, string>>;

const MORNING_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"];
const AFTERNOON_SLOTS = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const ALL_TIME_SLOTS = [...MORNING_SLOTS, ...AFTERNOON_SLOTS];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Quote() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<LeadFields>({
    name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [scheduleError, setScheduleError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof LeadFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    
    // Only fetch if we don't have the data for this date yet
    const fetchSlots = async () => {
      const { data } = await supabase
        .from("leads")
        .select("scheduled_time")
        .eq("scheduled_date", dateStr)
        .not("scheduled_time", "is", null);
      
      if (data) {
        const times = data?.map((r) => r.scheduled_time).filter(Boolean) as string[];
        setBookedSlots((prev) => ({ ...prev, [dateStr]: times }));
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const goToStep2 = () => {
    setErrors({});
    const result = leadSchema.safeParse(fields);
    if (!result.success) {
      const next: FieldErrors = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof LeadFields;
        if (!next[k]) next[k] = i.message;
      });
      setErrors(next);
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setScheduleError("");
    setErrorMsg("");

    if (!selectedDate || !selectedTime) {
      setScheduleError("Please select a date and time for your cleaning.");
      return;
    }

    setStatus("loading");

    try {
      const { error } = await supabase.from("leads").insert([{
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        zip_code: fields.zip_code,
        square_footage: fields.square_footage || null,
        notes: fields.notes || null,
        scheduled_date: format(selectedDate, "yyyy-MM-dd"),
        scheduled_time: selectedTime,
      }]);

      if (error) throw error;
      navigate("/thank-you");
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or call us at 978.235.7033.");
    }
  };

  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isSunday(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/quote" fallbackTitle="Get a Quote | CNA MAIDPRO" />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-white">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary))" }} />
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label text-accent mb-4">Personalized Estimate</motion.p>
               <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
                  className="heading-display text-primary mb-6" 
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  Book your <span className="text-secondary-blue italic">cleaning.</span>
               </motion.h1>
               <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  Step {step} of 2. Tell us about your home and find a time that works for you. We'll take care of the rest.
               </p>
            </div>
            <div className="hidden lg:flex gap-8 items-center border-l border-border pl-12">
               <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white mb-2 shadow-lg shadow-primary/20">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Vetted</span>
               </div>
               <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent text-white mb-2 shadow-lg shadow-accent/20">
                     <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Premium</span>
               </div>
               <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-primary mb-2 shadow-lg shadow-secondary/20 border border-primary/10">
                     <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reliable</span>
               </div>
            </div>
         </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 px-6 md:px-10">
         <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
               
               {/* Left column: Sidebar Info */}
               <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
                  <div className="glass-card p-10 rounded-[2.5rem] border border-border/40 shadow-sm">
                     <h3 className="text-xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-heading)" }}>The MaidPro Standard</h3>
                     <ul className="space-y-6">
                        {[
                          { icon: CheckCircle, title: "Detailed Checklist", text: "We follow a 49 point cleaning standard on every visit." },
                          { icon: Heart, title: "Family Values", text: "We treat your space with the care it deserves." },
                          { icon: Star, title: "Satisfaction Guarantee", text: "If you're not wowed, we'll return within 24 hours." },
                        ].map((item, i) => (
                          <li key={i} className="flex gap-4">
                             <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                <item.icon className="w-5 h-5 text-accent" />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-primary mb-1">{item.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                             </div>
                          </li>
                        ))}
                     </ul>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/60">
                     <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Need Help Now?</p>
                     <p className="text-sm text-primary mb-6">Call our scheduling team for immediate assistance or custom requests.</p>
                     <a href="tel:9782357033" className="flex items-center gap-3 text-xl font-bold text-primary hover:text-accent transition-colors">
                        <Phone className="w-5 h-5" /> 978.235.7033
                     </a>
                  </div>
               </div>

               {/* Right column: Form */}
               <div className="lg:col-span-8 order-1 lg:order-2">
                  <motion.div 
                     key={step} 
                     initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}
                     className="bg-white rounded-[2.5rem] border border-border/40 p-8 md:p-12 shadow-[var(--shadow-luxe)]"
                  >
                     {step === 1 ? (
                        <div className="space-y-8">
                           <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                 <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">Full Name</label>
                                 <input type="text" placeholder="First Name" value={fields.name} onChange={set("name")} 
                                    className={`w-full px-6 py-4 rounded-2xl border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all ${errors.name ? "border-destructive" : "border-border"}`} />
                                 {errors.name && <p className="text-xs text-destructive mt-2 ml-1">{errors.name}</p>}
                              </div>
                              <div>
                                 <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">Email Address</label>
                                 <input type="email" placeholder="john@example.com" value={fields.email} onChange={set("email")} 
                                    className={`w-full px-6 py-4 rounded-2xl border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all ${errors.email ? "border-destructive" : "border-border"}`} />
                                 {errors.email && <p className="text-xs text-destructive mt-2 ml-1">{errors.email}</p>}
                              </div>
                              <div>
                                 <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">Phone Number</label>
                                 <input type="tel" placeholder="978.235.7033" value={fields.phone} onChange={set("phone")} 
                                    className={`w-full px-6 py-4 rounded-2xl border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all ${errors.phone ? "border-destructive" : "border-border"}`} />
                                 {errors.phone && <p className="text-xs text-destructive mt-2 ml-1">{errors.phone}</p>}
                              </div>
                              <div>
                                 <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">Zip Code</label>
                                 <input type="text" placeholder="01234" value={fields.zip_code} onChange={set("zip_code")} 
                                    className={`w-full px-6 py-4 rounded-2xl border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all ${errors.zip_code ? "border-destructive" : "border-border"}`} />
                                 {errors.zip_code && <p className="text-xs text-destructive mt-2 ml-1">{errors.zip_code}</p>}
                              </div>
                           </div>
                           
                           <div>
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">Type of Cleaning</label>
                              <select 
                                 value={fields.notes} 
                                 onChange={set("notes")}
                                 className="w-full px-6 py-4 rounded-2xl border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                              >
                                 <option value="">Select a service...</option>
                                 <option value="Recurring Cleaning">Recurring Cleaning</option>
                                 <option value="Deep Cleaning">Deep Cleaning</option>
                                 <option value="Move In / Move Out Cleaning">Move In / Move Out Cleaning</option>
                                 <option value="Airbnb turnover">Airbnb / Short term Rental</option>
                                 <option value="Post Construction">Post Construction</option>
                              </select>
                           </div>

                           <button onClick={goToStep2} className="w-full btn-primary py-5 text-base">
                              Find a time <ArrowRight className="w-5 h-5" />
                           </button>
                        </div>
                     ) : (
                        <div className="space-y-8">
                           <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                              <ChevronLeft className="w-4 h-4" /> Back to details
                           </button>

                           <div className="grid md:grid-cols-2 gap-10">
                              {/* Calendar Column */}
                              <div>
                                 <h4 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-accent" /> Select a Date
                                 </h4>
                                 <div className="border border-border/60 rounded-3xl p-4 bg-secondary/10">
                                    <Calendar
                                       mode="single"
                                       selected={selectedDate}
                                       onSelect={(d) => { setSelectedDate(d); setSelectedTime(""); setScheduleError(""); }}
                                       disabled={disabledDays}
                                       className="w-full"
                                    />
                                 </div>
                              </div>

                              {/* Time Column */}
                              <div>
                                 <h4 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-accent" /> Select a Time
                                 </h4>
                                 {selectedDate ? (
                                    <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                       <div>
                                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Morning slots</p>
                                          <div className="grid grid-cols-2 gap-2">
                                             {MORNING_SLOTS.map(time => {
                                                const booked = (bookedSlots[format(selectedDate, "yyyy-MM-dd")] || []).includes(time);
                                                const sel = selectedTime === time;
                                                return (
                                                   <button key={time} disabled={booked} onClick={() => setSelectedTime(time)}
                                                      className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${booked ? "opacity-30 line-through bg-muted/20" : sel ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" : "bg-white border-border hover:border-primary/50 text-primary"}`}>
                                                      {time}
                                                   </button>
                                                );
                                             })}
                                          </div>
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Afternoon slots</p>
                                          <div className="grid grid-cols-2 gap-2">
                                             {AFTERNOON_SLOTS.map(time => {
                                                const booked = (bookedSlots[format(selectedDate, "yyyy-MM-dd")] || []).includes(time);
                                                const sel = selectedTime === time;
                                                return (
                                                   <button key={time} disabled={booked} onClick={() => setSelectedTime(time)}
                                                      className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${booked ? "opacity-30 line-through bg-muted/20" : sel ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" : "bg-white border-border hover:border-primary/50 text-primary"}`}>
                                                      {time}
                                                   </button>
                                                );
                                             })}
                                          </div>
                                       </div>
                                    </div>
                                 ) : (
                                    <div className="h-64 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center text-center p-8 bg-secondary/20">
                                       <CalendarDays className="w-10 h-10 text-muted-foreground opacity-30 mb-4" />
                                       <p className="text-sm text-muted-foreground">Select a date to unlock available time slots.</p>
                                    </div>
                                 )}
                              </div>
                           </div>

                           {selectedDate && selectedTime && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                                 className="p-6 rounded-2xl bg-primary text-white flex items-center justify-between gap-4">
                                 <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-1">Your selection</p>
                                    <p className="font-bold text-lg">{format(selectedDate, "EEEE, MMMM d")} at {selectedTime}</p>
                                 </div>
                                 <div className="p-3 bg-white/10 rounded-xl">
                                    <CheckCircle className="w-6 h-6" />
                                 </div>
                              </motion.div>
                           )}

                           {scheduleError && <p className="text-sm text-destructive font-bold text-center">{scheduleError}</p>}
                           {status === "error" && <p className="text-sm text-destructive font-bold text-center">{errorMsg}</p>}

                           <button 
                              onClick={handleSubmit} 
                              disabled={status === "loading" || !selectedDate || !selectedTime}
                              className="w-full btn-primary py-5 text-base flex items-center justify-center gap-3 shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.3)] transition-all active:scale-95 disabled:opacity-40 disabled:scale-100"
                           >
                              {status === "loading" ? <><Loader2 className="w-5 h-5 animate-spin" /> Confirming...</> : <>Complete Booking <Send className="w-5 h-5" /></>}
                           </button>
                        </div>
                     )}
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}

function Heart(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  )
}

function Send(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  )
}
