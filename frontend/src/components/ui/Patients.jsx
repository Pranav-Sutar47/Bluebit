import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

const PatientsComponent = () => {
  // Dummy patients data
  const [patients,setPatients] = useState([]);

  const { toast } = useToast();

  useEffect(()=>{
    async function getPatient(){
      try{
          const token = localStorage.getItem('token');
          console.log(token);
        
              // Make API call
          const url = String(import.meta.env.VITE_BACKEND)+'/user/';
          const response = await axios.get(url,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
          });
          console.log(response);

          if(response.status === 200) 
            setPatients(response.data.data);
          else 
            setPatients([]);
      }catch(err){
        console.error('Error at getPatient',err);
      }
    }
    getPatient();
  },[]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleSuggestionSubmit = async() => {
    console.log(selectedPatient);
    if (!selectedPatient) return;
    try{
      const token = localStorage.getItem('token');
      let url = String(import.meta.env.VITE_BACKEND)+'/doctor/get-name/';
      const response = await axios.get(url,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const name = response.data.data.name;
      const msg = `Suggestion from ${name} Doctor:${suggestion}`;
      url = String(import.meta.env.VITE_BACKEND)+`/user/add-suggestion/${selectedPatient._id}`;
      const result = await axios.post(url,{suggestions:msg},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('result',result);
      if(result.status === 200)
        toast({
          title: "Suggestion Added Successful",
          className: "bg-green-500 text-white"
        });
      else 
        toast({
          title: "Suggestion Not Added",
          description: "Error Occured!",
          variant: "destructive"
        });

    }catch(err){
      console.error('Error at handleSuggestionSubmit',err);
    }finally{
      setSuggestionModalOpen(false);
      setSuggestion('');
      setSelectedPatient(null);
    }
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
              <TableHead>Allergy Information</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id} className="hover:bg-gray-50 transition-colors">
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.current_disease}</TableCell>
                <TableCell>
                  {patient.past_disease 
                    ? patient.past_disease 
                    : 'No past diseases'}
                </TableCell>
                <TableCell>
                  {patient.surgical_procedure 
                    ? patient.surgical_procedure 
                    : 'No surgical history'}
                </TableCell>
                <TableCell>
                  {patient.allergy_information 
                    ? patient.allergy_information 
                    : 'No Allergy Information'}
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
