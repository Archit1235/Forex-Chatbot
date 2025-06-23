'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { LeadCapture } from '@/components/LeadCapture';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  TrendingUp,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Phone,
  FileText,
  Shield,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const QUICK_TOPICS = {
  english: [
    {
      icon: BookOpen,
      title: 'Trading Basics',
      description: 'Learn about pips, leverage, and currency pairs',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Understand position sizing and stop losses',
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'Technical and fundamental analysis methods',
    },
    {
      icon: FileText,
      title: 'Account Setup',
      description: 'KYC, verification, and platform guidance',
    },
    {
      icon: Globe,
      title: 'Regulations',
      description: 'Trading laws and compliance information',
    },
    {
      icon: Phone,
      title: 'Get Support',
      description: 'Talk to our trading experts directly',
    },
  ],
  hindi: [
    {
      icon: BookOpen,
      title: 'ट्रेडिंग बेसिक्स',
      description: 'पिप्स, लीवरेज और करेंसी पेयर्स के बारे में जानें',
    },
    {
      icon: Shield,
      title: 'रिस्क मैनेजमेंट',
      description: 'पोजीशन साइजिंग और स्टॉप लॉस को समझें',
    },
    {
      icon: TrendingUp,
      title: 'मार्केट एनालिसिस',
      description: 'तकनीकी और मौलिक विश्लेषण विधियां',
    },
    {
      icon: FileText,
      title: 'अकाउंट सेटअप',
      description: 'KYC, वेरिफिकेशन और प्लेटफॉर्म गाइडेंस',
    },
    {
      icon: Globe,
      title: 'नियम',
      description: 'ट्रेडिंग कानून और अनुपालन जानकारी',
    },
    {
      icon: Phone,
      title: 'सहायता प्राप्त करें',
      description: 'हमारे ट्रेडिंग विशेषज्ञों से सीधे बात करें',
    },
  ],
  marathi: [
    {
      icon: BookOpen,
      title: 'ट्रेडिंग मूलभूत',
      description: 'पिप्स, लीव्हरेज आणि चलन जोड्यांबद्दल जाणून घ्या',
    },
    {
      icon: Shield,
      title: 'जोखीम व्यवस्थापन',
      description: 'पोझिशन साइझिंग आणि स्टॉप लॉस समजून घ्या',
    },
    {
      icon: TrendingUp,
      title: 'बाजार विश्लेषण',
      description: 'तांत्रिक आणि मूलभूत विश्लेषण पद्धती',
    },
    {
      icon: FileText,
      title: 'खाते सेटअप',
      description: 'KYC, पडताळणी आणि प्लॅटफॉर्म मार्गदर्शन',
    },
    {
      icon: Globe,
      title: 'नियम',
      description: 'ट्रेडिंग कायदे आणि अनुपालन माहिती',
    },
    {
      icon: Phone,
      title: 'सहाय्य मिळवा',
      description: 'आमच्या ट्रेडिंग तज्ञांशी थेट बोला',
    },
  ],
};

export default function ChatPage() {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [language, setLanguage] = useState('english');

  const topics = QUICK_TOPICS[language] || QUICK_TOPICS.english;

  const handleTopicClick = (topicTitle) => {
    // This would typically trigger a message in the chat
    console.log('Topic clicked:', topicTitle);
  };

  const handleContactClick = () => {
    setShowLeadCapture(true);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted'>
      {/* Navigation */}
      <nav className='border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link href='/'>
              <Button variant='ghost' size='sm' className='gap-2'>
                <ArrowLeft className='h-4 w-4' />
                Back
              </Button>
            </Link>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 bg-primary rounded-lg flex items-center justify-center'>
                <TrendingUp className='h-5 w-5 text-primary-foreground' />
              </div>
              <span className='text-xl font-bold'>ForexBot Chat</span>
            </div>
          </div>

          <Badge variant='secondary' className='gap-1'>
            <MessageCircle className='h-3 w-3' />
            AI Powered
          </Badge>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
          {/* Sidebar */}
          <div className='lg:col-span-1 space-y-6'>
            <Card>
              <CardContent className='p-4'>
                <h3 className='font-semibold mb-3 flex items-center gap-2'>
                  <HelpCircle className='h-4 w-4' />
                  Quick Topics
                </h3>
                <div className='space-y-2'>
                  {topics.map((topic, index) => (
                    <Button
                      key={index}
                      variant='ghost'
                      size='sm'
                      className={cn(
                        'w-full justify-start text-left h-auto p-3',
                        index === topics.length - 1 && 'border-t pt-3 mt-3'
                      )}
                      onClick={
                        index === topics.length - 1
                          ? handleContactClick
                          : () => handleTopicClick(topic.title)
                      }
                    >
                      <div className='flex items-start gap-3'>
                        <topic.icon className='h-4 w-4 mt-0.5 shrink-0' />
                        <div className='text-left'>
                          <div className='font-medium text-sm'>
                            {topic.title}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {topic.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trading Tips */}
            <Card>
              <CardContent className='p-4'>
                <h3 className='font-semibold mb-3'>💡 Pro Tips</h3>
                <div className='space-y-3 text-sm text-muted-foreground'>
                  <div className='border-l-2 border-primary pl-3'>
                    <p>Always use stop losses to manage risk</p>
                  </div>
                  <div className='border-l-2 border-primary pl-3'>
                    <p>Never risk more than 1-2% per trade</p>
                  </div>
                  <div className='border-l-2 border-primary pl-3'>
                    <p>Keep a trading journal for improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className='lg:col-span-3'>
            <div className='mb-6 text-center lg:text-left'>
              <h1 className='text-3xl font-bold mb-2'>Chat with ForexBot</h1>
              <p className='text-muted-foreground'>
                Get instant answers about Forex trading, market analysis, and
                account setup
              </p>
            </div>

            <div className='h-[calc(100vh-250px)] min-h-[600px]'>
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showLeadCapture && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <LeadCapture
            language={language}
            onClose={() => setShowLeadCapture(false)}
            onSuccess={() => {
              setShowLeadCapture(false);
              // Could trigger a success notification here
            }}
            source='chat-page'
          />
        </div>
      )}
    </div>
  );
}
