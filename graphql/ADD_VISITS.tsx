import { gql } from "@apollo/client";

export const ADD_VISITS = gql`
  mutation AddVisits($articleId: String!) {
    addVisits(articleId: $articleId) {
      code
      status
    }
  }
`;
