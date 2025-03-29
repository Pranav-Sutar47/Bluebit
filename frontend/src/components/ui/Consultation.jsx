// import React, { useState, useEffect } from 'react';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogDescription,
//   DialogFooter 
// } from "@/components/ui/dialog";

// const ConsultationsComponent = () => {
//   const [isDoctorAvailable, setIsDoctorAvailable] = useState(false);
//   const [activeUsers, setActiveUsers] = useState([]);
//   const [callRequestModalOpen, setCallRequestModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleDoctorAvailability = async (available) => {
//     setIsDoctorAvailable(available);

//     if (available) {
//       try {
//         const response = await fetch('/api/active-users');
//         const data = await response.json();
//         setActiveUsers(data);
//       } catch (error) {
//         console.error('Failed to fetch active users:', error);
//       }
//     }
//   };

//   const handleCallRequest = async (action) => {
//     if (!selectedUser) return;

//     try {
//       await fetch('/api/call-request', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           userId: selectedUser._id, 
//           action 
//         })
//       });

//       setCallRequestModalOpen(false);
//       setSelectedUser(null);
//     } catch (error) {
//       console.error('Failed to process call request:', error);
//     }
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <h2 className="text-2xl font-bold mb-6">Consultations Management</h2>
      
//       {!isDoctorAvailable ? (
//         <div className="flex justify-center space-x-4">
//           <Button 
//             variant="default" 
//             size="lg"
//             onClick={() => handleDoctorAvailability(true)}
//           >
//             Set Available
//           </Button>
//         </div>
//       ) : (
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {activeUsers.map((user) => (
//                 <TableRow key={user._id} className="hover:bg-gray-50 transition-colors">
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>
//                     <span className={`
//                       px-3 py-1 rounded-full text-xs font-medium
//                       ${user.status === 'available' 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-yellow-100 text-yellow-800'}
//                     `}>
//                       {user.status}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     {user.status === 'available' && (
//                       <Button 
//                         variant="outline"
//                         onClick={() => {
//                           setSelectedUser(user);
//                           setCallRequestModalOpen(true);
//                         }}
//                       >
//                         Call Request
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}

//       <Dialog open={callRequestModalOpen} onOpenChange={setCallRequestModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Call Request for {selectedUser?.name}</DialogTitle>
//             <DialogDescription>
//               Choose to join the call or reject the request.
//             </DialogDescription>
//           </DialogHeader>
          
//           <DialogFooter className="flex space-x-4">
//             <Button 
//               variant="default"
//               onClick={() => handleCallRequest('join')}
//             >
//               Join Call
//             </Button>
//             <Button 
//               variant="destructive"
//               onClick={() => handleCallRequest('reject')}
//             >
//               Reject Call
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ConsultationsComponent;

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";

const ConsultationsComponent = () => {
  const [isDoctorAvailable, setIsDoctorAvailable] = useState(false);
  const [activeUsers, setActiveUsers] = useState([
    { _id: "1", name: "Alice Brown", status: "available" },
    { _id: "2", name: "Bob Smith", status: "busy" },
    { _id: "3", name: "Charlie Johnson", status: "available" }
  ]);
  const [callRequestModalOpen, setCallRequestModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDoctorAvailability = (available) => {
    setIsDoctorAvailable(available);
  };

  const handleCallRequest = (action) => {
    if (!selectedUser) return;
    console.log(`Call request for ${selectedUser.name}: ${action}`);
    setCallRequestModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-6">Consultations Management</h2>
      
      {!isDoctorAvailable ? (
        <div className="flex justify-center space-x-4">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => handleDoctorAvailability(true)}
          >
            Set Available
          </Button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeUsers.map((user) => (
                <TableRow key={user._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${user.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'}
                    `}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.status === 'available' && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setCallRequestModalOpen(true);
                        }}
                      >
                        Call Request
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={callRequestModalOpen} onOpenChange={setCallRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Request for {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Choose to join the call or reject the request.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex space-x-4">
            <Button 
              variant="default"
              onClick={() => handleCallRequest('join')}
            >
              Join Call
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleCallRequest('reject')}
            >
              Reject Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultationsComponent;
