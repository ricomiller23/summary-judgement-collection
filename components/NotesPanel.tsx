"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notes, type Note } from "@/lib/demo-data";
import {
    StickyNote,
    Pin,
    Plus,
    X,
    ChevronDown,
    ChevronRight,
    Search,
    Trash2,
    BookOpen,
    Scale,
    Target,
    Lightbulb
} from "lucide-react";

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    GENERAL: {
        icon: <BookOpen className="h-4 w-4" />,
        color: "text-slate-400 bg-slate-500/20",
        label: "General"
    },
    LEGAL: {
        icon: <Scale className="h-4 w-4" />,
        color: "text-blue-400 bg-blue-500/20",
        label: "Legal"
    },
    STRATEGY: {
        icon: <Lightbulb className="h-4 w-4" />,
        color: "text-amber-400 bg-amber-500/20",
        label: "Strategy"
    },
    RESEARCH: {
        icon: <Search className="h-4 w-4" />,
        color: "text-purple-400 bg-purple-500/20",
        label: "Research"
    },
    ACTION_ITEM: {
        icon: <Target className="h-4 w-4" />,
        color: "text-green-400 bg-green-500/20",
        label: "Action Item"
    },
};

interface NotesPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotesPanel({ isOpen, onClose }: NotesPanelProps) {
    const [allNotes, setAllNotes] = useState<Note[]>(notes);
    const [activeCategory, setActiveCategory] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState("");
    const [newNoteCategory, setNewNoteCategory] = useState<string>("GENERAL");
    const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

    const filteredNotes = allNotes.filter(note => {
        const matchesCategory = activeCategory === "ALL" || note.category === activeCategory;
        const matchesSearch = note.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const pinnedNotes = filteredNotes.filter(n => n.pinned);
    const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

    const togglePin = (id: string) => {
        setAllNotes(prev => prev.map(n =>
            n.id === id ? { ...n, pinned: !n.pinned } : n
        ));
    };

    const deleteNote = (id: string) => {
        setAllNotes(prev => prev.filter(n => n.id !== id));
    };

    const addNote = () => {
        if (!newNoteContent.trim()) return;

        const newNote: Note = {
            id: `note-${Date.now()}`,
            content: newNoteContent,
            category: newNoteCategory as Note['category'],
            entityType: 'general',
            entityId: 'general',
            pinned: false,
            createdAt: new Date(),
        };

        setAllNotes(prev => [newNote, ...prev]);
        setNewNoteContent("");
        setIsAdding(false);
    };

    const toggleExpand = (id: string) => {
        setExpandedNotes(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-0 h-full w-96 bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold text-white">Notes</h3>
                    <Badge className="bg-amber-500/20 text-amber-400 text-xs">{allNotes.length}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Category Tabs */}
            <div className="p-2 border-b border-slate-800 flex gap-1 overflow-x-auto">
                <Button
                    variant={activeCategory === "ALL" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveCategory("ALL")}
                    className={activeCategory === "ALL" ? "bg-amber-600" : ""}
                >
                    All
                </Button>
                {Object.entries(categoryConfig).map(([key, config]) => (
                    <Button
                        key={key}
                        variant={activeCategory === key ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveCategory(key)}
                        className={activeCategory === key ? "bg-amber-600" : ""}
                    >
                        {config.icon}
                    </Button>
                ))}
            </div>

            {/* Search */}
            <div className="p-3 border-b border-slate-800">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-10 pr-3 rounded-md border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Add Note */}
            <div className="p-3 border-b border-slate-800">
                {isAdding ? (
                    <div className="space-y-3">
                        <Textarea
                            placeholder="Write your note..."
                            value={newNoteContent}
                            onChange={(e) => setNewNoteContent(e.target.value)}
                            className="min-h-24 text-sm"
                            autoFocus
                        />
                        <div className="flex items-center gap-2">
                            <select
                                value={newNoteCategory}
                                onChange={(e) => setNewNoteCategory(e.target.value)}
                                className="flex-1 h-8 rounded-md border border-slate-700 bg-slate-900 px-2 text-xs text-white"
                            >
                                {Object.entries(categoryConfig).map(([key, config]) => (
                                    <option key={key} value={key}>{config.label}</option>
                                ))}
                            </select>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={addNote}>
                                Save
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        className="w-full justify-start text-slate-400"
                        onClick={() => setIsAdding(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add a note...
                    </Button>
                )}
            </div>

            {/* Notes List */}
            <ScrollArea className="flex-1">
                <div className="p-3 space-y-3">
                    {/* Pinned Notes */}
                    {pinnedNotes.length > 0 && (
                        <>
                            <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <Pin className="h-3 w-3" /> Pinned
                            </p>
                            {pinnedNotes.map(note => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    isExpanded={expandedNotes.has(note.id)}
                                    onToggleExpand={() => toggleExpand(note.id)}
                                    onTogglePin={() => togglePin(note.id)}
                                    onDelete={() => deleteNote(note.id)}
                                />
                            ))}
                        </>
                    )}

                    {/* Other Notes */}
                    {unpinnedNotes.length > 0 && (
                        <>
                            {pinnedNotes.length > 0 && (
                                <p className="text-xs text-slate-500 uppercase tracking-wider mt-4">Other Notes</p>
                            )}
                            {unpinnedNotes.map(note => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    isExpanded={expandedNotes.has(note.id)}
                                    onToggleExpand={() => toggleExpand(note.id)}
                                    onTogglePin={() => togglePin(note.id)}
                                    onDelete={() => deleteNote(note.id)}
                                />
                            ))}
                        </>
                    )}

                    {/* Empty State */}
                    {filteredNotes.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            <StickyNote className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No notes found</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

// Note Card Component
function NoteCard({
    note,
    isExpanded,
    onToggleExpand,
    onTogglePin,
    onDelete
}: {
    note: Note;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onTogglePin: () => void;
    onDelete: () => void;
}) {
    const config = categoryConfig[note.category];
    const isLong = note.content.length > 150;

    return (
        <div className={`p-3 rounded-lg border transition-all ${note.pinned
                ? 'bg-amber-500/5 border-amber-500/30'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}>
            <div className="flex items-start gap-2">
                <span className={`p-1 rounded ${config.color}`}>
                    {config.icon}
                </span>
                <div className="flex-1 min-w-0">
                    <p className={`text-sm text-slate-300 ${isLong && !isExpanded ? 'line-clamp-3' : ''}`}>
                        {note.content}
                    </p>
                    {isLong && (
                        <button
                            onClick={onToggleExpand}
                            className="text-xs text-amber-400 hover:text-amber-300 mt-1 flex items-center gap-1"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronDown className="h-3 w-3" /> Show less
                                </>
                            ) : (
                                <>
                                    <ChevronRight className="h-3 w-3" /> Show more
                                </>
                            )}
                        </button>
                    )}
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">
                            {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={onTogglePin}
                                className={`p-1 rounded hover:bg-slate-800 ${note.pinned ? 'text-amber-400' : 'text-slate-500'}`}
                            >
                                <Pin className="h-3 w-3" />
                            </button>
                            <button
                                onClick={onDelete}
                                className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-red-400"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
