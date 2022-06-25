import {html, css, LitElement} from 'lit';
require('./ModalConnect');
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {repeat} from 'lit/directives/repeat.js';
import { styleSheet } from './component-style';


export class Web3Element extends LitElement {
  static get styles(){
    return styleSheet;
  }

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
          <span class="Web3-Title">Connect Your Wallet</span>
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
          <span class="Web3-Title">Pay With Crypto</span>
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
              <span class="Web3-Title">Your payment has been processed successfully</span>
              <button class="web3-close" @click=${()=>this._success(0)}>&times;</button>
            </header>
            <article class="demo-1-web3">
              <div class="ui-success">
                <svg viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Group-3" transform="translate(2.000000, 2.000000)">
                          <circle id="Oval-2" stroke="rgba(165, 220, 134, 0.2)" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                            <circle  class="ui-success-circle" id="Oval-2" stroke="#A5DC86" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                            <polyline class="ui-success-path" id="Path-2" stroke="#A5DC86" stroke-width="4" points="19 38.8036813 31.1020744 54.8046875 63.299221 28"></polyline>
                        </g>
                    </g>
                </svg>
              </div>
            </article>
          </web-dialog>
      <!-- failed -->
          <web-dialog name="failed" center>
            <header>
              <span class="Web3-Title">Transaction Failed</span>
              <button class="web3-close" @click=${()=>this._failed(0)}>&times;</button>
            </header>
            <article class="demo-1-web3">
              <div class="ui-error">
                <svg  viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Group-2" transform="translate(2.000000, 2.000000)">
                        <circle id="Oval-2" stroke="rgba(252, 191, 191, .5)" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                        <circle  class="ui-error-circle" stroke="#F74444" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                          <path class="ui-error-line1" d="M22.244224,22 L60.4279902,60.1837662" id="Line" stroke="#F74444" stroke-width="3" stroke-linecap="square"></path>
                          <path class="ui-error-line2" d="M60.755776,21 L23.244224,59.8443492" id="Line" stroke="#F74444" stroke-width="3" stroke-linecap="square"></path>
                      </g>
                  </g>
                </svg>
              </div>
            </article>
          </web-dialog>

       <!-- loading -->
          <web-dialog name="pending" center>
            <header>
              <span class="Web3-Title">Please wait your payment is being processed</span>
            </header>
            <article>
              <div class="load">
                <div class="lds-dual-ring"></div>
              </div>
            </article>
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
    
    window.addEventListener('click', function(e){ 
      if(!$dialog.contains(e.target)){
        e.preventDefault();
      }
    })

    if(n == 1){
      $dialog.setAttribute('open',true);
    }else {
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