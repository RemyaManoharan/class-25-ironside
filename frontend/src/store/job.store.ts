import { create } from 'zustand';
import api from '../api';
interface Job {
  id: number;
  title: string;
  title_description: string;
  description: string;
  skills: string;
  job_type: string;
  experience: string;
  requirement: string;
  name: string;
  location: string;
  is_remotework: boolean;
  about: string;
}
interface JobStore {
  jobs: Job[];
  fetchJobs: () => Promise<void>;
  resetJobStore: () => void;
}
const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  fetchJobs: async () => {
    try {
      const request = await api();
      const response = await request.get('/jobs/all');
      const jobs = await response.data;
      set({ jobs });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  },
  resetJobStore: () => {
    set({ jobs: [] });
  },
}));
export default useJobStore;
