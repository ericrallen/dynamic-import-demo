const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs';

const DEFAULT_CONFIG = {
  url: GIPHY_API_URL,
  apiKey: process.env.GIPHY_API_KEY,
  type: 'random',
  rating: 'PG',
  tag: '',
};

export default class GifService {
  constructor(config = {}) {
    this.config = Object.assign({}, DEFAULT_CONFIG, config);
  }

  buildRequestUrl() {
    const {
      url,
      type,
      apiKey,
      rating,
      tag,
    } = this.config;

    return `${url}/${type}?api_key=${apiKey}&rating=${rating}&tag=${tag}`;
  }

  async get(configOverrides = {}) {
    this.config = Object.assign({}, this.config, configOverrides);

    const url = this.buildRequestUrl();

    const image = await fetch(url).then(response => response.json());

    return image;
  }
}
