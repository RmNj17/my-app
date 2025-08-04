import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "@ant-design/v5-patch-for-react-19";
import { message } from "antd";
import "./index.css";
import "./i18n";

message.config({
  top: 0,
  duration: 2,
  maxCount: 1,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
