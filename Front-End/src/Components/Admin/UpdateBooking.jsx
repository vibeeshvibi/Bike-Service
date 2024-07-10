import React, { useState, useEffect } from 'react';
import Book from '../../Assets/application.jpg';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../Auth';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBooking() {
    useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const _id = sessionStorage.getItem("UpdateBookingID");
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        try {
            fetch("http://localhost:5000/viewbooking", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                    setEmail(data.data.email);
                    setStatus(data.data.status); // Set the initial status
                });
        } catch (error) {
            console.log(error);
        }
    }, [_id]);

    const handleBack = () => {
        navigate("../admincustbooking");
    }

    const handleUpdate = () => {
        if (data.status === "Completed" && status === "Completed") {
            toast.success("Already the Service is Completed");
        } else {
            try {
                fetch("http://localhost:5000/updatebooking", {
                    method: "POST",
                    crossDomain: true,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ _id, status, email }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status === "ok") {
                            toast.success("Updated Successfully");
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
        setTimeout(()=>navigate("../admincustbooking"),2000);
    }
    
    const handleCancel = () => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            fetch(`http://localhost:5000/addeletebooking/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'OK') {
                    toast.success("Booking canceled successfully");
                    setTimeout(()=>navigate('../admincustbooking'))
                } else {
                    toast.error("Error canceling booking");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                toast.error("Error canceling booking");
            });
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Update Booking</h1>
            <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                <form className="w-2/3 p-8">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-600 font-semibold mb-2">Date</label>
                            <input
                                type="text"
                                id="date"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.date}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.name}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email</label>
                            <input
                                type="text"
                                id="email"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.email}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-600 font-semibold mb-2">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.phone}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vname" className="block text-gray-600 font-semibold mb-2">Vehicle Name</label>
                            <input
                                type="text"
                                id="vname"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.vname}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vmodel" className="block text-gray-600 font-semibold mb-2">Vehicle Model</label>
                            <input
                                type="text"
                                id="vmodel"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.vmodel}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vno" className="block text-gray-600 font-semibold mb-2">Vehicle Number</label>
                            <input
                                type="text"
                                id="vno"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.vno}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="addr" className="block text-gray-600 font-semibold mb-2">Address</label>
                            <input
                                type="text"
                                id="addr"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.address}
                                readOnly
                            />
                        </div>
                        <div className="mb-4 col-span-2">
                            <label htmlFor="service" className="block text-gray-600 font-semibold mb-2">Service</label>
                            <textarea
                                id="service"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={data.service?.join(", ")}
                                readOnly
                            />
                        </div>
                        <div className="mb-4 col-span-2">
                            <label htmlFor="status" className="block text-gray-600 font-semibold mb-2">Status</label>
                            <select
                                id="status"
                                className="w-full p-3 border rounded-lg bg-gray-100"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Ready">Ready</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                            onClick={handleUpdate}
                        >
                            Update Service
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </form>
                <div className="w-1/2 flex justify-center items-center p-8">
                    <img src={Book} alt="book" className="max-h-full" />
                </div>
            </div>
            <ToastContainer
                position='bottom-center' 
                autoClose={2000}
                theme='dark'
            />
        </div>
    )
}

export default UpdateBooking;
