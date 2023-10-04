import create from 'zustand';
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
  filters: {
    location: string;
    workTypes: string[];
  };
  fetchJobs: () => Promise<void>;
  setFilters: (newFilters: { location: string; workTypes: string[] }) => void;
}
const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  filters: {
    location: '',
    workTypes: ['internship'],
  },
  fetchJobs: async () => {
    const filters = get().filters;
    try {
      const request = await api();
      const response = await request.get('/jobs', { params: filters });
      set({ jobs: response.data });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  },
  setFilters: (newFilters) => set((state) => ({ filters: newFilters })),
}));
export default useJobStore;
