'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Building, GraduationCap, XCircle, Frown, Search, Lock, Award, TrendingUp, Coins, Users, Mail, Phone, X } from 'lucide-react';
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Button component for styling
const Button = ({ children, className = "", variant = "default", size = "default", ...props }: { children: React.ReactNode, className?: string, variant?: "default" | "outline", size?: "default" | "lg", [key: string]: any }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-orange-500 hover:bg-orange-600 text-white",
    outline: "border border-white text-white hover:bg-white hover:text-blue-900",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    lg: "px-8 py-4 text-lg h-14",
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

// Input and Textarea components for the contact form
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

const translations = {
  en: {
    vidyarthi: "Vidyarthi",
    govOfIndia: "Government of India",
    home: "Home",
    problem: "Problem",
    solution: "Solution",
    features: "Features",
    contact: "Contact",
    oneUnifiedId: "One Unified ID.",
    infiniteOpportunities: "Infinite Opportunities.",
    heroSubtitle: "A simple, secure student ID for education, jobs & scholarships.",
    heroSubtitle2: "Empowering India's students with verified digital identity.",
    getVidyarthiId: "I am a Student",
    forRecruiters: "I am a Recruiter",
    trustedBy: "Trusted by Government of India",
    ministryOfEducation: "Ministry of Education",
    digilocker: "DigiLocker",
    aadhaarVerified: "Aadhaar Verified",
    currentChallenges: "Current Challenges in Indian Education System",
    challengesSubtitle: "Students and recruiters face multiple issues in the current fragmented system",
    fakeResumes: "Fake Resumes",
    fakeResumesDesc: "Unverified certificates and false information in applications create hiring challenges",
    repeatedFormFilling: "Repeated Form Filling",
    repeatedFormFillingDesc: "Students waste time filling the same information across multiple platforms",
    missingScholarships: "Missing Scholarships",
    missingScholarshipsDesc: "Eligible students miss out on scholarships due to lack of awareness and complex processes",
    noTransparency: "No Transparency for Recruiters",
    noTransparencyDesc: "Employers struggle to verify candidate credentials and find suitable talent",
    ourSolution: "Our Solution – Vidyarthi",
    ourSolutionSubtitle: "A comprehensive digital identity platform for Indian students",
    secureStudentId: "Secure Student ID",
    secureStudentIdDesc: "Aadhaar-linked digital identity with government-grade security",
    verifiedCertificates: "Verified Certificates",
    verifiedCertificatesDesc: "Blockchain-verified educational credentials and achievements",
    employabilityScore: "Employability Score",
    employabilityScoreDesc: "AI-powered assessment of skills and career readiness",
    acadCoinRewards: "AcadCoin Rewards",
    acadCoinRewardsDesc: "Earn digital currency for academic achievements and activities",
    recruiterDashboard: "Recruiter Dashboard",
    recruiterDashboardDesc: "Advanced hiring tools with verified candidate database",
    howItWorks: "How It Works - 3 Simple Steps",
    howItWorksSubtitle: "Easy onboarding process for students and recruiters",
    step1Title: "Student Creates Vidyarthi ID",
    step1Desc: "Register using DigiLocker authentication. Upload and verify educational certificates through secure blockchain technology.",
    step2Title: "Data Verified & Score Generated",
    step2Desc: "AI algorithms analyze credentials and generate employability score. Earn AcadCoins for verified achievements.",
    step3Title: "Recruiter Views Profile",
    step3Desc: "Employers access verified profiles. Students control what information to share with complete transparency.",
    impact: "Impact Across Stakeholders",
    impactSubtitle: "Creating value for students, recruiters, and government",
    forStudents: "For Students",
    studentBenefit1: "Easy access to scholarships and opportunities",
    studentBenefit2: "No more fake documentation issues",
    studentBenefit3: "Single profile for multiple applications",
    studentBenefit4: "Reward system for achievements",
    forRecruitersImpact: "For Recruiters",
    recruiterBenefit1: "Trusted hiring with verified profiles",
    recruiterBenefit2: "Advanced filtering and search tools",
    recruiterBenefit3: "Reduced hiring time and costs",
    recruiterBenefit4: "Access to employability scores",
    forGovernment: "For Government",
    governmentBenefit1: "Better transparency in education sector",
    governmentBenefit2: "Efficient scholarship distribution",
    governmentBenefit3: "Real-time education analytics",
    governmentBenefit4: "Reduced administrative overhead",
    transformingEducation: "Transforming Indian Education",
    transformingEducationSubtitle: "Join millions of students in building a verified digital future",
    studentsInIndia: "Students in India",
    educationalInstitutions: "Educational Institutions",
    higherEducationInstitutions: "Higher Education Institutions",
    annualScholarshipBudget: "Annual Scholarship Budget",
    empoweringStudents: "Empowering India's students with secure, verified digital identity for education, employment, and scholarships.",
    quickLinks: "Quick Links",
    aboutVidyarthi: "About Vidyarthi",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    helpSupport: "Help & Support",
    governmentLinks: "Government Links",
    rti: "RTI",
    contactInformation: "Contact Information",
    contactAddress: "Ministry of Education<br />Shastri Bhawan, New Delhi<br />110001, India",
    copyright: "© 2025 Vidyarthi - Government of India. All rights reserved.",
    governmentInitiative: "Government Initiative"
  },
  hi: {
    vidyarthi: "विद्यार्थी",
    govOfIndia: "भारत सरकार",
    home: "होम",
    problem: "समस्या",
    solution: "समाधान",
    features: "विशेषताएँ",
    contact: "संपर्क",
    oneUnifiedId: "एक एकीकृत आईडी।",
    infiniteOpportunities: "अनंत अवसर।",
    heroSubtitle: "शिक्षा, नौकरियों और छात्रवृत्ति के लिए एक सरल, सुरक्षित छात्र आईडी।",
    heroSubtitle2: "सत्यापित डिजिटल पहचान के साथ भारत के छात्रों को सशक्त बनाना।",
    getVidyarthiId: "मैं एक छात्र हूँ",
    forRecruiters: "मैं एक भर्तीकर्ता हूँ",
    trustedBy: "भारत सरकार द्वारा विश्वसनीय",
    ministryOfEducation: "शिक्षा मंत्रालय",
    digilocker: "डिजीलॉकर",
    aadhaarVerified: "आधार सत्यापित",
    currentChallenges: "भारतीय शिक्षा प्रणाली में वर्तमान चुनौतियाँ",
    challengesSubtitle: "छात्रों और भर्ती करने वालों को वर्तमान खंडित प्रणाली में कई समस्याओं का सामना करना पड़ता है",
    fakeResumes: "फर्जी बायोडाटा",
    fakeResumesDesc: "अਣ-सत्यापित प्रमाण पत्र और आवेदनों में गलत जानकारी भर्ती चुनौतियों का निर्माण करती है",
    repeatedFormFilling: "बार-बार फॉर्म भरना",
    repeatedFormFillingDesc: "छात्र कई प्लेटफार्मों पर एक ही जानकारी भरने में समय बर्बाद करते हैं",
    missingScholarships: "छूटी हुई छात्रवृत्तियाँ",
    missingScholarshipsDesc: "जागरूकता की कमी और जटिल प्रक्रियाओं के कारण योग्य छात्र छात्रवृत्ति से चूक जाते हैं",
    noTransparency: "भर्ती करने वालों के लिए कोई पारदर्शिता नहीं",
    noTransparencyDesc: "नियोक्ता उम्मीदवार की साख को सत्यापित करने और उपयुक्त प्रतिभा खोजने के लिए संघर्ष करते हैं",
    ourSolution: "हमारा समाधान - विद्यार्थी",
    ourSolutionSubtitle: "भारतीय छात्रों के लिए एक व्यापक डिजिटल पहचान मंच",
    secureStudentId: "सुरक्षित छात्र आईडी",
    secureStudentIdDesc: "सरकारी स्तर की सुरक्षा के साथ आधार-लिंक्ड डिजिटल पहचान",
    verifiedCertificates: "सत्यापित प्रमाण पत्र",
    verifiedCertificatesDesc: "ब्लॉकचेन-सत्यापित शैक्षिक साख और उपलब्धियां",
    employabilityScore: "रोजगार योग्यता स्कोर",
    employabilityScoreDesc: "कौशल और कैरियर की तैयारी का एआई-संचालित मूल्यांकन",
    acadCoinRewards: "एकाडकॉइन पुरस्कार",
    acadCoinRewardsDesc: "शैक्षणिक उपलब्धियों और गतिविधियों के लिए डिजिटल मुद्रा अर्जित करें",
    recruiterDashboard: "रिक्रूटर डैशबोर्ड",
    recruiterDashboardDesc: "सत्यापित उम्मीदवार डेटाबेस के साथ उन्नत भर्ती उपकरण",
    howItWorks: "यह कैसे काम करता है - 3 सरल चरण",
    howItWorksSubtitle: "छात्रों और भर्ती करने वालों के लिए आसान ऑनबोर्डिंग प्रक्रिया",
    step1Title: "छात्र विद्यार्थी आईडी बनाता है",
    step1Desc: "डिजीलॉकर प्रमाणीकरण का उपयोग करके पंजीकरण करें। सुरक्षित ब्लॉकचेन तकनीक के माध्यम से शैक्षिक प्रमाण पत्र अपलोड और सत्यापित करें।",
    step2Title: "डेटा सत्यापित और स्कोर उत्पन्न",
    step2Desc: "एआई एल्गोरिदम क्रेडेंशियल्स का विश्लेषण करते हैं और रोजगार योग्यता स्कोर उत्पन्न करते हैं। सत्यापित उपलब्धियों के लिए AcadCoins अर्जित करें।",
    step3Title: "रिक्रूटर प्रोफाइल देखता है",
    step3Desc: "नियोक्ता सत्यापित प्रोफाइल तक पहुंचते हैं। छात्र पूरी पारदर्शिता के साथ साझा करने के लिए कौन सी जानकारी चुनते हैं।",
    impact: "हितधारकों पर प्रभाव",
    impactSubtitle: "छात्रों, भर्ती करने वालों और सरकार के लिए मूल्य बनाना",
    forStudents: "छात्रों के लिए",
    studentBenefit1: "छात्रवृत्ति और अवसरों तक आसान पहुंच",
    studentBenefit2: "अब कोई नकली दस्तावेज़ीकरण समस्या नहीं",
    studentBenefit3: "कई आवेदनों के लिए एकल प्रोफाइल",
    studentBenefit4: "उपलब्धियों के लिए पुरस्कार प्रणाली",
    forRecruitersImpact: "भर्ती करने वालों के लिए",
    recruiterBenefit1: "सत्यापित प्रोफाइल के साथ विश्वसनीय भर्ती",
    recruiterBenefit2: "उन्नत फ़िल्टरिंग और खोज उपकरण",
    recruiterBenefit3: "भर्ती के समय और लागत में कमी",
    recruiterBenefit4: "रोजगार योग्यता स्कोर तक पहुंच",
    forGovernment: "सरकार के लिए",
    governmentBenefit1: "शिक्षा क्षेत्र में बेहतर पारदर्शिता",
    governmentBenefit2: "कुशल छात्रवृत्ति वितरण",
    governmentBenefit3: "वास्तविक समय शिक्षा विश्लेषण",
    governmentBenefit4: "प्रशासनिक उपरिव्यय में कमी",
    transformingEducation: "भारतीय शिक्षा को बदलना",
    transformingEducationSubtitle: "एक सत्यापित डिजिटल भविष्य बनाने में लाखों छात्रों से जुड़ें",
    studentsInIndia: "भारत में छात्र",
    educationalInstitutions: "शैक्षणिक संस्थान",
    higherEducationInstitutions: "उच्च शिक्षण संस्थान",
    annualScholarshipBudget: "वार्षिक छात्रवृत्ति बजट",
    empoweringStudents: "शिक्षा, रोजगार और छात्रवृत्ति के लिए सुरक्षित, सत्यापित डिजिटल पहचान के साथ भारत के छात्रों को सशक्त बनाना।",
    quickLinks: "त्वरित सम्पक",
    aboutVidyarthi: "विद्यार्थी के बारे में",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    helpSupport: "सहायता और समर्थन",
    governmentLinks: "सरकारी लिंक",
    rti: "आरटीआई",
    contactInformation: "संपर्क जानकारी",
    contactAddress: "शिक्षा मंत्रालय<br />शास्त्री भवन, नई दिल्ली<br />110001, भारत",
    copyright: "© 2025 विद्यार्थी - भारत सरकार। सर्वाधिकार सुरक्षित।",
    governmentInitiative: "सरकारी पहल"
  }
};

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const t = translations[language as 'en' | 'hi'];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'hi');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white shadow-md z-50" style={{ borderBottom: '3px solid #FF9933' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#000080' }}>{t.vidyarthi}</h1>
                <p className="text-xs text-gray-600">{t.govOfIndia}</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {[t.home, t.problem, t.solution, t.features, t.contact].map((item) => (
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
              <select value={language} onChange={handleLanguageChange} className="text-sm border rounded px-2 py-1" style={{ color: '#000080' }}>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="pt-20 pb-16" style={{ 
        background: 'linear-gradient(135deg, #000080 0%, #0066cc 100%)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="py-20">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-white">
                <Shield className="w-4 h-4" />
                <span className="text-sm">{t.governmentInitiative}</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t.oneUnifiedId}
              <br />
              <span className="text-orange-400">{t.infiniteOpportunities}</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {t.heroSubtitle}
              <br />
              {t.heroSubtitle2}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <SignedOut>
                  <SignUpButton 
                      mode="modal" 
                      forceRedirectUrl="/dashboard"
                      unsafeMetadata={{ role: "student" }}
                  >
                    <Button size="lg">
                      <Shield className="w-5 h-5 mr-2" />
                      {t.getVidyarthiId}
                    </Button>
                  </SignUpButton>

                  <SignUpButton 
                      mode="modal" 
                      forceRedirectUrl="/dashboard"
                      unsafeMetadata={{ role: "recruiter_pending" }}
                  >
                     <Button size="lg" variant="outline">
                        <Building className="w-5 h-5 mr-2" />
                        {t.forRecruiters}
                      </Button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Link href="/dashboard">
                     <Button size="lg">Go to Dashboard</Button>
                  </Link>
                  <div className="flex items-center justify-center pt-2 sm:pt-0">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
            </div>
            
            <div className="mt-12 text-white/80">
              <p className="text-sm mb-4">{t.trustedBy}</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <span>{t.ministryOfEducation}</span>
                <span>•</span>
                <span>{t.digilocker}</span>
                <span>•</span>
                <span>{t.aadhaarVerified}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              {t.currentChallenges}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.challengesSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-red-100">
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.fakeResumes}</h3>
                <p className="text-gray-600">
                  {t.fakeResumesDesc}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-yellow-100">
              <div className="text-center">
                <Frown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.repeatedFormFilling}</h3>
                <p className="text-gray-600">
                  {t.repeatedFormFillingDesc}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-100">
              <div className="text-center">
                <GraduationCap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.missingScholarships}</h3>
                <p className="text-gray-600">
                  {t.missingScholarshipsDesc}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-purple-100">
              <div className="text-center">
                <Search className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.noTransparency}</h3>
                <p className="text-gray-600">
                  {t.noTransparencyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              {t.ourSolution}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.ourSolutionSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-center">
                <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.secureStudentId}</h3>
                <p className="text-sm text-gray-600">
                  {t.secureStudentIdDesc}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.verifiedCertificates}</h3>
                <p className="text-sm text-gray-600">
                  {t.verifiedCertificatesDesc}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.employabilityScore}</h3>
                <p className="text-sm text-gray-600">
                  {t.employabilityScoreDesc}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="text-center">
                <Coins className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.acadCoinRewards}</h3>
                <p className="text-sm text-gray-600">
                  {t.acadCoinRewardsDesc}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <div className="text-center">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.recruiterDashboard}</h3>
                <p className="text-sm text-gray-600">
                  {t.recruiterDashboardDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #e6f2ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              {t.howItWorks}
            </h2>
            <p className="text-xl text-gray-600">
              {t.howItWorksSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#000080' }}>
                {t.step1Title}
              </h3>
              <p className="text-gray-600">
                {t.step1Desc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#000080' }}>
                {t.step2Title}
              </h3>
              <p className="text-gray-600">
                {t.step2Desc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#000080' }}>
                {t.step3Title}
              </h3>
              <p className="text-gray-600">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000080' }}>
              {t.impact}
            </h2>
            <p className="text-xl text-gray-600">
              {t.impactSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t.forStudents}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  {t.studentBenefit1}
                </li>
                <li className="flex items-center">
                  {t.studentBenefit2}
                </li>
                <li className="flex items-center">
                  {t.studentBenefit3}
                </li>
                <li className="flex items-center">
                  {t.studentBenefit4}
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <Building className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t.forRecruitersImpact}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  {t.recruiterBenefit1}
                </li>
                <li className="flex items-center">
                  {t.recruiterBenefit2}
                </li>
                <li className="flex items-center">
                  {t.recruiterBenefit3}
                </li>
                <li className="flex items-center">
                  {t.recruiterBenefit4}
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t.forGovernment}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  {t.governmentBenefit1}
                </li>
                <li className="flex items-center">
                  {t.governmentBenefit2}
                </li>
                <li className="flex items-center">
                  {t.governmentBenefit3}
                </li>
                <li className="flex items-center">
                  {t.governmentBenefit4}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t.vidyarthi}</h3>
                  <p className="text-xs text-gray-400">{t.govOfIndia}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t.empoweringStudents}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">{t.quickLinks}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.aboutVidyarthi}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.privacyPolicy}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.termsOfService}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.helpSupport}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">{t.governmentLinks}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.ministryOfEducation}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.digilocker}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">India.gov.in</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.rti}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">{t.contactInformation}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-gray-400">1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-gray-400">support@vidyarthi.gov.in</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                {t.copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;