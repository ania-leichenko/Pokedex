import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px", 
    },
}));

export default function PaginationOutlined() {
  const classes = useStyles();

  return (
    <Stack spacing={2} className={classes.pagination}>
      <Pagination count={10} variant="outlined" color="primary" />
    </Stack>
  );
}