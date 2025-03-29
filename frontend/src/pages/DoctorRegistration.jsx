import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import axios from 'axios';

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    licenseNumber: '',
    degree: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create FormData to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('specialization', formData.specialization);
    formDataToSend.append('licenseNumber', formData.licenseNumber);
    formDataToSend.append('degree', formData.degree);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      // Get the token from localStorage (assuming it's stored there after login)
      const token = localStorage.getItem('token');

      // Make API call
      const response = await axios.post('/api/doctors/register', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your profile has been created successfully.",
        variant: "success"
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      // Handle error
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const specializations = [
    'Cardiology', 
    'Neurology', 
    'Pediatrics', 
    'Orthopedics', 
    'Dermatology',
    'Oncology',
    'Psychiatry'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.01]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Med Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Dr. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="hover:border-blue-500 focus:border-blue-600 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select 
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev, 
                    specialization: value
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input 
                  id="licenseNumber"
                  name="licenseNumber"
                  placeholder="MED-12345"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="hover:border-blue-500 focus:border-blue-600 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree">Medical Degree</Label>
                <Input 
                  id="degree"
                  name="degree"
                  placeholder="MD, MBBS"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="hover:border-blue-500 focus:border-blue-600 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Degree</Label>
              <Input 
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4  file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:scale-[1.02] shadow-lg"
                size="lg"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorRegistration;