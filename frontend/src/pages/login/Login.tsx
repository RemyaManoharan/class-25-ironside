import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, TextField, Button, InputLabel,Checkbox,
  FormControlLabel, } from "@mui/material";
import Login from "../../utilis/login.png";
import Icon from "../../utilis/aperture.png";
import "./Login.css";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      return navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);

      setError("failed to login check your info");
    }

    setLoading(false);
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={6} className="forgetpass-column">
          <Box height="100vh" padding={5}>
            <Typography component="p" variant="h5">
            <img className="Icon" src={Icon} alt="Icon" /> Dashboard
            </Typography>
            <div className="forgetpass-container">
              
              <div className="arrow-icon">
            
                <>
                  <Typography variant="subtitle2" className="forget-password">Login</Typography>
                  <Typography variant="subtitle1">Easy step to enter the platform</Typography>
                  {error && <p>{error}</p>}
                  <form onSubmit={handleSubmit}>
                  <div className="label-wrap">
                    <InputLabel className="label">Email</InputLabel>
                    <TextField
                      name="email"
                      id="outlined-required"
                      label="Enter email"
                      variant="outlined"
                      className="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="label-wrap">
                    <InputLabel className="label">Password</InputLabel>
                    <TextField
                      name="password"
                      id="outlined-required"
                      label="Enter password"
                      variant="outlined"
                      className="email-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <FormControlLabel
                control={<Checkbox name="rem-password" value="rem-password" />}
                label="Remember me"
              />
              <Typography variant="body1">
                  <Link to="/password">Forget Password</Link>
              </Typography>
                  <div className="button-wrap">
                    <Button
                      variant="contained"
                      className={`reset-password-button ${isButtonDisabled ? "disabled" : ""}`}
                      disabled={loading} type="submit"
                      >
                     Log in
                    </Button>
                  </div>
                </form> 
                  <Typography variant="body1">
                  Don’t have an account?<Link to="/signup">Sign Up</Link>
              </Typography>
                </>
              
            </div>
            </div>   
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6} className="image-column">
        <Box height="100vh" marginTop={5}>
                <img className="login" src={Login} alt="Login" />
              </Box>
        </Grid>
      </Grid>
    </Box>
  
  );
}

export default LoginPage;
