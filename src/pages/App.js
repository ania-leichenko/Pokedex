import Card from '../component/Card';
import {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from '../component/Select';
import Search from '../component/Search'

const useStyles = makeStyles((theme) => ({
  main:{
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
  const [count, setCount] = useState(20);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100000`)
    .then(response => response.json())
    .then(data => {
     let limitArr = data.results.slice(0, count);
     console.log(limitArr);
      const promises = limitArr.map((item) => {
          return fetch(item.url);
      });
      return Promise.all(promises);
    })
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      setPokemons(data);
    })
    .catch((err) => console.log(err));
  }, [count])

  return (
    <div>
      <main className={classes.main}>
        <Select count={count} setCount={setCount}></Select>
        <Search></Search>
        <Grid container>
          {pokemons.map((pokemon) => (
            <Grid item xs={2} key={pokemon.id} className={classes.paper}>
              <Card pokemon={pokemon}></Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}

export default App;