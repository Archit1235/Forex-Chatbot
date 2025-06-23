// Utility functions for OpenAI integration and chat management

/**
 * Sample Forex-related questions for testing
 */
export const SAMPLE_QUESTIONS = {
  english: [
    'What is leverage in Forex trading?',
    'How do I create a trading account?',
    'What are pips and how are they calculated?',
    'What is the difference between a bull and bear market?',
    'How can I manage risk in Forex trading?',
    'What are the major currency pairs?',
    'How does the spread work in Forex?',
    'What is margin in Forex trading?',
  ],
  hindi: [
    'फॉरेक्स ट्रेडिंग में लीवरेज क्या है?',
    'मैं ट्रेडिंग अकाउंट कैसे बना सकता हूं?',
    'पिप्स क्या हैं और इनकी गणना कैसे की जाती है?',
    'बुल और बियर मार्केट में क्या अंतर है?',
    'फॉरेक्स ट्रेडिंग में जोखिम कैसे प्रबंधित करें?',
    'प्रमुख करेंसी पेयर्स कौन से हैं?',
    'फॉरेक्स में स्प्रेड कैसे काम करता है?',
    'फॉरेक्स ट्रेडिंग में मार्जिन क्या है?',
  ],
  marathi: [
    'फॉरेक्स ट्रेडिंगमध्ये लीव्हरेज म्हणजे काय?',
    'मी ट्रेडिंग खाते कसे तयार करू शकतो?',
    'पिप्स काय आहेत आणि त्यांची गणना कशी केली जाते?',
    'बुल आणि बिअर मार्केटमध्ये काय फरक आहे?',
    'फॉरेक्स ट्रेडिंगमध्ये जोखीम कसे व्यवस्थापित करावे?',
    'प्रमुख चलन जोड्या कोणत्या आहेत?',
    'फॉरेक्समध्ये स्प्रेड कसे कार्य करते?',
    'फॉरेक्स ट्रेडिंगमध्ये मार्जिन म्हणजे काय?',
  ],
};

/**
 * Forex trading topics for context
 */
export const FOREX_TOPICS = {
  basics: [
    'Currency pairs',
    'Pips and spreads',
    'Leverage and margin',
    'Buy/sell orders',
    'Market hours',
    'Base and quote currency',
  ],
  analysis: [
    'Technical analysis',
    'Fundamental analysis',
    'Chart patterns',
    'Economic indicators',
    'Support and resistance',
    'Trend analysis',
  ],
  riskManagement: [
    'Position sizing',
    'Stop loss orders',
    'Take profit orders',
    'Risk-reward ratio',
    'Portfolio diversification',
    'Money management',
  ],
  trading: [
    'Order types',
    'Trading strategies',
    'Market psychology',
    'Trading platforms',
    'Demo trading',
    'Live trading',
  ],
};

/**
 * Format timestamp for chat messages
 */
export function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Generate a unique ID for messages
 */
export function generateMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate message content
 */
export function validateMessage(content) {
  if (!content || typeof content !== 'string') {
    return { isValid: false, error: 'Message content is required' };
  }

  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (trimmed.length > 2000) {
    return {
      isValid: false,
      error: 'Message is too long (max 2000 characters)',
    };
  }

  return { isValid: true, content: trimmed };
}

/**
 * Check if content might be spam or inappropriate
 */
export function isAppropriateContent(content) {
  const inappropriate = [
    'spam',
    'scam',
    'hack',
    'cheat',
    'fraud',
    // Add more inappropriate terms as needed
  ];

  const lowerContent = content.toLowerCase();
  return !inappropriate.some((term) => lowerContent.includes(term));
}

/**
 * Extract potential lead information from message
 */
export function extractLeadInfo(message) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const phoneRegex =
    /\b(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;

  const emails = message.match(emailRegex) || [];
  const phones = message.match(phoneRegex) || [];

  return {
    hasContact: emails.length > 0 || phones.length > 0,
    emails,
    phones,
  };
}

/**
 * Determine if user might be interested in advanced services
 */
export function detectInterest(message) {
  const interestKeywords = [
    'open account',
    'create account',
    'sign up',
    'register',
    'demo account',
    'live account',
    'deposit',
    'funding',
    'learn more',
    'course',
    'training',
    'education',
    'strategy',
    'signals',
    'analysis',
    'consultation',
  ];

  const lowerMessage = message.toLowerCase();
  return interestKeywords.some((keyword) => lowerMessage.includes(keyword));
}

/**
 * Rate limit configuration
 */
export const RATE_LIMITS = {
  maxMessagesPerMinute: 20,
  maxMessagesPerHour: 100,
  maxMessageLength: 2000,
};

/**
 * Default system context for different scenarios
 */
export const SYSTEM_CONTEXTS = {
  beginner:
    'Focus on basic concepts and simple explanations. Use analogies and examples.',
  intermediate:
    'Provide detailed explanations with practical applications and strategies.',
  advanced:
    'Discuss complex strategies, market analysis, and professional trading concepts.',
  support:
    'Focus on helping with technical issues, account problems, and platform guidance.',
};
