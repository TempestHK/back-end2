const transactions = [
    {
      created_at: new Date("2025-04-01T10:00:00Z"),
      company_name: "ABC Corporation",
      ledger: 1001,
      payment_type: "cash",
      amount: 5000,
      ledger_amount: 5000,
      bill: "BILL001",
      payer: "payer01@system.com",
    },
    {
      created_at: new Date("2025-04-03T14:30:00Z"),
      company_name: "XYZ Enterprises",
      ledger: 1002,
      payment_type: "non_cash",
      amount: 12000,
      ledger_amount: 12000,
      bill: "BILL002",
      payer: "payer02@system.com",
    },
    {
      created_at: new Date("2025-04-05T08:45:00Z"),
      company_name: "DEF Solutions",
      ledger: 1003,
      payment_type: "cash",
      amount: 3000,
      ledger_amount: 3000,
      bill: "BILL003",
      payer: "payer03@system.com",
    },
    {
      created_at: new Date("2025-04-06T12:15:00Z"),
      company_name: "GHI Industries",
      ledger: 1004,
      payment_type: "non_cash",
      amount: 8000,
      ledger_amount: 8000,
      bill: "BILL004",
      payer: "payer04@system.com",
    },
  ];
  
  export default transactions;
  