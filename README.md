# 🌍 Yet Another Travel Map (YATM)

Yet Another Travel Map (YATM) is a web application designed to help users create, manage, and share personalized travel maps with ease. Unlike traditional mapping platforms, YATM is focused on flexibility, customization, and collaboration — empowering users to visualize and organize their travel experiences in a way that truly reflects their journeys.

---

## ✨ Features

- 🧑‍💻 **User Accounts**  
  Register, login, and manage your account securely.

- 🗺️ **Interactive Travel Map**  
  View and manage your travel locations on an interactive map.

- 📍 **Pin Management**  
  Add, edit, and categorize pins to track places you've been or want to visit.

- 📊 **Travel Statistics**  
  See insights into your travel history, including countries visited and total pins.

- 📂 **Data Import/Export**  
  Import and export travel data in KML, JSON, and XML formats.


---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn
- A modern browser

### Setup

```bash
git clone https://github.com/yourusername/yet-another-travel-map.git
cd yet-another-travel-map
npm install
```

Create a `.env` file with:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yatm
MAPBOX_API_KEY=your_mapbox_key_here
```

Start the app:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
yatm/
├── client/          # React frontend
├── server/          # Express backend
├── models/          # Mongoose data models
├── routes/          # API endpoints
├── utils/           # Helper functions
└── public/          # Static assets
```

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m 'Add YourFeature'`)  
4. Push to your branch (`git push origin feature/YourFeature`)  
5. Open a pull request

---

## 📄 License

MIT License. See `LICENSE` file for details.

---

## 📬 Contact

**Your Name**  
Email: your@email.com  
GitHub: [yourusername](https://github.com/yourusername)
