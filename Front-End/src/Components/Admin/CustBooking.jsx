import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../Auth';

function CustBooking() {
    useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);

    const FetchAll = () => {
        setStatus(null);
    }

    const FetchPending = () => {
        setStatus("Pending");
    }

    const FetchReady = () => {
        setStatus("Ready");
    }

    const FetchCompleted = () => {
        setStatus("Completed");
    }

    useEffect(() => {
        try {
            fetch("http://localhost:5000/custbooking", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }).then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    const updateservice = (_id) => {
        sessionStorage.setItem("UpdateBookingID", _id);
        navigate(`../updatebooking`);
    }


    return (
        <div className="min-h-screen p-8 ">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Status Checking</h1>
            <div className="flex justify-between mb-6">
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={FetchAll}
                >
                    All
                </button>
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={FetchPending}
                >
                    Pending
                </button>
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={FetchReady}
                >
                    Ready
                </button>
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={FetchCompleted}
                >
                    Complete
                </button>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full bg-white">
                        <thead className=" bg-gray-300">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle NO</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((row) => (
                                <tr key={row._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-4 whitespace-nowrap">{row.vno}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.date}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.name}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.service.join(", ")}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.status}</td>
                                    <td className="px-4 py-4 whitespace-nowrap ">
                                        <button
                                            className="bg-blue-500 w-18 text-white py-2 px-6 rounded shadow hover:bg-blue-600"
                                            onClick={() => updateservice(row._id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CustBooking;
