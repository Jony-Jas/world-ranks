import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";

export default function Home({ countries }) {
  // console.log(countries);
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput placeholder="filter by Name, Region or SubRegion" />
      <CountriesTable countries={countries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
