
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import {  User, sortBy } from './models/users.model';
import { UserComponent } from './components/UserComponent';

function App() {
  const [users, setUsers]=useState<User[]>([]);
  const [showColor,setShowColor]=useState(false);

  const [sortyBy, setSortyBy] =useState<sortBy>(sortBy.NONE);


  const [value,setValue] = useState<string>('');

  const originalUsers = useRef<User[]>([])
  // creamos una referencia que guarda un valor
  
  const filterUsers= useMemo(()=>{
    return users.filter(user => user.location.country.toLocaleLowerCase().includes(value.toLowerCase()))
  },[users,value])

  
   const sorted =useMemo(()=>{
        if(sortyBy == sortBy.SORTBYCOUNTRY){
          return [...filterUsers].sort((a,b)=>{
                return a.location.country.localeCompare(b.location.country);
              })
        }else if(sortyBy == sortBy.SORTBYLASTNAME){
          return [...filterUsers].sort((a,b)=>{
            return a.name.last.localeCompare(b.name.last);
          })
        }else if(sortyBy == sortBy.SORTBYNAME){
          return [...filterUsers].sort((a,b)=>{
            return a.name.first.localeCompare(b.name.first);
          })
        }
        return filterUsers

      },[sortyBy,filterUsers])
  //   return sortyByCountry 
  //   ? [...filterUsers].sort((a,b)=>{
  //     // ? users.toSorted((a,b)=>{
  //     return a.location.country.localeCompare(b.location.country);
  //   })
  //   :filterUsers
  // },[sortyByCountry,filterUsers])

  const handleSort=(sort : sortBy)=>{
    setSortyBy(sort)
  }
  const handleDelete =(email:string)=>{
    const filterUsers = users.filter(user => user.email != email)
    setUsers(filterUsers);
  }

  const handleReset=()=>{
    setUsers(originalUsers.current)
  }
  const handleValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
  }


  useEffect(()=>{
    fetch('https://randomuser.me/api/?results=100')
    .then(async resp => await resp.json())
    .then((res)=> {
      setUsers(res.results)
      originalUsers.current=res.results
    })
  },[])

  
 
  return (
    <>
      <div>
        <button onClick={()=>setShowColor(!showColor)}>Show Color</button>
        <button onClick={()=>setSortyBy(sortBy.SORTBYCOUNTRY)}>Sorted by Country</button>
        <button onClick={handleReset}>Reset</button>
        <input type="text" value={value} onChange={handleValue}/>
      </div>
      {/* {console.log(originalUsers)} */}
      <UserComponent handleDelete={handleDelete} handleSort={handleSort} showColor={showColor} users={sorted}/>
      


    </>
  )
}

export default App
