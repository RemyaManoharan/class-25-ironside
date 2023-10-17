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

export const getTotalJobApplicants = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  try {
    const total_applicants = await db('job_applications')
      .count('* as total_applicants')
      .join('jobs', 'job_applications.job_id', 'jobs.id')
      .where('jobs.id', `${jobId}`);
    res.status(200).json(total_applicants);
  } catch (error) {
    console.error('Error fetching total job applicants:', error);
    res.status(500).json({ error: 'Error fetching total job applicants' });
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
      .select('jobs.*', 'companies.*', 'jobs.id as job_id')
      .select(
        db.raw(
          '(SELECT COUNT(*) FROM job_applications WHERE job_applications.job_id = jobs.id) as applicant_count',
        ),
      )
      .join('companies', 'jobs.company_id', 'companies.id')
      .where('jobs.status', 'approved');

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

export const postJobApplication = async (req: Request, res: Response) => {
  try {
    const { job_id, user_id, application_date, contact_number, application_letter } = req.body;

    // Insert the job application into the database
    const insertedJobApplicationDetails = await db('job_applications')
      .insert({
        job_id,
        user_id,
        application_date,
        contact_number,
        application_letter,
      })
      .returning('*');

    if (insertedJobApplicationDetails && insertedJobApplicationDetails.length > 0) {
      res.status(201).json({
        message: 'Job application added successfully',
        job: insertedJobApplicationDetails[0],
      });
    } else {
      res.status(500).json({ error: 'Failed to insert the job application' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error && error.message ? error.message : 'Unknown error';
    res.status(500).json({ error: `Server error: ${errorMessage}` });
  }
};
