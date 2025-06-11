
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skills } from '@/data/skills';

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Skills</h2>
          <p className="text-xl text-gray-300">What I can do for you</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((service, index) => (
            <Card 
              key={index} 
              className="bg-gray-900 border-gray-700 text-center group hover:border-cyan-400 transition-all duration-300"
            >
              <CardHeader>
                <div className="text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-cyan-400">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
