import style from './admin.module.css';
import CountDisplay from '../../../components/adminDetails/countDisplay/CountDisplay';
import JobApproval from '../../../components/adminDetails/jobApproval/JobApproval';
import { useAdminData } from '../../../hooks/UseAdminData';
import CompanyApproval from '../../../components/adminDetails/companyApproval/CompanyApproval';

function AdminPage() {
  const { usersCount, companiesCount, jobsCount, jobsRequest, openJobsCount, companiesRequest } =
    useAdminData();

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
