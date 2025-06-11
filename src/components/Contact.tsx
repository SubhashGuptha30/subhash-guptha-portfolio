
import { useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { sendEmail, EmailData } from '@/services/emailService';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const emailData: EmailData = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };
      await sendEmail(emailData);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you soon."
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-gray-300">Ready to work together? Let's discuss your project</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300">subhashguptha308@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300">+91 7306677599</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Linkedin className="w-6 h-6 text-cyan-400" />
                  <a href="https://www.linkedin.com/in/subhash-guptha-b65086290" className="text-gray-300 hover:text-cyan-400 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Github className="w-6 h-6 text-cyan-400" />
                  <a href="https://github.com/SubhashGuptha30" className="text-gray-300 hover:text-cyan-400 transition-colors">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Your Name" 
                  className="bg-gray-900 border-gray-600 text-white placeholder-gray-400" 
                  required 
                  disabled={isSubmitting} 
                />
                <Input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="Your Email" 
                  className="bg-gray-900 border-gray-600 text-white placeholder-gray-400" 
                  required 
                  disabled={isSubmitting} 
                />
                <Input 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleInputChange} 
                  placeholder="Subject" 
                  className="bg-gray-900 border-gray-600 text-white placeholder-gray-400" 
                  required 
                  disabled={isSubmitting} 
                />
                <Textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  placeholder="Tell me about your project..." 
                  rows={5} 
                  className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 resize-none" 
                  required 
                  disabled={isSubmitting} 
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? <>Sending...</> : <>Send Message <ArrowRight className="ml-2 w-4 h-4" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
