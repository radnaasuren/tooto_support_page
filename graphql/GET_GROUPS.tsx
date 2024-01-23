import { gql } from "@apollo/client";

export const GET_GROUPS_QUERY = gql`
  query GetGroups($categoryId: String!) {
    getGroups(categoryId: $categoryId) {
      _id
      categoryId
      name
    }
  }
`;
