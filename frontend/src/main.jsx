import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import { SnackbarProvider } from "notistack";
import ScrollToTop from "./utils/scrollToTop.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    <ScrollToTop />
        <SnackbarProvider>
            <Header />
            <App />
        </SnackbarProvider>
    </BrowserRouter>
);
