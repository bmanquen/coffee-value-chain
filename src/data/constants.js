export const TYPE_COLORS = {
  env:    { bg: "bg-emerald-800", light: "bg-emerald-100", text: "text-emerald-900", border: "border-emerald-800", label: "🌿 Environmental" },
  social: { bg: "bg-blue-900", light: "bg-blue-100", text: "text-blue-900", border: "border-blue-900", label: "👥 Social" },
  econ:   { bg: "bg-orange-700", light: "bg-orange-100", text: "text-orange-900", border: "border-orange-700", label: "💰 Economic" },
};

export const actions = [
  { id: "a1", label: "Transparent Pricing",        icon: "📊", desc: "Share ICE C-price data with farmers. Publish buying prices per quality grade.",                              impacts: ["e1","s1","ec1"] },
  { id: "a2", label: "Quality-Based Premiums",     icon: "⭐", desc: "Pay differential rates for cherry vs. parchment lots, with processing-method premiums. Incentivize post-harvest care.",          impacts: ["ec1","ec2","e2"] },
  { id: "a3", label: "Fair Credit & Pre-financing", icon: "💳", desc: "Offer harvest advances at fair rates vs. predatory lending. Reduce farmer debt cycles.",                  impacts: ["s2","ec1","ec3"] },
  { id: "a4", label: "Traceability Records",       icon: "📍", desc: "Log farm origin, harvest date, and processing method. Enable lot-level traceability upstream.",            impacts: ["s3","ec2","e1"] },
  { id: "a5", label: "Sustainable Input Access",   icon: "🌱", desc: "Bundle purchases with access to shade-grown seedlings, compost, or organic inputs from suppliers.",        impacts: ["e2","e3","s1"] },
  { id: "a6", label: "Digital Payments",           icon: "📱", desc: "Use mobile money to pay farmers — M-Pesa in East Africa, Daviplata/Nequi in Colombia — safer, auditable, faster.",  impacts: ["s2","ec3","s3"] },
];

export const impacts = [
  { id: "e1",  type: "env",    label: "Deforestation Visibility", desc: "Origin tracking flags land-use practices early in the chain." },
  { id: "e2",  type: "env",    label: "Quality-Driven Agronomy",  desc: "Price incentives push farmers toward better soil and shade practices." },
  { id: "e3",  type: "env",    label: "Reduced Chemical Inputs",  desc: "Bundled organic access lowers synthetic pesticide/fertilizer use." },
  { id: "s1",  type: "social", label: "Farmer Empowerment",       desc: "Transparent pricing builds trust and negotiating capacity." },
  { id: "s2",  type: "social", label: "Reduced Debt Bondage",     desc: "Fair credit breaks cycles of predatory lending dependency." },
  { id: "s3",  type: "social", label: "Supply Chain Dignity",     desc: "Digital records give smallholders a documented economic identity." },
  { id: "ec1", type: "econ",   label: "Higher Farm Income",       desc: "Quality premiums + fair pricing increase net earnings per quintal." },
  { id: "ec2", type: "econ",   label: "Specialty Market Access",  desc: "Lot traceability opens doors to roasters paying a premium above the C-price for traceable, high-quality lots." },
  { id: "ec3", type: "econ",   label: "Financial Inclusion",      desc: "Digital payments + credit history enable future banking access." },
];

export const scenes = [
  { icon: "🌄", time: "Dawn",  title: "Farm arrival",      conv: "Accepts mixed ripe and unripe cherry to maximize weight",    sus: "Pays per-grade premium; only accepts ripe cherry",            lever: "Quality incentive" },
  { icon: "🤝", time: "6 AM",  title: "Price negotiation", conv: "Price hidden; no reference to C-market rates",               sus: "Shares current C-price; explains quality differential",       lever: "Transparent pricing" },
  { icon: "📦", time: "7 AM",  title: "Loading",           conv: "All lots mixed together in truck bed",                       sus: "Farm-tagged bags kept separate; origin logged",               lever: "Lot traceability" },
  { icon: "💳", time: "8 AM",  title: "Payment",           conv: "Cash only; possible underpayment, no receipt",               sus: "Mobile money transfer; digital receipt sent",                 lever: "Financial inclusion" },
  { icon: "🚛", time: "10 AM", title: "Transport",         conv: "Overpacked; cherry damaged from heat and pressure",          sus: "Breathable sacks; shaded transport to preserve quality",      lever: "Quality handling" },
  { icon: "📋", time: "2 PM",  title: "Record keeping",    conv: "No records kept; no farm identity preserved",                sus: "Origin, weight, date logged digitally for each lot",          lever: "Supply chain dignity" },
];

export const forces = {
  driving: [
    { label: "Specialty roaster demand for traceability", s: 5, desc: "Roasters paying premiums above the C-price require lot-level origin data — creating financial pull all the way down to the collector." },
    { label: "Quality-based price premiums available",    s: 4, desc: "When ripe, traceable cherry commands a higher price, coyotes have direct economic incentive to reform — though the premium signal attenuates at the collector level." },
    { label: "NGO technical + financial support",         s: 4, desc: "Organizations like TechnoServe and Root Capital support cooperatives and formal agricultural businesses, creating competitive pressure on informal collectors to reform." },
    { label: "Mobile money infrastructure growth",        s: 3, desc: "Expanding mobile coverage in rural areas makes digital payments practical and auditable." },
    { label: "Farmer loyalty from fair treatment",        s: 3, desc: "Farmers who receive fair prices and honest credit return to the same coyote — reducing sourcing costs over time." },
  ],
  restraining: [
    { label: "Information asymmetry = profit margin",     s: 5, desc: "Coyotes profit by knowing the C-price and farmers don't. Transparency directly cuts into their margin." },
    { label: "No formal licensing or accountability",     s: 5, desc: "Unlike cooperatives or exporters, coyotes face no regulatory requirement to keep records or pay fair prices — a near-universal structural gap across origins." },
    { label: "Cooperatives compete on cash-at-door",      s: 4, desc: "Co-ops often can't match the coyote's ability to pay cash immediately at harvest." },
    { label: "Road & connectivity gaps in remote areas",  s: 3, desc: "In high-altitude growing regions, digital tools and mobile signal are simply unavailable." },
    { label: "Short-term mindset; harvest pressure",      s: 3, desc: "During peak harvest, speed matters more than quality. With 40% of quality determined by post-harvest handling and fermentation starting immediately, the pressure to move volume fast directly conflicts with traceability and sorting." },
  ],
};

export const webNodes = [
  {
    label: "Farmers", angle: 270, icon: "🌾", strength: "strong",
    rel: "Primary cherry source; often the only buyer many farmers can physically reach.",
    exchanges: [
      { type: "cherry", desc: "Farmers sell cherry to Coyote" },
      { type: "money",  desc: "Coyote pays cash to Farmers" },
    ],
  },
  {
    label: "Cooperatives", angle: 315, icon: "🤝", strength: "medium",
    rel: "Direct competitor for cherry; co-ops offer deferred quality bonuses while coyotes offer immediate cash, creating a tug-of-war for farmer supply.",
    exchanges: [
      { type: "cherry", desc: "Co-ops and Coyote compete for farmer cherry" },
      { type: "money",  desc: "Both set rival farmgate prices" },
    ],
  },
  {
    label: "Wet Mills", angle: 0, icon: "🏭", strength: "strong",
    rel: "Main buyer of aggregated lots; their quality expectations set the floor for coyote behavior.",
    exchanges: [
      { type: "cherry", desc: "Coyote sells cherry to Wet Mills" },
      { type: "money",  desc: "Wet Mills pay Coyote" },
    ],
  },
  {
    label: "Exporters", angle: 45, icon: "🚢", strength: "medium",
    rel: "Downstream buyer, usually via wet mills; exporter quality requirements flow back down and shape what coyotes will accept from farmers.",
    exchanges: [
      { type: "cherry", desc: "Cherry flows to Exporters through the chain" },
      { type: "info",   desc: "Quality standards filter down to Coyote" },
    ],
  },
  {
    label: "Certifiers", angle: 90, icon: "✅", strength: "weak",
    rel: "Certification (Fair Trade, Rainforest Alliance) typically applies at the cooperative or exporter level; coyotes are largely invisible to certifiers unless they formalize.",
    exchanges: [
      { type: "info", desc: "Certifiers could verify records if Coyote formalizes" },
    ],
  },
  {
    label: "NGOs", angle: 135, icon: "🌍", strength: "weak",
    rel: "NGOs like TechnoServe and Root Capital primarily support cooperatives and farmers; coyotes feel their influence indirectly through competitive pressure, not direct engagement.",
    exchanges: [
      { type: "info",  desc: "NGO programs create competitive pressure on Coyote" },
    ],
  },
  {
    label: "Financial\nInstitutions", angle: 180, icon: "🏦", strength: "weak",
    rel: "Can extend credit products to coyotes who demonstrate fair and auditable practices.",
    exchanges: [
      { type: "money", desc: "Banks lend credit to Coyote" },
      { type: "info",  desc: "Coyote provides audit records" },
    ],
  },
  {
    label: "Input\nSuppliers", angle: 225, icon: "🌱", strength: "weak",
    rel: "Coyote can bundle cherry purchases with delivery of seedlings or organic inputs to farms, building farmer loyalty and improving future cherry quality.",
    exchanges: [
      { type: "money", desc: "Coyote buys inputs from Suppliers" },
      { type: "info",  desc: "Suppliers advise on input suitability" },
    ],
  },
];

// Connections between outer nodes (not through the coyote)
export const secondaryConnections = [
  { from: 0, to: 1, flow: "cherry", label: "Farmers also sell to co-ops directly" },
  { from: 1, to: 2, flow: "cherry", label: "Co-ops deliver washed lots to wet mills" },
  { from: 2, to: 3, flow: "cherry", label: "Wet mills supply exporters with processed lots" },
  { from: 5, to: 0, flow: "info",   label: "NGOs provide training and resources to farmers" },
  { from: 6, to: 0, flow: "money",  label: "Microfinance lenders extend credit to farmers" },
  { from: 7, to: 0, flow: "cherry", label: "Input suppliers sell seedlings and fertilizer to farmers" },
  { from: 4, to: 3, flow: "info",   label: "Certifiers verify export-grade standards" },
];
