module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // ou votre preset React Native
    plugins: ['nativewind/babel'],
  };
};