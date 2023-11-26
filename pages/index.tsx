import Head from "next/head";
import favicon from "../public/imperial.svg";

//import DataManager from "../src/components/dataManager/DataManager";
import ErrorBoundary from "../src/components/ErrorBoundary";
//import { PlanetParams, PlanetResponse } from "../src/types/types";
//import { getPlanetList } from "../src/services/planet";
//import Pagination from "../src/components/pagination/Pagination";

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Imperial DB</title>
        <link rel="icon" type="image/svg+xml" href={favicon.src} />
      </Head>
      <ErrorBoundary>
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        {/* <Pagination /> */}
        {/* <DataManager itemsQuantity={itemsQuantity} /> */}
      </ErrorBoundary>
    </>
  );
}

export default Home;

/* export const getServerSideProps = wrapper.getServerSideProps(

  (store) => async (context) => {
    store.dispatch(getPlanetList.initiate('page'));

    return {
      props: {},
    };
  }
) */

/*   wrapper.dispatch(api.endpoints.getPokemonByName.initiate(name))

  const response = await fetch("https://swapi.dev/api/planets/");
  const data: PlanetResponse = await response.json();

  return {
      planetList: data.results,
      itemsQuantity: data.count,
  };
} */
