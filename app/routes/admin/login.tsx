import type { Route } from "./+types/login";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Lock } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import styles from "./login.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Login - Mauli Industries CMS" },
    { name: "description", content: "Login to Mauli Industries Content Management System" },
  ];
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock authentication - in production, this would call an API
    setTimeout(() => {
      if (email === "admin@mauliindustries.co.in" && password === "admin123") {
        // Store auth state (in production, use proper auth tokens)
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Lock className={styles.icon} />
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Content Management System</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mauliindustries.co.in"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className={styles.backLink}>
          <Link to="/" className={styles.backLinkText}>
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
