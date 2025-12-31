"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timelineEvents, type TimelineEvent } from "@/lib/demo-data";
import {
    Calendar,
    Clock,
    FileText,
    Scale,
    Target,
    Flag,
    MessageSquare,
    Plus,
    ChevronDown,
    ChevronUp,
    Check,
    AlertTriangle,
    Gavel,
    Milestone
} from "lucide-react";

const eventTypeConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
    FILING: {
        icon: <FileText className="h-4 w-4" />,
        color: "text-blue-400",
        bgColor: "bg-blue-500/20 border-blue-500/50"
    },
    HEARING: {
        icon: <Gavel className="h-4 w-4" />,
        color: "text-purple-400",
        bgColor: "bg-purple-500/20 border-purple-500/50"
    },
    DEADLINE: {
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-red-400",
        bgColor: "bg-red-500/20 border-red-500/50"
    },
    MILESTONE: {
        icon: <Milestone className="h-4 w-4" />,
        color: "text-amber-400",
        bgColor: "bg-amber-500/20 border-amber-500/50"
    },
    ACTION: {
        icon: <Target className="h-4 w-4" />,
        color: "text-green-400",
        bgColor: "bg-green-500/20 border-green-500/50"
    },
    NOTE: {
        icon: <MessageSquare className="h-4 w-4" />,
        color: "text-slate-400",
        bgColor: "bg-slate-500/20 border-slate-500/50"
    },
};

const priorityConfig: Record<string, { color: string; label: string }> = {
    LOW: { color: "text-slate-400", label: "Low" },
    NORMAL: { color: "text-blue-400", label: "Normal" },
    HIGH: { color: "text-orange-400", label: "High" },
    URGENT: { color: "text-red-400", label: "Urgent" },
};

export function TimelineTab() {
    const [events, setEvents] = useState<TimelineEvent[]>(timelineEvents);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [filterType, setFilterType] = useState<string>("ALL");
    const [showCompleted, setShowCompleted] = useState(true);

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );

    const filteredEvents = sortedEvents.filter(event => {
        const matchesType = filterType === "ALL" || event.eventType === filterType;
        const matchesCompleted = showCompleted || !event.completed;
        return matchesType && matchesCompleted;
    });

    // Split into past and future
    const now = new Date();
    const pastEvents = filteredEvents.filter(e => new Date(e.eventDate) < now);
    const futureEvents = filteredEvents.filter(e => new Date(e.eventDate) >= now);

    const toggleComplete = (id: string) => {
        setEvents(prev => prev.map(e =>
            e.id === id ? { ...e, completed: !e.completed } : e
        ));
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(date));
    };

    const getRelativeTime = (date: Date) => {
        const diff = new Date(date).getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days < 0) return `${Math.abs(days)} days ago`;
        if (days === 0) return 'Today';
        if (days === 1) return 'Tomorrow';
        if (days < 7) return `In ${days} days`;
        if (days < 30) return `In ${Math.ceil(days / 7)} weeks`;
        return `In ${Math.ceil(days / 30)} months`;
    };

    const renderEvent = (event: TimelineEvent, isPast: boolean) => {
        const config = eventTypeConfig[event.eventType];
        const priority = priorityConfig[event.priority];

        return (
            <div key={event.id} className="relative pl-8 pb-8 last:pb-0">
                {/* Timeline line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-700" />

                {/* Timeline dot */}
                <div className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center ${event.completed
                        ? 'bg-green-500/20 border-green-500'
                        : isPast
                            ? 'bg-slate-800 border-slate-600'
                            : config.bgColor + ' border-current ' + config.color
                    }`}>
                    {event.completed ? (
                        <Check className="h-3 w-3 text-green-500" />
                    ) : (
                        <span className={config.color}>{config.icon}</span>
                    )}
                </div>

                {/* Event Card */}
                <Card className={`ml-4 transition-all ${event.completed
                        ? 'bg-slate-900/30 border-slate-800 opacity-60'
                        : event.priority === 'URGENT'
                            ? 'bg-red-500/5 border-red-500/30 hover:border-red-500/50'
                            : 'bg-slate-900/50 border-slate-800 hover:border-amber-500/50'
                    }`}>
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge className={`text-xs ${config.bgColor} ${config.color}`}>
                                        {event.eventType.replace('_', ' ')}
                                    </Badge>
                                    {event.priority !== 'NORMAL' && (
                                        <Badge variant="outline" className={`text-xs ${priority.color} border-current`}>
                                            <Flag className="h-3 w-3 mr-1" />
                                            {priority.label}
                                        </Badge>
                                    )}
                                </div>

                                <h4 className={`font-medium ${event.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                                    {event.title}
                                </h4>

                                {event.description && (
                                    <p className="text-sm text-slate-400 mt-1">{event.description}</p>
                                )}

                                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(event.eventDate)}
                                    </span>
                                    <span className={`flex items-center gap-1 ${!event.completed && event.priority === 'URGENT' ? 'text-red-400 font-medium' : ''
                                        }`}>
                                        <Clock className="h-3 w-3" />
                                        {getRelativeTime(event.eventDate)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleComplete(event.id)}
                                    className={event.completed ? 'text-green-500' : ''}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-3">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-white focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="ALL">All Events</option>
                        <option value="FILING">Filings</option>
                        <option value="HEARING">Hearings</option>
                        <option value="DEADLINE">Deadlines</option>
                        <option value="MILESTONE">Milestones</option>
                        <option value="ACTION">Actions</option>
                    </select>
                    <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showCompleted}
                            onChange={(e) => setShowCompleted(e.target.checked)}
                            className="rounded border-slate-700 bg-slate-900"
                        />
                        Show Completed
                    </label>
                </div>
                <Button
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={() => setShowAddDialog(true)}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-amber-500">{events.filter(e => !e.completed).length}</p>
                        <p className="text-xs text-slate-500 uppercase">Pending</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-red-400">
                            {events.filter(e => !e.completed && e.priority === 'URGENT').length}
                        </p>
                        <p className="text-xs text-slate-500 uppercase">Urgent</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-purple-400">
                            {events.filter(e => e.eventType === 'HEARING' && !e.completed).length}
                        </p>
                        <p className="text-xs text-slate-500 uppercase">Hearings</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-green-400">{events.filter(e => e.completed).length}</p>
                        <p className="text-xs text-slate-500 uppercase">Completed</p>
                    </CardContent>
                </Card>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Future Events */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <ChevronUp className="h-5 w-5 text-amber-500" />
                        Upcoming
                        <Badge className="bg-amber-500/20 text-amber-400">{futureEvents.length}</Badge>
                    </h3>
                    <ScrollArea className="h-[500px] pr-4">
                        {futureEvents.length > 0 ? (
                            <div className="space-y-0">
                                {futureEvents.map(event => renderEvent(event, false))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No upcoming events</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>

                {/* Past Events */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <ChevronDown className="h-5 w-5 text-slate-500" />
                        History
                        <Badge className="bg-slate-500/20 text-slate-400">{pastEvents.length}</Badge>
                    </h3>
                    <ScrollArea className="h-[500px] pr-4">
                        {pastEvents.length > 0 ? (
                            <div className="space-y-0">
                                {[...pastEvents].reverse().map(event => renderEvent(event, true))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No past events</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>

            {/* Add Event Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Plus className="h-5 w-5 inline mr-2 text-amber-500" />
                            Add Timeline Event
                        </DialogTitle>
                        <DialogDescription>
                            Create a new event on the project timeline.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-slate-400 block mb-2">Title</label>
                            <Input placeholder="Event title..." />
                        </div>
                        <div>
                            <label className="text-sm text-slate-400 block mb-2">Description</label>
                            <Textarea placeholder="Event description..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-slate-400 block mb-2">Type</label>
                                <select className="w-full h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-white">
                                    <option value="FILING">Filing</option>
                                    <option value="HEARING">Hearing</option>
                                    <option value="DEADLINE">Deadline</option>
                                    <option value="MILESTONE">Milestone</option>
                                    <option value="ACTION">Action</option>
                                    <option value="NOTE">Note</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 block mb-2">Priority</label>
                                <select className="w-full h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-white">
                                    <option value="LOW">Low</option>
                                    <option value="NORMAL">Normal</option>
                                    <option value="HIGH">High</option>
                                    <option value="URGENT">Urgent</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-slate-400 block mb-2">Date</label>
                            <Input type="date" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                        <Button className="bg-amber-600 hover:bg-amber-700">Add Event</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
