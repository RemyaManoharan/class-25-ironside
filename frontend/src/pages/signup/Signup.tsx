import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
import signupImage from "../../assets/signup.svg";
import Icon from "../../assets/aperture.svg";
import "./Signup.css";
export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { signup, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isButtonDisabled = !email || !password || loading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) {
      return setError("Password should be more than 8 characters");
    }
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      await updateUser(firstName, lastName);
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <div className="main-container">
      <div className="header">
      <Typography component="p" variant="h5">
                  <img className="Icon" src={Icon} alt="Icon" /> Dashboard
                </Typography>
      </div>
      <div className="main-content">
        <div className="form-content">
            <div className="form-design">
              <Typography variant="subtitle2" className="login-title">
               Sign up
              </Typography>              
              {error && <p>{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="name-wrapper">
                  <div className="label-wrap">
                    <InputLabel className="label">First name</InputLabel>
                    <TextField
                      name="fName"
                      id="outlined-required"
                      label="First Name"
                      variant="outlined"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      InputProps={{ style: { background: '#F8F9FD' } }} 
                      required
                      className="email-input" 
                      
                    />
                  </div>
                  <div className="label-wrap">
                    <InputLabel className="label">Last name</InputLabel>
                    <TextField
                      name="lName"
                      id="outlined-required"
                      label="Last Name"
                      type="text"
                      variant="outlined"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      InputProps={{ style: { background: '#F8F9FD' } }} 
                      className="email-input"
                    />
                  </div>
                </div>
                <div className="label-wrap">
                  <InputLabel className="label">Email</InputLabel>
                  <TextField
                    name="email"
                    id="outlined-required"
                    label="Enter email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{ style: { background: '#F8F9FD' } }} 
                    required
                    className="email-input"
                  />
                </div>
                <div className="label-wrap">
                  <InputLabel className="label">Password</InputLabel>
                  <TextField
                    name="password"
                    id="outlined-required"
                    label="Enter password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{ style: { background: '#F8F9FD' } }} 
                    required
                    className="email-input"
                  />
                </div>
                <div className="label-wrap">
                  <InputLabel className="label">Confirm Password</InputLabel>
                  <TextField
                    name="passwordConfirm"
                    id="outlined-required"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    InputProps={{ style: { background: '#F8F9FD' } }} 
                    required
                    className="email-input"
                  />
                </div>
                
                <div>
                <Button
                variant="contained"
                className={`signup-button ${loading ? "disabled" : ""}`}
                disabled={isButtonDisabled}
                type="submit"
                style={{
                  width: '60%', 
                  height: '10%', 
                  padding: '2%', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Sign up
              </Button>
                  
                </div>
                <div className="form-span">
          <Typography variant="body1">
          Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </div>
                
              </form>
            </div>
        </div>
        <div className="image-content">
        <img className="login-image" src={signupImage} alt="Login" />
      </div>
      </div>
  </div>
         

   /* <Box
      sx={{
        flexGrow: 1,
        maxWidth: 1300,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Grid container spacing={1}>
      
        <Grid item xs={12} md={6} className="signup-column">
            
          <Box padding={5} className="signup-content"> 
            <Typography component="p" variant="h5">
            <img className="Icon" src={Icon} alt="Icon" />  Dashboard
            </Typography>
            <div className="signup-container">
              <Typography variant="h6">Sign Up</Typography>
              <Typography variant="subtitle1">Select subscription</Typography>
              {error && <p>{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="name-wrapper">
                  <div className="label-wrap">
                    <InputLabel className="label">First name</InputLabel>
                    <TextField
                      name="fName"
                      id="outlined-required"
                      label="First Name"
                      variant="outlined"
                      type="text"
                      size="small"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      sx={{
                        width: { sm: 120, md: 120 },
                        "& .MuiInputBase-root": {
                          height: 50,
                        },
                      }}
                    />
                  </div>
                  <div className="label-wrap">
                    <InputLabel className="label">Last name</InputLabel>
                    <TextField
                      name="lName"
                      id="outlined-required"
                      label="Last Name"
                      type="text"
                      variant="outlined"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      sx={{
                        width: { sm: 120, md: 120 },
                        "& .MuiInputBase-root": {
                          height: 50,
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="label-wrap">
                  <InputLabel className="label">Email</InputLabel>
                  <TextField
                    name="email"
                    id="outlined-required"
                    label="Enter email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                      width: { sm: 273, md: 273 },
                      "& .MuiInputBase-root": {
                        height: 50,
                      },
                    }}
                  />
                </div>
                <div className="label-wrap">
                  <InputLabel className="label">Password</InputLabel>
                  <TextField
                    name="password"
                    id="outlined-required"
                    label="Enter password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{
                      width: { sm: 273, md: 273 },
                      "& .MuiInputBase-root": {
                        height: 50,
                      },
                    }}
                  />
                </div>
                <div className="label-wrap">
                  <InputLabel className="label">Confirm Password</InputLabel>
                  <TextField
                    name="passwordConfirm"
                    id="outlined-required"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    sx={{
                      width: { sm: 273, md: 273 },
                      "& .MuiInputBase-root": {
                        height: 50,
                      },
                    }}
                  />
                </div>
                <FormControlLabel
                  control={
                    <Checkbox name="rem-password" value="rem-password" />
                  }
                  label="Remember me"
                />
                <div>
                  <button disabled={loading} type="submit" className="btn">
                    Sign Up
                  </button>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    Already have an account?
                  </Typography>
                  <Link to="/login">Log In</Link>
                </div>
              </form>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} className="image-column">
          <Box
            className="handimage"
            sx={{
              background: `url(${signupImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            marginTop={5}
          /> 
        </Grid>
      </Grid>
    </Box> */
  );
}
