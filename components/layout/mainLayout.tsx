"use client";
import { Box } from "@/components";
import Navbar from "./navbar";
import Footer from "./footer";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://tooto-support-backend.vercel.app/api/graphql",
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="no-scrollbar relative">
      <ApolloProvider client={client}>
        <Box className="w-full min-h-full h-fit flex-col">
          <Navbar />
          <Box className="flex-grow">{children}</Box>
          <Footer />
        </Box>
      </ApolloProvider>
    </body>
  );
};
export default MainLayout;
