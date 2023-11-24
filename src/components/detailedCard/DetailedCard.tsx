import styles from "./DetailedCard.module.css";

import { setLoadingPlanetDetails } from "../../services/loadingFlagsSlice";
import { useAppDispatch } from "../../app/hooks";

import { useGetPlanetByIdQuery } from "../../services/planet";
import { useEffect } from "react";

function DetailedCard(): JSX.Element {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetPlanetByIdQuery(``);

  useEffect(() => {
    dispatch(setLoadingPlanetDetails(isLoading));
  }, [isLoading, dispatch]);

  if (error) {
    throw new Error("Can't load data for DetailedCard");
  }

  return (
    <>
      <div className={styles.detailedCard}>
        <div role="detailedCardCurtain" className={styles.curtain}></div>
        <div className={styles.panel} role="detailedCardPanel">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : data ? (
            <div className={styles.nameListContainer}>
              <h1 className={styles.name}>{data.name}</h1>
              <div className={styles.list}>
                <div>Rotation period: {data.rotation_period}</div>
                <div>Orbital Period: {data.orbital_period}</div>
                <div>Diameter: {data.diameter}</div>
                <div>Climate: {data.climate}</div>
                <div>Gravity: {data.gravity}</div>
                <div>Terrain: {data.terrain}</div>
                <div>Surface water: {data.surface_water}</div>
                <div>Population: {data.population}</div>
              </div>
            </div>
          ) : null}
          <button className={styles.closeButton}>CLOSE</button>
        </div>
      </div>
    </>
  );
}

export default DetailedCard;
