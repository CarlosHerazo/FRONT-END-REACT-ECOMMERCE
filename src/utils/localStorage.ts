/**
 * localStorage Helper Functions
 * Handles safe reading/writing to browser's localStorage with error handling
 */

/**
 * Safely save data to localStorage
 * @param key - The key to store data under
 * @param value - The value to store (will be JSON stringified)
 * @returns boolean - true if successful, false otherwise
 */
export function saveToLocalStorage<T>(key: string, value: T): boolean {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Safely load data from localStorage
 * @param key - The key to retrieve data from
 * @returns The parsed value, or null if not found or error
 */
export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error loading from localStorage (key: ${key}):`, error);
    return null;
  }
}

/**
 * Remove an item from localStorage
 * @param key - The key to remove
 * @returns boolean - true if successful, false otherwise
 */
export function removeFromLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Clear all data from localStorage
 * @returns boolean - true if successful, false otherwise
 */
export function clearLocalStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns boolean - true if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
