export interface Job {
  id: number;
  title: string;
  description: string;
  name: string;
  location: string;
}

export interface AdminPropsType {
  job: Job;
}
export interface JobsProps {
  jobs: Job[];
}
export interface CountDisplayProps {
  openJobsCount: number | null;
  jobsCount: number | null;
  companiesCount: number | null;
  usersCount: number | null;
}
