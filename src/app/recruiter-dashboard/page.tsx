"use client"
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Building, Send, Search, Users, FileText, BarChart3, Bell, Menu, Home, Filter, Grid3X3, List, Mail, Eye, Briefcase, Phone, GraduationCap, File } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";

// --- RecruiterOnboardingForm (No Changes) ---
function RecruiterOnboardingForm({ currentUser }: { currentUser: any }) {
    const [formData, setFormData] = useState({ name: currentUser.name || "", organization: "", position: "" });
    const submitProfile = useMutation(api.users.submitRecruiterProfile);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.id]: e.target.value }); };
    const handleSubmit = async () => {
        if (!formData.name || !formData.organization || !formData.position) return;
        setIsLoading(true);
        try { await submitProfile(formData); setIsSubmitted(true); }
        catch (error) { console.error("Failed to submit profile:", error); alert("There was an error submitting your profile. Please try again."); }
        setIsLoading(false);
    };
    if (currentUser.organization || isSubmitted) {
        return (
            <Card className="max-w-md mx-auto text-center">
                 <CardHeader><CardTitle className="text-2xl font-bold text-green-600">Request Pending Approval</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Your request to access the recruiter dashboard for **{currentUser.organization || formData.organization}** is pending admin approval. You will be notified shortly.</p></CardContent>
            </Card>
        );
    }
    // This component now correctly returns JSX in all cases.
    return (
        <Card className="max-w-md mx-auto">
            <CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-6 w-6 text-blue-600"/> Complete Your Recruiter Profile</CardTitle><CardDescription>To get started, please provide your details. An admin will approve your request shortly.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
                <div><Label htmlFor="name">Full Name</Label><Input id="name" value={formData.name} onChange={handleChange} placeholder="e.g., Ravi Kumar" /></div>
                <div><Label htmlFor="position">Your Position / Role</Label><Input id="position" value={formData.position} onChange={handleChange} placeholder="e.g., HR Manager" /></div>
                <div><Label htmlFor="organization">Organization Name</Label><Input id="organization" value={formData.organization} onChange={handleChange} placeholder="e.g., Ministry of Education" /></div>
                <Button onClick={handleSubmit} disabled={isLoading || !formData.name || !formData.organization || !formData.position} className="w-full bg-blue-600 hover:bg-blue-700">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Send className="mr-2 h-4 w-4" /> Submit for Approval
                </Button>
            </CardContent>
        </Card>
    );
}


// --- MODAL TO VIEW STUDENT DETAILS (No Changes) ---
function StudentProfileModal({ student, onClose }: { student: any, onClose: () => void }) {
    if (!student) return null;
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader><div className="flex items-center gap-4"><Avatar className="h-20 w-20 border-2 border-blue-500"><AvatarImage src={student.photoUrl} alt={student.name} /><AvatarFallback className="text-2xl bg-blue-100">{student.name?.charAt(0)}</AvatarFallback></Avatar><div><DialogTitle className="text-2xl">{student.name}</DialogTitle><p className="text-muted-foreground">{student.course}</p><p className="text-sm text-blue-600">{student.institution}</p></div></div></DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2"><div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-blue-500"/>{student.email}</div><div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-blue-500"/>{student.phone || "Not provided"}</div><div className="flex items-center gap-2 text-sm"><GraduationCap className="h-4 w-4 text-blue-500"/>{student.highestQualification}</div></div>
                    <div><h3 className="font-semibold mb-2">Bio</h3><p className="text-sm text-muted-foreground">{student.bio || "No bio provided."}</p></div>
                    <div><h3 className="font-semibold mb-2">Skills</h3><div className="flex flex-wrap gap-2">{student.skills?.map((skill: string) => <Badge key={skill} variant="secondary">{skill}</Badge>)}</div></div>
                     <div><h3 className="font-semibold mb-2">Documents</h3><div className="space-y-2">{student.documents?.map((doc: any) => (<div key={doc._id} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded-md"><div className="flex items-center gap-2"><File className="h-4 w-4" />{doc.fileName}</div><a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></div>))}</div></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// --- CANDIDATE BROWSER TAB (No Changes) ---
const CandidateBrowserTab = () => {
    const [searchText, setSearchText] = useState("");
    const [qualification, setQualification] = useState("all");
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
    const [vidyarthiIdInput, setVidyarthiIdInput] = useState("");
    const [idToSearch, setIdToSearch] = useState("");
    const [isFetchingById, setIsFetchingById] = useState(false);

    const students = useQuery(api.recruiters.searchStudents, { searchText, qualification });
    const studentByIdData = useQuery(api.recruiters.getStudentByVidyarthiId, idToSearch ? { vidyarthiId: idToSearch } : "skip");

    const handleFetchById = () => {
        setIsFetchingById(true);
        setIdToSearch(vidyarthiIdInput);
    };

    useEffect(() => {
        if (idToSearch && studentByIdData !== undefined) {
            setIsFetchingById(false);
            if (studentByIdData) {
                setSelectedStudent(studentByIdData);
            } else {
                alert("No student found with that Vidyarthi ID.");
            }
            setIdToSearch("");
        }
    }, [studentByIdData, idToSearch]);

    return (
        <div className="space-y-6">
            {selectedStudent && <StudentProfileModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
            <div><h1 className="text-3xl font-bold text-blue-900">Candidate Browser</h1></div>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" /> Fetch by Vidyarthi ID</CardTitle></CardHeader>
                <CardContent className="flex gap-2">
                    <Input placeholder="Enter a student's Vidyarthi ID..." value={vidyarthiIdInput} onChange={(e) => setVidyarthiIdInput(e.target.value)} />
                    <Button onClick={handleFetchById} disabled={!vidyarthiIdInput || isFetchingById}>{isFetchingById ? <Loader2 className="h-4 w-4 animate-spin"/> : "Fetch"}</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" /> Filter Candidates</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Search by name or course..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <Select value={qualification} onValueChange={setQualification}>
                        <SelectTrigger><SelectValue placeholder="Filter by qualification" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Qualifications</SelectItem><SelectItem value="12th">12th Standard</SelectItem><SelectItem value="Bachelor's">Bachelor's Degree</SelectItem><SelectItem value="Master's">Master's Degree</SelectItem><SelectItem value="PhD">PhD</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            {students === undefined && <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin"/></div>}
            {students && students.length === 0 && <p className="text-center text-gray-500 py-8">No students found matching your criteria.</p>}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {students?.map(student => (
                    <Card key={student._id}>
                        <CardHeader className="flex-row items-center gap-4"><Avatar className="h-12 w-12"><AvatarImage src={(student as any).photoUrl || undefined} /><AvatarFallback className="bg-blue-100">{student.name.charAt(0)}</AvatarFallback></Avatar><div><CardTitle>{student.name}</CardTitle><CardDescription>{student.course || "Course not specified"}</CardDescription></div></CardHeader>
                        <CardContent className="space-y-4"><div className="flex flex-wrap gap-1 h-12 overflow-hidden">{student.skills?.slice(0, 4).map((skill: string) => <Badge key={skill} variant="secondary">{skill}</Badge>)}</div><Button size="sm" className="w-full" onClick={() => setSelectedStudent(student)}><Eye className="h-4 w-4 mr-2" />View Profile</Button></CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};



// --- Main Recruiter Dashboard Component ---
function RecruiterDashboardContent({ currentUser }: { currentUser: any }) {
    // --- MODIFIED: Set default tab to 'overview' and restored navigation items ---
    const [activeTab, setActiveTab] = useState("overview");

    const navigation = [
        { name: "Overview", id: "overview", icon: Home },
        { name: "Candidates", id: "candidates", icon: Users },
        { name: "Applications", id: "applications", icon: FileText },
        { name: "Analytics", id: "analytics", icon: BarChart3 },
    ];

    return (
        <div className="w-full min-h-screen bg-slate-50 text-slate-800">
            <div className="flex">
                <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-blue-900 text-white min-h-screen">
                    <div className="flex h-16 items-center px-4"><h1 className="text-xl font-bold">Vidyarthi Recruit</h1></div>
                    <nav className="flex-1 px-4 pb-4">
                        <ul className="space-y-2">
                           {navigation.map(item => (
                                <li key={item.name}>
                                    <button
                                        onClick={() => setActiveTab(item.id)}
                                        className={`group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 ${
                                        activeTab === item.id ? "bg-orange-500 text-white" : "text-blue-100 hover:bg-blue-800 hover:text-white"
                                        }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </button>
                                </li>
                           ))}
                        </ul>
                    </nav>
                </aside>
                <div className="flex-1">
                    <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-blue-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                         <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="ml-auto flex items-center gap-x-4">
                                <Button variant="ghost" size="sm" className="text-blue-900 hover:bg-orange-100"><Bell className="h-5 w-5" /></Button>
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-blue-200" />
                                <div className="flex items-center gap-x-2">
                                    <SignedIn>
                                        <UserButton />
                                    </SignedIn>
                                    <div>
                                        <span className="hidden lg:inline text-sm font-medium text-blue-900">{currentUser.name}</span>
                                        <p className="text-xs text-gray-500 hidden lg:block">{currentUser.organization}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="p-4 sm:p-6 lg:p-8">
                        {/* --- MODIFIED: Added OverviewTab back to the render logic --- */}
                        {activeTab === 'overview' && <OverviewTab />}
                        {activeTab === 'candidates' && <CandidateBrowserTab />}
                        {activeTab === 'applications' && <ComingSoonTab title="Application Manager" />}
                        {activeTab === 'analytics' && <ComingSoonTab title="Analytics Dashboard" />}
                    </main>
                </div>
            </div>
        </div>
    );
}

// --- NEW/RESTORED: OverviewTab Component, now synced with Convex ---
const OverviewTab = () => {
    const stats = useQuery(api.recruiters.getDashboardStats);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-blue-900">Dashboard Overview</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardTitle>Total Candidates</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{stats?.studentCount ?? <Loader2 className="h-6 w-6 animate-spin" />}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>New Applications</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{stats?.newApplications ?? 0}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Interviews Today</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{stats?.interviewsToday ?? 0}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Positions Filled</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0</p></CardContent></Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Recent Notifications</CardTitle></CardHeader>
                <CardContent><p className="text-gray-500">Notifications will appear here.</p></CardContent>
            </Card>
        </div>
    );
};

const ComingSoonTab = ({ title }: { title: string }) => (
    <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-blue-900">{title}</h1>
        <p className="text-blue-700">This feature is coming soon.</p>
    </div>
);

// --- Top-Level Wrapper Component (No Changes) ---
export default function RecruitmentDashboardPage() {
    const { isLoaded } = useAuth();
    const currentUser = useQuery(api.users.get, isLoaded ? undefined : "skip");

    if (!isLoaded || currentUser === undefined) {
        return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>;
    }
    
    return (
        <div>
           {currentUser?.role === 'recruiter' ? <RecruiterDashboardContent currentUser={currentUser} /> : 
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <RecruiterOnboardingForm currentUser={currentUser} />
            </div>
           }
        </div>
    );
}