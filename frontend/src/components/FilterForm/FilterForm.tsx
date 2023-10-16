import React from 'react';
import styles from './FilterForm.module.css';
import useJobStore from '../../store/jobstore';
import { FaTimes } from 'react-icons/fa';
import { Switch } from '@mui/material';
interface FilterFormProps {
  toggleFilter: () => void;
}

function FilterForm({ toggleFilter }: FilterFormProps) {
  const filters = useJobStore((state) => state.filters);
  const setFilters = useJobStore((state) => state.setFilters);

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, location: event.target.value };
    setFilters(newFilters);
  };

  const handleChangeShowBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, showBy: event.target.value as 'latest' | 'oldest' };
    setFilters(newFilters);
  };

  const handleChangeRemoteWork = (event: React.SyntheticEvent) => {
    const newFilters = { ...filters, isRemote: (event.target as HTMLInputElement).checked };
    setFilters(newFilters);
  };

  const handleChangeWorkTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const workType = event.target.name;
    const newFilters = {
      ...filters,
      workTypes: [...filters.workTypes],
    };
    if (event.target.checked) {
      newFilters.workTypes.push(workType);
    } else {
      newFilters.workTypes = newFilters.workTypes.filter((type) => type !== workType);
    }
    setFilters(newFilters);
  };

  const handleChangeExperience = (event: React.ChangeEvent<HTMLInputElement>) => {
    const experience = event.target.name;
    const newFilters = {
      ...filters,
      experience: [...filters.experience],
    };
    if (event.target.checked) {
      newFilters.experience.push(experience);
    } else {
      newFilters.experience = newFilters.experience.filter((type) => type !== experience);
    }
    setFilters(newFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <button className={styles.closeButton} onClick={toggleFilter}>
        <FaTimes /> {/* Use the close icon */}
      </button>
      <form className={styles.formContainer}>
        <div className={styles.locationDiv}>
          <label className={styles.label} htmlFor='location'>
            Location
          </label>
          <input
            className={styles.inputStyle}
            name='location'
            id='location'
            type='text'
            placeholder='City'
            required
            value={filters.location}
            onChange={handleChangeLocation}
            autoComplete='off'
          />
        </div>
        {/* show by  date*/}
        <div className={styles.showByCont}>
          <label htmlFor='showBy' className={styles.label}>
            Show By Date
          </label>
          <select
            id='showBy'
            name='showBy'
            className={styles.customSelect}
            value={filters.showBy}
            onChange={handleChangeShowBy}
          >
            <option value='all'>All</option>
            <option value='latest'>Latest</option>
            <option value='oldest'>Oldest</option>
          </select>
        </div>

        {/* remote work toggle button */}
        <div className={styles.remoteWork}>
          <label className={`${styles.toggleContainer} ${styles.label} `}>
            <Switch checked={filters.isRemote} onChange={handleChangeRemoteWork} />
          </label>
        </div>

        {/* type of work */}
        <div className={styles.typeWorkCont}>
          <fieldset className={styles.typeWorkCont}>
            <legend className={styles.label}>Types Of Works</legend>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.workTypes.includes('Internship')}
                onChange={handleChangeWorkTypes}
                name='Internship'
              />
              Internship
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.workTypes.includes('Part-Time')}
                onChange={handleChangeWorkTypes}
                name='Part-Time'
              />
              Part-time
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.workTypes.includes('Full-Time')}
                onChange={handleChangeWorkTypes}
                name='Full-Time'
              />
              Full-time
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.workTypes.includes('freelance')}
                onChange={handleChangeWorkTypes}
                name='freelance'
              />
              Freelance
            </label>
          </fieldset>
        </div>
        {/* experience */}

        {/* experience */}
        <div className={styles.experienceCont}>
          <fieldset className={styles.typeWorkCont}>
            <legend className={styles.label}>Experience</legend>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.experience.includes('1-3')}
                onChange={handleChangeExperience}
                name='1-3'
              />
              1-3 years
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.experience.includes('3-5')}
                onChange={handleChangeExperience}
                name='3-5'
              />
              3-5 years
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.experience.includes('5-10')}
                onChange={handleChangeExperience}
                name='5-10'
              />
              5-10 years
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.experience.includes('10-50')}
                onChange={handleChangeExperience}
                name='10-50'
              />
              10+ years
            </label>
          </fieldset>
        </div>
      </form>
    </div>
  );
}

export default FilterForm;
