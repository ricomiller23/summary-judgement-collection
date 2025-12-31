"use client";

import { TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
    title: string;
    value: string | number;
    type: "currency" | "percentage" | "count" | "countdown";
    trend?: number;
    showSparkline?: boolean;
    showProgressRing?: boolean;
    showPulse?: boolean;
}

// Simple sparkline SVG component
function Sparkline() {
    return (
        <svg viewBox="0 0 120 40" className="w-full h-10 mt-2">
            <defs>
                <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00bcd4" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Area fill */}
            <path
                d="M0,35 L10,32 L20,28 L30,30 L40,25 L50,22 L60,24 L70,18 L80,15 L90,12 L100,10 L110,8 L120,5 L120,40 L0,40 Z"
                fill="url(#sparklineGradient)"
            />
            {/* Line */}
            <path
                d="M0,35 L10,32 L20,28 L30,30 L40,25 L50,22 L60,24 L70,18 L80,15 L90,12 L100,10 L110,8 L120,5"
                fill="none"
                stroke="#00bcd4"
                strokeWidth="2"
                className="sparkline-path"
            />
        </svg>
    );
}

// Circular progress ring component
function ProgressRing({ percentage }: { percentage: number }) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-28 h-28 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full progress-ring">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#2d3139"
                    strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#00bcd4"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="progress-ring-circle"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{percentage}%</span>
            </div>
        </div>
    );
}

// Countdown timer component
function CountdownTimer() {
    const [time, setTime] = useState({ hours: 0, minutes: 5, seconds: 39 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="flex items-center justify-center gap-1 mt-2">
            <span className="countdown-segment text-sm font-mono text-white">{pad(time.hours)}</span>
            <span className="text-[#6b7280]">:</span>
            <span className="countdown-segment text-sm font-mono text-white">{pad(time.minutes)}</span>
            <span className="text-[#6b7280]">:</span>
            <span className="countdown-segment text-sm font-mono text-white">{pad(time.seconds)}</span>
        </div>
    );
}

// Intel pulse animation
function IntelPulse({ value }: { value: number }) {
    return (
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#00bcd4] opacity-20 pulse-animation" />
            <div className="absolute inset-2 rounded-full border-2 border-[#00bcd4] opacity-40 pulse-animation" style={{ animationDelay: '0.5s' }} />
            {/* Inner circle */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#00bcd4]/20 to-[#00bcd4]/5 flex items-center justify-center border border-[#00bcd4]/30">
                <span className="text-3xl font-bold text-white">{value}</span>
            </div>
        </div>
    );
}

export function MetricCard({ title, value, type, trend, showSparkline, showProgressRing, showPulse }: MetricCardProps) {
    return (
        <div className="metric-card">
            <p className="metric-label mb-2">{title}</p>

            {type === "currency" && (
                <>
                    <p className="metric-value text-[#00bcd4]">{value}</p>
                    {showSparkline && <Sparkline />}
                    {trend && (
                        <div className="flex items-center gap-1 mt-2 text-[#4caf50]">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Trend {trend}%</span>
                        </div>
                    )}
                </>
            )}

            {type === "percentage" && showProgressRing && (
                <ProgressRing percentage={typeof value === 'number' ? value : parseFloat(value as string)} />
            )}

            {type === "count" && !showPulse && (
                <div className="text-center">
                    <p className="text-5xl font-bold text-white mt-4">{value}</p>
                    <p className="text-xs text-[#6b7280] mt-2">Countdown timer</p>
                    <CountdownTimer />
                </div>
            )}

            {type === "count" && showPulse && (
                <IntelPulse value={typeof value === 'number' ? value : parseInt(value as string)} />
            )}
        </div>
    );
}

export default MetricCard;
