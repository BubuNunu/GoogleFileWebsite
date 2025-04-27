import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Divider
} from '@mui/material';
import {
  AcUnit,
  Architecture,
  Opacity,
  Search,
  ArrowForward
} from '@mui/icons-material';

interface ProductsProps {
  onQuoteClick: () => void;
}

const Products: React.FC<ProductsProps> = ({ onQuoteClick }) => {
  useEffect(() => {
    // Get the hash from the URL (e.g., #vrv)
    const hash = window.location.hash;
    if (hash) {
      // Remove the # symbol
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure smooth scrolling after page load
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  const products = [
    {
      id: 'vrv',
      icon: <Architecture sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'VRF / VRV / Multi-Head Systems',
      subtitle: '(VEU-Eligible)',
      bestFor: 'Homes or units with multiple rooms to cool, where ductwork isn\'t practical',
      description: 'Connect several indoor units to a single outdoor compressor to individually control temperatures in each room. Great for existing homes, renovations, double storey homes or properties with limited roof space.',
      bonus: 'These systems are eligible for VEU rebates, making them a smart investment for energy-conscious homeowners.'
    },
    {
      id: 'ducted',
      icon: <AcUnit sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Ducted Air Conditioning Systems',
      bestFor: 'Whole-home comfort in new builds or major renovations',
      description: 'Discreet, powerful cooling and heating delivered through ceiling or floor ducts. Perfect for homeowners wanting seamless climate control throughout the entire property with minimal visual impact.'
    },
    {
      id: 'evaporative',
      icon: <Opacity sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Evaporative Cooling Systems',
      bestFor: 'Dry climates, larger open-plan homes',
      description: 'A cost-effective, eco-friendly solution that uses water to cool air naturally. Ideal for families looking for fresh airflow and low running costs in Victoria\'s drier seasons.'
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box id="products-hero" sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              position: 'relative',
              mb: 4,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                backgroundColor: 'primary.main',
                borderRadius: '2px'
              }
            }}
          >
            Our Air Conditioning System Range
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              mb: 6,
              lineHeight: 1.8
            }}
          >
            At DAMI AIR PTY LTD, we offer a range of modern air conditioning systems designed to suit different property types, energy needs, and budgets. Whether you're upgrading an old heater, building a new home, or working on a commercial project, we can help you choose the right system — and where eligible, help you access rebates through the Victorian Energy Upgrades (VEU) program.
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {products.map((product, index) => (
            <Grid item xs={12} key={index}>
              <Card 
                id={product.id}
                sx={{ 
                  height: '100%',
                  scrollMarginTop: '100px', // Add space for the fixed header
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3} alignItems="flex-start">
                    <Grid item xs={12} md={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {product.icon}
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h4" component="h2" gutterBottom>
                            {product.title}
                          </Typography>
                          {product.subtitle && (
                            <Typography 
                              variant="subtitle1" 
                              color="primary"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {product.subtitle}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        <strong>Best for:</strong> {product.bestFor}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {product.description}
                      </Typography>
                      {product.bonus && (
                        <Paper 
                          sx={{ 
                            p: 2, 
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            mt: 2
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Bonus:</strong> {product.bonus}
                          </Typography>
                        </Paper>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box 
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          p: 3,
                          bgcolor: 'grey.50',
                          borderRadius: 1
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={onQuoteClick}
                          endIcon={<ArrowForward />}
                          sx={{ 
                            width: '100%',
                            py: 1.5
                          }}
                        >
                          Get a Quote
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box 
          id="products-cta"
          sx={{ 
            textAlign: 'center',
            p: 6,
            bgcolor: 'grey.100',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Search 
            sx={{ 
              fontSize: 120,
              color: 'primary.light',
              position: 'absolute',
              right: -20,
              bottom: -20,
              opacity: 0.2,
              transform: 'rotate(-15deg)'
            }}
          />
          <Typography variant="h4" component="h2" gutterBottom>
            Not Sure Which System is Right for You?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '600px',
              mx: 'auto',
              mb: 4
            }}
          >
            Our licensed specialists will assess your layout, lifestyle, and energy goals to recommend the ideal system — and help you take advantage of any available VEU rebates to reduce your installation cost.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onQuoteClick}
            endIcon={<ArrowForward />}
            sx={{ 
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Request a Free Consultation
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Products; 