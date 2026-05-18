/**
 * src/common/utils/DateUtils.js
 * trabajar con fechas*/

export class DateUtils {
    //convertir una valor a una fecha valida
    static toDate(value){
        if (!value) return null;

        const date = value instanceof Date ? value: new Date(value);

        if (Number.isNaN(date.getTime())) return null;

        return date;
    }

    //si es valido o no para convertirse en fecha
    static isValid(date) {
        return this.toDate(date) !== null;
    }

    //formatear una fecha y retornarlo como texto
    static format(date, locale = "es-GT", options = {}){
        const validDate = this.toDate(date);

        if (!validDate) return "";

        return validDate.toLocaleDateString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            ...options,
        });
    }

    //convierto la fecha en un formato iso
    static toIso(date) {
        const validDate = this.toDate(date);

        if (!validDate) return "";

        return validDate.toISOString();
    }

    //valido si una fecha ocurre antes que la otra
    static isBefore(fechaA, fechaB){
        const firstDate = this.toDate(fechaA);
        const secondDate = this.toDate(fechaB);

        if(!firstDate || !secondDate) return false;

        return firstDate.getTime() < secondDate.getTime();
    }

    //valido si la fecha ocurre despues que la otra 
    static isAfter(fechaA, fechaB){
        const firstDate = this.toDate(fechaA);
        const secondDate = this.toDate(fechaB);

        if (!firstDate || !secondDate) return false;

        return firstDate.getTime() > secondDate.getTime();
    }

}