import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";

export default function MultipleSelectCheckmarks() {
  const [pokemonTags, setPokemonTags] = React.useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/`)
      .then((response) => response.json())
      .then((data) => {
        const allTags = [

        ]
        data.results.map((item) => {
          return allTags.push(item.name);
        })
        setTags(allTags)
      });
  }, [setTags]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPokemonTags(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-controlled-open-select-label">Pokemon Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={pokemonTags}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
            {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}