import React from 'react';
import locationSvg from '../adminDetails/assets/Location.svg';
import { Company } from '../../store/company.store';
import randomLogo from '../../hooks/randomLogo';
import style from './RelatedCompany.module.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type RelatedCompaniesListProps = {
  relatedCompanies: Company[];
};

const RelatedCompany: React.FC<RelatedCompaniesListProps> = ({ relatedCompanies }) => {
  if (relatedCompanies.length === 0) {
    return (
      <div className='job-card'>
        <Typography variant='body1'>No related companies available.</Typography>
      </div>
    );
  }
  const relatedCompaniesLimit = relatedCompanies.slice(0, 4);
  return (
    <>
      {relatedCompaniesLimit.map((company) => (
        <div key={company.id}>
          <div className={style.companyCard}>
            <div className={style.cardHead}>
              <div className={style.logo}>
                <img src={randomLogo(company.logo)} alt='companylogo' />
              </div>

              <div className={style.cardTitle}>
                <Link
                  to={`/CompanyDetails/${company.id}`}
                  className='customLink'
                  style={{ textDecoration: 'none' }}
                >
                  <Typography variant='h3' component='h2'>
                    {company.name}
                  </Typography>
                </Link>
              </div>
            </div>
            <div>
              <Typography variant='h4'> Services : {company.services}</Typography>
            </div>
            <div className={style.cardFooter}>
              <Typography variant='h4' component='h2'>
                <img src={locationSvg} alt='locationSvg' />
                {company.location}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RelatedCompany;
