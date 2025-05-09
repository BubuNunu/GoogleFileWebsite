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
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface ProductsProps {
  onQuoteClick: () => void;
}

const Products: React.FC<ProductsProps> = ({ onQuoteClick }) => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Get the hash from the location object
    const hash = location.hash;
    if (hash) {
      // Remove the # symbol
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure smooth scrolling after page load/hash change
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  const products = [
    {
      id: 'vrv',
      icon: <Architecture sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('products.systems.vrv.title'),
      subtitle: t('products.systems.vrv.subtitle'),
      bestFor: t('products.systems.vrv.bestFor'),
      description: t('products.systems.vrv.description'),
      bonus: t('products.systems.vrv.bonus')
    },
    {
      id: 'ducted',
      icon: <AcUnit sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('products.systems.ducted.title'),
      bestFor: t('products.systems.ducted.bestFor'),
      description: t('products.systems.ducted.description')
    },
    {
      id: 'evaporative',
      icon: <Opacity sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('products.systems.evaporative.title'),
      bestFor: t('products.systems.evaporative.bestFor'),
      description: t('products.systems.evaporative.description')
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
            {t('products.title')}
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
            {t('products.subtitle')}
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
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            mt: 2,
                            p: 2,
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            borderRadius: 1
                          }}
                        >
                          {product.bonus}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={onQuoteClick}
                        endIcon={<ArrowForward />}
                        sx={{ width: '100%', maxWidth: 300 }}
                      >
                        {t('nav.getQuote')}
                      </Button>
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
            {t('products.cta.title')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '600px',
              mx: 'auto',
              mb: 4
            }}
          >
            {t('products.cta.description')}
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
            {t('products.cta.button')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Products; 