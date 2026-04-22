import { useState } from "react";
import { Button } from "./Button.jsx";
import { Lock, User, Eye, EyeOff } from "lucide-react";

// Update these credentials as needed
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "Emoneeds@2024";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        onLogin();
      } else {
        setError("Invalid username or password. Please try again.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12">
      {/* Logo */}
      <div className="mb-10">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 sm:h-14 w-auto" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-card rounded-3xl shadow-card border border-border/50 p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-light mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">Welcome Back</h1>
          <p className="text-sm text-muted-foreground font-secondary">Sign in to access your assessments</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground font-secondary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background text-sm text-foreground font-secondary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs sm:text-sm text-red-500 font-secondary bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="h-12 sm:h-14 text-sm sm:text-base font-bold rounded-2xl shadow-lg mt-1"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>

      <button
        onClick={onLogin}
        className="mt-4 text-sm text-muted-foreground font-secondary underline underline-offset-2 hover:text-foreground transition"
      >
        Skip for now
      </button>

      <p className="mt-4 text-xs text-muted-foreground font-secondary">
        Powered by emoneeds · Confidential
      </p>
    </div>
  );
};

export default LoginScreen;
