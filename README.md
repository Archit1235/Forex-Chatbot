# Forex Chatbot - AI Trading Assistant

A modern, responsive Forex education and support chatbot built with Next.js 15, OpenAI Assistant API, and shadcn/ui. This multilingual AI assistant helps users learn Forex trading concepts, understand market dynamics, and get guidance on trading-related questions.

## ✨ Features

- **🤖 AI-Powered Assistant**: OpenAI Assistant API for intelligent, context-aware conversations
- **🌍 Multilingual Support**: Automatic language detection and support for English, Hindi, and Marathi
- **📱 Fully Responsive**: Modern, mobile-first design that works across all devices
- **⚡ Real-time Streaming**: Instant response streaming for smooth conversation flow
- **📚 Educational Focus**: Specialized in Forex trading education, onboarding, and FAQs
- **🎨 Modern UI**: Clean, minimalistic design with shadcn/ui components
- **🔧 Topic-Based Chat**: Quick access to common trading topics and questions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **AI Integration**: OpenAI Assistant API
- **Language**: JavaScript/TypeScript
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd forex-chatbot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   # Optional: Set a specific assistant ID
   OPENAI_ASSISTANT_ID=asst_your_assistant_id_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/         # OpenAI Assistant API route
│   ├── chat/             # Dedicated chat page
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── ChatInterface.jsx # Main chat component
│   └── MessageBubble.jsx # Chat message bubble
└── lib/
    └── utils.js          # Utility functions
```

## 🎯 Key Features Explained

### OpenAI Assistant API Integration

The chatbot uses OpenAI's Assistant API instead of simple completions, providing:

- Better token efficiency
- Improved context management
- Automatic multilingual support
- Enhanced conversation flow

### Responsive Chat Interface

- **Mobile-first design**: Optimized for all screen sizes
- **Proper scrolling**: Fixed overflow issues with smooth scrolling
- **Auto-resize**: Dynamic height adjustment
- **Touch-friendly**: Optimized for mobile interactions

### Topic-Based Navigation

- **Quick Topics**: Pre-defined trading topics for easy access
- **Sample Questions**: Contextual question suggestions
- **Smart Categorization**: Organized by trading concepts

### Educational Focus

The AI assistant specializes in:

- Forex trading basics (pips, leverage, currency pairs)
- Account setup and KYC processes
- Risk management and trading strategies
- Market analysis and trends
- Regulatory information (especially for India/SEBI)

## 🌐 Multilingual Support

The chatbot automatically detects and responds in the user's language:

- **English**: Full support for international users
- **Hindi**: हिंदी में पूर्ण सहायता
- **Marathi**: मराठीत संपूर्ण सहाय्य

## 🔧 Configuration

### OpenAI Assistant Setup

The app automatically creates an OpenAI Assistant with specialized Forex trading instructions. You can also provide your own assistant ID via environment variables.

### Customization

- **Assistant Instructions**: Modify `/src/app/api/chat/route.js` to update AI behavior
- **Topics**: Edit `/src/app/chat/page.js` to add/modify quick topics
- **Styling**: Update Tailwind classes or add custom CSS

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile**: Optimized chat interface with touch-friendly controls
- **Tablet**: Balanced layout with topic sidebar
- **Desktop**: Full-featured experience with side-by-side layout

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app is a standard Next.js application and can be deployed on any platform that supports Node.js.

## 🔒 Environment Variables

| Variable               | Description                      | Required |
| ---------------------- | -------------------------------- | -------- |
| `OPENAI_API_KEY`       | Your OpenAI API key              | Yes      |
| `OPENAI_ASSISTANT_ID`  | Specific assistant ID (optional) | No       |
| `NEXT_PUBLIC_APP_NAME` | Application name                 | No       |

## 🎨 UI Components

Built with shadcn/ui components:

- `Button` - Interactive buttons with variants
- `Card` - Content containers
- `Input` - Form inputs
- `ScrollArea` - Scrollable containers
- `Badge` - Status indicators
- `Avatar` - User/bot avatars

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Note**: This is an educational tool. Always verify trading advice with financial professionals and trade responsibly.
