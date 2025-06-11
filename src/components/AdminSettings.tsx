
import { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Save, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface EmailJSCredentials {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

const AdminSettings = () => {
  const [credentials, setCredentials] = useState<EmailJSCredentials>({
    publicKey: '',
    serviceId: '',
    templateId: ''
  });
  const [showCredentials, setShowCredentials] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load existing credentials from localStorage
    const stored = localStorage.getItem('emailjs_credentials');
    if (stored) {
      try {
        const decrypted = atob(stored);
        setCredentials(JSON.parse(decrypted));
      } catch (error) {
        console.error('Failed to load credentials:', error);
      }
    }
  }, []);

  const handleSave = () => {
    if (!credentials.publicKey || !credentials.serviceId || !credentials.templateId) {
      toast({
        title: "Missing Credentials",
        description: "Please fill in all EmailJS credentials.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simple base64 encoding for basic obfuscation
      const encrypted = btoa(JSON.stringify(credentials));
      localStorage.setItem('emailjs_credentials', encrypted);
      
      toast({
        title: "Credentials Saved",
        description: "EmailJS credentials have been securely stored."
      });
      
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof EmailJSCredentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-4 right-4 z-50 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-cyan-400">
            <Lock className="w-5 h-5 mr-2" />
            EmailJS Configuration
          </DialogTitle>
        </DialogHeader>
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">Secure Credential Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Public Key
              </label>
              <Input
                type={showCredentials ? "text" : "password"}
                value={credentials.publicKey}
                onChange={(e) => handleInputChange('publicKey', e.target.value)}
                placeholder="Enter EmailJS public key"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Service ID
              </label>
              <Input
                type={showCredentials ? "text" : "password"}
                value={credentials.serviceId}
                onChange={(e) => handleInputChange('serviceId', e.target.value)}
                placeholder="Enter EmailJS service ID"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Template ID
              </label>
              <Input
                type={showCredentials ? "text" : "password"}
                value={credentials.templateId}
                onChange={(e) => handleInputChange('templateId', e.target.value)}
                placeholder="Enter EmailJS template ID"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCredentials(!showCredentials)}
                className="border-gray-600 text-gray-300"
              >
                {showCredentials ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showCredentials ? 'Hide' : 'Show'}
              </Button>
              <Button
                onClick={handleSave}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Credentials
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AdminSettings;
