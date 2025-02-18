import React, {useState } from 'react'
import { RxActivityLog } from "react-icons/rx";

export default function AdminDashboard() {
  
  const [upcomingActivities, setupcomingActivities] = useState([])
  const user = sessionStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
   <div className="p-4 student-dashboard-container">
         <h1 className="mb-6 text-2xl font-bold text-blue-800">
           Hi, {userData.username}! 👋
         </h1>
   
         {/* Timeline Section */}
         <div className="p-5 bg-white">
           <h1 className="mb-4 text-lg font-bold text-gray-800">Timeline</h1>
           <div className="mb-4">
             <select
               name="option"
               className="w-full p-2 border border-gray-300 rounded-md shadow-sm activity_select_opt md:w-auto focus:ring-2 focus:ring-cyan-500 focus:outline-none"
             >
               <option value="">Next 7 days</option>
               <option value="">Next 30 days</option>
             </select>
           </div>
   
           <hr className="my-4 border-gray-300" />
   
           <div>
             {upcomingActivities.length > 0 ? (
               <div className="text-gray-800">
                 {" "}
                 
                 {upcomingActivities.map((activity, index) => (
                   <p key={index}>{activity}</p>
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center p-10 text-center text-gray-500">
                 <RxActivityLog className="mb-4 text-4xl" />
                 <p className="text-xl font-light">No activities</p>
               </div>
             )}
           </div>
         </div>
       </div>
  );
}

