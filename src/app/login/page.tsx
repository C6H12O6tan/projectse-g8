"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExternalLogin() {
  const router = useRouter();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: เรียก API login จริง
    // เดโม: ถ้าใส่อะไรมาก็เด้งไปหน้าโฮม external
    router.push("/external");
  };

  return (
    <main className="login-wrap">
      {/* แถบภาพด้านบน */}
      <div className="login-hero">
        <img src="/bg-login.jpg" alt="" />
      </div>

      {/* กล่องสีน้ำเงิน */}
      <section className="login-panel">
        {/* โลโก้ */}
        <img className="login-logo" src="/PSU-logo-EN.png" alt="PSU" width={120} height={80} />

        <h1 className="login-title">ระบบบริหารจัดการผลงานตีพิมพ์</h1>

        <form className="login-form" onSubmit={onSubmit}>
          <label className="login-field">
            <span className="login-icon">
              {/* user icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input
              required
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>

          <label className="login-field">
            <span className="login-icon">
              {/* lock icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              required
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>

          <button type="submit" className="login-btn">LOGIN</button>
        </form>

        <a className="login-forgot" href="#">Forgot password?</a>
      </section>
    </main>
  );
}
