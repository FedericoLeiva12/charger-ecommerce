import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
	        <Card className={classes.root}>
       			 <CardContent>
   			     <Typography className={classes.title} color="textSecondary" gutterBottom>
			          Word of the Day
			        </Typography>
			        <Typography variant="h5" component="h2">
    					cosa
			        </Typography>
			        <Typography className={classes.pos} color="textSecondary">
			          adjective
			        </Typography>
			        <Typography variant="body2" component="p">
			          well meaning and kindly.
 				         <br />
			          {'"a benevolent smile"'}
			        </Typography>
		      </CardContent>
     		</Card>
        </Grid>
	 <Grid item xs={4}>
	        <Card className={classes.root}>
       			 <CardContent>
   			     <Typography className={classes.title} color="textSecondary" gutterBottom>
			          Word of the Day
			        </Typography>
			        <Typography variant="h5" component="h2">
    					cosa
			        </Typography>
			        <Typography className={classes.pos} color="textSecondary">
			          adjective
			        </Typography>
			        <Typography variant="body2" component="p">
			          well meaning and kindly.
 				         <br />
			          {'"a benevolent smile"'}
			        </Typography>
		      </CardContent>
     		</Card>
        </Grid>
      <Grid item xs={4}>
	        <Card className={classes.root}>
       			 <CardContent>
   			     <Typography className={classes.title} color="textSecondary" gutterBottom>
			          Word of the Day
			        </Typography>
			        <Typography variant="h5" component="h2">
    					cosa
			        </Typography>
			        <Typography className={classes.pos} color="textSecondary">
			          adjective
			        </Typography>
			        <Typography variant="body2" component="p">
			          well meaning and kindly.
 				         <br />
			          {'"a benevolent smile"'}
			        </Typography>
		      </CardContent>
     		</Card>
        </Grid>
     </Grid>
    </div>
  );
}
