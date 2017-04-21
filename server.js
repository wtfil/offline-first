const express = require('express');
const path = require('path');
const githubOAuth = require('github-oauth')({
    githubClient: process.env.GITHUB_CLIENT,
    githubSecret: process.env.GITHUB_SECRET,
    baseURL: 'http://localhost:9002',
    loginURI: '/login',
    callbackURI: '/callback',
})

const app = express();
const port = process.env.PORT || 9002;
const env = process.env.NODE_ENV || 'development';

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
