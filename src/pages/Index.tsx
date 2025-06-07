import { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Phone, ExternalLink, Code, Brain, Database, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { sendEmail, EmailData } from '@/services/emailService';
import PageStats from '@/components/PageStats';
import Gallery from '@/components/Gallery';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'gallery', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
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

      // Clear form after successful submission
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
  
  const projects = [{
    title: "Movie Streaming Website",
    description: "Full-stack application built with React, Node.js, and MongoDB for seamless movie streaming experience",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "https://i.postimg.cc/J4RCvfF9/image.png",
    link: "https://github.com/SubhashGuptha30/EntertainmentHUB"
  }, {
    title: "Song Recommender AI",
    description: "Python-based AI system using collaborative filtering for personalized music recommendations",
    tech: ["Python", "Scikit-learn", "Pandas", "Flask"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    link: "https://github.com/SubhashGuptha30/SpotifyMiniProject"
  }, {
    title: "AI Nutrition Tracking System",
    description: "Computer vision-based food image analysis with personalized meal planning recommendations",
    tech: ["Python", "TensorFlow", "OpenCV", "React"],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
    link: null
  }, {
    title: "Quantum-Inspired Grey Wolf Optimization",
    description: "Hybrid machine learning algorithm for feature selection optimization research project",
    tech: ["Python", "NumPy", "Matplotlib", "Research"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    link: "https://github.com/SubhashGuptha30/CVD_prediction_QIGWO"
  }];
  
  const skills = [{
    icon: <Code className="w-8 h-8" />,
    title: "Frontend Development",
    description: "Responsive web and mobile applications using React, Flutter, HTML, and CSS with focus on user experience"
  }, {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Development",
    description: "Machine learning solutions and AI-powered applications for real-world problem solving"
  }, {
    icon: <Database className="w-8 h-8" />,
    title: "Data Analysis",
    description: "Comprehensive data analysis using Python, Pandas, and NumPy to extract actionable insights"
  }, {
    icon: <Palette className="w-8 h-8" />,
    title: "Full-Stack Development",
    description: "End-to-end application development with modern technologies and best practices"
  }];
  
  return <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-cyan-400">Subhash.dev</div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Portfolio', 'Gallery', 'Skills', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`hover:text-cyan-400 transition-colors duration-300 ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'}`}>
                  {item}
                </button>)}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-2">
                <p className="text-cyan-400 text-lg">Hello, I'm</p>
                <h1 className="text-5xl lg:text-7xl font-bold">
                  Subhash
                  <span className="block text-cyan-400">Guptha →</span>
                </h1>
                <div className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-full inline-block">
                  <span className="font-semibold">AI Developer</span>
                </div>
              </div>
              
              {/* Page Statistics */}
              <div className="py-2">
                <PageStats />
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
                B.Tech AI student and tech enthusiast from Amrita Vishwa Vidyapeetham, 
                passionate about building intelligent solutions and creating seamless user experiences.
              </p>
              <div className="flex space-x-4">
                <Button onClick={() => scrollToSection('portfolio')} className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  View My Work <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => scrollToSection('contact')} className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3 rounded-lg transition-all duration-300">
                  Get In Touch
                </Button>
              </div>
            </div>
            <div className={`flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <img alt="Subhash Guptha" className="w-72 h-72 rounded-full object-cover" src="/lovable-uploads/519c0e2b-b038-4a33-abb9-9bfa8731c5aa.jpg" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-cyan-400 text-gray-900 px-4 py-2 rounded-full font-semibold">
                  3rd Year B.Tech
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
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

      {/* Portfolio Section */}
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
                      {project.tech.map((tech, techIndex) => <span key={techIndex} className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>)}
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

      {/* Gallery Section */}
      <Gallery />

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills</h2>
            <p className="text-xl text-gray-300">What I can do for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((service, index) => <Card key={index} className="bg-gray-900 border-gray-700 text-center group hover:border-cyan-400 transition-all duration-300">
                <CardHeader>
                  <div className="text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-cyan-400">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
                  <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className="bg-gray-900 border-gray-600 text-white placeholder-gray-400" required disabled={isSubmitting} />
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" className="bg-gray-900 border-gray-600 text-white placeholder-gray-400" required disabled={isSubmitting} />
                  <Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" className="bg-gray-900 border-gray-600 text-white placeholder-gray-400" required disabled={isSubmitting} />
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me about your project..." rows={5} className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 resize-none" required disabled={isSubmitting} />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {isSubmitting ? <>Sending...</> : <>Send Message <ArrowRight className="ml-2 w-4 h-4" /></>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Subhash Guptha Gantasala. Built with passion and code.
          </p>
        </div>
      </footer>
    </div>;
};

export default Index;
