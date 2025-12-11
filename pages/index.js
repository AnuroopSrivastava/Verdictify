import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function showLuxuryAlert(message) {
  const existing = document.querySelector(".luxury-alert");
  if (existing) existing.remove();

  const alertBox = document.createElement("div");
  alertBox.className = "luxury-alert";
  alertBox.innerHTML = `
    <div class="luxury-alert-box">
      <p class="luxury-alert-message">${message}</p>
      <p class="luxury-alert-countdown">Closing in <span>3</span>s…</p>
      <button type="button" class="luxury-alert-button">OK</button>
    </div>
  `;

  document.body.appendChild(alertBox);

  const card = alertBox.querySelector(".luxury-alert-box");
  const button = alertBox.querySelector(".luxury-alert-button");
  const countdownSpan = alertBox.querySelector(".luxury-alert-countdown span");

  // ✅ soundless haptic shake
  if (card) {
    card.classList.add("haptic");
    setTimeout(() => card.classList.remove("haptic"), 250);
  }

  const removeAlert = () => {
    alertBox.classList.add("fade-out");
    setTimeout(() => {
      alertBox.remove();
    }, 200);
  };

  // ⏱ countdown 3 → 2 → 1
  let remaining = 3;
  if (countdownSpan) countdownSpan.textContent = String(remaining);

  const intervalId = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(intervalId);
      return;
    }
    if (countdownSpan) countdownSpan.textContent = String(remaining);
  }, 1000);

  // ✅ auto-close after 3 seconds
  const timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    removeAlert();
  }, 3000);

  // ✅ close on button click
  button.addEventListener("click", () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    removeAlert();
  });

  // ✅ close when clicking outside the box
  alertBox.addEventListener("click", e => {
    if (e.target === alertBox) {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      removeAlert();
    }
  });
}


export default function Home() {
  const [url, setUrl] = useState("");
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("home");
  const [pageLoading, setPageLoading] = useState(false);

  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  /* ✅ SPLASH LOADER */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  /* ✅ MAGNETIC BUTTON */
  useEffect(() => {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px) scale(1.05)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = `translate(0px, 0px) scale(1)`;
      });
    });
  }, []);

  /* ✅ GOLD RIPPLE */
  useEffect(() => {
    const clickHandler = e => {
      const btn = e.target.closest(".button");
      if (!btn) return;
      btn.classList.remove("ripple");
      void btn.offsetWidth;
      btn.classList.add("ripple");
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  /* ✅ CURSOR LIGHT */
  useEffect(() => {
    const light = document.getElementById("cursor-light");
    if (!light) return;

    const move = e => {
      light.style.left = e.clientX + "px";
      light.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ✅ SCORE ANIMATION */
  useEffect(() => {
    if (!data?.weightedScore) return;

    let score = 0;
    let conf = 0;

    const scoreTimer = setInterval(() => {
      score++;
      if (score >= data.weightedScore) {
        score = data.weightedScore;
        clearInterval(scoreTimer);
      }
      setAnimatedScore(score);
    }, 12);

    const confTimer = setInterval(() => {
      conf++;
      if (conf >= data.confidence) {
        conf = data.confidence;
        clearInterval(confTimer);
      }
      setAnimatedConfidence(conf);
    }, 12);

    return () => {
      clearInterval(scoreTimer);
      clearInterval(confTimer);
    };
  }, [data]);

  /* ✅ ✅ GUARANTEED RESULT TAB FIX */
  const handleAnalyze = async e => {
  e.preventDefault();
  setError("");
  setAnalyzing(true);
  setData(null);

  // ✅ HAPTIC SHAKE ON CLICK
  const btn = document.querySelector(".button");
  if (btn) {
    btn.classList.remove("haptic");
    void btn.offsetWidth;
    btn.classList.add("haptic");
  }

  try {
    const res = await axios.post("/api/analyze", {
      url,
      limit: Number(limit)
    });

    console.log("✅ API DATA:", res.data);
    setData(res.data);

    // ✅ GOLD SUCCESS FLASH
    const flash = document.createElement("div");
    flash.className = "success-flash";
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    setTimeout(() => {
      setTab("result");
    }, 150);

  } catch (err) {
    console.error("❌ API ERROR:", err);
    setError(
      err.response?.data?.error ||
        "Something went wrong while analyzing this product."
    );
  } finally {
    setAnalyzing(false);
  }
};

  const starChartData = data && {
    labels: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"],
    datasets: [{ label: "Reviews", data: Object.values(data.starCounts || {}) }]
  };

  const sentimentChartData = data && {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [{ data: [data.positive, data.neutral, data.negative] }]
  };

  const getReviewClass = r => {
    if (r.rating > 3.8) return "review-positive";
    if (r.rating >= 2.5) return "review-neutral";
    return "review-negative";
  };

  const handleBuyNow = () => {
    if (!url) return;
    if (url.includes("myntra") || url.includes("amazon")) {
      window.open(url, "_blank");
    } else {
      showLuxuryAlert("Analyze product first.");
    }
  };

  /* ✅ SPLASH */
  if (loading) {
    return (
      <div className="splash">
        <div className="splash-logo">
          <img src="/images/VerdictifyLOGO.png" alt="Verdictify" style={{ width: 170 }} />
          <span className="gold">Verdictify</span>
          <p className="splash-tagline">Luxury Intelligence for Smart Buyers</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ PARTICLES */}
      <div className="particles">
        {[...Array(120)].map((_, i) => (
          <span
            key={i}
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 6 + Math.random() * 8 + "s",
              animationDelay: Math.random() * 6 + "s"
            }}
          />
        ))}
      </div>

      {/* ✅ CURSOR LIGHT */}
      <div className="cursor-light" id="cursor-light" />

      {/* ✅ BLUR OVERLAY */}
      <div className={`page-blur-overlay ${pageLoading ? "active" : ""}`} />

      {/* ✅ MAIN CONTAINER */}
      <div className="container luxury-reveal">

        {/* ✅ HERO */}
        <div style={{ textAlign: "center", marginBottom: ".5rem" }}>
          <img src="/images/VerdictifyLOGO.png" alt="Logo" style={{ width: 170 }} />
          <h1 className="h1" style={{text:"#dcac5a"}} >Verdictify</h1>
          <p className="muted" style={{ maxWidth: 520, margin: "0.4rem auto 0" }}>
            Where luxury intelligence meets flawless buying decisions.
          </p>
        </div>

        {/* ✅ HOME */}
        {tab === "home" && (
          <form
            onSubmit={handleAnalyze}
            className="card reveal"
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            <input
              className="input"
              placeholder="Paste any Myntra product URL..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />

            <div style={{ display: "flex", gap: "0.8rem", marginTop: ".8rem" }}>
              <input
                className="input"
                type="number"
                min="10"
                max="200"
                value={limit}
                onChange={e => setLimit(e.target.value)}
              />
              <button className="button" disabled={analyzing}>
                {analyzing ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {error && <p style={{ color: "#f87171" }}>{error}</p>}
          </form>
        )}

        {/* ✅ ✅ RESULT – SAFE RENDER */}
        {tab === "result" && data?.weightedScore !== undefined && (
          <>
            <div className="card reveal" style={{ textAlign: "center" }}>
              <img
  src={data.productImage && data.productImage.startsWith("http")
        ? data.productImage
        : "/images/placeholder.png"}
  alt={data.productName}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/images/placeholder.png";
  }}
  style={{
    width: "200px",
    height: "auto",
    borderRadius: "14px",
    margin: "0 auto 12px",
    display: "block",
    objectFit: "contain",
    background: "#000",
    padding: "6px",
  }}
/>


              <h2 className="h2">{data.productName}</h2>
            </div>

            <div className="card reveal">
              <p style={{ fontWeight: 800 }}>Score: {animatedScore}%</p>
              <p>{data.verdict}</p>

              <div className="confidence-wrap">
                <div
                  className={`confidence-bar ${
                    animatedConfidence >= 80
                      ? "green"
                      : animatedConfidence >= 60
                      ? "yellow"
                      : "red"
                  }`}
                  style={{ width: `${animatedConfidence}%` }}
                />
              </div>

              <p className="muted">AI Confidence: {animatedConfidence}%</p>

              <button
                className="button"
                style={{ width: "100%", marginTop: "1rem" }}
                onClick={handleBuyNow}
              >
                🛒 Buy Now
              </button>
            </div>

            <div className="grid-2">
              <div className="card reveal">
                <h3 className="h2">Sentiment</h3>
                <Doughnut data={sentimentChartData} />
              </div>

              <div className="card reveal">
                <h3 className="h2">Stars</h3>
                <Bar data={starChartData} />
              </div>
            </div>

            <div className="card reveal">
              <h3 className="h2">Top Reviews</h3>
              {data.reviews?.slice(0, 6).map((r, i) => (
                <p key={i} className={getReviewClass(r)}>
                  ⭐ {r.rating} — {r.text}
                </p>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ✅ BOTTOM NAV */}
      <div className="bottom-nav">
        <div
          className={`bottom-item ${tab === "home" ? "active" : ""}`}
          onClick={() => {
            setPageLoading(true);
            setTimeout(() => {
              setTab("home");
              setPageLoading(false);
            }, 300);
          }}
        >
          Home
        </div>

        <div
          className={`bottom-item ${tab === "result" ? "active" : ""}`}
          onClick={() => {
            if (!data) return  showLuxuryAlert("Analyze product first.");
            setPageLoading(true);
            setTimeout(() => {
              setTab("result");
              setPageLoading(false);
            }, 300);
          }}
        >
          Result
        </div>
        <div
  className="bottom-item"
  onClick={() => {
    setPageLoading(true);
    setTimeout(() => {
      window.location.href = "/about";
      setPageLoading(false);
    }, 300);
  }}
>
  About
</div>

      </div>
    </>
  );
}
