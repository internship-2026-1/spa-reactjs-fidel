/**trabjar con enrutamientos */

export class UrlUtils {
  // Construye un query string válido a partir de un objeto de parámetros.
  static buildQuery(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, value);
      }
    });

    return query.toString();
  }

  // Convierte un query string en un objeto.
  static parseQuery(search = "") {
    const cleanSearch = search.startsWith("?") ? search.slice(1) : search;
    const query = new URLSearchParams(cleanSearch);
    const params = {};

    query.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  }

  // Une una URL base con un path evitando dobles slashes accidentales.
  static join(base = "", path = "") {
    const cleanBase = String(base).replace(/\/+$/, "");
    const cleanPath = String(path).replace(/^\/+/, "");

    if (!cleanBase) return cleanPath;
    if (!cleanPath) return cleanBase;

    return `${cleanBase}/${cleanPath}`;
  }

  // Agrega query params a una URL conservando la base correctamente.
  static withQuery(url = "", params = {}) {
    const query = this.buildQuery(params);

    if (!query) return url;

    const separator = url.includes("?") ? "&" : "?";

    return `${url}${separator}${query}`;
  }
}