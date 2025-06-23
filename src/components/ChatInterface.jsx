'use client';

import { Send, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import {
  WELCOME_MESSAGE,
  SAMPLE_QUESTIONS,
  formatTimestamp,
  generateMessageId,
  validateMessage,
} from '@/lib/chatUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from '@/components/MessageBubble';

export function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = {
      id: generateMessageId(),
      content: WELCOME_MESSAGE,
      isUser: false,
      timestamp: formatTimestamp(),
      isWelcome: true,
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      setIsTyping(false);

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

  const handleSampleQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <Card className='h-full flex flex-col pb-0'>
      <CardContent className='flex-1 flex flex-col p-0 overflow-auto relative'>
        <ScrollArea ref={scrollAreaRef} className='flex-1 px-4 py-2'>
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

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {messages.length === 1 && !isLoading && (
          <div className='absolute bottom-4 left-4 right-4 space-y-3 bg-background/95 backdrop-blur-sm border rounded-lg p-4'>
            <p className='text-sm font-medium text-muted-foreground'>
              Try asking about:
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {SAMPLE_QUESTIONS.english?.slice(0, 4).map((question, index) => (
                <Button
                  key={index}
                  variant='outline'
                  size='sm'
                  onClick={() => handleSampleQuestion(question)}
                  className='text-xs h-auto py-3 px-3 text-left whitespace-normal justify-start'
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <div className='p-4 border-t bg-background flex-shrink-0 w-full'>
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
            className='flex-shrink-0'
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
    </Card>
  );
}
