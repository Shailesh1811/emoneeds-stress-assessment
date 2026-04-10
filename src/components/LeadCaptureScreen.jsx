import { useState } from "react";
import { Button } from "./Button.jsx";
import { User, Mail, Phone } from "lucide-react";

const LeadCaptureScreen = ({ onSubmit }) => {
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

  return (
    <div className="page-wrapper items-center justify-between py-10 sm:py-14 px-5 sm:px-8">
      {/* Logo */}
      <div className="w-full text-center">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 sm:h-13 w-auto mx-auto" />
      </div>

      {/* Form */}
      <div className="content-container flex-1 flex flex-col justify-center py-8 animate-fade-in">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Almost there!
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-muted-foreground font-secondary">
            Enter your details to view your personalized stress assessment results.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 rounded-2xl bg-card border border-border/50 shadow-sm p-5 sm:p-7">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-foreground">
              Full Name <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-11 sm:h-13 w-full rounded-xl border-2 border-border bg-background pl-9 sm:pl-10 pr-4 text-sm sm:text-base outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-11 sm:h-13 w-full rounded-xl border-2 border-border bg-background pl-9 sm:pl-10 pr-4 text-sm sm:text-base outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-foreground">
              Phone <span className="text-muted-foreground font-normal text-xs">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="h-11 sm:h-13 w-full rounded-xl border-2 border-border bg-background pl-9 sm:pl-10 pr-4 text-sm sm:text-base outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="content-container flex justify-center animate-fade-in">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto rounded-2xl shadow-xl"
        >
          {isSubmitting ? "Processing…" : "View Result"}
        </Button>
      </div>
    </div>
  );
};

export default LeadCaptureScreen;
