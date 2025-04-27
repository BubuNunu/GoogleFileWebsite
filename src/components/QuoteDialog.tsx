import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface QuoteDialogProps {
  open: boolean;
  onClose: () => void;
}

const serviceTypes = [
  'Victorian Energy Upgrades (VEU)',
  'Installation',
  'Service and maintenance',
  'Repair'
];

const QuoteDialog: React.FC<QuoteDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    postcode: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Service type is required';
    }
    
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    } else if (!/^3\d{3}$/.test(formData.postcode)) {
      newErrors.postcode = 'Please enter a valid Melbourne postcode (3000-3999)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setSnackbarOpen(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        postcode: '',
        message: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit quote request. Please try again later.'
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Request a Quote</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name || "Please enter your full name"}
                fullWidth
              />
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || "We'll use this email to send you the quote"}
                fullWidth
              />
              <TextField
                required
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone || "Enter a 10-digit mobile number (e.g., 0412345678)"}
                fullWidth
              />
              <TextField
                required
                select
                label="Service Type"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                error={!!errors.serviceType}
                helperText={errors.serviceType || "Select the type of service you're interested in"}
                fullWidth
              >
                {serviceTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                label="Property Postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                error={!!errors.postcode}
                helperText={errors.postcode || "Enter your Melbourne property postcode (3000-3999)"}
                fullWidth
              />
              <TextField
                label="How can we help?"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                helperText="Optional: Provide any additional details about your requirements"
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Quote request submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuoteDialog; 