import React from 'react';
import "../styles/Tribes.css"
import { useFlow } from '@decentology/hyperverse-flow';
import { Link } from "react-router-dom"

const Nav = () => {
  let flow = useFlow();
  let account = flow.state.user;

  return (
    <nav>
      <Link to="/" className="logo">
        T
      </Link>
      <div className="right-nav">

        <a href="https://docs-hyperhack.decentology.com/learn-with-examples" target="_blank" rel="noreferrer" >About</a>

        {!account.loggedIn
          ?
          <button className="connect" onClick={flow.authenticate}>
            Connect Wallet
          </button>
          :
          <button className="connect">
            {account.addr.slice(0, 5) + "..." + account.addr.slice(account.addr.length - 5, account.addr.length)}
          </button>
        }
      </div>
    </nav>
  )
}

export { Nav };
