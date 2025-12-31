"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { projectFiles, formatFileSize, type ProjectFile } from "@/lib/demo-data";
import {
    FileText,
    FolderOpen,
    Download,
    Eye,
    StickyNote,
    Upload,
    Filter,
    Grid,
    List,
    Search,
    File,
    FileSpreadsheet,
    Image
} from "lucide-react";

const categoryColors: Record<string, string> = {
    DISCOVERY: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    COURT_FILING: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    CORRESPONDENCE: "bg-green-500/20 text-green-400 border-green-500/50",
    CONTRACT: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    EVIDENCE: "bg-red-500/20 text-red-400 border-red-500/50",
    OTHER: "bg-slate-500/20 text-slate-400 border-slate-500/50",
};

const categoryLabels: Record<string, string> = {
    DISCOVERY: "Discovery",
    COURT_FILING: "Court Filing",
    CORRESPONDENCE: "Correspondence",
    CONTRACT: "Contract",
    EVIDENCE: "Evidence",
    OTHER: "Other",
};

function getFileIcon(mimeType: string) {
    if (mimeType.includes("pdf")) return <FileText className="h-10 w-10 text-red-400" />;
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return <FileSpreadsheet className="h-10 w-10 text-green-400" />;
    if (mimeType.includes("image")) return <Image className="h-10 w-10 text-blue-400" />;
    return <File className="h-10 w-10 text-slate-400" />;
}

export function FilesTab() {
    const [files, setFiles] = useState<ProjectFile[]>(projectFiles);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
    const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [noteContent, setNoteContent] = useState("");

    const filteredFiles = files.filter(file => {
        const matchesSearch = file.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.notes?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "ALL" || file.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleAddNote = () => {
        if (selectedFile && noteContent) {
            setFiles(prev => prev.map(f =>
                f.id === selectedFile.id ? { ...f, notes: noteContent } : f
            ));
            setShowNoteDialog(false);
            setNoteContent("");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-white focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="ALL">All Categories</option>
                        {Object.entries(categoryLabels).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    >
                        {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                    </Button>
                    <Button
                        className="bg-amber-600 hover:bg-amber-700"
                        onClick={() => setShowUploadDialog(true)}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
                    </Button>
                </div>
            </div>

            {/* Files Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFiles.map(file => (
                        <Card
                            key={file.id}
                            className="bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
                            onClick={() => setSelectedFile(file)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-slate-800/50 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                                        {getFileIcon(file.mimeType)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white truncate">{file.originalName}</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                                        </p>
                                        <Badge className={`mt-2 text-xs ${categoryColors[file.category]}`}>
                                            {categoryLabels[file.category]}
                                        </Badge>
                                        {file.notes && (
                                            <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs text-slate-400 line-clamp-2">
                                                <StickyNote className="h-3 w-3 inline mr-1" />
                                                {file.notes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-0">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="text-left p-4 text-slate-400 text-sm font-medium">Name</th>
                                    <th className="text-left p-4 text-slate-400 text-sm font-medium">Category</th>
                                    <th className="text-left p-4 text-slate-400 text-sm font-medium">Size</th>
                                    <th className="text-left p-4 text-slate-400 text-sm font-medium">Date</th>
                                    <th className="text-left p-4 text-slate-400 text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFiles.map(file => (
                                    <tr
                                        key={file.id}
                                        className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer"
                                        onClick={() => setSelectedFile(file)}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {getFileIcon(file.mimeType)}
                                                <div>
                                                    <p className="text-white font-medium">{file.originalName}</p>
                                                    {file.notes && (
                                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                            <StickyNote className="h-3 w-3" /> Has notes
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge className={`text-xs ${categoryColors[file.category]}`}>
                                                {categoryLabels[file.category]}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">{formatFileSize(file.size)}</td>
                                        <td className="p-4 text-slate-400 text-sm">{new Date(file.uploadedAt).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            )}

            {/* File Preview Dialog */}
            <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            {selectedFile && getFileIcon(selectedFile.mimeType)}
                            {selectedFile?.originalName}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedFile && (
                                <span className="flex items-center gap-2 mt-2">
                                    <Badge className={categoryColors[selectedFile.category]}>
                                        {categoryLabels[selectedFile.category]}
                                    </Badge>
                                    <span>{formatFileSize(selectedFile.size)}</span>
                                    <span>•</span>
                                    <span>Uploaded {new Date(selectedFile.uploadedAt).toLocaleDateString()}</span>
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedFile && (
                        <div className="space-y-4">
                            {/* File Preview Placeholder */}
                            <div className="h-48 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                                <div className="text-center text-slate-500">
                                    {getFileIcon(selectedFile.mimeType)}
                                    <p className="mt-2 text-sm">Preview not available</p>
                                    <p className="text-xs">Click Download to view file</p>
                                </div>
                            </div>

                            {/* Notes Section */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                        <StickyNote className="h-4 w-4 text-amber-500" />
                                        Notes
                                    </h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setNoteContent(selectedFile.notes || "");
                                            setShowNoteDialog(true);
                                        }}
                                    >
                                        {selectedFile.notes ? "Edit Note" : "Add Note"}
                                    </Button>
                                </div>
                                {selectedFile.notes ? (
                                    <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-300">
                                        {selectedFile.notes}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No notes added yet.</p>
                                )}
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedFile(null)}>Close</Button>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Note Dialog */}
            <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <StickyNote className="h-5 w-5 inline mr-2 text-amber-500" />
                            {selectedFile?.notes ? "Edit Note" : "Add Note"}
                        </DialogTitle>
                        <DialogDescription>
                            Add notes to this file for future reference.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        placeholder="Enter your notes here..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="min-h-32"
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNoteDialog(false)}>Cancel</Button>
                        <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleAddNote}>
                            Save Note
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Upload Dialog */}
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Upload className="h-5 w-5 inline mr-2 text-amber-500" />
                            Upload File
                        </DialogTitle>
                        <DialogDescription>
                            Drag and drop files or click to browse.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
                        <FolderOpen className="h-12 w-12 mx-auto text-slate-500" />
                        <p className="mt-4 text-sm text-slate-400">
                            Drag files here or click to browse
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            PDF, DOC, XLS, Images up to 10MB
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Category</label>
                        <select className="w-full h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-white">
                            {Object.entries(categoryLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancel</Button>
                        <Button className="bg-amber-600 hover:bg-amber-700">Upload</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Empty State */}
            {filteredFiles.length === 0 && (
                <div className="text-center py-12">
                    <FolderOpen className="h-16 w-16 mx-auto text-slate-600" />
                    <h3 className="mt-4 text-lg font-medium text-white">No files found</h3>
                    <p className="mt-2 text-sm text-slate-400">
                        {searchQuery || categoryFilter !== "ALL"
                            ? "Try adjusting your search or filter."
                            : "Upload your first file to get started."}
                    </p>
                </div>
            )}
        </div>
    );
}
