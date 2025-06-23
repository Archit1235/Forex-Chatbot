'use client';

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
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted'>
      <nav className='border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='h-8 w-8 bg-primary rounded-lg flex items-center justify-center'>
              <TrendingUp className='h-5 w-5 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold'>ForexBot</span>
          </Link>
          <div className='flex items-center gap-4'>
            <Badge variant='secondary' className='gap-1 h-8'>
              <Zap className='h-3 w-3' />
              AI Powered
            </Badge>
            <Link href='/chat'>
              <Button size='sm' className='gap-2'>
                <MessageCircle className='h-4 w-4' />
                Start Chat
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className='container mx-auto px-4 py-12'>
        <div className='text-center mb-16'>
          <Badge variant='outline' className='mb-4'>
            🤖 Advanced AI Assistant
          </Badge>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight mb-6'>
            Learn Forex Trading with
            <span className='text-primary'> AI-Powered Guidance</span>
          </h1>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Get instant, expert answers about Forex trading concepts,
            strategies, and market analysis. Our AI assistant provides
            personalized guidance in multiple languages to accelerate your
            trading journey.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/chat'>
              <Button size='lg' className='gap-2'>
                <MessageCircle className='h-4 w-4' />
                Start Learning Now
              </Button>
            </Link>
            <Link href='/chat'>
              <Button variant='outline' size='lg' className='gap-2'>
                <BookOpen className='h-4 w-4' />
                Ask Questions
              </Button>
            </Link>
          </div>

          <div className='flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span>AI-Powered</span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='h-4 w-4' />
              <span>Expert Knowledge</span>
            </div>
            <div className='flex items-center gap-1'>
              <Globe className='h-4 w-4' />
              <span>Global Languages</span>
            </div>
          </div>
        </div>

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
                Master Forex fundamentals through interactive conversations.
                Learn about leverage, pips, currency pairs, and trading
                strategies with personalized AI guidance.
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
                Get step-by-step guidance for account setup, KYC documentation,
                platform navigation, and regulatory compliance. Start your
                trading journey with confidence.
              </p>
              <div className='mt-4'>
                <Link href='/chat'>
                  <Button variant='outline' size='sm' className='gap-2'>
                    <ArrowRight className='h-3 w-3' />
                    Get Started
                  </Button>
                </Link>
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
                Receive real-time market analysis, understand currency pair
                movements, economic indicators, and identify trading
                opportunities with AI-powered insights.
              </p>
              <div className='mt-4 flex items-center gap-2 text-sm text-muted-foreground'>
                <CheckCircle className='h-4 w-4 text-green-500' />
                <span>Real-time insights</span>
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
                Communicate naturally in your preferred language. Our advanced
                AI automatically detects and responds in dozens of languages,
                providing expert Forex guidance tailored to your region and
                market.
              </p>
              <div className='mt-4 flex gap-2'>
                <Badge variant='outline'>🇺🇸 English</Badge>
                <Badge variant='outline'>🇮🇳 हिंदी</Badge>
                <Badge variant='outline'>+ Many More</Badge>
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
                Master position sizing, stop-loss strategies, and risk-reward
                ratios. Learn regulatory compliance and develop a disciplined
                approach to protect your capital.
              </p>
              <div className='mt-4 flex items-center gap-2 text-sm text-green-600'>
                <Shield className='h-4 w-4' />
                <span>Safety-First Approach</span>
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
                Access expert trading knowledge 24/7. Get instant, accurate
                answers to your questions without waiting for market hours or
                human consultants.
              </p>
              <div className='mt-4 flex items-center gap-2 text-sm text-blue-600'>
                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                <span>Always Available</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='text-center bg-muted/50 rounded-2xl p-8 mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            Ready to Accelerate Your Trading Knowledge?
          </h2>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            Join traders worldwide who are using AI to master Forex concepts
            faster. Get personalized guidance, learn at your own pace, and build
            confidence with expert knowledge at your fingertips.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/chat'>
              <Button size='lg' className='gap-2'>
                <MessageCircle className='h-4 w-4' />
                Start Learning
              </Button>
            </Link>
            <Link href='/chat'>
              <Button variant='outline' size='lg' className='gap-2'>
                <ArrowRight className='h-4 w-4' />
                Ask Your First Question
              </Button>
            </Link>
          </div>

          <div className='mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <CheckCircle className='h-4 w-4 text-green-500' />
              <span>100% Free</span>
            </div>
            <div className='flex items-center gap-1'>
              <CheckCircle className='h-4 w-4 text-green-500' />
              <span>No Registration</span>
            </div>
            <div className='flex items-center gap-1'>
              <CheckCircle className='h-4 w-4 text-green-500' />
              <span>Instant Expert Answers</span>
            </div>
          </div>
        </div>
      </div>

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
              AI-powered Forex education platform. Learn responsibly and always
              consider the risks involved in trading.
            </p>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <span>About</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
