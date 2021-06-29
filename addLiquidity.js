const { ChainId, WETH, Fetcher, Token, Route } = require('@pancakeswap-libs/sdk-v2')
const Web3 = require("web3")

/// Configurations
const url = "https://data-seed-prebsc-1-s1.binance.org:8545/"
const PancakeRouterTest = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3"	// Change
const web3 = new Web3(url)

/// Inputs
const tokenAddress = "0x43fa2fef6a5f6148748ef440ca149412af6aa7f6"	// Change


const init = async() => {
	const abi = [{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"}]
	const amountTokenDesired = web3.utils.toWei('100', 'ether')			// Change
	const amountETHDesired = web3.utils.toWei('1', 'ether')				// Change
	const amountTokenMin = web3.utils.toWei('50', 'ether')				// Change
	const amountETHMin = web3.utils.toWei('0.5', 'ether')				// Change
	const myAddress = "0x6A77B47E29D86a4A2012202410d43a8E3aC2d1Da"
	const deadline = Math.floor(Date.now()/1000) + 60*2

	const contract = new web3.eth.Contract(abi, PancakeRouterTest)

	const data = contract.methods.addLiquidityETH(
		tokenAddress,
		amountTokenDesired,
		amountTokenMin,
		amountETHMin,
		myAddress,
		deadline
	).encodeABI()

	const gas = '5000000'								// Change
	const gasPrice = web3.utils.toWei('20', 'gwei')		// Change
	const signedTx = await web3.eth.accounts.signTransaction({
		from: myAddress,
		to: PancakeRouterTest,
		gas: gas,
		gasPrice: gasPrice,
		data: data,
		value: amountETHDesired
	}, "0x8c2cd153823c22f7304d9960a32e25d28676f720ecb0d1892ab772cb0e9759a6")

	web3.eth.sendSignedTransaction(signedTx.rawTransaction).then((res, err) => {
		console.log(res, err)
	})
}

init()