export default function About() {
  return (
    <div className="container luxury-reveal">

      {/* ✅ HERO */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <img
          src="/images/VerdictifyLOGO.png"
          alt="Verdictify"
          style={{ width: 140 }}
        />
        <h1 className="h1">About Verdictify</h1>
        <p className="muted" style={{ maxWidth: 520, margin: "0.4rem auto 0" }}>
          Luxury Intelligence for Smart Buyers
        </p>
      </div>
      <div style={{ marginBottom: "1.4rem" }}>
  <button
    className="back-btn"
    onClick={() => window.location.href = "/"}
  >
    ← Back to Home
  </button>
</div>


      {/* ✅ ABOUT WEBSITE */}
      <div className="card reveal" style={{ marginBottom: "1.5rem" }}>
        <h2 className="h2">What is Verdictify?</h2>
<p className="muted" style={{ marginTop: "-6px" }}>
  AI-Driven Luxury Product Intelligence
</p>
        <p style={{ marginTop: "0.6rem", lineHeight: 1.7 }}>
          Verdictify is an AI-powered product review intelligence platform that
          analyzes real customer reviews to generate a luxury-grade buying
          verdict. It provides:
        </p>

        <ul style={{ marginTop: "0.9rem", lineHeight: 2, paddingLeft: "1rem" }}>
          <li>AI-based Sentiment Analysis</li>
          <li>Weighted Product Score System</li>
          <li>Fake Review Filtering</li>
          <li>Confidence Level Meter</li>
          <li>Smart Buy / No-Buy Verdict</li>
        </ul>

        <p style={{ marginTop: "0.9rem" }}>
          Built for shoppers who demand accuracy, confidence, and premium
          decision-making.
        </p>
      </div>

      {/* ✅ DEVELOPER CARD – LEFT IMAGE + RIGHT INFO */}
      <div
        className="card reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "1.8rem",
          alignItems: "center"
        }}
      >
        {/* ✅ LEFT: ANIMATED ROUND-RECT PROFILE IMAGE */}
        <div style={{ textAlign: "center" }}>
          <img
  src="/images/anuroop-profile.jpg"
  alt="Anuroop Srivastava"
  style={{
    width: 180,
    height: "auto",              // ✅ no forced height
    borderRadius: "18px",        // ✅ card-style instead of circle
    objectFit: "contain",       // ✅ NO CROP
    background: "rgba(220,172,90,0.45)",
    padding: "6px",
    border: "1px solid rgba(220,172,90,0.6)",
    boxShadow: "0 0 35px rgba(220,172,90,0.45)"
  }}
/>

        </div>

        {/* ✅ RIGHT: DEVELOPER INFO */}
        <div>
          <h2 className="h2">About the Developer</h2>
<p className="muted" style={{ marginTop: "-6px" }}>
  Founder & Full-Stack Engineer
</p>

          <p style={{ marginBottom: "0.9rem", lineHeight: 1.7 }}>
            <strong>Hi</strong>, I’m <strong>Anuroop Srivastava</strong>, the founder and lead engineer behind <strong>Verdictify</strong>. I work on full-stack systems, AI-driven intelligence platforms, and high-performance luxury user interfaces focused on real-world usability and precision.

          </p>
          <p style={{
  marginTop: "0.6rem",
  marginBottom :"0.6rem",
  fontSize: "0.75rem",
  letterSpacing: "1px",
  color: "#dcac5a",
  opacity: 0.75
}}>
  — Founder, Verdictify
</p>

          {/* ✅ UPDATED SOCIAL ICON BUTTONS */}
          <div className="social-wrap">
            <a href="https://www.instagram.com/anuroop.srivastava/" target="_blank" className="social-btn">
              <img src="/images/icon-instagram.png" alt="Instagram" />
              Instagram
            </a>

            <a href="https://github.com/AnuroopSrivastava" target="_blank" className="social-btn">
              <img src="/images/icon-github.png" alt="GitHub" />
              GitHub
            </a>

            <a href="https://www.linkedin.com/in/anuroopsrivastava/" target="_blank" className="social-btn">
              <img src="/images/icon-linkedin.png" alt="LinkedIn" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* ✅ INLINE ANIMATION STYLE */}
      <style jsx>{`
        .profile-animate {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          animation: profileReveal 0.8s ease-out forwards;
        }

        @keyframes profileReveal {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

    </div>
  );
}
