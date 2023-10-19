import { Request, Response } from 'express';
import db from '../../config/db-config';

export const getJobRequests = async (req: Request, res: Response) => {
  try {
    const jobsRequest = await db('jobs')
      .select('jobs.*', 'companies.name', 'companies.location', 'companies.logo')
      .join('companies', 'jobs.company_id', 'companies.id')
      .where('jobs.status', 'not approved');
    res.status(200).json(jobsRequest);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getUserCount = async (req: Request, res: Response) => {
  try {
    const usersCount = await db('users').count('* as count').first();
    res.status(200).json(usersCount?.count);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getCompanyCount = async (req: Request, res: Response) => {
  try {
    const companiesCount = await db('companies').count('* as count').first();
    res.status(200).json(companiesCount?.count);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getJobsCount = async (req: Request, res: Response) => {
  try {
    const jobsCount = await db('jobs').count('* as count').first();
    res.status(200).json(jobsCount?.count);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getOpenJobsCount = async (req: Request, res: Response) => {
  try {
    const openjobsCount = await db('jobs').where('status', 'approved').count('* as count').first();
    res.status(200).json(openjobsCount?.count);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const jobExists = await db('jobs').where('id', id).first();
    if (!jobExists) {
      return res.status(404).json('Job not found');
    }
    await db('jobs').where('id', id).del();
    res.status(200).json('Job deleted successfully');
  } catch (err) {
    res.status(500).json(err);
  }
};
export const addJob = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const jobExists = await db('jobs').where('id', id).first();
    if (!jobExists) {
      return res.status(404).json('Job not found');
    }
    await db('jobs').where('id', id).update({ status: 'approved' });
    res.status(200).json('Job added successfully');
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getCompaniesRequests = async (req: Request, res: Response) => {
  try {
    const companiesToApprove = await db('companies').where('status', 'not approved');

    res.status(200).json(companiesToApprove);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addCompany = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const companyExists = await db('companies').where('id', id).first();
    if (!companyExists) {
      return res.status(404).json('company not found');
    }
    await db('companies').where('id', id).update({ status: 'approved' });
    res.status(200).json('company added successfully');
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteCompany = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const jobExists = await db('companies').where('id', id).first();
    if (!jobExists) {
      return res.status(404).json('company not found');
    }
    await db('companies').where('id', id).del();
    res.status(200).json('company deleted successfully');
  } catch (err) {
    res.status(500).json(err);
  }
};
