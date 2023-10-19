export interface Job {
  id: number;
  title: string;
  description: string;
  name: string;
  location: string;
  logo: number;
}
export interface Company {
  id: number;
  about: string;
  name: string;
  location: string;
  logo: number;
}
export interface AdminPropsType {
  job: Job;
}
export interface JobsProps {
  jobs: Job[];
}
export interface CompanyPropsType {
  company: Company;
}

export interface CountDisplayProps {
  openJobsCount: number | null;
  jobsCount: number | null;
  companiesCount: number | null;
  usersCount: number | null;
}
export interface CompaniesProps {
  companies: Company[];
}
