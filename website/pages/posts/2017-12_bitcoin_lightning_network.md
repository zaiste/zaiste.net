---
created_at: 2017-12-02 
kind: article
publish: true
title: "Bitcoin's Lightning Network"
tags:
- bitcoin
- crypto currency
---

Lightning Network is a protocol for scaling and speeding up blockchain operations. It was designed to solve the Bitcoin blockchain limitations. It can be used on top of any blockchain. 

Credit card operators (Visa, Mastercard) can process tens of thousands of transaction per second. Currently, Bitcoin's network is limited to less than 10 transactions per second. It also takes around 10 minutes for a Bitcoin transaction to be confirmed. Transaction fees on the Bitcoin blockchain are between 5 to 10 cents per transaction which makes micro-payments too expensive.  Lightning Network was created to overcome those problems. It provides near-instant transactions with fees of a fraction of a cent. 

Lightning Network stores only the transaction data required in the context of the transaction issuer.  It is based on a technology called payment channels. It  allows for the aggregation of small transactions into a single transaction, turning multiple fees into a single one

Lightning allows for a local consensus state which is ultimately enforced by the global consensus (the blockchain). Lightning uses the underlying blockchain as a means to batch settle transactions that have occurred off-chain without counter-party trust.

Lightning Network can be also used to instantly transfer different assets between blockchains using cross-chain atomic swaps.
