import {Button, Card, Table} from 'flowbite-react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'




export default function History(){
  const [userHistory, setUserHistory] = useState([])
 
  const token = Cookies.get('token')
  const Navigate = useNavigate();

  useEffect((e) => {
    fetch('http://localhost:8080/history/:userid', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => {console.log(data); setUserHistory(data)})
  }, [])

    return (
    <>
        <div alt="Workout History" className='my-8 m-auto w-full'>
            <Table striped>
            <Table.Head>
                <Table.HeadCell>
                Product name
                </Table.HeadCell>
                <Table.HeadCell>    
                Color
                </Table.HeadCell>
                <Table.HeadCell>
                Category
                </Table.HeadCell>
                <Table.HeadCell>
                Price
                </Table.HeadCell>
                <Table.HeadCell>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Apple MacBook Pro 17"
                </Table.Cell>
                <Table.Cell>
                    Sliver
                </Table.Cell>
                <Table.Cell>
                    Laptop
                </Table.Cell>
                <Table.Cell>
                    $2999
                </Table.Cell>
                <Table.Cell>
                    <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                    >
                    </a>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <p>
                    Microsoft Surface Pro
                    </p>
                </Table.Cell>
                <Table.Cell>
                    White
                </Table.Cell>
                <Table.Cell>
                    Laptop PC
                </Table.Cell>
                <Table.Cell>
                    $1999
                </Table.Cell>
                <Table.Cell>
                    <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                    >
                    <p>
                        Edit
                    </p>
                    </a>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Magic Mouse 2
                </Table.Cell>
                <Table.Cell>
                    Black
                </Table.Cell>
                <Table.Cell>
                    Accessories
                </Table.Cell>
                <Table.Cell>
                    $99
                </Table.Cell>
                <Table.Cell>
                    <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                    >
                    </a>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <p>
                    Google Pixel Phone
                    </p>
                </Table.Cell>
                <Table.Cell>
                    Gray
                </Table.Cell>
                <Table.Cell>
                    Phone
                </Table.Cell>
                <Table.Cell>
                    $799
                </Table.Cell>
                <Table.Cell>
                    <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                    >
                    </a>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Apple Watch 5
                </Table.Cell>
                <Table.Cell>
                    Red
                </Table.Cell>
                <Table.Cell>
                    Wearables
                </Table.Cell>
                <Table.Cell>
                    $999
                </Table.Cell>
                <Table.Cell>
                    <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                    >
                    </a>
                </Table.Cell>
                </Table.Row>
            </Table.Body>
            </Table>
        </div>


        {/* <Routes>
            <Route path='history/' element={<History />} />
        </Routes> */}
    </>
)
}