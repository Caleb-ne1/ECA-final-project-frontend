import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { FaUser } from "react-icons/fa";

function ViewUserDetails() {
    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        email: "",
        phone: "",
        username: "",
        role: "",
        institution_id: "",
        program_of_study: "",
        year_of_study: "",
    });

    //get id from url
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id")

    // fetch details by id
    const fetch_user_details = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/user/me/${id}`
            );
        
            if(response.status === 200) {
                const data = response.data.user;

                setUser({
                        id: data.id,
                        FirstName: data.FirstName,
                        LastName: data.LastName,
                        email: data.email,
                        phone: data.phone,
                        username: data.username,
                        role: data.role,
                        institution_id: data.institution_id,
                        program_of_study: data.program_of_study,
                        year_of_study: data.year_of_study
                    })
            }

        } catch (error) {
            console.error("Error fetching user details", error)
        }
    }

    useEffect(() => {
        fetch_user_details()
    }, [])

  return (

    <div>
    {user && (
    <div className="mt-20 pl-10 pr-10 overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-gray-600 rounded-lg ">
            <div className='pl-6'>
                <h4 className='text-white'>User details</h4>
            </div>
            <div className='flex flex-row items-center gap-2 pr-6'>
                <FaUser className="text-white text-3xl" />
                <p className="text-white font-medium">{user.role}</p>
            </div>
        </div>

      {/* Personal information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4 personal_info_group">
          <div>
            <p className="font-semibold">First Name</p>
            <p>{user.FirstName}</p>
          </div>
          <div>
            <p className="font-semibold">Last Name</p>
            <p>{user.LastName}</p>
          </div>
          <div>
            <p className="font-semibold">Email Address</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone</p>
            <p>{user.phone}</p>
          </div>
        </div>

        {/* academic information */}
        <h2 className="text-lg font-semibold mt-6 mb-4">Academic Information</h2>
        <div className="grid grid-cols-2 gap-4 academic_info_group">
          <div>
            <p className="font-semibold">Institution ID</p>
            <p>{user.institution_id}</p>
          </div>
          <div>
            <p className="font-semibold">Program Of Study</p>
            <p>Diploma in Software Engineering</p>
          </div>
          
          <div>
            <p className="font-semibold">Year Of Study</p>
            <p>{user.year_of_study}</p>
          </div>
        </div>
      </div>

      {/* edit user */}
      <a href={`/edit?id=${user.id}`} className='text-blue-700 underline pl-6 mt-10 mb-10'>Edit</a>
    </div>
    )}
    </div>
  )
}

export default ViewUserDetails