Markdown
# 🔍 LostLink – National Lost & Found Platform

**LostLink** is a nationwide, community-driven web application built to help people report, search for, and recover lost belongings anywhere across Sri Lanka with zero friction.

---

## 🌟 Key Features

* **Anonymous Reporting (No Login Barrier):** Anyone can instantly publish a lost or found report with item images, location, and description without mandatory account registration.
* **Live Feed & Dynamic Filtering:** Search and filter items dynamically by keywords, category, district, date, and status.
* **Direct Communication Channels:** Instant direct dial, WhatsApp messaging, and public link sharing.
* **"Notify Me" SMS Integration:** Allows finders to dispatch customizable direct SMS alerts to item owners.
* **Dynamic Platform Statistics:** Real-time metrics tracking Total Lost, Total Found, Successfully Returned, and Still Missing items.
* **Bilingual & Fully Accessible:** Full support for both **English** and **Sinhala (සිංහල)**.
* **Adaptive Theming:** Clean, responsive UI with **Light Mode** and **Dark Mode** toggle.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Lucide React
* **Backend & Database:** Firebase Cloud Firestore
* **Forms & Communication:** FormSubmit (Support Portal), Web SMS/WhatsApp URI Protocols

---

## 🚀 Getting Started Locally

### Prerequisites
* Node.js (v16.0 or later)
* npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/chamudierangi/lostlink.git](https://github.com/chamudierangi/lostlink.git)
   cd lostlink
Install dependencies:

Bash
npm install
Configure Firebase:
Create or verify your src/firebase.js configuration:

JavaScript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
Run the development server:

Bash
npm start
Open http://localhost:3000 to view the application in your browser.

🔮 Future Enhancements
AI-powered image matching between lost and found items.

Interactive geographical map visualization for loss/recovery zones.

In-app real-time encrypted messaging between owners and finders.

Automated integration with public transit and municipal lost & found registries.

👩‍💻 Author
Chamudi Erangi

GitHub: @chamudierangi

LinkedIn: Chamudi Erangi

WhatsApp: +94 77 810 7543

📄 License
This project is licensed under the MIT License.
