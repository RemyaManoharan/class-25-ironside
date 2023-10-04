import { useEffect } from 'react';
import useAdminStore from '../../store/admin.store';
import style from './admin.module.css';
import CountDisplay from '../../components/adminDetails/countDisplay/CountDisplay';
import JobApproval from '../../components/adminDetails/jobApproval/JobApproval';

function AdminPage() {
  const jobsRequest = useAdminStore((state) => state.jobsRequest);
  const getJobRequest = useAdminStore((state) => state.getJobRequest);
  const usersCount = useAdminStore((state) => state.usersCount);
  const getUserCount = useAdminStore((state) => state.getUserCount);
  const companiesCount = useAdminStore((state) => state.companiesCount);
  const getComaniesCount = useAdminStore((state) => state.getComaniesCount);
  const jobsCount = useAdminStore((state) => state.jobsCount);
  const getJobsCount = useAdminStore((state) => state.getJobsCount);
  const openJobsCount = useAdminStore((state) => state.openJobsCount);
  const getOpenJobsCount = useAdminStore((state) => state.getOpenJobsCount);

  useEffect(() => {
    getJobRequest();
    getUserCount();
    getComaniesCount();
    getJobsCount();
    getOpenJobsCount();
  }, []);
  console.log(jobsRequest);

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
