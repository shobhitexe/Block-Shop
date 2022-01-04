import React from 'react'

export default function HelpScreen() {
    return (
    <div className="my-5 text-center">
        <h1>Steps to Connect Metamask with our Dapp </h1>
        <p>1. Download metamask extension for your specific browser</p>
        <p>2. Create a wallet or import an existing wallet using metamask</p>
        <p>3. Select the Rinkeby Test Network using Metamask 
            as the Dapp is currently deployed on Rinkeby Test Network</p>
        <p>4. Visit the homepage of our website and you will be prompted to establish 
            connection with our Dapp using one of your metamask accounts
        </p>
        <p>5. After successful connection, you can register and then login to our site. 
           Enjoy shopping with Block Shop !!</p>
        <hr></hr>
        <h1 style={{marginTop:'20px'}}>Note</h1>
        <p>1. Currently the Dapp has been deployed on test net so users can experience
            Block Shop by paying for products using test credit cards.</p>
        <p>2. Fake ether
            can be used to add reviews. <a href="https://faucets.chain.link/rinkeby">Click here</a> to get some ether for testing purposes.</p> 
        <p>3. Please email us your queries or issues encountered 
            at <a href = "mailto: blockshoptest@gmail.com">blockshoptest@gmail.com</a> so that 
            we can rectify the issues faced. </p>
        <p>4. Once the testing phase has been completed, Block Shop will be deployed on the
            ethereum mainnet. Thank you for your cooperation !!
        </p>
    </div>
    )
}
