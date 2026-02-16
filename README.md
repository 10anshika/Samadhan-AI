<p align="center"> <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=40&duration=3000&pause=500&color=3B82F6&center=true&vCenter=true&width=600&height=80&lines=Samadhan-AI;⚖️+Intelligent+Bureaucracy+Navigator;🤖+Your+AI+Guide+to+Governance;🇮🇳+Made+for+India" alt="Typing SVG" /> </p><p align="center"> <img src="https://img.shields.io/badge/TypeScript-98.1%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Powered%20by-Gemini%20API-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" /> <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=github" /> <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" /> </p><p align="center"> <img src="https://via.placeholder.com/800x400/1E293B/FFFFFF?text=Samadhan-AI+Demo+Preview" alt="Demo Preview" width="80%" /> </p><p align="center"> <i>✨ Ask in Hindi, get answers in English. Ask in English, get procedures in simple steps. ✨</i> </p>
📋 Table of Contents
The 30-Second Pitch

Live Demo

Key Features

Tech Stack

Project Structure

Quick Start

Environment Setup

Roadmap

For Developers & Recruiters

Contributing

License

🎯 The 30-Second Pitch
<table> <tr> <td width="60%"> <h3>🤷‍♂️ "How do I get a duplicate driver's license?"</h3> <h3>🤷‍♀️ "What's the process for passport renewal?"</h3> <h3>🤷 "Which form do I need for property tax?"</h3> <br/> <p><strong>Samadhan-AI answers all of this in seconds.</strong> No more CTRL+F through 100-page PDFs. No more calling 10 different helplines. Just type, and get your step-by-step guide.</p> </td> <td width="40%" align="center"> <img src="https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=⚡+Instant+Answers" width="200" /> </td> </tr> </table>
🚀 Live Demo
<p align="center"> <a href="https://ai.studio/apps/drive/10efTSbEZYxMoKCOK1CplghFa_fiE1vCV" target="_blank"> <img src="https://img.shields.io/badge/🚀_LAUNCH_LIVE_DEMO-3B82F6?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=1E3A8A" height="50" /> </a> </p><p align="center"> <table> <tr> <td align="center" width="33%"> <img src="https://via.placeholder.com/100/10B981/FFFFFF?text=✅" width="50" /><br/> <b>No Login Required</b> </td> <td align="center" width="33%"> <img src="https://via.placeholder.com/100/F59E0B/FFFFFF?text=⚡" width="50" /><br/> <b>Works in 2 Seconds</b> </td> <td align="center" width="33%"> <img src="https://via.placeholder.com/100/EF4444/FFFFFF?text=📱" width="50" /><br/> <b>Mobile Friendly</b> </td> </tr> </table> </p>
✨ Key Features
<p align="center"> <table> <tr> <td align="center" width="33%"> <img src="https://via.placeholder.com/150/3B82F6/FFFFFF?text=🗣️" width="100" /><br/> <h3>Talk Naturally</h3> <p>Ask in Hinglish, Hindi, or English — the AI understands context, not just keywords.</p> </td> <td align="center" width="33%"> <img src="https://via.placeholder.com/150/10B981/FFFFFF?text=📋" width="100" /><br/> <h3>Actionable Steps</h3> <p>Not just information — actual checklists: documents, fees, office addresses, website links.</p> </td> <td align="center" width="33%"> <img src="https://via.placeholder.com/150/8B5CF6/FFFFFF?text=⚖️" width="100" /><br/> <h3>Always Updated</h3> <p>Powered by Gemini's latest knowledge — no outdated 2019 PDFs.</p> </td> </tr> </table> </p>
🛠️ Tech Stack




<p align="center"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" /> </p>
📁 Project Structure
text
📦 Samadhan-AI
├── 📂 src
│   ├── 📂 components          # Chat UI components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── TypingIndicator.tsx
│   │
│   ├── 📂 services            # API integration
│   │   └── geminiService.ts   # Gemini API calls
│   │
│   ├── 📂 types               # TypeScript definitions
│   │   └── types.ts
│   │
│   ├── App.tsx                # Main application
│   └── index.tsx              # Entry point
│
├── 📂 public                   # Static assets
├── .env.local                  # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
⚡ Quick Start
Get up and running in 2 minutes:

bash
# 1. Clone the repository
git clone https://github.com/10anshika/Samadhan-AI.git

# 2. Navigate to project directory
cd Samadhan-AI

# 3. Install dependencies
npm install

# 4. Add your Gemini API key (see Environment Setup below)
# 5. Start development server
npm run dev
Your app will be running at http://localhost:5173

🔑 Environment Setup
Create a .env.local file in the root directory:

env
GEMINI_API_KEY=your_gemini_api_key_here
Don't have a Gemini API key?

Visit Google AI Studio

Sign in with your Google account

Generate a free API key

Copy and paste it into .env.local

🗺️ Roadmap
<p align="center"> <table> <tr> <td width="33%" valign="top" bgcolor="#f0f9ff"> <h3 align="center">✅ Phase 1<br /><i>Completed</i></h3> <ul> <li>✓ Core AI conversations with Gemini</li> <li>✓ Responsive chat interface</li> <li>✓ Basic query handling</li> <li>✓ TypeScript implementation</li> </ul> </td> <td width="33%" valign="top" bgcolor="#fffbeb"> <h3 align="center">🔄 Phase 2<br /><i>In Progress</i></h3> <ul> <li>🌐 Multi-language support (Hindi, Tamil, Bengali, Telugu)</li> <li>📄 Document template generator</li> <li>📍 Office locator with maps</li> <li>👍 User feedback system</li> </ul> </td> <td width="33%" valign="top" bgcolor="#fef2f2"> <h3 align="center">🔮 Phase 3<br /><i>Planned</i></h3> <ul> <li>🎤 Voice input/output</li> <li>📱 React Native mobile app</li> <li>🔔 Case tracking</li> <li>🤝 Government portal integration</li> </ul> </td> </tr> </table> </p>
💼 For Developers & Recruiters
<table> <tr> <td width="50%"> <h3>🧠 AI Integration Done Right</h3> <p>Not just a wrapper around an API. Samadhan-AI showcases how to structure prompts, handle responses, and create a seamless UX around LLMs.</p> <ul> <li>✅ Proper prompt engineering</li> <li>✅ Error handling & fallbacks</li> <li>✅ Rate limiting considerations</li> </ul> </td> <td width="50%"> <h3>🇮🇳 Real-World Impact</h3> <p>This isn't another todo app. It solves a genuine problem faced by 1.4 billion citizens. Technology with purpose.</p> <ul> <li>✅ Accessibility focus</li> <li>✅ Multi-language ready</li> <li>✅ Mobile-first design</li> </ul> </td> </tr> <tr> <td width="50%"> <h3>⚡ Clean Code Architecture</h3> <p>98% TypeScript. Strong typing, no <code>any</code> types, well-organized components.</p> <ul> <li>✅ Separation of concerns</li> <li>✅ Reusable components</li> <li>✅ Production-ready structure</li> </ul> </td> <td width="50%"> <h3>🚀 Modern Development</h3> <p>Built with 2025 best practices in mind.</p> <ul> <li>✅ Vite for lightning-fast builds</li> <li>✅ React 18 with hooks</li> <li>✅ Environment configuration</li> </ul> </td> </tr> </table>
🤝 Contributing
We welcome contributions from everyone! Here's how you can help:

🌟 Ways to Contribute
🐛 Report bugs by opening an issue

💡 Suggest features via issues

🌐 Add translations for regional languages

📝 Improve documentation

🔧 Submit PRs for open issues

🚀 First Time Contributing?
bash
# Fork the repository
# Then clone your fork
git clone https://github.com/your-username/Samadhan-AI.git

# Create a branch
git checkout -b feature/your-feature-name

# Make your changes
# Commit and push
git commit -m "Add: your feature description"
git push origin feature/your-feature-name

# Open a Pull Request
Looking for good first issues? Check out issues labeled "good first issue".

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Google for the Gemini API

The open-source community for amazing tools

Every citizen who struggles with bureaucracy — this is for you

<p align="center"> <img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&height=100&section=footer&text=Samadhan+—+Resolution+for+Everyone&fontSize=24&fontAlignY=70" width="100%" /> </p><p align="center"> <a href="https://github.com/10anshika/Samadhan-AI"> <img src="https://img.shields.io/badge/📁_Repository-GitHub-181717?style=for-the-badge&logo=github" /> </a> <a href="https://ai.studio/apps/drive/10efTSbEZYxMoKCOK1CplghFa_fiE1vCV"> <img src="https://img.shields.io/badge/🚀_Live_Demo-Try_Now-3B82F6?style=for-the-badge" /> </a> </p><p align="center"> <sub>Built with ❤️ in India for every citizen</sub> <br/> <sub>⭐ Star this repository if it helps you! ⭐</sub> </p>
