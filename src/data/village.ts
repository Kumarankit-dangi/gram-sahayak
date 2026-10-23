// Real census-informed data provided by the user for Kolhubar village.
// No Mukhiya name included, as requested.

export type Complaint = {
  id: string;
  userId?: string;
  name: string;
  mobile: string;
  category: string;
  description: string;
  location: string;
  status: "Submitted" | "Under Review" | "In Progress" | "Resolved";
  createdAt: number;
  updatedAt: number;
  image?: string;
};

export type Notice = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

export type Scheme = {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string;
  benefits: string;
  documents: string;
  howToApply: string;
};

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  icon: string;
};

export const VILLAGE = {
  name: "Kolhubar",
  gramPanchayat: "Kolhu Bar",
  subdivision: "Dumaria",
  district: "Gaya",
  state: "Bihar",
  pincode: "824221",
  villageCode: "256237",
  areaHectares: 257,
  population: 3225,
  malePopulation: 1672,
  femalePopulation: 1553,
  households: 528,
  literacyRate: 57.46,
  maleLiteracy: 66.03,
  femaleLiteracy: 48.27,
  childPopulation: 592,
  scPopulation: 856,
  stPopulation: 0,
  nearestTown: "Sherghati (approx. 40 km)",
  nearestRailway: "Nabenagar Road",
  nearestAirport: "Birsa Munda Airport (approx. 125.9 km)",
} as const;

export const DEMOGRAPHY = [
  { label: "Total Population", total: "3,225", male: "1,672", female: "1,553" },
  { label: "Child Population (0–6 yrs)", total: "592", male: "309", female: "283" },
  { label: "Scheduled Castes (SC)", total: "856", male: "434", female: "422" },
  { label: "Scheduled Tribes (ST)", total: "0", male: "0", female: "0" },
  { label: "Literate Population", total: "1,513", male: "900", female: "613" },
  { label: "Illiterate Population", total: "1,712", male: "772", female: "940" },
] as const;

export const NEARBY_VILLAGES = [
  { name: "Sonpura", direction: "North-East", distance: "1.04 km" },
  { name: "Singh Pur", direction: "South", distance: "1.82 km" },
  { name: "Manrar", direction: "South-East", distance: "1.82 km" },
  { name: "Mataha", direction: "East", distance: "1.98 km" },
  { name: "Bara Khar", direction: "North-West", distance: "2.46 km" },
  { name: "Balsora", direction: "South-West", distance: "2.55 km" },
  { name: "Nanai", direction: "South-East", distance: "2.71 km" },
  { name: "Karhanni", direction: "South-West", distance: "3.25 km" },
  { name: "Bijhua", direction: "South", distance: "3.25 km" },
  { name: "Adar", direction: "West", distance: "3.29 km" },
] as const;

export const CONNECTIVITY = [
  { item: "Public Bus Service", status: "No", nearest: "Available within 5-10 km" },
  { item: "Private Bus Service", status: "No", nearest: "Available within >10 km" },
  { item: "Railway Station", status: "No", nearest: "—" },
  { item: "Shared Auto-Rickshaw", status: "Yes", nearest: "Within village" },
] as const;

export const SERVICES_BANK_POST = [
  { item: "Bank", status: "No", nearest: "Available within 2-5 km" },
  { item: "ATM", status: "No", nearest: "Available within 5-10 km" },
  { item: "Post Office", status: "No", nearest: "Available within 2-5 km" },
] as const;

export const HEALTH_FACILITIES = [
  { item: "Health Sub-Centre (HSC)", status: "Yes", nearest: "Available within village" },
  { item: "Primary Health Centre (PHC)", status: "No", nearest: "Available within 5-10 km" },
  { item: "Community Health Centre (CHC)", status: "No", nearest: "Available within 5-10 km" },
] as const;

export const TRAVEL = [
  { from: "Sherghati", distance: "40 km", duration: "1–1.25 hours" },
  { from: "Gaya", distance: "80 km", duration: "~2.3 hours" },
] as const;

export const CATEGORY_LIST = ["Road", "Water", "Electricity", "Sanitation", "Street Light", "Other"] as const;

export const CERTIFICATE_SERVICES = [
  {
    name: "Birth Certificate",
    icon: "🍼",
    description: "Register and obtain a certified copy of a birth in the village.",
    documents: "Application form, Parent's Aadhaar, Hospital slip, Address proof.",
    info: "Apply at the Panchayat office or nearest Circle Office. Usually issued within 7–15 days.",
  },
  {
    name: "Death Certificate",
    icon: "🕊️",
    description: "Obtain a certified death record for legal, pension and property matters.",
    documents: "Application form, Deceased Aadhaar, Doctor's certificate, Applicant ID.",
    info: "Apply at nearest health/Panchayat office. Issued within 15 days in most cases.",
  },
  {
    name: "Income Certificate",
    icon: "💼",
    description: "Proof of annual income required for schemes, scholarship and reservations.",
    documents: "Application form, Aadhaar, Ration card, Income affidavit, Two photos.",
    info: "Apply via RTPS Sewa Kendra or online on Bihar service portal. Fees may apply.",
  },
  {
    name: "Caste Certificate",
    icon: "📜",
    description: "Official caste proof for education, jobs and government benefits.",
    documents: "Application form, Aadhaar, Ration card, Family lineage proof.",
    info: "Apply through RTPS portal or local Circle Office. Verification by revenue staff.",
  },
  {
    name: "Residence Certificate",
    icon: "🏠",
    description: "Confirms residential address and domicile in the village.",
    documents: "Application form, Aadhaar, Voter ID, Utility bill, Two photos.",
    info: "Visit RTPS center or apply online. Usually processed within 7 days.",
  },
  {
    name: "Other Certificates",
    icon: "📋",
    description: "Other certificates: character, survivorship, disability, etc.",
    documents: "Varies by certificate type.",
    info: "Ask at the Panchayat or RTPS office for specific requirements.",
  },
] as const;

export const DEFAULT_SCHEMES: Scheme[] = [
  {
    id: "sch-1",
    name: "PM Awas Yojana (Gramin)",
    category: "Housing",
    description: "Pucca house assistance for rural families living in kachcha houses.",
    eligibility: "Rural household in SECC list, no pucca house in family.",
    benefits: "₹1.20 lakh assistance for house construction.",
    documents: "Aadhaar, Ration card, SECC confirmation, Bank account.",
    howToApply: "Apply via Gram Panchayat / nearest BLOCK office / online portal.",
  },
  {
    id: "sch-2",
    name: "Mukhyamantri Vridha Pension",
    category: "Pension",
    description: "Old age pension for eligible senior citizens of Bihar.",
    eligibility: "Age 60+, resident of Bihar, income below limit.",
    benefits: "Monthly pension of ₹400–₹600.",
    documents: "Age proof, Aadhaar, Income certificate, Bank account.",
    howToApply: "Apply via RTPS Sewa Kendra / online.",
  },
  {
    id: "sch-3",
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "Direct income support of ₹6,000/year to farmer families.",
    eligibility: "All land-holding farmer families with valid Kisan DBT record.",
    benefits: "₹6,000 per year in 3 installments.",
    documents: "Aadhaar, Land record, Bank account, Joir certificate.",
    howToApply: "Register on PM-KISAN portal / nearest CSC.",
  },
  {
    id: "sch-4",
    name: "Jal Jeevan Mission",
    category: "Water",
    description: "Piped drinking water to every rural household.",
    eligibility: "Rural households not yet covered by piped supply.",
    benefits: "Functional household tap connection (FHTC).",
    documents: "Aadhaar, Ration card, Residence proof.",
    howToApply: "Village Water & Sanitation Committee / Panchayat.",
  },
  {
    id: "sch-5",
    name: "Ayushman Bharat – PM-JAY",
    category: "Health",
    description: "₹5 lakh health cover per family per year for hospitalization.",
    eligibility: "Families identified as deprived in SECC 2011 data.",
    benefits: "Cashless hospitalization up to ₹5 lakh.",
    documents: "Aadhaar, Ration card, PM-JAY card.",
    howToApply: "Visit nearest empaneled hospital / CSC.",
  },
  {
    id: "sch-6",
    name: "Mukhyamantri Kanya Utthan Yojana",
    category: "Education",
    description: "Financial assistance to girl child at birth, education milestones.",
    eligibility: "Girl child born after 2019 in eligible families.",
    benefits: "Staged benefits up to ₹50,000 on graduation.",
    documents: "Birth certificate, Aadhaar, Bank account.",
    howToApply: "Apply at Anganwadi / health centre / online.",
  },
];

export const DEFAULT_EMERGENCY: EmergencyContact[] = [
  { id: "em-1", name: "Police Control", phone: "100", icon: "🚓" },
  { id: "em-2", name: "Ambulance", phone: "102", icon: "🚑" },
  { id: "em-3", name: "Fire Brigade", phone: "101", icon: "🚒" },
  { id: "em-4", name: "District Hospital, Gaya", phone: "—", icon: "🏥" },
  { id: "em-5", name: "Kolhu Bar Panchayat Office", phone: "—", icon: "🏛️" },
  { id: "em-6", name: "Electricity Department", phone: "—", icon: "⚡" },
  { id: "em-7", name: "Water Department", phone: "—", icon: "💧" },
];

// ==================== DUMARIA BLOCK / SUBDIVISION DATA ====================
// Block contact info — admin should add the real official number.
// The demo uses a placeholder ready to be replaced in ADMIN settings.
export const BLOCK_CONTACT = {
  name: "Dumaria Prakhand Office (BDO)",
  phone: "+91 6314", // Official Bihar info will be added after verification
  address: "Prakhand Karyalay, Dumaria, Gaya, Bihar – 824206",
  email: "bdo.dumaria@gov.in",
} as const;

// Land record / Bihar Bhulekh portals (official Bihar revenue sites).
export const LAND_SERVICES = [
  {
    name: "Jamabandi / Rental Register",
    hindi: "जमाबंदी / रजिस्टर खोजे",
    description: "View / verify your Jamabandi, Khata number and Khesra details.",
    url: "https://biharbhumi.bihar.gov.in/",
    icon: "📜",
  },
  {
    name: "Map View (Bhu-Naksha)",
    hindi: "भू-नक्शा",
    description: "See the village map with plot boundaries (Bhu Naksha).",
    url: "https://bhubhumi.bihar.gov.in/",
    icon: "🗺️",
  },
  {
    name: "Mutation (Dakhil Kharij)",
    hindi: "दाखिल खारिज",
    description: "Apply online for land name transfer using mutation service.",
    url: "https://onlinemutation.bihar.gov.in/",
    icon: "✍️",
  },
  {
    name: "LPC Application",
    hindi: "एलपीसी आवेदन",
    description: "Land Possession Certificate (LPC) online application status.",
    url: "https://onlineasu.bih.nic.in/",
    icon: "📋",
  },
  {
    name: "Bhu-abhilekh Search",
    hindi: "भू-अभिलेख",
    description: "Search certified land records and related details online.",
    url: "https://biharbhumi.bihar.gov.in/",
    icon: "🔍",
  },
  {
    name: "Pay Lagaan (Tax)",
    hindi: "लगान भुगतान",
    description: "Pay your land revenue / tax online via the official Bihar portal.",
    url: "https://onlineasu.bih.nic.in/",
    icon: "💳",
  },
] as const;

export const DUMARIA = {
  name: "Dumaria",
  hindi: "डुमरिया",
  district: "Gaya",
  state: "Bihar",
  division: "Magadh",
  pincode: "824206",
  totalArea: "336 km²",
  totalVillages: 124,
  population: 128699,
  malePop: 66786,
  femalePop: 61913,
  households: 21379,
  density: 383,
  sexRatio: 927,
  childPop: 24076,
  literate: 58399,
  illiterate: 70300,
  scPop: 49906,
  stPop: 40,
  literacyRate: "~54.0%",
  townPop: 1138,
  townLiteracy: "67.3%",
  nearestRailway: "Nabenagar Road",
  nearestAirport: "Birsa Munda Airport (~126.8 km)",
  nearbySubdivisions: ["Amas", "Banke Bazar", "Bodh Gaya", "Dobhi", "Guraru", "Gurua", "Imamganj", "Sherghati", "Tan Kuppa", "Wazirganj"],
} as const;

export const DUMARIA_DEMOGRAPHY = [
  { label: "Total Population", total: "1,28,699", male: "66,786", female: "61,913" },
  { label: "Child Population (0–6)", total: "24,076", male: "12,340", female: "11,736" },
  { label: "Literate Population", total: "58,399", male: "35,696", female: "22,703" },
  { label: "Illiterate Population", total: "70,300", male: "31,090", female: "39,210" },
  { label: "Scheduled Caste (SC)", total: "49,906", male: "—", female: "—" },
  { label: "Scheduled Tribe (ST)", total: "40", male: "—", female: "—" },
] as const;

export const DUMARIA_VILLAGES = [
  { name: "Adar", category: "Rural", panchayat: "Manjhauli" },
  { name: "Amma Bar", category: "Rural", panchayat: "Kachar" },
  { name: "Anarbansalea", category: "Rural", panchayat: "Chhakarbandha" },
  { name: "Baghpur", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Bahadurpur", category: "Rural", panchayat: "Manjhauli" },
  { name: "Bakri", category: "Rural", panchayat: "Bhokaha" },
  { name: "Balia", category: "Rural", panchayat: "Bhangia" },
  { name: "Balsora", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Bara Khar", category: "Rural", panchayat: "Manjhauli" },
  { name: "Baraha", category: "Rural", panchayat: "Chhakarbandha" },
  { name: "Barahgawan", category: "Rural", panchayat: "Pankara" },
  { name: "Barka Dhab", category: "Rural", panchayat: "Bhokaha" },
  { name: "Barwadih", category: "Rural", panchayat: "Nandai" },
  { name: "Barwadih", category: "Rural", panchayat: "Mahuri" },
  { name: "Basdiha", category: "Rural", panchayat: "Pankara" },
  { name: "Bataspur", category: "Rural", panchayat: "Mahuri" },
  { name: "Bela", category: "Rural", panchayat: "Kachar" },
  { name: "Beni Nagar", category: "Rural", panchayat: "Nandai" },
  { name: "Bhadwar", category: "Rural", panchayat: "Bhokaha" },
  { name: "Bhadwar Digar", category: "Rural", panchayat: "Nandai" },
  { name: "Bhangia", category: "Rural", panchayat: "Bhangia" },
  { name: "Bhikhanpur", category: "Rural", panchayat: "Bhangia" },
  { name: "Bhokaha", category: "Rural", panchayat: "Bhokaha" },
  { name: "Bijhua", category: "Rural", panchayat: "Nandai" },
  { name: "Bikua Kalan", category: "Rural", panchayat: "Sewra" },
  { name: "Bikua Khurd", category: "Rural", panchayat: "Sewra" },
  { name: "Bishunpur", category: "Rural", panchayat: "Nandai" },
  { name: "Bodhi Bigha", category: "Rural", panchayat: "Mahuri" },
  { name: "Burha Burhi", category: "Rural", panchayat: "Chhakarbandha" },
  { name: "Chahra Pahra", category: "Rural", panchayat: "Bhokaha" },
  { name: "Chak Tikri", category: "Rural", panchayat: "Kachar" },
  { name: "Chanariya", category: "Rural", panchayat: "Sewra" },
  { name: "Chhakarbandha", category: "Rural", panchayat: "Chhakarbandha" },
  { name: "Chhatarpur", category: "Rural", panchayat: "Bhokaha" },
  { name: "Chhotka Dhab", category: "Rural", panchayat: "Bhokaha" },
  { name: "Chhotka Kewla", category: "Rural", panchayat: "Bhangia" },
  { name: "Chonha", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Chorahi", category: "Rural", panchayat: "Pankara" },
  { name: "Deuri", category: "Rural", panchayat: "Kachar" },
  { name: "Dibhka", category: "Rural", panchayat: "Bhangia" },
  { name: "Dubat", category: "Rural", panchayat: "Kachar" },
  { name: "Dumaria", category: "Rural", panchayat: "Pankara" },
  { name: "Gansha", category: "Rural", panchayat: "Bhokaha" },
  { name: "Goti Bandh", category: "Rural", panchayat: "Kachar" },
  { name: "Hariobara", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Harni", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Hurmeth", category: "Rural", panchayat: "Kachar" },
  { name: "Jagat Khap", category: "Rural", panchayat: "Pankara" },
  { name: "Jagatpur", category: "Rural", panchayat: "Nandai" },
  { name: "Jhangat", category: "Rural", panchayat: "Bhokaha" },
  { name: "Kabisa", category: "Rural", panchayat: "Bhangia" },
  { name: "Kachar", category: "Rural", panchayat: "Kachar" },
  { name: "Karhanni", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Karman", category: "Rural", panchayat: "Bhangia" },
  { name: "Kathautia", category: "Rural", panchayat: "Pankara" },
  { name: "Kewla Kalan", category: "Rural", panchayat: "Bhangia" },
  { name: "Khaira", category: "Rural", panchayat: "Manjhauli" },
  { name: "Khardag", category: "Rural", panchayat: "Kachar" },
  { name: "Kokna", category: "Rural", panchayat: "Chhakarbandha" },
  { name: "Koldaga", category: "Rural", panchayat: "Chhakarbandha" },
  { name: "Kolhubar", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Kolsaita", category: "Rural", panchayat: "Bhangia" },
  { name: "Kundari", category: "Rural", panchayat: "Kachar" },
  { name: "Kunria", category: "Rural", panchayat: "Bhangia" },
  { name: "Kusari", category: "Rural", panchayat: "Mahuri" },
  { name: "Lataha", category: "Rural", panchayat: "Pankara" },
  { name: "Lon Chak", category: "Rural", panchayat: "Bhangia" },
  { name: "Londa", category: "Rural", panchayat: "Nandai" },
  { name: "Madarpur", category: "Rural", panchayat: "Mahuri" },
  { name: "Mahjari", category: "Rural", panchayat: "Chhakarbandha" },
  { name: "Mahuri", category: "Rural", panchayat: "Bhangia" },
  { name: "Mahuri", category: "Rural", panchayat: "Mahuri" },
  { name: "Maigara", category: "Rural", panchayat: "Sewra" },
  { name: "Majhauli", category: "Rural", panchayat: "Manjhauli" },
  { name: "Majhgawan", category: "Rural", panchayat: "Mahuri" },
  { name: "Manrar", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Mataha", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Maun Bar", category: "Rural", panchayat: "Kachar" },
  { name: "Mayapur", category: "Rural", panchayat: "Pankara" },
  { name: "Milki", category: "Rural", panchayat: "Nandai" },
  { name: "Nabigarh", category: "Rural", panchayat: "Bhokaha" },
  { name: "Nagahari", category: "Rural", panchayat: "Sewra" },
  { name: "Nanai", category: "Rural", panchayat: "Nandai" },
  { name: "Narayanpur", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Nonisat", category: "Rural", panchayat: "Bhangia" },
  { name: "Pachmah", category: "Rural", panchayat: "Sewra" },
  { name: "Pakharpur", category: "Rural", panchayat: "Mahuri" },
  { name: "Pankara", category: "Rural", panchayat: "Pankara" },
  { name: "Pathra", category: "Rural", panchayat: "Bhangia" },
  { name: "Patkhaulia", category: "Rural", panchayat: "Pankara" },
  { name: "Phulwaria", category: "Rural", panchayat: "Sewra" },
  { name: "Piparwar", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Pipra", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Purkhan Chak", category: "Rural", panchayat: "Pankara" },
  { name: "Rabda", category: "Rural", panchayat: "Mahuri" },
  { name: "Rabdi", category: "Rural", panchayat: "Bhokaha" },
  { name: "Rachhia", category: "Rural", panchayat: "Pankara" },
  { name: "Rajbalia", category: "Rural", panchayat: "Bhangia" },
  { name: "Ramdohar", category: "Rural", panchayat: "Nandai" },
  { name: "Rampur", category: "Rural", panchayat: "Kachar" },
  { name: "Rampur", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Saita", category: "Rural", panchayat: "Bhangia" },
  { name: "Salaiya", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Salaiya", category: "Rural", panchayat: "Manjhauli" },
  { name: "Sendwaria", category: "Rural", panchayat: "Sewra" },
  { name: "Sewra", category: "Rural", panchayat: "Sewra" },
  { name: "Sidhpur", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Sihauta", category: "Rural", panchayat: "Bhokaha" },
  { name: "Sildilia", category: "Rural", panchayat: "Kachar" },
  { name: "Simari", category: "Rural", panchayat: "Narayan Pur" },
  { name: "Simri", category: "Rural", panchayat: "Pankara" },
  { name: "Singh Pur", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Sonpura", category: "Rural", panchayat: "Kolhu Bar" },
  { name: "Sujji Kalan", category: "Rural", panchayat: "Pankara" },
  { name: "Sujji Khurd", category: "Rural", panchayat: "Pankara" },
  { name: "Sura Chak", category: "Rural", panchayat: "Kachar" },
  { name: "Tanrwa", category: "Rural", panchayat: "Bhokaha" },
  { name: "Tara Chuan", category: "Rural", panchayat: "Bhokaha" },
  { name: "Tekra Kalan", category: "Rural", panchayat: "Mahuri" },
  { name: "Tekra Khurd", category: "Rural", panchayat: "Manjhauli" },
  { name: "Umed Chak", category: "Rural", panchayat: "Bhangia" },
  { name: "Umed Chak", category: "Rural", panchayat: "Mahuri" },
  { name: "Umed Chak Arazi", category: "Rural", panchayat: "Mahuri" },
  { name: "Wali Chak", category: "Rural", panchayat: "Sewra" },
] as const;

export const DEFAULT_NOTICES: Notice[] = [
  {
    id: "nt-1",
    title: "Gram Sabha Meeting",
    description: "Monthly Gram Sabha meeting of Kolhu Bar Panchayat will be held at the Panchayat Bhawan. All villagers are requested to attend and share local issues.",
    date: "2025-01-15",
    category: "Meeting",
  },
  {
    id: "nt-2",
    title: "Road Repair Work",
    description: "Road maintenance work on the village main road will be carried out next week. Villagers are advised to plan travel accordingly.",
    date: "2025-01-20",
    category: "Infrastructure",
  },
  {
    id: "nt-3",
    title: "Vaccination Camp",
    description: "Free health check-up and vaccination camp by the Health Department at the village school on Sunday, 9 AM onwards.",
    date: "2025-01-26",
    category: "Health",
  },
];
