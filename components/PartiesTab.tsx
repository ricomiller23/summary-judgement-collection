"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parties, type Party, type IntelUpdate } from "@/lib/demo-data";
import {
    User,
    Building2,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Twitter,
    Bell,
    AlertCircle,
    ExternalLink,
    MessageSquare,
    Eye,
    Filter,
    Search,
    Plus,
    CheckCircle2
} from "lucide-react";

const roleColors: Record<string, string> = {
    PLAINTIFF: "bg-green-500/20 text-green-400 border-green-500/50",
    DEFENDANT: "bg-red-500/20 text-red-400 border-red-500/50",
    ATTORNEY: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    WITNESS: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    EXPERT: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    OTHER: "bg-slate-500/20 text-slate-400 border-slate-500/50",
};

const sourceIcons: Record<string, React.ReactNode> = {
    LINKEDIN: <Linkedin className="h-4 w-4 text-blue-400" />,
    TWITTER: <Twitter className="h-4 w-4 text-sky-400" />,
    NEWS: <ExternalLink className="h-4 w-4 text-amber-400" />,
    COURT_FILING: <AlertCircle className="h-4 w-4 text-purple-400" />,
    MANUAL: <MessageSquare className="h-4 w-4 text-slate-400" />,
};

const sourceLabels: Record<string, string> = {
    LINKEDIN: "LinkedIn",
    TWITTER: "Twitter/X",
    NEWS: "News",
    COURT_FILING: "Court Filing",
    MANUAL: "Manual Entry",
};

export function PartiesTab() {
    const [partyData, setPartyData] = useState<Party[]>(parties);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedParty, setSelectedParty] = useState<Party | null>(null);
    const [showIntelDetail, setShowIntelDetail] = useState<IntelUpdate | null>(null);

    const filteredParties = partyData.filter(party =>
        party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalUnreadIntel = partyData.reduce((count, party) =>
        count + party.intelUpdates.filter(u => !u.read).length, 0
    );

    const markAsRead = (partyId: string, intelId: string) => {
        setPartyData(prev => prev.map(party => {
            if (party.id === partyId) {
                return {
                    ...party,
                    intelUpdates: party.intelUpdates.map(intel =>
                        intel.id === intelId ? { ...intel, read: true } : intel
                    )
                };
            }
            return party;
        }));
        // Update selected party if viewing
        if (selectedParty?.id === partyId) {
            setSelectedParty(prev => prev ? {
                ...prev,
                intelUpdates: prev.intelUpdates.map(intel =>
                    intel.id === intelId ? { ...intel, read: true } : intel
                )
            } : null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search parties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {totalUnreadIntel > 0 && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/50 animate-pulse">
                            <Bell className="h-3 w-3 mr-1" />
                            {totalUnreadIntel} New Intel
                        </Badge>
                    )}
                    <Button className="bg-amber-600 hover:bg-amber-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Party
                    </Button>
                </div>
            </div>

            {/* Parties Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredParties.map(party => {
                    const unreadCount = party.intelUpdates.filter(u => !u.read).length;
                    const importantCount = party.intelUpdates.filter(u => u.important && !u.read).length;

                    return (
                        <Card
                            key={party.id}
                            className="bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group relative"
                            onClick={() => setSelectedParty(party)}
                        >
                            {/* Notification Badge */}
                            {unreadCount > 0 && (
                                <div className="absolute -top-2 -right-2 z-10">
                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${importantCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-500 text-black'
                                        }`}>
                                        {unreadCount}
                                    </span>
                                </div>
                            )}

                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                                        {party.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-white group-hover:text-amber-400 transition-colors">
                                            {party.name}
                                        </CardTitle>
                                        {party.company && (
                                            <CardDescription className="flex items-center gap-1 mt-1">
                                                <Building2 className="h-3 w-3" />
                                                {party.company}
                                            </CardDescription>
                                        )}
                                        <Badge className={`mt-2 text-xs ${roleColors[party.role]}`}>
                                            {party.role}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {/* Contact Info */}
                                <div className="space-y-1 text-sm">
                                    {party.email && (
                                        <p className="text-slate-400 flex items-center gap-2">
                                            <Mail className="h-3 w-3" /> {party.email}
                                        </p>
                                    )}
                                    {party.phone && (
                                        <p className="text-slate-400 flex items-center gap-2">
                                            <Phone className="h-3 w-3" /> {party.phone}
                                        </p>
                                    )}
                                    {party.address && (
                                        <p className="text-slate-400 flex items-center gap-2">
                                            <MapPin className="h-3 w-3" /> {party.address}
                                        </p>
                                    )}
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center gap-2">
                                    {party.linkedIn && (
                                        <a
                                            href={party.linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-md bg-slate-800 hover:bg-blue-500/20 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Linkedin className="h-4 w-4 text-blue-400" />
                                        </a>
                                    )}
                                    {party.twitter && (
                                        <a
                                            href={party.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-md bg-slate-800 hover:bg-sky-500/20 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Twitter className="h-4 w-4 text-sky-400" />
                                        </a>
                                    )}
                                </div>

                                {/* Latest Intel Preview */}
                                {party.intelUpdates.length > 0 && (
                                    <div className="pt-3 border-t border-slate-800">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Latest Intel</p>
                                        <div className={`p-2 rounded-md text-xs ${party.intelUpdates[0].read ? 'bg-slate-800/50' : 'bg-amber-500/10 border border-amber-500/30'
                                            }`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                {sourceIcons[party.intelUpdates[0].source]}
                                                <span className="text-slate-400">{sourceLabels[party.intelUpdates[0].source]}</span>
                                                {party.intelUpdates[0].important && (
                                                    <Badge className="bg-red-500/20 text-red-400 text-[10px] px-1">Important</Badge>
                                                )}
                                            </div>
                                            <p className="text-slate-300 line-clamp-1">{party.intelUpdates[0].title}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Party Detail Dialog */}
            <Dialog open={!!selectedParty} onOpenChange={() => setSelectedParty(null)}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden">
                    {selectedParty && (
                        <>
                            <DialogHeader>
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl">
                                        {selectedParty.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl">{selectedParty.name}</DialogTitle>
                                        <DialogDescription>
                                            <Badge className={`mt-2 ${roleColors[selectedParty.role]}`}>
                                                {selectedParty.role}
                                            </Badge>
                                            {selectedParty.company && (
                                                <span className="ml-2 text-slate-400">{selectedParty.company}</span>
                                            )}
                                        </DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                        <User className="h-4 w-4 text-amber-500" />
                                        Contact Information
                                    </h4>
                                    <div className="space-y-2 text-sm bg-slate-800/50 rounded-lg p-4">
                                        {selectedParty.email && (
                                            <p className="text-slate-300 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-slate-500" /> {selectedParty.email}
                                            </p>
                                        )}
                                        {selectedParty.phone && (
                                            <p className="text-slate-300 flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-slate-500" /> {selectedParty.phone}
                                            </p>
                                        )}
                                        {selectedParty.address && (
                                            <p className="text-slate-300 flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-slate-500" /> {selectedParty.address}
                                            </p>
                                        )}
                                        <div className="flex gap-2 pt-2">
                                            {selectedParty.linkedIn && (
                                                <a
                                                    href={selectedParty.linkedIn}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-md bg-slate-700 hover:bg-blue-500/30 transition-colors"
                                                >
                                                    <Linkedin className="h-4 w-4 text-blue-400" />
                                                </a>
                                            )}
                                            {selectedParty.twitter && (
                                                <a
                                                    href={selectedParty.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-md bg-slate-700 hover:bg-sky-500/30 transition-colors"
                                                >
                                                    <Twitter className="h-4 w-4 text-sky-400" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                        <Bell className="h-4 w-4 text-amber-500" />
                                        Quick Actions
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" size="sm">
                                            <Plus className="h-4 w-4 mr-1" /> Add Note
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Bell className="h-4 w-4 mr-1" /> Set Alert
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Mail className="h-4 w-4 mr-1" /> Email
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Search className="h-4 w-4 mr-1" /> Asset Search
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Intel Feed */}
                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-white flex items-center gap-2 mb-4">
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                    Intelligence Feed
                                    {selectedParty.intelUpdates.filter(u => !u.read).length > 0 && (
                                        <Badge className="bg-red-500/20 text-red-400 ml-2">
                                            {selectedParty.intelUpdates.filter(u => !u.read).length} Unread
                                        </Badge>
                                    )}
                                </h4>
                                <ScrollArea className="h-64 pr-4">
                                    <div className="space-y-3">
                                        {selectedParty.intelUpdates.map(intel => (
                                            <div
                                                key={intel.id}
                                                className={`p-4 rounded-lg border transition-all cursor-pointer ${intel.read
                                                        ? 'bg-slate-800/30 border-slate-700'
                                                        : 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50'
                                                    }`}
                                                onClick={() => {
                                                    markAsRead(selectedParty.id, intel.id);
                                                    setShowIntelDetail(intel);
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 rounded-md bg-slate-800">
                                                            {sourceIcons[intel.source]}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-slate-500">{sourceLabels[intel.source]}</span>
                                                                {intel.important && (
                                                                    <Badge className="bg-red-500/20 text-red-400 text-[10px]">Important</Badge>
                                                                )}
                                                                {!intel.read && (
                                                                    <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">New</Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-white font-medium mt-1">{intel.title}</p>
                                                            <p className="text-sm text-slate-400 mt-1 line-clamp-2">{intel.content}</p>
                                                            <p className="text-xs text-slate-500 mt-2">
                                                                {new Date(intel.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {intel.read && (
                                                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>

                            <DialogFooter className="mt-4">
                                <Button variant="outline" onClick={() => setSelectedParty(null)}>Close</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Intel Detail Dialog */}
            <Dialog open={!!showIntelDetail} onOpenChange={() => setShowIntelDetail(null)}>
                <DialogContent>
                    {showIntelDetail && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-2">
                                    {sourceIcons[showIntelDetail.source]}
                                    <DialogTitle>{showIntelDetail.title}</DialogTitle>
                                </div>
                                <DialogDescription>
                                    {sourceLabels[showIntelDetail.source]} • {new Date(showIntelDetail.createdAt).toLocaleString()}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <p className="text-slate-300">{showIntelDetail.content}</p>
                                {showIntelDetail.url && (
                                    <a
                                        href={showIntelDetail.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 mt-4 text-sm"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        View Source
                                    </a>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowIntelDetail(null)}>Close</Button>
                                <Button className="bg-amber-600 hover:bg-amber-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Note
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
