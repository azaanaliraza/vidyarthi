"use client"
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import {
  Award, Briefcase, Users, Trophy, CheckCircle, Languages, Coins, User, Calendar, MapPin,
  Clock, ExternalLink, Star, Building2, Banknote, Plus, X, Save, Edit, UploadCloud, Loader2, Trash2, AlertTriangle, ListChecks
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    myCertificates: "My Certificates",
    myCertificatesDesc: "Manage your other uploaded certificates and achievements",
    employabilityScore: "Overall Employability Score",
    employabilityScoreDesc: "Based on your skills, certifications, and profile completeness",
    profileCompletion: "Profile Completion",
    employabilityScoreShort: "Employability Score",
    activeProjects: "Active Projects",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    dateOfBirth: "Date of Birth",
    address: "Address",
    verified: "Verified",
    pending: "Pending",
    upload: "Upload",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    view: "View",
    addCertificate: "Add Certificate",
    totalCertificates: "Total Certificates",
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
    myCertificates: "मेरे प्रमाणपत्र",
    myCertificatesDesc: "अपने अपलोड किए गए प्रमाणपत्रों और उनकी दृश्यता का प्रबंधन करें",
    employabilityScore: "समग्र रोजगारपरकता स्कोर",
    employabilityScoreDesc: "आपके कौशल, प्रमाणन और प्रोफ़ाइल पूर्णता के आधार पर",
    profileCompletion: "प्रोफ़ाइल पूर्णता",
    employabilityScoreShort: "रोजगारपरकता स्कोर",
    activeProjects: "सक्रिय परियोजनाएं",
    personalInfo: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    phoneNumber: "फोन नंबर",
    dateOfBirth: "जन्म तिथि",
    address: "पता",
    verified: "सत्यापित",
    pending: "लंबित",
    upload: "अपलोड",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    view: "देखें",
    addCertificate: "प्रमाणपत्र जोड़ें",
    totalCertificates: "कुल प्रमाणपत्र",
  },
};

export default function StudentDashboardPage() {
    const { isLoaded } = useAuth();
    const dbUser = useQuery(api.users.get);

    if (!isLoaded || dbUser === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="ml-4 text-lg">Loading Dashboard...</p>
            </div>
        );
    }
    
    return <StudentDashboard dbUser={dbUser} />;
}

function StudentDashboard({ dbUser }: { dbUser: any }) {
  const documents = useQuery(api.documents.getDocumentsForUser) ?? [];
  const updateProfile = useMutation(api.users.updateProfile);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const saveDocument = useMutation(api.documents.saveDocument);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const [activeTab, setActiveTab] = useState("overview");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "", email: "", phone: "", bio: "", skills: [] as string[],
    dob: "", aadhar: "", address: "", course: "", institution: "", highestQualification: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [uploadState, setUploadState] = useState({
    name: "", issuer: "", file: null as File | null, type: "General Certificate"
  });

  useEffect(() => {
    if (dbUser) {
      setProfileData({
        name: dbUser.name ?? "", email: dbUser.email ?? "", phone: dbUser.phone ?? "",
        bio: dbUser.bio ?? "", skills: dbUser.skills ?? [], dob: dbUser.dob ?? "",
        aadhar: dbUser.aadhar ?? "", address: dbUser.address ?? "", course: dbUser.course ?? "",
        institution: dbUser.institution ?? "", highestQualification: dbUser.highestQualification ?? "",
      });
    }
  }, [dbUser]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleQualificationChange = (value: string) => {
    setProfileData((prev) => ({ ...prev, highestQualification: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }));
  };

  const handleSaveProfile = async () => {
    const { email, ...dataToSave } = profileData;
    await updateProfile(dataToSave as any);
    setIsEditing(false);
  };

  const handleFileUpload = async (file: File, type: string, issuer?: string, name?: string) => {
    if (!file) return;
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await result.json();
    await saveDocument({ storageId, fileName: name || file.name, type, issuer });
    setIsUploadDialogOpen(false);
    setUploadState({ name: "", issuer: "", file: null, type: "General Certificate" });
  };

  const handleDeleteDocument = async (documentId: Id<"documents">) => {
    if (confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
        await deleteDocument({ documentId });
    }
  };
  
  const getCompulsoryDocs = () => {
      const qualification = profileData.highestQualification;
      let required: string[] = ["Photo", "Signature", "Thumb Print"];
      if (!qualification || qualification === "") return required;
      const levels = ["Below 10th", "10th", "12th", "Bachelor's", "Master's", "PhD", "Job"];
      const currentIndex = levels.indexOf(qualification);
      if (currentIndex >= levels.indexOf("10th")) required.push("10th Marksheet");
      if (currentIndex >= levels.indexOf("12th")) required.push("12th Marksheet");
      if (currentIndex >= levels.indexOf("Bachelor's")) required.push("Bachelor's Degree");
      if (currentIndex >= levels.indexOf("Master's")) required.push("Master's Degree");
      if (currentIndex >= levels.indexOf("PhD")) required.push("PhD Degree");
      return required;
  };

  const t = translations[language];
  
  const compulsoryDocs = getCompulsoryDocs();
  const uploadedCompulsoryDocs = documents.filter(doc => compulsoryDocs.includes(doc.type));
  const generalDocs = documents.filter(doc => !compulsoryDocs.includes(doc.type));
  
  const profileFields = [ 'name', 'phone', 'bio', 'dob', 'aadhar', 'address', 'course', 'institution', 'highestQualification' ];
  const filledFields = profileFields.filter(field => !!profileData[field as keyof typeof profileData]);
  const profileCompletion = Math.round((filledFields.length / profileFields.length) * 100);

  const getRecentActivities = () => {
    let activities = [];
    const sortedDocs = [...documents].sort((a, b) => b._creationTime - a._creationTime);
    for(const doc of sortedDocs.slice(0, 2)) {
        activities.push({
            id: doc._id, type: 'certificate', icon: Award,
            title: `${doc.fileName} uploaded`, timestamp: new Date(doc._creationTime).toLocaleString(),
        });
    }
    const incompleteFields = profileFields.filter(field => !profileData[field as keyof typeof profileData]);
    if(incompleteFields.length > 0) {
        activities.push({
            id: 'profile_incomplete', type: 'profile', icon: User,
            title: `Complete your profile: ${incompleteFields.slice(0,2).join(', ')}...`, timestamp: 'Action needed'
        });
    }
    const missingDocs = compulsoryDocs.filter(docType => !uploadedCompulsoryDocs.some(d => d.type === docType));
    if(missingDocs.length > 0) {
        activities.push({
            id: 'docs_missing', type: 'document', icon: AlertTriangle,
            title: `Missing documents: ${missingDocs.slice(0,2).join(', ')}...`, timestamp: 'Action needed'
        });
    }
    return activities;
  };
  const recentActivities = getRecentActivities();
  
  const navItems = [
    { value: "overview", label: t.overview },
    { value: "profile", label: t.profile },
    { value: "certificates", label: t.certificates },
    { value: "employability", label: t.employability },
    { value: "internships", label: t.internships },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      <header className="bg-blue-700 shadow-lg sticky top-0 z-50 text-white">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
             <div className="flex items-center space-x-4">
               <h1 className="text-xl font-bold">{t.title}</h1>
               <Badge variant="secondary" className="bg-orange-500 text-white border-orange-400 hidden sm:block">
                 {t.studentPortal}
               </Badge>
             </div>
             <div className="flex items-center space-x-2 sm:space-x-4">
               <div className="flex items-center space-x-2">
                 <Button onClick={() => setLanguage(language === "en" ? "hi" : "en")} variant="ghost" size="icon" className="text-white hover:bg-blue-600 sm:px-2 sm:w-auto sm:h-auto">
                   <Languages className="w-5 h-5" />
                   <span className="hidden sm:inline text-xs font-medium ml-1">{language === "en" ? "हिं" : "EN"}</span>
                 </Button>
                 <Button className="bg-orange-600 hover:bg-orange-700 text-white border-orange-500 shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full sm:rounded-md">
                   <Coins className="w-4 h-4" />
                   <span className="hidden sm:inline">{t.acadCoins}</span>
                   <span className="font-bold">0</span>
                 </Button>
               </div>
               <div className="flex items-center gap-2">
                 <div className="hidden sm:block text-sm text-right">
                   <p className="font-medium">{dbUser?.name ?? "Loading..."}</p>
                   <p className="text-xs text-blue-100">{dbUser?.vidyarthiId ?? "..."}</p>
                 </div>
                 <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                 </SignedIn>
               </div>
             </div>
           </div>
         </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow min-h-0">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
             <TabsList className="hidden sm:grid w-full grid-cols-5 bg-white shadow-sm mb-6">
               {navItems.map((item) => ( <TabsTrigger key={item.value} value={item.value} className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">{item.label}</TabsTrigger>))}
             </TabsList>
             <div className="sm:hidden mb-6">
                <Select value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                   <SelectTrigger className="w-full bg-white shadow-sm"><SelectValue placeholder="Select a page" /></SelectTrigger>
                   <SelectContent>{navItems.map((item) => (<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}</SelectContent>
               </Select>
             </div>

          <div className="space-y-6">
            <TabsContent value="overview" className="mt-0 space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm font-medium">{t.totalCertificates}</p><p className="text-3xl font-bold">{documents.length}</p></div>
                        <Award className="h-8 w-8" />
                    </div>
                </div>
                <div className="bg-orange-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm font-medium">{t.employabilityScoreShort}</p><p className="text-3xl font-bold">N/A</p></div>
                        <Trophy className="h-8 w-8" />
                    </div>
                </div>
                <div className="bg-green-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm font-medium">{t.profileCompletion}</p><p className="text-3xl font-bold">{profileCompletion}%</p></div>
                        <User className="h-8 w-8" />
                    </div>
                </div>
                <div className="bg-purple-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm font-medium">{t.activeProjects}</p><p className="text-3xl font-bold">0</p></div>
                        <Briefcase className="h-8 w-8" />
                    </div>
                </div>
              </div>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><ListChecks className="h-5 w-5" />{t.recentActivity}</CardTitle><CardDescription>{t.recentActivityDesc}</CardDescription></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.length === 0 ? (
                      <p className="text-center text-gray-500">No recent activity.</p>
                    ) : (
                      recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                          <activity.icon className={`h-5 w-5 ${activity.type === 'document' ? 'text-red-500' : 'text-blue-600'}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>{t.personalInfo}</CardTitle>
                        <CardDescription>{t.profileInfoDesc}</CardDescription>
                    </div>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline" className="w-full sm:w-auto">
                        {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                        {isEditing ? t.cancel : t.edit}
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor="name">{t.fullName}</Label><Input id="name" value={profileData.name} disabled={!isEditing} onChange={handleProfileChange}/></div>
                    <div><Label htmlFor="email">{t.emailAddress}</Label><Input id="email" value={profileData.email} disabled/></div>
                    <div><Label htmlFor="phone">{t.phoneNumber}</Label><Input id="phone" value={profileData.phone} disabled={!isEditing} onChange={handleProfileChange}/></div>
                    <div><Label htmlFor="dob">{t.dateOfBirth}</Label><Input id="dob" value={profileData.dob} disabled={!isEditing} onChange={handleProfileChange} type="date"/></div>
                    <div><Label htmlFor="aadhar">Aadhar Number</Label><Input id="aadhar" value={profileData.aadhar} disabled={!isEditing} onChange={handleProfileChange}/></div>
                    <div><Label htmlFor="address">{t.address}</Label><Input id="address" value={profileData.address} disabled={!isEditing} onChange={handleProfileChange}/></div>
                    <div><Label htmlFor="course">Current Course</Label><Input id="course" value={profileData.course} disabled={!isEditing} onChange={handleProfileChange}/></div>
                    <div><Label htmlFor="institution">Institution</Label><Input id="institution" value={profileData.institution} disabled={!isEditing} onChange={handleProfileChange}/></div>
                    <div>
                        <Label htmlFor="highestQualification">Highest Qualification</Label>
                        {isEditing ? (
                             <Select value={profileData.highestQualification} onValueChange={handleQualificationChange}>
                                <SelectTrigger id="highestQualification"><SelectValue placeholder="Select qualification" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Below 10th">Below 10th Standard</SelectItem>
                                    <SelectItem value="10th">10th Standard</SelectItem>
                                    <SelectItem value="12th">12th Standard</SelectItem>
                                    <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                                    <SelectItem value="Master's">Master's Degree</SelectItem>
                                    <SelectItem value="PhD">PhD</SelectItem>
                                    <SelectItem value="Job">Doing Job</SelectItem>
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input id="highestQualification" value={profileData.highestQualification} disabled />
                        )}
                    </div>
                  </div>
                  <div><Label htmlFor="bio">Bio</Label><Textarea id="bio" value={profileData.bio} disabled={!isEditing} onChange={handleProfileChange}/></div>
                  <div>
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                                {skill}
                                {isEditing && <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => removeSkill(skill)}><X className="h-3 w-3"/></Button>}
                            </Badge>
                        ))}
                    </div>
                    {isEditing && (
                        <div className="flex gap-2 mt-2">
                            <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a new skill" onKeyDown={(e) => e.key === 'Enter' && addSkill()}/>
                            <Button onClick={addSkill}><Plus className="h-4 w-4"/></Button>
                        </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex justify-end">
                        <Button onClick={handleSaveProfile}><Save className="mr-2 h-4 w-4"/>{t.save}</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="certificates" className="mt-0 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Compulsory Documents</CardTitle>
                        <CardDescription>Please upload these required documents based on your qualification.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {compulsoryDocs.map(docType => {
                            const uploadedDoc = uploadedCompulsoryDocs.find(d => d.type === docType);
                            return (
                                <Card key={docType} className={`p-4 flex items-center justify-between ${uploadedDoc ? 'bg-green-50' : 'bg-red-50'}`}>
                                    <div>
                                        <p className="font-medium">{docType}</p>
                                        {uploadedDoc ? <Badge variant="secondary" className="bg-green-200 text-green-800">Uploaded</Badge> : <Badge variant="destructive">Missing</Badge>}
                                    </div>
                                    {uploadedDoc ? (
                                        <Button asChild variant="outline" size="sm"><a href={uploadedDoc.url!} target="_blank" rel="noopener noreferrer">View</a></Button>
                                    ) : (
                                        <Button size="sm" onClick={() => {
                                            setUploadState({ name: docType, issuer: "N/A", file: null, type: docType });
                                            setIsUploadDialogOpen(true);
                                        }}>Upload</Button>
                                    )}
                                </Card>
                            )
                        })}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle>{t.myCertificates}</CardTitle>
                                <CardDescription>{t.myCertificatesDesc}</CardDescription>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" onClick={() => {
                                 setUploadState({ name: "", issuer: "", file: null, type: "General Certificate" });
                                 setIsUploadDialogOpen(true);
                            }}>
                                <Plus className="h-4 w-4 mr-2" />{t.addCertificate}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            {generalDocs.map((doc) => (
                                <div key={doc._id} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-x-6 gap-y-4 p-4 border rounded-lg">
                                    <div className="flex items-start gap-4 min-w-0">
                                        <Award className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                                        <div className="flex-grow">
                                            <h3 className="font-medium leading-tight">{doc.fileName} {doc.status === 'Verified' && <CheckCircle className="h-4 w-4 text-blue-600 inline-block ml-1" />}</h3>
                                            <p className="text-sm text-muted-foreground">{doc.issuer}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                        <Badge variant={doc.status === 'Verified' ? "default" : "secondary"}>{doc.status}</Badge>
                                        <Button asChild variant="outline" size="sm"><a href={doc.url!} target="_blank" rel="noopener noreferrer">{t.view}</a></Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteDocument(doc._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                             {generalDocs.length === 0 && <p className="text-center text-gray-500 py-4">No other certificates uploaded yet.</p>}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="employability" className="mt-0 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.employabilityScore}</CardTitle>
                        <CardDescription>{t.employabilityScoreDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-gray-500 py-8">
                       <p>Employability score feature will be added soon.</p>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="internships" className="mt-0 space-y-6">
               <div className="text-center text-gray-500 py-8">
                   <p>Internship listings coming soon.</p>
                </div>
            </TabsContent>

          </div>
        </Tabs>
      </main>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload a new Document</DialogTitle>
                <DialogDescription>
                    {uploadState.type === "General Certificate" ? "Add details about your certificate below." : `Uploading: ${uploadState.type}`}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                {uploadState.type === "General Certificate" && (
                    <>
                    <div>
                        <Label htmlFor="certName">Certificate Name</Label>
                        <Input id="certName" value={uploadState.name} onChange={(e) => setUploadState(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <div>
                        <Label htmlFor="certIssuer">Issuing Authority</Label>
                        <Input id="certIssuer" value={uploadState.issuer ?? ""} onChange={(e) => setUploadState(s => ({ ...s, issuer: e.target.value }))} />
                    </div>
                    </>
                )}
                 <div>
                    <Label htmlFor="certFile">File</Label>
                    <Input id="certFile" type="file" onChange={(e) => setUploadState(s => ({...s, file: e.target.files?.[0] || null}))} />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => handleFileUpload(uploadState.file!, uploadState.type, uploadState.issuer, uploadState.name)} disabled={!uploadState.file}>
                    <UploadCloud className="w-4 h-4 mr-2" /> Upload
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}