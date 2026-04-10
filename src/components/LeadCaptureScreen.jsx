import { useState } from "react";
import { Button } from "./Button.jsx";
import { User, Mail, Phone, Building2 } from "lucide-react";

const LeadCaptureScreen = ({ onSubmit, onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
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
      onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() || undefined, organization: organization.trim() || undefined });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-background px-6 sm:px-10 py-10 sm:py-16">
      <div className="w-full text-center shrink-0">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 sm:h-14 w-auto mx-auto" />
      </div>

      <div className="flex flex-col flex-1 justify-center w-full max-w-lg px-0 animate-fade-in py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Almost there!</h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground font-secondary">
            Enter your details to view your personalized stress assessment results.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6 rounded-2xl bg-card border border-border/50 shadow-sm p-6 sm:p-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Full Name <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-12 sm:h-14 w-full rounded-xl border-2 border-border bg-background pl-10 pr-4 text-sm sm:text-base outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {errors.name && <p className="mt-1.5 text-xs sm:text-sm text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 sm:h-14 w-full rounded-xl border-2 border-border bg-background pl-10 pr-4 text-sm sm:text-base outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs sm:text-sm text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Phone <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="h-12 sm:h-14 w-full rounded-xl border-2 border-border bg-background pl-10 pr-4 text-sm sm:text-base outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Organization <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Enter your organization name"
                className="h-12 sm:h-14 w-full rounded-xl border-2 border-border bg-background pl-10 pr-4 text-sm sm:text-base outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full shrink-0 flex justify-center animate-fade-in">
        <Button onClick={handleSubmit} className="w-full sm:w-auto px-10 sm:px-14 h-13 sm:h-14 text-base sm:text-lg font-bold rounded-2xl shadow-xl">
          View Result
        </Button>
      </div>
    </div>
  );
};

export default LeadCaptureScreen;
