"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    FileText,
    FolderOpen,
    Upload,
    Download,
    Eye,
    Search,
    File,
    FileImage,
    FileSpreadsheet,
    Filter,
    Grid,
    List,
    Clock,
    CheckCircle,
} from "lucide-react";

interface Document {
    id: string;
    name: string;
    type: "pdf" | "image" | "spreadsheet" | "doc";
    category: "judgment" | "filing" | "correspondence" | "evidence" | "other";
    size: string;
    date: string;
    status: "signed" | "pending" | "draft";
}

const documents: Document[] = [
    { id: "1", name: "Final Summary Judgment.pdf", type: "pdf", category: "judgment", size: "2.4 MB", date: "2024-11-25", status: "signed" },
    { id: "2", name: "Domestication Filing - TN.pdf", type: "pdf", category: "filing", size: "1.1 MB", date: "2024-12-15", status: "pending" },
    { id: "3", name: "Domestication Filing - DE.pdf", type: "pdf", category: "filing", size: "980 KB", date: "2024-12-20", status: "draft" },
    { id: "4", name: "Demand Letter - Defendant.pdf", type: "pdf", category: "correspondence", size: "340 KB", date: "2024-12-22", status: "signed" },
    { id: "5", name: "Asset Discovery Report.xlsx", type: "spreadsheet", category: "evidence", size: "156 KB", date: "2024-12-28", status: "signed" },
    { id: "6", name: "Property Records - TN.pdf", type: "pdf", category: "evidence", size: "4.2 MB", date: "2024-12-29", status: "signed" },
    { id: "7", name: "Vehicle Registration Records.pdf", type: "pdf", category: "evidence", size: "890 KB", date: "2024-12-29", status: "signed" },
    { id: "8", name: "Corporate Structure Chart.png", type: "image", category: "evidence", size: "1.8 MB", date: "2024-12-30", status: "signed" },
];

const getFileIcon = (type: string) => {
    switch (type) {
        case "pdf": return <FileText className="w-8 h-8 text-[#f44336]" />;
        case "image": return <FileImage className="w-8 h-8 text-[#4caf50]" />;
        case "spreadsheet": return <FileSpreadsheet className="w-8 h-8 text-[#4caf50]" />;
        default: return <File className="w-8 h-8 text-[#9ca3af]" />;
    }
};

const getCategoryColor = (category: string) => {
    switch (category) {
        case "judgment": return "bg-[#ff9800]/20 text-[#ff9800]";
        case "filing": return "bg-[#00bcd4]/20 text-[#00bcd4]";
        case "correspondence": return "bg-[#9c27b0]/20 text-[#9c27b0]";
        case "evidence": return "bg-[#4caf50]/20 text-[#4caf50]";
        default: return "bg-[#6b7280]/20 text-[#6b7280]";
    }
};

export function DocumentStationPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [filter, setFilter] = useState<string>("all");

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "all" || doc.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FolderOpen className="w-7 h-7 text-[#00bcd4]" />
                        Document Station
                    </h1>
                    <p className="text-[#9ca3af] mt-1">Manage all case documents, filings, and evidence</p>
                </div>
                <Button className="bg-[#00bcd4] hover:bg-[#00acc1] text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Total Documents</p>
                        <p className="text-2xl font-bold text-white mt-1">{documents.length}</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Signed</p>
                        <p className="text-2xl font-bold text-[#4caf50] mt-1">
                            {documents.filter(d => d.status === "signed").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Pending</p>
                        <p className="text-2xl font-bold text-[#ff9800] mt-1">
                            {documents.filter(d => d.status === "pending").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-4">
                        <p className="text-xs text-[#6b7280] uppercase">Drafts</p>
                        <p className="text-2xl font-bold text-[#9ca3af] mt-1">
                            {documents.filter(d => d.status === "draft").length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
                    <Input
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-[#22262d] border-[#2d3139] text-white placeholder:text-[#6b7280]"
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "judgment", "filing", "evidence", "correspondence"].map((cat) => (
                        <Button
                            key={cat}
                            variant={filter === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter(cat)}
                            className={filter === cat ? "bg-[#00bcd4]" : "border-[#2d3139] text-[#9ca3af]"}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </Button>
                    ))}
                </div>
                <div className="flex gap-1 border border-[#2d3139] rounded-lg p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={viewMode === "list" ? "bg-[#2a2f38]" : ""}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={viewMode === "grid" ? "bg-[#2a2f38]" : ""}
                    >
                        <Grid className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Documents List */}
            <div className={viewMode === "grid" ? "grid grid-cols-4 gap-4" : "space-y-2"}>
                {filteredDocs.map((doc) => (
                    <Card key={doc.id} className="bg-[#22262d] border-[#2d3139] hover:border-[#00bcd4]/50 transition-colors">
                        <CardContent className={viewMode === "grid" ? "p-4 text-center" : "p-4 flex items-center gap-4"}>
                            {getFileIcon(doc.type)}
                            <div className={viewMode === "grid" ? "mt-3" : "flex-1"}>
                                <p className="text-white font-medium text-sm truncate">{doc.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getCategoryColor(doc.category)} variant="outline">
                                        {doc.category}
                                    </Badge>
                                    <span className="text-xs text-[#6b7280]">{doc.size}</span>
                                </div>
                                <p className="text-xs text-[#6b7280] mt-1">{doc.date}</p>
                            </div>
                            {viewMode === "list" && (
                                <div className="flex items-center gap-2">
                                    {doc.status === "signed" && <CheckCircle className="w-4 h-4 text-[#4caf50]" />}
                                    {doc.status === "pending" && <Clock className="w-4 h-4 text-[#ff9800]" />}
                                    <Button variant="ghost" size="sm" className="text-[#9ca3af]">
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-[#9ca3af]">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default DocumentStationPage;
