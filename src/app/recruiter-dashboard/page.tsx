"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Menu, X, Search, Bell, Users, FileText, Calendar, BarChart3,
  MessageSquare, Home, Filter, Grid3X3, List, Plus, Eye, Edit,
  Download, Mail, Phone, MapPin, Clock, CheckCircle, TrendingUp,
  TrendingDown, Send, Paperclip, MoreHorizontal, Star, Building,
  Briefcase, DollarSign, UserCheck, Video, Award, Activity,
} from "lucide-react"

// Main Dashboard Component
export default function RecruitmentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1)

  const navigation = [
    { name: "Overview", id: "overview", icon: Home },
    { name: "Candidates", id: "candidates", icon: Users, badge: "12" },
    { name: "Applications", id: "applications", icon: FileText, badge: "8" },
    { name: "Interviews", id: "interviews", icon: Calendar, badge: "3" },
    { name: "Analytics", id: "analytics", icon: BarChart3 },
    { name: "Messages", id: "messages", icon: MessageSquare, badge: "5" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-blue-900 border-r border-blue-800">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-white">Vidyarthi Recruit</h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="text-white hover:bg-blue-800">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SidebarContent navigation={navigation} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-blue-900 border-r border-blue-800">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-white">Vidyarthi Recruit</h1>
          </div>
          <SidebarContent navigation={navigation} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-blue-200 bg-blue-50 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden text-blue-900 hover:bg-blue-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3 h-4 w-4 text-blue-600" />
              <input
                className="block w-full rounded-md border border-blue-200 bg-white pl-10 pr-3 py-2 text-sm placeholder:text-blue-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Search candidates, applications..."
                type="search"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm" className="text-blue-900 hover:bg-orange-100">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-blue-200" />
              <div className="flex items-center gap-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/recruiter-avatar.png" alt="Recruiter" />
                  <AvatarFallback className="bg-orange-500 text-white">AS</AvatarFallback>
                </Avatar>
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-4 text-sm font-medium text-blue-900">Aditi Sharma</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {activeTab === "overview" && <DashboardOverview />}
            {activeTab === "candidates" && <CandidateBrowser viewMode={viewMode} setViewMode={setViewMode} />}
            {activeTab === "applications" && <ApplicationManagement />}
            {activeTab === "interviews" && <InterviewScheduler />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
            {activeTab === "messages" && <CommunicationCenter selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ navigation, activeTab, setActiveTab }: any) {
    return (
      <nav className="flex flex-1 flex-col px-4 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item: any) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full gap-x-3 rounded-md p-2 text-sm font-medium leading-6 ${
                      activeTab === item.id ? "bg-orange-500 text-white" : "text-blue-100 hover:bg-blue-800 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-800">{item.badge}</Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    )
}

function DashboardOverview() {
    // This component is complete and correct from previous steps.
    const stats = [
        { name: "Total Applications", value: "2,651", change: "+4.75%", icon: FileText },
        { name: "Active Candidates", value: "1,423", change: "+54.02%", icon: Users },
        { name: "Interviews Scheduled", value: "89", change: "-1.39%", icon: Calendar },
        { name: "Positions Filled", value: "12", change: "+10.18%", icon: CheckCircle },
    ]

    const recentApplications = [
        { id: 1, name: "Priya Sharma", position: "Frontend Developer", status: "Interview Scheduled", statusColor: "bg-blue-100 text-blue-800", avatar: "/placeholder-0mkvw.png", appliedDate: "2 hours ago" },
        { id: 2, name: "Rohan Gupta", position: "Data Scientist", status: "Under Review", statusColor: "bg-orange-100 text-orange-800", avatar: "/placeholder-s6jev.png", appliedDate: "4 hours ago" },
        { id: 3, name: "Ananya Reddy", position: "UX Designer", status: "Shortlisted", statusColor: "bg-green-100 text-green-800", avatar: "/placeholder-4fie5.png", appliedDate: "1 day ago" },
        { id: 4, name: "Vikram Singh", position: "Backend Developer", status: "New Application", statusColor: "bg-blue-100 text-blue-800", avatar: "/david-backend-developer.jpg", appliedDate: "2 days ago" },
    ]

    const upcomingInterviews = [
        { id: 1, candidate: "Aditya Verma", position: "Senior React Developer", time: "10:00 AM", date: "Today", type: "Technical Interview", avatar: "/placeholder-0mkvw.png" },
        { id: 2, candidate: "Isha Kapoor", position: "Product Manager", time: "2:30 PM", date: "Today", type: "Final Interview", avatar: "/placeholder-s6jev.png" },
        { id: 3, candidate: "Siddharth Jain", position: "DevOps Engineer", time: "11:00 AM", date: "Tomorrow", type: "Initial Screening", avatar: "/placeholder-4fie5.png" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-blue-900">Dashboard Overview</h1>
                <p className="text-blue-700">Welcome back! Here's what's happening with your recruitment pipeline.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border-blue-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-900">{stat.name}</CardTitle>
                            <stat.icon className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                            <p className="text-xs text-blue-600"><span className="text-green-600">{stat.change}</span> from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
                <Card className="border-blue-200">
                    <CardHeader><CardTitle className="text-blue-900">Recent Applications</CardTitle><CardDescription className="text-blue-600">Latest candidate applications received</CardDescription></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentApplications.map((app) => (
                                <div key={app.id} className="flex items-center space-x-4">
                                    <Avatar><AvatarImage src={app.avatar} alt={app.name} /><AvatarFallback className="bg-blue-500 text-white">{app.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                                    <div className="flex-1 space-y-1"><p className="text-sm font-medium text-blue-900">{app.name}</p><p className="text-sm text-blue-600">{app.position}</p></div>
                                    <div className="text-right"><Badge className={app.statusColor}>{app.status}</Badge><p className="text-xs text-blue-600 mt-1">{app.appliedDate}</p></div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-blue-200">
                    <CardHeader><CardTitle className="text-blue-900">Upcoming Interviews</CardTitle><CardDescription className="text-blue-600">Scheduled interviews for today and tomorrow</CardDescription></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingInterviews.map((interview) => (
                                <div key={interview.id} className="flex items-center space-x-4">
                                    <Avatar><AvatarImage src={interview.avatar} alt={interview.candidate} /><AvatarFallback className="bg-orange-500 text-white">{interview.candidate.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                                    <div className="flex-1 space-y-1"><p className="text-sm font-medium text-blue-900">{interview.candidate}</p><p className="text-sm text-blue-600">{interview.position}</p><p className="text-xs text-orange-600">{interview.type}</p></div>
                                    <div className="text-right"><p className="text-sm font-medium text-blue-900">{interview.time}</p><p className="text-xs text-blue-600">{interview.date}</p></div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function CandidateBrowser({ viewMode, setViewMode }: any) {
    // This component is complete and correct from previous steps.
    const [searchTerm, setSearchTerm] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("all")
    const [location, setLocation] = useState("all")

    const candidates = [
        { id: 1, name: "Priya Sharma", title: "Senior Frontend Developer", location: "Bengaluru, KA", experience: "5+ years", skills: ["React", "TypeScript", "Node.js", "GraphQL"], status: "Available", avatar: "/placeholder-0mkvw.png", rating: 4.8, salary: "₹25-30 LPA", education: "B.Tech CS, IIT Bombay" },
        { id: 2, name: "Rohan Gupta", title: "Data Scientist", location: "Hyderabad, TS", experience: "3+ years", skills: ["Python", "Machine Learning", "SQL", "TensorFlow"], status: "Interviewing", avatar: "/placeholder-s6jev.png", rating: 4.6, salary: "₹18-22 LPA", education: "M.Tech AI, BITS Pilani" },
        { id: 3, name: "Ananya Reddy", title: "UX Designer", location: "Pune, MH", experience: "4+ years", skills: ["Figma", "User Research", "Prototyping"], status: "Available", avatar: "/placeholder-4fie5.png", rating: 4.9, salary: "₹15-20 LPA", education: "B.Des, NID Ahmedabad" },
        { id: 4, name: "Vikram Singh", title: "Backend Developer", location: "Gurugram, HR", experience: "6+ years", skills: ["Java", "Spring Boot", "AWS", "Docker"], status: "Not Available", avatar: "/david-backend-developer.jpg", rating: 4.7, salary: "₹28-35 LPA", education: "B.E. CSE, NIT Trichy" },
    ]

    const filteredCandidates = candidates.filter(c => 
        (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (experienceLevel === "all" || c.experience.startsWith(experienceLevel.charAt(0))) &&
        (location === "all" || c.location.toLowerCase().includes(location.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div><h1 className="text-3xl font-bold text-blue-900">Candidate Browser</h1><p className="text-blue-700">Discover and connect with top talent from India</p></div>
                <div className="flex items-center space-x-2">
                    <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className={viewMode === 'grid' ? 'bg-orange-500 hover:bg-orange-600' : 'border-blue-300 text-blue-700 hover:bg-blue-50'}><Grid3X3 className="h-4 w-4" /></Button>
                    <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")} className={viewMode === 'list' ? 'bg-orange-500 hover:bg-orange-600' : 'border-blue-300 text-blue-700 hover:bg-blue-50'}><List className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="border-blue-200">
                <CardHeader><CardTitle className="text-blue-900 flex items-center gap-2"><Filter className="h-5 w-5" /> Filters</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Search by name, role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-blue-200 focus:border-orange-500 focus:ring-orange-500" />
                        <Select value={experienceLevel} onValueChange={setExperienceLevel}><SelectTrigger className="border-blue-200 focus:border-orange-500"><SelectValue placeholder="Experience" /></SelectTrigger><SelectContent><SelectItem value="all">All Experience</SelectItem><SelectItem value="0-2">0-2 years</SelectItem><SelectItem value="3-5">3-5 years</SelectItem><SelectItem value="5+">5+ years</SelectItem></SelectContent></Select>
                        <Select value={location} onValueChange={setLocation}><SelectTrigger className="border-blue-200 focus:border-orange-500"><SelectValue placeholder="Location" /></SelectTrigger><SelectContent><SelectItem value="all">All Locations</SelectItem><SelectItem value="bengaluru">Bengaluru</SelectItem><SelectItem value="hyderabad">Hyderabad</SelectItem><SelectItem value="pune">Pune</SelectItem><SelectItem value="gurugram">Gurugram</SelectItem></SelectContent></Select>
                    </div>
                </CardContent>
            </Card>
            <p className="text-blue-700">Showing {filteredCandidates.length} of {candidates.length} candidates</p>
            {viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCandidates.map((c) => (<CandidateCard key={c.id} candidate={c} />))}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredCandidates.map((c) => (<CandidateListItem key={c.id} candidate={c} />))}
                </div>
            )}
        </div>
    )
}

function CandidateCard({ candidate }: { candidate: any }) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Available": return "bg-green-100 text-green-800"
        case "Interviewing": return "bg-blue-100 text-blue-800"
        case "Not Available": return "bg-gray-100 text-gray-800"
        default: return "bg-gray-100 text-gray-800"
      }
    }
  
    return (
      <Card className="group hover:shadow-lg transition-shadow border-blue-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12"><AvatarImage src={candidate.avatar} alt={candidate.name} /><AvatarFallback className="bg-blue-500 text-white">{candidate.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback></Avatar>
              <div><h3 className="font-semibold text-blue-900">{candidate.name}</h3><p className="text-sm text-blue-600">{candidate.title}</p></div>
            </div>
            <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-sm text-blue-600"><MapPin className="h-4 w-4 mr-1.5" />{candidate.location}</div>
          <div className="flex items-center text-sm text-blue-600"><Briefcase className="h-4 w-4 mr-1.5" />{candidate.experience}</div>
          <div className="flex items-center text-sm text-blue-600"><DollarSign className="h-4 w-4 mr-1.5" />{candidate.salary}</div>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill: string) => (<Badge key={skill} variant="secondary" className="text-xs bg-orange-100 text-orange-800">{skill}</Badge>))}
            {candidate.skills.length > 3 && (<Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">+{candidate.skills.length - 3}</Badge>)}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-blue-600"><Star className="h-4 w-4 mr-1 fill-orange-400 text-orange-400" />{candidate.rating}</div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"><Eye className="h-4 w-4" /></Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white"><Mail className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}
  
function CandidateListItem({ candidate }: { candidate: any }) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Available": return "bg-green-100 text-green-800"
        case "Interviewing": return "bg-blue-100 text-blue-800"
        case "Not Available": return "bg-gray-100 text-gray-800"
        default: return "bg-gray-100 text-gray-800"
      }
    }
  
    return (
      <Card className="border-blue-200">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-4">
            <div className="flex items-center space-x-4 md:col-span-1 lg:col-span-1">
                <Avatar className="h-12 w-12"><AvatarImage src={candidate.avatar} alt={candidate.name} /><AvatarFallback className="bg-blue-500 text-white">{candidate.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback></Avatar>
                <div><h3 className="font-semibold text-blue-900">{candidate.name}</h3><p className="text-blue-600 text-sm">{candidate.title}</p></div>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:col-span-2 lg:col-span-1">
                {candidate.skills.map((skill: string) => (<Badge key={skill} variant="secondary" className="text-xs bg-orange-100 text-orange-800">{skill}</Badge>))}
            </div>
            <div className="text-sm text-blue-600 lg:col-span-1">
                <p><span className="font-medium text-blue-800">Salary:</span> {candidate.salary}</p>
                <p><span className="font-medium text-blue-800">Education:</span> {candidate.education}</p>
            </div>
            <div className="flex items-center justify-start md:justify-end space-x-4 lg:col-span-1">
                <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                <div className="flex space-x-2"><Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"><Eye className="h-4 w-4" /></Button><Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white"><Mail className="h-4 w-4" /></Button></div>
            </div>
        </CardContent>
    </Card>
)}

// ... Other components follow ...
function ApplicationManagement() {
    const applications = [
        { id: 1, candidateName: "Priya Sharma", position: "Frontend Developer", appliedDate: "2025-09-15", status: "Interview Scheduled", stage: "Technical Interview", progress: 75, avatar: "/placeholder-0mkvw.png", email: "priya.sharma@example.com", phone: "+91 9876543210", priority: "high" },
        { id: 2, candidateName: "Rohan Gupta", position: "Data Scientist", appliedDate: "2025-09-14", status: "Under Review", stage: "Resume Review", progress: 25, avatar: "/placeholder-s6jev.png", email: "rohan.gupta@example.com", phone: "+91 9876543211", priority: "medium" },
        { id: 3, candidateName: "Ananya Reddy", position: "UX Designer", appliedDate: "2025-09-12", status: "Shortlisted", stage: "Portfolio Review", progress: 50, avatar: "/placeholder-4fie5.png", email: "ananya.reddy@example.com", phone: "+91 9876543212", priority: "high" },
        { id: 4, candidateName: "Vikram Singh", position: "Backend Developer", appliedDate: "2025-09-11", status: "New Application", stage: "Initial Review", progress: 10, avatar: "/david-backend-developer.jpg", email: "vikram.singh@example.com", phone: "+91 9876543213", priority: "low" },
    ];
    const getStatusColor = (s: string) => ({ "New Application": "bg-gray-100 text-gray-800", "Under Review": "bg-orange-100 text-orange-800", "Shortlisted": "bg-yellow-100 text-yellow-800", "Interview Scheduled": "bg-blue-100 text-blue-800", "Rejected": "bg-red-100 text-red-800" }[s] || "bg-gray-100 text-gray-800");
    const getPriorityColor = (p: string) => ({ "high": "bg-red-100 text-red-800", "medium": "bg-orange-100 text-orange-800", "low": "bg-green-100 text-green-800" }[p] || "bg-gray-100");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div><h1 className="text-3xl font-bold text-blue-900">Application Management</h1><p className="text-blue-700">Track candidates through your hiring pipeline</p></div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white"><Plus className="h-4 w-4 mr-2" />Add Application</Button>
            </div>
            <div className="space-y-4">
                {applications.map(app => (
                    <Card key={app.id} className="border-blue-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                <div className="flex items-start space-x-4 flex-1 min-w-0">
                                    <Avatar className="h-12 w-12"><AvatarImage src={app.avatar} alt={app.candidateName} /><AvatarFallback className="bg-blue-500 text-white">{app.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                                    <div className="flex-1 min-w-0"><div className="flex items-center flex-wrap gap-2 mb-1"><h3 className="font-semibold text-blue-900 truncate">{app.candidateName}</h3><Badge className={getStatusColor(app.status)}>{app.status}</Badge><Badge className={getPriorityColor(app.priority)}>{app.priority} priority</Badge></div><p className="text-blue-600 mb-2">{app.position}</p></div>
                                </div>
                                <div className="flex space-x-2 self-start sm:self-center"><Button size="sm" variant="outline" className="border-blue-300 text-blue-700"><Eye className="h-4 w-4" /></Button><Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white"><Mail className="h-4 w-4" /></Button></div>
                            </div>
                            <div className="mt-4"><div className="flex items-center justify-between mb-1"><span className="text-sm font-medium text-blue-900">Progress</span><span className="text-sm text-blue-600">{app.progress}%</span></div><Progress value={app.progress} className="h-2" /><p className="text-xs text-blue-600 mt-1">Stage: {app.stage}</p></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function InterviewScheduler() {
    const interviews = [
        { id: 1, candidateName: "Priya Sharma", position: "Frontend Developer", date: "2025-09-20", time: "11:00 AM", duration: "60 mins", type: "Technical Interview", status: "Scheduled", interviewer: "Amit Desai", avatar: "/placeholder-0mkvw.png" },
        { id: 2, candidateName: "Aditya Verma", position: "Senior React Developer", date: "2025-09-16", time: "10:00 AM", duration: "45 mins", type: "Technical Interview", status: "Completed", interviewer: "Sunita Rao", avatar: "/placeholder-0mkvw.png" },
        { id: 3, candidateName: "Isha Kapoor", position: "Product Manager", date: "2025-09-17", time: "2:30 PM", duration: "30 mins", type: "HR Round", status: "Scheduled", interviewer: "Ravi Kumar", avatar: "/placeholder-s6jev.png" },
    ]
    const getStatusColor = (s: string) => ({ "Scheduled": "bg-blue-100 text-blue-800", "Completed": "bg-green-100 text-green-800", "Cancelled": "bg-red-100 text-red-800" }[s] || "");

    return (
        <div className="space-y-6">
            <div><h1 className="text-3xl font-bold text-blue-900">Interview Scheduler</h1><p className="text-blue-700">Manage and track all candidate interviews</p></div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {interviews.map(interview => (
                    <Card key={interview.id} className="border-blue-200">
                        <CardHeader><div className="flex items-start justify-between"><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={interview.avatar} /><AvatarFallback className="bg-blue-500 text-white">{interview.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar><div><h3 className="font-semibold text-blue-900">{interview.candidateName}</h3><p className="text-sm text-blue-600">{interview.position}</p></div></div><Badge className={getStatusColor(interview.status)}>{interview.status}</Badge></div></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm text-blue-600 border-t border-blue-100 pt-4">
                                <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-orange-500" /><span>{new Date(interview.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                                <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-orange-500" /><span>{interview.time} ({interview.duration})</span></div>
                                <div className="flex items-center col-span-2"><UserCheck className="h-4 w-4 mr-2 text-orange-500" /><span>Interviewer: {interview.interviewer}</span></div>
                            </div>
                            <div className="flex space-x-2 pt-2">
                                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700"><Video className="h-4 w-4 mr-1" />Join Call</Button>
                                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700"><Edit className="h-4 w-4 mr-1" />Reschedule</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function AnalyticsDashboard() {
    const metrics = [
      { name: "Total Applications", value: "2,651", change: "+12.5%", trend: "up", icon: FileText, color: "text-blue-600" },
      { name: "Conversion Rate", value: "2.1%", change: "+0.3%", trend: "up", icon: TrendingUp, color: "text-green-600" },
      { name: "Time to Hire", value: "24 days", change: "-3 days", trend: "down", icon: Clock, color: "text-orange-600" },
      { name: "Cost per Hire", value: "₹2,15,000", change: "-₹15,000", trend: "down", icon: DollarSign, color: "text-purple-600" },
    ]
    const hiringFunnelData = [
        { stage: "Applications", count: 2651, percentage: 100 },
        { stage: "Screening", count: 1325, percentage: 50 },
        { stage: "Interview", count: 530, percentage: 20 },
        { stage: "Offers", count: 66, percentage: 2.5 },
        { stage: "Hired", count: 53, percentage: 2 },
    ]
    const sourceData = [
        { source: "Naukri.com", applications: 1100, hires: 22, rate: "2.0%" },
        { source: "LinkedIn", applications: 850, hires: 18, rate: "2.1%" },
        { source: "Employee Referrals", applications: 350, hires: 9, rate: "2.6%" },
        { source: "Company Careers Page", applications: 351, hires: 4, rate: "1.1%" },
    ]
    return (
        <div className="space-y-6">
            <div><h1 className="text-3xl font-bold text-blue-900">Analytics Dashboard</h1><p className="text-blue-700">Track your recruitment performance and key metrics</p></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{metrics.map(m => (<Card key={m.name} className="border-blue-200"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-blue-900">{m.name}</CardTitle><m.icon className={`h-4 w-4 ${m.color}`} /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-900">{m.value}</div><p className="text-xs text-blue-600 flex items-center">{m.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1 text-green-600" /> : <TrendingDown className="h-3 w-3 mr-1 text-red-600" />}<span className={m.trend === 'up' ? 'text-green-600' : 'text-red-600'}>{m.change}</span></p></CardContent></Card>))}</div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-900">Hiring Funnel</CardTitle></CardHeader><CardContent className="space-y-4">{hiringFunnelData.map(stage => (<div key={stage.stage}><div className="flex justify-between text-sm mb-1"><span className="font-medium text-blue-800">{stage.stage}</span><span className="text-blue-600">{stage.count}</span></div><Progress value={stage.percentage} /></div>))}</CardContent></Card>
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-900">Source Performance</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-blue-200"><th className="text-left py-2 font-medium">Source</th><th className="text-right py-2 font-medium">Applications</th><th className="text-right py-2 font-medium">Hires</th><th className="text-right py-2 font-medium">Conv. Rate</th></tr></thead><tbody>{sourceData.map(s => (<tr key={s.source} className="border-b border-blue-100 last:border-0"><td className="py-2 font-medium text-blue-900">{s.source}</td><td className="text-right py-2 text-blue-600">{s.applications}</td><td className="text-right py-2 text-blue-600">{s.hires}</td><td className="text-right py-2 text-blue-600 font-medium">{s.rate}</td></tr>))}</tbody></table></div></CardContent></Card>
            </div>
        </div>
    )
}

function CommunicationCenter({ selectedMessage, setSelectedMessage }: any) {
    const conversations = [
        { id: 1, candidateName: "Priya Sharma", position: "Frontend Developer", lastMessage: "Thank you! Tuesday at 2 PM works perfectly.", timestamp: "1 hour ago", unread: true, avatar: "/placeholder-0mkvw.png" },
        { id: 2, candidateName: "Rohan Gupta", position: "Data Scientist", lastMessage: "Assessment submitted. Please let me know the next steps.", timestamp: "5 hours ago", unread: false, avatar: "/placeholder-s6jev.png" },
        { id: 3, candidateName: "Ananya Reddy", position: "UX Designer", lastMessage: "Here is the link to my updated portfolio.", timestamp: "1 day ago", unread: false, avatar: "/placeholder-4fie5.png" },
    ];
    const messages = [
        { id: 1, sender: "Priya Sharma", content: "That sounds great! I'm available Monday through Wednesday. What time works best?", timestamp: "11:20 AM", isCandidate: true },
        { id: 2, sender: "You", content: "Perfect! How about Tuesday at 2:00 PM IST? I'll send the Google Meet link shortly.", timestamp: "11:25 AM", isCandidate: false },
        { id: 3, sender: "Priya Sharma", content: "Thank you! Tuesday at 2 PM works perfectly.", timestamp: "12:05 PM", isCandidate: true },
    ];
    const selectedConversation = conversations.find(c => c.id === selectedMessage);

    return (
        <div className="space-y-6">
            <div><h1 className="text-3xl font-bold text-blue-900">Communication Center</h1><p className="text-blue-700">Manage all candidate communications in one place</p></div>
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="border-blue-200 lg:col-span-1 h-[75vh] flex flex-col"><CardHeader><CardTitle className="text-blue-900">Conversations</CardTitle></CardHeader><CardContent className="p-0 flex-1 overflow-y-auto">{conversations.map(c => (<button key={c.id} onClick={() => setSelectedMessage(c.id)} className={`w-full p-4 text-left hover:bg-blue-50 transition-colors ${selectedMessage === c.id ? "bg-blue-100 border-r-2 border-orange-500" : ""}`}><div className="flex items-start space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={c.avatar} alt={c.candidateName} /><AvatarFallback className="bg-blue-500 text-white">{c.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar><div className="flex-1 min-w-0"><div className="flex items-center justify-between"><p className="font-medium text-blue-900 truncate">{c.candidateName}</p>{c.unread && <div className="w-2 h-2 bg-orange-500 rounded-full" />}</div><p className="text-sm text-blue-600 truncate">{c.position}</p><p className="text-sm text-blue-500 truncate mt-1">{c.lastMessage}</p></div></div></button>))}</CardContent></Card>
                <Card className="lg:col-span-2 border-blue-200 h-[75vh] flex flex-col">
                    {selectedConversation ? (<>
                        <CardHeader><div className="flex items-center justify-between"><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={selectedConversation.avatar} alt={selectedConversation.candidateName} /><AvatarFallback className="bg-blue-500 text-white">{selectedConversation.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar><div><h3 className="font-semibold text-blue-900">{selectedConversation.candidateName}</h3><p className="text-sm text-blue-600">{selectedConversation.position}</p></div></div><Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50"><MoreHorizontal className="h-4 w-4" /></Button></div></CardHeader>
                        <CardContent className="flex-1 overflow-y-auto space-y-4 p-4 bg-blue-50"><div className="space-y-4">{messages.map(m => (<div key={m.id} className={`flex ${m.isCandidate ? "justify-start" : "justify-end"}`}><div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${m.isCandidate ? "bg-white text-blue-900 border border-blue-200" : "bg-orange-500 text-white"}`}><p className="text-sm">{m.content}</p><p className={`text-xs mt-1 ${m.isCandidate ? "text-blue-500" : "text-orange-100"}`}>{m.timestamp}</p></div></div>))}</div></CardContent>
                        <div className="p-4 border-t border-blue-200"><div className="relative"><Textarea placeholder="Type your message..." className="pr-20 border-blue-200 focus:border-orange-500 focus:ring-orange-500" /><div className="absolute top-2 right-2 flex space-x-1"><Button size="icon" variant="ghost" className="text-blue-600 hover:text-orange-600 hover:bg-orange-100"><Paperclip className="h-4 w-4" /></Button><Button size="icon" className="bg-orange-500 hover:bg-orange-600 text-white"><Send className="h-4 w-4" /></Button></div></div></div>
                    </>) : (<div className="flex items-center justify-center h-full text-blue-600"><div className="text-center"><MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-400" /><p>Select a conversation to start messaging</p></div></div>)}
                </Card>
            </div>
        </div>
    )
}