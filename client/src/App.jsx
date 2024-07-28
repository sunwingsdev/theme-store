import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import { ToastProvider } from "react-toast-notifications";
import { PrimeReactProvider } from "primereact/api";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <Provider store={Store}>
          <ToastProvider>
            <RouterProvider router={Router} />
          </ToastProvider>
        </Provider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
