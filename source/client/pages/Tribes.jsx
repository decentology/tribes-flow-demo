import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '@decentology/hyperverse-flow';
import { useTribes } from '@decentology/hyperverse-flow-tribes';
import * as Components from '../components';

const Tribes = () => {
  const flow = useFlow();
  const tribes = useTribes();
  const [currentTribe, setCurrentTribe] = useState()
  const navigate = useNavigate();
  let account = flow.state.user;
  console.log(account);

  useEffect(() => {
    const getCurrentTribe = async () => {
      try {
        const data = await tribes.getCurrentTribe(account.addr);
        setCurrentTribe(data)
      } catch { }
    }
    getCurrentTribe()
  }, [account])

  return (
    <main>
      <Components.Nav />
      <div className="hero">
        <div className="header">
          <h1>Tribes</h1>

          {!currentTribe
            ?
            <button className="join" onClick={() => { navigate('/all-tribes') }}>
              Join A Tribe
            </button>
            :
            <button className="join" onClick={() => navigate('/my-tribe')}>
              View Your Tribe
            </button>
          }

        </div>
      </div>
    </main>
  );
}

export { Tribes };