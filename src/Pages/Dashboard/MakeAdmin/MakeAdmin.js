import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';


const MakeAdmin = () => {
    const [success,setSuccess] = useState(false)
    const [email,setEmail] = useState('');
    const {token} = useAuth();


    const handleOnBlur = e => {
       setEmail(e.target.value);
    }

    const handleAdminSubmit = e =>{
        const user = {email}

        fetch('https://stormy-wave-51397.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setSuccess(true);
                }
            })

        e.preventDefault();
    }


    return (
        <div>
            <h2>Make an admin</h2>
            <form onSubmit={handleAdminSubmit}>
            <TextField
                    sx={{ width: '50%' }}
                    label="Email"
                    type="email"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
            {success && <Alert severity="success">Made Admin successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;