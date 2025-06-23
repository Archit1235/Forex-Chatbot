'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

export function MessageBubble({
  message,
  isUser,
  timestamp,
  isTyping = false,
}) {
  return (
    <div
      className={cn('flex gap-3 p-4', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      <Avatar className='h-8 w-8 shrink-0'>
        <AvatarFallback
          className={cn(
            'text-xs',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {isUser ? <User className='h-4 w-4' /> : <Bot className='h-4 w-4' />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          'flex flex-col gap-2 max-w-[80%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-lg px-4 py-2 text-sm',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          )}
        >
          {isTyping ? (
            <div className='flex items-center gap-1'>
              <div className='flex gap-1'>
                <div className='w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]' />
                <div className='w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]' />
                <div className='w-2 h-2 bg-current rounded-full animate-bounce' />
              </div>
            </div>
          ) : (
            <div className='whitespace-pre-wrap break-words'>{message}</div>
          )}
        </div>

        {timestamp && !isTyping && (
          <Badge variant='secondary' className='text-xs'>
            {timestamp}
          </Badge>
        )}
      </div>
    </div>
  );
}
