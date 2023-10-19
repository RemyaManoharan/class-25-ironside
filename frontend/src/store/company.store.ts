import { create } from 'zustand';
import api from '../api';

export interface Job {
  id: number;
  title: string;
  description: string;
  skills: string;
  experience: number;
}

export interface Company {
  id: number;
  name: string;
  location: string;
  about: string;
  skills: string;
  description: string;
  requirement: string;
  services: string | null;
  logo: number;
  jobs: Job[];
}

interface CompanyStore {
  companies: Company[];
  selectedCompany: Company | null;
  relatedCompanies: Company[];
  fetchCompanies: () => Promise<void>;
  fetchCompanyById: (companyId: number) => Promise<void>;
  fetchRelatedCompanies: (location: string) => Promise<void>;
}

const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [] as Company[],
  selectedCompany: null,
  relatedCompanies: [],
  fetchCompanies: async () => {
    try {
      const request = await api();
      const response = await request.get('/company');
      const companies = await response.data;

      set({ companies });
    } catch (err) {
      console.error(err);
    }
  },
  fetchCompanyById: async (companyId: number) => {
    try {
      const request = await api();

      // Fetch company data
      const companyResponse = await request.get(`/company/${companyId}`);
      const company = await companyResponse.data;

      // Fetch jobs for the company
      const jobsResponse = await request.get(`/company/${companyId}/jobs`);
      const jobs = await jobsResponse.data;

      const jobsArray = Array.isArray(jobs) ? jobs : [];

      // Combine company data with jobs
      const selectedCompany = { ...company, jobs: jobsArray };

      set({ selectedCompany });
    } catch (err) {
      console.error(err);
    }
  },
  fetchRelatedCompanies: async (location: string) => {
    try {
      const request = await api();
      // Fetch related companies based on location
      const relatedCompaniesResponse = await request.get(`/company/relatedCompanies/${location}`);
      const relatedCompanies = await relatedCompaniesResponse.data;

      set((state) => ({
        ...state,
        relatedCompanies: relatedCompanies,
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useCompanyStore;
