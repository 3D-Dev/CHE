const { ethers } = require("ethers");

const contractAbiFragment = [
  {
    "name" : "transfer",
    "type" : "function",
    "inputs" : [
      {
        "name" : "_to",
        "type" : "address"
      },
      {
        "type" : "uint256",
        "name" : "_tokens"
      }
    ],
    "constant" : false,
    "outputs" : [],
    "payable" : false
  }
];

const provider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET
})

let hbyAdminWallet = new ethers.Wallet(process.env.HBY_ADMIN_PRIV_KEY)
hbyAdminWallet = hbyAdminWallet.connect(provider)
const contract = new ethers.Contract(process.env.HBY_TOKEN_ADDRESS, contractAbiFragment, hbyAdminWallet);

// Transfer ERC20 tokens from admin wallet
// param: amount, example '1.0'
const transferHBYFromAdmin = async (toAddress, amount) => {
  contract.transfer(toAddress, ethers.utils.parseUnits(amount, "ether")).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
}

module.exports = {
  transferHBYFromAdmin
}