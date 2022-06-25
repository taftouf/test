import { css} from 'lit';

export const styleSheet = css`
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
  
  .Web3-Title{
    color: black;
    font-size: 16px;
    font-weight: bold;
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

  .load{
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  
  .lds-dual-ring {
      display: inline-block;
      width: 80px;
      height: 80px;
    }
  .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #494949;
      border-color: #494949 transparent #494949 transparent;
      animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
  }
  /* Icon */
  .demo-1-web3 {
  width: 100%;
  height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
.ui-success,.ui-error {
	width: 100px; height: 100px;
	/*margin: 40px;*/
	/*border:1px solid #eee;*/
}

.ui-success{
	&-circle {
		stroke-dasharray: 260.75219024795285px, 260.75219024795285px;
    stroke-dashoffset: 260.75219024795285px;
    transform: rotate(220deg);
    transform-origin: center center;
		stroke-linecap: round;
		animation: ani-success-circle 1s ease-in both;
	}
	&-path {
		stroke-dasharray: 60px 64px;
    stroke-dashoffset: 62px;
		stroke-linecap: round;
		animation: ani-success-path .4s 1s ease-in both;
	}
}

@keyframes ani-success-circle {
	to{stroke-dashoffset: 782.2565707438586px;}
}

@keyframes ani-success-path {
	0% {stroke-dashoffset: 62px;}
	65% {stroke-dashoffset: -5px;}
	84%{stroke-dashoffset: 4px;}
	100%{stroke-dashoffset: -2px;}
}

.ui-error{
	&-circle{
		stroke-dasharray:260.75219024795285px, 260.75219024795285px;
		stroke-dashoffset: 260.75219024795285px;
		animation: ani-error-circle 1.2s linear;
	}
	&-line1{
		stroke-dasharray: 54px 55px;
		stroke-dashoffset: 55px;
		stroke-linecap: round;
		animation: ani-error-line .15s 1.2s linear both;
	}
	&-line2{
		stroke-dasharray: 54px 55px;
		stroke-dashoffset: 55px;
		stroke-linecap: round;
		animation: ani-error-line .2s .9s linear both;
	}
}

@keyframes ani-error-line{
	to { stroke-dashoffset: 0; }
}

 @keyframes ani-error-circle {
		0% {
				stroke-dasharray: 0, 260.75219024795285px;
				stroke-dashoffset: 0;
		}
		35% {
				stroke-dasharray: 120px, 120px;
				stroke-dashoffset: -120px;
		}
		70% {
				stroke-dasharray: 0, 260.75219024795285px;
				stroke-dashoffset: -260.75219024795285px;
		}
		100% {
				stroke-dasharray: 260.75219024795285px, 0;
				stroke-dashoffset: -260.75219024795285px;
		}
}
  `;
