
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projects } from '@/data/projects';

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Works</h2>
          <p className="text-xl text-gray-300">Projects that showcase my passion for AI and development</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const CardComponent = () => (
              <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    {project.title}
                    {project.link && <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </CardTitle>
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );

            return project.link ? (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
                aria-label={`View ${project.title} on GitHub`}
              >
                <CardComponent />
              </a>
            ) : (
              <div key={index}>
                <CardComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
