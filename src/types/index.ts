export type Specialty =
  | "Face"
  | "Muscle"
  | "Hacker"
  | "Driver"
  | "Safecracker"
  | "Lookout"
  | "Demolitions"
  | "Inside Man";

export type Risk = "Low" | "Moderate" | "High" | "Critical";

export type GearCategory = "Tech" | "Entry" | "Transport" | "Disguise" | "Ordnance" | "Comms";

export interface CrewMember {
  id: string;
  codename: string;
  specialty: Specialty;
  heat: number; // 0-100, how "known" they are to the law
  cut: number; // percentage of the score
  color: string; // accent color for avatar
  bio: string;
}

export interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  cost: number;
  acquired: boolean;
}

export interface JobCard {
  id: string;
  columnId: string;
  title: string;
  detail: string;
  risk: Risk;
  assignedCrewIds: string[];
  gearIds: string[];
  eta: string; // e.g. "T-minus 2m"
  order: number;
}

export interface Column {
  id: string;
  title: string;
  subtitle: string;
  order: number;
}
