import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('projects.title')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[1, 2, 3, 4, 5, 6].map((project) => (
            <Grid item key={project} sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://via.placeholder.com/300x200?text=Project+${project}`}
                  alt={`Project ${project}`}
                />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {t(`projects.project${project}.title`)}
                  </Typography>
                  <Typography color="text.secondary">
                    {t(`projects.project${project}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects; 