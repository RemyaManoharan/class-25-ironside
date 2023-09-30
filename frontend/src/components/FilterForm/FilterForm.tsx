import React from 'react';
import styles from './FilterForm.module.css';
import { TextField, InputLabel, FormControlLabel, Switch, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';

import FormHelperText from '@mui/material/FormHelperText';

function FilterForm() {
  const [typeWork, setTypeWork] = React.useState({
    internship: true,
    partTime: false,
    freelance: false,
    fullTime: false,
  });
  const [experience, setExperience] = React.useState({
    freshGraduate: true,
    group1: false,
    group2: false,
    group3: false,
    group4: false,
  });
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeWork({
      ...typeWork,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeExperience = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperience({
      ...experience,
      [event.target.name]: event.target.checked,
    });
  };

  const { internship, partTime, freelance, fullTime } = typeWork;
  const { freshGraduate, group1, group2, group3, group4 } = experience;
  return (
    <div className={styles.filterContainer}>
      <form className={styles.formContainer}>
        <div className={styles.locationDiv}>
          <InputLabel className='label'>Location</InputLabel>
          <TextField
            name='location'
            id='outlined-required'
            label='City'
            type='text'
            variant='outlined'
            required
            InputProps={{ style: { background: '#F8F9FD', width: '100%', height: '50px' } }}
          />
        </div>

        {/* show by       */}
        <div className={styles.showByCont}>
          <InputLabel id='demo-simple-select-label'>Show By</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            fullWidth
            label='Age'
            value={10}
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value=''>
              <em>Relevant</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>

        {/* remote work toggle button */}
        <div className={styles.workTypeCont}>
          <FormControlLabel
            label={<span style={{ marginLeft: '10px' }}>Remote Worker</span>}
            control={<Switch defaultChecked />}
          />
        </div>
        {/* type of work */}
        <div className={styles.typeWorkCont}>
          <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
            <FormLabel component='legend'>Assign responsibility</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={internship}
                    onChange={handleChangeCheckBox}
                    name='internship'
                  />
                }
                label='Internship'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={partTime} onChange={handleChangeCheckBox} name='partTime' />
                }
                label='Part-time'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={freelance} onChange={handleChangeCheckBox} name='freelance' />
                }
                label='Freelance'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={fullTime} onChange={handleChangeCheckBox} name='fullTime' />
                }
                label='Full Time'
              />
            </FormGroup>
          </FormControl>
        </div>

        {/* type of work */}
        <div className={styles.experienceCont}>
          <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
            <FormLabel component='legend'>Experience</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={freshGraduate}
                    onChange={handleChangeCheckBox}
                    name='freshGraduate'
                  />
                }
                label='Fresh Graduate'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={group1} onChange={handleChangeCheckBox} name='group1' />
                }
                label='1-3 years'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={group2} onChange={handleChangeCheckBox} name='group2' />
                }
                label='3-5years'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={group3} onChange={handleChangeCheckBox} name='group3' />
                }
                label='5-10years'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={group4} onChange={handleChangeCheckBox} name='group4' />
                }
                label='10+years'
              />
            </FormGroup>
          </FormControl>
        </div>
      </form>
    </div>
  );
}

export default FilterForm;
