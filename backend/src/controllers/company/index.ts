import { Request, Response } from 'express';
import db from '../../config/db-config';

const companies = [];

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await db('companies').select('*');
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies list' });
  }
};

export const postCompany = async (req: Request, res: Response) => {
  try {
    const newCompany = req.body;

    if (!newCompany.name) {
      return res.status(400).json({ error: 'Company name is required' });
    }
    // Insert the new company into the database
    const insertedCompany = await db('companies').insert(newCompany).returning('*');

    if (insertedCompany.length > 0) {
      res.status(201).json({ message: 'Company added successfully', company: insertedCompany[0] });
    } else {
      res.status(500).json({ error: 'Failed to retrieve the inserted company' });
    }
  } catch (error) {
    console.error('Error posting a company:', error);
    const errorMessage = error instanceof Error && error.message ? error.message : 'Unknown error';
    res.status(500).json({ error: `Server error: ${errorMessage}` });
  }
};
