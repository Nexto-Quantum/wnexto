const Migrations = artifacts.require("Migrations");
const NexToToken = artifacts.require("NexToToken");
const IPancakeRouter02 = artifacts.require("IPancakeRouter02");

const TestnetPancakeRouter = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
const MainnetPancakeRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Migrations);

  let NexToToken, currentTx;
  if(network == 'testnet'){
    NexToToken = await deployer.deploy(NexToToken, TestnetPancakeRouter);

    console.log("\n   Configuring 'NexToToken'");
    console.log("   ---------------------------");

    currentTx = await NexToToken.addManagementFeesReciever('0x028f01a4671d2fb7a6653411e7a6f2f68d72c201');
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.addManagementFeesReciever('0x028f01a4671d2fb7a6653411e7a6f2f68d72c201');
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.setMinPendingFeesForAutoLiquify(BigInt(750000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.setMinReserveETHForAutoBuyback(BigInt(1000000000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.setMinReserveETHForAutoReinject(BigInt(110000000000000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    console.log("\n   Configuring 'PancakeRouter'");
    console.log("   ---------------------------");

    var pancakeRouter = await IPancakeRouter02.at(TestnetPancakeRouter);

    currentTx = await NexToToken.approve(pancakeRouter.address, BigInt(90000000000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await pancakeRouter.addLiquidityETH(NexToToken.address, 90000000000000, 0, 0, NexToToken.address, Math.floor(Date.now() / 1000) + 300, {value: 1000000000000000000});
    console.log(`   > transaction hash: ${currentTx.tx}`);

    console.log("\n   Configuring 'NexToToken'");
    console.log("   ---------------------------");

    currentTx = await NexToToken.setLimitsEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.setFeesEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.setAutoFeeLiquifyEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.setAutoBuybackEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.setAutoReinjectEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);
  } else {
    NexToToken = await deployer.deploy(NexToToken, MainnetPancakeRouter);
    
    console.log("\n   Configuring 'NexToToken'");
    console.log("   ---------------------------");

    currentTx = await NexToToken.addManagementFeesReciever('0x028f01a4671d2fb7a6653411e7a6f2f68d72c201');
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await NexToToken.addManagementFeesReciever('0x028f01a4671d2fb7a6653411e7a6f2f68d72c201');
    console.log(`   > transaction hash: ${currentTx.tx}`);
  }
  currentTx = await NexToToken.sendTransaction({from: accounts[0], value: 100000000000000000});
  console.log(`   > transaction hash: ${currentTx.tx}`);

};
