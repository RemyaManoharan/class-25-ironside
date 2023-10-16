import { create } from 'zustand';
import api from '../api';

interface Job {
  job_id: number;
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

interface JobApplication {
  name: string;
  contact_number: string;
  application_letter: string;
  job_id: number;
  user_id: number;
}
interface JobStore {
  jobs: Job[];
  totalJobApplicants: number;
  filters: {
    location: string;
    workTypes: string[];
    experience: string[];
    showBy: string;
    isRemote: boolean;
  };

  resetJobStore: () => void;
  fetchJobs: () => Promise<void>;
  setFilters: (newFilters: {
    location: string;
    workTypes: string[];
    experience: string[];
    showBy: string;
    isRemote: boolean;
  }) => void;

  submitJobApplication: (jobId: number, applicationData: JobApplication) => Promise<void>;
  fetchTotalJobApplications: (jobId: number) => Promise<void>;
}

const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  totalJobApplicants: 0,
  filters: {
    location: '',
    workTypes: [],
    experience: [],
    showBy: '',
    isRemote: false,
  },
  fetchJobs: async () => {
    const filters = get().filters;
    try {
      const request = await api();
      const queryParams = [];
      if (filters.location) {
        queryParams.push(`location=${filters.location}`);
      }
      if (filters.workTypes.length > 0) {
        const workTypesParam = filters.workTypes.join(',');
        queryParams.push(`workTypes=${workTypesParam}`);
      }
      if (filters.experience.length > 0) {
        const experienceParam = filters.experience.join(',');
        queryParams.push(`experience=${experienceParam}`);
      }
      if (filters.showBy) {
        queryParams.push(`showBy=${filters.showBy}`);
      }
      if (filters.isRemote) {
        queryParams.push(`isRemote=${filters.isRemote}`);
      }
      const queryString = queryParams.join('&');

      // Construct the URL with the query string
      const url = `/jobs${queryString ? `?${queryString}` : ''}`;
      const response = await request.get(url);

      set({ jobs: response.data });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  },
  setFilters: (newFilters) => set({ filters: newFilters }),
  resetJobStore: () => {
    set({ jobs: [] });
  },

  submitJobApplication: async (jobId: number, formData: JobApplication) => {
    try {
      const jobApplication: JobApplication = {
        ...formData,
        job_id: jobId,
      };
      const axiosInstance = await api();

      await axiosInstance.post(`jobs/job-applications`, jobApplication);
    } catch (error) {
      console.error('Error submitting job application:', error as any); // Cast 'error' to 'any' type for logging
      throw new Error('Error submitting job application.');
    }
  },
  fetchTotalJobApplications: async (jobId: number) => {
    try {
      const request = await api();
      const response = await request.get(`/jobs/${jobId}/count`);
      const totalApplicants = (await response.data[0].total_applicants) as number;
      set({ totalJobApplicants: totalApplicants });
      console.log(`Total Applicants for job ${jobId}:`, totalApplicants);
    } catch (error) {
      console.error('Error fetching total job applicants:', error);
      throw new Error('Error fetching total job applicants.');
    }
  },
}));
export default useJobStore;
