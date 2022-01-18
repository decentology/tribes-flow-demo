import React from 'react';
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Tribes.css'
import * as Components from '../components';
import { useTribes } from '@decentology/hyperverse-flow-tribes';
import { useFlow } from '@decentology/hyperverse-flow';

const AllTribes = () => {
  const navigate = useNavigate();
  const flow = useFlow();
  const tribesModule = useTribes();
  const [isLoading, setIsLoading] = useState(false)
  const [loaderMessage, setLoaderMessage] = useState('Processing...')
  const [allTribes, setAllTribes] = useState([])

  let account = flow.state.user;

  const joinTribe = async (tribeName) => {
    try {
      setIsLoading(true)
      setLoaderMessage('Intitializing Transaction...')
      const transactionId = await tribes.joinTribe(tribeName);

      setLoaderMessage('Joining Tribe...')

      await fcl.tx(transactionId).onceSealed()
      setIsLoading(false)
      navigate('/my-tribe')
    } catch (e) {
      console.log(e);
    }
  }

  const getAllTribes = async () => {
    console.log("In getAllTribes.");
    try {
      setIsLoading(true)
      setLoaderMessage('');
      console.log(tribesModule);
      const tribes = await tribesModule.getAllTribes();
      console.log()
      let allTribes = []
      for (let i = 0; i < Object.keys(tribes).length; i++) {
        let data = tribes[i]
        allTribes.push({
          id: i,
          name: data.name,
          image: data.ipfsHash,
          description: data.description,
        })
      }
      setAllTribes(allTribes);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (tribesModule !== undefined) {
      getAllTribes();
    }
  }, [])

  return (
    <main>
      <Components.Nav />
      {isLoading
        ?
        <Components.Loader loaderMessage={loaderMessage} />
        :
        <div className="container">
          <h1>Tribes</h1>
          {
            !allTribes
              ?
              <div>
                <h5>There are currently no existing tribes.</h5>
                <a href="/">Go back home</a>
              </div>
              :
              account
                ?
                <div>
                  <h5>Select Your Tribe</h5>
                  <div className="all-tribes">
                    {allTribes.map((item) => (
                      <div key={item.id} onClick={() => { joinTribe(item.name) }}>
                        <img className="cards" src={`https://ipfs.infura.io/ipfs/${item.image}/`} alt={item.name} />
                      </div>
                    ))}
                  </div>
                </div>
                : null
          }
        </div>
      }
    </main>
  );
}

export { AllTribes };
