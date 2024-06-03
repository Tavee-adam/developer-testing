import { gql } from "@apollo/client";
export const GET_UNITS = gql`
  query Query(
    $minPrice: Float
    $minArea: Float
    $type: String
    $limit: Int
    $after: String
    $maxPrice: Float
    $maxArea: Float
    $bedroomCount: Int
  ) {
    fetchMoreUnits(
      minPrice: $minPrice
      minArea: $minArea
      type: $type
      limit: $limit
      after: $after
      maxPrice: $maxPrice
      maxArea: $maxArea
      bedroomCount: $bedroomCount
    ) {
      edges {
        cursor
        node {
          id
          type
          projectName
          shortTitle
          price
          bedroomCount
          area
          shortDescription
          image {
            id
            url
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_THING_BY_ID = gql`
  query Query($id: Int!) {
    unit(id: $id) {
      shortTitle
      shortDescription
      id
      type
      projectName
      price
      bedroomCount
      area
      image {
        id
        url
      }
    }
  }
`;
