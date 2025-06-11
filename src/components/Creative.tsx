
import { ExternalLink } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { creativeWorks } from '@/data/creativeWorks';

const Creative = () => {
  return (
    <section id="creative" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Creative Gallery</h2>
          <p className="text-xl text-gray-300">
            A glimpse into my creative side out of the office
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creativeWorks.map((work, index) => {
            const CardComponent = () => (
              <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {work.type}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    {work.title}
                    {work.link && <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {work.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );

            return work.link ? (
              <a
                key={index}
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
                aria-label={`View ${work.title}`}
              >
                <CardComponent />
              </a>
            ) : (
              <div 
                key={index}
                onClick={() => {
                  console.log(`Clicked on ${work.title} - link will be added later`);
                }}
              >
                <CardComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Creative;
