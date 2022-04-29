import React, { useEffect, useState } from 'react';
import {Card,Button} from 'react-bootstrap';
import axios from 'axios';



export default function Header() {

    const [user,setUser] = useState([])
    const [search, setSearch] = useState()
    const [page, setPage] = useState(1)

    function nextPage() {
        setPage(page + 1)
    }

    function previousPage() {
        setPage(page - 1)
    }

    function paginate(array, pageSize, pageNumber) {
        return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    function searchData(val) {
        const data = JSON.parse(window.localStorage.getItem('users'))
        if (!data) {
            throw Error("Tunggu data selesai di download")
        }

        if (val) {
            setSearch(val)
            const filtered = data.filter(user => {
                const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
                return fullName.includes(val.toLowerCase()) 
            })
            const toPaginate = paginate(filtered, 4, 1)
            setPage(1)
            setUser(toPaginate)
        } else {
            const toPaginate = paginate(data, 4, 1)
            setPage(1)
            setUser(toPaginate)
        }
        
        
    }

    async function fetchFirstData() {
        const data = JSON.parse(window.localStorage.getItem('users'))
        if (data) {
            const toPaginate = paginate(data, 4, page)
            setUser(toPaginate)
        } else {
            const response = await axios.get(`https://randomuser.me/api/?results=50&page=${page}`)
            window.localStorage.setItem('users', JSON.stringify(response.data.results))
            const toPaginate = paginate(response.data.results, 4, page)
            setUser(toPaginate)
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (!search) {
               await fetchFirstData()
            }
        } 
        fetchData()
    }, [page, search]);

  return (
    <div>
        <div className='container-fluid mt-5'>
            <div className='row'>
                <div className='col-3'>
                    <ul>
                        <li><h4>Beranda</h4></li>
                        <li className='text-info mt-2'><h4>Personnel List</h4></li>
                        <li className='mt-2'><h4>Daily Attendance</h4></li>
                    </ul>
                </div>

                <div className='col-9 bg-secondary'>
                    <div className='bg-white'>
                    <div className='row mt-2'>
                        <div className='col-6'>
                            <h1 className='text-info'>PERSONNEL LIST</h1>
                            <h2>List of all personnels</h2>
                        </div>
                        <div className='col-6 mt-5 text-center'>
                            <input type="text" aria-label='search-bar' id='search bar' onInput={(e) => searchData(e.target.value)} />
                            <button className='bg-info text-white'>ADD PERSONNEL +</button>
                        </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-9'>
                    <div className='bg-white'>
                    <div className='row bg-secondary'>
                    {user.map(user => {
                        return (
                    <div className='col-3 mt-5 '>
                            <Card key={user.id} style={{ width: '18rem' }}>
                            <Card.Title>Personnel ID:</Card.Title>
                            <Card.Title>{user.id.value}</Card.Title>
                        <Card.Img variant="top" src={user.picture.medium}  />
                        <Card.Body>
                            <Card.Title>Name</Card.Title>
                            <Card.Text>{user.name.first} {user.name.last}</Card.Text>
                            <Card.Title>Telephone</Card.Title>
                            <Card.Text>{user.phone}</Card.Text>
                            <Card.Title>Birthday</Card.Title>
                            <Card.Text>{user.dob.date}</Card.Text>
                            <Card.Title>Email</Card.Title>
                            <Card.Text>{user.email}</Card.Text>
                        </Card.Body>
                        </Card>
                    </div>

                        )
                    })}
                    </div>    
                    </div>
                    
                    <div className='row bg-secondary'>
                        <div className='col-6 text-center mt-5 mb-3'>
                            <button onClick={() => previousPage()} disabled={page <= 1}><span>&#8701;</span> Previous Page</button>
                        </div>
                        <div className='col-6 text-center mt-5 mb-3'>
                            <button onClick={() => nextPage()} disabled={page > 4}>Next Page <span>&#8702;</span> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
