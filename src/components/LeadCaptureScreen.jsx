import { useState } from "react";
import { Button } from "./Button.jsx";
import { User, Mail, Phone } from "lucide-react";

const LeadCaptureScreen = ({ onSubmit, onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!email.trim()) newErrors.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() || undefined });
    }
  };

  const inputClass = "h-[60px] w-full rounded-lg border border-input bg-card pl-12 pr-4 text-lg text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

  return (
    <div className="flex h-screen flex-col items-center justify-between bg-background px-8 py-12 md:py-20">
      <div className="w-full text-center shrink-0">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 w-auto mx-auto mb-4 drop-shadow-xl" />
      </div>

      <div className="flex flex-col flex-1 justify-center w-full max-w-lg md:max-w-2xl px-4 animate-fade-in">
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">Almost there!</h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground font-secondary px-4">
            Enter your details to view your personalized stress assessment results.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 rounded-2xl bg-card border-border/50 md:border md:shadow-sm md:p-8">
          <div>
            <label className="mb-3 block text-sm md:text-base font-semibold text-foreground">
              Full Name <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="h-[64px] md:h-[72px] w-full rounded-xl border-2 border-border bg-background pl-14 pr-4 text-lg outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20" />
            </div>
            {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-3 block text-sm md:text-base font-semibold text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="h-[64px] md:h-[72px] w-full rounded-xl border-2 border-border bg-background pl-14 pr-4 text-lg outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20" />
            </div>
            {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-3 block text-sm md:text-base font-semibold text-foreground">
              Phone <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="h-[64px] md:h-[72px] w-full rounded-xl border-2 border-border bg-background pl-14 pr-4 text-lg outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full shrink-0 flex justify-center mt-6 animate-fade-in delay-200">
        <Button onClick={handleSubmit} className="px-12 md:px-16 h-16 md:h-18 text-xl font-bold rounded-2xl shadow-xl w-full max-w-xs md:max-w-md">
          View Result
        </Button>
      </div>
    </div>
  );
};

export default LeadCaptureScreen;