import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import url from "./urls";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState();

  useEffect(()=>{
      return (async function(){
        setLoading(true)
        let currentDataJSON = await fetch(url.DETAIL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          let currentData = await currentDataJSON.json();
          setUserDetail({...currentData.body})
          setLoading(false)

      })()
  },[])

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
          <Paper className={classes.paper}>

            <Grid container spacing={5}>
            <Grid item xs={4} style={{display:"flex", justify:"flex-start"}}>
                <InputLabel style={{color:"black", fontWeight:"600"}}>EMPLOYEE ID</InputLabel>
            </Grid>
            <Grid item xs={8} style={{display:"flex", justify:"flex-start"}}>
                <InputLabel style={{color:"black"}}>ID</InputLabel>
            </Grid>

            
            
            </Grid>
          </Paper>
        </Grid>
    </div>
  );
}
