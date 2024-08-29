import { Icon, TokensConfig } from '../types';

export const TESTNET_TOKENS: TokensConfig = {
  BNB: {
    key: 'BNB',
    symbol: 'BNB',
    nativeChain: 'Bsc',
    icon: Icon.BNB,
    coinGeckoId: 'binancecoin',
    color: '#F3BA30',
    decimals: 18,
    wrappedAsset: 'WBNB',
  },
  WBNB: {
    key: 'WBNB',
    symbol: 'WBNB',
    nativeChain: 'Bsc',
    icon: Icon.BNB,
    tokenId: {
      chain: 'Bsc',
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    },
    coinGeckoId: 'binancecoin',
    color: '#F3BA30',
    decimals: 18,
    foreignAssets: {
      Avalanche: '0x10F1053bF2884b28ee0Bd7a2dDBa237Af3511d29',
      Fantom: '0xfB174b43228950C2055CFc25AE93f2DCe8E2beF0',
      Celo: '0xa8050be9389466c3c524F10F131f244ACbf21A0D',
      Moonbeam: '0x6097E80331B0c6aF4F74D7F2363E70Cb2Fd078A5',
      Solana: 'BaGfF51MQ3a61papTRDYaNefBgTQ9ywnVne5fCff4bxT',
      Sui: '0xddcf8680a8a4b8a527d8c85ec203274991590c2ea898d1c4635b70164d9c584b::coin::COIN',
      Aptos:
        '0xa5894f5ddb8647e6143102aa336ff07374f7b32e88c1c703aef5b7c9a370bf80::coin::T',
      Sei: 'sei10a7see3f9t2j9l8fdweur3aqy4zgvz583a268hhhln3yzps6l5mqnl4ua6',
      Wormchain:
        'wormhole1335rlmhujm0gj5e9gh7at9jpqvqckz0mpe4v284ar4lw5mlkryzsnetfsj',
      Cosmoshub:
        'ibc/5B0D5974A56332468DD4B2D07C96A7386FCF8FE7303FF41234F90E410EF51937',
      Osmosis:
        'ibc/65A67BA10DE2378B32AC5A822321E370966D3D4E180DEFB4C3C5245B21088DDF',
      Klaytn: '0xEFa3626825C33C4cd83850920Ad7Ac0a392E1faE',
      Sepolia: '0x02CdD5eB55934663F0aD8fbA3516dC7DE4E22894',
    },
  },
  AVAX: {
    key: 'AVAX',
    symbol: 'AVAX',
    nativeChain: 'Avalanche',
    icon: Icon.AVAX,
    coinGeckoId: 'avalanche-2',
    color: '#E84141',
    decimals: 18,
    wrappedAsset: 'WAVAX',
  },
  WAVAX: {
    key: 'WAVAX',
    symbol: 'WAVAX',
    nativeChain: 'Avalanche',
    icon: Icon.AVAX,
    tokenId: {
      chain: 'Avalanche',
      address: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    },
    coinGeckoId: 'avalanche-2',
    color: '#E84141',
    decimals: 18,
    foreignAssets: {
      Bsc: '0x6cE9E2c8b59bbcf65dA375D3d8AB503c8524caf7',
      Fantom: '0x0f545Be981C37fB15ab7c65404648761e99016e4',
      Celo: '0x502c8C83008D9Dd812a7C5fB886C063060C73Dbf',
      Moonbeam: '0x2E8afeCC19842229358f3650cc3F091908dcbaB4',
      Solana: '3Ftc5hTz9sG4huk79onufGiebJNDMZNL8HYgdMJ9E7JR',
      Sui: '0xa600741c469fb57ed01497ddf101e798fa79a9c529bd176675c5c4d970811f80::coin::COIN',
      Aptos:
        '0xbe8f4301c0b54e870902b9a23eeb95ce74ac190531782aa3262337ceb145401a::coin::T',
      Sei: 'sei1mgpq67pj7p2acy5x7r5lz7fulxmuxr3uh5f0szyvqgvru3glufzsxk8tnx',
      Wormchain:
        'wormhole1tqwwyth34550lg2437m05mjnjp8w7h5ka7m70jtzpxn4uh2ktsmq8dv649',
      Cosmoshub:
        'ibc/BAEAC83736444C09656FBE666FB625974FCCDEE566EB700EBFD2642C5F6CF13A',
      Osmosis:
        'ibc/99EAD53D49EC7CC4E2E2EB26C22CF81C16727DF0C4BF7F7ACBF0D22D910DB5DE',
      Blast: '0x74C6aA987658FcBaB9FdC2ee65f52Ddd5B2cEd95',
      Klaytn: '0x10257392a2B5e3C4D4bEe1607650a1C0C738202a',
      Scroll: '0x5Bd1ba0040C16b13894A6EbE3d55708c91eF08bb',
      Xlayer: '0xb13a464ceE7455A9b2941bFAe1bB1eB5A6833867',
    },
  },
  USDCavax: {
    key: 'USDCavax',
    symbol: 'USDC',
    nativeChain: 'Avalanche',
    icon: Icon.USDC,
    tokenId: {
      chain: 'Avalanche',
      address: '0x5425890298aed601595a70AB815c96711a31Bc65',
    },
    coinGeckoId: 'usd-coin',
    color: '#2774CA',
    decimals: 6,
    foreignAssets: {
      Bsc: '0x1cfeCf72bcBE1E429A21A5B11E708C7c397AaC54',
      Fantom: '0x6BC4E8D8c1d54656D1DeBCa96efc53aFd1408aD2',
      Celo: '0xDDB349c976cA2C873644F21f594767Eb5390C831',
      Moonbeam: '0x6533CE14804D113b1F494dC56c5D60A43cb5C3b5',
      Solana: 'GQtMXZxnuacCFTXVeTvyHi6P9F6chbtzhVc8JgD8hv7c',
      Sui: '0x2aa8c885d04e676c4e87b7d0f94d4f3b243b1b5d93239d1cc41d5528ce1714c1::coin::COIN',
      Aptos:
        '0x2ef7697bdb33361ca39d228671203afc0dea3202e792d79d2072b761d87c834::coin::T',
      Sei: 'sei1uyce5s6cc8hveg0maq2lg7wm6v6fvwqmznypj559nzf9wr9tmw3qnd3ce7',
      Wormchain:
        'wormhole1qum2tr7hh4y7ruzew68c64myjec0dq2s2njf6waja5t0w879lutqv2exs9',
      Cosmoshub:
        'ibc/F09E98FA8682FF39130F171E9D89A948B0C3A452F2A31F22B6CC54A3AAE1CD4A',
      Osmosis:
        'ibc/EC9FA5074F34F0644A025BB0263FDAE8F364C5E08523F6464465EF1010FF5A3A',
    },
  },
  FTM: {
    key: 'FTM',
    symbol: 'FTM',
    nativeChain: 'Fantom',
    icon: Icon.FANTOM,
    coinGeckoId: 'Fantom',
    color: '#12B4EC',
    decimals: 18,
    wrappedAsset: 'WFTM',
  },
  WFTM: {
    key: 'WFTM',
    symbol: 'WFTM',
    nativeChain: 'Fantom',
    icon: Icon.FANTOM,
    tokenId: {
      chain: 'Fantom',
      address: '0xf1277d1Ed8AD466beddF92ef448A132661956621',
    },
    coinGeckoId: 'Fantom',
    color: '#12B4EC',
    decimals: 18,
    foreignAssets: {
      Bsc: '0x9aB305B792DBdb8253bEE909E7006611Cb45175b',
      Avalanche: '0x094cB577C21Ab1360178beE74B9591fa12216dAD',
      Celo: '0xE6F8710cA14CFe7F5aAAD3A799C3d1D92dCba938',
      Moonbeam: '0x566c1cebc6A4AFa1C122E039C4BEBe77043148Ee',
      Solana: 'DMw2tLaq1bVoAEKtkoUtieSk9bfCPUvubYLatTMsSVop',
      Sui: '0x14e756ff65e0ac810a5f69ca5276ef5b899a6df3c4717de1f85559d8b5ae6ea6::coin::COIN',
      Sei: 'sei1cr3j7rxq0dhq04ksftmj8n2w096w9g7ck8fngkvk2lrmy3qwz56q9thu9u',
      Aptos:
        '0x533c6ade00d15d1e014c41e29e34853e87df92c4e01a6a3f41318dbd098048d6::coin::T',
      Wormchain:
        'wormhole1808lz8dp2c39vhm9gnemt7zzj95nvrmjepxp7v3w4skzrlyzcmnsxkduxf',
      Osmosis:
        'ibc/145C6B688F70B0C2F6D87546A5974A75CE75B3A2940275B750E65797B2996157',
      Cosmoshub:
        'ibc/919D8F138B7E71BB067C7301AB5C2D48415E8C3A2D9187861245CEC668F88E3C',
      Klaytn: '0x097c8878A0d852581Dc4D8820151094Ddd3663Ac',
      Sepolia: '0x852132647d301B7EED02589B1dc73545E73c8596',
    },
  },
  CELO: {
    key: 'CELO',
    symbol: 'CELO',
    nativeChain: 'Celo',
    icon: Icon.CELO,
    tokenId: {
      chain: 'Celo',
      address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
    },
    coinGeckoId: 'Celo',
    color: '#35D07E',
    decimals: 18,
    foreignAssets: {
      Bsc: '0x1471698cBD9cAB0228F2EEA9303A2b3aA0ABDC2B',
      Avalanche: '0xC66d9c2b33c347d4A4441975f4688fcD5DD4c441',
      Fantom: '0xB18E73a69c3Aaea39a610372537Cf8482622d199',
      Moonbeam: '0x3406a9b09adf0cb36DC04c1523C4b294C6b79513',
      Solana: '84F2QX9278ToDmA98u4A86xSV9hz1ovazr8zwGaX6qjS',
      Sui: '0x81868174a6b11e1acc337b3414f9912455435d486609fb8d50b34312865085f2::coin::COIN',
      Aptos:
        '0xecbb0f7e7d049499ca83ca1358344f56557886f6f7adc740d6734cce7bfc9a14::coin::T',
      Sei: 'sei1yw4wv2zqg9xkn67zvq3azye0t8h0x9kgyg3d53jym24gxt49vdyswk5upj',
      Wormchain:
        'wormhole1e8z2wjelypwxw5sey62jvwjyup88w55q3h6m0x8jtwjf6sx5c7ys4mzydk',
      Osmosis:
        'ibc/3A4EA3F8096856C0802F86B218DD74213B4C10224AA44BBD54AEAAA2ABF078BA',
      Cosmoshub:
        'ibc/009206915358A002C852A2A2CBEDB8446D2D02E519C815087A01F8BDB4DF77BA',
      Klaytn: '0xC951826bbB310a8160BB78c2eEe6C98246292ba7',
      Sepolia: '0x648f226f3bDcAEdc844622d604F76935DC05bC24',
    },
  },
  USDCalfajores: {
    key: 'USDCalfajores',
    symbol: 'USDC.e',
    nativeChain: 'Celo',
    icon: Icon.USDC,
    tokenId: {
      chain: 'Celo',
      address: '0x72CAaa7e9889E0a63e016748179b43911A3ec9e5',
    },
    coinGeckoId: 'usd-coin',
    color: '#2774CA',
    decimals: 6,
  },
  GLMR: {
    key: 'GLMR',
    symbol: 'GLMR',
    nativeChain: 'Moonbeam',
    icon: Icon.GLMR,
    coinGeckoId: 'moonbeam',
    color: '#e1147b',
    decimals: 18,
    wrappedAsset: 'WGLMR',
  },
  WGLMR: {
    key: 'WGLMR',
    symbol: 'WGLMR',
    nativeChain: 'Moonbeam',
    icon: Icon.GLMR,
    tokenId: {
      chain: 'Moonbeam',
      address: '0xD909178CC99d318e4D46e7E66a972955859670E1',
    },
    coinGeckoId: 'moonbeam',
    color: '#e1147b',
    decimals: 18,
    foreignAssets: {
      Bsc: '0x5C31B36599ED7f06b09c0ffC7A2F928cE496F046',
      Avalanche: '0xf080782DF38eD5228D2FC2882d13D56c8f1D6f21',
      Fantom: '0x41E3CFDFC255A4bF3C8D3560Bc8D3D9b5080338e',
      Celo: '0x132D2172D89cd9CfD480A8887c6bF92360fB460e',
      Solana: '8987WGkYa5viiZ9DD8sS3PB5XghKmWjkEgmzvwDuoAEc',
      Sui: '0xeffae382de96981f7ddd2d294429924827e8f325d612487a12d6a0b249171002::coin::COIN',
      Sei: 'sei140m6xagmw0zesejzhsvk46zprgscr7tu94h36rwsutcsxcs4fmds9sevym',
      Aptos:
        '0x338373b6694f71dbeac5ca4a30503bf5f083888d71678aed31255de416be37c0::coin::T',
      Wormchain:
        'wormhole10sfpr8ykh9xn93u8xec4ed3990nmvh86e0vaegkauqhlkxspysyqwavrxx',
      Cosmoshub:
        'ibc/1EEDF447A6B046B20C00B1497BED5947219AEEBE0D9A85235C85133A554DF7A4',
      Osmosis:
        'ibc/7DB06BB67428510AFC3967DC90F5632C679D55D8C487A951A0EEC3160AF492A6',
      Sepolia: '0x3F7CD70ECd402BBe71f45A95156A2CAC0d6A822E',
    },
  },
  SOL: {
    key: 'SOL',
    symbol: 'SOL',
    nativeChain: 'Solana',
    icon: Icon.SOLANA,
    coinGeckoId: 'solana',
    color: '#8457EF',
    decimals: 9,
    wrappedAsset: 'WSOL',
  },
  WSOL: {
    key: 'WSOL',
    symbol: 'WSOL',
    nativeChain: 'Solana',
    tokenId: {
      chain: 'Solana',
      address: 'So11111111111111111111111111111111111111112',
    },
    icon: Icon.SOLANA,
    coinGeckoId: 'solana',
    color: '#8457EF',
    decimals: 9,
    foreignAssets: {
      Bsc: '0x30f19eBba919954FDc020B8A20aEF13ab5e02Af0',
      Avalanche: '0xb10563644a6AB8948ee6d7f5b0a1fb15AaEa1E03',
      Fantom: '0xED1a08Fc69A7008d225890A96aaE258c465CC7ad',
      Celo: '0x05EEF2AE1A7A938D78598F7d9e8b97A9bED0c9eC',
      Sui: '0xbc03aaab4c11eb84df8bf39fdc714fa5d5b65b16eb7d155e22c74a68c8d4e17f::coin::COIN',
      Aptos:
        '0xdd89c0e695df0692205912fb69fc290418bed0dbe6e4573d744a6d5e6bab6c13::coin::T',
      Sei: 'sei1at3xuugacwgu3ppx7fxzmtr3q6m3ztjuean9r2mwcnqupw28yezs7unxgz',
      Wormchain:
        'wormhole1gryz69gzl6mz2m66a4twg922jtlc47nlx73sxv88lvq86du5zvyqz3mt23',
      Cosmoshub:
        'ibc/D3EA463A51E31B2B30BED1978575CAC145DBAB354B8A0EA5D4CFB12D737AF790',
      Osmosis:
        'ibc/B5D53105A7AA2BEC4DA4B3304228F3856219AE7CF84A9023043C481629E3E319',
      Klaytn: '0x48D99C16638E6FFD2ED60375cD35ef6c139e5f41',
      Moonbeam: '0x5babD0d267Adf2081626654E51d1cABF8c477440',
      Sepolia: '0x824CB8fC742F8D3300d29f16cA8beE94471169f5',
    },
  },
  USDCsol: {
    key: 'USDCsol',
    symbol: 'USDC',
    nativeChain: 'Solana',
    tokenId: {
      chain: 'Solana',
      address: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    },
    icon: Icon.USDC,
    coinGeckoId: 'usd-coin',
    color: '#2774CA',
    decimals: 6,
    foreignAssets: {
      Bsc: '0x51a3cc54eA30Da607974C5D07B8502599801AC08',
      Wormchain:
        'wormhole1ced9v4plkf25q8c6k9gz0guq6l4xyjujpjlvxfg8lpaqywkmamashswq7p',
      Cosmoshub:
        'ibc/26D8D6C63C8D37A5127591DDA905E04CC69CBD3A64F9DA3B1DA3FB0B6A7D9FA5',
      Osmosis:
        'ibc/35A0467DE5744662078DE8B36CBBE0CF0EAA022565A3E6630CB375DDEBB96E05',
    },
  },
  SUI: {
    key: 'SUI',
    symbol: 'SUI',
    nativeChain: 'Sui',
    tokenId: { chain: 'Sui', address: '0x2::sui::SUI' },
    icon: Icon.SUI,
    coinGeckoId: 'Sui',
    color: '#8457EF',
    decimals: 9,
    foreignAssets: {
      Bsc: '0x5A73D76e09Af2E428EC64aE10F91B78AC990B298',
      Avalanche: '0xfc5128F8556a6F059466E67740e6cC31EE5C2C47',
      Fantom: '0xd882AB49372eC093E8697B5153f54ab5e7738e3b',
      Celo: '0xa40d9E69ca9867C4bFbeC11Ce79C939991e9bf26',
      Solana: 'BJZ72CjPQojVoH68mzrd4VQ4nr6KuhbAGnhZEZCujKxY',
      Aptos:
        '0x7b22d0e02f653d4fd1caddcfa4719a2b329da56eb81d8f27db703f02466c26a5::coin::T',
      Sei: 'sei1rhpcprr2pffe6ydf078a0qeslhnlywxh2t3wjax4489z0m29cj9swj5khc',
      Moonbeam: '0x2ed4B5B1071A3C676664E9085C0e3826542C1b27',
      Wormchain:
        'wormhole1yf4p93xu68j5fseupm4laj4k6f60gy7ynx6r5vvyr9c0hl3uy8vqpqd6h0',
      Cosmoshub:
        'ibc/129EC6B8A41BE07F94DD267F552F4AE1D5EAEBB51634A1468556AF06C10C2692',
      Osmosis:
        'ibc/30778BA41ADF2D8A70B90DB53C2E0251731A40276EF6737215BB1A6ED9E90078',
      Klaytn: '0xbA5F07a20681Add3A396E7606c6DC9B03d71d28A',
    },
  },
  APT: {
    key: 'APT',
    symbol: 'APT',
    nativeChain: 'Aptos',
    tokenId: { chain: 'Aptos', address: '0x1::Aptos_coin::AptosCoin' },
    icon: Icon.APT,
    coinGeckoId: 'Aptos',
    color: '#8457EF',
    decimals: 8,
    foreignAssets: {
      Bsc: '0x4A7Bd5E135f421057F97BbA8BCeeE5c18334f454',
      Avalanche: '0x996a3f12C1FcD7339Ea8801f629201e4d42EAD04',
      Fantom: '0xAb2297E8994149BA91737944E40891881aF762a4',
      Celo: '0xAC0a2fF7DD597de863878a3372142b07B614C125',
      Moonbeam: '0xCaa2A1d3BbbA0D1466571e83b4E2CbE04252593D',
      Solana: '7EvFD3JKCJVdtkAYdaSVKJsrPEJCzy2neJha7TREGrCa',
      Sei: 'sei1em74y5sts4h8y5zuhfdn4w5g8zs285qld3kczpk6rh32jpvjyqqsvv0pdt',
      Wormchain:
        'wormhole1u8rft0gee23fa6a0t4t88ualrza5lj8ses4aur0l66c7efpvjezqchv34j',
      Cosmoshub:
        'ibc/0CCA5EB15BC2FE474E71DBC9698302CDE260B6F6548F91C30002F7CBF228197B',
      Osmosis:
        'ibc/7C495BD95757ED662A897C139F1C9F18275A86EE7203A0B073E2DB12B1E19D63',
      Sui: '0x812d6feb8b84e55d47a0bfcae9fb6a4e7e09be5ec86ce0a729e0f67d5f59f477::coin::COIN',
    },
  },
  KLAY: {
    key: 'KLAY',
    symbol: 'KLAY',
    decimals: 18,
    nativeChain: 'Klaytn',
    icon: Icon.KLAY,
    coinGeckoId: 'klay-token',
    color: '#fa4212',
    wrappedAsset: 'WKLAY',
  },
  WKLAY: {
    key: 'WKLAY',
    symbol: 'WKLAY',
    displayName: 'wKLAY',
    nativeChain: 'Klaytn',
    icon: Icon.KLAY,
    tokenId: {
      chain: 'Klaytn',
      address: '0x0339d5Eb6D195Ba90B13ed1BCeAa97EbD198b106',
    },
    coinGeckoId: 'wrapped-klay',
    color: '#fa4212',
    decimals: 18,
    foreignAssets: {
      Bsc: '0x79D34FDb686B5D139949E4F92D83EEe376489176',
      Aptos:
        '0xa8ffe1ffe3057756019345cdf9cf3d1f1a3d9a355147dd9440878c448a057579::coin::T',
      Celo: '0x8e50fC4b7F8B7018E72475f78C640F973218C8Cf',
      Avalanche: '0x84f3298Bcc019BD5B995756494095e1Eb72B565C',
      Solana: '6p7qTfX4tRFtQovxwT77Jn9HFQEV7nxLbux9C31Tgm23',
      Fantom: '0x72A1C24dA7F08d11a7668E228Ec287Fc6ec16E48',
      Sepolia: '0x142D0E977768cA4De6f2161D9E5B5C9F00435F9e',
      Moonbeam: '0x6eFf019D79D4136e57A7FC141967F3D0AD41089a',
      Sui: '0xd4a59fb612b162df75a9d190c0f72098dcae883e88bd0eb28667c31f8208dc3c::coin::COIN',
    },
  },
  ETHsepolia: {
    key: 'ETHsepolia',
    symbol: 'ETH',
    nativeChain: 'Sepolia',
    icon: Icon.ETH,
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
    wrappedAsset: 'WETHsepolia',
  },
  WETHsepolia: {
    key: 'WETHsepolia',
    symbol: 'WETH',
    nativeChain: 'Sepolia',
    icon: Icon.ETH,
    tokenId: {
      chain: 'Sepolia',
      address: '0xeef12A83EE5b7161D3873317c8E0E7B76e0B5D9c',
    },
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
    foreignAssets: {
      Solana: '6F5YWWrUMNpee8C6BDUc6DmRvYRMDDTgJHwKhbXuifWs',
      Celo: '0x890ad4a7eD5bD08b7d6638515157dF3bF4BaD1Bc',
      Bsc: '0x667a61Efa611399970AE927637dD6f9A16f51e40',
      Moonbeam: '0xa7276055a1d45fB9982575411801e10ac9970Da8',
      ArbitrumSepolia: '0x97Ee87C7Db6049669a518730a2Ee60d1Fc58844E',
      Avalanche: '0x12bFE94230daaE3d48067577F45b7b031dD357f3',
      Fantom: '0x7F96D67186561Aa17cEb699494E94bEE3F3499D4',
    },
  },
  USDCsepolia: {
    key: 'USDCsepolia',
    symbol: 'USDC',
    nativeChain: 'Sepolia',
    icon: Icon.USDC,
    tokenId: {
      chain: 'Sepolia',
      address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    },
    coinGeckoId: 'usd-coin',
    color: '#2774CA',
    decimals: 6,
    foreignAssets: {
      Aptos:
        '0x3f2912a313c5bea312dbf19f9080101d2e762df6546a6fe9f60a4de72c93d015::coin::T',
      Solana: '23Adx8na44L3M1Nf9RrUpQPb41eufdRXKseg25FfcJtw',
      Celo: '0xD6A34325e5F6BE27b7006bf06651444196Da579a',
      Bsc: '0xb8850F591019F0794F813426d4A4A9b5fB8f23C8',
      BaseSepolia: '0x3F872340B6A75397aa9b0A463000349962a8795D',
      ArbitrumSepolia: '0x27B8F40Cf0915e729ae5A96970E91045Fe9724dF',
      Fantom: '0xa686203C86140142230f44A724281E1BEd09c369',
      Klaytn: '0x25f2a470a2e1E75DDAc40289AB277eDE4DD98aFa',
      Sui: '0x6529fef82a8a09470c550a3129bbd889030b62306f0c14161224b1a40ef1346f::coin::COIN',
    },
  },
  ETHarbitrum_sepolia: {
    key: 'ETHarbitrum_sepolia',
    symbol: 'ETH',
    nativeChain: 'ArbitrumSepolia',
    icon: Icon.ETH,
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
    wrappedAsset: 'WETHarbitrum_sepolia',
  },
  WETHarbitrum_sepolia: {
    key: 'WETHarbitrum_sepolia',
    symbol: 'WETH',
    nativeChain: 'ArbitrumSepolia',
    icon: Icon.ETH,
    tokenId: {
      chain: 'ArbitrumSepolia',
      address: '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
    },
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
  },
  ETHbase_sepolia: {
    key: 'ETHbase_sepolia',
    symbol: 'ETH',
    nativeChain: 'BaseSepolia',
    icon: Icon.ETH,
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
    wrappedAsset: 'WETHbase_sepolia',
  },
  WETHbase_sepolia: {
    key: 'WETHbase_sepolia',
    symbol: 'WETH',
    nativeChain: 'BaseSepolia',
    icon: Icon.ETH,
    tokenId: {
      chain: 'BaseSepolia',
      address: '0x4200000000000000000000000000000000000006',
    },
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
  },
  ETHoptimism_sepolia: {
    key: 'ETHoptimism_sepolia',
    symbol: 'ETH',
    nativeChain: 'OptimismSepolia',
    icon: Icon.ETH,
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
    wrappedAsset: 'WETHoptimism_sepolia',
  },
  WETHoptimism_sepolia: {
    key: 'WETHoptimism_sepolia',
    symbol: 'WETH',
    nativeChain: 'OptimismSepolia',
    icon: Icon.ETH,
    tokenId: {
      chain: 'OptimismSepolia',
      address: '0x4200000000000000000000000000000000000006',
    },
    coinGeckoId: 'Ethereum',
    color: '#5794EC',
    decimals: 18,
    foreignAssets: {
      ArbitrumSepolia: '0xa2610700cCA8361DECD27dB2564848C530f20813',
    },
  },
  ETHscroll: {
    key: 'ETHscroll',
    symbol: 'ETH',
    nativeChain: 'Scroll',
    icon: Icon.SCROLL,
    coinGeckoId: 'Ethereum',
    decimals: 18,
    wrappedAsset: 'WETHscroll',
  },
  WETHscroll: {
    key: 'WETHscroll',
    symbol: 'WETH',
    nativeChain: 'Scroll',
    icon: Icon.SCROLL,
    tokenId: {
      chain: 'Scroll',
      address: '0x5300000000000000000000000000000000000004',
    },
    coinGeckoId: 'Ethereum',
    decimals: 18,
  },
  ETHblast: {
    key: 'ETHblast',
    symbol: 'ETH',
    nativeChain: 'Blast',
    icon: Icon.BLAST,
    coinGeckoId: 'Ethereum',
    decimals: 18,
    wrappedAsset: 'WETHblast',
  },
  WETHblast: {
    key: 'WETHblast',
    symbol: 'WETH',
    nativeChain: 'Blast',
    icon: Icon.BLAST,
    tokenId: {
      chain: 'Blast',
      address: '0x9D020B1697035d9d54f115194c9e04a1e4Eb9aF7',
    },
    coinGeckoId: 'Ethereum',
    decimals: 18,
  },
  OKB: {
    key: 'OKB',
    symbol: 'OKB',
    nativeChain: 'Xlayer',
    icon: Icon.XLAYER,
    coinGeckoId: 'okb',
    decimals: 18,
    wrappedAsset: 'WOKB',
  },
  WOKB: {
    key: 'WOKB',
    symbol: 'WOKB',
    nativeChain: 'Xlayer',
    icon: Icon.XLAYER,
    tokenId: {
      chain: 'Xlayer',
      address: '0xa2aFfd8301BfB3c5b815829f2F509f053556D21B',
    },
    coinGeckoId: 'okb',
    decimals: 18,
  },
  MNT: {
    key: 'MNT',
    symbol: 'MNT',
    nativeChain: 'Mantle',
    icon: Icon.MANTLE,
    coinGeckoId: 'mantle',
    decimals: 18,
    wrappedAsset: 'WMNT',
  },
  WMNT: {
    key: 'WMNT',
    symbol: 'WMNT',
    nativeChain: 'Mantle',
    icon: Icon.MANTLE,
    tokenId: {
      chain: 'Mantle',
      address: '0xa4c4cb2A072eE99f77212Fa18c2B7Ca26DA23905',
    },
    coinGeckoId: 'mantle',
    decimals: 18,
  },
};
