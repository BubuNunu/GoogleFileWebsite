import { Box, Container, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 6,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          {t('contact.title', 'Contact Us')}
        </Typography>
        <Box 
          sx={{ 
            backgroundColor: 'white',
            p: 6,
            borderRadius: 2,
            boxShadow: 1,
            maxWidth: 800,
            mx: 'auto',
            textAlign: 'center'
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
                {t('contact.openingHours', 'Opening Hours')}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box component="span" sx={{ mr: 2 }}>⏰</Box>
                {t('contact.hours.weekdays', 'Monday - Friday: 8:00 AM - 6:00 PM')}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box component="span" sx={{ mr: 2 }}>⏰</Box>
                {t('contact.hours.saturday', 'Saturday: 9:00 AM - 4:00 PM')}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <Box component="span" sx={{ mr: 2 }}>⏰</Box>
                {t('contact.hours.sunday', 'Sunday: Closed')}
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mt: 6, mb: 4 }}>
                {t('contact.contactInfo', 'Contact Information')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Box component="span" sx={{ mr: 2 }}>📞</Box>
                {t('contact.phone', '0412 345 678')}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="span" sx={{ mr: 2 }}>✉️</Box>
                {t('contact.email', 'info@dami-air.com')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact; 