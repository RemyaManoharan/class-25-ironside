import { Request, Response } from 'express';
import db from '../../../config/db-config';

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
    const companyStatus = await db('companies').select('status').where('id', company_id).first();
    if (companyStatus.status === 'not approved') {
      return res.status(400).json('comapny should wait for admin for approval');
    }
    // Insert the new job into the database
    const insertedJobDetails = await db('jobs')
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
      .returning('*');

    if (insertedJobDetails && insertedJobDetails.length > 0) {
      res.status(201).json({ message: 'Job added successfully', job: insertedJobDetails[0] });
    } else {
      res.status(500).json({ error: 'Failed to insert the job' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error && error.message ? error.message : 'Unknown error';
    res.status(500).json({ error: `Server error: ${errorMessage}` });
  }
};
