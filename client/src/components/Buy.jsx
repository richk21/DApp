import { ethers } from "ethers";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiUser, FiMessageCircle, FiChevronDown } from 'react-icons/fi';
import './Buy.css';
import coffee from '../assets/coffee.png';
import coffeeicon from "../assets/coffeeicon.png";
import { ScrollContext } from "../App";
import { useContext, useEffect, useState } from "react";

const Buy=({state})=>{

  const scrollToMemos = useContext(ScrollContext);  
  const [buttonVisible, setButtonVisible] = useState(false);

  /* useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.pageYOffset === 0);
      setButtonVisible(!isTopOfPage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTopOfPage]); */
  useEffect(() => {
    const handleScroll = () => {
      const isTopOfPage = window.pageYOffset === 0;
      setButtonVisible(isTopOfPage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMemosClick = () => {
    scrollToMemos();
  };
  const handleButtonClick = async() => {
    await handleMemosClick();
    setButtonVisible(false);
  };
  
    const buyChai = async(event)=>{
        event.preventDefault();
        try{
            console.log("pass1");
            const {contract} = state;
            console.log("STATE: ",contract.buyChai("", ""))
            const name = document.getElementById("name").value;
            const message = document.getElementById("message").value;

            console.log("pass2");
            const amount = {value: ethers.parseEther("0.0001")};

            console.log("pass21");
            const transaction = await contract.buyChai(name, message, amount); //failing line
            await transaction.wait()

            console.log("NAME: ",name," MESGAE: ",message, "AMOUNT: ", amount);
            alert("Transaction Successful!");
        }catch(error){
            console.log("ERROR HERE: "+error);
        }
        
    }

    return (
        <>
        <div className="custom-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", marginLeft:'10%' }}>
          <img src={coffeeicon} height={60} width={60}/>
          <h1 style={{ color: "white", fontSize:'50px', fontWeight:'700', marginLeft:'20px'}}>Brew Notes</h1>
          </div>
          <ul className="list-container" style={{ padding: 0, listStyleType: "none", display: "flex" }}>
            <li className="list-item-container" style={{ marginLeft: "10px" }}>
              <a className="link" href="#">Home</a>
            </li>
            <li className="list-item-container" style={{ marginLeft: "10px" }}>
              <a onClick={handleMemosClick} className="link">Memos</a>
            </li>
          </ul>
        </div>

        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
          <div className="d-flex align-items-center justify-content-center">
            <div className="text-center mr-5">
              <img src={coffee} height={"80%"} width={"80%"} style={{marginLeft:"35%"}}alt="Brew" />
            </div>
            <div className="custom-container"  style={{ marginLeft: "10%", marginRight:'1.5%' }}>
                <div className="form-custom-container" style={{ height: "100%" }}>
            <h4 style={{ color: "white",  fontFamily: "'Poppins', sans-serif", margin:'40px'}}>Brew me a message!</h4>
              <Form onSubmit={buyChai}>
                <Form.Group controlId="name" className="w-100">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{margin:10}}>
                        <FiUser/>
                      </span>
                    </div>
                    <Form.Control type="text" required placeholder="Your name" style={{borderRadius:10}}/>
                  </div>
                </Form.Group>
                <Form.Group controlId="message" className="w-100">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{margin:10}}>
                        <FiMessageCircle/>
                      </span>
                    </div>
                    <Form.Control type="text" required placeholder="Your message" style={{borderRadius:10}} />
                  </div>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!state.contract} className="coffee-button">
                  Send
                </Button>
              </Form>
              </div>
            </div>
          </div>
          </div>
          {buttonVisible && (
          <div className="circle-button" onClick={handleButtonClick}>
            <FiChevronDown style={{color:"white"}} />
          </div>
          )}
        </>
      );      
}   

export default Buy;