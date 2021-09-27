import Card from '../component/Card';
import {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root:{
    flexGrow: 1,
    maxWidth: 1000,
    isplay: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=50')
    .then(response => response.json())
    .then(data => {
      const promises = data.results.map((item) => {
          return fetch(item.url);
      });
      return Promise.all(promises);
    })
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      setPokemons(data);
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <div className={classes.root}>
      <Grid container>
        {pokemons.map((pokemon) => (
          <Grid item xs={2} key={pokemon.id} className={classes.paper}>
            <Card pokemon={pokemon}></Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
