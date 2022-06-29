import styles from "./CountriesTable.module.css";
import { useState } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";

const orderBy = (countries, value, direction) => {
  const ordering = (a) => {
    if (value === "name") {
      return a.name.common;
    } else if (value === "population") {
      return a.population;
    }
  };

  if (direction === "asc") {
    return [...countries].sort((a, b) => (ordering(a) > ordering(b) ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (ordering(a) > ordering(b) ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return <KeyboardArrowDownRounded color="inherit" />;
  } else {
    return <KeyboardArrowUpRounded color="inherit" />;
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  console.log(orderedCountries[0].name.common);
  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
      </div>
      {orderedCountries.map((country) => {
        return (
          <div className={styles.row} key={country.name.common}>
            <div className={styles.name}>{country.name.common}</div>
            <div className={styles.population}>{country.population}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CountriesTable;
