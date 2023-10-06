import { useEffect } from 'react';
import useAdminStore from '../../store/admin.store';
import style from './admin.module.css';
import CountDisplay from '../../components/adminDetails/countDisplay/CountDisplay';
import JobApproval from '../../components/adminDetails/jobApproval/JobApproval';
import { useAdminData } from '../../hooks/UseAdminData';

function AdminPage() {
  const { usersCount, companiesCount, jobsCount, jobsRequest, openJobsCount } = useAdminData();

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
      <div className={style.btm}>latest job vacasy</div>
    </div>
  );
}

export default AdminPage;
