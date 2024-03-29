
import './App.css';
import {useState} from 'react'
import db from './firebase';
import {addDoc,collection,getDocs} from 'firebase/firestore';

function App() {
  const[firstname , setfirstname]= useState("");
  const[lastname , setlastname]= useState("");
  const[company , setcompany]= useState("");
  const[email , setEmail]= useState("");
  const[password , setpassword]= useState("");
  const[confirmpass , setconfirmpass]= useState("");
  const[address , setaddress]= useState("");
  const[city , setcity]= useState("");
  const[state , setstate]= useState("");
  
  const[store,setstore]=useState([])
    
        const getdata=async()=>{
            const querySnapshot = await getDocs(collection(db, "firedb"));
            let totaldata=[];
            querySnapshot.forEach((doc) => {
            totaldata.push(doc.data());
            });
            setstore(totaldata);
        };       

  const handle= async()=>{
    const docRef = await addDoc(collection(db, "firedb"), {
      Firstname: firstname,
      Lastname:lastname,
      Company:company,
      Email:email,
      Password:password,
      Confirmpass:confirmpass,
      Address:address,
      City:city,
      State:state
    });
     console.log(await docRef)
      }
    
  return (
   
    <div className="Main">
      <div className="App">
      <div className="mainf">
      <div className="first">
      <lable>First Name</lable>
      <input onChange={e=>{setfirstname(e.target.value)}}></input>
      <br></br>
      
      {firstname.length === 0 ?  <p id='f1'>please Enter First name</p> :firstname.length >= 25? <p id='f1'>please enter below 25 characters</p> : ""}
      <lable>Last Name</lable>
      <input  onChange={e=>{setlastname(e.target.value)}}></input>
      <br></br>
      {lastname.length === 0 ?  <p id='f2'>please Enter Last name</p> :lastname.length >= 25? <p id='f2'>please enter below 25 characters</p> : ""}
      </div>
      <br></br>
      <br></br>
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <lable>Company</lable>
      <input onChange={e=>{setcompany(e.target.value)}}></input>
      <br></br>
      {company.length === 0 ?  <p id='f3'>please Enter your company name</p>  :company.length >= 50? <p id='f3'>please enter below 50 characters</p> : ""}
      <lable>Email Address</lable>
      <input onChange={e=>{setEmail(e.target.value)}}></input>
      <br></br>
      {email.length === 0 ?  <p id='f4'>please Enter your Email</p> :email.includes("@gmail.com")? "" :  <p id="f4">please enter valid email</p>}
      </div>
      <br></br>
      <br></br>
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <lable>Password</lable>
      <input onChange={e=>{setpassword(e.target.value)}}></input>
      <br></br>
      {password.length === 0 ?  <p id='f5'>please Enter your password</p>  : ""}
      <lable>Confirm Password</lable>
      <input onChange={e=>{setconfirmpass(e.target.value)}}></input>
      <br></br>
      {confirmpass.length === 0 ?  <p id='f6'>please Enter the same password</p> :password != confirmpass ? <p id='f6'>please Enter the correct password</p> : ""}
      </div>
      <br></br>
      <br></br>
      <div >
      <lable>Address</lable>
      <input style={{width:"50%"}} onChange={e=>{setaddress(e.target.value)}}></input>
      <br></br>
      {address.length === 0 ?  <p id='f7'>please Enter your address</p>  :address.length >= 75? <p id='f7'>please enter below 75 characters</p> : ""}
      </div>
      <br></br>
      <br></br>
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <lable>City</lable>
      <input onChange={e=>{setcity(e.target.value)}}></input>
      <br></br>
      {city.length === 0 ?  <p id='f8'>please Enter your city</p> :city.length >= 50? <p id='f8'>please enter below 50 characters</p> : ""}
      <lable>State</lable>
      <input onChange={e=>{setstate(e.target.value)}}></input>
      <br></br>
      {state.length === 0 ?  <p id='f9'>please Enter your state</p>  :state.length >= 25? <p id='f9'>please enter below 25 characters</p> : ""}
      </div>
      <br></br>
      <br></br>
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <button onClick={()=>{getdata()}}>Preview</button>
      <button onClick={()=>{handle()}}>Add</button>
      <button >Clear</button>
      </div>
      </div>
      
    </div>
    <div style={{position :"absolute" ,marginTop:"5%"}}>
            <table style={{width:"100%"}}>
  <tr>
    <th>First Name <br></br>(Company)</th>
    <th>Last Name</th>
    <th>Address</th>
    <th>Action</th>
  </tr>
  {store.map(k=>(
  <tr>
    
    
<td>{k.Firstname+"("+k.Company+")"}</td>
   <td>{k.Lastname}</td>
    <td>{k.Address+","+k.City+","+k.State}</td>
    <td></td>  
  </tr>
  ))}
  </table>
  <button>Export CSV</button>
 
        </div>
        
    </div>
    
  );
}

export default App;
