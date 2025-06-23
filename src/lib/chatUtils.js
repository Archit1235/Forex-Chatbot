/** * Utility functions for chat application
 * This module provides functions to handle chat messages, format timestamps,
 * generate unique IDs, and validate message content.
 * It also includes a welcome message and sample Forex-related questions.
 */
export const WELCOME_MESSAGE =
  "Hello! I'm your AI Forex trading assistant. I can help you with trading concepts, account setup, market analysis, and answer any questions about Forex trading in multiple languages. How can I assist you today?";

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
