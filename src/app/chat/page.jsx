import Link from 'next/link';
import { TrendingUp, MessageCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ChatInterface } from '@/components/ChatInterface';

export default function ChatPage() {
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
          <Badge variant='secondary' className='gap-1'>
            <MessageCircle className='h-3 w-3' />
            AI Assistant
          </Badge>
        </div>
      </nav>

      <div className='container mx-auto p-4 h-[calc(100vh-5rem)]'>
        <ChatInterface />
      </div>
    </div>
  );
}
