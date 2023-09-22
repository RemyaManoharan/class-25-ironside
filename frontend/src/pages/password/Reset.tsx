import React, { useState, useContext } from "react";
import { Box, Grid, Typography, TextField, Button, InputLabel } from "@mui/material";
import handImage from "../../assets/password.png";
import ArrowRight from "../../assets/ArrowRight.png"
import Icon from "../../assets/aperture.png";
import "./Reset.css";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(email);
      navigate("/login");
    } catch (error) {
      console.error("Error during reset:", error);
    }

    setLoading(false);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const handleFormSubmit = () => {
      // Handle form submission and send reset link
      setIsLinkSent(true); // Set link sent to true
    };

  return (
    <>
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
              <Link to="/login"><img className="ArrowRight" src={ArrowRight} alt="ArrowRight" /></Link>
              
              {isLinkSent ? (
                <div className="reset-password-link">
                  <Typography variant="body1" className="reset-link-text">
                      We sent you a reset link to your email. Please <br/>  check your email and click on the link.
                  </Typography>
            
                  <Typography variant="body1" className="didnt-receive-text">
                    Didn’t receive email?{" "}
                    <span className="resend-text">
                      Resend
                        </span>
                      </Typography>
                </div>
              ) : (
                <>
                  <Typography variant="subtitle2" className="forget-password">Forgot Password</Typography>
                  <Typography variant="subtitle1">We will send reset password you link on your mail</Typography>
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
                required
                    />
                  </div>
                  <div className="button-wrap">
                    <Button
                      variant="contained"
                      className={`reset-password-button ${isButtonDisabled ? "disabled" : ""}`}
                      disabled={loading} type="submit"
                    >
                      Reset password
                    </Button>
               
                  </div>
                  </form>
                  <Typography variant="body1">
                Need an account? <Link to="/signup">Sign Up</Link>
              </Typography>
                </>
              )}
            </div>
            </div>   
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6} className="image-column">
        <Box height="100vh" marginTop={5}>
                <img className="handimage" src={handImage} alt="Home" />
              </Box>
        </Grid>
      </Grid>
    </Box>
  
    </>
  );
};

export default ResetPassword;
