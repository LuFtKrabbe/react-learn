export type DataPlanetResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DataPlanet[];
};

export type DataPlanet = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: Array<string>;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: Array<string>;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

export type GetPartPlanetData = (
  part: "firstHalf" | "secondHalf",
  data: DataPlanet[],
) => DataPlanet[];

export type DataCardProps = {
  key: string;
  itemProp: DataPlanet;
  itemNumProp: number;
  pageProp: number;
};

export type PaginationProps = {
  setPageMethod: (page: number) => void;
  setItemsPerPageMethod: (itemsPerPage: string) => void;
  pageProp: number;
  itemsPerPageProp: string;
  itemsQuantityProp: number;
};

export type TypeContext = {
  page: number;
  planetData: DataPlanet[];
  searchQuery: string;
  setSearchQueryCb: (searchQuery: string) => void;
};
