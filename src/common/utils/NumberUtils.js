/**
 * tabajar con numeros */


export class NumberUtils {
  //si no es valor numerico retorno a un fallback 0
  static toNumber(value, fallback = 0) {
    const number = Number(value);

    if (Number.isNaN(number)) return fallback;

    return number;
  }

  //retorno como moneda de GT 
  static formatCurrency(value, currency = "GTQ", locale = "es-GT") {
    const number = this.toNumber(value);

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(number);
  }

  // formatea un valor decimal como porcentaje.
  static formatPercent(value, decimals = 0) {
    const number = this.toNumber(value);

    return `${(number * 100).toFixed(decimals)}%`;
  }

  // redondea un numero a la cantidad de decimales indicada
  static round(value, decimals = 2) {
    const number = this.toNumber(value);

    return Number(number.toFixed(decimals));
  }
}