import { gql } from "@apollo/client";

export const GET_ARTICLE = gql`
  query GetCategories($id: String) {
    getArticles(_id: $id) {
      _id
      version {
        _id
        version
        articles
      }
      category {
        _id
        name
      }
      group {
        _id
        categoryId
        name
      }
      title
      description
      content
      visits
    }
  }
`;
