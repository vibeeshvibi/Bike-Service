import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import img from '../Assets/bike.webp'
import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.isEmail(email) && email !== '') {
      if (phone.length === 10) {
        if (pass === cpass && pass !== '' && cpass !== '') {
          if (validator.isStrongPassword(pass, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            try {
              fetch("http://localhost:5000/signup", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phone, pass }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status === "ok") {
                    toast.success("Register Successfully");
                    setTimeout(()=>navigate('../login'),2000);
                  } else {
                    toast.error("User Email or Phone Number Already Exist");
                  }
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            toast('Password is not strong enough. It should contain at least one lowercase, uppercase, number, symbol, and be at least 8 characters long.');
          }
        } else {
          toast.error('Password Mismatch');
        }
      } else {
        toast("Enter a valid phone number");
      }
    } else {
      toast('Enter a valid email!');
    }
  };

  return (
    <div className="mt-3 flex h-screen bg-white">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <form className="bg-white p-10 rounded shadow-2xl w-96" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center">Sign up</h2>
          <input
            type="text"
            placeholder="Email"
            className="mb-4 p-4 w-full border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="mb-4 p-4 w-full border rounded-lg"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-4 w-full border rounded-lg"
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-4 p-4 w-full border rounded-lg"
            onChange={(e) => setCPass(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-700"
          >
            Sign up
          </button>
          <p className="mt-6 text-center">
            Already have an account?{' '}
            <span
              onClick={() => { navigate('/login  '); }}
              className="text-blue-700 cursor-pointer "
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
      <div className="w-1/2 flex items-center justify-center ">
        <img src={img} alt="Bike" className="max-w-full h-auto" />
      </div>
      <ToastContainer
        position='bottom-center' 
        autoClose={2000}
        theme='dark'
      />
    </div>
  );
}

export default Signup;
