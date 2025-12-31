"use client";

import { AlertTriangle, Linkedin, FileText, X } from "lucide-react";
import { useState } from "react";

interface Alert {
    id: string;
    type: "urgent" | "warning" | "info" | "success";
    title: string;
    description: string;
    badges?: string[];
    isNew?: boolean;
    isOverdue?: boolean;
}

const initialAlerts: Alert[] = [
    {
        id: "1",
        type: "urgent",
        title: "Motion Response Due",
        description: "Flow ctarst continues to ooen the Motion Response Due.",
        badges: ["URGENT", "OVERDUE"],
        isOverdue: true,
    },
    {
        id: "2",
        type: "urgent",
        title: "Motion Response Due",
        description: "Motion response Due to ooen the Motion Response Due.",
        badges: ["URGENT", "OVERDUE"],
        isOverdue: true,
    },
    {
        id: "3",
        type: "info",
        title: "New Intel: LinkedIn Update",
        description: "New LinkedIn Update updated the intels in LinkedIn Update symtranilly.",
        isNew: true,
    },
    {
        id: "4",
        type: "info",
        title: "New Court Filing",
        description: "New Court Filing for new Court",
        isNew: true,
    },
];

export function AlertPanel() {
    const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

    const clearAlert = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    const getBorderColor = (type: string) => {
        switch (type) {
            case "urgent": return "border-l-[#f44336]";
            case "warning": return "border-l-[#ff9800]";
            case "info": return "border-l-[#00bcd4]";
            case "success": return "border-l-[#4caf50]";
            default: return "border-l-[#2d3139]";
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case "urgent": return "bg-[rgba(244,67,54,0.05)]";
            case "info": return "bg-[rgba(0,188,212,0.05)]";
            default: return "bg-[#22262d]";
        }
    };

    return (
        <div className="w-80 h-full bg-[#1a1d23] border-l border-[#2d3139] p-4 overflow-y-auto">
            <h2 className="text-white font-semibold text-lg mb-4">Alert</h2>

            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`rounded-xl p-4 border-l-4 ${getBorderColor(alert.type)} ${getBgColor(alert.type)}`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {alert.type === "urgent" && (
                                    <AlertTriangle className="w-4 h-4 text-[#f44336]" />
                                )}
                                {alert.type === "info" && alert.title.includes("LinkedIn") && (
                                    <Linkedin className="w-4 h-4 text-[#00bcd4]" />
                                )}
                                {alert.type === "info" && alert.title.includes("Court") && (
                                    <FileText className="w-4 h-4 text-[#00bcd4]" />
                                )}
                            </div>

                            {/* Badges */}
                            <div className="flex gap-1">
                                {alert.badges?.map((badge, i) => (
                                    <span
                                        key={i}
                                        className={`text-[9px] font-semibold px-2 py-0.5 rounded ${badge === "URGENT" ? "bg-[#f44336] text-white" :
                                                badge === "OVERDUE" ? "bg-[#ff5722] text-white" :
                                                    "bg-[#00bcd4] text-white"
                                            }`}
                                    >
                                        {badge}
                                    </span>
                                ))}
                                {alert.isNew && (
                                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-[#00bcd4] text-white">
                                        NEW
                                    </span>
                                )}
                            </div>
                        </div>

                        <h3 className="text-white font-medium text-sm mb-1">{alert.title}</h3>
                        <p className="text-[#9ca3af] text-xs mb-3">{alert.description}</p>

                        <button
                            onClick={() => clearAlert(alert.id)}
                            className="w-full py-2 rounded-lg bg-[#2a2f38] text-[#9ca3af] text-sm font-medium hover:bg-[#363b44] transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlertPanel;
