"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { caseData } from "@/lib/case-data";
import { statuteDatabase } from "@/lib/statute-database";
import { getUnreadIntelCount, getUpcomingDeadlines, alerts } from "@/lib/demo-data";

// Feature Components
import { FilesTab } from "@/components/FilesTab";
import { PartiesTab } from "@/components/PartiesTab";
import { TimelineTab } from "@/components/TimelineTab";
import { NotesPanel } from "@/components/NotesPanel";
import { AlertsWidget, NotificationBell } from "@/components/AlertsWidget";

// Icons
import {
  FolderOpen,
  Users,
  Calendar,
  Scale,
  FileText,
  Gavel,
  LayoutDashboard,
  StickyNote,
  Bell,
  TrendingUp,
  Clock,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const [milestones, setMilestones] = useState(
    caseData.milestones.map((m, i) => ({ ...m, id: i, completed: false }))
  );
  const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const completedCount = milestones.filter(m => m.completed).length;
  const progress = (completedCount / milestones.length) * 100;
  const canCollection = progress === 100;

  const toggleMilestone = (id: number) => {
    setMilestones(prev =>
      prev.map(m => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const unreadIntel = getUnreadIntelCount();
  const upcomingDeadlines = getUpcomingDeadlines(7);
  const activeAlerts = alerts.filter(a => !a.dismissed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-500">Good Dogg Recovery</h1>
              <p className="text-slate-400 text-sm">Command Center • Case #{caseData.judgment.caseNumber}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notes Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNotesPanelOpen(!isNotesPanelOpen)}
                className={isNotesPanelOpen ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400'}
              >
                <StickyNote className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <NotificationBell onClick={() => setActiveTab("dashboard")} />

              {/* Status Badge */}
              <Badge variant="outline" className="border-amber-500 text-amber-500">
                ACTIVE CASE
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-900/80 border border-slate-800 p-1 flex flex-wrap gap-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-600">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-amber-600">
              <FolderOpen className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="parties" className="data-[state=active]:bg-amber-600 relative">
              <Users className="h-4 w-4 mr-2" />
              Parties
              {unreadIntel > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white">
                  {unreadIntel}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-amber-600">
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="domestication" className="data-[state=active]:bg-amber-600">
              <Scale className="h-4 w-4 mr-2" />
              Domestication
            </TabsTrigger>
            <TabsTrigger value="statutes" className="data-[state=active]:bg-amber-600">
              <FileText className="h-4 w-4 mr-2" />
              Statutes
            </TabsTrigger>
            <TabsTrigger value="collection" disabled={!canCollection} className="data-[state=active]:bg-amber-600">
              <Gavel className="h-4 w-4 mr-2" />
              Collection {!canCollection && "🔒"}
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-amber-600">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>

          {/* ================== DASHBOARD TAB ================== */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-amber-950/30 to-slate-900/50 border-amber-800/50">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500 uppercase">Total Judgment</p>
                  <p className="text-2xl font-bold text-amber-500 mt-1">
                    {formatCurrency(caseData.judgment.amount)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500 uppercase">Domestication</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={progress} className="h-2 flex-1" />
                    <span className="text-sm font-medium text-amber-500">{Math.round(progress)}%</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500 uppercase">Deadlines (7d)</p>
                  <p className={`text-2xl font-bold mt-1 ${upcomingDeadlines.length > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {upcomingDeadlines.length}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500 uppercase">New Intel</p>
                  <p className={`text-2xl font-bold mt-1 ${unreadIntel > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                    {unreadIntel}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Judgment Overview */}
              <Card className="bg-slate-900/50 border-slate-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-amber-500">Case Summary</CardTitle>
                  <CardDescription>{caseData.judgment.court}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Plaintiff</p>
                      <p className="font-medium text-white">{caseData.plaintiff.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Defendant</p>
                      <p className="font-medium text-white">{caseData.defendant.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Defendant Address</p>
                      <p className="text-slate-300">{caseData.defendant.address}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Judgment Date</p>
                      <p className="text-slate-300">{caseData.judgment.judgmentDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Attorney</p>
                      <p className="text-slate-300">{caseData.attorney.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Firm</p>
                      <p className="text-slate-300">{caseData.attorney.firm}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts Widget */}
              <AlertsWidget onViewAll={() => setActiveTab("timeline")} />
            </div>

            {/* Upcoming Deadlines */}
            {upcomingDeadlines.length > 0 && (
              <Card className="bg-red-500/5 border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingDeadlines.map(event => {
                      const days = Math.ceil(
                        (new Date(event.eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                      );
                      return (
                        <div
                          key={event.id}
                          className="p-4 bg-slate-900/50 rounded-lg border border-slate-800"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-white">{event.title}</p>
                              <p className="text-sm text-slate-400 mt-1">{event.description}</p>
                            </div>
                            <Badge className={
                              days <= 1 ? 'bg-red-500 text-white' :
                                days <= 3 ? 'bg-orange-500 text-white' :
                                  'bg-amber-500/20 text-amber-400'
                            }>
                              {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days} days`}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ================== FILES TAB ================== */}
          <TabsContent value="files">
            <FilesTab />
          </TabsContent>

          {/* ================== PARTIES TAB ================== */}
          <TabsContent value="parties">
            <PartiesTab />
          </TabsContent>

          {/* ================== TIMELINE TAB ================== */}
          <TabsContent value="timeline">
            <TimelineTab />
          </TabsContent>

          {/* ================== DOMESTICATION TAB ================== */}
          <TabsContent value="domestication" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Domestication Progress</CardTitle>
                <CardDescription>
                  Complete all milestones to unlock Collection actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-amber-500">{completedCount} of {milestones.length}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                    >
                      <Checkbox
                        checked={milestone.completed}
                        onCheckedChange={() => toggleMilestone(milestone.id)}
                      />
                      <div className="flex-1">
                        <p className={milestone.completed ? "line-through text-slate-500" : "text-white"}>
                          {milestone.label}
                        </p>
                        <p className="text-xs text-slate-500">State: {milestone.state}</p>
                      </div>
                      <Badge variant={milestone.completed ? "default" : "outline"}>
                        {milestone.completed ? "Complete" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================== STATUTES TAB ================== */}
          <TabsContent value="statutes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(statuteDatabase).map(([code, data]) => (
                <Card key={code} className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-amber-500">{code}</span>
                      <span className="text-lg text-white">{data.state}</span>
                    </CardTitle>
                    <CardDescription>{data.statute}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="text-slate-500 text-xs uppercase">Filing Fee</p>
                      <p className="text-amber-400 font-medium">{data.filingFee}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase">Stay Period</p>
                      <p className="text-slate-300">{data.stayPeriod}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase">Required Forms</p>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {data.requiredForms.map((form, i) => (
                          <li key={i}>{form}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase">Notes</p>
                      <p className="text-slate-400">{data.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ================== COLLECTION TAB ================== */}
          <TabsContent value="collection" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-green-500">Collection Actions</CardTitle>
                <CardDescription>
                  Domestication complete. Collection tools are now available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Issue Writ of Execution
                  </Button>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    File Garnishment
                  </Button>
                  <Button variant="outline">Record Judgment Lien</Button>
                  <Button variant="outline">Subpoena Bank Records</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================== TEMPLATES TAB ================== */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>Communication Templates</CardTitle>
                <CardDescription>
                  All templates include FDCPA Mini-Miranda disclosure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    { name: "Counsel-to-Counsel Demand Letter", type: "Legal" },
                    { name: "Formal Notice to Judgment Debtor", type: "Demand" },
                    { name: "State Clerk Inquiry", type: "Administrative" },
                  ].map((template, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                    >
                      <div>
                        <p className="font-medium text-white">{template.name}</p>
                        <p className="text-xs text-slate-500">{template.type}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Template
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 mt-12">
        <div className="container mx-auto px-6 py-4 text-center text-slate-500 text-xs">
          <p>Good Dogg Beverage Recovery Command Center • Confidential</p>
          <p className="mt-1">Attorney: {caseData.attorney.name} • {caseData.attorney.firm}</p>
        </div>
      </footer>

      {/* Notes Panel */}
      <NotesPanel isOpen={isNotesPanelOpen} onClose={() => setIsNotesPanelOpen(false)} />
    </div>
  );
}
