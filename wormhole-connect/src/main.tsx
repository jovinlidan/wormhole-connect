import React from 'react';
import ReactDOM from 'react-dom/client';
import WormholeConnect from './WormholeConnect';
import ErrorBoundary from './components/ErrorBoundary';
import { DEFAULT_ROUTES, nttRoutes } from 'routes/operator';
import {
  MayanRouteMCTP,
  MayanRouteSWIFT,
  MayanRouteWH,
} from '@mayanfinance/wormhole-sdk-route';
export * from './theme';

// This is the entry point that runs when integrators add the Connect widget
// to their websites by pasting <script> and <link> tags pointing to the
// unpkg.com hosted build.
//
// It has some logic for backwards compatibility for older integrations, but
// the official interface is now providing a DOM element with:
//
// - id: "wormhole-connect"
// - attribute "data-config" with config JSON
// - attribute "data-theme" with theme JSON

const container = document.getElementById('wormhole-connect') as HTMLElement;

if (!container) {
  throw new Error(
    'Could not find an element with id "wormhole-connect". Please add one to use the Connect widget.',
  );
}

/* @ts-ignore */
const _config = window.__CONNECT_CONFIG as WormholeConnectConfig;
/* @ts-ignore */
const theme = window.__CONNECT_THEME as WormholeConnectPartialTheme;

const config = {
  ...(_config ?? {}),
  routes: [
    ...DEFAULT_ROUTES,
    MayanRouteWH,
    MayanRouteMCTP,
    MayanRouteSWIFT,
    ...nttRoutes({
      tokens: {
        W: [
          {
            chain: 'Solana',
            manager: 'NTtAaoDJhkeHeaVUHnyhwbPNAN6WgBpHkHBTc6d7vLK',
            token: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ',
            transceiver: [
              {
                address: 'NTtAaoDJhkeHeaVUHnyhwbPNAN6WgBpHkHBTc6d7vLK',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
          {
            chain: 'Ethereum',
            manager: '0xc072B1AEf336eDde59A049699Ef4e8Fa9D594A48',
            token: '0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91',
            transceiver: [
              {
                address: '0xDb55492d7190D1baE8ACbE03911C4E3E7426870c',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Arbitrum',
            manager: '0x5333d0AcA64a450Add6FeF76D6D1375F726CB484',
            token: '0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91',
            transceiver: [
              {
                address: '0xD1a8AB69e00266e8B791a15BC47514153A5045a6',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Optimism',
            manager: '0x1a4F1a790f23Ffb9772966cB6F36dCd658033e13',
            token: '0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91',
            transceiver: [
              {
                address: '0x9bD8b7b527CA4e6738cBDaBdF51C22466756073d',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Base',
            manager: '0x5333d0AcA64a450Add6FeF76D6D1375F726CB484',
            token: '0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91',
            transceiver: [
              {
                address: '0xD1a8AB69e00266e8B791a15BC47514153A5045a6',
                type: 'wormhole',
              },
            ],
          },
        ],
        osETH: [
          {
            chain: 'Ethereum',
            manager: '0x896b78fd7e465fb22e80c34ff8f1c5f62fa2c009',
            token: '0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38',
            transceiver: [
              {
                address: '0xAAFE766B966219C2f3F4271aB8D0Ff1883147AB6',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Arbitrum',
            manager: '0x485F6Ac6a3B97690910C1546842FfE0629582aD3',
            token: '0xf7d4e7273E5015C96728A6b02f31C505eE184603',
            transceiver: [
              {
                address: '0xAf7ae721070c25dF97043381509DBc042e65736F',
                type: 'wormhole',
              },
            ],
          },
        ],
        Lido_wstETH: [
          {
            chain: 'Ethereum',
            manager: '0xb948a93827d68a82F6513Ad178964Da487fe2BD9',
            token: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
            transceiver: [
              {
                address: '0xA1ACC1e6edaB281Febd91E3515093F1DE81F25c0',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Bsc',
            manager: '0x6981F5621691CBfE3DdD524dE71076b79F0A0278',
            token: '0x26c5e01524d2E6280A48F2c50fF6De7e52E9611C',
            transceiver: [
              {
                address: '0xbe3F7e06872E0dF6CD7FF35B7aa4Bb1446DC9986',
                type: 'wormhole',
              },
            ],
          },
        ],
        ETHFI: [
          {
            chain: 'Ethereum',
            manager: '0x344169Cc4abE9459e77bD99D13AA8589b55b6174',
            token: '0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb',
            transceiver: [
              {
                address: '0x3bf4AebcaD920447c5fdD6529239Ab3922ce2186',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Arbitrum',
            manager: '0x90A82462258F79780498151EF6f663f1D4BE4E3b',
            token: '0x7189fb5B6504bbfF6a852B13B7B82a3c118fDc27',
            transceiver: [
              {
                address: '0x4386e36B96D437b0F1C04A35E572C10C6627d88a',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Base',
            manager: '0xE87797A1aFb329216811dfA22C87380128CA17d8',
            token: '0x6C240DDA6b5c336DF09A4D011139beAAa1eA2Aa2',
            transceiver: [
              {
                address: '0x2153bEa70D96cd804aCbC89D82Ab36638fc1A5F4',
                type: 'wormhole',
              },
            ],
          },
        ],
        Yaku: [
          {
            chain: 'Solana',
            manager: 'nTtPcmsVY4f86cSREmnio5tUyiK58HBqBeDwaUYQt6t',
            token: 'AqEHVh8J2nXH9saV2ciZyYwPpqWFRfD2ffcq5Z8xxqm5',
            transceiver: [
              {
                address: '6gTkp6F5XhsaeugYEtuQ6qmuD8qUUdeHrYrN1s1qex7',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
          {
            chain: 'Ethereum',
            manager: '0x9ad57E28ECc26507FFB18dBc15Ae7B13254B99c7',
            token: '0x1155DB64b59265F57533bC0f9AE012FfFd34eB7F',
            transceiver: [
              {
                address: '0x0e9c1B26Ee0D3021e4543c2Ed65a9661AC390390',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Arbitrum',
            manager: '0x650613DbD0b422cD7f7c06a8a07Dc2C5880b54b3',
            token: '0xB00eaEDB98F1e30ad545703d8Ff14b24D109514f',
            transceiver: [
              {
                address: '0x19c19B3151AEa35eE19E018ed24D81F892b6C18E',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Avalanche',
            manager: '0xbeEDEcF091DDAC6a494A718666f94d8A1d5Ab984',
            token: '0xB00eaEDB98F1e30ad545703d8Ff14b24D109514f',
            transceiver: [
              {
                address: '0x0a5C77B838D22E8156D62e7845Fb73e948CAc299',
                type: 'wormhole',
              },
            ],
          },
        ],
        WeatherXM: [
          {
            chain: 'Ethereum',
            manager: '0xd24afd8eca7b51bcf3c0e6b3ca94c301b121ccce',
            token: '0xde654f497a563dd7a121c176a125dd2f11f13a83',
            transceiver: [
              {
                address: '0x8b209672c2120f84ceb70b22416645f8912ad0f0',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'NttWixqwUHAnpXym3UYUySQZtb4C57EZxpH721JfLyF',
            token: 'wxmJYe17a2oGJZJ1wDe6ZyRKUKmrLj2pJsavEdTVhPP',
            transceiver: [
              {
                address: 'PaK4UctEGihEm37c2qSrbpkucHBBDDqbvYzGXygbxkb',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
        JitoSOL: [
          {
            chain: 'Solana',
            manager: 'nTTJS9XtWhfHkPiLmddSmdMrCJAtJrSCjPwuns3fvu5',
            token: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
            transceiver: [
              {
                address: 'nTTJS9XtWhfHkPiLmddSmdMrCJAtJrSCjPwuns3fvu5',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
          {
            chain: 'Arbitrum',
            manager: '0x02f5FB92F3794C535b1523183A417fB9efbB4f5d',
            token: '0x83e1d2310Ade410676B1733d16e89f91822FD5c3',
            transceiver: [
              {
                address: '0x89E928e6D95BA6D7419B2b9e384fC526b1649339',
                type: 'wormhole',
              },
            ],
          },
        ],
        Swissborg: [
          {
            chain: 'Solana',
            manager: 'NttBm3HouTCFnUBz32fEs5joQFRjFoJPA8AyhtgjFrw',
            token: '3dQTr7ror2QPKQ3GbBCokJUmjErGg8kTJzdnYjNfvi3Z',
            transceiver: [
              {
                address: '39eUvaqshuCbTo7CmQkHG7zBBLaDAPK3qg89cMSmqKWx',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
          {
            chain: 'Ethereum',
            manager: '0x66a28B080918184851774a89aB94850a41f6a1e5',
            token: '0x64d0f55Cd8C7133a9D7102b13987235F486F2224',
            transceiver: [
              {
                address: '0x45E581d6841F0a99Fc34F70871ef56b353813ddb',
                type: 'wormhole',
              },
            ],
          },
        ],
        Agora: [
          {
            chain: 'Ethereum',
            manager: '0xCD024C7eB854f6799A343828773cB3A8107d17d4',
            token: '0x87B46212e805A3998B7e8077E9019c90759Ea88C',
            transceiver: [
              {
                address: '0x6eB0d287A539AAB2eB962De550Fe5dDA29b0fe52',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'NttADdCvGLUhukNyePei9CkmHoe6S9xjqgqfQv51PQg',
            token: 'AGAxefyrPTi63FGL2ukJUTBtLJStDpiXMdtLRWvzambv',
            transceiver: [
              {
                address: '4FnEwHLcuu3CHf8YG31RWBCVpshGGxNyfYAszq2JABxi',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
        XBorg: [
          {
            chain: 'Ethereum',
            manager: '0xa4489105efa4b029485d6bd3A4f52131baAE4B1B',
            token: '0xEaE00D6F9B16Deb1BD584c7965e4c7d762f178a1',
            transceiver: [
              {
                address: '0x7135766F279b9A50F7A7199cfF1be284521a0409',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Arbitrum',
            manager: '0x7135766F279b9A50F7A7199cfF1be284521a0409',
            token: '0x93FA0B88C0C78e45980Fa74cdd87469311b7B3E4',
            transceiver: [
              {
                address: '0x874303ba6a34fC33ADcdFFd4293a41f32246D6a0',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'NttXP2tPLxGkNA3yrSfFZbtDbfKPKBrJUR6Jcqh6sRi',
            token: 'XBGdqJ9P175hCC1LangCEyXWNeCPHaKWA17tymz2PrY',
            transceiver: [
              {
                address: '328hfTbiEzfbXSHCWqrBg3g1VZ9bRxNtUTffjQ4Tqark',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
        Cheese: [
          {
            chain: 'Arbitrum',
            manager: '0xfC843c4B402634a8Fc02137AAa7942474e043d72',
            token: '0x05AEa20947A9A376eF50218633BB0a5A05d40A0C',
            transceiver: [
              {
                address: '0x33D2E8093143a317234cB070C2BB6A641dDeFA4d',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'NTtxeqz2XjMnpcEoWMqb6pz84zHweJRYWyzmsmmW49E',
            token: 'AbrMJWfDVRZ2EWCQ1xSCpoVeVgZNpq1U2AoYG98oRXfn',
            transceiver: [
              {
                address: 'AoUmFKEGhsfnJSny6fMDF3JMgyEgjoG4yAk8YFGbfp6c',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
        FANTOM_USDC: [
          {
            chain: 'Fantom',
            manager: '0x68dB2f05Aa2d77DEf981fd2be32661340c9222FB',
            token: '0x2F733095B80A04b38b0D10cC884524a3d09b836a',
            transceiver: [
              {
                address: '0x8b47f02E7E20174C76Af910adc0Ad8A4B0342f4c',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Ethereum',
            manager: '0xeBdCe9a913d9400EE75ef31Ce8bd34462D01a1c1',
            token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            transceiver: [
              {
                address: '0x55f7820357FA17A1ECb48E959D5E637bFF956d6F',
                type: 'wormhole',
              },
            ],
          },
        ],
        Renzo: [
          {
            chain: 'Ethereum',
            manager: '0x4ba5ea226da36466EA7EbCf018df66a615D27c7c',
            token: '0x3B50805453023a91a8bf641e279401a0b23FA6F9',
            transceiver: [
              {
                address: '0x591Be6DBC81D65924dcC78912bBC9306D09c2faa',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'NtTtwqVX4SCNECrZ8ZmEaxAPFcm5r7Szx4tBmYLU17p',
            token: '3DK98MXPz8TRuim7rfQnebSLpA7VSoc79Bgiee1m4Zw5',
            transceiver: [
              {
                address: 'DC5fFP5we3qshuoiQ4M7gjBnNKcKaqu4ibheetZeXfCY',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
        Layer3: [
          {
            chain: 'Ethereum',
            manager: '0x7926D63FEb9b950908b297cC995B6853bCA21847',
            token: '0x88909D489678dD17aA6D9609F89B0419Bf78FD9a',
            transceiver: [
              {
                address: '0x6C55F346C20Ca2b0C62e30790907f0a41C978ccc',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'ntT5xGC7XEuR8Po9U3Umze12T9LBdaTCuEc9Cby6qPa',
            token: '5k84VjAKoGPXa7ias1BNgKUrX7e61eMPWhZDqsiD4Bpe',
            transceiver: [
              {
                address: '5JGpVmGF976mzhzQrfk2BSwqG8b2xg4NxQ88upmZ3iyR',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
        Sky: [
          {
            chain: 'Ethereum',
            manager: '0xdF967e65381067709E402596be88B5cAA416B419',
            token: '0x56072C95FAA701256059aa122697B133aDEd9279',
            transceiver: [
              {
                address: '0xb84c1c481D5382934B8F89441eba13838dEF3E5c',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'STTrhNsZyLN3srkazdo6LnpJ5RciJYP9N4zVwwYycw9',
            token: 'SKY3XUAsKsXPrcn6aAAMrjxscGcwKawEibtSsF1CNgt',
            transceiver: [
              {
                address: '6bdawmJMsizRHf8zHQ2T3C9aVF5uBs5ywefeFBp5ENu5',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
        USDS: [
          {
            chain: 'Ethereum',
            manager: '0x630262D41E2fFaC5A2550BdB96764fcC97C25521',
            token: '0xdC035D45d973E3EC169d2276DDab16f1e407384F',
            transceiver: [
              {
                address: '0x62E9bedb5eE0d704131b50ca100dA712e9B58966',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'STTb3N8SdASycVjRhgPZV7EgtdaW19pkuY5vGxTNEW6',
            token: 'USDSvKzCxbVwSEsu1amJb8BgrUq3c39sGirmT3bmbng',
            transceiver: [
              {
                address: 'CwYxgHqsHpKeHpSL1vneLVgTkSe1drpsgHBSEA2PmHeg',
                type: 'wormhole',
              },
            ],
            quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ',
          },
        ],
      },
    }),
  ],
};

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <WormholeConnect config={config} theme={theme} />
    </ErrorBoundary>
  </React.StrictMode>,
);
