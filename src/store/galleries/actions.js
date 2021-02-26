import galleryService from "../../services/GalleryService";

export const actions = {
  async createGallery(store, formData) {
    const gallery = await galleryService.createGallery(formData);

    store.commit("createdGallery", gallery);
  },
};
