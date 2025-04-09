import { useTranslation } from 'react-i18next';
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
} from '@mui/material';
import {
  Build,
  Handyman,
  ElectricBolt,
  CheckCircle,
  Language,
} from '@mui/icons-material';

const Home = () => {
  const { t } = useTranslation();

  const handleLanguageChange = () => {
    const currentLang = localStorage.getItem('language') || 'en';
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('language', newLang);
    window.location.reload();
  };

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      {/* Header/Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DAMI AIR
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {['home', 'about', 'services', 'products', 'projects', 'contact'].map((item) => (
              <Button key={item} color="inherit">
                {t(`nav.${item}`)}
              </Button>
            ))}
          </Box>
          <Button color="inherit" variant="outlined" sx={{ mx: 2 }}>
            {t('nav.getQuote')}
          </Button>
          <IconButton color="inherit" onClick={handleLanguageChange}>
            <Language />
          </IconButton>
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
        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: 'url(https://via.placeholder.com/1920x1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            position: 'relative',
            width: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
          }}
        >
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
              <Typography variant="h2" component="h1" gutterBottom>
                {t('hero.title')}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {t('hero.subtitle')}
              </Typography>
              <Button variant="contained" color="primary" size="large">
                {t('hero.cta')}
              </Button>
            </Box>
          </Container>
        </Box>

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
              <Grid key={index} component={Box} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
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
                  image="https://via.placeholder.com/600x400"
                  alt="About DAMI AIR"
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid sx={{ width: { xs: '100%', md: '50%' } }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {t('about.title')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('about.description')}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Featured Services */}
        <Container sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            {t('featuredServices.title')}
          </Typography>
          <Grid container spacing={4}>
            {[
              t('featuredServices.splitSystems'),
              t('featuredServices.ductedHeating'),
              t('featuredServices.evaporativeCooling'),
              t('featuredServices.vrvSystems'),
              t('featuredServices.commercialHvac'),
            ].map((service, index) => (
              <Grid key={index} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" align="center">
                      {service}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Why Choose Us */}
        <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
          <Container>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              {t('whyChooseUs.title')}
            </Typography>
            <List>
              {[
                t('whyChooseUs.pricing'),
                t('whyChooseUs.technicians'),
                t('whyChooseUs.brands'),
                t('whyChooseUs.support'),
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Container>
            <Typography variant="h4" component="h2" gutterBottom>
              {t('cta.title')}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              {t('cta.button')}
            </Button>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <Typography variant="h6" gutterBottom>
                {t('footer.companyName')}
              </Typography>
              <Typography variant="body2">
                {t('footer.address')}
              </Typography>
              <Typography variant="body2">
                {t('footer.phone')}
              </Typography>
              <Typography variant="body2">
                {t('footer.email')}
              </Typography>
            </Grid>
            <Grid sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <Typography variant="h6" gutterBottom>
                {t('footer.contact')}
              </Typography>
              <List>
                {['home', 'about', 'services', 'products', 'projects', 'contact'].map((item) => (
                  <ListItem key={item} disableGutters>
                    <Button color="inherit">{t(`nav.${item}`)}</Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <Button
                color="inherit"
                startIcon={<Language />}
                onClick={handleLanguageChange}
              >
                {localStorage.getItem('language') === 'en' ? '中文' : 'English'}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 