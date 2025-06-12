
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  publicKey: 'HTfxSez-In11AyFnE',
  serviceId: 'service_sffvogp',
  templateId: 'template_njf4x8n'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export interface EmailData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (formData: EmailData): Promise<void> => {
  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
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
    throw new Error('Failed to send email. Please try again');
  }
};
