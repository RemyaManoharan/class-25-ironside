import job1 from '../assets/jobs/jobLogo1.png';
import job2 from '../assets/jobs/jobLogo2.png';
import job3 from '../assets/jobs/jobLogo3.png';
import job4 from '../assets/jobs/jobLogo4.png';
import job5 from '../assets/jobs/jobLogo5.png';
import company1 from '../assets/company/companyLogo1.png';
import company2 from '../assets/company/companyLogo2.png';
import company3 from '../assets/company/companyLogo3.png';
import company4 from '../assets/company/companyLogo4.png';
import company5 from '../assets/company/companyLogo5.png';
import company6 from '../assets/company/companyLogo6.png';
import company7 from '../assets/company/companyLogo7.png';

const jobLogo = [job1, job2, job3, job4, job5];
const companyLogo = [company1, company2, company3, company4, company5, company6, company7];

const randomLogo = (type: string) => {
  if (type === 'job') return jobLogo[Math.floor(Math.random() * jobLogo.length)];
  else if (type === 'company') {
    return companyLogo[Math.floor(Math.random() * companyLogo.length)];
  }
};
export default randomLogo;
