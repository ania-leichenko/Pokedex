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

export default function PaginationOutlined({setCurrentPage, currentPage, countOfPage}) {
  const classes = useStyles();

  function handleClick(event, page) {
    setCurrentPage(page);
  }


  return (
    <Stack spacing={2} className={classes.pagination}>
      <Pagination 
       page={currentPage}
       count={countOfPage}
       variant="outlined" 
       color="primary" 
       onChange={handleClick}
      />
    </Stack>
  );
}