import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
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
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
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
  KeyboardArrowDown,
  Menu as MenuIcon,
  AcUnit,
  Recycling,
  HomeWork,
  BuildCircle,
  Warning,
} from '@mui/icons-material';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import logo from '../assets/images/Brand Logo/FullLogo_Transparent_WhiteText.png';
import aboutLogo from '../assets/images/Brand Logo/FullLogo_Transparent_FullText_3.png';
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
import mitsubishiElectricLogo from '../assets/images/Brand Logo/logo-mitsubishi-electric.png';
import mitsubishiHeavyLogo from '../assets/images/Brand Logo/logo-mitsubishi-heavy-industries.png';
import hisenseLogo from '../assets/images/Brand Logo/logo-hisense.png';
import fujitsuLogo from '../assets/images/Brand Logo/logo-fujitsu.png';
import mideaLogo from '../assets/images/Brand Logo/logo-midea.png';
import daikinLogo from '../assets/images/Brand Logo/logo-daikin.png';

const images = [image1, image2, image3, image4, image5];

const Home = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(null);
  const [productsAnchorEl, setProductsAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleProductsClick = (event: React.MouseEvent<HTMLElement>) => {
    setProductsAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchorEl(null);
  };

  const handleServicesCloseAndScroll = () => {
    handleServicesClose();
    // Don't force scroll to top - let the anchor navigation work naturally
  };

  const handleProductsClose = () => {
    setProductsAnchorEl(null);
  };

  const handleQuoteClick = () => {
    setQuoteDialogOpen(true);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      {/* Header/Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              component="img"
              src={logo}
              alt="DAMI AIR Logo"
              sx={{
                height: 50,
                mr: 2,
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Link>
          {/* Hamburger menu for mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
          {/* Desktop nav */}
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
                onClick={handleServicesCloseAndScroll}
              >
                {t('featuredServices.airConditioning')}
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#veu"
                onClick={handleServicesCloseAndScroll}
              >
                {t('featuredServices.veu')}
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#new-homes"
                onClick={handleServicesCloseAndScroll}
              >
                {t('featuredServices.hvacDesign')}
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#renovations"
                onClick={handleServicesCloseAndScroll}
              >
                {t('featuredServices.renovations')}
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#maintenance"
                onClick={handleServicesCloseAndScroll}
              >
                {t('featuredServices.maintenance')}
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/services#repairs"
                onClick={handleServicesCloseAndScroll}
              >
                {t('featuredServices.repairs')}
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
                to="/products#vrv"
                onClick={handleProductsClose}
              >
                {t('products.systems.vrv.title')}
              </MenuItem>
              <MenuItem
                component={Link}
                to="/products#ducted"
                onClick={handleProductsClose}
              >
                {t('products.systems.ducted.title')}
              </MenuItem>
              <MenuItem
                component={Link}
                to="/products#evaporative"
                onClick={handleProductsClose}
              >
                {t('products.systems.evaporative.title')}
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
      {/* Drawer for mobile nav */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={handleDrawerToggle}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ width: '100%', justifyContent: 'flex-start', mb: 1 }}
          >
            {t('nav.home')}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{ width: '100%', justifyContent: 'flex-start', mb: 1 }}
          >
            {t('nav.about')}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/services"
            sx={{ width: '100%', justifyContent: 'flex-start', mb: 1 }}
          >
            {t('nav.services')}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/products"
            sx={{ width: '100%', justifyContent: 'flex-start', mb: 1 }}
          >
            {t('nav.products')}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{ width: '100%', justifyContent: 'flex-start', mb: 1 }}
          >
            {t('nav.contact')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ width: '100%', mt: 2 }}
            onClick={handleQuoteClick}
          >
            {t('nav.getQuote')}
          </Button>
        </Box>
      </Drawer>

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
                          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' },
                          fontWeight: 700,
                          mb: 3,
                          lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {t('hero.title')}
                      </Typography>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{
                          mb: 4,
                          fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                          fontWeight: 400,
                          lineHeight: 1.6,
                          opacity: 0.95,
                          maxWidth: '800px'
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
                            px: 5,
                            py: 1.8,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 2,
                            boxShadow: 3
                          }}
                        >
                          {t('hero.cta')}
                        </Button>
                      </Box>
                    </Container>
                  </Box>
                ))}
              </Carousel>

              {/* About Section */}
              <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
                <Container>
                  <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CardMedia
                          component="img"
                          image={aboutLogo}
                          alt="DAMI AIR Logo"
                          sx={{ 
                            borderRadius: 4,
                            maxHeight: 220,
                            maxWidth: '100%',
                            objectFit: 'contain',
                            p: 3,
                            backgroundColor: 'white',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                              transform: 'translateY(-3px)'
                            }
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography 
                        variant="h4" 
                        component="h2" 
                        gutterBottom
                        sx={{
                          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                          fontWeight: 700,
                          mb: 3,
                          color: 'text.primary',
                          lineHeight: 1.3
                        }}
                      >
                        {t('about.title')}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        paragraph 
                        sx={{ 
                          lineHeight: 1.8, 
                          mb: 4,
                          fontSize: { xs: '1rem', sm: '1.1rem' },
                          color: 'text.secondary',
                          fontWeight: 400
                        }}
                      >
                        {t('about.description')}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        component={Link}
                        to="/about"
                        sx={{ 
                          mt: 1,
                          px: 3,
                          py: 1.2,
                          fontSize: '1rem',
                          fontWeight: 500,
                          textTransform: 'none',
                          borderRadius: 2
                        }}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {t('about.learnMore', 'Learn More')}
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Box>

              {/* Featured Services */}
              <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                      mb: 6,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1.3
                    }}
                  >
                    {t('featuredServices.title', 'Our Services')}
                  </Typography>
                  <Grid container spacing={3} justifyContent="center">
                    {[
                      { 
                        icon: <AcUnit sx={{ fontSize: 40, color: '#4FC3F7' }} />, 
                        title: t('featuredServices.airConditioning')
                      },
                      { 
                        icon: <Recycling sx={{ fontSize: 40, color: '#4CAF50' }} />, 
                        title: t('featuredServices.veu')
                      },
                      { 
                        icon: <HomeWork sx={{ fontSize: 40, color: '#8D6E63' }} />, 
                        title: t('featuredServices.hvacDesign')
                      },
                      { 
                        icon: <BuildCircle sx={{ fontSize: 40, color: '#9C27B0' }} />, 
                        title: t('featuredServices.renovations')
                      },
                      { 
                        icon: <Handyman sx={{ fontSize: 40, color: '#9C27B0' }} />, 
                        title: t('featuredServices.maintenance')
                      },
                      { 
                        icon: <Warning sx={{ fontSize: 40, color: '#FF9800' }} />, 
                        title: t('featuredServices.repairs')
                      }
                    ].map((service, index) => {
                      const getServiceLink = (idx: number): string => {
                        switch (idx) {
                          case 0: return '/services#air-conditioning';
                          case 1: return '/services#veu';
                          case 2: return '/services#new-homes';
                          case 3: return '/services#renovations';
                          case 4: return '/services#maintenance';
                          case 5: return '/services#repairs';
                          default: return '/services';
                        }
                      };

                      return (
                        <Grid item xs={6} sm={4} md={2} key={index}>
                          <Card 
                            component={Link}
                            to={getServiceLink(index)}
                            onClick={() => window.scrollTo(0, 0)}
                            sx={{ 
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              textAlign: 'center',
                              p: 3,
                              cursor: 'pointer',
                              textDecoration: 'none',
                              color: 'inherit',
                              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 3,
                                textDecoration: 'none',
                                color: 'inherit'
                              }
                            }}
                          >
                          <Box 
                            sx={{ 
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              backgroundColor: 'grey.50'
                            }}
                          >
                            {service.icon}
                          </Box>
                          <Typography 
                            variant="body1"
                            sx={{ 
                              fontSize: { xs: '0.95rem', sm: '1rem' },
                              color: 'text.primary',
                              fontWeight: 500,
                              lineHeight: 1.4,
                              textAlign: 'center'
                            }}
                          >
                            {service.title}
                          </Typography>
                        </Card>
                      </Grid>
                      );
                    })}
                  </Grid>
                </Container>
              </Box>

              {/* Products Section */}
              <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
                <Container maxWidth="lg">
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                      mb: 6,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1.3
                    }}
                  >
                    {t('nav.products', 'Products')}
                  </Typography>
                  <Grid container spacing={4} justifyContent="center">
                    {[
                      { 
                        icon: <ElectricBolt sx={{ fontSize: 40, color: '#2196F3' }} />, 
                        title: t('products.systems.vrv.title'),
                        description: t('products.systems.vrv.whyChoose'),
                        link: '/products#vrv'
                      },
                      { 
                        icon: <AcUnit sx={{ fontSize: 40, color: '#00BCD4' }} />, 
                        title: t('products.systems.ducted.title'),
                        description: t('products.systems.ducted.whyChoose'),
                        link: '/products#ducted'
                      },
                      { 
                        icon: <Support sx={{ fontSize: 40, color: '#4CAF50' }} />, 
                        title: t('products.systems.evaporative.title'),
                        description: t('products.systems.evaporative.whyChoose'),
                        link: '/products#evaporative'
                      }
                    ].map((product, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                          component={Link}
                          to={product.link}
                          onClick={() => window.scrollTo(0, 0)}
                          sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            p: 3,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-6px)',
                              boxShadow: 6,
                              textDecoration: 'none',
                              color: 'inherit'
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
                            {product.icon}
                          </Box>
                          <Typography 
                            variant="h6" 
                            component="h3" 
                            gutterBottom
                            sx={{ 
                              fontWeight: 600,
                              mb: 2,
                              fontSize: { xs: '1.1rem', sm: '1.2rem' },
                              color: 'text.primary',
                              lineHeight: 1.4
                            }}
                          >
                            {product.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              lineHeight: 1.7,
                              fontSize: { xs: '0.9rem', sm: '0.95rem' },
                              fontWeight: 400
                            }}
                          >
                            {product.description}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>

              {/* Why Choose Us */}
              <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                  <Typography 
                    variant="h3" 
                    component="h2" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                      mb: 6,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1.2,
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
                        icon: <Engineering sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.licensed'),
                        description: t('whyChooseUs.licensedDescription')
                      },
                      { 
                        icon: <Recycling sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.veu'),
                        description: t('whyChooseUs.veuDescription')
                      },
                      { 
                        icon: <Stars sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.solutions'),
                        description: t('whyChooseUs.solutionsDescription')
                      },
                      { 
                        icon: <MonetizationOn sx={{ fontSize: 40, color: 'primary.main' }} />, 
                        title: t('whyChooseUs.pricing'),
                        description: t('whyChooseUs.pricingDescription')
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
                              fontWeight: 600,
                              mb: 2,
                              fontSize: { xs: '1.1rem', sm: '1.2rem' },
                              color: 'text.primary',
                              lineHeight: 1.4
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ 
                              flex: 1,
                              lineHeight: 1.7,
                              fontSize: { xs: '0.95rem', sm: '1rem' },
                              fontWeight: 400
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>

              {/* Brands Section - Moved to the end */}
              <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
                <Container maxWidth="lg">
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                      mb: 3,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1.3
                    }}
                  >
                    {t('brands.title')}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    align="center" 
                    sx={{ 
                      mb: 5,
                      maxWidth: '800px',
                      mx: 'auto',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      fontWeight: 400
                    }}
                  >
                    {t('brands.description')}
                  </Typography>
                  <Grid 
                    container 
                    spacing={4} 
                    justifyContent="center" 
                    alignItems="center"
                    sx={{
                      '& img': {
                        opacity: 0.9,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 1,
                          transform: 'scale(1.05)'
                        }
                      }
                    }}
                  >
                    {[
                      { logo: mitsubishiElectricLogo, alt: 'Mitsubishi Electric' },
                      { logo: mitsubishiHeavyLogo, alt: 'Mitsubishi Heavy Industries' },
                      { logo: hisenseLogo, alt: 'Hisense' },
                      { logo: fujitsuLogo, alt: 'Fujitsu' },
                      { logo: mideaLogo, alt: 'Midea' },
                      { logo: daikinLogo, alt: 'Daikin' },
                    ].map((brand, index) => (
                      <Grid 
                        item 
                        xs={6} 
                        sm={4} 
                        md={2} 
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Box
                          component="img"
                          src={brand.logo}
                          alt={brand.alt}
                          sx={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '60px',
                            objectFit: 'contain'
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>

              {/* CTA Section */}
              <Box sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                    fontWeight: 700,
                    color: 'text.primary',
                    lineHeight: 1.3,
                    mb: 3
                  }}
                >
                  {t('cta.title')}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 5, 
                    maxWidth: '600px', 
                    mx: 'auto',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    fontWeight: 400
                  }}
                >
                  {t('cta.subtitle')}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleQuoteClick}
                  sx={{ 
                    px: 5, 
                    py: 2,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  {t('cta.button')}
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
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    fontWeight: 600,
                    color: 'white',
                    mb: 2
                  }}
                >
                  {t('footer.companyName')}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.6,
                    color: 'grey.300',
                    fontSize: '0.95rem'
                  }}
                >
                  {t('footer.companyDescription')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box
                    component="img"
                    src={arcLogo}
                    alt="ARC License Logo"
                    sx={{ 
                      width: '100%',
                      maxWidth: '200px',
                      height: '120px',
                      objectFit: 'cover',
                      backgroundColor: 'white',
                      padding: '2px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)'
                      }
                    }}
                  />
                  <Box
                    component="img"
                    src={vbaLogo}
                    alt="VBA License Logo"
                    sx={{ 
                      width: '100%',
                      maxWidth: '200px',
                      height: '70px',
                      objectFit: 'contain',
                      backgroundColor: 'white',
                      padding: '8px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)'
                      }
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ px: { md: 4 } }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    fontWeight: 600,
                    color: 'white',
                    mb: 2
                  }}
                >
                  {t('footer.featuredServices')}
                </Typography>
                <List sx={{ p: 0 }}>
                  {[
                    t('featuredServices.airConditioning'),
                    t('featuredServices.veu'),
                    t('featuredServices.hvacDesign'),
                    t('featuredServices.renovations'),
                    t('featuredServices.maintenance'),
                    t('featuredServices.repairs')
                  ].map((service, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        color="inherit" 
                        sx={{ 
                          wordWrap: 'break-word',
                          whiteSpace: 'normal',
                          color: 'grey.300',
                          fontSize: '0.9rem',
                          lineHeight: 1.5
                        }}
                      >
                        {service}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ pl: { md: 2 } }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    fontWeight: 600,
                    color: 'white',
                    mb: 2
                  }}
                >
                  {t('footer.contactUs')}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    color: 'grey.300',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    mb: 2
                  }}
                >
                  <strong>{t('footer.openingHours.title')}</strong><br />
                  {t('footer.openingHours.weekdays')}<br />
                  {t('footer.openingHours.saturday')}<br />
                  {t('footer.openingHours.sunday')}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 2,
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    color: 'grey.300',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}
                >
                  <strong>{t('footer.contactInfo.mobile')}</strong>
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    color: 'grey.300',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}
                >
                  <strong>{t('footer.contactInfo.email')}</strong>
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    mt: 2,
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    color: 'grey.300',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}
                >
                  <strong>{t('footer.contactInfo.address')}</strong>
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