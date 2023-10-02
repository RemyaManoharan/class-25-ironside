import create from 'zustand';
import axios from 'axios';
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
  fetchJobs: (accessToken: string) => Promise<void>;
}
const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  fetchJobs: async (accessToken) => {
    try {
      const response = await axios.get('http://localhost:3000/api/jobs/all', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ jobs: response.data });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  },
}));
export default useJobStore;
