import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedIcon from '@mui/icons-material/Verified';
import arcLogo from '../../assets/images/Licence logo/licence - australian-refrigeration-council-arc-logo-vector.svg';
import vbaLogo from '../../assets/images/Licence logo/licence - VBA.png';

const About = () => {
  const { t } = useTranslation();

  const capabilities = [
    t('about.team.capabilities.items.0'),
    t('about.team.capabilities.items.1'),
    t('about.team.capabilities.items.2'),
    t('about.team.capabilities.items.3')
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          {t('about.team.title')}
        </Typography>

        <Box sx={{ mb: 6 }}>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
            {t('about.team.intro')}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
            {t('about.team.experience')}
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <BuildIcon sx={{ mr: 1, color: 'primary.main' }} />
            {t('about.team.capabilities.title')}
          </Typography>
          <Grid container spacing={3}>
            {capabilities.map((capability, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CheckCircleOutlineIcon sx={{ color: 'success.main', mt: 0.5 }} />
                  <Typography variant="body1">{capability}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <VerifiedIcon sx={{ mr: 1, color: 'primary.main' }} />
            {t('about.team.licenses.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.team.licenses.intro')}
          </Typography>
          <Paper elevation={2} sx={{ p: 4, mt: 3 }}>
            <Grid container spacing={4}>
              {[
                {
                  name: t('about.team.licenses.arc.name'),
                  number: t('about.team.licenses.arc.number'),
                  logo: arcLogo,
                  alt: 'ARC Logo'
                },
                {
                  name: t('about.team.licenses.vba.name'),
                  number: t('about.team.licenses.vba.number'),
                  logo: vbaLogo,
                  alt: 'VBA Logo'
                }
              ].map((license, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      {license.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 3 }}>
                      License Number: {license.number}
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto',
                        '& img': {
                          width: '200px',
                          height: '60px',
                          objectFit: 'cover',
                          backgroundColor: 'white',
                          padding: '4px',
                          borderRadius: '4px',
                          transform: 'scale(1.2)'
                        }
                      }}
                    >
                      <img src={license.logo} alt={license.alt} />
                    </Box>
                  </Box>
                  {index < 1 && (
                    <Divider sx={{ display: { xs: 'block', sm: 'none' }, my: 3 }} />
                  )}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 