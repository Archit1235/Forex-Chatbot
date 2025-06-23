'use client';

import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { preprocessMarkdown } from '@/lib/textUtils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
          'flex flex-col gap-2 max-w-[85%] min-w-[200px]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-lg px-4 py-3 text-sm max-w-none',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground border'
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
            <div className='prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-headings:my-3 prose-pre:my-3 prose-code:text-sm prose-blockquote:my-3 overflow-hidden break-words'>
              {isUser ? (
                <div className='whitespace-pre-wrap break-words'>{message}</div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';

                      return inline ? (
                        <code
                          className='bg-muted/70 text-foreground px-1.5 py-0.5 rounded text-xs font-mono border'
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <div className='my-3'>
                          {language && (
                            <div className='text-xs text-muted-foreground mb-1 font-medium'>
                              {language}
                            </div>
                          )}
                          <pre className='bg-muted/50 border rounded-md p-3 overflow-x-auto'>
                            <code
                              className={`text-sm font-mono ${className || ''}`}
                              {...props}
                            >
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    pre({ children, ...props }) {
                      return (
                        <pre
                          className='bg-muted/50 border rounded-md p-3 overflow-x-auto my-3'
                          {...props}
                        >
                          {children}
                        </pre>
                      );
                    },
                    a({ children, href, ...props }) {
                      return (
                        <a
                          href={href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-primary underline hover:text-primary/80 font-medium'
                          {...props}
                        >
                          {children}
                        </a>
                      );
                    },
                    blockquote({ children, ...props }) {
                      return (
                        <blockquote
                          className='border-l-4 border-primary/30 pl-4 py-2 my-3 bg-muted/30 rounded-r italic'
                          {...props}
                        >
                          {children}
                        </blockquote>
                      );
                    },
                    ul({ children, ...props }) {
                      return (
                        <ul
                          className='list-disc list-inside space-y-1 my-2 ml-2'
                          {...props}
                        >
                          {children}
                        </ul>
                      );
                    },
                    ol({ children, ...props }) {
                      return (
                        <ol
                          className='list-decimal list-inside space-y-1 my-2 ml-2'
                          {...props}
                        >
                          {children}
                        </ol>
                      );
                    },
                    li({ children, ...props }) {
                      return (
                        <li className='text-sm leading-relaxed' {...props}>
                          {children}
                        </li>
                      );
                    },
                    h1({ children, ...props }) {
                      return (
                        <h1
                          className='text-lg font-bold mb-3 mt-4 text-foreground border-b border-border pb-1'
                          {...props}
                        >
                          {children}
                        </h1>
                      );
                    },
                    h2({ children, ...props }) {
                      return (
                        <h2
                          className='text-base font-semibold mb-2 mt-3 text-foreground'
                          {...props}
                        >
                          {children}
                        </h2>
                      );
                    },
                    h3({ children, ...props }) {
                      return (
                        <h3
                          className='text-sm font-medium mb-2 mt-3 text-foreground'
                          {...props}
                        >
                          {children}
                        </h3>
                      );
                    },
                    h4({ children, ...props }) {
                      return (
                        <h4
                          className='text-sm font-medium mb-1 mt-2 text-muted-foreground'
                          {...props}
                        >
                          {children}
                        </h4>
                      );
                    },
                    h5({ children, ...props }) {
                      return (
                        <h5
                          className='text-xs font-medium mb-1 mt-2 text-muted-foreground'
                          {...props}
                        >
                          {children}
                        </h5>
                      );
                    },
                    h6({ children, ...props }) {
                      return (
                        <h6
                          className='text-xs font-normal mb-1 mt-2 text-muted-foreground'
                          {...props}
                        >
                          {children}
                        </h6>
                      );
                    },
                    p({ children, ...props }) {
                      return (
                        <p className='text-sm leading-relaxed my-2' {...props}>
                          {children}
                        </p>
                      );
                    },
                    table({ children, ...props }) {
                      return (
                        <div className='overflow-x-auto my-3'>
                          <table
                            className='min-w-full border border-border rounded-md text-sm'
                            {...props}
                          >
                            {children}
                          </table>
                        </div>
                      );
                    },
                    thead({ children, ...props }) {
                      return (
                        <thead className='bg-muted/50' {...props}>
                          {children}
                        </thead>
                      );
                    },
                    th({ children, ...props }) {
                      return (
                        <th
                          className='border border-border px-3 py-2 text-left font-medium'
                          {...props}
                        >
                          {children}
                        </th>
                      );
                    },
                    td({ children, ...props }) {
                      return (
                        <td
                          className='border border-border px-3 py-2'
                          {...props}
                        >
                          {children}
                        </td>
                      );
                    },
                    hr({ ...props }) {
                      return <hr className='my-4 border-border' {...props} />;
                    },
                    strong({ children, ...props }) {
                      return (
                        <strong
                          className='font-semibold text-foreground'
                          {...props}
                        >
                          {children}
                        </strong>
                      );
                    },
                    em({ children, ...props }) {
                      return (
                        <em className='italic text-foreground' {...props}>
                          {children}
                        </em>
                      );
                    },
                  }}
                >
                  {preprocessMarkdown(message)}
                </ReactMarkdown>
              )}
            </div>
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
