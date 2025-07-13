import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
  useDocumentTitle,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes } from "react-router";

import { MuiInferencer } from "@refinedev/inferencer/mui";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import {dataProvider} from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import axios from "axios";
const client = axios.create({})
function App() {
  useDocumentTitle("Alianbot - 跨平台的聊天室機器人")
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider('https://api.fake-rest.refine.dev',client)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "FuXlxG-RM4Zvo-NuLnNA"
                }}
                resources={[{
                  name: "command",
                  list: "admin/command",
                  create: "admin/command/create",
                  edit: "admin/command/edit/:id",
                  show: "admin/command/show/:id"
                }, {
                  name: "post",
                  list: "admin/post",
                  create: "admin/post/create",
                  edit: "admin/post/edit/:id",
                  show: "admin/post/show/:id"
                }]}>
                <Routes>
                  <Route index element={<WelcomePage />} />
                  <Route path="admin">
                    <Route path="command" element={<MuiInferencer resource="command"/>} />
                    <Route path="post" element={<MuiInferencer resource="post" />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}
export default App;
