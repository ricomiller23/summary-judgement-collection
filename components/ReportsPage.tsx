"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BarChart3,
    Download,
    Calendar,
    TrendingUp,
    DollarSign,
    FileText,
    Clock,
    CheckCircle,
    AlertTriangle,
    PieChart,
} from "lucide-react";

interface Report {
    id: string;
    title: string;
    type: "summary" | "financial" | "timeline" | "compliance";
    date: string;
    status: "ready" | "generating";
}

const reports: Report[] = [
    { id: "1", title: "Case Summary Report", type: "summary", date: "2024-12-31", status: "ready" },
    { id: "2", title: "Financial Recovery Analysis", type: "financial", date: "2024-12-30", status: "ready" },
    { id: "3", title: "Collection Timeline Report", type: "timeline", date: "2024-12-28", status: "ready" },
    { id: "4", title: "Compliance Status Report", type: "compliance", date: "2024-12-25", status: "ready" },
];

const metrics = [
    { label: "Total Recovery Target", value: "$2,378,443.28", icon: DollarSign, color: "text-[#00bcd4]" },
    { label: "Collection Progress", value: "0%", icon: TrendingUp, color: "text-[#ff9800]" },
    { label: "Days Since Judgment", value: "36", icon: Calendar, color: "text-[#9ca3af]" },
    { label: "Active Deadlines", value: "2", icon: AlertTriangle, color: "text-[#f44336]" },
];

export function ReportsPage() {
    const [generating, setGenerating] = useState(false);

    const handleGenerateReport = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <BarChart3 className="w-7 h-7 text-[#00bcd4]" />
                        Reports & Analytics
                    </h1>
                    <p className="text-[#9ca3af] mt-1">Case analytics, reports, and collection metrics</p>
                </div>
                <Button
                    onClick={handleGenerateReport}
                    className="bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                    disabled={generating}
                >
                    {generating ? (
                        <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Report
                        </>
                    )}
                </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                    <Card key={i} className="bg-[#22262d] border-[#2d3139]">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-[#6b7280] uppercase">{metric.label}</p>
                                    <p className={`text-2xl font-bold mt-1 ${metric.color}`}>{metric.value}</p>
                                </div>
                                <metric.icon className={`w-8 h-8 ${metric.color} opacity-50`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
                {/* Collection Progress Chart */}
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Collection Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-48">
                            <div className="relative w-40 h-40">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2d3139" strokeWidth="12" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#00bcd4"
                                        strokeWidth="12"
                                        strokeDasharray="251.2"
                                        strokeDashoffset="251.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-3xl font-bold text-white">0%</p>
                                    <p className="text-xs text-[#6b7280]">Collected</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
                            <div>
                                <p className="text-[#6b7280]">Target</p>
                                <p className="text-white font-medium">$2.38M</p>
                            </div>
                            <div>
                                <p className="text-[#6b7280]">Collected</p>
                                <p className="text-[#4caf50] font-medium">$0</p>
                            </div>
                            <div>
                                <p className="text-[#6b7280]">Remaining</p>
                                <p className="text-[#f44336] font-medium">$2.38M</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Domestication Status */}
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Domestication Status by State</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { state: "Florida", status: "Original Judgment", progress: 100, color: "#4caf50" },
                                { state: "Tennessee", status: "Filing Pending", progress: 25, color: "#ff9800" },
                                { state: "Delaware", status: "Not Started", progress: 0, color: "#6b7280" },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-medium">{item.state}</span>
                                        <Badge
                                            style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                        >
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <div className="h-2 bg-[#2a2f38] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{ width: `${item.progress}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Available Reports */}
            <Card className="bg-[#22262d] border-[#2d3139]">
                <CardHeader>
                    <CardTitle className="text-white text-lg">Available Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg border border-[#363b44]"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-[#00bcd4]" />
                                    <div>
                                        <p className="text-white font-medium">{report.title}</p>
                                        <p className="text-xs text-[#6b7280]">Generated: {report.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {report.status === "ready" && (
                                        <CheckCircle className="w-4 h-4 text-[#4caf50]" />
                                    )}
                                    <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-white">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ReportsPage;
