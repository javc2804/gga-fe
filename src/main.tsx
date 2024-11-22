import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import Routes from "./routes/index.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
    // </React.StrictMode>
  );
}
