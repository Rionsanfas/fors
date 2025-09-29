import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Phone, 
  MapPin, 
  Mail, 
  ArrowRight, 
  Shield, 
  Wrench, 
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const vehicles = [
  {
    id: 1,
    name: "Ford Mustang GT",
    price: "$37,315",
    image: "https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Sports Car",
    features: ["450 HP V8", "Manual/Auto", "Premium Interior"]
  },
  {
    id: 2,
    name: "Ford F-150 Lightning",
    price: "$59,974",
    image: "https://images.pexels.com/photos/1319839/pexels-photo-1319839.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Electric Truck",
    features: ["All-Electric", "563 HP", "300+ Mile Range"]
  },
  {
    id: 3,
    name: "Ford Explorer ST",
    price: "$48,130",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Performance SUV",
    features: ["400 HP", "7-Seat", "AWD Standard"]
  }
];

const services = [
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "Comprehensive protection plans for your peace of mind"
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description: "Certified technicians with genuine Ford parts"
  },
  {
    icon: Clock,
    title: "Quick Financing",
    description: "Fast approvals with competitive rates"
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % vehicles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter'] relative overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        className={`fixed w-6 h-6 bg-blue-600 rounded-full pointer-events-none z-50 transition-all duration-200 ${
          cursorHover ? 'scale-150 bg-blue-400' : 'scale-100'
        }`}
        style={{
          left: cursorPos.x - 12,
          top: cursorPos.y - 12,
          transform: `translate(${cursorPos.x - 12}px, ${cursorPos.y - 12}px)`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FORD</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'Vehicles', 'Services', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {['Home', 'Vehicles', 'Services', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 to-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Built for the
                <span className="text-blue-600 block">Road Ahead</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                Discover Ford's latest lineup of vehicles designed with innovation, 
                performance, and sustainability at their core.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('vehicles')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <span>Explore Vehicles</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                Schedule Test Drive
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Ford Vehicle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section id="vehicles" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured Vehicles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our premium selection of Ford vehicles, each engineered for excellence
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle, index) => (
                <div 
                  key={vehicle.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                        <p className="text-blue-600 font-semibold">{vehicle.type}</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{vehicle.price}</p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-blue-600 fill-current" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience exceptional service that goes beyond your expectations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                120 Years of Innovation
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Since 1903, Ford has been at the forefront of automotive innovation, 
                  consistently pushing boundaries and redefining what's possible on four wheels.
                </p>
                <p>
                  From the revolutionary Model T to today's cutting-edge electric vehicles, 
                  we continue to build vehicles that move people forward with purpose, passion, and precision.
                </p>
                <p>
                  Our commitment to quality, sustainability, and customer satisfaction drives 
                  everything we do, ensuring that every Ford vehicle delivers an exceptional experience.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  alt="Ford Heritage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to find your perfect Ford? Visit our showroom or contact us today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="text-center p-8 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors duration-300"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">(555) 123-FORD</p>
            </div>

            <div 
              className="text-center p-8 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors duration-300"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">123 Ford Drive<br />Detroit, MI 48201</p>
            </div>

            <div 
              className="text-center p-8 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors duration-300"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">info@forddealer.com</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              className="bg-blue-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 hover:shadow-lg"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              Schedule Your Test Drive Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Car className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">FORD PREMIER DEALERSHIP</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 Ford Premier Dealership. Built for Excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;