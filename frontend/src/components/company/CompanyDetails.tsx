import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCompanyStore from '../../store/company.store';
import CompanyLogo from '../../assets/Logo Tumbnail.svg';
import style from './CompanyDetails.module.css';
import { Typography } from '@mui/material';
import Map from '../../map/Map';
import RelatedCompany from './RelatedCompany';

type CompanyDetailParams = {
  companyId: string;
};

const CompanyDetail: React.FC = () => {
  const { companyId } = useParams<CompanyDetailParams>();
  const fetchCompanyById = useCompanyStore((state) => state.fetchCompanyById);
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);
  const fetchRelatedCompanies = useCompanyStore((state) => state.fetchRelatedCompanies);
  const relatedCompanies = useCompanyStore((state) => state.relatedCompanies);

  useEffect(() => {
    fetchCompanyById(Number(companyId));
  }, [companyId, fetchCompanyById]);

  useEffect(() => {
    if (selectedCompany) {
      // Fetch related companies for the selected company's location
      fetchRelatedCompanies(selectedCompany.location);
    }
  }, [selectedCompany]);

  const relatedCompaniesExceptCurrent = relatedCompanies.filter(
    (company) => company.id !== (selectedCompany ? selectedCompany.id : -1),
  );

  console.log('Related Companies:', relatedCompanies);
  if (!selectedCompany) {
    return <div>Loading...</div>;
  }

  return (
    //   main div
    <section className={style.companyDetailWrapper}>
      <div className={style.leftContainer}>
        {/* header div  */}
        <div className={style.companyDetailHeader}>
          <div className={style.logoWrapper}>
            <img src={CompanyLogo} alt='logo-company' />
            <div className={style.companyJob}>
              <Typography variant='h2' component='h2'>
                {selectedCompany.name}
              </Typography>
              <div className='companyType'>
                <Typography variant='h4' component='h2'>
                  {selectedCompany.location}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={style.companyDetailMainContainer}>
          <div className={style.aboutCompanyContainer}>
            <div className={style.jobSubhead}>
              <Typography variant='body1' component='h2'>
                About Company
              </Typography>
            </div>
            <Typography variant='h4' component='h2'>
              {selectedCompany.about}
            </Typography>
          </div>

          <div className='skill-container'>
            <Typography variant='body1' component='h2'>
              Services
            </Typography>
            <ul className='skillsList'>{selectedCompany.services}</ul>
          </div>

          <div className={style.jobDescription}>
            <div className={style.jobSubhead}>
              <Typography variant='body1' component='h2'>
                Available Positions
              </Typography>
            </div>
            <div className={style.jobListContainer}>
              {selectedCompany.jobs.map((job) => (
                <div key={job.id} className={style.jobList}>
                  <div className={style.jobName}>
                    <div>
                      <Typography variant='body1' component='h2'>
                        {job.title}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='h4' component='h2'>
                        {job.experience} years Experience
                      </Typography>
                    </div>
                  </div>
                  <div className={style.jobDescription}>
                    <Typography variant='h4' component='p'>
                      {job.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
            {selectedCompany.jobs.length === 0 && (
              <div className={style.noJobsContainer}>
                <Typography variant='h4' component='p'>
                  No current job openings.
                </Typography>
              </div>
            )}
          </div>

          <div className={style.companyAddress}>
            <div className={style.jobSubhead}>
              <Typography variant='body1' component='h2'>
                Office Address
              </Typography>
              {selectedCompany.location}
            </div>
            <Typography variant='h4' component='h2'>
              <div className={style.map}>
                <Map key={selectedCompany.id} city={selectedCompany.location} />
              </div>
            </Typography>
          </div>
        </div>
      </div>
      <div className={style.rightContainer}>
        <div>
          <Typography variant='body1' component='h2'>
            Related Company
          </Typography>
        </div>
        <div className={style.relatedJobCardContainer}>
          <RelatedCompany relatedCompanies={relatedCompaniesExceptCurrent} />
        </div>
      </div>
    </section>
  );
};

export default CompanyDetail;
