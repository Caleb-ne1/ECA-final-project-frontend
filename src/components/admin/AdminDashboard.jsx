import React from 'react'

export default function AdminDashboard() {
  
  const user = sessionStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
    <div className="pt-16">
      <h1 className="pl-5 font-bold">Hi, {userData.username}! 👋</h1>

      <div>
        <h1>Upcoming activities</h1>
        <div>

        </div>
      </div>
    </div>
  );
}

