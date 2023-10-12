import style from './admin.module.css';
import CountDisplay from '../../../components/adminDetails/countDisplay/CountDisplay';
import JobApproval from '../../../components/adminDetails/jobApproval/JobApproval';
import { useAdminData } from '../../../hooks/UseAdminData';
import CompanyApproval from '../../../components/adminDetails/companyApproval/CompanyApproval';
import { useEffect } from 'react';

function AdminPage() {
  const {
    usersCount,
    companiesCount,
    jobsCount,
    jobsRequest,
    openJobsCount,
    companiesRequest,
    getComaniesCount,
    getJobsCount,
    getOpenJobsCount,
  } = useAdminData();

  useEffect(() => {
    getComaniesCount();
    getOpenJobsCount();
    getJobsCount();
  }, [jobsRequest, companiesRequest]);

  return (
    <div className={style.content}>
      <div className={style.top}>
        <CountDisplay
          usersCount={usersCount}
          companiesCount={companiesCount}
          jobsCount={jobsCount}
          openJobsCount={openJobsCount}
        />
      </div>
      <div className={style.mid}>
        <JobApproval jobs={jobsRequest} />
      </div>
      <div className={style.btm}>
        <CompanyApproval companies={companiesRequest} />
      </div>
    </div>
  );
}

export default AdminPage;
