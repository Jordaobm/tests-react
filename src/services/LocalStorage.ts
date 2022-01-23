export function getLocalStorage(key: string, defaultValue: any) {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return defaultValue;
}

export function setLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}
