// fichier qui centralise tous les appels à l'API
import axios from 'axios';

// L'URL de base de l'API — on la met dans une variable
// pour pouvoir la changer facilement en production
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// ── Catégories ────────────────────────────────────────────
export const getCategories = () =>
  api.get('/categories').then(res => res.data);

// ── Artisans ──────────────────────────────────────────────
export const getTopArtisans = () =>
  api.get('/artisans/top').then(res => res.data);

export const getArtisans = (params = {}) =>
  api.get('/artisans', { params }).then(res => res.data);

export const getArtisanById = (id) =>
  api.get(`/artisans/${id}`).then(res => res.data);