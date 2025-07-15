import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
