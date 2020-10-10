import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import url from "./urls";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  formControl: {
    // margin: theme.spacing(1),
    width: "100%",
  },
  image: {
    backgroundImage:
      "url(https://static01.nyt.com/images/2020/02/29/science/29VIRUS-PREPAREDNESS2/29VIRUS-PREPAREDNESS2-mobileMasterAt3x.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [roleIds, setRoleIds] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function handleChangeDept(event) {
    setDepartment(event.target.value);
  }

  function handleChangeGender(event) {
    setGender(event.target.value);
  }

  function handleRoleChange(event) {
    console.log(event.target);
    event.persist();
    setRoleIds(event.target.value);
  }

  useEffect(() => {
    return (async function () {
      let currentDataJSON = await fetch(url.FETCH_ROLES, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let currentData = await currentDataJSON.json();

      setRoles(currentData.body.data ? currentData.body.data : []);
    })();
  }, []);

  async function handleRegistration(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        userName &&
        userPassword &&
        roleIds.length &&
        age &&
        department &&
        gender
      ) {
        let currentDataJSON = await fetch(url.REGISTER, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            userPassword,
            roleIds,
            age,
            department,
            gender,
          }),
        });
        let currentData = await currentDataJSON.json();
        if (currentData.statusCode === 200) {
          // history.push("/");
          enqueueSnackbar("Register Successful", { variant: "success" });
        } else {
          enqueueSnackbar("Invalid Input", { variant: "error" });
        }
      } else {
        enqueueSnackbar("All fields are required", { variant: "error" });
      }
    } catch (ex) {
      enqueueSnackbar("Invalid Credentials", { variant: "error" });
    }
    setLoading(false);
  }

  console.log("roles = ", roles);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  onInput={(e) => setUserName(e.target.value)}
                  autoFocus
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  onInput={(e) => setUserPassword(e.target.value)}
                  required={true}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="roleIds"
                  label="Role ID"
                  variant="outlined"
                  SelectProps={{
                    multiple: true,
                    value: roleIds,
                    onChange: handleRoleChange,
                  }}
                >
                  {roles.map((item) => (
                    <MenuItem value={item.ROLE_ID}>{item.ROLE_NAME}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  type="Number"
                  onInput={(e) => setAge(e.target.value)}
                  autoFocus
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Department *
                  </InputLabel>

                  <Select
                    native
                    value={department}
                    onChange={handleChangeDept}
                    label="Department *"
                    required={true}
                  >
                    <option value="" />

                    <option value="department1">Department 1</option>
                    <option value="department2">Department 2</option>
                    <option value="department3">Department 3</option>
                    <option value="department4">Department 4</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Gender *
                  </InputLabel>

                  <Select
                    native
                    value={gender}
                    onChange={handleChangeGender}
                    label="Gender *"
                    required={true}
                  >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegistration}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  style={{
                    fontWeight: 800,
                    color: "white",
                    marginRight: "10px",
                  }}
                  className={classes.buttonProgress}
                />
              ) : null}
              {"  "}Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
