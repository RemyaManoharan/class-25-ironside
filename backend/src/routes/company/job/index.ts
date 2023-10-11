import express, { Router } from 'express';
import { addJobByCompany } from '../../../controllers/company/job';

const insertJobRoute: Router = express.Router();

insertJobRoute.post('/:company_id', addJobByCompany);

export default insertJobRoute;
