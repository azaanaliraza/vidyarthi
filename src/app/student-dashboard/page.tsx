"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  LucideUser,
  Award,
  TrendingUp,
  GraduationCap,
  Coins,
  CreditCard,
  Edit,
  Save,
  X,
  Plus,
  Eye,
  EyeOff,
  Upload,
  FileText,
  Trash2,
  Download,
  Calendar,
  BookOpen,
  Users,
  Briefcase,
  Target,
  Trophy,
  Gift,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  TrendingDown,
} from "lucide-react"

interface UserType {
  id: string
  name: string
  email: string
  major: string
  avatar?: string
  profileCompletion: number
}

interface Accomplishment {
  id: number
  title: string
  coins: number
  date: string
  status: "completed" | "pending" | "in-progress"
  category: "certificate" | "course" | "project" | "achievement"
}

interface Scholarship {
  id: number
  name: string
  description: string
  cost: number
  value: string
  deadline: string
  requirements: string[]
  category: "tech" | "innovation" | "academic" | "research"
}

interface Certificate {
  id: string
  name: string
  issuer: string
  dateIssued: string
  file: string
  visible: boolean
  verified: boolean
}

interface DashboardStats {
  certificatesEarned: number
  employabilityScore: number
  profileCompletion: number
  acadCoinBalance: number
  creditScore: number
}

type TabValue = "overview" | "profile" | "certificates" | "employability" | "acadcoin" | "credit"

interface RecentActivity {
  id: string
  type: "acadcoin" | "certificate" | "credit" | "profile" | "employability"
  message: string
  timestamp: string
  badge?: {
    text: string
    variant: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
}

interface EarningMethod {
  id: string
  title: string
  description: string
  coinRange: string
  icon: typeof Award
  color: string
}

function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Student",
    email: "john.student@university.edu",
    phone: "+1 (555) 123-4567",
    course: "Computer Science",
    year: "3rd Year",
    university: "Tech University",
    bio: "Passionate computer science student with interests in web development and artificial intelligence.",
    skills: ["JavaScript", "React", "Python", "Machine Learning"],
    profileVisible: true,
    contactVisible: false,
    skillsVisible: true,
  })

  const [newSkill, setNewSkill] = useState("")

  const handleSave = () => {
    setIsEditing(false)
  }

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information and visibility settings</CardDescription>
            </div>
            <Button
              variant={isEditing ? "destructive" : "outline"}
              onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
            >
              {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/diverse-student-profiles.png" />
                <AvatarFallback className="text-lg">JS</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Edit className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={profileData.course}
                    onChange={(e) => setProfileData({ ...profileData, course: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Academic Year</Label>
              <Input
                id="year"
                value={profileData.year}
                onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={profileData.university}
                onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
            />
          </div>

          <div>
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {profileData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {isEditing && (
            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control who can see your information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Make your profile visible to employers</p>
            </div>
            <div className="flex items-center space-x-2">
              {profileData.profileVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <Switch
                checked={profileData.profileVisible}
                onCheckedChange={(checked) => setProfileData({ ...profileData, profileVisible: checked })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Contact Information</Label>
              <p className="text-sm text-muted-foreground">Show email and phone to employers</p>
            </div>
            <div className="flex items-center space-x-2">
              {profileData.contactVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <Switch
                checked={profileData.contactVisible}
                onCheckedChange={(checked) => setProfileData({ ...profileData, contactVisible: checked })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Skills & Certificates</Label>
              <p className="text-sm text-muted-foreground">Display your skills and certifications</p>
            </div>
            <div className="flex items-center space-x-2">
              {profileData.skillsVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <Switch
                checked={profileData.skillsVisible}
                onCheckedChange={(checked) => setProfileData({ ...profileData, skillsVisible: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CertificateUpload() {
  const [certificates, setCertificates] = useState<Certificate[]>([
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
  ])

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            const newCert: Certificate = {
              id: Date.now().toString(),
              name: file.name.replace(".pdf", ""),
              issuer: "Pending Verification",
              dateIssued: new Date().toISOString().split("T")[0],
              file: file.name,
              visible: true,
              verified: false,
            }
            setCertificates((prev) => [newCert, ...prev])
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const toggleVisibility = (id: string) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, visible: !cert.visible } : cert)))
  }

  const deleteCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Certificate</CardTitle>
          <CardDescription>Add your certificates to showcase your skills and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your certificate here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
              <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG (max 10MB)</p>
            </div>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="certificate-upload"
            />
            <Label htmlFor="certificate-upload" className="cursor-pointer">
              <Button className="mt-4" asChild>
                <span>Choose File</span>
              </Button>
            </Label>
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Certificates ({certificates.length})</CardTitle>
          <CardDescription>Manage your uploaded certificates and their visibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{cert.name}</h3>
                      {cert.verified ? (
                        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(cert.dateIssued).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`visibility-${cert.id}`} className="text-sm">
                      {cert.visible ? "Visible" : "Hidden"}
                    </Label>
                    {cert.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <Switch
                      id={`visibility-${cert.id}`}
                      checked={cert.visible}
                      onCheckedChange={() => toggleVisibility(cert.id)}
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteCertificate(cert.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {certificates.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No certificates uploaded yet</p>
                <p className="text-sm">Upload your first certificate to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Certificates</p>
                <p className="text-2xl font-bold">{certificates.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => c.verified).length}</p>
              </div>
              <Badge className="w-8 h-8 rounded-full p-0 flex items-center justify-center">✓</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visible to Employers</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => c.visible).length}</p>
              </div>
              <Eye className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EmployabilityScore() {
  const overallScore = 85
  const previousScore = 80
  const scoreChange = overallScore - previousScore

  const skillCategories = [
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
      color: "text-green-600",
      bgColor: "bg-green-100",
      suggestions: ["AWS Cloud Practitioner", "Google Cloud Associate", "Microsoft Azure Fundamentals"],
    },
    {
      name: "Soft Skills",
      score: 75,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      suggestions: ["Leadership Training", "Communication Workshop", "Team Management Course"],
    },
    {
      name: "Experience",
      score: 80,
      icon: Briefcase,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      suggestions: ["Internship Program", "Open Source Contributions", "Personal Projects"],
    },
  ]

  const industryComparison = [
    { industry: "Software Development", score: 88, isTarget: true },
    { industry: "Data Science", score: 82, isTarget: false },
    { industry: "Cybersecurity", score: 79, isTarget: false },
    { industry: "Product Management", score: 85, isTarget: false },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Employability Score</span>
            <div className="flex items-center space-x-2">
              {scoreChange > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <Badge variant={scoreChange > 0 ? "default" : "destructive"}>
                {scoreChange > 0 ? "+" : ""}
                {scoreChange}%
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>Based on your skills, certifications, and profile completeness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{overallScore}%</div>
              <p className="text-muted-foreground">Above Average</p>
            </div>
            <Progress value={overallScore} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Beginner (0-40%)</span>
              <span>Intermediate (41-70%)</span>
              <span>Advanced (71-100%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Breakdown</CardTitle>
          <CardDescription>Detailed analysis of your employability factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.score}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{category.score}%</div>
                    </div>
                  </div>
                  <Progress value={category.score} className="h-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Suggestions:</p>
                    {category.suggestions.slice(0, 2).map((suggestion, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        • {suggestion}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Industry Comparison</CardTitle>
          <CardDescription>How you rank against industry standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryComparison.map((industry) => (
              <div key={industry.industry} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {industry.isTarget && <Target className="w-4 h-4 text-primary" />}
                    <span className="font-medium">{industry.industry}</span>
                    {industry.isTarget && <Badge variant="outline">Target</Badge>}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32">
                    <Progress value={industry.score} className="h-2" />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{industry.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Improvement Recommendations</CardTitle>
          <CardDescription>Personalized suggestions to boost your employability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Complete AWS Cloud Certification</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Adding cloud skills could increase your score by 8-12 points and make you more competitive in
                    software development roles.
                  </p>
                  <Button size="sm" className="mt-2">
                    Start Learning
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary-foreground text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Build a Portfolio Project</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create a full-stack application to demonstrate your skills. This could boost your experience score
                    significantly.
                  </p>
                  <Button size="sm" variant="secondary" className="mt-2">
                    View Templates
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-foreground text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Join Professional Networks</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect with industry professionals on LinkedIn and participate in tech communities to improve your
                    soft skills score.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AcadCoinSystem() {
  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(null)

  const acadCoinBalance: number = 1250
  const totalEarned: number = 2100
  const nextMilestone: number = 1500

  const accomplishments: Accomplishment[] = [
    {
      id: 1,
      title: "React Development Certificate",
      coins: 50,
      date: "2024-01-15",
      status: "completed",
      category: "certificate",
    },
    { id: 2, title: "JavaScript Fundamentals", coins: 30, date: "2024-01-10", status: "completed", category: "course" },
    { id: 3, title: "Python Programming", coins: 40, date: "2024-01-05", status: "completed", category: "course" },
    { id: 4, title: "Database Management", coins: 35, date: "2023-12-20", status: "completed", category: "course" },
    {
      id: 5,
      title: "Web Development Project",
      coins: 60,
      date: "2023-12-15",
      status: "completed",
      category: "project",
    },
    { id: 6, title: "Machine Learning Course", coins: 80, date: "2023-12-01", status: "completed", category: "course" },
  ]

  const scholarships: Scholarship[] = [
    {
      id: 1,
      name: "Tech Excellence Scholarship",
      description: "For outstanding performance in technology courses",
      cost: 800,
      value: "$2,000",
      deadline: "2024-03-15",
      requirements: ["Minimum 750 credit score", "3+ tech certificates", "GPA > 3.5"],
      category: "tech",
    },
    {
      id: 2,
      name: "Innovation Grant",
      description: "Supporting innovative project development",
      cost: 600,
      value: "$1,500",
      deadline: "2024-04-01",
      requirements: ["Completed project portfolio", "Minimum 700 credit score"],
      category: "innovation",
    },
    {
      id: 3,
      name: "Academic Achievement Award",
      description: "Recognizing consistent academic excellence",
      cost: 1000,
      value: "$3,000",
      deadline: "2024-02-28",
      requirements: ["Minimum 800 credit score", "5+ certificates", "Dean's list"],
      category: "academic",
    },
    {
      id: 4,
      name: "Research Fellowship",
      description: "For students pursuing research opportunities",
      cost: 1200,
      value: "$4,000",
      deadline: "2024-05-15",
      requirements: ["Research proposal", "Faculty recommendation", "Minimum 780 credit score"],
      category: "research",
    },
  ]

  const earningMethods: EarningMethod[] = [
    {
      id: "certificates",
      title: "Upload Certificates",
      description: "Earn 30-80 coins per certificate",
      coinRange: "30-80 AC",
      icon: Award,
      color: "text-primary",
    },
    {
      id: "courses",
      title: "Complete Courses",
      description: "Earn 50-100 coins per course",
      coinRange: "50-100 AC",
      icon: GraduationCap,
      color: "text-secondary",
    },
    {
      id: "achievements",
      title: "Academic Achievements",
      description: "Earn 20-150 coins for milestones",
      coinRange: "20-150 AC",
      icon: Trophy,
      color: "text-accent",
    },
    {
      id: "profile",
      title: "Profile Completion",
      description: "Earn 10-25 coins per section",
      coinRange: "10-25 AC",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  const redeemScholarship = (scholarshipId: number, cost: number): void => {
    if (acadCoinBalance >= cost) {
      alert(`Successfully applied for scholarship! ${cost} AcadCoins have been deducted.`)
    } else {
      alert(`Insufficient AcadCoins. You need ${cost - acadCoinBalance} more coins.`)
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Coins className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-700">{acadCoinBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">AcadCoins available</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <Trophy className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{totalEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Gift className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-purple-700">{nextMilestone.toLocaleString()} AC</div>
            <Progress value={(acadCoinBalance / nextMilestone) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {nextMilestone - acadCoinBalance} more for bonus reward
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earn" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earn">Earn Coins</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="earn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Earn AcadCoins</CardTitle>
              <CardDescription>Complete accomplishments to earn AcadCoins for scholarship applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {earningMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                      <IconComponent className={`h-8 w-8 ${method.color}`} />
                      <div>
                        <h4 className="font-medium">{method.title}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Accomplishments</CardTitle>
              <CardDescription>Your latest AcadCoin earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accomplishments.slice(0, 4).map((accomplishment) => (
                  <div key={accomplishment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">{accomplishment.title}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(accomplishment.date)}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      +{accomplishment.coins} AC
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Scholarships</CardTitle>
              <CardDescription>Redeem your AcadCoins to apply for scholarships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {scholarships.map((scholarship) => (
                  <Card key={scholarship.id} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                          <CardDescription className="mt-1">{scholarship.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-lg font-bold">
                          {scholarship.value}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cost:</span>
                        <div className="flex items-center space-x-1">
                          <Coins className="h-4 w-4 text-yellow-600" />
                          <span className="font-bold">{scholarship.cost.toLocaleString()} AC</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Deadline:</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{formatDate(scholarship.deadline)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Requirements:</p>
                        <ul className="text-xs space-y-1">
                          {scholarship.requirements.map((req, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => redeemScholarship(scholarship.id, scholarship.cost)}
                        disabled={acadCoinBalance < scholarship.cost}
                      >
                        {acadCoinBalance >= scholarship.cost ? (
                          <>
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          `Need ${(scholarship.cost - acadCoinBalance).toLocaleString()} more AC`
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Complete record of your AcadCoin earnings and redemptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accomplishments.map((accomplishment) => (
                  <div key={accomplishment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">{accomplishment.title}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(accomplishment.date)}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      +{accomplishment.coins} AC
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CreditScore() {
  const currentScore = 750
  const previousScore = 720
  const scoreChange = currentScore - previousScore

  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-green-600"
    if (score >= 700) return "text-blue-600"
    if (score >= 600) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 800) return "Excellent"
    if (score >= 700) return "Good"
    if (score >= 600) return "Fair"
    return "Poor"
  }

  const scoreFactors = [
    {
      factor: "Academic Performance",
      impact: "High Impact",
      score: 85,
      status: "good",
      description: "GPA, course completion rate, and grades",
    },
    {
      factor: "Certificate Achievements",
      impact: "Medium Impact",
      score: 78,
      status: "good",
      description: "Professional certifications and skill validations",
    },
    {
      factor: "Project Portfolio",
      impact: "Medium Impact",
      score: 72,
      status: "fair",
      description: "Quality and quantity of completed projects",
    },
    {
      factor: "Skill Diversity",
      impact: "Low Impact",
      score: 68,
      status: "fair",
      description: "Range of technical and soft skills",
    },
    {
      factor: "Learning Consistency",
      impact: "Medium Impact",
      score: 82,
      status: "good",
      description: "Regular engagement with learning activities",
    },
  ]

  const recommendations = [
    {
      title: "Complete Advanced Certifications",
      description: "Earn certifications in emerging technologies to boost your score",
      impact: "+15-25 points",
      timeframe: "2-3 months",
      priority: "high",
    },
    {
      title: "Build More Projects",
      description: "Create diverse projects showcasing different skills",
      impact: "+10-20 points",
      timeframe: "1-2 months",
      priority: "medium",
    },
    {
      title: "Improve GPA",
      description: "Focus on current coursework to maintain high grades",
      impact: "+5-15 points",
      timeframe: "1 semester",
      priority: "high",
    },
    {
      title: "Learn New Technologies",
      description: "Expand your skill set with in-demand technologies",
      impact: "+8-12 points",
      timeframe: "2-4 weeks",
      priority: "low",
    },
  ]

  const scoreHistory = [
    { month: "Jan 2024", score: 750 },
    { month: "Dec 2023", score: 720 },
    { month: "Nov 2023", score: 710 },
    { month: "Oct 2023", score: 695 },
    { month: "Sep 2023", score: 680 },
    { month: "Aug 2023", score: 665 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Academic Credit Score</span>
            </CardTitle>
            <CardDescription>Your overall academic and skill performance rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(currentScore)}`}>{currentScore}</div>
                <p className="text-lg font-medium mt-2">{getScoreLabel(currentScore)}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  {scoreChange > 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`font-medium ${scoreChange > 0 ? "text-green-600" : "text-red-600"}`}>
                    {scoreChange > 0 ? "+" : ""}
                    {scoreChange} points this month
                  </span>
                </div>
                <Progress value={(currentScore / 850) * 100} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>300</span>
                  <span>850</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Excellent (800-850)</span>
                <span className="text-green-600">15%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Good (700-799)</span>
                <span className="text-blue-600">35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fair (600-699)</span>
                <span className="text-yellow-600">30%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Poor (300-599)</span>
                <span className="text-red-600">20%</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                You're in the top <span className="font-bold text-blue-600">25%</span> of students
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="factors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="factors">Score Factors</TabsTrigger>
          <TabsTrigger value="recommendations">Improve Score</TabsTrigger>
          <TabsTrigger value="history">Score History</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What Affects Your Score</CardTitle>
              <CardDescription>Breakdown of factors that influence your academic credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {scoreFactors.map((factor, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{factor.factor}</h4>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={factor.status === "good" ? "default" : "secondary"}>{factor.impact}</Badge>
                        <p className="text-sm font-medium mt-1">{factor.score}%</p>
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Actions you can take to improve your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="h-4 w-4" />
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge
                            variant={
                              rec.priority === "high"
                                ? "destructive"
                                : rec.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-green-600 font-medium">{rec.impact}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{rec.timeframe}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Start Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Score History</CardTitle>
              <CardDescription>Track your credit score progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{entry.month}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${getScoreColor(entry.score)}`}>{entry.score}</span>
                      {index > 0 && (
                        <Badge variant={entry.score > scoreHistory[index - 1].score ? "default" : "secondary"}>
                          {entry.score > scoreHistory[index - 1].score ? "+" : ""}
                          {entry.score - scoreHistory[index - 1].score}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Benefits</CardTitle>
              <CardDescription>How your credit score helps with opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium text-green-600">With Good Credit Score (700+)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Priority scholarship applications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Better internship opportunities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Higher AcadCoin earning rates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Access to premium resources</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-red-600">With Poor Credit Score (Below 600)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Limited scholarship eligibility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Reduced AcadCoin earning rates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Fewer opportunity recommendations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Basic feature access only</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview")

  const currentUser: UserType = {
    id: "1",
    name: "John Student",
    email: "john.student@university.edu",
    major: "Computer Science",
    avatar: "/diverse-student-profiles.png",
    profileCompletion: 92,
  }

  const dashboardStats: DashboardStats = {
    certificatesEarned: 12,
    employabilityScore: 85,
    profileCompletion: 92,
    acadCoinBalance: 1250,
    creditScore: 750,
  }

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "acadcoin",
      message: "Earned 50 AcadCoins for React Certificate",
      timestamp: "2 hours ago",
      badge: { text: "+50 AC", variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
    },
    {
      id: "2",
      type: "certificate",
      message: "React Development Certificate uploaded",
      timestamp: "2 hours ago",
      badge: { text: "New", variant: "secondary" },
    },
    {
      id: "3",
      type: "credit",
      message: "Credit score improved to 750",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "profile",
      message: "Profile updated with new skills",
      timestamp: "1 day ago",
    },
    {
      id: "5",
      type: "employability",
      message: "Employability score increased to 85%",
      timestamp: "3 days ago",
    },
  ]

  const getActivityColor = (type: RecentActivity["type"]): string => {
    const colors = {
      acadcoin: "bg-yellow-500",
      certificate: "bg-primary",
      credit: "bg-green-500",
      profile: "bg-secondary",
      employability: "bg-accent",
    }
    return colors[type]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Vidyarthi</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{dashboardStats.acadCoinBalance} AC</span>
              </div>
              <Avatar>
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <AvatarFallback>
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-muted-foreground">{currentUser.major}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <LucideUser className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="employability" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Employability
            </TabsTrigger>
            <TabsTrigger value="acadcoin" className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              AcadCoin
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Credit Score
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                  <Award className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.certificatesEarned}</div>
                  <p className="text-xs text-muted-foreground">+2 this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Employability Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.employabilityScore}%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <LucideUser className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.profileCompletion}%</div>
                  <Progress value={dashboardStats.profileCompletion} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AcadCoin Balance</CardTitle>
                  <Coins className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.acadCoinBalance}</div>
                  <p className="text-xs text-muted-foreground">+150 this week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
                  <CreditCard className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.creditScore}</div>
                  <p className="text-xs text-muted-foreground">Excellent</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest achievements and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    {activity.badge && (
                      <Badge variant={activity.badge.variant} className={activity.badge.className}>
                        {activity.badge.text}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificateUpload />
          </TabsContent>

          <TabsContent value="employability">
            <EmployabilityScore />
          </TabsContent>

          <TabsContent value="acadcoin">
            <AcadCoinSystem />
          </TabsContent>

          <TabsContent value="credit">
            <CreditScore />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


