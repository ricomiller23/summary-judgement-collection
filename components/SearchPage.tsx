"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search,
    FileText,
    Users,
    Calendar,
    Scale,
    DollarSign,
    MapPin,
    Building,
    Clock,
    ArrowRight,
} from "lucide-react";

interface SearchResult {
    id: string;
    type: "document" | "party" | "event" | "statute" | "asset";
    title: string;
    description: string;
    date?: string;
    relevance: number;
}

const mockResults: SearchResult[] = [
    { id: "1", type: "document", title: "Final Summary Judgment.pdf", description: "Court order granting summary judgment in favor of Good Dogg Beverage Company LLC", date: "2024-11-25", relevance: 98 },
    { id: "2", type: "party", title: "Management Services Holdings, LLC", description: "Defendant entity - registered in Tennessee", relevance: 95 },
    { id: "3", type: "asset", title: "Commercial Property - TN", description: "2685 Hampshire Pike, Columbia, TN 38401", relevance: 88 },
    { id: "4", type: "statute", title: "TN Code § 26-9-101", description: "Uniform Enforcement of Foreign Judgments Act", relevance: 85 },
    { id: "5", type: "event", title: "Motion Response Deadline", description: "Response due for Motion to Domesticate", date: "2025-01-05", relevance: 82 },
];

const recentSearches = [
    "judgment domestication",
    "defendant assets",
    "Tennessee filing",
    "writ of execution",
    "garnishment procedures",
];

const getTypeIcon = (type: string) => {
    switch (type) {
        case "document": return <FileText className="w-5 h-5 text-[#f44336]" />;
        case "party": return <Users className="w-5 h-5 text-[#00bcd4]" />;
        case "event": return <Calendar className="w-5 h-5 text-[#ff9800]" />;
        case "statute": return <Scale className="w-5 h-5 text-[#9c27b0]" />;
        case "asset": return <DollarSign className="w-5 h-5 text-[#4caf50]" />;
        default: return <FileText className="w-5 h-5 text-[#6b7280]" />;
    }
};

const getTypeColor = (type: string) => {
    switch (type) {
        case "document": return "bg-[#f44336]/20 text-[#f44336]";
        case "party": return "bg-[#00bcd4]/20 text-[#00bcd4]";
        case "event": return "bg-[#ff9800]/20 text-[#ff9800]";
        case "statute": return "bg-[#9c27b0]/20 text-[#9c27b0]";
        case "asset": return "bg-[#4caf50]/20 text-[#4caf50]";
        default: return "bg-[#6b7280]/20 text-[#6b7280]";
    }
};

export function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
        if (!query.trim()) return;
        setSearching(true);
        setTimeout(() => {
            setResults(mockResults.filter(r =>
                r.title.toLowerCase().includes(query.toLowerCase()) ||
                r.description.toLowerCase().includes(query.toLowerCase())
            ));
            if (results.length === 0) setResults(mockResults);
            setSearching(false);
        }, 500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Search className="w-7 h-7 text-[#00bcd4]" />
                    Global Search
                </h1>
                <p className="text-[#9ca3af] mt-1">Search across all documents, parties, events, and data</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
                <Input
                    placeholder="Search documents, parties, events, assets..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 pr-24 py-6 text-lg bg-[#22262d] border-[#2d3139] text-white placeholder:text-[#6b7280] focus:border-[#00bcd4]"
                />
                <Button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00bcd4] hover:bg-[#00acc1]"
                    disabled={searching}
                >
                    {searching ? "Searching..." : "Search"}
                </Button>
            </div>

            {/* Recent Searches or Results */}
            {results.length === 0 ? (
                <div>
                    <h3 className="text-sm font-medium text-[#6b7280] mb-3">Recent Searches</h3>
                    <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, i) => (
                            <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setQuery(search);
                                    handleSearch();
                                }}
                                className="border-[#2d3139] text-[#9ca3af] hover:text-white hover:border-[#00bcd4]"
                            >
                                <Clock className="w-3 h-3 mr-2" />
                                {search}
                            </Button>
                        ))}
                    </div>

                    {/* Quick Access */}
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {[
                            { icon: FileText, label: "Documents", count: 8 },
                            { icon: Users, label: "Parties", count: 4 },
                            { icon: Calendar, label: "Events", count: 12 },
                            { icon: DollarSign, label: "Assets", count: 5 },
                        ].map((item, i) => (
                            <Card key={i} className="bg-[#22262d] border-[#2d3139] hover:border-[#00bcd4]/50 transition-colors cursor-pointer">
                                <CardContent className="p-6 text-center">
                                    <item.icon className="w-8 h-8 text-[#00bcd4] mx-auto mb-3" />
                                    <p className="text-white font-medium">{item.label}</p>
                                    <p className="text-[#6b7280] text-sm">{item.count} items</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-[#6b7280] text-sm">{results.length} results found</p>
                    {results.map((result) => (
                        <Card key={result.id} className="bg-[#22262d] border-[#2d3139] hover:border-[#00bcd4]/50 transition-colors cursor-pointer">
                            <CardContent className="p-4 flex items-center gap-4">
                                {getTypeIcon(result.type)}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-white font-medium">{result.title}</p>
                                        <Badge className={getTypeColor(result.type)}>{result.type}</Badge>
                                    </div>
                                    <p className="text-[#9ca3af] text-sm mt-1">{result.description}</p>
                                    {result.date && <p className="text-[#6b7280] text-xs mt-1">{result.date}</p>}
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#6b7280]">Relevance</p>
                                    <p className="text-[#00bcd4] font-bold">{result.relevance}%</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#6b7280]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchPage;
