/**
 * Lado de integrador de odoo
 */

import { useState } from "react";
import { Button, Text} from "lib-components-react";
import { apiService } from "../../../services";
import { config } from "../../../config";

import './integration.css';
import '../adminPrivate.css';

//sincroniza productos de odo => bd mongo
const syncURLENDPOINT = "apps/products/internal/sync-odoo-products/"

export default function Integration() {

    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [message, setMessage] = useState("");

    const handleSync = async() => {
        setStatus("loading");
        setMessage("");
        
        try {
            const response = await apiService.post(`${config.appURLcore}${syncURLENDPOINT}`, {});
            setStatus("success");
            setMessage(response.message ?? "Integracion completada correctamente");
        } catch (error) {
            setStatus("error");
            setMessage(error?.message ?? "No se pudo conectar con el servidor.");
        }
    };

    return (
        <section className="admin-module" aria-labelledby="integration-title">
            {/**header */}
            <header className="admin-module__header">
                <div className="admin-module__titles">
                    <p className="admin-module__eyebrow">Administración</p>
                    <h1 id="integration-title" className="admin-module__title">Integración</h1>
                </div>
            </header>

            {/** */}
            <div className="integration-card">
                <div className="integration-card__info">
                    <h2 className="integration-card__name">
                        Sincronización de productos
                    </h2>
                    <p className="integration-card__desc">
                        
                          Ejecuta la sincronización de productos contra el backend. El proceso importa o actualiza el catálogo
                          completo de productos desde la fuente de datos configurada.
                        
                    </p>
                    <p className="integration-card__endpoint">
                        <span>
                           Endpoint
                        </span>
                        <code>{syncURLENDPOINT}</code>
                    </p>
                </div>

                <div className="integration-card__action">
                    <Button
                    variant="primary"
                    iconName="Bolt"
                    onClick={handleSync}
                    disabled={status === "loading"}
                    >
                        {status === "loading" ? "Sincronizando..." : "Ejecutar sincronizacion"}
                    </Button>
                </div>

                {status !== "idle" && (
                    <div className={`integration-result integration-result--${status}`}>
                        {status === "loading" && <span className="integration-result__spinner"/>}
                        <p className="integration-result__msg">
                            {status === "loading" ? "Conectando con el servidor…" : message}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}