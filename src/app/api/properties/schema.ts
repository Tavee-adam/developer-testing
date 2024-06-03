import { gql } from "apollo-server-micro";
import { query, connection } from "@/config/db/connection";
import { RowDataPacket } from "mysql2/promise";
import {
  QuerySingelUnit,
  CreateSingelUnit,
  UnitImage,
  FetchMoreUnit,
} from "./model/types";
export const typeDefs = gql`
  type UnitImage {
    id: Int!
    unitId: Int!
    url: String!
  }

  input newUnitIMage {
    url: String!
  }

  type Unit {
    id: Int!
    type: String!
    projectName: String!
    shortTitle: String!
    price: Int!
    bedroomCount: Int!
    area: Int!
    shortDescription: String!
    image: [UnitImage!]!
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  type UnitEdge {
    cursor: String
    node: Unit
  }

  type UnitConnection {
    edges: [UnitEdge]
    pageInfo: PageInfo
  }

  type Query {
    units: [Unit]
    unit(id: Int!): [Unit]
    fetchMoreUnits(
      limit: Int
      after: String
      type: String
      minPrice: Float
      maxPrice: Float
      minArea: Float
      maxArea: Float
      bedroomCount: Int
    ): UnitConnection
  }

  type Mutation {
    createUnit(
      id: Int
      type: String!
      projectName: String!
      shortTitle: String!
      price: Int!
      bedroomCount: Int!
      area: Int!
      shortDescription: String!
      image: [newUnitIMage]
    ): Unit
  }
`;

// Define your resolvers
export const resolvers = {
  Query: {
    units: async () => {
      try {
        const values: any = [];

        const queryText =
          "SELECT unit.id,unit.type,unit.projectName,unit.shortTitle,unit.price,unit.bedroomCount,unit.area,unit.shortDescription,image.id AS imageId , image.url AS imageUrl FROM `units` unit LEFT JOIN `unit_images` image ON unit.id = image.unit_id Order By id , imageId;";
        // const data = await query({ queryText, values });

        const connecting = await connection();

        const [data]: [RowDataPacket[], any] = await connecting.execute(
          queryText,
          values
        );
        connecting.end();
        const unitMap = new Map<number, any>();
        data.forEach((row) => {
          console.log("<<<< 68", row);
          const unitId = row.id;
          if (!unitMap.has(unitId)) {
            unitMap.set(unitId, {
              id: row.id,
              type: row.type,
              projectName: row.projectName,
              shortTitle: row.shortTitle,
              price: row.price,
              bedroomCount: row.bedroomCount,
              area: row.area,
              shortDescription: row.shortDescription,
              image: [],
            });
          }

          if (row.imageId) {
            unitMap.get(unitId).image.push({
              id: row.imageId,
              url: row.imageUrl,
            });
          }
        });

        return Array.from(unitMap.values());
      } catch (error) {
        console.log("<<<< 75");
      }
    },
    unit: async (parent: any, arg: QuerySingelUnit, context: any) => {
      try {
        const values: any = [arg.id];
        const queryText =
          "SELECT unit.id,unit.type,unit.projectName,unit.shortTitle,unit.price,unit.bedroomCount,unit.area,unit.shortDescription,image.id AS imageId , image.url AS imageUrl FROM `units` unit LEFT JOIN `unit_images` image ON unit.id = image.unit_id WHERE unit.id = ? Order BY unit.id ASC ,  image.id ASC";

        const connecting = await connection();

        const [data]: [RowDataPacket[], any] = await connecting.query(
          queryText,
          values
        );
        connecting.end();
        const unitMap = new Map<number, any>();
        data.forEach((row) => {
          console.log("<<<< 68", row);
          const unitId = row.id;
          if (!unitMap.has(unitId)) {
            unitMap.set(unitId, {
              id: row.id,
              type: row.type,
              projectName: row.projectName,
              shortTitle: row.shortTitle,
              price: row.price,
              bedroomCount: row.bedroomCount,
              area: row.area,
              shortDescription: row.shortDescription,
              image: [],
            });
          }

          if (row.imageId) {
            unitMap.get(unitId).image.push({
              id: row.imageId,
              url: row.imageUrl,
            });
          }
        });
        console.log("<<< 88", data);
        return Array.from(unitMap.values());
      } catch (error) {
        console.log("<<<< 91", error);
      }
    },
    fetchMoreUnits: async (
      parent: any,
      {
        limit,
        after,
        type,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        bedroomCount,
      }: {
        limit: number;
        after: string;
        type?: string;
        minPrice?: number;
        maxPrice?: number;
        minArea?: number;
        maxArea?: number;
        bedroomCount?: number;
      },
      context: any
    ) => {
      try {
        const afterIndex = after
          ? Buffer.from(after, "base64").toString("ascii")
          : null;
        const values = afterIndex ? [afterIndex, limit + 1] : [limit + 1]; // +1 to check if there's a next page

        // const queryText = `SELECT unit.id,unit.type,unit.projectName,unit.shortTitle,unit.price,unit.bedroomCount,unit.area,unit.shortDescription,image.id AS imageId , image.url AS imageUrl FROM units unit LEFT JOIN unit_images image ON unit.id = image.unit_id ${
        //   afterIndex ? `WHERE unit.id  > ?` : ""
        // } Order By id , imageId;`;
        let queryText = `SELECT unit.id AS id, unit.type AS type, unit.projectName AS projectName , unit.shortTitle AS shortTitle,unit.price AS price,unit.bedroomCount AS bedroomCount,unit.area AS area ,unit.shortDescription AS shortDescription,image.id AS imageId , image.url AS imageUrl FROM units unit LEFT JOIN unit_images image ON unit.id = image.unit_id`;
        const queryParams: (number | string)[] = [];
        const conditions: string[] = [];

        if (type !== undefined && type !== null) {
          conditions.push("type = ?");
          queryParams.push(type);
        }
        if (minPrice !== undefined && minPrice !== null) {
          console.log(minPrice);
          conditions.push("price >= ?");
          queryParams.push(minPrice);
        }
        if (maxPrice !== undefined && maxPrice !== null) {
          conditions.push("price <= ?");
          queryParams.push(maxPrice);
        }
        if (minArea !== undefined && minArea !== null) {
          conditions.push("area >= ?");
          queryParams.push(minArea);
        }
        if (maxArea !== undefined && maxArea !== null) {
          conditions.push("area <= ?");
          queryParams.push(maxArea);
        }
        if (bedroomCount !== undefined && bedroomCount !== null) {
          conditions.push("bedroomCount = ?");
          queryParams.push(bedroomCount);
        }
        if (afterIndex) {
          conditions.push("id > ?");
          queryParams.push(afterIndex);
        }

        if (conditions.length > 0) {
          queryText += ` WHERE ${conditions.join(" AND ")}`;
        }

        queryText += " ORDER By id ASC , imageId ASC LIMIT ?";

        queryParams.push(limit + 1); // +1 to check if there's a next page
        console.log("<<<< 200", queryText, queryParams);
        // const data = await query({ queryText, values });

        const connecting = await connection();

        const [rows]: [RowDataPacket[], any] = await connecting.query(
          queryText,
          queryParams
        );
        console.log("<<<<< 220", rows.length);

        connecting.end();
        const unitMap = new Map<number, any>();
        rows.forEach((row) => {
          // console.log("<<<< 68", row);
          const unitId = row.id;
          if (!unitMap.has(unitId)) {
            unitMap.set(unitId, {
              id: row.id,
              type: row.type,
              projectName: row.projectName,
              shortTitle: row.shortTitle,
              price: row.price,
              bedroomCount: row.bedroomCount,
              area: row.area,
              shortDescription: row.shortDescription,
              image: [],
            });
          }

          if (row.imageId) {
            unitMap.get(unitId).image.push({
              id: row.imageId,
              url: row.imageUrl,
            });
          }
        });

        const newEdge = Array.from(unitMap.values());

        console.log(newEdge.length);

        const edges = newEdge.slice(0, limit).map((row: any) => ({
          cursor: Buffer.from(row.id.toString()).toString("base64"),
          node: row,
        }));

        const hasNextPage = rows.length > limit;
        const endCursor =
          edges.length > 0 ? edges[edges.length - 1].cursor : null;

        // console.log("<<<< 149", rows);

        return {
          edges,
          pageInfo: {
            endCursor,
            hasNextPage,
          },
        };
      } catch (error) {
        console.log("<<<< 269 error :", error);
      }
    },
  },
  Mutation: {
    createUnit: async (parent: any, input: CreateSingelUnit, context: any) => {
      try {
        const {
          type,
          projectName,
          shortTitle,
          price,
          bedroomCount,
          area,
          shortDescription,
          image,
        } = input;
        // mockThing.push(newy);
        const values: any = [
          type,
          projectName,
          shortTitle,
          price,
          bedroomCount,
          area,
          shortDescription,
        ];

        const queryText =
          "INSERT INTO `units` (type,projectName,shortTitle,price,bedroomCount,area,shortDescription) VALUES (?,?,?,?,?,?,?)";
        const newUnitId = await query({ queryText, values });
        // const unitId = res?.data.id;
        console.log("<<<103", newUnitId);

        image?.map(async (item) => {
          console.log();
          const values: any = [item.url, newUnitId];
          const queryText =
            "INSERT INTO `unit_images` (url , unit_id) VALUES (?,?)";
          const res = await query({ queryText, values });
        });

        return input;
      } catch (error) {
        return "error";
      }
    },
  },
};
