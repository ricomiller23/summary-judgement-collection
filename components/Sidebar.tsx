"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    Brain,
    FileText,
    Search,
    Zap,
    BarChart3,
    Dog,
} from "lucide-react";

interface SidebarProps {
    activeItem: string;
    onItemClick: (item: string) => void;
    intelCount?: number;
}

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "ai-memos", label: "AI Legal Memos", icon: Brain },
    { id: "documents", label: "Document Station", icon: FileText },
    { id: "search", label: "Search", icon: Search },
    { id: "intel", label: "Intel", icon: Zap, hasBadge: true },
    { id: "reports", label: "Reports", icon: BarChart3 },
];

export function Sidebar({ activeItem, onItemClick, intelCount = 0 }: SidebarProps) {
    return (
        <aside className="w-60 h-screen bg-[#22262d] border-r border-[#2d3139] flex flex-col fixed left-0 top-0 z-50">
            {/* Logo */}
            <div className="p-5 border-b border-[#2d3139]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                        <Dog className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-lg leading-tight">Good Dogg</h1>
                        <p className="text-[#6b7280] text-xs">Recovery</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onItemClick(item.id)}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all relative
                ${isActive
                                    ? "bg-[rgba(0,188,212,0.1)] text-[#00bcd4] border-l-[3px] border-[#00bcd4] ml-[-3px]"
                                    : "text-[#9ca3af] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                                }
              `}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>

                            {/* Badge for Intel */}
                            {item.hasBadge && intelCount > 0 && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 min-w-5 h-5 rounded-full bg-[#f44336] text-white text-[10px] font-semibold flex items-center justify-center px-1">
                                    {intelCount}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[#2d3139]">
                <p className="text-[#6b7280] text-xs text-center">
                    Command Center v2.0
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;
