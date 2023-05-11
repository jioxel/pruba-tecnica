
import { User, sortBy } from "../models/users.model"

interface Props{
  users:User[]
  showColor: boolean
  handleDelete:(email:string)=>void
  handleSort:(sort:sortBy)=>void
}

export const UserComponent =({users, showColor , handleDelete,handleSort}:Props)=>{
     
     
     return <>
     <table className="table">
      <tr>
        <th >Photo</th>
        <th onClick={()=>handleSort(sortBy.SORTBYNAME)}>Name</th>
        <th onClick={()=>handleSort(sortBy.SORTBYLASTNAME)}>Lastname</th>
        <th onClick={()=>handleSort(sortBy.SORTBYCOUNTRY)}>Country</th>
        <th>Accions</th>
      </tr>
     {
       users.map((user,i)=>{
        const backgroundColor = i % 2 == 0 ? '#333': '#444';
        const color = showColor ? backgroundColor : 'transparent';
        return(
        <tr  key={user.email} style={{'backgroundColor':color}}>
         <td ><img src={user.picture.medium} alt={user.id.value} /></td>
         <td>{user.name.first}</td>
         <td>{user.name.last}</td>
         <td>{user.location.country}</td>
        <td><button onClick={()=>handleDelete(user.email)}>Borrar</button></td>
       </tr>)})
     }
     </table>
        
     </>
   }