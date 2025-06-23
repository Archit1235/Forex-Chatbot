import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Home, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center'>
      <div className='container mx-auto px-4 text-center'>
        <Card className='max-w-md mx-auto'>
          <CardContent className='p-8'>
            <div className='h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
              <TrendingUp className='h-8 w-8 text-primary' />
            </div>

            <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
            <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
            <p className='text-muted-foreground mb-8'>
              The page you're looking for doesn't exist. But our Forex trading
              assistant is always here to help!
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/'>
                <Button className='gap-2 w-full sm:w-auto'>
                  <Home className='h-4 w-4' />
                  Go Home
                </Button>
              </Link>
              <Link href='/chat'>
                <Button variant='outline' className='gap-2 w-full sm:w-auto'>
                  <MessageCircle className='h-4 w-4' />
                  Start Chatting
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
