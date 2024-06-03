type QuerySingelUnit = {
  id: Number;
};

type UnitImage = {
  url: String;
  unitID?: Number;
};

type CreateSingelUnit = {
  type?: String;
  projectName?: String;
  shortTitle?: String;
  price?: Number;
  bedroomCount?: Number;
  area?: Number;
  shortDescription?: String;
  image?: [UnitImage];
};

type FetchMoreUnit = {
  limit: number;
  after: String;
};

type Units = {
  id?: string;
  type?: string;
  projectName?: string;
  shortTitle?: string;
  price?: number;
  bedroomCount?: number;
  area?: number;
  shortDescription?: string;
  image?: [UnitImage];
};

type PageInfo = {
  endCursor: string | null;
  hasNextPage: boolean;
};
type UnitsEdge = {
  cursor: string;
  node: Units;
};

type UnitsConnection = {
  edges: UnitsEdge[];
  pageInfo: PageInfo;
};

export type {
  QuerySingelUnit,
  CreateSingelUnit,
  UnitImage,
  FetchMoreUnit,
  Units,
  PageInfo,
  UnitsEdge,
  UnitsConnection,
};
