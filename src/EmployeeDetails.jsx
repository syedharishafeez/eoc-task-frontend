import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import url from "./urls";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function EmployeeDetails(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  console.log("props.loginEmployeeData = ", props.loginEmployeeData[0]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
        <div className={classes.paper} style={{ marginTop: "20px" }}>
          {props.loginEmployeeData && props.loginEmployeeData.length ? (
            <>
              <Grid container item xs={12} spacing={10}>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black", fontWeight: "600" }}>
                    EMPLOYEE_ID
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black" }}>
                    {props.loginEmployeeData[0].EMPLOYEE_ID}
                  </InputLabel>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black", fontWeight: "600" }}>
                    EMPLOYEE_USERNAME
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black" }}>
                    {props.loginEmployeeData[0].EMPLOYEE_USERNAME}
                  </InputLabel>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black", fontWeight: "600" }}>
                    EMPLOYEE_DEPARTMENT
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black" }}>
                    {props.loginEmployeeData[0].EMPLOYEE_DEPARTMENT}
                  </InputLabel>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black", fontWeight: "600" }}>
                    EMPLOYEE_AGE
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black" }}>
                    {props.loginEmployeeData[0].EMPLOYEE_AGE}
                  </InputLabel>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black", fontWeight: "600" }}>
                    EMPLOYEE_GENDER
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black" }}>
                    {props.loginEmployeeData[0].EMPLOYEE_GENDER}
                  </InputLabel>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black", fontWeight: "600" }}>
                    EMPLOYEE_ROLE
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ display: "flex", justify: "flex-start" }}
                >
                  <InputLabel style={{ color: "black" }}>
                    {props.loginEmployeeData.map((user, index) => (
                      <Chip label={user.ROLE_NAME} />
                    ))}
                  </InputLabel>
                </Grid>
              </Grid>
              
            </>
            
          ) : (
            <InputLabel style={{ color: "black", fontWeight: "600" }}>
              Kindly Login again
            </InputLabel>
          )}
        </div>
      </Grid>
    </div>
  );
}
