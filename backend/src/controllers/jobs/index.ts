import { Request, Response } from 'express';
import { adminFireAuth } from '../../firebase/config';
import db from '../../config/db-config';

export const getAllJobs = async (req: Request, res: Response) => {
  //res.status(200).send({ message: "Successfully got the products" });
  try {
    const jobs = await db('jobs').select('*');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job list' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  const jobId = req.params.id;

  try {
    const job = await db('jobs').where({ id: jobId }).first();

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job by id' });
  }
};

export const getJobsByLocation = async (req: Request, res: Response) => {
  const location = req.params.location;

  try {
    const jobs = await db('jobs')
      .select('jobs.*', 'companies.location')
      .join('companies', 'jobs.company_id', 'companies.id')
      .where('companies.location', location);

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Error fetching jobs by location' });
  }
};

export const getJobsByWorkTypes = async (req: Request, res: Response) => {
  const { workTypes } = req.query;

  try {
    const workTypesArray = typeof workTypes === 'string' ? workTypes.split(',') : [];

    const jobs = await db('jobs').whereIn('job_type', workTypesArray).select('*');

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Error fetching jobs by workTypes' });
  }
};
export const getJobsByExperience = async (req: Request, res: Response) => {
  const { experience } = req.params;

  try {
    // Assuming experience is given as a range, e.g., "1-3", "3-5"
    const [minExp, maxExp] = experience.split('-').map((exp) => parseInt(exp));

    const jobs = await db('jobs').select('*').whereBetween('experience', [minExp, maxExp]);

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Error fetching jobs by experience' });
  }
};
// Controller function to filter jobs based on multiple criteria
export const getFilteredJobs = async (req: Request, res: Response) => {
  const location = req.query.location as string;
  const workTypes = (req.query.workTypes as string)?.split(',');
  const experience = (req.query.experience as string)?.split('-');

  try {
    let query = db('jobs');

    if (location) {
      // Apply location filter
      query = query
        .select('jobs.*', 'companies.location')
        .join('companies', 'jobs.company_id', 'companies.id')
        .where('companies.location', location);
    }

    if (workTypes && workTypes.length > 0) {
      // Apply work type filter
      query = query.whereIn('job_type', workTypes);
    }

    if (experience && experience.length === 2) {
      // Apply experience filter
      const [start, end] = experience.map(Number);
      query = query.whereBetween('experience', [start, end]);
    }

    const jobs = await query;

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Error fetching filtered jobs' });
  }
};

export const getAllJobDetails = async (req: Request, res: Response) => {
  try {
    const jobs = await db('jobs')
      .select('jobs.*', 'companies.*')
      .join('companies', 'jobs.company_id', 'companies.id');
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ error: 'Error fetching job details' });
  }
};
