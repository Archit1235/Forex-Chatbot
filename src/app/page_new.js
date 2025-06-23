'use client';

import { useState, useRef } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { LeadCapture } from '@/components/LeadCapture';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Shield,
  Globe,
  MessageCircle,
  BarChart3,
  BookOpen,
  Users,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';

export default function Home() {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const chatRef = useRef(null);

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetSupport = () => {
    setShowLeadCapture(true);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted'>
      {/* Navigation */}
      <nav className='border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 bg-primary rounded-lg flex items-center justify-center'>
              <TrendingUp className='h-5 w-5 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold'>ForexBot</span>
          </div>
          <div className='flex items-center gap-4'>
            <Badge variant='secondary' className='gap-1'>
              <Zap className='h-3 w-3' />
              AI Powered
            </Badge>
            <Button onClick={handleGetSupport} size='sm' className='gap-2'>
              <Phone className='h-4 w-4' />
              Get Support
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='container mx-auto px-4 py-12'>
        <div className='text-center mb-16'>
          <Badge variant='outline' className='mb-4'>
            🚀 Your AI Trading Companion
          </Badge>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight mb-6'>
            Master Forex Trading with
            <span className='text-primary'> AI Guidance</span>
          </h1>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Get instant answers about Forex trading, learn strategies,
            understand market dynamics, and accelerate your trading journey with
            our multilingual AI assistant.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button onClick={scrollToChat} size='lg' className='gap-2'>
              <MessageCircle className='h-4 w-4' />
              Start Chatting Now
            </Button>
            <Button
              onClick={handleGetSupport}
              variant='outline'
              size='lg'
              className='gap-2'
            >
              <Phone className='h-4 w-4' />
              Get Personal Support
            </Button>
          </div>

          {/* Social Proof */}
          <div className='flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span>4.9/5 Rating</span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='h-4 w-4' />
              <span>10,000+ Traders</span>
            </div>
            <div className='flex items-center gap-1'>
              <Globe className='h-4 w-4' />
              <span>3 Languages</span>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div ref={chatRef} className='max-w-4xl mx-auto mb-16'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold mb-2'>Try ForexBot Now</h2>
            <p className='text-muted-foreground'>
              Ask questions in English, Hindi, or Marathi - get instant expert
              answers
            </p>
          </div>
          <ChatInterface />
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          <Card className='p-6 hover:shadow-lg transition-shadow'>
            <CardContent className='p-0'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <BookOpen className='h-5 w-5 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Trading Education</h3>
              </div>
              <p className='text-muted-foreground'>
                Learn Forex basics, advanced strategies, risk management, and
                market analysis through interactive conversations.
              </p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {['Leverage', 'Pips', 'Currency Pairs', 'Risk Management'].map(
                  (tag) => (
                    <Badge key={tag} variant='secondary' className='text-xs'>
                      {tag}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card className='p-6 hover:shadow-lg transition-shadow'>
            <CardContent className='p-0'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <Users className='h-5 w-5 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Onboarding Support</h3>
              </div>
              <p className='text-muted-foreground'>
                Get help with account creation, KYC processes, platform
                navigation, and initial setup guidance.
              </p>
              <div className='mt-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleGetSupport}
                  className='gap-2'
                >
                  <ArrowRight className='h-3 w-3' />
                  Get Help Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className='p-6 hover:shadow-lg transition-shadow'>
            <CardContent className='p-0'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <BarChart3 className='h-5 w-5 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Market Insights</h3>
              </div>
              <p className='text-muted-foreground'>
                Understand market trends, currency pair analysis, economic
                indicators, and trading opportunities.
              </p>
              <div className='mt-4 flex items-center gap-2 text-sm text-muted-foreground'>
                <CheckCircle className='h-4 w-4 text-green-500' />
                <span>Real-time analysis</span>
              </div>
            </CardContent>
          </Card>

          <Card className='p-6 hover:shadow-lg transition-shadow'>
            <CardContent className='p-0'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <Globe className='h-5 w-5 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Multilingual Support</h3>
              </div>
              <p className='text-muted-foreground'>
                Chat in English, Hindi, or Marathi. Our AI adapts to your
                preferred language for better understanding.
              </p>
              <div className='mt-4 flex gap-2'>
                <Badge variant='outline'>🇺🇸 English</Badge>
                <Badge variant='outline'>🇮🇳 हिंदी</Badge>
                <Badge variant='outline'>🇮🇳 मराठी</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className='p-6 hover:shadow-lg transition-shadow'>
            <CardContent className='p-0'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <Shield className='h-5 w-5 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Risk Management</h3>
              </div>
              <p className='text-muted-foreground'>
                Learn about responsible trading, position sizing, stop losses,
                and regulatory compliance.
              </p>
              <div className='mt-4 flex items-center gap-2 text-sm text-green-600'>
                <Shield className='h-4 w-4' />
                <span>Safety First Approach</span>
              </div>
            </CardContent>
          </Card>

          <Card className='p-6 hover:shadow-lg transition-shadow'>
            <CardContent className='p-0'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <MessageCircle className='h-5 w-5 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>24/7 Availability</h3>
              </div>
              <p className='text-muted-foreground'>
                Get instant answers to your trading questions anytime, anywhere.
                No waiting for business hours.
              </p>
              <div className='mt-4 flex items-center gap-2 text-sm text-blue-600'>
                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                <span>Online Now</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className='text-center bg-muted/50 rounded-2xl p-8 mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Ready to Start Trading?</h2>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            Join thousands of traders who are already using AI to accelerate
            their Forex education and trading success. Get personalized guidance
            today!
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button onClick={scrollToChat} size='lg' className='gap-2'>
              <MessageCircle className='h-4 w-4' />
              Start Free Chat
            </Button>
            <Button
              onClick={handleGetSupport}
              variant='outline'
              size='lg'
              className='gap-2'
            >
              <Mail className='h-4 w-4' />
              Get Personal Support
            </Button>
          </div>

          <div className='mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <CheckCircle className='h-4 w-4 text-green-500' />
              <span>Free to use</span>
            </div>
            <div className='flex items-center gap-1'>
              <CheckCircle className='h-4 w-4 text-green-500' />
              <span>No signup required</span>
            </div>
            <div className='flex items-center gap-1'>
              <CheckCircle className='h-4 w-4 text-green-500' />
              <span>Instant responses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='border-t bg-muted/30 py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-6 bg-primary rounded flex items-center justify-center'>
                <TrendingUp className='h-4 w-4 text-primary-foreground' />
              </div>
              <span className='font-semibold'>ForexBot</span>
            </div>
            <p className='text-sm text-muted-foreground text-center'>
              AI-powered Forex education and support. Trade responsibly and
              always consider the risks.
            </p>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <button onClick={handleGetSupport}>Contact</button>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      {showLeadCapture && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <LeadCapture
            language='english'
            onClose={() => setShowLeadCapture(false)}
            onSuccess={() => {
              setShowLeadCapture(false);
              // Could show a success toast here
            }}
            source='homepage'
          />
        </div>
      )}
    </div>
  );
}
