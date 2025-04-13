const additionalFeeSettings = [
  {
    categories: ["Service", "General"],
    fee_code: "SC001",
    fee_name: "Service Charge",
    unit_measurement: "Transaction",
    capacity: 1,
    fee_amount: 50,
    created_by: "admin@system.com",
    createdAt: new Date(),
  },
  {
    categories: ["Penalty"],
    fee_code: "LPF001",
    fee_name: "Late Payment Fee",
    unit_measurement: "Instance",
    capacity: 1,
    fee_amount: 25,
    created_by: "manager@system.com",
    createdAt: new Date(),
  },
  {
    categories: ["Processing", "General"],
    fee_code: "PF001",
    fee_name: "Processing Fee",
    unit_measurement: "Application",
    capacity: 1,
    fee_amount: 100,
    created_by: "user@system.com",
    createdAt: new Date(),
  },
];

export default additionalFeeSettings;
