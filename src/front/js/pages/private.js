import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);


    return (
        <>
        {store.token && store.token != "" && store.token != undefined ? (
                <div>
                    Hola estas dentro
                </div>
            ) : (
                <div className="center">
                    <h2 className="must-be-loggued">Debes estar logueado para acceder a esta página</h2>
                </div>
            )
        }
        </>
    );
};