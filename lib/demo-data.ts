// Demo data for the Good Dogg Command Center
// This provides comprehensive mock data for all features

export interface Party {
    id: string;
    name: string;
    role: 'PLAINTIFF' | 'DEFENDANT' | 'ATTORNEY' | 'WITNESS' | 'EXPERT' | 'OTHER';
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedIn?: string;
    twitter?: string;
    photoUrl?: string;
    intelUpdates: IntelUpdate[];
}

export interface IntelUpdate {
    id: string;
    source: 'LINKEDIN' | 'TWITTER' | 'NEWS' | 'COURT_FILING' | 'MANUAL';
    title: string;
    content: string;
    url?: string;
    important: boolean;
    read: boolean;
    createdAt: Date;
}

export interface TimelineEvent {
    id: string;
    title: string;
    description?: string;
    eventType: 'FILING' | 'HEARING' | 'DEADLINE' | 'MILESTONE' | 'ACTION' | 'NOTE';
    eventDate: Date;
    completed: boolean;
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
}

export interface ProjectFile {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    category: 'DISCOVERY' | 'COURT_FILING' | 'CORRESPONDENCE' | 'CONTRACT' | 'EVIDENCE' | 'OTHER';
    url: string;
    notes?: string;
    uploadedAt: Date;
}

export interface Note {
    id: string;
    content: string;
    category: 'GENERAL' | 'LEGAL' | 'STRATEGY' | 'RESEARCH' | 'ACTION_ITEM';
    entityType: string;
    entityId: string;
    pinned: boolean;
    createdAt: Date;
}

export interface Alert {
    id: string;
    title: string;
    message?: string;
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
    dueDate?: Date;
    dismissed: boolean;
    type: 'deadline' | 'intel' | 'action' | 'reminder';
}

// ===== PARTIES DATA =====
export const parties: Party[] = [
    {
        id: '1',
        name: 'Evan Rutchik',
        role: 'DEFENDANT',
        company: 'Good Dogg Beverage Company',
        email: 'evan@gooddogg.com',
        phone: '(555) 123-4567',
        address: '1234 Business Park Dr, Delaware',
        linkedIn: 'https://linkedin.com/in/evanrutchik',
        twitter: 'https://twitter.com/evanrutchik',
        photoUrl: '/avatars/evan.jpg',
        intelUpdates: [
            {
                id: 'intel-1',
                source: 'LINKEDIN',
                title: 'Updated employment status',
                content: 'Changed status to "Open to Work" - may indicate financial distress or company transition.',
                important: true,
                read: false,
                createdAt: new Date('2024-12-28'),
            },
            {
                id: 'intel-2',
                source: 'NEWS',
                title: 'Company lawsuit mentioned in TechCrunch',
                content: 'Article mentions ongoing legal battles affecting beverage startups in the region.',
                url: 'https://techcrunch.com/article',
                important: true,
                read: false,
                createdAt: new Date('2024-12-27'),
            },
            {
                id: 'intel-3',
                source: 'TWITTER',
                title: 'Public statement about business',
                content: 'Posted about "exciting new chapter" - could indicate asset movements or new ventures.',
                important: false,
                read: true,
                createdAt: new Date('2024-12-20'),
            },
        ],
    },
    {
        id: '2',
        name: 'James Wilson',
        role: 'ATTORNEY',
        company: 'Wilson & Associates',
        email: 'jwilson@wilsonlaw.com',
        phone: '(555) 987-6543',
        address: '500 Legal Plaza, Suite 200',
        linkedIn: 'https://linkedin.com/in/jameswilsonlaw',
        photoUrl: '/avatars/attorney.jpg',
        intelUpdates: [
            {
                id: 'intel-4',
                source: 'COURT_FILING',
                title: 'Motion to Dismiss filed',
                content: 'Defendant attorney filed motion to dismiss citing jurisdictional issues.',
                important: true,
                read: false,
                createdAt: new Date('2024-12-29'),
            },
        ],
    },
    {
        id: '3',
        name: 'Good Dogg Beverage LLC',
        role: 'DEFENDANT',
        company: 'Good Dogg Beverage LLC',
        address: 'Registered in Delaware, Operating in California',
        intelUpdates: [
            {
                id: 'intel-5',
                source: 'MANUAL',
                title: 'Corporate status check',
                content: 'Entity still active in Delaware. Recent annual report filed.',
                important: false,
                read: true,
                createdAt: new Date('2024-12-15'),
            },
        ],
    },
];

// ===== TIMELINE EVENTS =====
export const timelineEvents: TimelineEvent[] = [
    {
        id: 'evt-1',
        title: 'Judgment Entered',
        description: 'Final judgment entered in Florida court for $185,000',
        eventType: 'MILESTONE',
        eventDate: new Date('2024-06-15'),
        completed: true,
        priority: 'HIGH',
    },
    {
        id: 'evt-2',
        title: 'Domestication Filed - California',
        description: 'Sister-state judgment filed in California Superior Court',
        eventType: 'FILING',
        eventDate: new Date('2024-08-20'),
        completed: true,
        priority: 'NORMAL',
    },
    {
        id: 'evt-3',
        title: 'Notice of Entry Served',
        description: 'Judgment debtor served with notice of entry',
        eventType: 'ACTION',
        eventDate: new Date('2024-09-05'),
        completed: true,
        priority: 'NORMAL',
    },
    {
        id: 'evt-4',
        title: 'Motion to Dismiss Response Due',
        description: 'Response to defendant motion due by 5pm',
        eventType: 'DEADLINE',
        eventDate: new Date('2025-01-05'),
        completed: false,
        priority: 'URGENT',
    },
    {
        id: 'evt-5',
        title: 'Status Conference',
        description: 'Hearing scheduled with Judge Martinez, Dept 12',
        eventType: 'HEARING',
        eventDate: new Date('2025-01-15'),
        completed: false,
        priority: 'HIGH',
    },
    {
        id: 'evt-6',
        title: 'Domestication - Delaware',
        description: 'File domestication in Delaware (entity state)',
        eventType: 'DEADLINE',
        eventDate: new Date('2025-01-20'),
        completed: false,
        priority: 'NORMAL',
    },
    {
        id: 'evt-7',
        title: 'Writ of Execution',
        description: 'Apply for writ of execution once all domestications complete',
        eventType: 'MILESTONE',
        eventDate: new Date('2025-02-01'),
        completed: false,
        priority: 'HIGH',
    },
];

// ===== PROJECT FILES =====
export const projectFiles: ProjectFile[] = [
    {
        id: 'file-1',
        filename: 'final_judgment.pdf',
        originalName: 'Final Judgment - Good Dogg v Miller.pdf',
        mimeType: 'application/pdf',
        size: 245000,
        category: 'COURT_FILING',
        url: '/files/final_judgment.pdf',
        notes: 'Original judgment from Florida. Scan quality is good.',
        uploadedAt: new Date('2024-06-20'),
    },
    {
        id: 'file-2',
        filename: 'domestication_ca.pdf',
        originalName: 'California Domestication Filing.pdf',
        mimeType: 'application/pdf',
        size: 180000,
        category: 'COURT_FILING',
        url: '/files/domestication_ca.pdf',
        uploadedAt: new Date('2024-08-22'),
    },
    {
        id: 'file-3',
        filename: 'email_evan_20241215.pdf',
        originalName: 'Email Exchange with Evan Dec 15.pdf',
        mimeType: 'application/pdf',
        size: 52000,
        category: 'CORRESPONDENCE',
        url: '/files/email_evan.pdf',
        notes: 'Important: He mentioned willingness to negotiate in writing.',
        uploadedAt: new Date('2024-12-15'),
    },
    {
        id: 'file-4',
        filename: 'bank_discovery.xlsx',
        originalName: 'Bank Account Discovery Response.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 89000,
        category: 'DISCOVERY',
        url: '/files/bank_discovery.xlsx',
        notes: 'Lists 3 known accounts. Cross-reference with asset search.',
        uploadedAt: new Date('2024-11-01'),
    },
    {
        id: 'file-5',
        filename: 'asset_search_report.pdf',
        originalName: 'Asset Search Report - Evan Rutchik.pdf',
        mimeType: 'application/pdf',
        size: 1200000,
        category: 'EVIDENCE',
        url: '/files/asset_search.pdf',
        notes: 'Comprehensive asset search. Found property in 3 states.',
        uploadedAt: new Date('2024-10-10'),
    },
    {
        id: 'file-6',
        filename: 'operating_agreement.pdf',
        originalName: 'Good Dogg LLC Operating Agreement.pdf',
        mimeType: 'application/pdf',
        size: 340000,
        category: 'CONTRACT',
        url: '/files/operating_agreement.pdf',
        notes: 'Shows ownership percentages. Evan listed as 60% owner.',
        uploadedAt: new Date('2024-07-05'),
    },
];

// ===== NOTES =====
export const notes: Note[] = [
    {
        id: 'note-1',
        content: 'Evan appears to be the sole decision maker. Focus pressure on him personally.',
        category: 'STRATEGY',
        entityType: 'party',
        entityId: '1',
        pinned: true,
        createdAt: new Date('2024-12-01'),
    },
    {
        id: 'note-2',
        content: 'Delaware domestication requires exemplified copy - order from FL clerk ASAP.',
        category: 'ACTION_ITEM',
        entityType: 'general',
        entityId: 'general',
        pinned: true,
        createdAt: new Date('2024-12-20'),
    },
    {
        id: 'note-3',
        content: 'Attorney Wilson has reputation for last-minute settlements. Be prepared with counteroffer.',
        category: 'RESEARCH',
        entityType: 'party',
        entityId: '2',
        pinned: false,
        createdAt: new Date('2024-12-10'),
    },
    {
        id: 'note-4',
        content: 'Check if any assets have been transferred to spouse in last 4 years - potential fraudulent transfer claim.',
        category: 'LEGAL',
        entityType: 'general',
        entityId: 'general',
        pinned: false,
        createdAt: new Date('2024-11-15'),
    },
    {
        id: 'note-5',
        content: 'California judgment lien auto-renews every 10 years. Set reminder for 2034.',
        category: 'GENERAL',
        entityType: 'milestone',
        entityId: 'dom-ca',
        pinned: false,
        createdAt: new Date('2024-09-10'),
    },
];

// ===== ALERTS =====
export const alerts: Alert[] = [
    {
        id: 'alert-1',
        title: 'Motion Response Due',
        message: 'Response to Motion to Dismiss due in 5 days',
        priority: 'URGENT',
        dueDate: new Date('2025-01-05'),
        dismissed: false,
        type: 'deadline',
    },
    {
        id: 'alert-2',
        title: 'New Intel: LinkedIn Update',
        message: 'Evan Rutchik changed status to "Open to Work"',
        priority: 'HIGH',
        dismissed: false,
        type: 'intel',
    },
    {
        id: 'alert-3',
        title: 'New Court Filing',
        message: 'Motion to Dismiss filed by defendant',
        priority: 'HIGH',
        dismissed: false,
        type: 'intel',
    },
    {
        id: 'alert-4',
        title: 'Status Conference',
        message: 'Hearing with Judge Martinez on Jan 15',
        priority: 'NORMAL',
        dueDate: new Date('2025-01-15'),
        dismissed: false,
        type: 'reminder',
    },
    {
        id: 'alert-5',
        title: 'Order Exemplified Copy',
        message: 'Need to order from FL clerk for DE domestication',
        priority: 'NORMAL',
        dismissed: false,
        type: 'action',
    },
];

// Helper functions
export function getUnreadIntelCount(): number {
    return parties.reduce((count, party) =>
        count + party.intelUpdates.filter(u => !u.read).length, 0
    );
}

export function getUrgentAlertCount(): number {
    return alerts.filter(a => !a.dismissed && (a.priority === 'URGENT' || a.priority === 'HIGH')).length;
}

export function getUpcomingDeadlines(days: number = 7): TimelineEvent[] {
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return timelineEvents.filter(e =>
        !e.completed &&
        e.eventDate >= now &&
        e.eventDate <= future
    ).sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
