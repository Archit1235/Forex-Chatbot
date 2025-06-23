'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  CheckCircle,
  Mail,
  Phone,
  User,
  MessageSquare,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FORM_LABELS = {
  english: {
    title: 'Get Trading Support',
    subtitle: 'Connect with our experts for personalized assistance',
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone (Optional)',
    messageLabel: 'How can we help you?',
    submitButton: 'Get Support',
    successTitle: 'Thank You!',
    successMessage:
      "We'll contact you within 24 hours to help with your trading journey.",
    namePlaceholder: 'Enter your full name',
    emailPlaceholder: 'Enter your email address',
    phonePlaceholder: 'Enter your phone number',
    messagePlaceholder: 'Tell us about your trading goals or questions...',
  },
  hindi: {
    title: 'ट्रेडिंग सहायता प्राप्त करें',
    subtitle: 'व्यक्तिगत सहायता के लिए हमारे विशेषज्ञों से जुड़ें',
    nameLabel: 'पूरा नाम',
    emailLabel: 'ईमेल पता',
    phoneLabel: 'फोन (वैकल्पिक)',
    messageLabel: 'हम आपकी कैसे मदद कर सकते हैं?',
    submitButton: 'सहायता प्राप्त करें',
    successTitle: 'धन्यवाद!',
    successMessage:
      'हम आपकी ट्रेडिंग यात्रा में मदद के लिए 24 घंटों के भीतर आपसे संपर्क करेंगे।',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
    phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
    messagePlaceholder:
      'अपने ट्रेडिंग लक्ष्यों या प्रश्नों के बारे में बताएं...',
  },
  marathi: {
    title: 'ट्रेडिंग सहाय्य मिळवा',
    subtitle: 'वैयक्तिक सहाय्यासाठी आमच्या तज्ञांशी संपर्क साधा',
    nameLabel: 'पूर्ण नाव',
    emailLabel: 'ईमेल पत्ता',
    phoneLabel: 'फोन (ऐच्छिक)',
    messageLabel: 'आम्ही तुमची कशी मदत करू शकतो?',
    submitButton: 'सहाय्य मिळवा',
    successTitle: 'धन्यवाद!',
    successMessage:
      'तुमच्या ट्रेडिंग प्रवासात मदत करण्यासाठी आम्ही 24 तासांत तुमच्याशी संपर्क साधू.',
    namePlaceholder: 'तुमचे पूर्ण नाव टाका',
    emailPlaceholder: 'तुमचा ईमेल पत्ता टाका',
    phonePlaceholder: 'तुमचा फोन नंबर टाका',
    messagePlaceholder:
      'तुमच्या ट्रेडिंग उद्दिष्टे किंवा प्रश्नांबद्दल सांगा...',
  },
};

export function LeadCapture({
  language = 'english',
  onClose,
  onSuccess,
  showClose = true,
  compact = false,
  source = 'lead-form',
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const labels = FORM_LABELS[language] || FORM_LABELS.english;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSuccess(true);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(data);
      }

      // Auto-close after success (optional)
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      setError(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card
        className={cn(
          'w-full max-w-md mx-auto',
          compact && 'border-0 shadow-none'
        )}
      >
        <CardContent className='p-6 text-center'>
          <div className='flex flex-col items-center gap-4'>
            <div className='h-16 w-16 bg-green-100 rounded-full flex items-center justify-center'>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-green-800'>
                {labels.successTitle}
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                {labels.successMessage}
              </p>
            </div>
            {onClose && (
              <Button onClick={onClose} variant='outline' size='sm'>
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'w-full max-w-md mx-auto',
        compact && 'border-0 shadow-none'
      )}
    >
      <CardHeader className={cn('pb-4', compact && 'px-0 pt-0')}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='gap-1'>
              <Mail className='h-3 w-3' />
              Contact
            </Badge>
            {showClose && onClose && (
              <Button
                variant='ghost'
                size='sm'
                onClick={onClose}
                className='h-8 w-8 p-0'
              >
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>{labels.title}</h3>
          <p className='text-sm text-muted-foreground'>{labels.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className={cn('space-y-4', compact && 'px-0 pb-0')}>
        {error && (
          <div className='p-3 text-sm text-destructive bg-destructive/10 rounded-lg'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium flex items-center gap-2'>
              <User className='h-4 w-4' />
              {labels.nameLabel}
            </label>
            <Input
              type='text'
              placeholder={labels.namePlaceholder}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium flex items-center gap-2'>
              <Mail className='h-4 w-4' />
              {labels.emailLabel}
            </label>
            <Input
              type='email'
              placeholder={labels.emailPlaceholder}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium flex items-center gap-2'>
              <Phone className='h-4 w-4' />
              {labels.phoneLabel}
            </label>
            <Input
              type='tel'
              placeholder={labels.phonePlaceholder}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium flex items-center gap-2'>
              <MessageSquare className='h-4 w-4' />
              {labels.messageLabel}
            </label>
            <textarea
              className='w-full min-h-[80px] px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
              placeholder={labels.messagePlaceholder}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button
            type='submit'
            className='w-full gap-2'
            disabled={
              isLoading || !formData.name.trim() || !formData.email.trim()
            }
          >
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Mail className='h-4 w-4' />
            )}
            {labels.submitButton}
          </Button>
        </form>

        <p className='text-xs text-muted-foreground text-center'>
          We respect your privacy and will never share your information.
        </p>
      </CardContent>
    </Card>
  );
}
