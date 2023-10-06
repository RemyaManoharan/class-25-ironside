import { Request, Response } from 'express';
import db from '../../../config/db-config';
import { exit } from 'process';

export const addJobByCompany = async (req: Request, res: Response) => {
  try {
    const {
      title,
      title_description,
      description,
      skills,
      salary,
      job_type,
      experience,
      is_remotework,
      requirement,
    } = req.body;

    const company_id = req.params.company_id;
    // Insert the new job into the database
    const insertedJob = await db('jobs')
      .insert({
        title,
        title_description,
        company_id,
        description,
        skills,
        salary,
        job_type,
        experience,
        is_remotework,
        requirement,
      })
      .returning('id');

    const jobId = insertedJob[0]?.id;

    if (jobId) {
      const insertedJobDetails = await db('jobs').where('id', jobId).first();

      if (insertedJobDetails) {
        res.status(201).json({ message: 'Job added successfully', job: insertedJobDetails });
      } else {
        res.status(500).json({ error: 'Failed to retrieve the inserted job' });
      }
    } else {
      res.status(500).json({ error: 'Failed to insert the job' });
    }
  } catch (error) {
    console.error('Error posting a company:', error);
    const errorMessage = error instanceof Error && error.message ? error.message : 'Unknown error';
    res.status(500).json({ error: `Server error: ${errorMessage}` });
  }
};
