"use client"
import { useState } from "react"
import {
  Award,
  BookOpen,
  Briefcase,
  Users,
  Trophy,
  CheckCircle,
  Languages,
  Coins,
  User,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Star,
  Building2,
  Banknote,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const translations = {
  en: {
    title: "Vidyarthi",
    studentPortal: "Student Portal",
    acadCoins: "AcadCoins:",
    comingSoon: "Coming Soon",
    comingSoonDesc: "AcadCoin rewards system is under development",
    close: "Close",
    overview: "Overview",
    profile: "Profile",
    employability: "Employability",
    certificates: "Certificates",
    internships: "Internships",
    recentActivity: "Recent Activity",
    recentActivityDesc: "Your latest achievements and updates",
    profileInfo: "Profile Information",
    profileInfoDesc: "Manage your personal information and visibility settings",
    privacySettings: "Privacy Settings",
    privacySettingsDesc: "Control who can see your information",
    uploadCertificate: "Upload New Certificate",
    uploadCertificateDesc: "Add your certificates to showcase your skills and achievements",
    myCertificates: "My Certificates",
    myCertificatesDesc: "Manage your uploaded certificates and their visibility",
    employabilityScore: "Overall Employability Score",
    employabilityScoreDesc: "Based on your skills, certifications, and profile completeness",
    skillBreakdown: "Skill Breakdown",
    skillBreakdownDesc: "Detailed analysis of your employability factors",
    industryComparison: "Industry Comparison",
    industryComparisonDesc: "How you rank against industry standards",
    improvementRecommendations: "Improvement Recommendations",
    improvementRecommendationsDesc: "Personalized suggestions to boost your employability",
    profileCompletion: "Profile Completion",
    employabilityScoreShort: "Employability Score",
    activeProjects: "Active Projects",
    completedCertificate: "Completed certificate in",
    updatedProfile: "Updated profile information",
    joinedProject: "Joined new project team",
    earnedBadge: "Earned achievement badge",
    submittedAssignment: "Submitted assignment for",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    dateOfBirth: "Date of Birth",
    address: "Address",
    emergencyContact: "Emergency Contact",
    profileVisibility: "Profile Visibility",
    publicProfile: "Public Profile",
    publicProfileDesc: "Your profile is visible to everyone",
    privateProfile: "Private Profile",
    privateProfileDesc: "Only you can see your profile",
    restrictedProfile: "Restricted Profile",
    restrictedProfileDesc: "Only approved connections can see your profile",
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
    certifications: "Certifications",
    projects: "Projects",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    needsImprovement: "Needs Improvement",
    industryAverage: "Industry Average",
    yourScore: "Your Score",
    skillsAssessment: "Complete skills assessment",
    moreProjects: "Work on more projects",
    networkBuilding: "Build professional network",
    continuousLearning: "Continue learning new technologies",
    studentName: "Ritik Kumar",
    studentEmail: "ritik.kumar@iitdelhi.ac.in",
    studentPhone: "+91 98765 43210",
    studentDob: "15/08/2002",
    studentAddress: "Room 204, Hostel 3, IIT Delhi, New Delhi - 110016",
    studentEmergency: "+91 98765 43211",
    studentBio:
      "Computer Science student at IIT Delhi with passion for AI and Machine Learning. Active in coding competitions and open source projects.",
    studentDepartment: "Computer Science & Engineering",
    awsCertificate: "AWS Cloud Practitioner",
    reactCertificate: "React Development",
    pythonCertificate: "Python Programming",
    dataScienceCertificate: "Data Science Fundamentals",
    javascript: "JavaScript",
    python: "Python",
    react: "React",
    nodejs: "Node.js",
    aws: "AWS",
    docker: "Docker",
    git: "Git",
    mongodb: "MongoDB",
    communication: "Communication",
    teamwork: "Teamwork",
    problemSolving: "Problem Solving",
    leadership: "Leadership",
    chooseFile: "Choose File",
    dropCertificate: "Drop your certificate here or",
    clickToUpload: "click to upload",
    totalCertificates: "Total Certificates",
    verified: "Verified",
    pending: "Pending",
    upload: "Upload",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    download: "Download",
    machineLearning: "Machine Learning",
    webDevelopment: "Web Development",
    dataStructures: "Data Structures",
    algorithms: "Algorithms",
    hackathon: "Hackathon Winner",
    ecommerceProject: "E-commerce Platform",
    chatbotProject: "AI Chatbot",
    portfolioProject: "Portfolio Website",
    allInternships: "All Internships",
    pmInternships: "PM Internships",
    techInternships: "Tech Internships",
    eligibilityMatch: "Eligibility Match",
    apply: "Apply",
    requiredSkills: "Required Skills",
    youHave: "You have this skill",
    skillNeeded: "Skill needed",
    addCertificate: "Add Certificate", // Added translation for add certificate button
  },
  hi: {
    title: "विद्यार्थी",
    studentPortal: "छात्र पोर्टल",
    acadCoins: "एकेडकॉइन्स:",
    comingSoon: "जल्द आ रहा है",
    comingSoonDesc: "एकेडकॉइन पुरस्कार प्रणाली विकसित की जा रही है",
    close: "बंद करें",
    overview: "अवलोकन",
    profile: "प्रोफ़ाइल",
    employability: "रोजगारपरकता",
    certificates: "प्रमाणपत्र",
    internships: "इंटर्नशिप",
    recentActivity: "हाल की गतिविधि",
    recentActivityDesc: "आपकी नवीनतम उपलब्धियां और अपडेट",
    profileInfo: "प्रोफ़ाइल जानकारी",
    profileInfoDesc: "अपनी व्यक्तिगत जानकारी और दृश्यता सेटिंग्स प्रबंधित करें",
    privacySettings: "गोपनीयता सेटिंग्स",
    privacySettingsDesc: "नियंत्रित करें कि आपकी जानकारी कौन देख सकता है",
    uploadCertificate: "नया प्रमाणपत्र अपलोड करें",
    uploadCertificateDesc: "अपने कौशल और उपलब्धियों को प्रदर्शित करने के लिए अपने प्रमाणपत्र जोड़ें",
    myCertificates: "मेरे प्रमाणपत्र",
    myCertificatesDesc: "अपने अपलोड किए गए प्रमाणपत्रों और उनकी दृश्यता का प्रबंधन करें",
    employabilityScore: "समग्र रोजगारपरकता स्कोर",
    employabilityScoreDesc: "आपके कौशल, प्रमाणन और प्रोफ़ाइल पूर्णता के आधार पर",
    skillBreakdown: "कौशल विश्लेषण",
    skillBreakdownDesc: "आपके रोजगारपरकता कारकों का विस्तृत विश्लेषण",
    industryComparison: "उद्योग तुलना",
    industryComparisonDesc: "उद्योग मानकों के मुकाबले आपकी रैंकिंग",
    improvementRecommendations: "सुधार की सिफारिशें",
    improvementRecommendationsDesc: "आपकी रोजगारपरकता बढ़ाने के लिए व्यक्तिगत सुझाव",
    profileCompletion: "प्रोफ़ाइल पूर्णता",
    employabilityScoreShort: "रोजगारपरकता स्कोर",
    activeProjects: "सक्रिय परियोजनाएं",
    completedCertificate: "में प्रमाणपत्र पूरा किया",
    updatedProfile: "प्रोफ़ाइल जानकारी अपडेट की",
    joinedProject: "नई परियोजना टीम में शामिल हुए",
    earnedBadge: "उपलब्धि बैज अर्जित किया",
    submittedAssignment: "के लिए असाइनमेंट जमा किया",
    personalInfo: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    phoneNumber: "फोन नंबर",
    dateOfBirth: "जन्म तिथि",
    address: "पता",
    emergencyContact: "आपातकालीन संपर्क",
    profileVisibility: "प्रोफ़ाइल दृश्यता",
    publicProfile: "सार्वजनिक प्रोफ़ाइल",
    publicProfileDesc: "आपकी प्रोफ़ाइल सभी को दिखाई देती है",
    privateProfile: "निजी प्रोफ़ाइल",
    privateProfileDesc: "केवल आप अपनी प्रोफ़ाइल देख सकते हैं",
    restrictedProfile: "प्रतिबंधित प्रोफ़ाइल",
    restrictedProfileDesc: "केवल अनुमोदित कनेक्शन आपकी प्रोफ़ाइल देख सकते हैं",
    technicalSkills: "तकनीकी कौशल",
    softSkills: "सॉफ्ट स्किल्स",
    certifications: "प्रमाणन",
    projects: "परियोजनाएं",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    average: "औसत",
    needsImprovement: "सुधार की आवश्यकता",
    industryAverage: "उद्योग औसत",
    yourScore: "आपका स्कोर",
    skillsAssessment: "कौशल मूल्यांकन पूरा करें",
    moreProjects: "अधिक परियोजनाओं पर काम करें",
    networkBuilding: "व्यावसायिक नेटवर्क बनाएं",
    continuousLearning: "नई तकनीकों को सीखना जारी रखें",
    studentName: "रितिक कुमार",
    studentEmail: "ritik.kumar@iitdelhi.ac.in",
    studentPhone: "+91 98765 43210",
    studentDob: "15/08/2002",
    studentAddress: "कमरा 204, छात्रावास 3, आईआईटी दिल्ली, नई दिल्ली - 110016",
    studentEmergency: "+91 98765 43211",
    studentBio:
      "आईआईटी दिल्ली में कंप्यूटर साइंस के छात्र जिन्हें AI और मशीन लर्निंग में रुचि है। कोडिंग प्रतियोगिताओं और ओपन सोर्स प्रोजेक्ट्स में सक्रिय।",
    studentDepartment: "कंप्यूटर साइंस और इंजीनियरिंग",
    awsCertificate: "AWS क्लाउड प्रैक्टिशनर",
    reactCertificate: "रिएक्ट डेवलपमेंट",
    pythonCertificate: "पायथन प्रोग्रामिंग",
    dataScienceCertificate: "डेटा साइंस फंडामेंटल्स",
    javascript: "जावास्क्रिप्ट",
    python: "पायथन",
    react: "रिएक्ट",
    nodejs: "नोड.जेएस",
    aws: "AWS",
    docker: "डॉकर",
    git: "गिट",
    mongodb: "मॉन्गोडीबी",
    communication: "संवाद",
    teamwork: "टीमवर्क",
    problemSolving: "समस्या समाधान",
    leadership: "नेतृत्व",
    chooseFile: "फ़ाइल चुनें",
    dropCertificate: "अपना प्रमाणपत्र यहाँ छोड़ें या",
    clickToUpload: "अपलोड करने के लिए क्लिक करें",
    totalCertificates: "कुल प्रमाणपत्र",
    verified: "सत्यापित",
    pending: "लंबित",
    upload: "अपलोड",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    download: "डाउनलोड",
    machineLearning: "मशीन लर्निंग",
    webDevelopment: "वेब डेवलपमेंट",
    dataStructures: "डेटा स्ट्रक्चर्स",
    algorithms: "एल्गोरिदम",
    hackathon: "हैकाथॉन विजेता",
    ecommerceProject: "ई-कॉमर्स प्लेटफॉर्म",
    chatbotProject: "AI चैटबॉट",
    portfolioProject: "पोर्टफोलियो वेबसाइट",
    allInternships: "सभी इंटर्नशिप",
    pmInternships: "PM इंटर्नशिप",
    techInternships: "टेक इंटर्नशिप",
    eligibilityMatch: "योग्यता मैच",
    apply: "आवेदन करें",
    requiredSkills: "आवश्यक कौशल",
    youHave: "आपके पास यह कौशल है",
    skillNeeded: "कौशल की आवश्यकता",
    addCertificate: "प्रमाणपत्र जोड़ें", // Added Hindi translation for add certificate button
  },
}

const mockInternships = [
  {
    id: 1,
    title: "Product Management Intern",
    company: "Ministry of Electronics & IT",
    location: "New Delhi",
    duration: "6 months",
    stipend: "₹25,000/month",
    requiredSkills: ["Communication", "Leadership", "JavaScript", "Python"],
    description: "Work on digital governance initiatives and product strategy for government tech platforms.",
    eligibilityScore: 85,
    type: "PM",
  },
  {
    id: 2,
    title: "Digital Product Intern",
    company: "Department of Science & Technology",
    location: "Bangalore",
    duration: "4 months",
    stipend: "₹20,000/month",
    requiredSkills: ["React", "Communication", "Teamwork", "Machine Learning"],
    description: "Support product development for scientific research platforms and data visualization tools.",
    eligibilityScore: 92,
    type: "PM",
  },
  {
    id: 3,
    title: "Tech Policy Research Intern",
    company: "NITI Aayog",
    location: "New Delhi",
    duration: "3 months",
    stipend: "₹18,000/month",
    requiredSkills: ["Python", "Leadership", "Communication"],
    description: "Research and analyze technology policies, contribute to digital India initiatives.",
    eligibilityScore: 78,
    type: "PM",
  },
  {
    id: 4,
    title: "Software Development Intern",
    company: "Ministry of Railways",
    location: "Mumbai",
    duration: "6 months",
    stipend: "₹22,000/month",
    requiredSkills: ["JavaScript", "Node.js", "MongoDB"],
    description: "Develop and maintain railway management systems and passenger services platforms.",
    eligibilityScore: 88,
    type: "Technical",
  },
  {
    id: 5,
    title: "Data Science Intern",
    company: "Ministry of Health",
    location: "Chennai",
    duration: "5 months",
    stipend: "₹24,000/month",
    requiredSkills: ["Python", "Machine Learning", "Communication"],
    description: "Analyze healthcare data and develop predictive models for public health initiatives.",
    eligibilityScore: 90,
    type: "Technical",
  },
]

const mockData = {
  currentUser: {
    id: "1",
    name: "Ritik Kumar",
    email: "ritik.kumar@iit.ac.in",
    major: "Computer Science & Engineering",
    avatar: "/indian-male-student.png",
    profileCompletion: 92,
  },
  dashboardStats: {
    certificatesEarned: 12,
    employabilityScore: 85,
    profileCompletion: 92,
    acadCoinBalance: 0,
  },
  recentActivities: [
    {
      id: "1",
      type: "certificate",
      title: "React Development Certificate uploaded",
      timestamp: "2 hours ago",
      badge: { text: "New", variant: "secondary", className: "bg-blue-600 text-white" },
    },
    {
      id: "2",
      type: "profile",
      title: "Profile updated with new skills",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      type: "project",
      title: "Joined new project team",
      timestamp: "3 days ago",
    },
    {
      id: "4",
      type: "achievement",
      title: "Earned achievement badge",
      timestamp: "5 days ago",
    },
    {
      id: "5",
      type: "certificate",
      title: "Submitted assignment for AI Course",
      timestamp: "1 week ago",
    },
  ],
  profileData: {
    name: "Ritik Kumar",
    email: "ritik.kumar@iit.ac.in",
    phone: "+91 98765 43210",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    university: "Indian Institute of Technology Delhi",
    bio: "Passionate computer science student from Delhi with interests in web development, artificial intelligence, and contributing to India's digital transformation.",
    skills: [
      "JavaScript",
      "React",
      "Python",
      "Machine Learning",
      "Node.js",
      "MongoDB",
      "Communication",
      "Leadership",
      "Teamwork",
    ],
    profileVisible: true,
    contactVisible: false,
    skillsVisible: true,
  },
  certificates: [
    {
      id: "1",
      name: "React Development Certification",
      issuer: "Meta",
      dateIssued: "2024-01-15",
      file: "react-cert.pdf",
      visible: true,
      verified: true,
    },
    {
      id: "2",
      name: "JavaScript Fundamentals",
      issuer: "freeCodeCamp",
      dateIssued: "2023-12-10",
      file: "js-cert.pdf",
      visible: true,
      verified: true,
    },
    {
      id: "3",
      name: "Python for Data Science",
      issuer: "Coursera",
      dateIssued: "2023-11-20",
      file: "python-cert.pdf",
      visible: false,
      verified: false,
    },
  ],
  employability: {
    overallScore: 85,
    previousScore: 80,
    skillCategories: [
      {
        name: "Technical Skills",
        score: 90,
        icon: BookOpen,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        suggestions: ["Learn TypeScript", "Master Docker", "Study System Design"],
      },
      {
        name: "Certifications",
        score: 85,
        icon: Award,
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        suggestions: ["AWS Cloud Practitioner", "Google Cloud Associate", "Microsoft Azure Fundamentals"],
      },
      {
        name: "Soft Skills",
        score: 75,
        icon: Users,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        suggestions: ["Leadership Training", "Communication Workshop", "Team Management Course"],
      },
      {
        name: "Experience",
        score: 80,
        icon: Briefcase,
        color: "text-orange-700",
        bgColor: "bg-orange-50",
        suggestions: ["Internship Program", "Open Source Contributions", "Personal Projects"],
      },
    ],
    industryComparison: [
      { industry: "Software Development", score: 88, isTarget: true },
      { industry: "Data Science", score: 82, isTarget: false },
      { industry: "Cybersecurity", score: 79, isTarget: false },
      { industry: "Product Management", score: 85, isTarget: false },
    ],
  },
}

const calculateEligibilityScore = (requiredSkills: string[], studentSkills: string[]) => {
  const matchedSkills = requiredSkills.filter((skill) =>
    studentSkills.some(
      (studentSkill) =>
        studentSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(studentSkill.toLowerCase()),
    ),
  )
  return Math.round((matchedSkills.length / requiredSkills.length) * 100)
}

const getFilteredInternships = (type = "all") => {
  const filtered = type === "all" ? mockInternships : mockInternships.filter((internship) => internship.type === type)

  return filtered
    .map((internship) => ({
      ...internship,
      eligibilityScore: calculateEligibilityScore(internship.requiredSkills, mockData.profileData.skills),
    }))
    .sort((a, b) => b.eligibilityScore - a.eligibilityScore)
}

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "certificates" | "employability" | "internships">(
    "overview",
  )
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [internshipFilter, setInternshipFilter] = useState("all")
  const [isEditing, setIsEditing] = useState(false)

  const t = translations[language]
  const { currentUser, dashboardStats, profileData, certificates, employability } = mockData

  const activityTypes = [
    "acadcoin",
    "certificate",
    "profile",
    "employability",
    "project",
    "achievement",
  ] as const
  type ActivityType = typeof activityTypes[number]

  const getActivityColor = (type: string): string => {
    const colors: Record<ActivityType, string> = {
      acadcoin: "bg-yellow-500",
      certificate: "bg-blue-600",
      profile: "bg-green-600",
      employability: "bg-purple-600",
      project: "bg-green-500",
      achievement: "bg-purple-600",
    }
    return colors[type as ActivityType] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-blue-700 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">{t.title}</h1>
              <Badge variant="secondary" className="bg-orange-500 text-white border-orange-400">
                {t.studentPortal}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                variant="outline"
                size="sm"
                className="bg-blue-600 border-blue-500 text-white hover:bg-blue-500 flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                <span className="text-xs font-medium">{language === "en" ? "हिं" : "EN"}</span>
              </Button>
              <Button
                onClick={() => setShowComingSoon(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white border border-orange-500 shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2 px-3 py-2 text-sm font-semibold"
              >
                <Coins className="w-4 h-4" />
                <span className="hidden sm:inline">{t.acadCoins}</span>
                <span className="font-bold">0</span>
              </Button>
              <div className="flex items-center gap-2">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="bg-orange-500 text-white border-orange-400 w-10 h-10 rounded-full flex items-center justify-center">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="hidden sm:block text-sm">
                  <p className="font-medium text-white">{currentUser.name}</p>
                  <p className="text-blue-100">{currentUser.major}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t.overview}
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t.profile}
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              {t.certificates}
            </TabsTrigger>
            <TabsTrigger
              value="employability"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              {t.employability}
            </TabsTrigger>
            <TabsTrigger value="internships" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t.internships}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{t.totalCertificates}</p>
                    <p className="text-3xl font-bold text-white">{dashboardStats.certificatesEarned}</p>
                  </div>
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="bg-orange-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{t.employabilityScoreShort}</p>
                    <p className="text-3xl font-bold text-white">{dashboardStats.employabilityScore}%</p>
                  </div>
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="bg-green-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{t.profileCompletion}</p>
                    <p className="text-3xl font-bold text-white">{dashboardStats.profileCompletion}%</p>
                  </div>
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="bg-purple-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{t.activeProjects}</p>
                    <p className="text-3xl font-bold text-white">3</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t.recentActivity}
                </CardTitle>
                <CardDescription>{t.recentActivityDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                      <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                      {activity.badge && (
                        <Badge variant={activity.badge.variant as any} className={activity.badge.className}>
                          {activity.badge.text}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.personalInfo}</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t.fullName}</Label>
                    <Input id="name" value={profileData.name} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="email">{t.emailAddress}</Label>
                    <Input id="email" value={profileData.email} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t.phoneNumber}</Label>
                    <Input id="phone" value={profileData.phone} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" value={profileData.course} disabled={!isEditing} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={profileData.bio} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? t.save : t.edit}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t.myCertificates}</CardTitle>
                    <CardDescription>{t.myCertificatesDesc}</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addCertificate}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Award className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{cert.name}</h3>
                            {cert.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer} • {cert.dateIssued}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={cert.verified ? "default" : "secondary"}>
                          {cert.verified ? t.verified : t.pending}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {t.view}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employability Tab */}
          <TabsContent value="employability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.employabilityScore}</CardTitle>
                <CardDescription>{t.employabilityScoreDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{employability.overallScore}%</div>
                  <Progress value={employability.overallScore} className="w-full max-w-md mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employability.skillCategories.map((category) => (
                    <Card key={category.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <category.icon className={`h-5 w-5 ${category.color}`} />
                          </div>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-2xl font-bold">{category.score}%</p>
                          </div>
                        </div>
                        <Progress value={category.score} className="mb-3" />
                        <div className="space-y-1">
                          {category.suggestions.slice(0, 2).map((suggestion) => (
                            <p key={suggestion} className="text-xs text-muted-foreground">
                              • {suggestion}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Internships Tab */}
          <TabsContent value="internships" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t.internships}
                </CardTitle>
                <CardDescription>Find internships that match your skills and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <Button
                    variant={internshipFilter === "all" ? "default" : "outline"}
                    onClick={() => setInternshipFilter("all")}
                    size="sm"
                  >
                    {t.allInternships}
                  </Button>
                  <Button
                    variant={internshipFilter === "PM" ? "default" : "outline"}
                    onClick={() => setInternshipFilter("PM")}
                    size="sm"
                  >
                    {t.pmInternships}
                  </Button>
                  <Button
                    variant={internshipFilter === "Technical" ? "default" : "outline"}
                    onClick={() => setInternshipFilter("Technical")}
                    size="sm"
                  >
                    {t.techInternships}
                  </Button>
                </div>

                <div className="grid gap-4">
                  {getFilteredInternships(internshipFilter).map((internship) => (
                    <Card key={internship.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{internship.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                {internship.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {internship.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {internship.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Banknote className="h-4 w-4" />
                                {internship.stipend}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">
                                {internship.eligibilityScore}% {t.eligibilityMatch}
                              </span>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              {t.apply}
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{internship.description}</p>

                        <div>
                          <p className="text-sm font-medium mb-2">{t.requiredSkills}:</p>
                          <div className="flex flex-wrap gap-2">
                            {internship.requiredSkills.map((skill) => {
                              const hasSkill = profileData.skills.some(
                                (studentSkill) =>
                                  studentSkill.toLowerCase().includes(skill.toLowerCase()) ||
                                  skill.toLowerCase().includes(studentSkill.toLowerCase()),
                              )
                              return (
                                <Badge
                                  key={skill}
                                  variant={hasSkill ? "default" : "outline"}
                                  className={hasSkill ? "bg-green-100 text-green-800 border-green-300" : ""}
                                  title={hasSkill ? t.youHave : t.skillNeeded}
                                >
                                  {skill}
                                  {hasSkill && <CheckCircle className="h-3 w-3 ml-1" />}
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.comingSoon}</DialogTitle>
            <DialogDescription>{t.comingSoonDesc}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowComingSoon(false)}>{t.close}</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}


