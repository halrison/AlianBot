import { GitHubBanner, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(API_URL)}
                routerProvider={routerProvider}
                resources={[{
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    edit: "/posts/edit/:id",
                    show: "/posts/show/:id",
                }, {
                    name: "vote",
                    list: "/vote",
                    create: "/vote/create",
                    edit: "/vote/edit/:id",
                    show: "/vote/show/:id"
                }, {
                    name: "votes",
                    list: "/votes",
                    create: "/votes/create",
                    edit: "/votes/edit/:id",
                    show: "/votes/show/:id"
                }, {
                    name: "command",
                    list: "/command",
                    create: "/command/create",
                    edit: "/command/edit/:id",
                    show: "/command/show/:id"
                }, {
                    name: "post",
                    list: "/post",
                    create: "/post/create",
                    edit: "/post/edit/:id",
                    show: "/post/show/:id"
                }, {
                    name: "post",
                    list: "/post",
                    create: "/post/create",
                    edit: "/post/edit/:id",
                    show: "/post/show/:id"
                }]}
                notificationProvider={notificationProvider}
                options={{
                    warnWhenUnsavedChanges: true,
                    syncWithLocation: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={<NavigateToResource resource="posts" />}
                        />

                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="create" element={<PostCreate />} />
                            <Route path="edit/:id" element={<PostEdit />} />
                            <Route path="show/:id" element={<PostShow />} />
                        </Route>

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
