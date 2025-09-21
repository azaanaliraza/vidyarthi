"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

export default function AdminPage() {
    const pendingRecruiters = useQuery(api.admin.getPendingRecruiters);
    const approveRecruiter = useAction(api.admin.approveRecruiter);
    const [approvingId, setApprovingId] = useState<string | null>(null);

    const handleApprove = async (clerkId: string) => {
        setApprovingId(clerkId);
        try {
            await approveRecruiter({ clerkId });
        } catch (error) {
            console.error("Failed to approve recruiter:", error);
            alert("Approval failed. Please check the logs.");
        }
        setApprovingId(null);
    };

    if (pendingRecruiters === undefined) {
        return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-blue-900 mb-2">Admin Panel</h1>
                <p className="text-gray-600 mb-8">Recruiter Approval Queue</p>

                {pendingRecruiters.length === 0 ? (
                    <p className="text-center text-gray-500 py-16">No pending recruiter requests.</p>
                ) : (
                    <div className="space-y-4">
                        {pendingRecruiters.map((recruiter) => (
                            <Card key={recruiter._id}>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{recruiter.name}</p>
                                        <p className="text-sm text-gray-500">{recruiter.email}</p>
                                        {/* --- ADDED: Display the organization name --- */}
                                        <p className="text-sm font-bold text-blue-700 mt-1">{recruiter.organization}</p>
                                    </div>
                                    <Button 
                                        onClick={() => handleApprove(recruiter.clerkId)}
                                        disabled={approvingId === recruiter.clerkId}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        {approvingId === recruiter.clerkId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                        Approve
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}