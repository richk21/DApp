import { createContext, useEffect, useRef, useState } from 'react'
import abi from "./contractJson/chai.json";
import { ethers } from 'ethers';
import Memos from './components/Memos';
import Buy from './components/Buy';
import 'normalize.css';


export const ScrollContext = createContext();
function App() {
  const memosRef = useRef(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  })

  const scrollToMemos=()=>{
    memosRef.current.scrollIntoView({behavior:'smooth'});
  };

  const [account, setAccount] = useState('not connected');
  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x6655f61435aB490aeA653fD30c1C992c9cb9d74e";
      const contractABI = abi.abi;

      // METAMASK
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        /* window.ethereum.on("accountsChanged", ()=>{
          window.location.reload;
        }) */
        
        setAccount(account)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("Account1:", signer);

        const contract = new ethers.Contract(
          contractAddress, // to reach sc
          contractABI, // to talk to sc
          signer // to do transaction on sc
        )
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        alert(error);
      }
    }
    template();
  }, [])

  return (
    <div className="App" style={{ padding: 0, marginTop:0, backgroundColor:"#ddd2cf"}}>
      <ScrollContext.Provider value={scrollToMemos}>
      <div style={{ margin: 0, padding: 0 }}>
        <Buy state={state} scrollToMemos={scrollToMemos}/>
      </div>
      <div ref={memosRef}>
      <Memos state={state} />
      </div>
      </ScrollContext.Provider>
    </div>
  )
}

export default App;