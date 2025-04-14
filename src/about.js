import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const About =()=>{
 const navig=useNavigate();

const [data,setData]=useState([]);


const handle=()=>{

  axios.get('http://localhost:5000/dishes')
  .then(resp => {
    setData(resp.data)
  })
  .catch(() => {
    console.log("error in api");
  });

 

}

const deleteid = (id)=>{
  axios.delete(`http://localhost:5000/dish/${id}`)

  .then(() => {
    handle();
  })
  .catch(() => {
    console.log("error in api");
  });
}

const Updateid=(rai)=>{
  navig('/update',{state:rai})
}


useEffect(() => {
  handle();
}, []);

  return(
<>




{

data.map(item=>(
<div >
  <li>{item.name}</li>
  <li>{item.price}</li>
  <li>{item._id}</li>
  <li >
<button onClick={() => deleteid(item._id)}>
  click
</button>
</li>
<li >
<button onClick={() => Updateid(item)}>
  update
</button>
</li>

</div>

))

}







</>
  )

};

export default About;