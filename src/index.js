import {html, css, LitElement} from 'lit';
require('./ModalConnect');
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {repeat} from 'lit/directives/repeat.js';


export class Web3Element extends LitElement {
  static styles = css`
    web-dialog {
      --dialog-border-radius: 12px;
      --dialog-max-width: 60%;
      color: black;
      text-align: left;
    }
    .Web3-Button {
      font-size: 16px;
      letter-spacing: 1px;
      font-weight: 400 !important;
      background-color: #adabab;
      color: rgb(0, 0, 0);
      padding: 15px 10px;
      margin-top: 10px;
      text-align: left;
      display: inline-block !important;
      text-decoration: none;
      border: 0px;
      border-color: #a3a375;
      width: 100%;
      cursor: pointer;
      transition: all 0.3s 0s ease-in-out;
      border-radius: 4px;
    }
    
    /* The Close Button */
    .web3-close {
      color: black;
      float: right;
      font-size: 20px;
      font-weight: bold;
      border: 0px;
      border-radius: 0px;
      background-color: white;
    }
    
    .web3-close:hover {
      color: #000;
      text-decoration: none;
      cursor: pointer;
      background-color: #adabab;
      border-radius: 50%;
    }

    .web3-prix {
      color: black;
      float: right;
      font-size: 15px;
      font-weight: bold;
      border: 0px;
      border-radius: 0px;
      background-color: #adabab;
    }
  
  `;

  static properties = {
    signer: {type: String},
    label : {type: String},
    metamask : {type: Boolean},
    receiver : {type: String},
    amount : {type: String},
    nbrCoins: {type: Number},
    token: {},
  };

  constructor() {
    super();
    this.signer = "";
    this.web3_label = this.dataset.label;
    this.metamask = window.ethereum?true:false; 
    this.receiver = this.dataset.receiver;
    this.amount = this.dataset.amount;
    this.nbrCoins = this.dataset.tokenNumber;
    this.token = [];
    for (let index = 0; index < this.nbrCoins; index++) {
      this.token[index] = { 
                            address: this.getAttribute("token"+index+"-address"), 
                            symbol: this.getAttribute("token"+index+"-symbol"), 
                            decimal: this.getAttribute("token"+index+"-decimal"), 
                            price: this.getAttribute("token"+index+"-price")
                          };
    }
  }

  render() {
    return html`
      <button class="Web3-Button" @click="${()=> {this._connect(1)}}">${this.label}</button>
      <!-- Modal Connect -->
      <web-dialog name="connect" center>
        <header>
          <span>Connect Your Wallet</span>
          <button class="web3-close" @click=${()=>{this._connect(0)}}>&times;</button>
        </header>
        <article>
          ${this.metamask?
            html`<button class="Web3-Button" @click=${this._MetamaskConnect}>Metamask</button>`
          :
            html`<a class="Web3-Button" target="_blank" rel="noreferrer" href=${`https://metamask.io/download.html`}>Install Metamask</a>`          }
          <button class="Web3-Button" @click=${this._WalletConnect}>WalletConnect</button>
        </article>
      </web-dialog>

       <!-- Modal Pay -->
       <web-dialog name="pay" center>
        <header>
          <span>Pay With Crypto</span>
          <button class="web3-close" @click=${()=>this._pay(0)}>&times;</button>
        </header>
        <article>
          <button class="Web3-Button" @click=${this._payWithEth} > ETH  <span class="web3-prix"> 0.01 </span></button>
         ${repeat(
          this.token,
          (token, index) => html`
          <button class="Web3-Button" @click=${()=>{this._payWithToken(this.receiver, token.address, token.price, token.decimal)}}> ${token.symbol} <span class="web3-prix"> ${token.price} </span></button>
        `
        )}
        </article>
      </web-dialog>
      <!-- success -->
          <web-dialog name="success" center>
            <header>
              <span>success</span>
              <button class="web3-close" @click=${()=>this._success(0)}>&times;</button>
            </header>
            <article>success</article>
          </web-dialog>
      <!-- failed -->
          <web-dialog name="failed" center>
            <header>
              <span>failed</span>
              <button class="web3-close" @click=${()=>this._failed(0)}>&times;</button>
            </header>
            <article>failed</article>
          </web-dialog>
       <!-- failed -->
          <web-dialog name="pending" center>
            <header>
              <span>Please Wait your payment in progress</span>
              <button class="web3-close" @click=${()=>this._pending(0)}>&times;</button>
            </header>
            <article>pending</article>
          </web-dialog>

    `;
  }


// open modal Connect
  _connect(n) {
    const $dialog = document.querySelector("web3-element").shadowRoot.querySelector('web-dialog[name="connect"]');
    if(n == 1){
      $dialog.setAttribute('open',true);
    }else{
      $dialog.removeAttribute('open');
    }  }

// open modal Pay 
 _pay(n) {
    const $dialog = document.querySelector("web3-element").shadowRoot.querySelector('web-dialog[name="pay"]');
    if(n == 1){
      $dialog.setAttribute('open',true);
    }else{
      $dialog.removeAttribute('open');
    }  }

  _success(n){
    const $dialog = document.querySelector("web3-element").shadowRoot.querySelector('web-dialog[name="success"]');
    if(n == 1){
      $dialog.setAttribute('open',true);
    }else{
      $dialog.removeAttribute('open');
    }
  }


  _failed(n){
    const $dialog = document.querySelector("web3-element").shadowRoot.querySelector('web-dialog[name="failed"]');
    if(n == 1){
      $dialog.setAttribute('open',true);
    }else{
      $dialog.removeAttribute('open');
    } 
  }

  _pending(n){
    const $dialog = document.querySelector("web3-element").shadowRoot.querySelector('web-dialog[name="pending"]');
    if(n == 1){
      $dialog.setAttribute('open',true);
    }else{
      $dialog.removeAttribute('open');
    }
  }

// Metamask Connect 
  async _MetamaskConnect(){
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      this.signer = provider.getSigner();
      this._connect(0);
      this._pay(1);
    } catch (error) {
        if (error.code) {
          console.log({signer:false, error:error.code});
        } else {
          console.log({signer:false, error: error});
      }
    }
  }
  
// WalletConnect Connect
  async _WalletConnect(){
    const provider = new WalletConnectProvider({
      infuraId: "a20f1d0ef34d4f5c84a1d8cead42c105",
    });
    try {
        await provider.enable();
        const web3Provider = new providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        this.signer = signer;
        this._connect(0);
        this._pay(1);
    } catch (error) {
        console.log({signer:false, error:error});
    }
  }
 
// Pay with ETH
  async _payWithEth (){
    if(this.amount !== undefined && this.receiver !== undefined){
      this._pay(0);
      this._pending(1);
      try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          let abi = ["function PayWithETH(address _to)external payable"]
          let contract = new ethers.Contract("0x82703A9F3618Dce7CE840f45704eD0160066A3B4", abi, signer);
          let overrides = {
              value: ethers.utils.parseUnits(this.amount,"ether"),
          };
          let tx = await contract.PayWithETH(this.receiver, overrides);
          let res = await tx.wait();
          if(res.status == 1){
            this._pending(0);
            this._success(1);
          }else{
            this._pending(0);
            this._failed(1);
          }
      } catch (error) {
          if(error.code === undefined){
            this._pending(0);
            this._failed(1);
          }else{
            this._pending(0);
            this._failed(1);
          }
      }
    }else{
      this._pending(0);
      this._failed(1);
    }
  }

// Pay With Tokens
  async _payWithToken(_to, _token, amount, _decimal){
      if(amount !== undefined && _to !== undefined && _token !== undefined && _decimal!==undefined){
          this._pay(0);
          this._pending(1);
          var _amount = "";
          if(_decimal == String(18)){
            _amount = ethers.utils.parseEther(amount);
          }else{
              _amount = String(parseInt(amount) * 10 ** parseInt(_decimal));
          }
          try {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              let abi1 = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
              let contract_ERC20 = new ethers.Contract(_token.toString(), abi1, signer);
              let tx = await contract_ERC20.approve("0x82703A9F3618Dce7CE840f45704eD0160066A3B4", String(_amount));
              let res = await tx.wait();
              let overrides = {
                  gasLimit: 750000,
              };
              let abi2 = ["function SwapTokenForETH(uint tokenAmount, address token, address to) external"];
              let contract = new ethers.Contract("0x82703A9F3618Dce7CE840f45704eD0160066A3B4",abi2,signer);
              tx = await contract.SwapTokenForETH(String(_amount),_token.toString(), _to.toString(), overrides);
              res = await tx.wait();
              if(res.status == 1){
                this._pending(0);
                this._success(1);
              }
          } catch (error) {
              if(error.code === undefined){
                this._pending(0);
                this._failed(1);
              }else{
                this._pending(0);
                this._failed(1);
              }
          }
      }else{
        this._pending(0);
        this._failed(1);
      }
  
  }
  const
}
customElements.define('web3-element', Web3Element);