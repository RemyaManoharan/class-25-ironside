import express, { Router } from 'express';
import { getCompanies, postCompany } from '../../controllers/company';

const companyRoute: Router = express.Router();

// to fetch company details from database
companyRoute.get('/', getCompanies);

// to insert company details into database
companyRoute.post('/', postCompany);

export default companyRoute;
