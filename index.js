const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
  } = require("@solana/web3.js");
  
  const newPair = new Keypair(); //Generates new wallet pair
  console.log(newPair);
  
  const publicKey = new PublicKey(newPair._keypair.publicKey).toString(); //extracts the public key, type string
  const secretKey = newPair._keypair.secretKey; //extracts the secret key, type Uint8Array
  
  //the wallet balance function
  const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); //connection object used to get balance
      const myWallet = await Keypair.fromSecretKey(secretKey);
      const walletBalance = await connection.getBalance(
        new PublicKey(myWallet.publicKey)
      );
      console.log(`=> For wallet address ${publicKey}`);
      console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
      console.log(err);
    }
  };
  
  //function that airdrops SOL
  const airDropSol = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const walletKeyPair = await Keypair.fromSecretKey(secretKey);
      console.log(`-- Airdropping 2 SOL --`)
      const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(walletKeyPair.publicKey),
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
      console.log(err);
    }
  };
  
  //Driver function
  const driverFunction = async () => {
      await getWalletBalance();
      await airDropSol();
      await getWalletBalance();
  }
  driverFunction();