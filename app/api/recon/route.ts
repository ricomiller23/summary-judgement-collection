import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Targets to monitor - in production, pull from database
const TARGETS = [
    "Management Services Holdings LLC",
    "MSH Tennessee",
    // Add principal names here when identified
];

export async function GET() {
    try {
        let reportContent = `
=====================================
GOOD DOGG RECOVERY - DAILY RECON REPORT
Generated: ${new Date().toISOString()}
=====================================

`;

        for (const target of TARGETS) {
            // Query Serper API for news/reddit results
            const res = await fetch(`https://google.serper.dev/search`, {
                method: 'POST',
                headers: {
                    'X-API-KEY': process.env.SERPER_API_KEY || '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: `${target} news reddit "judgment" OR "lawsuit" OR "business" OR "asset"`,
                    tbs: "qdr:d" // Last 24 hours
                })
            });

            if (!res.ok) {
                reportContent += `--- ${target} ---\n[API Error: ${res.status}]\n\n`;
                continue;
            }

            const searchData = await res.json();
            reportContent += `--- ${target} ---\n`;

            if (searchData.organic && searchData.organic.length > 0) {
                searchData.organic.slice(0, 5).forEach((item: { link: string; title: string; snippet: string }) => {
                    reportContent += `Title: ${item.title}\n`;
                    reportContent += `Link: ${item.link}\n`;
                    reportContent += `Snippet: ${item.snippet}\n\n`;
                });
            } else {
                reportContent += `No new results in the last 24 hours.\n\n`;
            }
        }

        reportContent += `
=====================================
GUARDRAIL NOTICE: This report only includes publicly available 
information. No private data was accessed or scraped.
=====================================
`;

        // Send email via Resend
        const resend = new Resend(process.env.RESEND_API_KEY);
        const emailResult = await resend.emails.send({
            from: process.env.RECON_FROM_EMAIL || 'recon@gooddogg.com',
            to: 'ricomiller@icloud.com',
            subject: `Good Dogg Recovery - Daily Recon Report - ${new Date().toLocaleDateString()}`,
            text: reportContent
        });

        return NextResponse.json({
            status: 'Report Sent',
            emailId: emailResult.data?.id,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Recon worker error:', error);
        return NextResponse.json(
            { status: 'Error', error: String(error) },
            { status: 500 }
        );
    }
}

// Vercel Cron configuration
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
