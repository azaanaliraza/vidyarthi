'use client';

import React, { useState } from 'react';
import { ChevronDown, Shield, GraduationCap, Bot, DollarSign, Building, X, CheckCircle, XCircle, Frown, Search, Lock, Award, TrendingUp, Coins, Users, Eye, FileCheck, Phone, Mail, MapPin } from 'lucide-react';

// Mock form components (shadcn-style)
const Button = ({ children, className = "", variant = "default", size = "default", ...props }: { children: React.ReactNode, className?: string, variant?: "default" | "outline" | "secondary", size?: "default" | "sm" | "lg", [key: string]: any }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }: { className?: string, [key: string]: any }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }: { className?: string, [key: string]: any }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const VidyarthiLanding = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showContactForm, setShowContactForm] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    userType: 'student'
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setContactMessage('Thank you for your interest! We will contact you soon.');
    setTimeout(() => {
      setShowContactForm(false);
      setContactMessage('');
    }, 2000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      message: '',
      userType: 'student'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDigiLockerLogin = () => {
    setShowLoginMessage(true);
    setTimeout(() => {
      setShowLoginMessage(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white" style={{
      '--saffron': '#FF9933',
      '--navy': '#000080',
      '--white': '#FFFFFF'
    } as React.CSSProperties}>
      {/* Header/Navbar */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50" style={{ borderBottom: '3px solid #FF9933' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#000080' }}>Vidyarthi</h1>
                <p className="text-xs text-gray-600">Government of India</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Problem', 'Solution', 'Features', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase() 
                      ? 'text-orange-500 border-b-2 border-orange-500' 
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-2">
              <select className="text-sm border rounded px-2 py-1" style={{ color: '#000080' }}>
                <option>English</option>
                <option>हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16" style={{ 
        background: 'linear-gradient(135deg, #000080 0%, #0066cc 100%)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="py-20">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-white">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Government Initiative</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              One Unified ID.
              <br />
              <span className="text-orange-400">Infinite Opportunities.</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              A simple, secure student ID for education, jobs & scholarships.
              <br />
              Empowering India's students with verified digital identity.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
                onClick={handleDigiLockerLogin}
              >
                <Shield className="w-5 h-5 mr-2" />
                Get Vidyarthi ID
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                onClick={() => setShowContactForm(true)}
              >
                <Building className="w-5 h-5 mr-2" />
                For Recruiters
              </Button>
            </div>
            
            <div className="mt-12 text-white/80">
              <p className="text-sm mb-4">Trusted by Government of India</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <span>Ministry of Education</span>
                <span>•</span>
                <span>DigiLocker</span>
                <span>•</span>
                <span>Aadhaar Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              Current Challenges in Indian Education System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Students and recruiters face multiple issues in the current fragmented system
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-red-100">
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Fake Resumes</h3>
                <p className="text-gray-600">
                  Unverified certificates and false information in applications create hiring challenges
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-yellow-100">
              <div className="text-center">
                <Frown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Repeated Form Filling</h3>
                <p className="text-gray-600">
                  Students waste time filling the same information across multiple platforms
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-100">
              <div className="text-center">
                <GraduationCap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Missing Scholarships</h3>
                <p className="text-gray-600">
                  Eligible students miss out on scholarships due to lack of awareness and complex processes
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-purple-100">
              <div className="text-center">
                <Search className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">No Transparency for Recruiters</h3>
                <p className="text-gray-600">
                  Employers struggle to verify candidate credentials and find suitable talent
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              Our Solution – Vidyarthi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive digital identity platform for Indian students
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-center">
                <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Student ID</h3>
                <p className="text-sm text-gray-600">
                  Aadhaar-linked digital identity with government-grade security
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Certificates</h3>
                <p className="text-sm text-gray-600">
                  Blockchain-verified educational credentials and achievements
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Employability Score</h3>
                <p className="text-sm text-gray-600">
                  AI-powered assessment of skills and career readiness
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="text-center">
                <Coins className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AcadCoin Rewards</h3>
                <p className="text-sm text-gray-600">
                  Earn digital currency for academic achievements and activities
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <div className="text-center">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Recruiter Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Advanced hiring tools with verified candidate database
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #e6f2ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              How It Works - 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Easy onboarding process for students and recruiters
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#000080' }}>
                Student Creates Vidyarthi ID
              </h3>
              <p className="text-gray-600">
                Register using DigiLocker authentication. Upload and verify educational certificates through secure blockchain technology.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#000080' }}>
                Data Verified & Score Generated
              </h3>
              <p className="text-gray-600">
                AI algorithms analyze credentials and generate employability score. Earn AcadCoins for verified achievements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#000080' }}>
                Recruiter Views Profile
              </h3>
              <p className="text-gray-600">
                Employers access verified profiles. Students control what information to share with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              Impact Across Stakeholders
            </h2>
            <p className="text-xl text-gray-600">
              Creating value for students, recruiters, and government
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">For Students</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Easy access to scholarships and opportunities
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  No more fake documentation issues
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Single profile for multiple applications
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Reward system for achievements
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <Building className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">For Recruiters</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Trusted hiring with verified profiles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Advanced filtering and search tools
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Reduced hiring time and costs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Access to employability scores
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">For Government</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Better transparency in education sector
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Efficient scholarship distribution
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Real-time education analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Reduced administrative overhead
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20" style={{ background: '#000080' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Transforming Indian Education
            </h2>
            <p className="text-xl text-white/80">
              Join millions of students in building a verified digital future
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold text-orange-400 mb-2">250M+</div>
              <div className="text-white/80">Students in India</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-orange-400 mb-2">1.5M+</div>
              <div className="text-white/80">Educational Institutions</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-orange-400 mb-2">50K+</div>
              <div className="text-white/80">Higher Education Institutions</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-orange-400 mb-2">₹2L Cr</div>
              <div className="text-white/80">Annual Scholarship Budget</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Vidyarthi</h3>
                  <p className="text-xs text-gray-400">Government of India</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Empowering India's students with secure, verified digital identity for education, employment, and scholarships.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Vidyarthi</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help & Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">Government Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ministry of Education</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">DigiLocker</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">India.gov.in</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">RTI</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-gray-400">1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-gray-400">support@vidyarthi.gov.in</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-orange-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">
                    Ministry of Education<br />
                    Shastri Bhawan, New Delhi<br />
                    110001, India
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Vidyarthi - Government of India. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Last Updated: January 2025</span>
                <span className="text-gray-400 text-sm">|</span>
                <span className="text-gray-400 text-sm">Visitors: 1,234,567</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#000080' }}>
                  Contact Vidyarthi Team
                </h3>
                <button onClick={() => setShowContactForm(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              {!contactMessage ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      User Type
                    </label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="student">Student</option>
                      <option value="recruiter">Recruiter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  {formData.userType === 'recruiter' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization
                      </label>
                      <Input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-800">{contactMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Message Modal */}
      {showLoginMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-800">Redirecting to DigiLocker for secure authentication...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VidyarthiLanding;
