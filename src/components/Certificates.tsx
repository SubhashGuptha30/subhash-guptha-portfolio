
import { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { certificates } from '@/data/certificates';

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleCertificateClick = (certificate: typeof certificates[0]) => {
    setSelectedCertificate(certificate);
    setZoomLevel(1);
  };

  const handleClose = () => {
    setSelectedCertificate(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <section id="certificates" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Certificates</h2>
          <p className="text-xl text-gray-300">My professional certifications and achievements</p>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex space-x-6 min-w-max">
            {certificates.map((certificate) => (
              <Card 
                key={certificate.id}
                className="bg-gray-800 border-gray-700 cursor-pointer hover:scale-105 transition-all duration-300 flex-shrink-0 w-80"
                onClick={() => handleCertificateClick(certificate)}
              >
                <CardHeader className="p-0">
                  <img 
                    src={certificate.image} 
                    alt={certificate.title}
                    className="w-full h-48 object-cover rounded-t-lg hover:brightness-110 transition-all duration-300"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-cyan-400 text-lg">{certificate.title}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedCertificate} onOpenChange={() => handleClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-gray-900 border-gray-700">
          <div className="relative w-full h-full">
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                className="bg-gray-800 border-gray-600 hover:bg-gray-700"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                className="bg-gray-800 border-gray-600 hover:bg-gray-700"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleClose}
                className="bg-gray-800 border-gray-600 hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="overflow-auto max-h-[90vh] p-4">
              {selectedCertificate && (
                <div className="flex justify-center">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    className="max-w-full h-auto transition-transform duration-300"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>
              )}
            </div>
            
            {selectedCertificate && (
              <div className="absolute bottom-4 left-4 bg-gray-800/90 text-white px-4 py-2 rounded-lg">
                <h3 className="text-lg font-semibold">{selectedCertificate.title}</h3>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certificates;
