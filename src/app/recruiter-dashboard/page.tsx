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
  Menu,
  X,
  Search,
  Bell,
  Users,
  FileText,
  Calendar,
  BarChart3,
  MessageSquare,
  Home,
  Filter,
  Grid3X3,
  List,
  Plus,
  Eye,
  Edit,
  Download,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Send,
  Paperclip,
  MoreHorizontal,
  Star,
  Building,
  Briefcase,
  DollarSign,
  UserCheck,
  Video,
  Award,
  Activity,
} from "lucide-react"

export default function RecruitmentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1)

  const navigation = [
    { name: "Overview", id: "overview", icon: Home, current: true },
    { name: "Candidates", id: "candidates", icon: Users, badge: "12" },
    { name: "Applications", id: "applications", icon: FileText, badge: "8" },
    { name: "Interviews", id: "interviews", icon: Calendar, badge: "3" },
    { name: "Analytics", id: "analytics", icon: BarChart3 },
    { name: "Messages", id: "messages", icon: MessageSquare, badge: "5" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-blue-900 border-r border-blue-800">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-white">Vidyarthi Recruit</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-blue-800"
            >
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
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-blue-900 hover:bg-blue-100"
            onClick={() => setSidebarOpen(true)}
          >
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
                  <AvatarFallback className="bg-orange-500 text-white">RH</AvatarFallback>
                </Avatar>
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-4 text-sm font-medium text-blue-900" aria-hidden="true">
                    Rebecca Smith
                  </span>
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
            {activeTab === "messages" && (
              <CommunicationCenter selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />
            )}
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
                    activeTab === item.id
                      ? "bg-orange-500 text-white"
                      : "text-blue-100 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-800">
                      {item.badge}
                    </Badge>
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
  const stats = [
    {
      name: "Total Applications",
      value: "2,651",
      change: "+4.75%",
      icon: FileText,
    },
    {
      name: "Active Candidates",
      value: "1,423",
      change: "+54.02%",
      icon: Users,
    },
    {
      name: "Interviews Scheduled",
      value: "89",
      change: "-1.39%",
      icon: Calendar,
    },
    {
      name: "Positions Filled",
      value: "12",
      change: "+10.18%",
      icon: CheckCircle,
    },
  ]

  const recentApplications = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Frontend Developer",
      status: "Interview Scheduled",
      statusColor: "bg-blue-100 text-blue-800",
      avatar: "/placeholder-0mkvw.png",
      appliedDate: "2 hours ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Data Scientist",
      status: "Under Review",
      statusColor: "bg-orange-100 text-orange-800",
      avatar: "/placeholder-s6jev.png",
      appliedDate: "4 hours ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "UX Designer",
      status: "Shortlisted",
      statusColor: "bg-green-100 text-green-800",
      avatar: "/placeholder-4fie5.png",
      appliedDate: "1 day ago",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Backend Developer",
      status: "New Application",
      statusColor: "bg-blue-100 text-blue-800",
      avatar: "/david-backend-developer.jpg",
      appliedDate: "2 days ago",
    },
  ]

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Alex Thompson",
      position: "Senior React Developer",
      time: "10:00 AM",
      date: "Today",
      type: "Technical Interview",
      avatar: "/placeholder-0mkvw.png",
    },
    {
      id: 2,
      candidate: "Maria Garcia",
      position: "Product Manager",
      time: "2:30 PM",
      date: "Today",
      type: "Final Interview",
      avatar: "/placeholder-s6jev.png",
    },
    {
      id: 3,
      candidate: "James Wilson",
      position: "DevOps Engineer",
      time: "11:00 AM",
      date: "Tomorrow",
      type: "Initial Screening",
      avatar: "/placeholder-4fie5.png",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Dashboard Overview</h1>
        <p className="text-blue-700">Welcome back! Here's what's happening with your recruitment pipeline.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
              <p className="text-xs text-blue-600">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications and Upcoming Interviews */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Recent Applications</CardTitle>
            <CardDescription className="text-blue-600">Latest candidate applications received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.name} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {application.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-blue-900">{application.name}</p>
                    <p className="text-sm text-blue-600">{application.position}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={application.statusColor}>{application.status}</Badge>
                    <p className="text-xs text-blue-600 mt-1">{application.appliedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Upcoming Interviews</CardTitle>
            <CardDescription className="text-blue-600">Scheduled interviews for today and tomorrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.candidate} />
                    <AvatarFallback className="bg-orange-500 text-white">
                      {interview.candidate
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-blue-900">{interview.candidate}</p>
                    <p className="text-sm text-blue-600">{interview.position}</p>
                    <p className="text-xs text-orange-600">{interview.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-900">{interview.time}</p>
                    <p className="text-xs text-blue-600">{interview.date}</p>
                  </div>
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState("all")
  const [location, setLocation] = useState("all")

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "5+ years",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      status: "Available",
      avatar: "/placeholder-0mkvw.png",
      rating: 4.8,
      lastActive: "2 hours ago",
      salary: "$120k - $140k",
      education: "BS Computer Science, Stanford",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Data Scientist",
      location: "New York, NY",
      experience: "3+ years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      status: "Interviewing",
      avatar: "/placeholder-s6jev.png",
      rating: 4.6,
      lastActive: "1 day ago",
      salary: "$110k - $130k",
      education: "MS Data Science, MIT",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Designer",
      location: "Austin, TX",
      experience: "4+ years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      status: "Available",
      avatar: "/placeholder-4fie5.png",
      rating: 4.9,
      lastActive: "30 minutes ago",
      salary: "$95k - $115k",
      education: "BFA Design, RISD",
    },
    {
      id: 4,
      name: "David Kim",
      title: "Backend Developer",
      location: "Seattle, WA",
      experience: "6+ years",
      skills: ["Java", "Spring Boot", "AWS", "Docker"],
      status: "Not Available",
      avatar: "/david-backend-developer.jpg",
      rating: 4.7,
      lastActive: "1 week ago",
      salary: "$130k - $150k",
      education: "MS Computer Science, UW",
    },
  ]

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some((skill) => candidate.skills.includes(skill))
    const matchesExperience = experienceLevel === "all" || candidate.experience.includes(experienceLevel)
    const matchesLocation = location === "all" || candidate.location.toLowerCase().includes(location.toLowerCase())

    return matchesSearch && matchesSkills && matchesExperience && matchesLocation
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Candidate Browser</h1>
          <p className="text-blue-700">Discover and connect with top talent</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={
              viewMode === "grid"
                ? "bg-orange-500 hover:bg-orange-600"
                : "border-blue-300 text-blue-700 hover:bg-blue-50"
            }
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={
              viewMode === "list"
                ? "bg-orange-500 hover:bg-orange-600"
                : "border-blue-300 text-blue-700 hover:bg-blue-50"
            }
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger className="w-40 border-blue-200 focus:border-orange-500">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-40 border-blue-200 focus:border-orange-500">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-blue-700">
          Showing {filteredCandidates.length} of {candidates.length} candidates
        </p>
      </div>

      {/* Candidates Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <CandidateListItem key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  )
}

function CandidateCard({ candidate }: { candidate: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Interviewing":
        return "bg-blue-100 text-blue-800"
      case "Not Available":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
              <AvatarFallback className="bg-blue-500 text-white">
                {candidate.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-blue-900">{candidate.name}</h3>
              <p className="text-sm text-blue-600">{candidate.title}</p>
            </div>
          </div>
          <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-blue-600">
          <MapPin className="h-4 w-4 mr-1" />
          {candidate.location}
        </div>
        <div className="flex items-center text-sm text-blue-600">
          <Briefcase className="h-4 w-4 mr-1" />
          {candidate.experience}
        </div>
        <div className="flex items-center text-sm text-blue-600">
          <DollarSign className="h-4 w-4 mr-1" />
          {candidate.salary}
        </div>
        <div className="flex flex-wrap gap-1">
          {candidate.skills.slice(0, 3).map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-xs bg-orange-100 text-orange-800">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              +{candidate.skills.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-blue-600">
            <Star className="h-4 w-4 mr-1 fill-orange-400 text-orange-400" />
            {candidate.rating}
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CandidateListItem({ candidate }: { candidate: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Interviewing":
        return "bg-blue-100 text-blue-800"
      case "Not Available":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
              <AvatarFallback className="bg-blue-500 text-white">
                {candidate.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-blue-900">{candidate.name}</h3>
                <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
              </div>
              <p className="text-blue-600">{candidate.title}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-blue-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {candidate.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {candidate.experience}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {candidate.salary}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-orange-400 text-orange-400" />
                  {candidate.rating}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 4).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ApplicationManagement() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPosition, setSelectedPosition] = useState("all")

  const applications = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Frontend Developer",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled",
      stage: "Technical Interview",
      progress: 75,
      avatar: "/placeholder-0mkvw.png",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      resume: "sarah_johnson_resume.pdf",
      coverLetter: "sarah_johnson_cover.pdf",
      notes: "Strong React skills, good cultural fit",
      nextAction: "Technical interview on Jan 20",
      priority: "high",
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      position: "Data Scientist",
      appliedDate: "2024-01-14",
      status: "Under Review",
      stage: "Resume Review",
      progress: 25,
      avatar: "/placeholder-s6jev.png",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      resume: "michael_chen_resume.pdf",
      coverLetter: "michael_chen_cover.pdf",
      notes: "PhD in Machine Learning, 5 years experience",
      nextAction: "Schedule phone screening",
      priority: "medium",
    },
    {
      id: 3,
      candidateName: "Emily Rodriguez",
      position: "UX Designer",
      appliedDate: "2024-01-13",
      status: "Shortlisted",
      stage: "Portfolio Review",
      progress: 50,
      avatar: "/placeholder-4fie5.png",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      resume: "emily_rodriguez_resume.pdf",
      coverLetter: "emily_rodriguez_cover.pdf",
      notes: "Excellent portfolio, strong design thinking",
      nextAction: "Design challenge review",
      priority: "high",
    },
    {
      id: 4,
      candidateName: "David Kim",
      position: "Backend Developer",
      appliedDate: "2024-01-12",
      status: "New Application",
      stage: "Initial Review",
      progress: 10,
      avatar: "/david-backend-developer.jpg",
      email: "david.kim@email.com",
      phone: "+1 (555) 456-7890",
      resume: "david_kim_resume.pdf",
      coverLetter: "david_kim_cover.pdf",
      notes: "Senior developer with microservices experience",
      nextAction: "Initial resume review",
      priority: "medium",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New Application":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-orange-100 text-orange-800"
      case "Shortlisted":
        return "bg-green-100 text-green-800"
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus
    const matchesPosition = selectedPosition === "all" || app.position === selectedPosition
    return matchesStatus && matchesPosition
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Application Management</h1>
          <p className="text-blue-700">Track and manage candidate applications through your hiring pipeline</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 border-blue-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40 border-blue-200 focus:border-orange-500">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New Application</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="interview">Interview Scheduled</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                <SelectTrigger className="w-40 border-blue-200 focus:border-orange-500">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="backend">Backend Developer</SelectItem>
                  <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                  <SelectItem value="designer">UX Designer</SelectItem>
                  <SelectItem value="data">Data Scientist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.candidateName} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {application.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-blue-900">{application.candidateName}</h3>
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                      <Badge className={getPriorityColor(application.priority)}>{application.priority} priority</Badge>
                    </div>
                    <p className="text-blue-600 mb-2">{application.position}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-blue-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Applied: {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {application.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {application.phone}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Next: {application.nextAction}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">Application Progress</span>
                  <span className="text-sm text-blue-600">{application.progress}%</span>
                </div>
                <Progress value={application.progress} className="h-2" />
                <p className="text-xs text-blue-600 mt-1">Current stage: {application.stage}</p>
              </div>

              {/* Notes */}
              {application.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">{application.notes}</p>
                </div>
              )}

              {/* Documents */}
              <div className="mt-4 flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Resume
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Cover Letter
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function InterviewScheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedType, setSelectedType] = useState("all")

  const interviews = [
    {
      id: 1,
      candidateName: "Alex Thompson",
      position: "Senior React Developer",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "60 minutes",
      type: "Technical Interview",
      status: "Scheduled",
      interviewer: "John Smith",
      location: "Conference Room A",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      avatar: "/placeholder-0mkvw.png",
      notes: "Focus on React hooks and state management",
      preparation: ["Review candidate's portfolio", "Prepare coding challenges", "Set up development environment"],
    },
    {
      id: 2,
      candidateName: "Maria Garcia",
      position: "Product Manager",
      date: "2024-01-20",
      time: "2:30 PM",
      duration: "45 minutes",
      type: "Final Interview",
      status: "Scheduled",
      interviewer: "Sarah Wilson",
      location: "Virtual",
      meetingLink: "https://zoom.us/j/123456789",
      avatar: "/placeholder-s6jev.png",
      notes: "Final round with leadership team",
      preparation: ["Review previous interview feedback", "Prepare behavioral questions", "Discuss compensation"],
    },
    {
      id: 3,
      candidateName: "James Wilson",
      position: "DevOps Engineer",
      date: "2024-01-21",
      time: "11:00 AM",
      duration: "30 minutes",
      type: "Initial Screening",
      status: "Scheduled",
      interviewer: "Mike Johnson",
      location: "Phone",
      meetingLink: null,
      avatar: "/placeholder-4fie5.png",
      notes: "Initial phone screening",
      preparation: ["Review resume", "Prepare screening questions", "Check availability for next rounds"],
    },
    {
      id: 4,
      candidateName: "Lisa Chen",
      position: "UX Designer",
      date: "2024-01-19",
      time: "3:00 PM",
      duration: "90 minutes",
      type: "Design Review",
      status: "Completed",
      interviewer: "Emma Davis",
      location: "Conference Room B",
      meetingLink: null,
      avatar: "/placeholder-0mkvw.png",
      notes: "Portfolio review went well, strong design thinking",
      preparation: ["Portfolio reviewed", "Design challenge completed", "Team feedback collected"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Rescheduled":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Technical Interview":
        return <Building className="h-4 w-4" />
      case "Initial Screening":
        return <Phone className="h-4 w-4" />
      case "Final Interview":
        return <Award className="h-4 w-4" />
      case "Design Review":
        return <Eye className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const filteredInterviews = interviews.filter((interview) => {
    return selectedType === "all" || interview.type === selectedType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Interview Scheduler</h1>
          <p className="text-blue-700">Manage and track all candidate interviews</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                <Input
                  placeholder="Search interviews..."
                  className="pl-10 border-blue-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 border-blue-200 focus:border-orange-500">
                  <SelectValue placeholder="Interview Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="screening">Initial Screening</SelectItem>
                  <SelectItem value="technical">Technical Interview</SelectItem>
                  <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                  <SelectItem value="final">Final Interview</SelectItem>
                  <SelectItem value="design">Design Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="border-blue-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.candidateName} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {interview.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-blue-900">{interview.candidateName}</h3>
                    <p className="text-sm text-blue-600">{interview.position}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                {getTypeIcon(interview.type)}
                <span className="font-medium">{interview.type}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-blue-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(interview.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {interview.time}
                </div>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  {interview.duration}
                </div>
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-1" />
                  {interview.interviewer}
                </div>
              </div>

              <div className="flex items-center text-sm text-blue-600">
                <MapPin className="h-4 w-4 mr-1" />
                {interview.location}
              </div>

              {interview.meetingLink && (
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-orange-500" />
                  <a href={interview.meetingLink} className="text-sm text-orange-600 hover:text-orange-800 underline">
                    Join Meeting
                  </a>
                </div>
              )}

              {interview.notes && (
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">{interview.notes}</p>
                </div>
              )}

              {interview.preparation && interview.preparation.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Preparation Checklist:</h4>
                  <ul className="space-y-1">
                    {interview.preparation.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-blue-600">
                        <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Mail className="h-4 w-4 mr-1" />
                  Send Reminder
                </Button>
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
    {
      name: "Total Applications",
      value: "2,651",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      name: "Conversion Rate",
      value: "24.3%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      name: "Time to Hire",
      value: "18 days",
      change: "-3 days",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      name: "Cost per Hire",
      value: "$3,240",
      change: "-$180",
      trend: "down",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  const hiringFunnelData = [
    { stage: "Applications", count: 2651, percentage: 100 },
    { stage: "Screening", count: 1325, percentage: 50 },
    { stage: "First Interview", count: 530, percentage: 20 },
    { stage: "Technical Test", count: 265, percentage: 10 },
    { stage: "Final Interview", count: 133, percentage: 5 },
    { stage: "Offers", count: 66, percentage: 2.5 },
    { stage: "Hired", count: 53, percentage: 2 },
  ]

  const sourceData = [
    { source: "LinkedIn", applications: 1200, hires: 25, cost: "$2,400" },
    { source: "Indeed", applications: 800, hires: 15, cost: "$1,600" },
    { source: "Company Website", applications: 400, hires: 8, cost: "$800" },
    { source: "Referrals", applications: 200, hires: 5, cost: "$400" },
    { source: "Other", applications: 51, hires: 0, cost: "$102" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Analytics Dashboard</h1>
        <p className="text-blue-700">Track your recruitment performance and key metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">{metric.name}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{metric.value}</div>
              <p className="text-xs text-blue-600 flex items-center">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
                )}
                <span className="text-green-600">{metric.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hiring Funnel */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Hiring Funnel</CardTitle>
          <CardDescription className="text-blue-600">
            Track candidates through each stage of your hiring process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hiringFunnelData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium text-blue-900">{stage.stage}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-blue-600">{stage.count} candidates</span>
                    <span className="text-sm text-blue-600">{stage.percentage}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Source Performance */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Source Performance</CardTitle>
          <CardDescription className="text-blue-600">
            Compare the effectiveness of different recruitment sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left py-2 text-blue-900 font-medium">Source</th>
                  <th className="text-right py-2 text-blue-900 font-medium">Applications</th>
                  <th className="text-right py-2 text-blue-900 font-medium">Hires</th>
                  <th className="text-right py-2 text-blue-900 font-medium">Conversion Rate</th>
                  <th className="text-right py-2 text-blue-900 font-medium">Cost per Hire</th>
                </tr>
              </thead>
              <tbody>
                {sourceData.map((source) => (
                  <tr key={source.source} className="border-b border-blue-100">
                    <td className="py-3 text-blue-900 font-medium">{source.source}</td>
                    <td className="py-3 text-right text-blue-600">{source.applications}</td>
                    <td className="py-3 text-right text-blue-600">{source.hires}</td>
                    <td className="py-3 text-right text-blue-600">
                      {((source.hires / source.applications) * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 text-right text-blue-600">{source.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Monthly Applications</CardTitle>
            <CardDescription className="text-blue-600">Application volume over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[2100, 2300, 2650, 2400, 2800, 2651].map((value, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-8 bg-gradient-to-t from-blue-500 to-orange-500 rounded-t"
                    style={{ height: `${(value / 3000) * 200}px` }}
                  />
                  <span className="text-xs text-blue-600">{value}</span>
                  <span className="text-xs text-blue-500">{["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"][index]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Top Positions</CardTitle>
            <CardDescription className="text-blue-600">Most popular job openings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { position: "Frontend Developer", applications: 450, percentage: 17 },
                { position: "Backend Developer", applications: 380, percentage: 14 },
                { position: "Data Scientist", applications: 320, percentage: 12 },
                { position: "UX Designer", applications: 280, percentage: 11 },
                { position: "Product Manager", applications: 220, percentage: 8 },
              ].map((position) => (
                <div key={position.position} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">{position.position}</p>
                    <p className="text-sm text-blue-600">{position.applications} applications</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-orange-600">{position.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CommunicationCenter({ selectedMessage, setSelectedMessage }: any) {
  const conversations = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Frontend Developer",
      lastMessage: "Thank you for the interview opportunity. I'm very excited about the role!",
      timestamp: "2 hours ago",
      unread: true,
      avatar: "/placeholder-0mkvw.png",
      status: "active",
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      position: "Data Scientist",
      lastMessage: "I've completed the technical assessment. Please let me know if you need anything else.",
      timestamp: "5 hours ago",
      unread: false,
      avatar: "/placeholder-s6jev.png",
      status: "active",
    },
    {
      id: 3,
      candidateName: "Emily Rodriguez",
      position: "UX Designer",
      lastMessage: "Could we reschedule the design review to next week?",
      timestamp: "1 day ago",
      unread: true,
      avatar: "/placeholder-4fie5.png",
      status: "active",
    },
    {
      id: 4,
      candidateName: "David Kim",
      position: "Backend Developer",
      lastMessage: "I have a few questions about the company culture and team structure.",
      timestamp: "2 days ago",
      unread: false,
      avatar: "/david-backend-developer.jpg",
      status: "active",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content:
        "Hi! Thank you so much for considering my application for the Frontend Developer position. I'm really excited about the opportunity to work with your team.",
      timestamp: "10:30 AM",
      isCandidate: true,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Hi Sarah! Thank you for your interest. I've reviewed your portfolio and I'm impressed with your React projects. Would you be available for a technical interview next week?",
      timestamp: "11:15 AM",
      isCandidate: false,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "That sounds great! I'm available Monday through Wednesday next week. What time works best for you?",
      timestamp: "11:20 AM",
      isCandidate: true,
    },
    {
      id: 4,
      sender: "You",
      content:
        "Perfect! How about Tuesday at 2:00 PM? The interview will be about 60 minutes and will include some coding challenges. I'll send you the meeting link shortly.",
      timestamp: "11:25 AM",
      isCandidate: false,
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content:
        "Tuesday at 2:00 PM works perfectly for me. Thank you for the interview opportunity. I'm very excited about the role!",
      timestamp: "2 hours ago",
      isCandidate: true,
    },
  ]

  const templates = [
    {
      name: "Interview Invitation",
      content: "Hi [Candidate Name], Thank you for your application. We'd like to invite you for an interview...",
    },
    {
      name: "Application Received",
      content:
        "Hi [Candidate Name], Thank you for applying to the [Position] role. We have received your application...",
    },
    {
      name: "Follow-up",
      content: "Hi [Candidate Name], I wanted to follow up on your application for the [Position] role...",
    },
    {
      name: "Rejection (Polite)",
      content:
        "Hi [Candidate Name], Thank you for your interest in the [Position] role. After careful consideration...",
    },
  ]

  const selectedConversation = conversations.find((c) => c.id === selectedMessage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Communication Center</h1>
        <p className="text-blue-700">Manage all candidate communications in one place</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Conversations</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedMessage(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-blue-50 transition-colors ${
                    selectedMessage === conversation.id ? "bg-blue-100 border-r-2 border-orange-500" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.candidateName} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {conversation.candidateName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-blue-900 truncate">{conversation.candidateName}</p>
                        {conversation.unread && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                      </div>
                      <p className="text-sm text-blue-600 truncate">{conversation.position}</p>
                      <p className="text-sm text-blue-500 truncate mt-1">{conversation.lastMessage}</p>
                      <p className="text-xs text-blue-400 mt-1">{conversation.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 border-blue-200">
          <CardHeader>
            {selectedConversation && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.avatar || "/placeholder.svg"}
                      alt={selectedConversation.candidateName}
                    />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {selectedConversation.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-blue-900">{selectedConversation.candidateName}</h3>
                    <p className="text-sm text-blue-600">{selectedConversation.position}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {selectedConversation ? (
              <div className="space-y-4">
                {/* Messages */}
                <div className="h-96 overflow-y-auto space-y-4 p-4 bg-blue-50 rounded-lg">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isCandidate ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isCandidate
                            ? "bg-white text-blue-900 border border-blue-200"
                            : "bg-orange-500 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isCandidate ? "text-blue-500" : "text-orange-100"}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-[80px] border-blue-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick Templates */}
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Quick Templates:</h4>
                  <div className="flex flex-wrap gap-2">
                    {templates.map((template) => (
                      <Button
                        key={template.name}
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        {template.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-blue-600">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
