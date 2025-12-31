"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { alerts, getUpcomingDeadlines, getUnreadIntelCount, type Alert } from "@/lib/demo-data";
import {
    Bell,
    Clock,
    AlertTriangle,
    Newspaper,
    Target,
    CalendarClock,
    X,
    ChevronRight
} from "lucide-react";

const priorityColors: Record<string, string> = {
    LOW: "bg-slate-500/20 text-slate-400 border-slate-500/50",
    NORMAL: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    HIGH: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    URGENT: "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse",
};

const typeIcons: Record<string, React.ReactNode> = {
    deadline: <Clock className="h-4 w-4" />,
    intel: <Newspaper className="h-4 w-4" />,
    action: <Target className="h-4 w-4" />,
    reminder: <CalendarClock className="h-4 w-4" />,
};

interface AlertsWidgetProps {
    onViewAll?: () => void;
}

export function AlertsWidget({ onViewAll }: AlertsWidgetProps) {
    const activeAlerts = alerts.filter(a => !a.dismissed);
    const urgentCount = activeAlerts.filter(a => a.priority === 'URGENT').length;
    const upcomingDeadlines = getUpcomingDeadlines(7);
    const unreadIntel = getUnreadIntelCount();

    return (
        <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-500">
                        <Bell className="h-5 w-5" />
                        Alerts & Notifications
                    </div>
                    {urgentCount > 0 && (
                        <Badge className="bg-red-500 text-white animate-pulse">
                            {urgentCount} Urgent
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 pb-3 border-b border-slate-800">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-400">{upcomingDeadlines.length}</p>
                        <p className="text-xs text-slate-500">Deadlines (7d)</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-amber-400">{unreadIntel}</p>
                        <p className="text-xs text-slate-500">New Intel</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">{activeAlerts.length}</p>
                        <p className="text-xs text-slate-500">Active Alerts</p>
                    </div>
                </div>

                {/* Alert List */}
                <ScrollArea className="h-64">
                    <div className="space-y-2">
                        {activeAlerts.map(alert => (
                            <AlertItem key={alert.id} alert={alert} />
                        ))}

                        {activeAlerts.length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                <Bell className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">No active alerts</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* View All Link */}
                {onViewAll && activeAlerts.length > 0 && (
                    <button
                        onClick={onViewAll}
                        className="w-full text-center text-sm text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1 pt-2 border-t border-slate-800"
                    >
                        View All Alerts
                        <ChevronRight className="h-4 w-4" />
                    </button>
                )}
            </CardContent>
        </Card>
    );
}

function AlertItem({ alert }: { alert: Alert }) {
    const getDaysUntil = () => {
        if (!alert.dueDate) return null;
        const days = Math.ceil((new Date(alert.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        if (days < 0) return 'Overdue';
        if (days === 0) return 'Today';
        if (days === 1) return 'Tomorrow';
        return `${days} days`;
    };

    const daysUntil = getDaysUntil();

    return (
        <div className={`p-3 rounded-lg border flex items-start gap-3 transition-all hover:border-amber-500/30 ${priorityColors[alert.priority]}`}>
            <div className="p-2 rounded-md bg-slate-800/50">
                {typeIcons[alert.type]}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="font-medium text-white text-sm truncate">{alert.title}</p>
                    {alert.priority === 'URGENT' && (
                        <AlertTriangle className="h-3 w-3 text-red-400 flex-shrink-0" />
                    )}
                </div>
                {alert.message && (
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{alert.message}</p>
                )}
                {daysUntil && (
                    <p className={`text-xs mt-1 ${daysUntil === 'Overdue' || daysUntil === 'Today'
                            ? 'text-red-400 font-medium'
                            : 'text-slate-500'
                        }`}>
                        <Clock className="h-3 w-3 inline mr-1" />
                        {daysUntil}
                    </p>
                )}
            </div>
            <button className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 flex-shrink-0">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

// Header Notification Bell Component
export function NotificationBell({ onClick }: { onClick?: () => void }) {
    const activeAlerts = alerts.filter(a => !a.dismissed);
    const urgentCount = activeAlerts.filter(a => a.priority === 'URGENT' || a.priority === 'HIGH').length;
    const unreadIntel = getUnreadIntelCount();
    const total = urgentCount + unreadIntel;

    return (
        <button
            onClick={onClick}
            className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
            <Bell className={`h-5 w-5 ${total > 0 ? 'text-amber-400' : 'text-slate-400'}`} />
            {total > 0 && (
                <span className={`absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold ${urgentCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-500 text-black'
                    }`}>
                    {total > 9 ? '9+' : total}
                </span>
            )}
        </button>
    );
}
