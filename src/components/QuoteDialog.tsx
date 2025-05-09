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
  'featuredServices.airConditioning',
  'featuredServices.veu',
  'featuredServices.maintenance',
  'featuredServices.repairs'
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

  const translatedServiceTypes = serviceTypes.map(key => t(key));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('quoteDialog.errors.name');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('quoteDialog.errors.email.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('quoteDialog.errors.email.invalid');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('quoteDialog.errors.phone.required');
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t('quoteDialog.errors.phone.invalid');
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = t('quoteDialog.errors.serviceType');
    }
    
    if (!formData.postcode.trim()) {
      newErrors.postcode = t('quoteDialog.errors.postcode.required');
    } else if (!/^3\d{3}$/.test(formData.postcode)) {
      newErrors.postcode = t('quoteDialog.errors.postcode.invalid');
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
      // Show loading indicator or disable submit button here if needed
      
      // Make sure the API URL is properly formed for both development and production
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/submit-quote' 
        : 'http://localhost:3000/api/submit-quote';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit quote request');
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
        submit: error instanceof Error ? error.message : 'Failed to submit quote request. Please try again later.'
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
        <DialogTitle>{t('quoteDialog.title')}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {errors.submit && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.submit}
                </Alert>
              )}
              <TextField
                required
                label={t('quoteDialog.name.label')}
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name || t('quoteDialog.name.helper')}
                fullWidth
              />
              <TextField
                required
                label={t('quoteDialog.email.label')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || t('quoteDialog.email.helper')}
                fullWidth
              />
              <TextField
                required
                label={t('quoteDialog.phone.label')}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone || t('quoteDialog.phone.helper')}
                fullWidth
              />
              <TextField
                required
                select
                label={t('quoteDialog.serviceType.label')}
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                error={!!errors.serviceType}
                helperText={errors.serviceType || t('quoteDialog.serviceType.helper')}
                fullWidth
              >
                {translatedServiceTypes.map((option, index) => (
                  <MenuItem key={serviceTypes[index]} value={serviceTypes[index]}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                label={t('quoteDialog.postcode.label')}
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                error={!!errors.postcode}
                helperText={errors.postcode || t('quoteDialog.postcode.helper')}
                fullWidth
              />
              <TextField
                label={t('quoteDialog.message.label')}
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                helperText={t('quoteDialog.message.helper')}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>{t('quoteDialog.buttons.cancel')}</Button>
            <Button type="submit" variant="contained" color="primary">
              {t('quoteDialog.buttons.submit')}
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
          {t('quoteDialog.success')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuoteDialog; 