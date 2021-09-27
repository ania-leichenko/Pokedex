import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 160,
      textAlign: "center",
    },
    media: {
      height: "150px",
      width: "150px",
    },
  })
);

export default function RecipeReviewCard({ pokemon }) {
  const classes = useStyles();
  console.log(pokemon);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={pokemon.sprites.front_default} />
      <CardContent>
        <h3>{pokemon.name}</h3>
      </CardContent>
    </Card>
  );
}
