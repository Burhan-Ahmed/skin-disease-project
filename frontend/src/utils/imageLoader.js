// utils/imageLoader.js
const images = require.context('../assets', false, /\.(png|jpe?g|svg)$/);

export const getImage = (name) => images(`./${name}`);
