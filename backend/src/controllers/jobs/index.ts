import { Request, Response } from 'express';
import db from '../../config/db-config';

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
      .where('companies.location', 'like', `%${location}%`);
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
    const jobs = await db('jobs')
      .select('jobs.*', 'companies.*')
      .join('companies', 'jobs.company_id', 'companies.id')
      .whereIn('jobs.job_type', workTypesArray);
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
  const sort = req.query.showBy as string;
  const isRemote = req.query.isRemote === 'true';

  try {
    let query = db('jobs')
      .select('jobs.*', 'companies.*')
      .join('companies', 'jobs.company_id', 'companies.id');
    if (location) {
      query = query.whereRaw('LOWER(companies.location) LIKE LOWER(?)', [
        `%${location.toLowerCase()}%`,
      ]);
    }
    if (workTypes && workTypes.length > 0) {
      // Apply work type filter
      query = query.whereIn('job_type', workTypes);
    }
    if (experience && experience.length === 2) {
      // Apply experience filter
      const [start, end] = experience.map(Number);
      query = query.where('experience', '>=', start).andWhere('experience', '<=', end);
    }
    if (sort === 'latest') {
      query = query.orderBy('jobs.created_date', 'desc');
    } else if (sort === 'oldest') {
      query = query.orderBy('jobs.created_date', 'asc');
    }

    if (isRemote === true) {
      query = query.where('is_remotework', isRemote);
    }
    if (
      !location &&
      (!workTypes || workTypes.length === 0) &&
      (!experience || experience.length !== 2)
    ) {
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
