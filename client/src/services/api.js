// fichier qui centralise tous les appels à l'API
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // plus besoin de l'URL complète grâce au proxy
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