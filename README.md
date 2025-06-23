# 🧠 Forex Chatbot Web App

A modern, AI-powered multilingual chatbot built with Next.js 15 that helps users understand Forex trading concepts, supports onboarding, answers FAQs, and captures leads for trading support.

![ForexBot Demo](https://via.placeholder.com/800x400/3b82f6/ffffff?text=ForexBot+Demo)

## ✨ Features

### 🤖 AI-Powered Chat

- **OpenAI Integration**: Powered by GPT-4o-mini for accurate, context-aware responses
- **Streaming Responses**: Real-time message streaming for better user experience
- **Smart Context**: Pre-configured with Forex trading expertise and safety guidelines

### 🌐 Multilingual Support

- **English** 🇺🇸: Primary language for global users
- **Hindi** 🇮🇳: हिंदी में सहायता
- **Marathi** 🇮🇳: मराठी भाषेत मदत

### 🎯 Core Capabilities

- **Trading Education**: Leverage, pips, currency pairs, risk management
- **Onboarding Support**: Account creation, KYC processes, platform navigation
- **Market Insights**: Trends, analysis, economic indicators
- **Risk Management**: Responsible trading practices and compliance
- **Lead Capture**: Integrated CRM-ready lead generation system

### 🎨 Modern UI/UX

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme support via shadcn/ui
- **Smooth Animations**: Tailwind CSS transitions and effects
- **Accessible**: WCAG compliant with proper ARIA labels

## 🛠 Tech Stack

| Layer          | Technology                  |
| -------------- | --------------------------- |
| **Frontend**   | Next.js 15 (App Router)     |
| **Styling**    | Tailwind CSS v4 + shadcn/ui |
| **Language**   | JavaScript (ES2024)         |
| **AI/Chat**    | OpenAI GPT-4o-mini API      |
| **Components** | Radix UI + Lucide Icons     |
| **Deployment** | Vercel Ready                |

## 📁 Project Structure

```
/src
  /app
    /api
      /chat          → OpenAI chat API route with streaming
      /leads         → Lead capture API (CRM integration ready)
    /chat            → Dedicated full-screen chat page
    globals.css      → Global styles and CSS variables
    layout.js        → Root layout with metadata
    page.js          → Enhanced landing page with lead capture
  /components
    /ui              → shadcn/ui components (button, input, etc.)
    ChatInterface.jsx → Main chat component with language switching
    MessageBubble.jsx → Chat message bubbles with typing indicators
    LeadCapture.jsx   → Comprehensive lead capture form
  /lib
    chatUtils.js     → Chat utilities, sample questions, validation
    utils.js         → General utilities (cn function, etc.)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd forex-chatbot
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:

   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # Application Configuration
   NEXT_PUBLIC_APP_NAME=ForexBot
   NODE_ENV=development
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### OpenAI API Setup

1. Sign up at [OpenAI](https://platform.openai.com/)
2. Create an API key in your dashboard
3. Add the key to your `.env.local` file
4. The app uses `gpt-4o-mini` for cost efficiency

### Customization

#### Adding New Languages

1. Update `LANGUAGES` object in `ChatInterface.jsx`
2. Add system prompts in `src/app/api/chat/route.js`
3. Add welcome messages and sample questions in respective components

#### Lead Capture Integration

The lead capture system is CRM-ready. To integrate with your CRM:

```javascript
// In src/app/api/leads/route.js
// Uncomment and configure webhook integration
if (process.env.CRM_WEBHOOK_URL) {
  await fetch(process.env.CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
}
```

## 🎨 UI Components

### Available shadcn/ui Components

- `button` - Various button styles and sizes
- `input` - Form inputs with validation states
- `card` - Content containers
- `badge` - Status and category labels
- `avatar` - User profile pictures
- `scroll-area` - Custom scrollbars
- `dropdown-menu` - Accessible dropdown menus
- `separator` - Visual dividers

### Adding New Components

```bash
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add table
```

## 📱 Pages & Routes

### `/` - Landing Page

- Hero section with value proposition
- Interactive chat interface
- Feature showcase
- Lead capture integration
- Social proof elements

### `/chat` - Dedicated Chat Page

- Full-screen chat experience
- Quick topic shortcuts
- Trading tips sidebar
- Enhanced user engagement

### API Routes

- `/api/chat` - OpenAI chat completion with streaming
- `/api/leads` - Lead capture with validation

## 🔒 Security & Privacy

### Data Protection

- No user data stored without consent
- Environment variables for sensitive config
- API rate limiting ready
- CORS protection enabled

### OpenAI Safety

- Pre-configured system prompts for safe responses
- Risk management emphasis in all trading advice
- Regulatory compliance reminders
- Professional guidance recommendations

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on commits

### Manual Deployment

```bash
npm run build
npm start
```

### Environment Variables for Production

```env
OPENAI_API_KEY=your_production_api_key
NODE_ENV=production
CRM_WEBHOOK_URL=your_crm_webhook_url (optional)
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality

- ESLint configuration for Next.js
- Prettier for code formatting
- TypeScript ready (use .tsx files)

## 📈 Performance

### Optimization Features

- Next.js App Router for optimal performance
- Streaming responses for better perceived performance
- Component lazy loading
- Image optimization ready
- Edge runtime compatible

### Monitoring

- Built-in Next.js analytics ready
- OpenAI usage tracking in API routes
- Performance Web Vitals tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- 📖 Check the documentation above
- 🐛 Report bugs via GitHub Issues
- 💬 Ask questions in GitHub Discussions
- 📧 Contact: your-email@domain.com

### Common Issues

**Chat not working?**

- Verify OpenAI API key is correct
- Check API quota and billing
- Ensure environment variables are loaded

**Styling issues?**

- Run `npm run build` to check for CSS conflicts
- Verify Tailwind CSS configuration
- Check for shadcn/ui component updates

---

Built with ❤️ for the Forex trading community

**⚠️ Trading Disclaimer**: This chatbot provides educational information only. Always consult with financial professionals and understand the risks before trading.
