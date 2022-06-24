import {html, css, LitElement} from 'lit';
import 'web-dialog';

export class ModalConnect extends LitElement {
  
  static get styles() {
      return css`
        :host {
          font-family: Arial, Helvetica, sans-serif;
        }
        `
    }

    render() {
        return html`
          <web-dialog open center>
            <header>
              <h3>Connect Your Wallet</h3>
            </header>
            <article>
              <button>Metamask</button>
            </article>
            <article>
              <button>Metamask</button>
            </article>
            <footer>
              <button @click=${this.close}>close</button>
            </footer>
          </web-dialog>
        `;
      }

      close(){
        const $dialog = document.querySelector("web3-element").shadowRoot.querySelector('modal-connect').shadowRoot.querySelector('web-dialog');
        $dialog.removeAttribute('open');
        this.modal = false;
        }
}
customElements.define('modal-connect', ModalConnect);