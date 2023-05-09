
import { useEffect, useState } from 'react'
import './App.css'
import { Root, User } from './models/users.model';

const Row =({users}:{users:User[]})=>{
  return <>
  {
    users.map(user=><tr>
      <td><img src={user.picture.medium} alt={user.id.value} /></td>
      <td>{user.name.first}</td>
      <td>{user.name.last}</td>
      <td>{user.location.city}</td>
      <td>Button</td>
    </tr>)
  }
     
  </>
}
function App() {
  const [users, setUsers]=useState<User[]>([]);
  useEffect(()=>{
    fetch('https://randomuser.me/api/?results=10')
    .then(async resp => await resp.json())
    .then((res)=> {setUsers(res.results)})
  },[])

  return (
    <>
      <></>
      <table className="table">
      <tr>
        <th>Photo</th>
        <th>Name</th>
        <th>Lastname</th>
        <th>Country</th>
        <th>Accions</th>
      </tr>
      <Row users={users}/>
      </table>


    </>
  )
}

export default App
