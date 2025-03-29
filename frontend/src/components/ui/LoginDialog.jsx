import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const RoleSelectionDialog = ({ open, onClose, userData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = async (role) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Update user role on backend
      // const response = await axios.patch(
      //   `${import.meta.env.VITE_BASEURL}users/update-role`, 
      //   { role },
      //   {
      //     headers: { 
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // );

      // Update local storage
      // const updatedUserData = { ...userData, role };
      // localStorage.setItem('userData', JSON.stringify(updatedUserData));

      // Navigate based on role
      if (role === 'Doctor') {
        navigate('/register');
      } else {
        navigate('/home');
      }

      toast({
        description: `Registered as ${role}`,
        className: "bg-green-500 text-white",
      });

      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update role",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Role</DialogTitle>
          <DialogDescription>
            Select how you'd like to use the platform
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            onClick={() => handleRoleSelection('doctor')}
            disabled={isLoading}
          >
            Register as Doctor
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleRoleSelection('user')}
            disabled={isLoading}
          >
            Continue as User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionDialog;