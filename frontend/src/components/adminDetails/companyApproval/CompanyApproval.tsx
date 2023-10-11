import { Link } from 'react-router-dom';
import style from './companies.module.css';
import CompanyCard from '../companyCard/CompanyCard';
import { CompaniesProps } from '../types/types';

const CompanyApproval: React.FC<CompaniesProps> = ({ companies }: any) => {
  if (companies.length === 0) {
    return <div className={style.empty}> no Companies requests found !!!</div>;
  }
  return (
    <section className={style.content}>
      <div className={style.title}>
        <h3>Company to Approve</h3>
      </div>
      <div className={style.cardContent}>
        {companies.map((company: any, index: any) => (
          <CompanyCard key={index} company={company} />
        ))}
      </div>
    </section>
  );
};

export default CompanyApproval;
