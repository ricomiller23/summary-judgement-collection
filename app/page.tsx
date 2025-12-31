"use client";

import { useState } from "react";
import { caseData } from "@/lib/case-data";
import { getUnreadIntelCount, getUpcomingDeadlines } from "@/lib/demo-data";

// New Components
import { Sidebar } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { AlertPanel } from "@/components/AlertPanel";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Feature Components
import { FilesTab } from "@/components/FilesTab";
import { PartiesTab } from "@/components/PartiesTab";
import { TimelineTab } from "@/components/TimelineTab";
import { NotesPanel } from "@/components/NotesPanel";

// Icons
import {
  Building2,
  User,
  MapPin,
  Calendar,
  Briefcase,
  Scale,
  Bell,
  Grid3X3,
  StickyNote,
  FileText,
  Gavel,
} from "lucide-react";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
  const [milestones, setMilestones] = useState(
    caseData.milestones.map((m, i) => ({ ...m, id: i, completed: false }))
  );

  const completedCount = milestones.filter(m => m.completed).length;
  const progress = (completedCount / milestones.length) * 100;

  const toggleMilestone = (id: number) => {
    setMilestones(prev =>
      prev.map(m => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const unreadIntel = getUnreadIntelCount();

  return (
    <div className="flex min-h-screen bg-[#1a1d23]">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeNav}
        onItemClick={setActiveNav}
        intelCount={unreadIntel}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-60 mr-80">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[#2d3139] bg-[#1a1d23] flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsNotesPanelOpen(!isNotesPanelOpen)}
              className="p-2 rounded-lg hover:bg-[#2a2f38] text-[#9ca3af] hover:text-white transition-colors"
            >
              <StickyNote className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#2a2f38] text-[#9ca3af] hover:text-white transition-colors">
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button className="relative p-2 rounded-lg hover:bg-[#2a2f38] text-[#9ca3af] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#f44336] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-medium text-sm">
              EM
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {activeNav === "dashboard" && (
            <>
              {/* Metrics Row */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <MetricCard
                  title="Total Judgment"
                  value={formatCurrency(caseData.judgment.amount)}
                  type="currency"
                  trend={27.81}
                  showSparkline
                />
                <MetricCard
                  title="Domestication"
                  value={Math.round(progress)}
                  type="percentage"
                  showProgressRing
                />
                <MetricCard
                  title="Deadlines (7d)"
                  value={getUpcomingDeadlines(7).length}
                  type="count"
                />
                <MetricCard
                  title="New Intel"
                  value={unreadIntel}
                  type="count"
                  showPulse
                />
              </div>

              {/* Active Case Banner */}
              <div className="mb-6">
                <span className="badge-active inline-block mb-3">ACTIVE CASE</span>
                <h2 className="text-xl font-semibold text-white">
                  Case #{caseData.judgment.caseNumber}
                </h2>
              </div>

              {/* Case Summary Card */}
              <Card className="bg-[#22262d] border-[#2d3139] mb-8">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-6">Case Summary</h3>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {/* Court */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Scale className="w-4 h-4 text-[#6b7280]" />
                        <span className="text-[#6b7280] text-sm">Circuit Court</span>
                      </div>
                      <p className="text-white font-medium">{caseData.judgment.court}</p>
                    </div>

                    {/* County */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#6b7280]" />
                        <span className="text-[#6b7280] text-sm">County</span>
                      </div>
                      <p className="text-white font-medium">Brevard County, FL</p>
                    </div>

                    {/* Plaintiff */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-[#6b7280]" />
                        <span className="text-[#6b7280] text-sm">Plaintiff</span>
                      </div>
                      <p className="text-white font-medium">{caseData.plaintiff.name}</p>
                    </div>

                    {/* Defendant */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-[#6b7280]" />
                        <span className="text-[#6b7280] text-sm">Defendant</span>
                      </div>
                      <p className="text-white font-medium">{caseData.defendant.name}</p>
                    </div>

                    {/* Judgment Date */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-[#6b7280]" />
                        <span className="text-[#6b7280] text-sm">Judgment Date</span>
                      </div>
                      <p className="text-white font-medium">{caseData.judgment.judgmentDate}</p>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-[#6b7280]" />
                        <span className="text-[#6b7280] text-sm">Description</span>
                      </div>
                      <p className="text-[#9ca3af]">—</p>
                    </div>

                    {/* Attorneys */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-[#6b7280]" />
                        <span className="text-[#6b7280] text-sm">Attorneys</span>
                      </div>
                      <p className="text-white font-medium">
                        {caseData.attorney.name} • {caseData.attorney.firm}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for additional content */}
              <Tabs defaultValue="domestication" className="space-y-6">
                <TabsList className="bg-[#22262d] border border-[#2d3139] p-1">
                  <TabsTrigger value="domestication" className="data-[state=active]:bg-[#00bcd4] data-[state=active]:text-white">
                    Domestication
                  </TabsTrigger>
                  <TabsTrigger value="files" className="data-[state=active]:bg-[#00bcd4] data-[state=active]:text-white">
                    Files
                  </TabsTrigger>
                  <TabsTrigger value="parties" className="data-[state=active]:bg-[#00bcd4] data-[state=active]:text-white">
                    Parties
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-[#00bcd4] data-[state=active]:text-white">
                    Timeline
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="domestication">
                  <Card className="bg-[#22262d] border-[#2d3139]">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">Domestication Progress</h3>
                      <div className="mb-6">
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-[#9ca3af]">Progress</span>
                          <span className="text-[#00bcd4]">{completedCount} of {milestones.length}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        {milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className="flex items-center gap-4 p-4 rounded-lg bg-[#2a2f38] border border-[#363b44]"
                          >
                            <Checkbox
                              checked={milestone.completed}
                              onCheckedChange={() => toggleMilestone(milestone.id)}
                              className="border-[#00bcd4] data-[state=checked]:bg-[#00bcd4]"
                            />
                            <div className="flex-1">
                              <p className={milestone.completed ? "line-through text-[#6b7280]" : "text-white"}>
                                {milestone.label}
                              </p>
                              <p className="text-xs text-[#6b7280]">State: {milestone.state}</p>
                            </div>
                            <Badge variant={milestone.completed ? "default" : "outline"} className={milestone.completed ? "bg-[#4caf50]" : ""}>
                              {milestone.completed ? "Complete" : "Pending"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="files">
                  <FilesTab />
                </TabsContent>

                <TabsContent value="parties">
                  <PartiesTab />
                </TabsContent>

                <TabsContent value="timeline">
                  <TimelineTab />
                </TabsContent>
              </Tabs>
            </>
          )}

          {/* Other nav items placeholder */}
          {activeNav !== "dashboard" && (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <Gavel className="w-16 h-16 text-[#2d3139] mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">
                  {activeNav.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </h2>
                <p className="text-[#6b7280]">This section is coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right Alert Panel */}
      <div className="fixed right-0 top-0 h-screen">
        <AlertPanel />
      </div>

      {/* Notes Panel */}
      <NotesPanel isOpen={isNotesPanelOpen} onClose={() => setIsNotesPanelOpen(false)} />
    </div>
  );
}
