import http from "./BaseService";

class GalleryService {
  async createGallery(formData) {
    const { data } = await http.post("create-gallery", formData);
    return data;
  }
}

const galleryService = new GalleryService();
export default galleryService;
