import { useState } from "react";
import { Button } from "./Button.jsx";
import { ArrowRight, User, Mail, Phone } from "lucide-react";

const LeadCaptureScreen = ({ onSubmit, onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!email.trim()) newErrors.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() || undefined });
    }
  };

  const inputClass = "h-[60px] w-full rounded-lg border border-input bg-card pl-12 pr-4 text-lg text-foreground outline-none transition-all duration-[400ms] placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background px-16">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-10 text-center">
          <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 w-auto mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground">Before We Begin</h2>
          <p className="mt-3 text-lg text-muted-foreground font-secondary">
            Tell us a bit about yourself so we can share your results.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Full Name <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className={inputClass} />
            </div>
            {errors.name && <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={inputClass} />
            </div>
            {errors.email && <p className="mt-1.5 text-sm text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Phone <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
          <Button onClick={handleSubmit} className="flex-1 gap-2">
            Start Assessment
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureScreen;