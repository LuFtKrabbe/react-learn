import { useEffect, useState, createContext } from "react";

import SearchString from "../searchString/SearchString";
import CardList from "../cardList/CardList";
import ErrorButton from "../errorButton/ErrorButton";
import Pagination from "../pagination/Pagination";
import { useNavigate, Outlet } from "react-router-dom";
import {
  PlanetParams,
  PartPlanetListFunc,
  ContextProps,
} from "../../types/types";
import { fetchPlanetList, isOdd } from "../../utils/utils";

import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setPage } from "../pagination/paginationSlice";

export const DataManagerContext = createContext<Partial<ContextProps>>({});

function DataManager() {
  const DEFAULT_ITEMS_QUANTITY = 0;
  const DEFAULT_ITEMS_PER_PAGE = 10;

  const page = useAppSelector((state: RootState) => state.pagination.page);
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pagination.itemsPerPage,
  );
  const dispatch = useAppDispatch();

  const lastSearchQuery = localStorage.getItem("lastSearchQuery") || "";
  const [searchQuery, setSearchQuery] = useState(lastSearchQuery);
  const [itemsQuantity, setItemsQuantity] = useState<number>(
    DEFAULT_ITEMS_QUANTITY,
  );
  const [planetList, setPlanetList] = useState<PlanetParams[]>();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const navigate = useNavigate();

  const goToFirstPage = () => {
    dispatch(setPage(1));
    navigate(`?page=1`);
  };

  const setSearchQueryCb = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    goToFirstPage();
  };

  const PartPlanetListFunc: PartPlanetListFunc = (part, data) => {
    const totalItems = 10;
    return part === "firstHalf"
      ? data.filter((_, i) => i < totalItems / 2)
      : data.filter((_, i) => i >= totalItems / 2);
  };

  useEffect(() => {
    const pageServer =
      itemsPerPage === DEFAULT_ITEMS_PER_PAGE ? page : Math.ceil(page / 2);
    const query = `?search=${searchQuery
      .trim()
      .toLowerCase()}&page=${pageServer}`;
    setIsDataLoading(true);
    fetchPlanetList(`${query}`)
      .then((data) => {
        const planetList = data.results;
        const part = isOdd(page) ? "firstHalf" : "secondHalf";
        const partPlanetList = PartPlanetListFunc(part, planetList);
        setPlanetList(
          itemsPerPage === DEFAULT_ITEMS_PER_PAGE ? planetList : partPlanetList,
        );
        setItemsQuantity(data.count);
      })
      .catch(() => {
        console.log("Can't load planets data from API");
      })
      .finally(() => setIsDataLoading(false));
  }, [searchQuery, page, itemsPerPage]);

  return (
    <>
      <DataManagerContext.Provider
        value={{ planetList, searchQuery, setSearchQueryCb }}
      >
        <h1>IMPERIAL PLANETARY DATABASE</h1>
        <SearchString />
        <ErrorButton />
        <Pagination itemsQuantityProp={itemsQuantity} />
        {isDataLoading ? <h1>Loading...</h1> : <CardList />}
      </DataManagerContext.Provider>
      <Outlet />
    </>
  );
}

export default DataManager;
