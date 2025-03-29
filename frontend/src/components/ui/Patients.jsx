// import React, { useState, useEffect } from 'react';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogDescription,
//   DialogFooter 
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const PatientsComponent = () => {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
//   const [suggestion, setSuggestion] = useState('');

//   useEffect(() => {
//     // Fetch patients from API
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch('/api/patients');
//         const data = await response.json();
//         setPatients(data);
//       } catch (error) {
//         console.error('Failed to fetch patients:', error);
//       }
//     };

//     fetchPatients();
//   }, []);

//   const handleSuggestionSubmit = async () => {
//     if (!selectedPatient) return;

//     try {
//       await fetch(`/api/patients/${selectedPatient._id}/suggestions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ suggestion })
//       });

//       setSuggestionModalOpen(false);
//       setSuggestion('');
//       setSelectedPatient(null);
//     } catch (error) {
//       console.error('Failed to submit suggestion:', error);
//     }
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <h2 className="text-2xl font-bold">Patient Management</h2>
      
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Patient Name</TableHead>
//               <TableHead>Current Disease</TableHead>
//               <TableHead>Past Diseases</TableHead>
//               <TableHead>Surgical History</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {patients.map((patient) => (
//               <TableRow key={patient._id} className="hover:bg-gray-50 transition-colors">
//                 <TableCell>{patient.name}</TableCell>
//                 <TableCell>{patient.currentDisease}</TableCell>
//                 <TableCell>
//                   {patient.pastDiseases && patient.pastDiseases.length > 0 
//                     ? patient.pastDiseases.join(', ') 
//                     : 'No past diseases'}
//                 </TableCell>
//                 <TableCell>
//                   {patient.surgicalHistory && patient.surgicalHistory.length > 0 
//                     ? patient.surgicalHistory.join(', ') 
//                     : 'No surgical history'}
//                 </TableCell>
//                 <TableCell>
//                   <Button 
//                     variant="outline"
//                     onClick={() => {
//                       setSelectedPatient(patient);
//                       setSuggestionModalOpen(true);
//                     }}
//                   >
//                     Suggest Treatment
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <Dialog open={suggestionModalOpen} onOpenChange={setSuggestionModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Treatment Suggestion for {selectedPatient?.name}</DialogTitle>
//             <DialogDescription>
//               Provide your recommendation for the patient's treatment.
//             </DialogDescription>
//           </DialogHeader>
          
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="suggestion" className="text-right">
//                 Suggestion
//               </Label>
//               <Input 
//                 id="suggestion"
//                 value={suggestion}
//                 onChange={(e) => setSuggestion(e.target.value)}
//                 className="col-span-3" 
//                 placeholder="Enter your treatment suggestion"
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button 
//               type="submit" 
//               onClick={handleSuggestionSubmit}
//             >
//               Submit Suggestion
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default PatientsComponent;

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PatientsComponent = () => {
  // Dummy patients data
  const [patients] = useState([
    {
      _id: "1",
      name: "John Doe",
      currentDisease: "Flu",
      pastDiseases: ["Cold", "Fever"],
      surgicalHistory: ["Appendix Removal"]
    },
    {
      _id: "2",
      name: "Jane Smith",
      currentDisease: "COVID-19",
      pastDiseases: ["Asthma"],
      surgicalHistory: []
    },
    {
      _id: "3",
      name: "Emily Johnson",
      currentDisease: "Diabetes",
      pastDiseases: [],
      surgicalHistory: ["Knee Surgery"]
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleSuggestionSubmit = () => {
    if (!selectedPatient) return;

    console.log(`Suggestion for ${selectedPatient.name}: ${suggestion}`);
    
    // Reset modal state
    setSuggestionModalOpen(false);
    setSuggestion('');
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Patient Management</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Current Disease</TableHead>
              <TableHead>Past Diseases</TableHead>
              <TableHead>Surgical History</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id} className="hover:bg-gray-50 transition-colors">
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.currentDisease}</TableCell>
                <TableCell>
                  {patient.pastDiseases.length > 0 
                    ? patient.pastDiseases.join(', ') 
                    : 'No past diseases'}
                </TableCell>
                <TableCell>
                  {patient.surgicalHistory.length > 0 
                    ? patient.surgicalHistory.join(', ') 
                    : 'No surgical history'}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setSuggestionModalOpen(true);
                    }}
                  >
                    Suggest Treatment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal for treatment suggestion */}
      <Dialog open={suggestionModalOpen} onOpenChange={setSuggestionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Treatment Suggestion for {selectedPatient?.name}
            </DialogTitle>
            <DialogDescription>
              Provide your recommendation for the patient's treatment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="suggestion" className="text-right">
                Suggestion
              </Label>
              <Input 
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="col-span-3" 
                placeholder="Enter your treatment suggestion"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleSuggestionSubmit}
            >
              Submit Suggestion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientsComponent;
