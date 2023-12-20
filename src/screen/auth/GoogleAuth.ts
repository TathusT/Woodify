import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

let instance: AxiosInstance;

export function getOAuthInstance(config?: CreateAxiosDefaults) {
  if (!instance) createInstance(config);
  return instance;
}

export function createInstance(config?: CreateAxiosDefaults) {
  instance = axios.create({
    baseURL: "https://www.googleapis.com/",
    ...config,
  });
}