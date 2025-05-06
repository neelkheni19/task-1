import { useState, useEffect, useContext } from 'react'
import Form from './components/Form'
import './App.css'
import axios from 'axios'
import Count from './count'

function App() {
  const [data, setData] = useState([])
  const [cnt, setCnt] = useState(3)
  const [edit, setEdit] = useState(-1)
  const [rem1, setRem1] = useState(true)

  useEffect(() => {
    axios.get('/api/data')
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [cnt, edit, rem1])



  function removeItem(e) {
    console.log(e.target.id);
    axios.delete(`/api/delete/${e.target.id}`).then((res) => {
      console.log(`${e.target.id} removed`);
      console.log(res);

    }).catch(() => {
      console.log("somthing went wrong");
    })
      .finally(() => {
        setRem1(!rem1);
      })
    // setEdit(e.target.id)
  }

  function edit1(e) {
    setEdit(e.target.id)
  }

  function editItem(e) {
    const name = document.getElementById('name1').value
    const age = document.getElementById('age1').value
    const email = document.getElementById('email1').value
    console.log("name:" + name);
    console.log("age:" + age);
    console.log("email:" + email);

    axios.put(`/api/edit/${e.target.id}`, {
      id: e.target.id, name, age, email
    }).then(() => {
      console.log(`${e.target.id} updated`);

    }).catch(() => {
      console.log("somthing went wrong");
    })
      .finally(() => {
        setEdit(-1);
      })
  }


  return (
    <Count.Provider value={{ cnt, setCnt }}>
      <Form />
      <h1>data</h1>
      <div className=' justify-center item-center'>
        <table className=' bg-gray-100'>

          {data.map((item) => (
            <tr>

              {item.id == edit && (
                <>
                  <td className='px-10'><input type="text" placeholder={item.name} id='name1' /></td>
                  <td className='px-10'><input type="text" placeholder={item.age} id='age1' /></td>
                  <td className='px-10'><input type="text" placeholder={item.email} id='email1' /></td>
                  <td className='px-10'><button id={item.id} onClick={editItem}>Update</button></td>
                  <td></td>
                </>
              )}
              {item.id != edit && (
                <>
                  <td className='px-10'>{item.name}</td>
                  <td className='px-10'>{item.age}</td>
                  <td className='px-10'>{item.email}</td>
                  <td className='px-10'><button id={item.id} onClick={edit1}>Edit</button></td>
                  <td className='px-10'><button id={item.id} onClick={removeItem}>Remove</button></td>
                </>
              )
              }


            </tr>
          ))}
        </table>
      </div>
    </Count.Provider>
  )
}

export default App
