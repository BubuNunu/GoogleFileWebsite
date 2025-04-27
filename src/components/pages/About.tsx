import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('about.title')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.description')}
        </Typography>
      </Container>
    </Box>
  );
};

export default About; 