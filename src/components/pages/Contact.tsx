import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('contact.title')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('contact.contactInfo')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('contact.address')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('contact.phone')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('contact.email')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label={t('contact.form.name')}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label={t('contact.form.email')}
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label={t('contact.form.message')}
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                {t('contact.form.submit')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 