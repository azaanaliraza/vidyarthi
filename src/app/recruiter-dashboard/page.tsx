"use client"
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Building, Send, Search, Users, FileText, BarChart3, Bell, Menu, Home, Filter, Grid3X3, List, Mail, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Recruiter Approval Component ---
function RecruiterApprovalForm() {
    const [organization, setOrganization] = useState("");
    const requestUpgrade = useMutation(api.users.requestRecruiterUpgrade);
    const currentUser = useQuery(api.users.get);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!organization) return;
        setIsLoading(true);
        try {
            await requestUpgrade({ organization });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to submit request:", error);
            alert("There was an error submitting your request. Please try again.");
        }
        setIsLoading(false);
    };

    if (currentUser?.role === 'recruiter_pending' || isSubmitted) {
        return (
            <Card className="max-w-md mx-auto text-center">
                 <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-600">Request Submitted!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your request to become a recruiter has been sent for admin approval. You will be notified and gain access to the dashboard once approved.</p>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building className="h-6 w-6 text-blue-600"/> Request Recruiter Access</CardTitle>
                <CardDescription>To view student profiles, please verify your organization. An admin will approve your request shortly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input 
                        id="organization" 
                        value={organization} 
                        onChange={(e) => setOrganization(e.target.value)} 
                        placeholder="e.g., Ministry of Education"
                    />
                </div>
                <Button onClick={handleSubmit} disabled={isLoading || !organization} className="w-full bg-blue-600 hover:bg-blue-700">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Send className="mr-2 h-4 w-4" />
                    Submit for Approval
                </Button>
            </CardContent>
        </Card>
    );
}


// --- Main Recruiter Dashboard ---
function RecruiterDashboardContent() {
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
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-blue-900 text-white min-h-screen">
                    <div className="flex h-16 items-center px-4">
                        <h1 className="text-xl font-bold">Vidyarthi Recruit</h1>
                    </div>
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

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Bar */}
                    <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-blue-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <Button variant="ghost" size="sm" className="lg:hidden text-blue-900 hover:bg-blue-100">
                            <Menu className="h-4 w-4" />
                        </Button>
                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="relative flex flex-1 items-center">
                                <Search className="absolute left-3 h-4 w-4 text-blue-600" />
                                <Input
                                    className="block w-full rounded-md border border-blue-200 bg-white pl-10 pr-3 py-2 text-sm placeholder:text-blue-500 focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Search candidates, applications..."
                                />
                            </div>
                            <div className="flex items-center gap-x-4">
                                <Button variant="ghost" size="sm" className="text-blue-900 hover:bg-orange-100">
                                    <Bell className="h-5 w-5" />
                                </Button>
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-blue-200" />
                                <div className="flex items-center gap-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/recruiter-avatar.png" />
                                        <AvatarFallback className="bg-orange-500 text-white">RR</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden lg:inline text-sm font-medium text-blue-900">Ravi Kumar</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-4 sm:p-6 lg:p-8">
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

// --- TAB COMPONENTS ---

const OverviewTab = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard Overview</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card><CardHeader><CardTitle>Total Candidates</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">12,405</p></CardContent></Card>
            <Card><CardHeader><CardTitle>New Applications</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">89</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Interviews Today</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">5</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Positions Filled</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">12</p></CardContent></Card>
        </div>
        <Card>
            <CardHeader><CardTitle>Recent Notifications</CardTitle></CardHeader>
            <CardContent><p className="text-gray-500">Notifications will appear here.</p></CardContent>
        </Card>
    </div>
);

const CandidateBrowserTab = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const candidates = [
        { id: 1, name: "Priya Sharma", title: "Frontend Developer", avatar: "/placeholder-0mkvw.png", skills: ["React", "TypeScript", "Node.js"] },
        { id: 2, name: "Rohan Gupta", title: "Data Scientist", avatar: "/placeholder-s6jev.png", skills: ["Python", "ML", "SQL"] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-blue-900">Candidate Browser</h1>
                    <p className="text-blue-700">Discover and connect with top talent</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}><Grid3X3 className="h-4 w-4" /></Button>
                    <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" /> Filters</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Search by name, role..." />
                    <Select><SelectTrigger><SelectValue placeholder="Experience" /></SelectTrigger><SelectContent><SelectItem value="1">1-3 years</SelectItem></SelectContent></Select>
                    <Select><SelectTrigger><SelectValue placeholder="Field" /></SelectTrigger><SelectContent><SelectItem value="cs">Computer Science</SelectItem></SelectContent></Select>
                </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {candidates.map(c => (
                    <Card key={c.id}>
                        <CardHeader className="flex-row items-center gap-4"><Avatar><AvatarImage src={c.avatar} /><AvatarFallback>{c.name.charAt(0)}</AvatarFallback></Avatar><div><CardTitle>{c.name}</CardTitle><CardDescription>{c.title}</CardDescription></div></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">{c.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                            <div className="flex space-x-2"><Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button><Button size="sm" className="bg-blue-600 hover:bg-blue-700"><Mail className="h-4 w-4" /></Button></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const ComingSoonTab = ({ title }: { title: string }) => (
    <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-blue-900">{title}</h1>
        <p className="text-blue-700">This feature is coming soon.</p>
    </div>
);


// --- Top-Level Wrapper Component ---
export default function RecruitmentDashboardPage() {
    const { isLoaded } = useAuth();
    // Fetch the user data only after Clerk is loaded
    const currentUser = useQuery(api.users.get, isLoaded ? undefined : "skip");

    // Show a loading spinner until both Clerk is ready AND the Convex query has a result.
    if (!isLoaded || currentUser === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        );
    }
    
    return (
        <div>
           {currentUser?.role === 'recruiter' ? <RecruiterDashboardContent /> : 
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <RecruiterApprovalForm />
            </div>
           }
        </div>
    );
}