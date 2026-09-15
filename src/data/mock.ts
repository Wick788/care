export type ReportStatus = "Reviewed" | "Needs review" | "Scheduled";
export type Report = {
  id: string; title: string; category: string; date: string; isoDate: string; institution: string;
  doctor: string; status: ReportStatus; summary: string; accent: "calm" | "warm" | "cool";
  results: { label: string; value: string; range: string; flag: "In range" | "Above range" }[];
};
export const patient = { name: "Marisol Okafor", initials: "MO", id: "PT-0291", age: 54, nextVisit: "06 Apr 2026" };
export const reports: Report[] = [
  { id:"lipid-panel", title:"Lipid Panel", category:"Laboratory", date:"18 Mar 2026", isoDate:"2026-03-18", institution:"St. Alder's Laboratory", doctor:"Dr. Elena Voss", status:"Needs review", summary:"LDL remains above your target range.", accent:"warm", results:[{label:"Total cholesterol",value:"208 mg/dL",range:"125–200",flag:"Above range"},{label:"LDL cholesterol",value:"142 mg/dL",range:"Below 130",flag:"Above range"},{label:"HDL cholesterol",value:"58 mg/dL",range:"Above 40",flag:"In range"},{label:"Triglycerides",value:"118 mg/dL",range:"Below 150",flag:"In range"}]},
  { id:"hba1c", title:"HbA1c", category:"Laboratory", date:"02 Mar 2026", isoDate:"2026-03-02", institution:"Northgate Health", doctor:"Dr. Priya Anand", status:"Reviewed", summary:"Stable at 6.1%; continue your current care plan.", accent:"calm", results:[{label:"HbA1c",value:"6.1%",range:"4.0–6.4",flag:"In range"},{label:"Estimated glucose",value:"128 mg/dL",range:"70–140",flag:"In range"}]},
  { id:"blood-count", title:"Complete Blood Count", category:"Hematology", date:"14 Feb 2026", isoDate:"2026-02-14", institution:"St. Alder's Laboratory", doctor:"Dr. Elena Voss", status:"Reviewed", summary:"All measured values are within reference ranges.", accent:"calm", results:[{label:"Hemoglobin",value:"13.8 g/dL",range:"12.0–15.5",flag:"In range"},{label:"White cell count",value:"6.4 K/µL",range:"4.5–11.0",flag:"In range"}]},
  { id:"chest-xray", title:"Chest X-ray — PA view", category:"Imaging", date:"28 Jan 2026", isoDate:"2026-01-28", institution:"Northgate Health", doctor:"Dr. Priya Anand", status:"Scheduled", summary:"Follow-up imaging scheduled for 06 Apr 2026.", accent:"cool", results:[{label:"Appointment",value:"09:30",range:"Radiology, Level 2",flag:"In range"}]},
  { id:"renal-panel", title:"Renal Function Panel", category:"Laboratory", date:"08 Jan 2026", isoDate:"2026-01-08", institution:"Meridian Diagnostics", doctor:"Dr. Owen Clarke", status:"Reviewed", summary:"Kidney function remains stable.", accent:"calm", results:[{label:"Creatinine",value:"0.82 mg/dL",range:"0.5–1.1",flag:"In range"},{label:"eGFR",value:"91 mL/min",range:"Above 60",flag:"In range"}]},
];
export const queue = [
 {id:"RX-8041", patient:"Amina Rahman", report:"Thyroid Profile", time:"11 min ago", status:"Needs review"},
 {id:"RX-8039", patient:"Daniel Kim", report:"Complete Blood Count", time:"24 min ago", status:"Ready"},
 {id:"RX-8037", patient:"Sofia Martins", report:"Liver Function", time:"41 min ago", status:"Delivered"},
 {id:"RX-8032", patient:"Noah Williams", report:"Lipid Panel", time:"1 hr ago", status:"Needs review"},
 {id:"RX-8028", patient:"Leila Hassan", report:"HbA1c", time:"2 hrs ago", status:"Delivered"},
];
