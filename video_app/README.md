# 🎬 Video App - Expo & React Native

This is a **YouTube-based learning application** built using **React Native and Expo**. The app features a **tab-based navigation system**, video playback, and user settings.

## 🚀 Features

- 📌 **Tab Navigation** (Home & Explore)
- 🎥 **Video Player** (using `react-native-video`)
- 🎨 **Dark Mode Support**
- 🔔 **Learning Reminders & Notifications**
- ⚡ **Optimized Performance with Expo**
- 🔄 **Haptic Feedback for Tabs**

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
git clone https://github.com/your-repo/video_app.git
cd video_app

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Start the App
npx expo start

### 📂 Project Structure
📦 video_app
├── 📂 app
│   ├── 📂 (tabs)              # Tab navigation screens
│   │   ├── Home.tsx           # Home screen
│   │   ├── Explore.tsx        # Explore screen
│   ├── index.tsx              # Main entry screen
│   ├── settings.tsx           # User settings screen
│   ├── videoplayerscreen.tsx  # Video player screen
├── 📂 assets                   # Images & icons
├── 📂 components               # UI Components
├── 📂 constants                # App-wide constants (e.g., colors)
├── 📂 hooks                    # Custom hooks
├── 📂 styles                   # Global styles
├── .env                        # API keys (DO NOT COMMIT)
├── .gitignore                  # Files to ignore in Git
├── babel.config.js             # Babel configuration
├── package.json                # Dependencies & scripts
└── README.md                   # Project documentation


### 🔑 Environment Variables
This app uses environment variables for API keys. DO NOT hardcode keys in your source code.
Instead, store them in a .env file:

API_KEY=YOUR_YOUTUBE_API_KEY

Also, ensure you have the env.d.ts file for TypeScript:
declare module '@env' {
  export const API_KEY: string;
}


### 🔗 Dependencies
Expo (React Native framework)

expo-router (Navigation)

react-native-video (Video playback)

react-native-dotenv (Environment variables)

expo-splash-screen (Custom splash screen)

expo-haptics (Haptic feedback)


### 🛠️ Development Commands
Command	Description
npm install	Install dependencies
npx expo start	Start the development server
expo build	Build the app for production
expo start -c	Clear cache & restart Expo
📌 Next Steps
🔹 Connect to a Backend API

🔹 Add Authentication (Firebase, Supabase, etc.)

🔹 Enable Push Notifications

🔹 Improve UI & Add Animations

### 📜 License
This project is open-source and available under the MIT License.