import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  Chip,
  Stack,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Engineering,
  CheckCircle,
  LocalOffer,
  Timer,
  Star
} from '@mui/icons-material';

interface ProjectItem {
  id: string;
  category: string;
}

const Projects = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedProject, setSelectedProject] = useState(0);
  const location = useLocation();
  const drawerWidth = 280;

  const projects: ProjectItem[] = [
    { id: 'installation', category: 'installation' },
    { id: 'maintenance', category: 'maintenance' },
    { id: 'repairs', category: 'repairs' },
    { id: 'veu', category: 'veu' },
    { id: 'new-homes', category: 'newHomes' }
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const projectIndex = projects.findIndex(project => project.id === id);
      if (projectIndex !== -1) {
        setSelectedProject(projectIndex);
      }
    }
  }, [location.hash]);

  const getTranslatedArray = (path: string): string[] => {
    const translatedValue = t(path, { returnObjects: true });
    return Array.isArray(translatedValue) ? translatedValue : [];
  };

  const projectContent = (project: ProjectItem) => {
    const features = getTranslatedArray(`services.${project.category}.features.list`);
    const benefits = getTranslatedArray(`services.${project.category}.benefits.list`);
    const includes = getTranslatedArray(`services.${project.category}.includes.list`);

    return (
      <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
        <Paper elevation={3} sx={{ overflow: 'hidden', mb: 4 }}>
          <CardMedia
            component="img"
            height="400"
            image={`https://via.placeholder.com/300x200?text=${project.category}`}
            alt={t(`services.${project.category}.title`)}
            sx={{ objectFit: 'cover' }}
          />
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t(`services.${project.category}.title`)}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              {t(`services.${project.category}.description`)}
            </Typography>

            <Grid container spacing={4}>
              {/* Key Features */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Engineering sx={{ mr: 1 }} /> {t('common.keyFeatures')}
                  </Typography>
                  <List>
                    {features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <CheckCircle color="primary" sx={{ mr: 1, fontSize: '0.8rem' }} />
                        <Typography variant="body2">{feature}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>

              {/* Benefits */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ mr: 1 }} /> {t('common.benefits')}
                  </Typography>
                  <List>
                    {benefits.map((benefit, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <CheckCircle color="primary" sx={{ mr: 1, fontSize: '0.8rem' }} />
                        <Typography variant="body2">{benefit}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Service Details */}
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Chip
                  icon={<Timer />}
                  label={`${t('common.timeline')}: ${t(`services.${project.category}.timeline`)}`}
                  variant="outlined"
                />
                <Chip
                  icon={<LocalOffer />}
                  label={`${t('common.price')}: ${t(`services.${project.category}.priceRange`)}`}
                  variant="outlined"
                />
              </Stack>
            </Box>

            {/* What's Included */}
            <Box>
              <Typography variant="h6" gutterBottom>
                {t('common.whatsIncluded')}
              </Typography>
              <Grid container spacing={2}>
                {includes.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.default'
                      }}
                    >
                      <CheckCircle color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2">{item}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem'
                }}
              >
                {t('common.getQuote')}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  };

  const drawer = (
    <Box sx={{ mt: isMobile ? 2 : 8 }}>
      <List>
        {projects.map((project: ProjectItem, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selectedProject === index}
              onClick={() => {
                setSelectedProject(index);
                window.history.pushState(null, '', `#${project.id}`);
              }}
              sx={{
                py: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText 
                primary={t(`services.${project.category}.title`)}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: selectedProject === index ? 'bold' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Side Panel */}
      {!isMobile ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            position: 'fixed',
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              bgcolor: 'background.paper',
              height: '100%',
              position: 'fixed',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {drawer}
        </Box>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          bgcolor: 'background.default',
          ml: { xs: 0, md: `${drawerWidth}px` },
        }}
      >
        {projectContent(projects[selectedProject])}
      </Box>
    </Box>
  );
};

export default Projects; 