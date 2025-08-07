/**
 * Sample financial data for use with Univer spreadsheet
 */

export const financialSampleData = {
  name: "Financial_Performance_Dashboard",
  sheets: [
    {
      name: "Executive Summary",
      rowCount: 20,
      columnCount: 15,
      cellData: {
        0: {
          0: { v: "Financial Performance Dashboard", s: { fontWeight: "bold", fontSize: 16 } },
        },
        1: {
          0: { v: "Summary of financial performance metrics from Salesforce and QuickBooks", s: { italic: true } },
        },
        3: {
          0: { v: "Key Performance Indicators", s: { fontWeight: "bold" } },
        },
        4: {
          0: { v: "Total Revenue:" },
          1: { v: 4937200.33, t: "currency", s: { fontWeight: "bold", color: "#008F6B" } },
        },
        5: {
          0: { v: "Average Transaction Value:" },
          1: { v: 16187.54, t: "currency", s: { fontWeight: "bold", color: "#1a5fb4" } },
        },
        6: {
          0: { v: "Unique Customers:" },
          1: { v: 16, t: "number", s: { fontWeight: "bold" } },
        },
        8: {
          0: { v: "Revenue Sources", s: { fontWeight: "bold" } },
        },
        9: {
          0: { v: "Salesforce:" },
          1: { v: 0.87, t: "percentage", s: { fontWeight: "bold", color: "#1a5fb4" } },
        },
        10: {
          0: { v: "QuickBooks:" },
          1: { v: 0.13, t: "percentage", s: { fontWeight: "bold", color: "#26a269" } },
        },
        12: {
          0: { v: "Monthly Breakdown", s: { fontWeight: "bold" } },
        },
        13: {
          0: { v: "Month" },
          1: { v: "Revenue", s: { fontWeight: "bold" } },
          2: { v: "Transactions", s: { fontWeight: "bold" } },
        },
        14: {
          0: { v: "January 2025" },
          1: { v: 412350.24, t: "currency" },
          2: { v: 25, t: "number" },
        },
        15: {
          0: { v: "February 2025" },
          1: { v: 389750.86, t: "currency" },
          2: { v: 22, t: "number" },
        },
        16: {
          0: { v: "March 2025" },
          1: { v: 423670.50, t: "currency" },
          2: { v: 27, t: "number" },
        },
        17: {
          0: { v: "April 2025" },
          1: { v: 401250.12, t: "currency" },
          2: { v: 24, t: "number" },
        },
        18: {
          0: { v: "May 2025" },
          1: { v: 395810.25, t: "currency" },
          2: { v: 23, t: "number" },
        },
        19: {
          0: { v: "June 2025" },
          1: { v: 418760.93, t: "currency" },
          2: { v: 26, t: "number" },
        }
      }
    },
    {
      name: "Monthly Trends",
      rowCount: 20,
      columnCount: 10,
      cellData: {
        0: {
          0: { v: "Monthly Revenue Trends", s: { fontWeight: "bold", fontSize: 16 } },
        },
        1: {
          0: { v: "Comprehensive 13-month trend analysis", s: { italic: true } },
        },
        3: {
          0: { v: "Month", s: { fontWeight: "bold" } },
          1: { v: "Revenue", s: { fontWeight: "bold" } },
          2: { v: "MoM Change", s: { fontWeight: "bold" } },
          3: { v: "Transactions", s: { fontWeight: "bold" } },
          4: { v: "Avg Value", s: { fontWeight: "bold" } },
          5: { v: "Source", s: { fontWeight: "bold" } },
        },
        4: {
          0: { v: "July 2024" },
          1: { v: 380240.15, t: "currency" },
          2: { v: null },
          3: { v: 23, t: "number" },
          4: { v: 16532.18, t: "currency" },
          5: { v: "Salesforce" },
        },
        5: {
          0: { v: "August 2024" },
          1: { v: 391620.45, t: "currency" },
          2: { v: 0.03, t: "percentage", s: { color: "#26a269" } },
          3: { v: 24, t: "number" },
          4: { v: 16317.52, t: "currency" },
          5: { v: "Salesforce" },
        },
        6: {
          0: { v: "September 2024" },
          1: { v: 403125.75, t: "currency" },
          2: { v: 0.029, t: "percentage", s: { color: "#26a269" } },
          3: { v: 25, t: "number" },
          4: { v: 16125.03, t: "currency" },
          5: { v: "Salesforce" },
        },
        7: {
          0: { v: "October 2024" },
          1: { v: 397650.20, t: "currency" },
          2: { v: -0.014, t: "percentage", s: { color: "#c01c28" } },
          3: { v: 24, t: "number" },
          4: { v: 16568.76, t: "currency" },
          5: { v: "Salesforce" },
        },
        8: {
          0: { v: "November 2024" },
          1: { v: 412480.35, t: "currency" },
          2: { v: 0.037, t: "percentage", s: { color: "#26a269" } },
          3: { v: 25, t: "number" },
          4: { v: 16499.21, t: "currency" },
          5: { v: "Salesforce" },
        },
        9: {
          0: { v: "December 2024" },
          1: { v: 431850.93, t: "currency" },
          2: { v: 0.047, t: "percentage", s: { color: "#26a269" } },
          3: { v: 26, t: "number" },
          4: { v: 16609.65, t: "currency" },
          5: { v: "Salesforce" },
        },
        10: {
          0: { v: "January 2025" },
          1: { v: 412350.24, t: "currency" },
          2: { v: -0.045, t: "percentage", s: { color: "#c01c28" } },
          3: { v: 25, t: "number" },
          4: { v: 16494.01, t: "currency" },
          5: { v: "Salesforce" },
        },
        11: {
          0: { v: "February 2025" },
          1: { v: 389750.86, t: "currency" },
          2: { v: -0.055, t: "percentage", s: { color: "#c01c28" } },
          3: { v: 22, t: "number" },
          4: { v: 17715.95, t: "currency" },
          5: { v: "QuickBooks" },
        },
        12: {
          0: { v: "March 2025" },
          1: { v: 423670.50, t: "currency" },
          2: { v: 0.087, t: "percentage", s: { color: "#26a269" } },
          3: { v: 27, t: "number" },
          4: { v: 15691.50, t: "currency" },
          5: { v: "Salesforce" },
        },
        13: {
          0: { v: "April 2025" },
          1: { v: 401250.12, t: "currency" },
          2: { v: -0.053, t: "percentage", s: { color: "#c01c28" } },
          3: { v: 24, t: "number" },
          4: { v: 16718.76, t: "currency" },
          5: { v: "Salesforce" },
        },
        14: {
          0: { v: "May 2025" },
          1: { v: 395810.25, t: "currency" },
          2: { v: -0.014, t: "percentage", s: { color: "#c01c28" } },
          3: { v: 23, t: "number" },
          4: { v: 17209.14, t: "currency" },
          5: { v: "QuickBooks" },
        },
        15: {
          0: { v: "June 2025" },
          1: { v: 418760.93, t: "currency" },
          2: { v: 0.058, t: "percentage", s: { color: "#26a269" } },
          3: { v: 26, t: "number" },
          4: { v: 16106.19, t: "currency" },
          5: { v: "Salesforce" },
        },
        16: {
          0: { v: "July 2025" },
          1: { v: 803128.71, t: "currency" },
          2: { v: 0.918, t: "percentage", s: { color: "#26a269", fontWeight: "bold" } },
          3: { v: 31, t: "number" },
          4: { v: 25907.38, t: "currency" },
          5: { v: "Salesforce" },
        },
      }
    }
  ]
};
