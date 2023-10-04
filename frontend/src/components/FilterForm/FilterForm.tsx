import React, { useState } from 'react';
import styles from './FilterForm.module.css';
import useJobStore from '../../store/jobstore';

function FilterForm() {
  const filters = useJobStore((state) => state.filters);
  const setFilters = useJobStore((state) => state.setFilters);

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const newFilters = { ...filters, location: event.target.value };
    setFilters(newFilters);
    console.log(newFilters);
  };

  // const handleChangeWorkTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const workType = event.target.name;
  //   const newFilters = {
  //     ...filters,
  //     workTypes: [...filters.workTypes], // Create a new array
  //   }
  //   if (event.target.checked) {
  //     // Add the work type to the array if checked
  //     newFilters.workTypes.push(workType);
  //   } else {
  //     // Remove the work type from the array if unchecked
  //     newFilters.workTypes = newFilters.workTypes.filter((type) => type !== workType);
  //   }
  //   setFilters(newFilters);
  // };
  return (
    <div className={styles.filterContainer}>
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
          />
        </div>

        {/* show by  relevant*/}

        {/* remote work toggle button */}

        {/* type of work */}
        {/* <div className={styles.typeWorkCont}>
          <fieldset className={styles.typeWorkCont}>
            <legend className={styles.label}>Types Of Works</legend>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.workTypes.includes('internship')}
                onChange={handleChangeWorkTypes}
                name='internship'
              />
              Internship
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.workTypes.includes('partTime')}
                onChange={handleChangeWorkTypes}
                name='partTime'
              />
              Part-time
            </label>
            <label className={styles.itemStyle}>
              <input
                type='checkbox'
                checked={filters.workTypes.includes('fullTime')}
                onChange={handleChangeWorkTypes}
                name='fullTime'
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
        </div> */}
        {/* experience */}
      </form>
    </div>
  );
}

export default FilterForm;

// {/* show by */}
//       {/* <div className={styles.showByCont}>
//         <label htmlFor='showBy' className={styles.label}>
//           Show By
//         </label>
//         <select id='showBy' name='showBy' className={styles.customSelect}>
//           <option value='relevant'>Relevant</option>
//         </select>
//       </div> */}

// {/* remote work toggle button */}
//     {/* <div className={styles.remoteWork}>
//       <label className={`${styles.toggleContainer} ${styles.label}`}>
//         Remote Worker
//         <input type='checkbox' defaultChecked />
//       </label>
//     </div> */}

//   {/* experience */}
//   <div className={styles.experienceCont}>
//   <fieldset className={styles.typeWorkCont}>
//     <legend className={styles.label}>Experience</legend>
//     <label className={styles.itemStyle}>
//       <input
//         type='checkbox'
//         checked={freshGraduate}
//         // onChange={handleChangeCheckBox}
//         name='freshGraduate'

//       />
//       Fresh Graduate
//     </label>
//     <label className={styles.itemStyle}>
//       <input
//         type='checkbox'
//         checked={group1}
//         // onChange={handleChangeCheckBox}
//         name='group1'
//       />
//       1-3 years
//     </label>
//     <label className={styles.itemStyle}>
//       <input
//         type='checkbox'
//         checked={group2}
//         // onChange={handleChangeCheckBox}
//         name='group2'
//       />
//       3-5 years
//     </label>
//     <label className={styles.itemStyle}>
//       <input
//         type='checkbox'
//         checked={group3}
//         // onChange={handleChangeCheckBox}
//         name='group3'
//       />
//       5-10 years
//     </label>
//     <label className={styles.itemStyle}>
//       <input
//         type='checkbox'
//         checked={group4}
//         // onChange={handleChangeCheckBox}
//         name='group4'
//       />
//       10+ years
//     </label>
//   </fieldset>
// </div>
