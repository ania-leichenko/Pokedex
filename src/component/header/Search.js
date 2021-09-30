import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function FreeSolo({setPokemonName}) {
    const handleClick = (event) => {
        setPokemonName(event.target.value);
    }

  return (
    <Stack spacing={2} sx={{ width: 500 }}>
          <TextField
            label="Search input"
            InputProps={{
              type: 'search',
            }}
            onChange={handleClick}
          />
    </Stack>
  );
}