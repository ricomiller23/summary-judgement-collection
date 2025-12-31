"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Zap,
    Linkedin,
    Building,
    User,
    MapPin,
    Phone,
    Mail,
    Globe,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    ExternalLink,
    RefreshCw,
} from "lucide-react";

interface IntelItem {
    id: string;
    type: "linkedin" | "corporate" | "property" | "news";
    title: string;
    description: string;
    date: string;
    isNew: boolean;
    priority: "high" | "medium" | "low";
}

const intelData: IntelItem[] = [
    { id: "1", type: "linkedin", title: "Evan Rutchik changed status to 'Open to Work'", description: "Key contact's employment status changed - potential leverage point for negotiations", date: "2024-12-31", isNew: true, priority: "high" },
    { id: "2", type: "corporate", title: "New UCC Filing Discovered", description: "Management Services Holdings filed new UCC-1 with First Tennessee Bank", date: "2024-12-30", isNew: true, priority: "high" },
    { id: "3", type: "property", title: "Property Tax Record Updated", description: "2685 Hampshire Pike property tax assessment increased to $485,000", date: "2024-12-28", isNew: true, priority: "medium" },
    { id: "4", type: "news", title: "Industry Article Mention", description: "Defendant company mentioned in Nashville Business Journal article about beverage distribution", date: "2024-12-25", isNew: false, priority: "low" },
    { id: "5", type: "corporate", title: "Annual Report Filed", description: "Tennessee Secretary of State annual report filed - registered agent unchanged", date: "2024-12-20", isNew: false, priority: "low" },
];

const parties = [
    {
        name: "Management Services Holdings, LLC",
        role: "Defendant",
        type: "company",
        location: "Columbia, TN",
        status: "Active",
        intel: 3,
    },
    {
        name: "Evan Rutchik",
        role: "Principal",
        type: "individual",
        location: "Nashville, TN",
        status: "Open to Work",
        intel: 1,
    },
    {
        name: "First Tennessee Bank",
        role: "Secured Creditor",
        type: "company",
        location: "Memphis, TN",
        status: "Active Lien",
        intel: 1,
    },
];

const getTypeIcon = (type: string) => {
    switch (type) {
        case "linkedin": return <Linkedin className="w-5 h-5 text-[#0077b5]" />;
        case "corporate": return <Building className="w-5 h-5 text-[#00bcd4]" />;
        case "property": return <MapPin className="w-5 h-5 text-[#4caf50]" />;
        case "news": return <Globe className="w-5 h-5 text-[#9c27b0]" />;
        default: return <Zap className="w-5 h-5 text-[#6b7280]" />;
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high": return "bg-[#f44336]/20 text-[#f44336]";
        case "medium": return "bg-[#ff9800]/20 text-[#ff9800]";
        case "low": return "bg-[#6b7280]/20 text-[#6b7280]";
        default: return "bg-[#6b7280]/20 text-[#6b7280]";
    }
};

export function IntelPage() {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Zap className="w-7 h-7 text-[#00bcd4]" />
                        Intelligence Center
                    </h1>
                    <p className="text-[#9ca3af] mt-1">Real-time monitoring and insights on parties and assets</p>
                </div>
                <Button
                    onClick={handleRefresh}
                    className="bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                    disabled={refreshing}
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                    {refreshing ? "Refreshing..." : "Refresh Intel"}
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">New Intel</p>
                        <p className="text-2xl font-bold text-[#00bcd4] mt-1">
                            {intelData.filter(i => i.isNew).length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">High Priority</p>
                        <p className="text-2xl font-bold text-[#f44336] mt-1">
                            {intelData.filter(i => i.priority === "high").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Monitored Parties</p>
                        <p className="text-2xl font-bold text-white mt-1">{parties.length}</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Last Updated</p>
                        <p className="text-lg font-bold text-white mt-1">2 min ago</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="feed" className="space-y-4">
                <TabsList className="bg-[#22262d] border border-[#2d3139]">
                    <TabsTrigger value="feed" className="data-[state=active]:bg-[#00bcd4]">
                        Intel Feed
                    </TabsTrigger>
                    <TabsTrigger value="parties" className="data-[state=active]:bg-[#00bcd4]">
                        Monitored Parties
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="feed" className="space-y-3">
                    {intelData.map((item) => (
                        <Card key={item.id} className={`bg-[#22262d] border-[#2d3139] ${item.isNew ? "border-l-4 border-l-[#00bcd4]" : ""}`}>
                            <CardContent className="p-4 flex items-start gap-4">
                                {getTypeIcon(item.type)}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-white font-medium">{item.title}</p>
                                        {item.isNew && <Badge className="bg-[#00bcd4] text-white text-[10px]">NEW</Badge>}
                                        <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                    </div>
                                    <p className="text-[#9ca3af] text-sm">{item.description}</p>
                                    <p className="text-[#6b7280] text-xs mt-2">{item.date}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-[#9ca3af]">
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="parties" className="space-y-4">
                    {parties.map((party, i) => (
                        <Card key={i} className="bg-[#22262d] border-[#2d3139]">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-[#2a2f38] flex items-center justify-center">
                                            {party.type === "company" ? (
                                                <Building className="w-6 h-6 text-[#00bcd4]" />
                                            ) : (
                                                <User className="w-6 h-6 text-[#00bcd4]" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{party.name}</p>
                                            <p className="text-[#9ca3af] text-sm">{party.role}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-[#6b7280]">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {party.location}
                                                </span>
                                                <Badge variant="outline" className="border-[#4caf50] text-[#4caf50]">
                                                    {party.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[#6b7280]">Intel Items</p>
                                        <p className="text-2xl font-bold text-[#00bcd4]">{party.intel}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default IntelPage;
