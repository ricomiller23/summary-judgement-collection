// Case data extracted from Good Dogg case documents
export const caseData = {
    plaintiff: {
        name: "Good Dogg Beverage Company LLC",
        contact: "Anthony Venturoso",
        email: "vent2499@gmail.com",
        address: "1002 East New Haven Ave 2nd Floor, Melbourne, FL 32901",
        state: "FL"
    },
    defendant: {
        name: "Management Services Holdings, LLC",
        status: "Inactive Tennessee LLC",
        address: "2685 Hampshire Pike, Columbia, TN 38401",
        state: "TN"
    },
    judgment: {
        caseNumber: "05-2024-CA-050807-XXCA-BC",
        court: "Circuit Court, 18th Judicial Circuit, Brevard County, FL",
        amount: 2378443.28,
        damagesAmount: 2374500.00,
        feesAmount: 3943.28,
        judgmentDate: "2025-11-25",
        defaultEnteredDate: "2025-04-14",
        serviceDate: "2025-01-06"
    },
    attorney: {
        name: "Josh A. Porteous, Esq.",
        firm: "Widerman Malek, PL",
        email: "JPorteous@USLegalTeam.com",
        phone: "321-255-2332",
        address: "1990 W. New Haven Ave, Second Floor, Melbourne, FL 32904"
    },
    domesticationTargets: ["TN"], // Primary target based on defendant address
    milestones: [
        { step: "FL_EXEMPLIFIED_SCRIPT", label: "Obtain FL Exemplified Script", state: "FL" },
        { step: "FILED_IN_TARGET_STATE", label: "File in Target State", state: "TN" },
        { step: "SERVED_NOTICE_TO_DEBTORS", label: "Serve Notice of Filing to Debtors", state: "TN" },
        { step: "WRIT_ISSUED", label: "Issue Writs of Garnishment/Execution", state: "TN" }
    ]
};

export type CaseData = typeof caseData;
