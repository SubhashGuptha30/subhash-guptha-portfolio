
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-gray-300">Passionate about AI and emerging technologies</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyan-400">My Journey</h3>
            <p className="text-gray-300 leading-relaxed">
              Currently pursuing B.Tech in Artificial Intelligence (2023-2027) at Amrita Vishwa Vidyapeetham, 
              I'm passionate about leveraging cutting-edge technology to solve real-world problems. My journey 
              in tech started with curiosity about how intelligent systems work, and has evolved into a deep 
              commitment to developing innovative AI solutions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Beyond academics, I enjoy exploring creative hobbies like writing and photo design, which help 
              me bring a unique perspective to my technical work. I'm always eager to learn emerging technologies 
              and develop skills that align with modern industry trends.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyan-400">Education & Skills</h3>
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">B.Tech Artificial Intelligence</CardTitle>
                <CardDescription className="text-gray-400">Amrita Vishwa Vidyapeetham • 2023-2027</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Specializing in machine learning, deep learning, and AI application development</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-cyan-400 mb-2">Frontend</h4>
                <p className="text-sm text-gray-300">React, Flutter, HTML, CSS</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-cyan-400 mb-2">AI/ML</h4>
                <p className="text-sm text-gray-300">Python, TensorFlow, Scikit-learn</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-cyan-400 mb-2">Backend</h4>
                <p className="text-sm text-gray-300">Node.js, MongoDB, Express</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-cyan-400 mb-2">Data Analysis</h4>
                <p className="text-sm text-gray-300">Pandas, NumPy, Matplotlib</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
