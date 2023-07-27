import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'


export default function UserPage() {
    const [userData, setUserData] = useState([])
    const Navigate = useNavigate()

    const token = Cookies.get('token')
    const user = useParams().username
    
    useEffect(() => {
        if(!token){
            Navigate('/')
        }else{
            try{
                fetch(`http://localhost:8080/user/${user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    if(!res.ok){
                        console.log('if(!res.ok)')
                        Navigate('/')
                    }else{
                        console.log('else')
                    return res.json()
                    }
                })
                .then(data => {
                    console.log('test')
                    console.log(data); 
                    setUserData(data)
                })
            }catch(err){
                console.error('Failed to fetch')
            }
    }
    }, [token, user])


    return (
        <div className="text-red-500">HELLO TESTING</div>
    )
}
