export class StorageService {
  static hasItem(key) {
    return localStorage.getItem(key) !== null;
  }
  static getItem(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  static setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  static removeItem(key) {
    localStorage.removeItem(key);
  }
  static clear() {
    localStorage.clear();
  }
}
