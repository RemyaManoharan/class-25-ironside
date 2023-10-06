import express, { Router } from 'express';
import { getCompanies, postCompany, updateCompany } from '../../controllers/company';

const companyRoute: Router = express.Router();

// to fetch company details from database
companyRoute.get('/', getCompanies);

// to insert company details into database
companyRoute.post('/', postCompany);

// Update company details
companyRoute.put('/:id', updateCompany);

export default companyRoute;
