/**
 * TRABAJAR CON TEXTOS
 * src/common/utils/StringUtils.js
 * 
 * */


export class StringUtils {
  //devuelve un valor seguro en string
  static toSafeString(value = "") {
    if (value === null || value === undefined) return "";
    return String(value);
  }

  //normaliza espacio de una cadena
  static normalizeSpaces(value=''){
    const texto = this.toSafeString(value);

    return texto.trim().replace(/\s+/g, " ");
  }
  
  //convertir la primera letra en mayus
  static capitalize(value = "") {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  //convierte las primeras letras en mayus de una cadena
  static toTitleCase(value=''){
    const texto = this.normalizeSpaces(value);

    if(!texto) return '';

    return texto
      .split(" ")
      .map((word) => this.capitalize(word))
      .join(" ");
  }

  //devuelve una cantidad de caracteres mas un sufijo de ...
  static truncate(value = '', max = 50, suffix = '...'){
    const texto = this.toSafeString(value);

    if (!texto) return "";

    if (texto.length <= max) return texto;

    return texto.slice(0, max) + suffix;
  }
}