// Professional email templates for debt collection communications
// All templates include FDCPA Mini-Miranda disclosure

const FDCPA_DISCLOSURE = `
---
DISCLOSURE: This communication is from a debt collector. This is an attempt to collect a debt and any information obtained will be used for that purpose.
---
`;

export const emailTemplates = {
    counselToCounsel: {
        name: "Counsel-to-Counsel Demand Letter",
        subject: "Re: Good Dogg Beverage Company LLC v. Management Services Holdings, LLC - Case No. 05-2024-CA-050807",
        body: `Dear Counsel,

This firm represents Good Dogg Beverage Company LLC ("Judgment Creditor") in connection with the above-referenced matter.

As you may be aware, a Default Final Judgment was entered against your client, Management Services Holdings, LLC ("Judgment Debtor"), on November 25, 2025, in the Circuit Court of the Eighteenth Judicial Circuit in and for Brevard County, Florida in the amount of $2,378,443.28, inclusive of damages, costs, and attorneys' fees.

We are in the process of domesticating this judgment in Tennessee pursuant to the Uniform Enforcement of Foreign Judgments Act and intend to pursue all available post-judgment remedies, including but not limited to:

• Writs of Execution
• Garnishment of bank accounts and receivables
• Judgment liens on real property
• Supplementary proceedings

We are authorized to discuss a structured settlement arrangement that may avoid further collection costs to your client. Please contact our office within fourteen (14) days of this letter to discuss potential resolution.

Very truly yours,

[Attorney Name]
[Firm Name]
${FDCPA_DISCLOSURE}`,
    },

    debtorNotice: {
        name: "Formal Notice to Judgment Debtor",
        subject: "IMPORTANT: Notice of Domesticated Judgment - Immediate Action Required",
        body: `NOTICE OF DOMESTICATED JUDGMENT AND DEMAND FOR PAYMENT

TO: Management Services Holdings, LLC
    2685 Hampshire Pike
    Columbia, TN 38401

RE: Good Dogg Beverage Company LLC v. Management Services Holdings, LLC
    Florida Case No.: 05-2024-CA-050807
    Judgment Amount: $2,378,443.28

You are hereby notified that a Default Final Judgment entered against you in the State of Florida on November 25, 2025, has been domesticated and filed in the State of Tennessee pursuant to the Uniform Enforcement of Foreign Judgments Act.

This judgment is now enforceable in Tennessee with the same force and effect as a Tennessee judgment.

DEMAND IS HEREBY MADE for immediate payment of the full judgment amount plus post-judgment interest accruing at the statutory rate.

Failure to satisfy this judgment will result in the initiation of all available enforcement remedies, including but not limited to:
- Levy on real and personal property
- Bank account garnishment
- Wage garnishment (for individual guarantors)
- Judgment lien recordation

To arrange for payment or discuss a payment plan, contact:

[Attorney Name]
[Firm Name]
[Phone Number]
[Email Address]

${FDCPA_DISCLOSURE}`,
    },

    clerkInquiry: {
        name: "State Clerk Inquiry",
        subject: "Inquiry: Foreign Judgment Filing Requirements - UEFJA",
        body: `To the Clerk of [COURT NAME]:

I am writing on behalf of Good Dogg Beverage Company LLC regarding the filing of a foreign judgment under the Uniform Enforcement of Foreign Judgments Act.

We are seeking to domesticate a Florida judgment (Case No. 05-2024-CA-050807) in your jurisdiction. Please confirm the following:

1. Current filing fee for foreign judgments
2. Required documents (exemplified copy requirements, affidavits, etc.)
3. Preferred method of filing (electronic vs. paper)
4. Estimated processing time
5. Any county-specific requirements or forms

The judgment debtor's address within your jurisdiction is:
2685 Hampshire Pike, Columbia, TN 38401

Please provide any relevant forms or instructions at your earliest convenience.

Thank you for your assistance.

Respectfully,

[Attorney Name]
[Firm Name]
[Contact Information]`,
    },
};

export type TemplateKey = keyof typeof emailTemplates;
