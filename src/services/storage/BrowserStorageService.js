/**
 * manejar cualquier storage
 */

//trabajamos en clase dijo el inge

import { config } from "../../config";

export class BrowserStorageService {
    constructor(storage, prefix = config.appStoragePrefix || "app"){
        if(!storage){
            throw new Error("BrowserStorageService dice: falta local storage o sessionStorage");
        }

        this.storage = storage;
        this.prefix = prefix;
    }

    buildKey(key){
        return `${this.prefix}:${key}`
    }

    set(key, value){
        try {
            const storageKey = this.buildKey(key);
            const serializedValue = JSON.stringify(value);

            this.storage.setItem(storageKey, serializedValue);

            return true;
        } catch (error){
            console.error("no se pudo guardar el storage", error);
            return false;
        }
    }

    get(key, fallback = null){
        try {
            const storageKey = this.buildKey(key);
            const value = this.storage.getItem(storageKey);

            if( value === null ){
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {
            console.error("Error cuando se lee el storage: ", error);
            return fallback;
        }
    }

    remove(key){
        try {
            const storagekey = this.buildKey(key);

            this.storage.removeItem(storagekey);

            return true;
        } catch (error) {
            console.log("Error al eliminar del storage:", error);
            return false;
        }
    }

    clearAppData(){
        try {
            const keysToRemove = [];

            for ( let i = 0; i < this.storage.length; i++ ){
                const key = this.storage.key(i);

                if(key && key.startsWith(`${this.prefix}:`)){
                    keysToRemove.push(key);
                }
            }

            keysToRemove.forEach((key) => {
                this.storage.removeItem(key);
            });

            return true
        } catch (error) {
            console.error("eror cuando se limpia datos en la app: ", error);
            return false;
        }
    }

}