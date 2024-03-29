import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51JvwUbHaybpCvMFtJNxh0IMGIDjGrbVCVW4A7Jrvz17Tt2BYxVGKHpPACLnmgoVr8vWfz7vcfKNoCnIDdfPqpGYW00zB1bvFPb')

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`https://stormy-wave-51397.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, [appointmentId])


    return (
        <div>
            <h2>Please pay for: {appointment?.patientName} for {appointment?.serviceName} </h2>
            <h4>Pay: {appointment?.price}</h4>
            {appointment.price && <Elements stripe={stripePromise}>
                <CheckoutForm 
                appointment = {appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;