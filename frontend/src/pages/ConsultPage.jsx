import React, { useState, useEffect, useContext } from 'react';
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
import AppContext from '../context/AppContext'; // Adjust path as needed

const ConsultationsComponent = () => {
  const { user } = useContext(AppContext);
  const [activeDoctors, setActiveDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch active doctors
  useEffect(() => {
    const fetchActiveDoctors = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const url = String(import.meta.env.VITE_BASEURL) + 'doctors/active';
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setActiveDoctors(data.doctors || []);
        } else {
          console.error('Failed to fetch active doctors');
          // For demo/testing, use sample data if API fails
          setActiveDoctors([
            { _id: "1", name: "Dr. James Wilson", degree: "MD", specialization: "Cardiology", status: "available" },
            { _id: "2", name: "Dr. Sarah Chen", degree: "MBBS, DM", specialization: "Neurology", status: "available" },
            { _id: "3", name: "Dr. Michael Rodriguez", degree: "MD, PhD", specialization: "Oncology", status: "available" }
          ]);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Fallback sample data
        setActiveDoctors([
          { _id: "1", name: "Dr. James Wilson", degree: "MD", specialization: "Cardiology", status: "available" },
          { _id: "2", name: "Dr. Sarah Chen", degree: "MBBS, DM", specialization: "Neurology", status: "available" },
          { _id: "3", name: "Dr. Michael Rodriguez", degree: "MD, PhD", specialization: "Oncology", status: "available" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveDoctors();
  }, []);

  const handleJoinCall = async () => {
    if (!selectedDoctor) return;
    
    try {
      const token = localStorage.getItem('token');
      const url = String(import.meta.env.VITE_BASEURL) + 'calls/join';
      
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          doctorId: selectedDoctor._id,
          userId: user?._id
        })
      });
      
      // Handle successful call join - this could redirect to a video call page
      console.log(`Joining call with ${selectedDoctor.name}`);
      setCallModalOpen(false);
      
      // You might want to redirect to the call page here
      // window.location.href = `/call/${selectedDoctor._id}`;
      
    } catch (error) {
      console.error('Failed to join call:', error);
    }
  };

  return (
    <div className="space-y-6 p-20">
      <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading available doctors...</p>
          </div>
        </div>
      ) : activeDoctors.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center">
          <p className="text-yellow-700">No doctors are currently available. Please check back later.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeDoctors.map((doctor) => (
                <TableRow key={doctor._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.degree}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setCallModalOpen(true);
                      }}
                    >
                      Join Call
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={callModalOpen} onOpenChange={setCallModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Call with {selectedDoctor?.name}</DialogTitle>
            <DialogDescription>
              You are about to join a consultation with {selectedDoctor?.name}. 
              {selectedDoctor?.specialization && ` They specialize in ${selectedDoctor.specialization}.`}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex space-x-4">
            <Button 
              variant="default"
              onClick={handleJoinCall}
            >
              Join Call Now
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCallModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultationsComponent;