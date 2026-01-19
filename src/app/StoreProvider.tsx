"use client"
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store";
import { useRef } from "react";

function StoreProvider({ children }: { children: React.ReactNode }) {

    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;