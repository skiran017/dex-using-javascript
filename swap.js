// connect to Moralis server
const serverUrl = 'https://dn5bjihap2sq.usemoralis.com:2053/server';
const appId = '73nde6cslbAJ2kr8WsP6WiLN8n4fb4fCIqDnwP3g';
Moralis.start({ serverUrl, appId });

// Metamask Login
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  console.log('logged in user:', user);
}

async function logOut() {
  await Moralis.User.logOut();
  console.log('logged out');
}

document.getElementById('btn-login').addEventListener('click', login);
document.getElementById('btn-logout').addEventListener('click', logOut);

async function getTop10Tokens() {
  const response = await fetch('https://api.coinpaprika.com/v1/coins');
  const tokens = await response.json();

  return tokens
    .filter((token) => token.rank >= 1 && token.rank <= 30)
    .map((token) => token.symbol);
}

async function getTickerData(tickerList) {
  const response = await fetch('https://api.1inch.exchange/v3.0/137/tokens');
  const tokens = await response.json();
  const tokenList = Object.values(tokens.tokens);

  return tokenList.filter((token) => tickerList.includes(token.symbol));
}

getTop10Tokens().then(getTickerData).then(console.log);
