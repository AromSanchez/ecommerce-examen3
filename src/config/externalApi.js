const axios = require("axios");

const getRandomImageUrl = async () => {
  try {
    const seed = Date.now();
    const width = 640;
    const height = 480;

    const response = await axios.head(
      `https://picsum.photos/seed/${seed}/${width}/${height}`,
      { maxRedirects: 5, timeout: 5000 }
    );

    const finalUrl = response.request?.res?.responseUrl || response.config.url;
    return finalUrl;
  } catch (error) {
    console.warn("⚠️  No se pudo obtener imagen de Picsum, usando fallback:", error.message);
    // Fallback: URL directa de picsum con seed numérico
    const seed = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${seed}/640/480`;
  }
};


const getFakeStoreProduct = async () => {
  try {
    const randomId = Math.floor(Math.random() * 20) + 1;
    const response = await axios.get(
      `https://fakestoreapi.com/products/${randomId}`,
      { timeout: 5000 }
    );
    return response.data;
  } catch (error) {
    console.warn("⚠️  FakeStoreAPI no disponible:", error.message);
    return null;
  }
};

module.exports = { getRandomImageUrl, getFakeStoreProduct };
