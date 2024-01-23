import { gql } from "@apollo/client";

export const GET_CATEGORIES_QUERY = gql`
  query GetCategoryAndGroupsInfo($id: String) {
    getCategoryAndGroupsInfo(_id: $id) {
      _id
      name
      icon {
        _id
        url
      }
      group {
        groupName
        articles {
          _id
          title
          description
        }
      }
    }
  }
`;
