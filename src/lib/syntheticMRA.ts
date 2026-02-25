export const SYNTHETIC_MRA_DOCUMENT = `FEDERAL RESERVE BANK OF CHICAGO
DIVISION OF SUPERVISION AND REGULATION

CONFIDENTIAL — EXAMINATION FINDINGS
MATTER REQUIRING ATTENTION

Institution:        First Heartland Bank, N.A.
Charter Type:       National Bank
Total Assets:       $4.2 Billion (as of June 30, 2024)
Examination Period: January 1, 2024 — June 30, 2024
Examination Type:   Full-Scope Safety and Soundness / BSA/AML
Lead Examiner:      [Examiner Name], Federal Reserve Bank of Chicago
Report Date:        September 12, 2024

---

MRA-2024-003: DEFICIENCIES IN THE BANK SECRECY ACT / ANTI-MONEY LAUNDERING
TRANSACTION MONITORING PROGRAM

FINDING CLASSIFICATION: Matter Requiring Attention (MRA)
REGULATORY AUTHORITY: 12 U.S.C. § 1818; 31 U.S.C. § 5318; 31 C.F.R. § 1020.320

---

BACKGROUND

The Federal Reserve Bank of Chicago conducted a full-scope examination of First Heartland Bank, N.A. ("the Bank") covering the period January 1, 2024 through June 30, 2024. The examination included a targeted review of the Bank's Bank Secrecy Act and Anti-Money Laundering ("BSA/AML") compliance program, with particular focus on the transaction monitoring function. Examiners reviewed the Bank's automated monitoring system, alert disposition processes, Suspicious Activity Report ("SAR") filing procedures, and related governance documentation.

This Matter Requiring Attention ("MRA") documents three significant deficiencies identified in the Bank's BSA/AML transaction monitoring program. These deficiencies, taken together, indicate that the Bank's current monitoring infrastructure does not meet the minimum supervisory expectations established by the FFIEC BSA/AML Examination Manual (2014, as updated), Federal Reserve SR 05-19, and applicable FinCEN regulations.

---

DEFICIENCY 1: INADEQUATE TRANSACTION MONITORING SYSTEM TUNING METHODOLOGY

Examiners determined that the Bank has not established a documented, risk-based methodology for tuning the parameters of its automated transaction monitoring system ("TMS"). Specifically, the Bank has not conducted a comprehensive tuning review since system implementation in Q3 2021 — a period spanning approximately 30 months.

The FFIEC BSA/AML Examination Manual (Core Overview, "Automated Systems") states that financial institutions "should establish a process to review and update the automated system's parameters on a regular basis to ensure the system remains effective in identifying suspicious activity." SR 05-19 further requires that BSA/AML compliance programs be "commensurate with the institution's risk profile" and subject to ongoing evaluation.

Examiners found that the Bank's current TMS configuration generates a false-positive rate of approximately 89%, significantly above the industry benchmark range of 60–75% considered acceptable for an institution of comparable risk profile. This elevated rate indicates that meaningful suspicious activity may be concealed within the high volume of non-productive alerts. The Bank was unable to produce documentation demonstrating that alert thresholds had been tested against historical transaction data, nor that scenario coverage had been evaluated against the Bank's current customer risk ratings.

This condition constitutes a violation of the requirement under 31 U.S.C. § 5318(h) that financial institutions maintain an "effective" compliance program.

---

DEFICIENCY 2: EXCESSIVE ALERT BACKLOG AND STAFFING INSUFFICIENCY

As of June 30, 2024, examiners identified an outstanding alert backlog of 4,847 unreviewed transaction monitoring alerts, with an average alert age of 68 days. A sample of 120 alerts reviewed by examiners revealed that 14 alerts (11.7% of the sample) met the standard for SAR consideration under 31 C.F.R. § 1020.320 but had not been escalated, dispositioned, or filed upon.

The FFIEC BSA/AML Examination Manual states that financial institutions must have "sufficient" staffing to "ensure timely review of alerts." The Bank currently employs three full-time BSA analysts responsible for alert disposition across all transaction monitoring systems — an allocation examiners determined to be materially inadequate given the Bank's transaction volume of approximately 1.2 million monthly transactions and existing alert queue depth. Management acknowledged during the examination that two BSA analyst positions have remained vacant since Q4 2023 but attributed the delay to compensation constraints within the BSA function.

The failure to timely review and dispose of alerts creates a material risk that suspicious activity involving money laundering, terrorist financing, or other financial crimes is not identified and reported within the timeframes required by applicable law.

---

DEFICIENCY 3: SUSPICIOUS ACTIVITY REPORT FILING TIMELINESS FAILURES

Examiners reviewed all 47 SARs filed by the Bank during the examination period. Of these, 19 SARs (40.4%) were filed after the 30-calendar-day deadline established by 31 C.F.R. § 1020.320(b)(3). The average filing delay for late SARs was 22 days beyond the regulatory deadline. In three instances, SARs were filed more than 60 days late; in one case, a SAR was filed 94 days after the filing trigger date.

31 C.F.R. § 1020.320 requires that a SAR be filed "no later than 30 calendar days after the date of initial detection by the reporting financial institution of facts that may constitute a basis for filing." The filing trigger, as clarified by FinCEN guidance, is the date on which a financial institution knows, or should know through the exercise of reasonable diligence, of the suspicious activity — not the date on which an internal escalation or investigation process is completed.

The Bank's written SAR filing procedures incorrectly define the filing trigger as the date of "completion of internal investigation," which is inconsistent with the regulatory standard. This procedural error has systematically resulted in late filings, creating regulatory exposure under 31 U.S.C. § 5322 and potential civil money penalty risk.

---

SUPERVISORY EXPECTATIONS

The Bank is required to address all three deficiencies described in this MRA. Specifically, the Federal Reserve Bank of Chicago expects the following corrective actions:

1. The Bank's BSA/AML Officer and senior management shall develop and implement a formal TMS tuning methodology, including documented parameter review procedures, threshold validation against historical data, and scenario coverage analysis — completed within 90 days of this report.

2. The Bank shall develop and submit a BSA staffing remediation plan, including a timeline for filling current vacancies and a long-term staffing model aligned with transaction volume and risk profile — submitted within 30 days of this report.

3. The Bank shall immediately correct the SAR filing procedures to reflect the accurate regulatory trigger date standard, retrain all affected BSA staff, and implement a tracking mechanism to ensure timely SAR filing — completed within 45 days of this report.

Management shall provide written status updates to the Federal Reserve Bank of Chicago on the 30th, 60th, and 90th days following the date of this report.

---

INSTITUTION RESPONSE (DRAFT — INCOMPLETE)

First Heartland Bank, N.A. acknowledges the findings set forth in MRA-2024-003 and appreciates the thorough examination conducted by the Federal Reserve Bank of Chicago. Management takes these findings seriously and is committed to addressing the identified deficiencies in a timely and comprehensive manner.

With respect to the transaction monitoring system tuning deficiency, the Bank has engaged [Vendor Name], a third-party BSA/AML technology consultant, to conduct a comprehensive tuning review. We anticipate that initial findings will be available by...

[RESPONSE INCOMPLETE — Management has not addressed Deficiencies 2 and 3, staffing plan timeline has not been provided, and SAR procedure correction status is not documented.]
`;
