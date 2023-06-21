import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <Router>
              <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                <Redirect from="/" to="/auth" />
              </Switch>
            </Router>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
