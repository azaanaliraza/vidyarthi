"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  FileText,
  Calendar,
  CheckCircle,
  Eye,
  MessageSquare,
  Download,
  MoreHorizontal,
  ArrowRight,
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Star,
  Heart,
  Search,
  Grid3X3,
  List,
  Clock,
  Bell,
  Settings,
  Menu,
  X,
  Home,
  BarChart3,
} from "lucide-react"


export default function ConsolidatedRecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("overview")


  


  return (
    <div className="min-h-screen bg-background">
      {/* Main content */}
      <div>
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">


          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                className="block w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Search candidates, applications..."
                type="search"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">3</Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/recruiter-avatar.png" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>


        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="sm:hidden">
                <Select onValueChange={setActiveTab} value={activeTab}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="candidates">Candidates</SelectItem>
                    <SelectItem value="applications">Applications</SelectItem>
                    <SelectItem value="interviews">Interviews</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="messages">Messages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden sm:block">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="candidates">Candidates</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="interviews">Interviews</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
              </div>


              <TabsContent value="overview">
                <DashboardOverview />
              </TabsContent>


              <TabsContent value="candidates">
                <CandidateBrowser />
              </TabsContent>


              <TabsContent value="applications">
                <ApplicationManagement />
              </TabsContent>


              <TabsContent value="interviews">
                <InterviewScheduler />
              </TabsContent>


              <TabsContent value="analytics">
                <AnalyticsDashboard />
              </TabsContent>


              <TabsContent value="messages">
                <CommunicationCenter />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}





function DashboardOverview() {
  const stats = [
    {
      name: "Total Candidates",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      name: "Active Applications",
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: FileText,
    },
    {
      name: "Interviews Scheduled",
      value: "24",
      change: "+3%",
      changeType: "positive",
      icon: Calendar,
    },
    {
      name: "Positions Filled",
      value: "18",
      change: "+25%",
      changeType: "positive",
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
      statusColor: "bg-yellow-100 text-yellow-800",
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
      statusColor: "bg-purple-100 text-purple-800",
      avatar: "/david-backend-developer.jpg",
      appliedDate: "2 days ago",
    },
  ]


  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Frontend Developer",
      time: "10:00 AM",
      date: "Today",
      type: "Technical Interview",
    },
    {
      id: 2,
      candidate: "Alex Thompson",
      position: "Product Manager",
      time: "2:30 PM",
      date: "Today",
      type: "Final Interview",
    },
    {
      id: 3,
      candidate: "Lisa Wang",
      position: "Data Analyst",
      time: "11:00 AM",
      date: "Tomorrow",
      type: "HR Interview",
    },
  ]


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your recruitment pipeline.</p>
      </div>


      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest candidate applications to review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={application.avatar || "/placeholder.svg"} />
                      <AvatarFallback>  
                        {application.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{application.name}</p>
                      <p className="text-xs text-muted-foreground">{application.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={application.statusColor}>{application.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Applications
            </Button>
          </CardContent>
        </Card>


        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Scheduled interviews for today and tomorrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{interview.candidate}</p>
                    <p className="text-xs text-muted-foreground">{interview.position}</p>
                    <Badge variant="outline" className="text-xs">
                      {interview.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{interview.time}</p>
                    <p className="text-xs text-muted-foreground">{interview.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>


      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you manage your recruitment process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Browse Candidates</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span>Schedule Interview</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <FileText className="h-6 w-6" />
              <span>Create Job Post</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


function CandidateBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("match")


  const mockCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "5+ years",
      education: "BS Computer Science",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      avatar: "/placeholder-s6jev.png",
      rating: 4.8,
      status: "Available" as const,
      salary: "$120k - $140k",
      lastActive: "2 hours ago",
      matchScore: 95,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Data Scientist",
      location: "New York, NY",
      experience: "3+ years",
      education: "MS Data Science",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      avatar: "/placeholder-0mkvw.png",
      rating: 4.6,
      status: "Interviewing" as const,
      salary: "$110k - $130k",
      lastActive: "1 day ago",
      matchScore: 88,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX/UI Designer",
      location: "Austin, TX",
      experience: "4+ years",
      education: "BFA Design",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      avatar: "/placeholder-4fie5.png",
      rating: 4.9,
      status: "Available" as const,
      salary: "$90k - $110k",
      lastActive: "3 hours ago",
      matchScore: 92,
    },
  ]


  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))


    const matchesStatus = filterStatus === "all" || candidate.status === filterStatus


    return matchesSearch && matchesStatus
  })


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidate Browser</h1>
          <p className="text-muted-foreground">Discover and connect with top talent for your open positions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Star className="h-4 w-4 mr-2" />
            Saved Searches
          </Button>
        </div>
      </div>


      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>


            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Not Available">Not Available</SelectItem>
                </SelectContent>
              </Select>


              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Match Score</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>


              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCandidates.length} of {mockCandidates.length} candidates
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
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {candidate.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{candidate.name}</CardTitle>
              <CardDescription>{candidate.title}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="h-4 w-4 mr-2" />
                Add to Shortlist
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{candidate.rating}</span>
          </div>
        </div>


        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {candidate.location}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-2" />
            {candidate.experience}
          </div>
          <div className="flex items-center text-muted-foreground">
            <GraduationCap className="h-4 w-4 mr-2" />
            {candidate.education}
          </div>
        </div>


        <div className="space-y-2">
          <p className="text-sm font-medium">Skills</p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill: string) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>


        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm">
            <p className="font-medium">{candidate.salary}</p>
            <p className="text-muted-foreground">Expected</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-medium">{candidate.matchScore}%</p>
            <p className="text-muted-foreground">Match</p>
          </div>
        </div>


        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {candidate.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-muted-foreground">{candidate.title}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {candidate.location}
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {candidate.experience}
                </span>
                <span className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {candidate.rating}
                </span>
              </div>
            </div>
          </div>


          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm font-medium">{candidate.salary}</p>
              <p className="text-xs text-muted-foreground">Expected</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">{candidate.matchScore}%</p>
              <p className="text-xs text-muted-foreground">Match</p>
            </div>
            <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Shortlist
              </Button>
            </div>
          </div>
        </div>


        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


function ApplicationManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")


  const mockApplications = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      candidateAvatar: "/placeholder-s6jev.png",
      position: "Senior Frontend Developer",
      department: "Engineering",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled" as const,
      stage: 3,
      totalStages: 5,
      priority: "High" as const,
      source: "LinkedIn",
      salary: "$120k - $140k",
      notes: "Strong React experience, excellent portfolio",
      nextAction: "Technical Interview",
      nextActionDate: "2024-01-20",
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      candidateAvatar: "/placeholder-0mkvw.png",
      position: "Data Scientist",
      department: "Analytics",
      appliedDate: "2024-01-14",
      status: "Under Review" as const,
      stage: 2,
      totalStages: 5,
      priority: "Medium" as const,
      source: "Company Website",
      salary: "$110k - $130k",
      notes: "PhD in Machine Learning, published research",
      nextAction: "HR Screening",
      nextActionDate: "2024-01-18",
    },
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800"
      case "Technical Test":
        return "bg-orange-100 text-orange-800"
      case "Final Interview":
        return "bg-indigo-100 text-indigo-800"
      case "Offered":
        return "bg-green-100 text-green-800"
      case "Hired":
        return "bg-emerald-100 text-emerald-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }


  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Application Management</h1>
          <p className="text-muted-foreground">Track and manage candidate applications through your hiring pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>


      {/* Status Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplications.filter((app) => !["Hired", "Rejected"].includes(app.status)).length}
            </div>
            <p className="text-xs text-muted-foreground">Active applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplications.filter((app) => app.status === "Interview Scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Pending</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
      </div>


      {/* Applications List */}
      <div className="space-y-4">
        {mockApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={application.candidateAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {application.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">{application.candidateName}</h3>
                      <p className="text-muted-foreground">{application.position}</p>
                      <p className="text-sm text-muted-foreground">{application.department}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {application.source}
                      </span>
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {application.salary}
                      </span>
                    </div>
                  </div>
                </div>


                <div className="flex flex-col items-end space-y-2 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0 mt-4 sm:mt-0">
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                      <Badge className={getPriorityColor(application.priority)}>{application.priority}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Next: {application.nextAction}</div>
                    <div className="text-xs text-muted-foreground">
                      Due: {new Date(application.nextActionDate).toLocaleDateString()}
                    </div>
                  </div>


                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Interview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Move to Next Stage
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>


              {/* Progress Bar */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Stage {application.stage} of {application.totalStages}
                  </span>
                  <span className="font-medium">
                    {Math.round((application.stage / application.totalStages) * 100)}% Complete
                  </span>
                </div>
                <Progress value={(application.stage / application.totalStages) * 100} className="h-2" />
              </div>


              {/* Notes */}
              {application.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <strong>Notes:</strong> {application.notes}
                  </p>
                </div>
              )}


              {/* Action Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
                <Button size="sm" className="w-full sm:w-auto">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Next Stage
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
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")


  const mockInterviews = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      candidateAvatar: "/placeholder-s6jev.png",
      position: "Senior Frontend Developer",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Technical Interview",
      interviewer: "John Smith",
      status: "Confirmed" as const,
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notes: "Focus on React and TypeScript experience",
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      candidateAvatar: "/placeholder-0mkvw.png",
      position: "Data Scientist",
      date: "2024-01-20",
      time: "2:30 PM",
      duration: "45 minutes",
      type: "HR Interview",
      interviewer: "Jane Doe",
      status: "Pending" as const,
      meetingLink: "https://zoom.us/j/123456789",
      notes: "Initial screening call",
    },
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Scheduler</h1>
          <p className="text-muted-foreground">Manage and schedule interviews with candidates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "calendar" ? "list" : "calendar")}
          >
            {viewMode === "calendar" ? <List className="h-4 w-4 mr-2" /> : <Calendar className="h-4 w-4 mr-2" />}
            {viewMode === "calendar" ? "List View" : "Calendar View"}
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>


      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInterviews.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Interviews scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Confirmed interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>


      {/* Interview List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Today's Schedule</h2>
        {mockInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={interview.candidateAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {interview.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">{interview.candidateName}</h3>
                      <p className="text-muted-foreground">{interview.position}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {interview.time} ({interview.duration})
                      </span>
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {interview.interviewer}
                      </span>
                      <Badge variant="outline">{interview.type}</Badge>
                    </div>
                  </div>
                </div>


                <div className="flex flex-col items-end space-y-2 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0 mt-4 sm:mt-0">
                  <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Reminder
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>


              {interview.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <strong>Notes:</strong> {interview.notes}
                  </p>
                </div>
              )}


              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Join Meeting
                </Button>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


function AnalyticsDashboard() {
  const analyticsData = [
    { name: "Applications", value: 2847, change: "+12%", changeType: "positive" },
    { name: "Interviews", value: 156, change: "+8%", changeType: "positive" },
    { name: "Offers", value: 24, change: "+15%", changeType: "positive" },
    { name: "Hires", value: 18, change: "+25%", changeType: "positive" },
  ]


  const sourceData = [
    { source: "LinkedIn", applications: 1200, percentage: 42 },
    { source: "Company Website", applications: 850, percentage: 30 },
    { source: "Job Boards", applications: 500, percentage: 18 },
    { source: "Referrals", applications: 297, percentage: 10 },
  ]


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track recruitment metrics and performance</p>
      </div>


      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{metric.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Application Sources</CardTitle>
            <CardDescription>Where candidates are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceData.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{source.applications}</span>
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${source.percentage}%` }}></div>
                    </div>
                    <span className="text-sm font-medium w-8">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Hiring Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
            <CardDescription>Conversion rates through the hiring process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Applications</span>
                <span className="text-sm">2,847</span>
              </div>
              <Progress value={100} className="h-2" />


              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Screening</span>
                <span className="text-sm">1,423 (50%)</span>
              </div>
              <Progress value={50} className="h-2" />


              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Interviews</span>
                <span className="text-sm">427 (15%)</span>
              </div>
              <Progress value={15} className="h-2" />


              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Offers</span>
                <span className="text-sm">85 (3%)</span>
              </div>
              <Progress value={3} className="h-2" />


              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Hires</span>
                <span className="text-sm">68 (2.4%)</span>
              </div>
              <Progress value={2.4} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key recruitment performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">12.5</div>
              <div className="text-sm text-muted-foreground">Days</div>
              <div className="text-xs text-muted-foreground">Average Time to Hire</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">$3,200</div>
              <div className="text-sm text-muted-foreground">USD</div>
              <div className="text-xs text-muted-foreground">Cost per Hire</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-sm text-muted-foreground">Rate</div>
              <div className="text-xs text-muted-foreground">Offer Acceptance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


function CommunicationCenter() {
  const [selectedConversation, setSelectedConversation] = useState(1)


  const conversations = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      candidateAvatar: "/placeholder-s6jev.png",
      position: "Senior Frontend Developer",
      lastMessage: "Thank you for the interview opportunity. I'm excited about the role!",
      timestamp: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      candidateAvatar: "/placeholder-0mkvw.png",
      position: "Data Scientist",
      lastMessage: "I have a question about the technical assessment timeline.",
      timestamp: "1 day ago",
      unread: false,
    },
  ]


  const messages = [
    {
      id: 1,
      sender: "recruiter",
      content: "Hi Sarah! Thank you for your application. We'd like to schedule a technical interview.",
      timestamp: "Yesterday 3:30 PM",
    },
    {
      id: 2,
      sender: "candidate",
      content:
        "Thank you for reaching out! I'm very interested in the position. When would be a good time for the interview?",
      timestamp: "Yesterday 4:15 PM",
    },
    {
      id: 3,
      sender: "recruiter",
      content:
        "Great! How about this Friday at 2:00 PM? The interview will be conducted via video call and should take about 1 hour.",
      timestamp: "Today 9:00 AM",
    },
    {
      id: 4,
      sender: "candidate",
      content: "Thank you for the interview opportunity. I'm excited about the role!",
      timestamp: "Today 2:30 PM",
    },
  ]


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Communication Center</h1>
        <p className="text-muted-foreground">Manage messages and communications with candidates</p>
      </div>


      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Recent messages with candidates</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-muted transition-colors ${
                    selectedConversation === conversation.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.candidateAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {conversation.candidateName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{conversation.candidateName}</p>
                        {conversation.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.position}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Message Thread */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-s6jev.png" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Sarah Johnson</CardTitle>
                <CardDescription>Senior Frontend Developer</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "recruiter" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === "recruiter" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>


            {/* Message Input */}
            <div className="mt-4 flex items-center space-x-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common communication templates and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <MessageSquare className="h-6 w-6" />
              <span>Interview Invitation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <CheckCircle className="h-6 w-6" />
              <span>Offer Letter</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Clock className="h-6 w-6" />
              <span>Follow-up Reminder</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



