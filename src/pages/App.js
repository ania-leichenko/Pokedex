import Card from "../component/main/Card";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from "../component/header/Select";
import Search from "../component/header/Search";
import Box from "@mui/material/Box";
import Pagination from '../component/footer/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
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
  header: {
    textAlign: "center",
  },
  search: {
    position: "relative",
    top: "8px",
    left: "70px",
  },
  select: {
    position: "relative",
    left: "80px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [count, setCount] = useState(20);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const  [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {

    console.log(currentPage);

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100000`)
      .then((response) => response.json())
      .then((data) => {
        let result = data.results;
        let count = result.length / 20;
        let end = currentPage * 20;
        let start = end - 20;
        result = result.slice(start, end);
        if (pokemonName !== "") {
          result = result.filter((item) => item.name.startsWith(pokemonName));
        }
        result = result.slice(0, count);
        const promises = result.map((item) => {
          return fetch(item.url);
        });
        return Promise.all(promises);
      })
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        setPokemons(data);
      })
      .catch((err) => console.log(err));
  }, [count, pokemonName, currentPage]);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Grid container>
          <Grid item xs={6}>
            <Box className={classes.search}>
              <Search setPokemonName={setPokemonName}></Search>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.select}>
              <Select count={count} setCount={setCount}></Select>
            </Box>
          </Grid>
        </Grid>
      </header>
      <main>
        <Grid container>
          {pokemons.map((pokemon) => (
            <Grid item xs={2} key={pokemon.id} className={classes.paper}>
              <Card pokemon={pokemon}></Card>
            </Grid>
          ))}
        </Grid>
      </main>
      <footer className={classes.footer}>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
      </footer>
    </div>
  );
}

export default App;