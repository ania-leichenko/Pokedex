import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
     maxWidth: 230,
     textAlign: "center",
    },
    media: {
      height: "225px",
      width: "225px",
    },
  }),
);

export default function RecipeReviewCard() {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"
        title="Bulbasaur" 
      />
      <CardContent>
       <h3>Bulbasaur</h3>
      </CardContent>
    </Card>
  );
}