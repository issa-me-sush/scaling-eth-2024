/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { formatUnits ,formatEther} from 'viem'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/:hash', async (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  const { hash } = c.req.param();
  const response = await fetch(`explorer-api-testnet.morphl2.io/api/v2/transactions/${hash}`);
  const trx = await response.json()
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #6ec007, #6ec007)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'black',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!! ${trx.hash}` : ''}`
            : 'Welcome!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas" >Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})
app.frame('/trx/morph/:hash', async (c) => {
  const { hash } = c.req.param();

  // Fetch transaction details using the provided hash
  const response = await fetch(`https://explorer-api-testnet.morphl2.io/api/v2/transactions/${hash}`);
console.log("hash",hash)
  if (!response.ok) {
    // Return an error message or image
    return c.res({
      image: 'https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182289.jpg?w=1380&t=st=1712820858~exp=1712821458~hmac=a40ebfce8a9435e8d31e1e5c4d75c2209ec87c53f7deadd8c42e84b0a8c17c96',
    });
  }
  const transaction = await response.json();
  console.log(transaction)
  
  
  return c.res({
    image: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'linear-gradient(to right, #6ec007, #6ec007)', backgroundSize: '100% 100%' }}>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Hash: {transaction.hash}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Status: {transaction.status}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Block: {transaction.block}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>From: {transaction.from.hash}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>To: {transaction.to.hash}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Fee: {transaction.fee.value} wei</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Method: {transaction.method?transaction.method:"not available"}</div>
      {transaction.value && <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Value: {transaction.value} wei</div>}
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Confirmations: {transaction.confirmations}</div>
  
    </div>
    ),
    intents: [
      <Button.Link href= {` https://explorer-testnet.morphl2.io/tx/${hash}`} >Explorer</Button.Link>,

      
    ],
   
  });
});

app.frame('/account/morph/:address', async (c) => {
  const { address } = c.req.param();

  // Fetch Ethereum balance and transaction counts (using placeholder URLs)
  const balanceResponse = await fetch(`https://explorer-api-testnet.morphl2.io/api?module=account&action=balance&address=${address}`);
  
  console.log("balance response fetched")
  const txResponse = await fetch(`https://explorer-api-testnet.morphl2.io/api?module=account&action=txlist&address=${address}`);
  const tokenTxResponse = await fetch(`https://explorer-api-testnet.morphl2.io/api?module=account&action=tokentx&address=${address}`);
  // const tokenNFTTxResponse = await fetch(`https://explorer-api-testnet.morphl2.io/api?module=account&action=tokennfttx&address=${address}`);

  // Parse the responses
  const balanceData = await balanceResponse.json();
  console.log("balance data",balanceData)
  const txData = await txResponse.json();
  console.log("trx data",txData)
  const tokenTxData = await tokenTxResponse.json();
  console.log("token trx data",tokenTxData)
  // const tokenNFTTxData = await tokenNFTTxResponse.json();
console.log("all fetched")
  // Compute data
  const ethBalance = balanceData.result || '0';
  // const txCount = txData.result.length || 0;
  // const tokenTransferCount = tokenTxData.result.length || 0;
  // const erc721Count = tokenNFTTxData.result.length || 0;

  return c.res({
    image: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'linear-gradient(to right, #6ec007, #6ec007)',
        backgroundSize: '100% 100%',
      }}>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {`mETH Balance: ${formatEther(ethBalance)}`}
        </div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {/* {`Total Transactions: ${txCount}`} */}
        </div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {/* {`Token Transfers: ${tokenTransferCount}`} */}
        </div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {/* {`ERC-721 Transfers: ${erc721Count}`} */}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://explorer-testnet.morphl2.io/address/${address}`}>Explorer</Button.Link>,
      <Button action={`/account/morph/${address}/otherTokens`}>Other Token Balances</Button>,
    ],
  });
});

app.frame('/account/morph/:address/otherTokens', async (c) => {
  const { address } = c.req.param();

  // Fetch top 5 tokens
  const tokenListResponse = await fetch(`https://explorer-api-testnet.morphl2.io/api?module=account&action=tokenlist&address=${address}`);
  const tokenListData = await tokenListResponse.json();
  const topTokens = tokenListData.result.slice(0, 10);

  return c.res({
    image: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'linear-gradient(to right, #6ec007, #6ec007)',
        backgroundSize: '100% 100%',
      }}>
        {/* @ts-ignore  */}
        {topTokens.map((token, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}>
            {`${token.name} (${token.symbol}): ${
  token.type === 'ERC-20' ? formatUnits(token.balance, token.decimals) : token.balance
}`}
          </div>
        ))}
      </div>
    ),
    intents:[
      <Button action={`/account/${address}`}>Back</Button>,
]
  });
});

app.frame('/trx/arb/:hash', async (c) => {
  const { hash } = c.req.param();

  // Fetch transaction details using the provided hash
  const response = await fetch(`https://api-nova.arbiscan.io/api/transactions/${hash}`);
console.log("hash",hash)
  if (!response.ok) {
    // Return an error message or image
    return c.res({
      image: 'https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182289.jpg?w=1380&t=st=1712820858~exp=1712821458~hmac=a40ebfce8a9435e8d31e1e5c4d75c2209ec87c53f7deadd8c42e84b0a8c17c96',
    });
  }
  const transaction = await response.json();
  console.log(transaction)
  
  
  return c.res({
    image: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'linear-gradient(to right, #6ec007, #6ec007)', backgroundSize: '100% 100%' }}>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Hash: {transaction.hash}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Status: {transaction.status}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Block: {transaction.block}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>From: {transaction.from.hash}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>To: {transaction.to.hash}</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Fee: {transaction.fee.value} wei</div>
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Method: {transaction.method?transaction.method:"not available"}</div>
      {transaction.value && <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Value: {transaction.value} wei</div>}
      <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>Confirmations: {transaction.confirmations}</div>
  
    </div>
    ),
    intents: [
      <Button.Link href= {` https://nova-explorer.arbitrum.io/tx/${hash}`} >Explorer</Button.Link>,

      
    ],
   
  });
});

app.frame('/account/arb/:address', async (c) => {
  const { address } = c.req.param();

  // Fetch Ethereum balance and transaction counts (using placeholder URLs)
  const balanceResponse = await fetch(`https://api-nova.arbiscan.io/api?module=account&action=balance&address=${address}&apikey=626NRKMVFF2BI4BRPHPHBE9PKQVDIGWZ8I`);
  
  console.log("balance response fetched", balanceResponse)
  const txResponse = await fetch(`https://api-nova.arbiscan.io/api?module=account&action=txlist&address=${address}&apikey=626NRKMVFF2BI4BRPHPHBE9PKQVDIGWZ8I`);
  const tokenTxResponse = await fetch(`https://api-nova.arbiscan.io/api?module=account&action=tokentx&address=${address}&apikey=626NRKMVFF2BI4BRPHPHBE9PKQVDIGWZ8I`);
  // const tokenNFTTxResponse = await fetch(`https://explorer-api-testnet.morphl2.io/api?module=account&action=tokennfttx&address=${address}`);

  // // Parse the responses
  const balanceData = await balanceResponse.json();
  console.log("balance data",balanceData)
  const txData = await txResponse.json();
  console.log("trx data",txData)
  const tokenTxData = await tokenTxResponse.json();
  console.log("token trx data",tokenTxData)
  // const tokenNFTTxData = await tokenNFTTxResponse.json();
console.log("all fetched")
  // Compute data
  const ethBalance = balanceData.result || '0';
  const txCount = txData.result.length || 0;
  const tokenTransferCount = tokenTxData.result.length || 0;
  // const erc721Count = tokenNFTTxData.result.length || 0;

  return c.res({
    image: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'linear-gradient(to right, #FFD580, #FFD580)',
        backgroundSize: '100% 100%',
      }}>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {`ETH Balance: ${formatEther(ethBalance)}`}
        </div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {`Total Transactions: ${txCount}`}
        </div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {`Token Transfers: ${tokenTransferCount}`}
        </div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '40px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
 }}>
          {/* {`ERC-721 Transfers: ${erc721Count}`} */}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://explorer-api-testnet.morphl2.io/address/${address}`}>Explorer</Button.Link>,
      <Button action={`/account/morph/${address}/otherTokens`}>Other Token Balances</Button>,
    ],
  });
});

app.frame('/account/arb/:address/otherTokens', async (c) => {
  const { address } = c.req.param();

  // Fetch top 5 tokens
  const tokenListResponse = await fetch(`https://api-nova.arbiscan.io/api?module=account&action=tokenlist&address=${address}`);
  const tokenListData = await tokenListResponse.json();
  const topTokens = tokenListData.result.slice(0, 10);

  return c.res({
    image: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'linear-gradient(to right, #FFD580, #FFD580)',
        backgroundSize: '100% 100%',
      }}>
        {/* @ts-ignore  */}
        {topTokens.map((token, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: '10px',
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}>
            {`${token.name} (${token.symbol}): ${
  token.type === 'ERC-20' ? formatUnits(token.balance, token.decimals) : token.balance
}`}
          </div>
        ))}
      </div>
    ),
    intents:[
      <Button action={`/account/${address}`}>Back</Button>,
]
  });
});
devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
