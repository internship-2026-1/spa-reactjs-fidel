/**
 * trabajar con validaciones */

export class ValidationUtils {
  // Convierte cualquier valor a string seguro para validar sin errores.
  static toSafeString(value = "") {
    if (value === null || value === undefined) return "";
    return String(value).trim();
  }

  // Valida que el valor no este vacio, null, undefined o solo con espacios.
  static isRequired(value) {
    const text = this.toSafeString(value);

    return text.length > 0;
  }

  // Valida si el valor tiene formato básico de email.
  static isEmail(value) {
    const text = this.toSafeString(value);

    if (!text) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(text);
  }

  // Valida que el texto tenga como mínimo la cantidad de caracteres indicada.
  static minLength(value, min) {
    const text = this.toSafeString(value);

    return text.length >= min;
  }

  // Valida que el texto no supere la cantidad máxima de caracteres indicada.
  static maxLength(value, max) {
    const text = this.toSafeString(value);

    return text.length <= max;
  }

  // Valida si el valor parece ser un número de teléfono válido.
  static isPhone(value) {
    const text = this.toSafeString(value);

    if (!text) return false;

    const phoneRegex = /^[0-9+\-\s()]{8,20}$/;

    return phoneRegex.test(text);
  }
}