
import React, { useState } from "react";
import PatientsComponent from "../components/ui/Patients";
import ConsultationsComponent from "../components/ui/Consultation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications] = useState([
    { id: 1, message: "New patient consultation request", time: "10 mins ago" },
    { id: 2, message: "Prescription requires review", time: "2 hours ago" },
  ]);

  const sidebarMenuItems = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      label: "Patients",
      value: "patients",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      label: "Consultations",
      value: "consultations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
  ];

  const Sidebar = ({ children, isHovered, setIsHovered }) => {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          ${isHovered ? "w-64" : "w-20"} 
          bg-white border-r shadow-lg transition-all duration-300 
          flex flex-col justify-between overflow-hidden relative group
        `}
      >
        {children}
      </div>
    );
  };

  const SidebarLink = ({ link, isHovered }) => {
    const { label, icon, active, onClick } = link;
    return (
      <button
        onClick={onClick}
        className={`
          w-full text-left px-4 py-2 rounded-lg transition-all duration-300 flex items-center
          ${
            active
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100 text-gray-700"
          }
          ${isHovered ? "justify-between" : "justify-center"}
        `}
      >
        <div className="flex items-center">
          {React.cloneElement(icon, {
            className: `h-5 w-5 ${isHovered ? "mr-3" : ""}`,
          })}
          {isHovered && <span className="whitespace-nowrap">{label}</span>}
        </div>
        {isHovered && active && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        )}
      </button>
    );
  };

  const renderDashboardContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-2 grid grid-cols-3 gap-4">
        {["Patient Intake", "E-Prescriptions", "Billing"].map(
          (title, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">Description for {title}</p>
            </div>
          )
        )}
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="border-b py-3 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <p className="text-sm font-medium">{notification.message}</p>
            <p className="text-xs text-gray-500">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardContent();
      case "patients":
        return <PatientsComponent />;
      case "consultations":
        return <ConsultationsComponent />;
      default:
        return <div className="p-6">Coming Soon</div>;
    }
  };

  const { toast } = useToast();
  const navigate = useNavigate();

  const logOut = async()=>{
    try{
      const token = localStorage.getItem('token');
      const url = String(import.meta.env.VITE_BACKEND)+"/doctor/logout";
      const response = await axios.get(url,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('res',response);
      if(response.status === 200){
        localStorage.clear();
        toast({
          title: "Logout Successful!",
          className: "bg-green-500 text-white"
        });
        navigate('/home');
      }
      else{ 
        toast({
          title: "Logout Unsuccessful !",
          description: "Error Occured!",
          variant: "destructive"
        });
      }
    }catch(err){
      console.error('Error at Logout',err);
    }
  }

  return (
    <div className="flex h-screen to-blue-600 bg-gray-50">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-center items-center">
            <h2
              className={`
              text-xl font-bold transition-all duration-300 
              ${isHovered ? "opacity-100 block" : "opacity-0 hidden"}
            `}
            >
              DoseWise
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`
                h-6 w-6 transition-all duration-300
                ${isHovered ? "opacity-0 hidden" : "opacity-100 block"}
              `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {sidebarMenuItems.map((item) => (
              <SidebarLink
                key={item.value}
                isHovered={isHovered}
                link={{
                  ...item,
                  active: activeTab === item.value,
                  onClick: () => setActiveTab(item.value),
                }}
              />
            ))}
          </nav>
          <div className="p-4 border-t space-y-2">
            <SidebarLink
              isHovered={isHovered}
              link={{
                label: "Settings",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              }}
            />
            <SidebarLink
              isHovered={isHovered}
              link={{
                label: "Logout",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                ),
                onClick: () => {
                  logOut();
                },
              }}
            />
          </div>
        </div>
      </Sidebar>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {sidebarMenuItems.find((item) => item.value === activeTab)?.label}
          </h1>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
              {notifications.length}
            </span>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default DoctorDashboard;
