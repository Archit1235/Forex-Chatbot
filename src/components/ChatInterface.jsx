'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MessageBubble } from '@/components/MessageBubble';
import { Send, Languages, Loader2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SAMPLE_QUESTIONS,
  formatTimestamp,
  generateMessageId,
  validateMessage,
} from '@/lib/chatUtils';

const LANGUAGES = {
  english: { label: 'English', flag: '🇺🇸' },
  hindi: { label: 'हिंदी', flag: '🇮🇳' },
  marathi: { label: 'मराठी', flag: '🇮🇳' },
};

const WELCOME_MESSAGES = {
  english:
    "Hello! I'm your Forex trading assistant. I'm here to help you with trading concepts, account setup, market analysis, and answer any questions you have about Forex trading. How can I assist you today?",
  hindi:
    'नमस्ते! मैं आपका फॉरेक्स ट्रेडिंग सहायक हूं। मैं यहां ट्रेडिंग कॉन्सेप्ट्स, अकाउंट सेटअप, मार्केट एनालिसिस के साथ आपकी मदद करने और फॉरेक्स ट्रेडिंग के बारे में आपके किसी भी प्रश्न का उत्तर देने के लिए हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?',
  marathi:
    'नमस्कार! मी तुमचा फॉरेक्स ट्रेडिंग सहायक आहे। मी येथे ट्रेडिंग संकल्पना, खाते सेटअप, बाजार विश्लेषण यासह तुमची मदत करण्यासाठी आणि फॉरेक्स ट्रेडिंगबद्दल तुमच्या कोणत्याही प्रश्नांची उत्तरे देण्यासाठी आहे। आज मी तुमची कशी मदत करू शकतो?',
};

export function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: generateMessageId(),
      content: WELCOME_MESSAGES[language],
      isUser: false,
      timestamp: formatTimestamp(),
      isWelcome: true,
    };
    setMessages([welcomeMessage]);
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setError(null);

    const validation = validateMessage(input);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    if (isLoading) return;

    const userMessage = {
      id: generateMessageId(),
      content: validation.content,
      isUser: true,
      timestamp: formatTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages.filter((m) => !m.isWelcome), userMessage].map(
            (m) => ({
              role: m.isUser ? 'user' : 'assistant',
              content: m.content,
            })
          ),
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      setIsTyping(false);

      // Add bot message placeholder
      const botMessageId = generateMessageId();
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          content: '',
          isUser: false,
          timestamp: formatTimestamp(),
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                accumulatedContent += data.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botMessageId
                      ? { ...m, content: accumulatedContent }
                      : m
                  )
                );
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send message. Please try again.');
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          content: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          timestamp: formatTimestamp(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setMessages([]);
    setError(null);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    // Re-initialize with welcome message
    setTimeout(() => {
      const welcomeMessage = {
        id: generateMessageId(),
        content: WELCOME_MESSAGES[language],
        isUser: false,
        timestamp: formatTimestamp(),
        isWelcome: true,
      };
      setMessages([welcomeMessage]);
    }, 100);
  };

  const handleSampleQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <Card className='h-[600px] flex flex-col'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <div className='flex items-center gap-2'>
          <div className='h-8 w-8 bg-primary rounded-full flex items-center justify-center'>
            <span className='text-primary-foreground text-sm font-semibold'>
              FX
            </span>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Forex Assistant</h3>
            <p className='text-sm text-muted-foreground'>
              Your AI trading companion
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={clearChat}
            className='gap-2'
            disabled={isLoading}
          >
            <RotateCcw className='h-4 w-4' />
            Clear
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='gap-2'>
                <Languages className='h-4 w-4' />
                {LANGUAGES[language].flag} {LANGUAGES[language].label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {Object.entries(LANGUAGES).map(([key, { label, flag }]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleLanguageChange(key)}
                  className={cn('gap-2', language === key && 'bg-accent')}
                >
                  {flag} {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className='flex-1 flex flex-col p-0'>
        <ScrollArea ref={scrollAreaRef} className='flex-1 px-4'>
          <div className='space-y-4 pb-4'>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && (
              <MessageBubble message='' isUser={false} isTyping={true} />
            )}

            {/* Sample Questions */}
            {messages.length === 1 && !isLoading && (
              <div className='px-4 py-6 space-y-3'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Try asking about:
                </p>
                <div className='flex flex-wrap gap-2'>
                  {SAMPLE_QUESTIONS[language]
                    ?.slice(0, 4)
                    .map((question, index) => (
                      <Button
                        key={index}
                        variant='outline'
                        size='sm'
                        onClick={() => handleSampleQuestion(question)}
                        className='text-xs h-auto py-2 px-3 text-left'
                      >
                        {question}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className='p-4 border-t'>
          {error && (
            <div className='mb-2 p-2 text-sm text-destructive bg-destructive/10 rounded'>
              {error}
            </div>
          )}

          <form onSubmit={sendMessage} className='flex gap-2'>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Ask me about Forex trading, account setup, or market analysis...'
              disabled={isLoading}
              className='flex-1'
              maxLength={2000}
            />
            <Button
              type='submit'
              size='icon'
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Send className='h-4 w-4' />
              )}
            </Button>
          </form>

          <div className='mt-2 text-xs text-muted-foreground text-center'>
            Powered by AI • Always verify trading advice with financial
            professionals
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
