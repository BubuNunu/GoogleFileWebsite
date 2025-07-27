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
      whyChoose: t('products.systems.vrv.whyChoose'),
      bonus: t('products.systems.vrv.bonus')
    },
    {
      id: 'ducted',
      icon: <AcUnit sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('products.systems.ducted.title'),
      bestFor: t('products.systems.ducted.bestFor'),
      whyChoose: t('products.systems.ducted.whyChoose')
    },
    {
      id: 'evaporative',
      icon: <Opacity sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('products.systems.evaporative.title'),
      bestFor: t('products.systems.evaporative.bestFor'),
      whyChoose: t('products.systems.evaporative.whyChoose')
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
                      <Typography 
                        variant="body1" 
                        paragraph
                        sx={{ mb: 2 }}
                      >
                        <strong>Why choose it:</strong> {product.whyChoose}
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

        {/* Consultation Section */}
        <Card 
          id="consultation"
          sx={{ 
            mb: 8,
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 25px 50px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease-in-out'
            }
          }}
        >
          <CardContent sx={{ p: 6, position: 'relative', zIndex: 2 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box 
                    sx={{ 
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      mr: 3
                    }}
                  >
                    <Search sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      lineHeight: 1.2
                    }}
                  >
                    {t('products.cta.title')}
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    opacity: 0.95,
                    mb: 4
                  }}
                >
                  {t('products.cta.description')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Paper 
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      ✓ {t('products.cta.badges.licensed')}
                    </Typography>
                  </Paper>
                  <Paper 
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      ✓ {t('products.cta.badges.veuRebate')}
                    </Typography>
                  </Paper>
                  <Paper 
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      ✓ {t('products.cta.badges.assessment')}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onQuoteClick}
                  endIcon={<ArrowForward />}
                  sx={{ 
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderRadius: 3,
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.25)'
                    }
                  }}
                >
                  {t('products.cta.button')}
                </Button>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 2,
                    opacity: 0.8,
                    fontSize: '0.9rem'
                  }}
                >
                  Free consultation & quote
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {/* Background decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              zIndex: 1
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.03)',
              zIndex: 1
            }}
          />
        </Card>


      </Container>
    </Box>
  );
};

export default Products; 