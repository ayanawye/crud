"use client"
import { store } from "@/store/store";
import { FC } from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;