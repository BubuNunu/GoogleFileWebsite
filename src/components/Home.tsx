import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Build,
  Handyman,
  ElectricBolt,
  CheckCircle,
  Language,
  MonetizationOn,
  Engineering,
  Stars,
  Support,
  KeyboardArrowDown
} from '@mui/icons-material';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import logo from '../assets/images/FullLogo_Transparent_NoBuffer_NoSlogan.png';
import arcLogo from '../assets/images/Licence logo/licence - australian-refrigeration-council-arc-logo-vector.svg';
import vbaLogo from '../assets/images/Licence logo/licence - VBA.png';
import Carousel from 'react-material-ui-carousel';
import image1 from '../assets/images/demoPictures/AdobeStock_868624714.jpeg';
import image2 from '../assets/images/demoPictures/AdobeStock_412957026.jpeg';
import image3 from '../assets/images/demoPictures/AdobeStock_608345000.jpeg';
import image4 from '../assets/images/demoPictures/AdobeStock_289084407.jpeg';
import image5 from '../assets/images/demoPictures/AdobeStock_506341527.jpeg';
import QuoteDialog from './QuoteDialog';
import LanguageSwitcher from './LanguageSwitcher';

const images = [image1, image2, image3, image4, image5];

const Home = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(null);
  const [productsAnchorEl, setProductsAnchorEl] = useState<null | HTMLElement>(null);

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleProductsClick = (event: React.MouseEvent<HTMLElement>) => {
    setProductsAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchorEl(null);
  };

  const handleProductsClose = () => {
    setProductsAnchorEl(null);
  };

  const handleLanguageChange = () => {
    const currentLang = localStorage.getItem('language') || 'en';
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('language', newLang);
    window.location.reload();
  };

  const handleQuoteClick = () => {
    setQuoteDialogOpen(true);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      {/* Header/Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="DAMI AIR Logo"
            sx={{
              height: 40,
              mr: 2
            }}
          />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              {t('nav.home')}
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/about"
              sx={{
                backgroundColor: isActive('/about') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              {t('nav.about')}
            </Button>
            <Button
              color="inherit"
              endIcon={<KeyboardArrowDown />}
              onClick={handleServicesClick}
              sx={{
                backgroundColor: location.pathname.startsWith('/services') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              {t('nav.services')}
            </Button>
            <Menu
              anchorEl={servicesAnchorEl}
              open={Boolean(servicesAnchorEl)}
              onClose={handleServicesClose}
              MenuListProps={{
                'aria-labelledby': 'services-button',
              }}
            >
              <MenuItem 
                component={Link} 
                to="/services"
                onClick={handleServicesClose}
              >
                All Services
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#installation"
                onClick={handleServicesClose}
              >
                Installation Services
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#veu"
                onClick={handleServicesClose}
              >
                VEU Program
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#maintenance"
                onClick={handleServicesClose}
              >
                Maintenance & Servicing
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#repairs"
                onClick={handleServicesClose}
              >
                Repairs & Troubleshooting
              </MenuItem>
            </Menu>
            <Button
              color="inherit"
              endIcon={<KeyboardArrowDown />}
              onClick={handleProductsClick}
              sx={{
                backgroundColor: location.pathname.startsWith('/products') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              {t('nav.products')}
            </Button>
            <Menu
              anchorEl={productsAnchorEl}
              open={Boolean(productsAnchorEl)}
              onClose={handleProductsClose}
              MenuListProps={{
                'aria-labelledby': 'products-button',
              }}
            >
              <MenuItem 
                component={Link} 
                to="/products"
                onClick={handleProductsClose}
              >
                All Products
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/products#vrv"
                onClick={handleProductsClose}
              >
                VRF/VRV Systems
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/products#ducted"
                onClick={handleProductsClose}
              >
                Ducted Systems
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/products#evaporative"
                onClick={handleProductsClose}
              >
                Evaporative Cooling
              </MenuItem>
            </Menu>
            <Button
              color="inherit"
              component={Link}
              to="/contact"
              sx={{
                backgroundColor: isActive('/contact') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              {t('nav.contact')}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            color="inherit" 
            variant="outlined" 
            sx={{ mx: 2 }}
            onClick={handleQuoteClick}
          >
            {t('nav.getQuote')}
          </Button>
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          maxWidth: '100%',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <Carousel
                indicators={false}
                navButtonsAlwaysVisible={true}
                navButtonsProps={{
                  style: {
                    top: 'calc(50% - 20px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                  }
                }}
                sx={{
                  width: '100%',
                  height: '80vh',
                  position: 'relative',
                  '& .MuiPaper-root': {
                    height: '100%',
                    width: '100%',
                  },
                }}
              >
                {images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundImage: `url(${img})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '80vh',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1,
                      },
                    }}
                  >
                    <Container 
                      maxWidth="lg" 
                      sx={{ 
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        py: 4
                      }}
                    >
                      <Typography 
                        variant="h2" 
                        component="h1" 
                        gutterBottom
                        sx={{
                          fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
                          fontWeight: 'bold',
                          mb: 3
                        }}
                      >
                        {t('hero.title')}
                      </Typography>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{
                          mb: 4,
                          fontSize: { xs: '1.2rem', sm: '1.5rem' }
                        }}
                      >
                        {t('hero.subtitle')}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          size="large"
                          onClick={handleQuoteClick}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem'
                          }}
                        >
                          {t('hero.cta')}
                        </Button>
                      </Box>
                    </Container>
                  </Box>
                ))}
              </Carousel>

              {/* Quick Services Section */}
              <Container maxWidth="lg" sx={{ py: 8, width: '100%' }}>
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
                  {t('services.title')}
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  {[
                    { icon: <Build />, title: t('services.installation.title'), description: t('services.installation.description') },
                    { icon: <Handyman />, title: t('services.repairs.title'), description: t('services.repairs.description') },
                    { icon: <ElectricBolt />, title: t('services.safety.title'), description: t('services.safety.description') },
                  ].map((service, index) => (
                    <Grid key={index} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            {service.icon}
                          </Box>
                          <Typography variant="h5" component="h3" gutterBottom align="center">
                            {service.title}
                          </Typography>
                          <Typography color="text.secondary" align="center">
                            {service.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>

              {/* About Section */}
              <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
                <Container>
                  <Grid container spacing={4} alignItems="center">
                    <Grid sx={{ width: { xs: '100%', md: '50%' } }}>
                      <CardMedia
                        component="img"
                        image={logo}
                        alt="DAMI AIR Logo"
                        sx={{ 
                          borderRadius: 1,
                          maxHeight: 400,
                          objectFit: 'contain',
                          p: 4
                        }}
                      />
                    </Grid>
                    <Grid sx={{ width: { xs: '100%', md: '50%' } }}>
                      <Typography variant="h4" component="h2" gutterBottom>
                        {t('about.title')}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                        At DAMI AIR PTY LTD, we specialise in air conditioning installation, repair, and maintenance for residential and commercial properties across Melbourne. With a skilled team of fully licensed refrigerant handlers, plumbers, and electricians, we deliver safe, efficient, and compliant solutions tailored to your needs. From new builds and renovations to energy-saving upgrades through the Victorian Energy Upgrades (VEU) program, we're committed to quality workmanship and reliable service at competitive prices.
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>

              {/* Featured Services */}
              <Container sx={{ py: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
                  Featured Services
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { icon: '❄️', title: 'Air Conditioning Installation' },
                    { icon: '♻️', title: 'Victorian Energy Upgrades (VEU)' },
                    { icon: '🏠', title: 'HVAC System Design for New Homes' },
                    { icon: '🛠️', title: 'Air Conditioning for Renovations' },
                    { icon: '🔧', title: 'Maintenance & Servicing' },
                    { icon: '⚡', title: 'HVAC Repairs & Troubleshooting' }
                  ].map((service, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index}>
                      <Card sx={{ 
                        height: '100%',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          transition: 'transform 0.3s ease-in-out',
                          boxShadow: 2
                        }
                      }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Typography variant="h4" align="center" sx={{ mb: 1 }}>
                            {service.icon}
                          </Typography>
                          <Typography variant="subtitle2" component="h3" align="center">
                            {service.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>

              {/* Why Choose Us */}
              <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
                <Container maxWidth="lg">
                  <Typography 
                    variant="h3" 
                    component="h2" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                      mb: 6,
                      fontWeight: 'bold',
                      position: 'relative',
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
                    {t('whyChooseUs.title')}
                  </Typography>
                  <Grid container spacing={4} justifyContent="center">
                    {[
                      { 
                        icon: <MonetizationOn sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.pricing'),
                        description: "We provide clear, upfront pricing with no hidden costs. Get detailed quotes that break down all costs before any work begins."
                      },
                      { 
                        icon: <Engineering sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.technicians'),
                        description: "Our team consists of fully licensed and certified technicians with extensive experience in HVAC systems."
                      },
                      { 
                        icon: <Stars sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.brands'),
                        description: "We partner with leading manufacturers to offer you the highest quality equipment and parts available."
                      },
                      { 
                        icon: <Support sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.support'),
                        description: '24/7 customer support and rapid response times for all your HVAC needs. We\'re always here when you need us.'
                      }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card 
                          sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            p: 3,
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: 6
                            }
                          }}
                        >
                          <Box 
                            sx={{ 
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              backgroundColor: 'grey.50',
                              boxShadow: 1
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography 
                            variant="h6" 
                            component="h3" 
                            gutterBottom
                            sx={{ 
                              fontWeight: 'bold',
                              mb: 2
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ flex: 1 }}
                          >
                            {item.description}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>

              {/* CTA Section */}
              <Box sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Need Professional HVAC Service?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
                  Get in touch with us today for a free consultation and quote.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleQuoteClick}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4
                    }
                  }}
                >
                  Get Your Free Quote
                </Button>
              </Box>
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services onQuoteClick={handleQuoteClick} />} />
          <Route path="/products" element={<Products onQuoteClick={handleQuoteClick} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={6} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Box sx={{ pr: { md: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  {t('footer.companyName')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  DAMI has over 10 years experience helping Melbourne locals with their plumbing, heating and cooling needs. Top quality products, professional installation and world class customer service.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box
                    component="img"
                    src={arcLogo}
                    alt="ARC License Logo"
                    sx={{ 
                      width: '200px',
                      height: '60px',
                      objectFit: 'cover',
                      backgroundColor: 'white',
                      padding: '4px',
                      borderRadius: '4px',
                      transform: 'scale(1.2)'
                    }}
                  />
                  <Box
                    component="img"
                    src={vbaLogo}
                    alt="VBA License Logo"
                    sx={{ 
                      width: '200px',
                      height: '60px',
                      objectFit: 'cover',
                      backgroundColor: 'white',
                      padding: '4px',
                      borderRadius: '4px',
                      transform: 'scale(1.2)'
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ px: { md: 4 } }}>
                <Typography variant="h6" gutterBottom>
                  Featured Services
                </Typography>
                <List sx={{ p: 0 }}>
                  {[
                    'Air Conditioning Installation',
                    'Victorian Energy Upgrades (VEU)',
                    'HVAC System Design for New Homes',
                    'Air Conditioning for Renovations',
                    'Maintenance & Servicing',
                    'HVAC Repairs & Troubleshooting'
                  ].map((service, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <Typography variant="body2" color="inherit" sx={{ 
                        wordWrap: 'break-word',
                        whiteSpace: 'normal'
                      }}>
                        {service}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ pl: { md: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body2" sx={{ 
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}>
                  <strong>We Open:</strong><br />
                  Mon - Fri: 9:00 am - 5:00 pm<br />
                  Sat: 9:00 am - 12:00 pm<br />
                  Sun: By Appointment
                </Typography>
                <Typography variant="body2" sx={{ 
                  mt: 2,
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}>
                  <strong>Mobile:</strong> 045 228 7883 (English/Mandarin)
                </Typography>
                <Typography variant="body2" sx={{
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}>
                  <strong>Email:</strong> info@damiair.com.au
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Add the QuoteDialog */}
      <QuoteDialog
        open={quoteDialogOpen}
        onClose={() => setQuoteDialogOpen(false)}
      />
    </Box>
  );
};

export default Home; 