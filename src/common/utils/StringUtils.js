export class StringUtils {
  static capitalize(value = "") {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}