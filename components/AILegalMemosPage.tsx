"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Brain,
    FileText,
    Plus,
    Clock,
    CheckCircle,
    RefreshCw,
    Scale,
    AlertTriangle,
    Download,
    Eye,
} from "lucide-react";

interface LegalMemo {
    id: string;
    title: string;
    type: "analysis" | "strategy" | "research" | "motion";
    status: "complete" | "generating" | "draft";
    date: string;
    summary: string;
}

const memos: LegalMemo[] = [
    {
        id: "1",
        title: "Domestication Strategy Analysis",
        type: "strategy",
        status: "complete",
        date: "2024-12-30",
        summary: "Comprehensive analysis of multi-state domestication requirements for the $2.3M summary judgment. Recommends prioritizing Tennessee registration first due to defendant's primary business location.",
    },
    {
        id: "2",
        title: "Asset Discovery Opportunities",
        type: "research",
        status: "complete",
        date: "2024-12-28",
        summary: "Research into Management Services Holdings, LLC corporate structure and potential asset attachment points. Identified 3 registered vehicles and commercial property holdings.",
    },
    {
        id: "3",
        title: "Motion for Writ of Execution",
        type: "motion",
        status: "draft",
        date: "2024-12-27",
        summary: "Draft motion prepared for filing once domestication is complete in Tennessee. Includes supporting declarations and exhibits.",
    },
    {
        id: "4",
        title: "UEFJA Compliance Review",
        type: "analysis",
        status: "complete",
        date: "2024-12-25",
        summary: "Analysis of Uniform Enforcement of Foreign Judgments Act requirements across FL, TN, and DE. All three states have adopted UEFJA with minor variations.",
    },
    {
        id: "5",
        title: "Judgment Debtor Examination Prep",
        type: "strategy",
        status: "generating",
        date: "2024-12-31",
        summary: "AI is generating recommended questions for judgment debtor examination based on discovered assets and corporate structure...",
    },
];

const getTypeColor = (type: string) => {
    switch (type) {
        case "analysis": return "bg-[#2196f3]/20 text-[#2196f3]";
        case "strategy": return "bg-[#00bcd4]/20 text-[#00bcd4]";
        case "research": return "bg-[#9c27b0]/20 text-[#9c27b0]";
        case "motion": return "bg-[#ff9800]/20 text-[#ff9800]";
        default: return "bg-[#6b7280]/20 text-[#6b7280]";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "complete": return <CheckCircle className="w-4 h-4 text-[#4caf50]" />;
        case "generating": return <RefreshCw className="w-4 h-4 text-[#00bcd4] animate-spin" />;
        case "draft": return <Clock className="w-4 h-4 text-[#ff9800]" />;
        default: return null;
    }
};

export function AILegalMemosPage() {
    const [generating, setGenerating] = useState(false);

    const handleGenerateMemo = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Brain className="w-7 h-7 text-[#00bcd4]" />
                        AI Legal Memos
                    </h1>
                    <p className="text-[#9ca3af] mt-1">AI-generated legal analysis, strategy, and motion drafts</p>
                </div>
                <Button
                    onClick={handleGenerateMemo}
                    className="bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                    disabled={generating}
                >
                    {generating ? (
                        <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4 mr-2" />
                            Generate New Memo
                        </>
                    )}
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Total Memos</p>
                        <p className="text-2xl font-bold text-white mt-1">{memos.length}</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Complete</p>
                        <p className="text-2xl font-bold text-[#4caf50] mt-1">
                            {memos.filter(m => m.status === "complete").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">In Progress</p>
                        <p className="text-2xl font-bold text-[#00bcd4] mt-1">
                            {memos.filter(m => m.status === "generating").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Drafts</p>
                        <p className="text-2xl font-bold text-[#ff9800] mt-1">
                            {memos.filter(m => m.status === "draft").length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Memos List */}
            <div className="space-y-4">
                {memos.map((memo) => (
                    <Card key={memo.id} className="bg-[#22262d] border-[#2d3139] hover:border-[#00bcd4]/50 transition-colors">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {getStatusIcon(memo.status)}
                                        <h3 className="text-white font-semibold">{memo.title}</h3>
                                        <Badge className={getTypeColor(memo.type)}>
                                            {memo.type}
                                        </Badge>
                                    </div>
                                    <p className="text-[#9ca3af] text-sm mb-3">{memo.summary}</p>
                                    <p className="text-xs text-[#6b7280]">Generated: {memo.date}</p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-white">
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-white">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default AILegalMemosPage;
