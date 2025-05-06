import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Count from '../count'




function FormSubmit() {
    // const [count, setCount] = useState(3)
    const {cnt, setCnt} = useContext(Count)
    function subAction(e) {
        e.preventDefault()
        const name = document.getElementById('name').value
        const age = document.getElementById('age').value
        const email = document.getElementById('email').value
        axios.post('http://localhost:3000/api/data2', {
            id: cnt,
            name: name,
            age: age,
            email: email
        })
            .then((response) => {
                setCnt(cnt + 1)
                console.log('Data sent successfully!')
                console.log(cnt, name, age, email)
                console.log(response.data)

                document.getElementById('name').value = ''
                document.getElementById('age').value = ''
                document.getElementById('email').value = ''
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });

    }



    return (

        <div className='flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100 py-0 my-0'>

            <h1 className=' text-4xl text-amber-600 py-0 my-0'>CURD form for student</h1>

            <form action="/submit" method='POST' onSubmit={subAction} >
                <div>
                    <label className="text-2xl" htmlFor="name">Name</label>
                    <input className='mx-5 border-2 rounded-md' type="text" id="name" />
               
                    <label className='text-2xl' htmlFor="age">Age</label>
                    <input className='mx-5 border-2 rounded-md' type="number" id="age" />
                
                    <label className='text-2xl' htmlFor="email">Email</label>
                    <input className='mx-5 border-2 rounded-md' type="email" id="email" />

                <button className=' rounded-md px-2 border-2 mx-5 text-xl my-0 py-0' type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default FormSubmit
