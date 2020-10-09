import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import url from "./urls";
import CircularProgress from '@material-ui/core/CircularProgress';

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
        <Grid item xs={12} >
          <div className={classes.paper} style={{marginTop:"20px"}} >
            {userDetail ? Object.entries(userDetail).map((user)=>{
                return (<Grid container item xs={12} spacing={10}>
                <Grid item xs={4} style={{display:"flex", justify:"flex-start"}}>
                    <InputLabel style={{color:"black", fontWeight:"600"}}>{user[0]}</InputLabel>
                </Grid>
                <Grid item xs={8} style={{display:"flex", justify:"flex-start"}}>
                    <InputLabel style={{color:"black"}}>{user[1]}</InputLabel>
                </Grid>
                </Grid>)
            }) : <CircularProgress style={{marginTop:"100px"}}/>}
            
          </div>
        </Grid>
    </div>
  );
}
