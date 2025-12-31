// UEFJA Statute Database for IN, TN, CO
export const statuteDatabase = {
    IN: {
        state: "Indiana",
        statute: "IC § 34-54-11",
        filingFee: "$133 (approx)",
        requiredForms: [
            "Authenticated/Exemplified Foreign Judgment (28 U.S.C. 1963)",
            "Affidavit (names & addresses of debtor/creditor)"
        ],
        stayPeriod: "21 days after entry",
        filingCourt: "Any court of record in any Indiana county",
        notes: "Notice must be sent to judgment debtor. Proof of mailing required."
    },
    TN: {
        state: "Tennessee",
        statute: "TN Code - UEFJA",
        filingFee: "$225 + $25 post-judgment fee",
        requiredForms: [
            "Authenticated Foreign Judgment",
            "Affidavit (names/addresses)",
            "Notice of Filing Foreign Judgment"
        ],
        stayPeriod: "30 days (response window before enrollment)",
        filingCourt: "Circuit or Chancery Court",
        notes: "Summons must be issued and served. If no response in 30 days, clerk enrolls judgment."
    },
    CO: {
        state: "Colorado",
        statute: "UEFJA - Colorado",
        filingFee: "$201+ (may be higher in 2025)",
        requiredForms: [
            "JDF 137 - Instructions for Filing a Foreign Judgment",
            "JDF 138 - Judgment Creditor Affidavit in Support of Foreign Judgment",
            "JDF 139 - Notice of Filing of Foreign Judgment",
            "Authenticated/Exemplified Foreign Judgment"
        ],
        stayPeriod: "Per court rules",
        filingCourt: "District court where debtor resides or owns property",
        notes: "Judgment must be final and enforceable in originating jurisdiction."
    }
};

export type StateCode = keyof typeof statuteDatabase;
