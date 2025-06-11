
import emailjs from '@emailjs/browser';

export interface EmailData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface EmailJSCredentials {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

// Rate limiting configuration
const RATE_LIMIT = {
  maxEmails: 3,
  timeWindow: 60000, // 1 minute
  storageKey: 'email_rate_limit'
};

interface RateLimitData {
  count: number;
  resetTime: number;
}

const getRateLimitData = (): RateLimitData => {
  const stored = localStorage.getItem(RATE_LIMIT.storageKey);
  if (!stored) {
    return { count: 0, resetTime: Date.now() + RATE_LIMIT.timeWindow };
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return { count: 0, resetTime: Date.now() + RATE_LIMIT.timeWindow };
  }
};

const updateRateLimitData = (data: RateLimitData): void => {
  localStorage.setItem(RATE_LIMIT.storageKey, JSON.stringify(data));
};

const checkRateLimit = (): boolean => {
  const now = Date.now();
  let rateLimitData = getRateLimitData();
  
  // Reset if time window has passed
  if (now > rateLimitData.resetTime) {
    rateLimitData = { count: 0, resetTime: now + RATE_LIMIT.timeWindow };
  }
  
  // Check if limit exceeded
  if (rateLimitData.count >= RATE_LIMIT.maxEmails) {
    return false;
  }
  
  // Increment count and update storage
  rateLimitData.count++;
  updateRateLimitData(rateLimitData);
  
  return true;
};

const getStoredCredentials = (): EmailJSCredentials | null => {
  const stored = localStorage.getItem('emailjs_credentials');
  if (!stored) {
    return null;
  }
  
  try {
    const decrypted = atob(stored);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Failed to decrypt credentials:', error);
    return null;
  }
};

export const isEmailConfigured = (): boolean => {
  const credentials = getStoredCredentials();
  return !!(credentials?.publicKey && credentials?.serviceId && credentials?.templateId);
};

export const sendEmail = async (formData: EmailData): Promise<void> => {
  // Check rate limiting
  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded. Please wait before sending another email.');
  }

  // Get credentials from localStorage
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error('EmailJS credentials not configured. Please configure them in the admin settings.');
  }

  // Validate credentials
  if (!credentials.publicKey || !credentials.serviceId || !credentials.templateId) {
    throw new Error('Incomplete EmailJS credentials. Please check the admin settings.');
  }

  try {
    // Initialize EmailJS with stored credentials
    emailjs.init(credentials.publicKey);

    await emailjs.send(
      credentials.serviceId,
      credentials.templateId,
      {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'subhashguptha308@gmail.com'
      }
    );
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to send email. Please try again or contact me directly.');
  }
};
