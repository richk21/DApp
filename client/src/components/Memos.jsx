import { useEffect, useState } from "react";
import './Memos.css';

const Memos=({state})=>{
    
    const [memos, setMemos] = useState([]);
    const {contract} = state;

    useEffect(()=>{
        const memosMessage = async()=>{
            const memos = await contract.getMemos();
            setMemos(memos)
            console.log("These are the memos: ",memos);
        }
        contract && memosMessage();
    },[contract])


    return(
        <div className="container">
            <h3 style={{ color: "#5f2e20", fontSize:'50px', fontWeight:'700', marginLeft:'20px', marginBottom:'40px'}}>My memos</h3>
        <table className="  coffee-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Date</th>
                <th>From</th>
            </tr>
            </thead>
            <tbody>
            {memos.map((memo, index) => (
                <tr key={index}>
                <td>{memo.name}</td>
                <td>{memo.message}</td>
                <td>{new Date(Number(memo.timestamp) * 1000).toLocaleString()}</td>
                <td>{memo.from}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>


    )

}

export default Memos;