const express = require('express');
const path = require('path');
const authFactory = require('github-oauth');

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 9002;
const githubOAuth = authFactory({
  githubClient: process.env.GITHUB_CLIENT,
  githubSecret: process.env.GITHUB_SECRET,
  baseURL: env === 'development' ?
    'http://localhost:9002' :
    'https://offlinefirst.herokuapp.com',
  loginURI: '/login',
  callbackURI: '/callback',
})

if (env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.config');
  const compiller = webpack(config);
  app.use(webpackDevMiddleware(compiller, {noInfo: true}))
}
app.get('/login', githubOAuth.login);
app.get('/callback', githubOAuth.callback);

githubOAuth.on('token', function(token, res) {
  res.redirect('/save-token?token=' + token.access_token)
})

app.use(express.static('public'))
app.use(express.static('build'))
app.use((req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => {
  console.log('NODE_ENV=%s', env);
  console.log('app started at http://127.0.0.1:%s', port);
});
