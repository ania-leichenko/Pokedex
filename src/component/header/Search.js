import * as React from "react";
import TextField from "@mui/material/TextField";

export default function FreeSolo({ setPokemonName }) {
  const handleClick = (event) => {
    setPokemonName(event.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search input"
      InputProps={{
        type: "search",
      }}
      onChange={handleClick}
    />
  );
}
