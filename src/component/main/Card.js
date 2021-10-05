import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const colorChip = {
  grass: "success",
  fairy: "secondary",
  poison: "error",
  fire: "warning",
  flying: "info",
  water: "primary",
  bug: "warning",
  normal: "default",
  electric: "secondary",
  ground: "warning",
  fighting: "secondary",
  psychic: "error",
  rock: "error",
  ghost: "default",
  ice: "info",
  steel: "default",
  dragon: "error",
  dark: "secondary",
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 160,
      height: 300,
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

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={pokemon.sprites.front_default}
      />
      <CardContent>
        <h3>{pokemon.name}</h3>
        {pokemon.types.map((types) => {
          return (
            <Stack
              spacing={1}
              alignItems="center"
              padding="1px"
              key={types.type.name}
            >
              <Stack direction="row" spacing={1}>
                <Chip
                  className={classes.chip}
                  label={types.type.name}
                  color={colorChip[types.type.name] || "success"}
                />
              </Stack>
            </Stack>
          );
        })}
      </CardContent>
    </Card>
  );
}
