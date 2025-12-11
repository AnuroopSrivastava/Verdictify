# ✨ Verdictify — AI-Powered Product Review Intelligence

Verdictify is a premium AI-driven review analysis engine that transforms real customer feedback into a clean, structured, and trustworthy buying verdict.  
Designed with a luxury gold-themed interface, Verdictify helps users make confident decisions with clarity and style.

---

## 🚀 Features

### 🔎 AI-Based Review Analysis
- Real-time review extraction from **Myntra product pages**
- Automatic cleaning, parsing, and interpretation of user feedback

### ⭐ Weighted Product Score System
- Converts raw ratings into a **trust-worthy 0–100 score**
- Higher weightage for verified and consistent sentiment

### 🎭 Sentiment Breakdown
- Positive, Neutral, Negative distribution  
- Presented using **elegant visual charts**

### 🛡️ Fake Review Resistance
- Handles missing reviews with fallback heuristics  
- Detects sentiment spikes to prevent misleading scores

### 🎯 Buy / No-Buy Verdict
Based on:
- Average review rating
- Sentiment distribution
- Consistency score
- AI confidence computation

Possible verdicts:
- **Strong Buy**
- **Recommended**
- **Average – Think Before Buying**
- **Not Recommended**

### 🧠 Pros & Cons Generator
Automatically extracts:
- Common positive themes
- Common complaints  
Clean and easy-to-read summary.

---

## 🖼️ Product Image Extraction (High Accuracy)

Verdictify uses a multi-layered extraction algorithm to ensure **official product images** are fetched — not review images.

Priority order:
1. `styleImages.default.imageURL`
2. `masterImages.image`
3. `OG:image`
4. `alternateImages`
5. Fallback CDN detection  
6. Local placeholder

Fixes include:
- Escaped slashes  
- Unicode escapes  
- Low-resolution images  

---

## 💎 Premium UI & UX

### 🎨 Luxury Gold Theme
- Gradient gold typography  
- Glassmorphism cards  
- Soft particle glow background  
- Premium vector branding  
- Smooth cinematic animations  

### 🖱️ Interactive Elements
- Magnetic buttons  
- Gold ripple animations  
- Haptic micro-shake  
- Luxury modal system  
- Premium splash loader  

### 📊 Data Visualisation
Powered by **Chart.js**:
- Doughnut sentiment chart  
- Star distribution bar chart  

### 📱 Responsive & Mobile-Friendly
Optimised for:
- Mobile  
- Tablet  
- Desktop  

Includes:
- Responsive grid  
- Stacked developer sections  
- Auto-scaling product cards  

---

## 👨‍💻 About the Developer

**Developed by:** *Anuroop Srivastava*  
Full-stack engineer specialising in UI/UX, AI-based systems, and premium digital experiences.

---

## 🔗 Social Links

| Platform   | Link |
|-----------|------|
| Instagram | (https://www.instagram.com/anuroop.srivastava/) |
| GitHub    | (https://github.com/AnuroopSrivastava) |
| LinkedIn  | (https://www.linkedin.com/in/anuroopsrivastava/) |

---

## ⚙️ Tech Stack

### Frontend
- Next.js (React)
- Chart.js visualisations
- Custom Luxury UI Framework (CSS)
- Particle engine

### Backend
- Next.js API Routes
- Axios
- ScrapingBee (HTML fetching)
- Custom sentiment engine

### Other Core Components
- Regex-based HTML extraction
- Custom review cleaning pipeline
- Dynamic animations

---

## 🔧 Installation

```bash
git clone https://github.com/yourname/verdictify.git
cd verdictify
npm install
npm run dev
```
---

## 🔑 Environment Variables

Create a file named .env.local:

SCRAPER_API_KEY=your_scrapingbee_key

---

## 📌 Folder Structure
Verdictify/

├── pages/

│   ├── api/

│   │   └── analyze.js          # API route for review processing

│   ├── _app.js                 # Global App wrapper

│   ├── about.js                # About page

│   └── index.js                # Homepage UI

│

├── public/

│   └── images/

│       ├── anuroop-profile.jpg

│       ├── icon-github.png

│       ├── icon-instagram.png

│       ├── icon-linkedin.png

│       ├── placeholder.png

│       ├── VerdictifyLOGO.png

│       ├── VerdictifyVECTOR.png

│       └── VerdictifyVECTOR.

│

├── styles/

│   └── globals.css             # Global styles & luxury theme

│

├── .env.local                  # Environment variables

├── .gitignore

├── next.config.js              # Next.js configuration

├── package.json

├── package-lock.json

└── README.md


   


---


## 🛡️ License

This project is licensed for personal and portfolio use.
Commercial use requires permission from the developer.

---


## 🌟 Final Notes

Verdictify is crafted to deliver:
- Accuracy
- Elegance
- Professional AI insights# Verdictify
