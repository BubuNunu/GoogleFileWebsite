import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import {
  AcUnit,
  Recycling,
  Home,
  Build,
  Engineering,
  ElectricBolt
} from '@mui/icons-material';

interface ServiceItem {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  details: string[];
}

interface ServicesProps {
  onQuoteClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onQuoteClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedService, setSelectedService] = useState(0);

  useEffect(() => {
    // Get the hash from the URL (e.g., #installation)
    const hash = window.location.hash;
    if (hash) {
      // Remove the # symbol
      const id = hash.replace('#', '');
      // Find the index of the service with this ID
      const serviceIndex = services.findIndex(service => service.id === id);
      if (serviceIndex !== -1) {
        setSelectedService(serviceIndex);
      }
    }
  }, []);

  const services: ServiceItem[] = [
    {
      id: 'installation',
      icon: <AcUnit />,
      title: 'Air Conditioning Installation',
      description: 'Professional installation of ducted systems, VRV/VRF systems and single split systems for homes and commercial spaces, ensuring efficient and long-lasting performance.',
      details: [
        'Expert installation of all major brands',
        'Custom system design for your space',
        'Energy-efficient solutions',
        'Professional commissioning',
        'Warranty-backed workmanship'
      ]
    },
    {
      id: 'veu',
      icon: <Recycling />,
      title: 'Victorian Energy Upgrades (VEU)',
      description: 'As a fully qualified team, we help clients transition from gas heating to energy-efficient electric systems — with access to available VEU rebates.',
      details: [
        'Upfront after-rebate pricing',
        'Complete rebate application management',
        'Energy efficiency assessment',
        'System upgrade recommendations',
        'Full compliance documentation'
      ]
    },
    {
      id: 'maintenance',
      icon: <Engineering />,
      title: 'Maintenance & Servicing',
      description: 'Extend the life of your HVAC system with regular servicing. We provide routine maintenance to keep your system running smoothly.',
      details: [
        'Regular maintenance plans',
        'Performance optimization',
        'Filter cleaning/replacement',
        'System health checks',
        'Preventive maintenance'
      ]
    },
    {
      id: 'new-homes',
      icon: <Home />,
      title: 'HVAC System Design for New Homes',
      description: 'We work with builders and developers to design customised and modern heating and cooling systems that align with the layout and energy requirements of new constructions.',
      details: [
        'Custom system design',
        'Load calculations',
        'Energy efficiency optimization',
        'Integration with home design',
        'Future-proof solutions'
      ]
    },
    {
      id: 'renovations',
      icon: <Build />,
      title: 'Air Conditioning for Renovations',
      description: 'Upgrading your home? We do professional assessment and integration of new air conditioning systems during home renovations.',
      details: [
        'Renovation-specific solutions',
        'Minimal disruption installation',
        'Design integration',
        'System upgrades',
        'Modern technology integration'
      ]
    },
    {
      id: 'repairs',
      icon: <ElectricBolt />,
      title: 'HVAC Repairs & Troubleshooting',
      description: 'Quick, reliable repairs for faulty air conditioning and HVAC systems. Our technicians diagnose and resolve issues fast.',
      details: [
        'Emergency repair service',
        'Diagnostic testing',
        'Component replacement',
        'Performance restoration',
        'Post-repair testing'
      ]
    }
  ];

  const drawerWidth = 280;

  const serviceContent = (service: ServiceItem) => (
    <Box 
      id={service.id}
      sx={{ 
        p: { xs: 2, md: 4 },
        scrollMarginTop: '100px' // Add space for the fixed header
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ 
        fontSize: { xs: '2rem', md: '2.5rem' },
        fontWeight: 'bold',
        mb: 4
      }}>
        {service.title}
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
        {service.description}
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        What We Offer:
      </Typography>

      <Grid container spacing={3}>
        {service.details.map((detail, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={2} sx={{ 
              p: 3,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <Typography variant="body1">
                {detail}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onQuoteClick}
          sx={{ 
            px: 4,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Get a Quote
        </Button>
      </Box>
    </Box>
  );

  const drawer = (
    <Box sx={{ mt: isMobile ? 2 : 8 }}>
      <List>
        {services.map((service: ServiceItem, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selectedService === index}
              onClick={() => setSelectedService(index)}
              sx={{
                py: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {service.icon}
              </ListItemIcon>
              <ListItemText 
                primary={service.title} 
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: selectedService === index ? 'bold' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Side Panel */}
      {!isMobile ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'relative',
              border: 'none',
              bgcolor: 'background.paper',
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
        }}
      >
        {serviceContent(services[selectedService])}
      </Box>
    </Box>
  );
};

export default Services; 