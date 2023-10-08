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
}
const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  fetchJobs: async () => {
    try {
      const request = await api();
      const response = await request.get('/jobs/all');
      set({ jobs: response.data });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  },
}));
export default useJobStore;
