import Card from "../component/main/Card";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from "../component/header/Select";
import Search from "../component/header/Search";
import Pagination from "../component/footer/Pagination";
import TagsSelect from "../component/header/Tags-select";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [countPerPage, setCountPerPage] = useState(20);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countOfPage, setCountOfPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100000`)
      .then((response) => response.json())
      .then((data) => {
        setAllPokemons(data.results);
      });
  }, []);

  useEffect(() => {
    let result = allPokemons;
    if (pokemonName !== "") {
      result = result.filter((item) => item.name.includes(pokemonName));
    }

    setCountOfPage(Math.round(result.length / countPerPage));

    const end = currentPage * countPerPage;
    const start = end - countPerPage;
    result = result.slice(start, end);

    let needSave = false;
    const promises = result.map((item) => {
      if (pokemonInfo[item.name]) {
        return pokemonInfo[item.name];
      }

      needSave = true;
      return fetch(item.url).then((response) => response.json());
    });
    Promise.all(promises).then((data) => {
      if (needSave) {
        const info = {};
        data.forEach((item) => {
          info[item.name] = item;
        });
        setPokemonInfo({
          ...pokemonInfo,
          ...info,
        });
      }
      setPokemons(data);
    });
  }, [
    countPerPage,
    pokemonName,
    currentPage,
    setCountOfPage,
    allPokemons,
    setPokemonInfo,
    pokemonInfo,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [countPerPage, pokemonName, setCurrentPage]);

  return (
    <div className={classes.root}>
      <header>
        <Grid
          container
          alignItems="center"
          spacing={2}
          justifyContent="space-around"
        >
          <Grid item xs={12} sm={6}>
            <Search setPokemonName={setPokemonName}></Search>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs={6}>
                <Select
                  count={countPerPage}
                  setCount={setCountPerPage}
                ></Select>
              </Grid>
              <Grid item xs={6}>
                <TagsSelect></TagsSelect>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </header>
      <main>
        <Grid container spacing={2}>
          {pokemons.map((pokemon) => (
            <Grid item xs={6} sm={4} md={2} key={pokemon.id}>
              <Card pokemon={pokemon}></Card>
            </Grid>
          ))}
        </Grid>
      </main>
      <footer className={classes.footer}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countOfPage={countOfPage}
        ></Pagination>
      </footer>
    </div>
  );
}

export default App;
