import React from "react";
import "./JobDetail.css";
import logoImage from "../../assets/Logo Tumbnail.svg";
import { Typography } from "@mui/material";
// import { List, ListSubheader, ListItem ,ListItemText} from "@mui/material";
// import { makeStyles, Theme, createStyles } from '@mui/material/styles';

// const useStyles = makeStyles((theme :Theme) =>  createStyles ({
//   skillsList: {
//     display: 'flex',
//     alignItems: 'center',
//     listStyle: 'none',
//     padding: 0,
//   },
//   skillItem: {
//     marginRight: theme.spacing(1), // Adjust the spacing between skills
//   },
// }));

function JobDetail() {
  const skills = ['Ui-Design', 'Ux-Design', 'Figma', 'Javascript'];
  // const classes = useStyles();
  return (
    //   main div
    <section className="job-detail-wrapper">
      {/* header div  */}
      <div className="job-detail-header">
        <div className="logo-wrapper">
          <img src={logoImage} alt="logo-company" />
          <div className="company-job">
            <Typography variant="h2" component="h2">
              UI/UX Designer
            </Typography>
            <div className="jobType">
              <Typography variant="h4" component="h2">
                UI/UX Designer
              </Typography>
              <Typography variant="h4" component="h2">
                Remote
              </Typography>
              <Typography variant="h4" component="h2">
                Full-time
              </Typography>
              <Typography variant="h4" component="h2">
                1-3 years Experirnce
              </Typography>
            </div>
          </div>
        </div>

        <div className="apply-btn-container">
          <button type="submit" className="btn-apply">
            Apply
          </button>
        </div>
      </div>

      <div className="job-detail-main-container">
        <div className="job-description">
          <Typography variant="body1" component="h2">
            Job Description </Typography>
            <Typography component="div">
           
      <ul style={{ paddingLeft: '20px' }}>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
    </Typography>
          
          {/* // job description heading
                // list of job description */}
         
        </div>
        <div className="skill-container">
        <Typography variant="body1" component="h2">
           Skills </Typography>
           <ul className="skillsList">
        {skills.map((skill, index) => (
          <li key={index} className="skillItem">
            {skill}
          </li>
        ))}
      </ul>
         


          {/* //skill heading
                // list of skills */}
        </div>
        <div className="requirement-container">
        <Typography variant="body1" component="h2">
            Requirement </Typography>

          {/* // requirement heading
                // list of requirements */}
        </div>



        <div className="about-company-container">

        <Typography variant="body1" component="h2">
            About Company </Typography>
          {/* // about company heading
                //paragraph about company */}
        </div>
      </div>
    </section>
  );
}

export default JobDetail;
