import { gql } from "@apollo/client";

export const ADD_FEEDBACK = gql`
  mutation AddFeedBack(
    $firstName: String!
    $lastName: String!
    $email: String!
    $number: String!
    $type: String!
    $desc: String!
  ) {
    addFeedBack(
      firstName: $firstName
      lastName: $lastName
      email: $email
      number: $number
      type: $type
      desc: $desc
    ) {
      code
      status
    }
  }
`;
