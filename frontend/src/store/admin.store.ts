import { create } from 'zustand';
import api from '../api';

interface AdminStore {
  user: any | null;
  jobsRequest: any[];
  companiesRequest: any[];
  usersCount: null | number;
  companiesCount: null | number;
  jobsCount: null | number;
  openJobsCount: null | number;
  fetchCurrentUser: (uid: string) => Promise<void>;
  resetUser: () => void;
  getJobRequest: () => Promise<void>;
  getUserCount: () => Promise<void>;
  getComaniesCount: () => Promise<void>;
  getJobsCount: () => Promise<void>;
  getOpenJobsCount: () => Promise<void>;
  deleteJobRequest: (id: number) => Promise<void>;
  addJobRequest: (id: number) => Promise<void>;
  getCompanyRequest: () => Promise<void>;
  addcompany: (id: number) => Promise<void>;
  deleteCompany: (id: number) => Promise<void>;
}

const useAdminStore = create<AdminStore>()((set) => ({
  user: null,
  jobsRequest: [],
  usersCount: null,
  companiesCount: null,
  jobsCount: null,
  openJobsCount: null,
  companiesRequest: [],
  fetchCurrentUser: async (uid: string) => {
    try {
      const request = await api();
      const response = await request.get(`/user/${uid}`);
      const user = await response.data;

      set({ user });
    } catch (err) {
      console.error(err);
    }
  },

  getJobRequest: async () => {
    try {
      const request = await api();
      const response = await request.get(`/admin`);
      const jobsRequest = await response.data;

      set({ jobsRequest });
    } catch (err) {
      console.error(err);
    }
  },
  getUserCount: async () => {
    try {
      const request = await api();
      const response = await request.get(`/admin/users`);
      const usersCount = await response.data;

      set({ usersCount });
    } catch (err) {
      console.error(err);
    }
  },
  getComaniesCount: async () => {
    try {
      const request = await api();
      const response = await request.get(`/admin/company`);
      const companiesCount = await response.data;

      set({ companiesCount });
    } catch (err) {
      console.error(err);
    }
  },
  getJobsCount: async () => {
    try {
      const request = await api();
      const response = await request.get(`/admin/jobs`);
      const jobsCount = await response.data;

      set({ jobsCount });
    } catch (err) {
      console.error(err);
    }
  },
  getOpenJobsCount: async () => {
    try {
      const request = await api();
      const response = await request.get(`/admin/jobs/open`);
      const openJobsCount = await response.data;

      set({ openJobsCount });
    } catch (err) {
      console.error(err);
    }
  },
  deleteJobRequest: async (id) => {
    try {
      const request = await api();
      await request.delete(`/admin/jobs/${id}`);
      set((state) => {
        const jobsRequest = state.jobsRequest.filter((job) => job.id !== id);
        return { ...state, jobsRequest };
      });
    } catch (err) {
      console.error(err);
    }
  },
  addJobRequest: async (id) => {
    try {
      const request = await api();
      await request.put(`/admin/jobs/${id}`);
      set((state) => {
        const jobsRequest = state.jobsRequest.filter((job) => job.id !== id);
        return { ...state, jobsRequest };
      });
    } catch (err) {
      console.error(err);
    }
  },
  getCompanyRequest: async () => {
    try {
      const request = await api();
      const response = await request.get(`/admin/companies`);
      const companiesRequest = await response.data;

      set({ companiesRequest });
    } catch (err) {
      console.error(err);
    }
  },
  addcompany: async (id) => {
    try {
      const request = await api();
      await request.put(`/admin/company/${id}`);
      set((state) => {
        const companiesRequest = state.companiesRequest.filter((company) => company.id !== id);
        return { ...state, companiesRequest };
      });
    } catch (err) {
      console.error(err);
    }
  },
  deleteCompany: async (id) => {
    try {
      const request = await api();
      await request.delete(`/admin/company/${id}`);
      set((state) => {
        const companiesRequest = state.companiesRequest.filter((company) => company.id !== id);
        return { ...state, companiesRequest };
      });
    } catch (err) {
      console.error(err);
    }
  },
  resetUser: () => {
    set({
      user: null,
      jobsRequest: [],
      usersCount: null,
      companiesCount: null,
      jobsCount: null,
      openJobsCount: null,
      companiesRequest: [],
    });
  },
}));
export default useAdminStore;
