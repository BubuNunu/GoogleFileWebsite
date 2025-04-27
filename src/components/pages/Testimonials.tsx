import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
} from '@mui/material';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.testimonial1.name'),
      role: t('testimonials.testimonial1.role'),
      image: 'https://via.placeholder.com/100x100?text=Customer+1',
      rating: 5,
      content: t('testimonials.testimonial1.content'),
    },
    {
      id: 2,
      name: t('testimonials.testimonial2.name'),
      role: t('testimonials.testimonial2.role'),
      image: 'https://via.placeholder.com/100x100?text=Customer+2',
      rating: 5,
      content: t('testimonials.testimonial2.content'),
    },
    {
      id: 3,
      name: t('testimonials.testimonial3.name'),
      role: t('testimonials.testimonial3.role'),
      image: 'https://via.placeholder.com/100x100?text=Customer+3',
      rating: 5,
      content: t('testimonials.testimonial3.content'),
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t('testimonials.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            {t('testimonials.subtitle')}
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {testimonials.map((testimonial) => (
            <Box key={testimonial.id} sx={{ width: { xs: '100%', md: 'calc(33.33% - 1rem)' } }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {testimonial.role}
                  </Typography>
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    "{testimonial.content}"
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Stats Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {t('testimonials.stats.title')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 4 }}>
            {[
              { value: t('testimonials.stats.customers'), label: t('testimonials.stats.customersLabel') },
              { value: t('testimonials.stats.projects'), label: t('testimonials.stats.projectsLabel') },
              { value: t('testimonials.stats.rating'), label: t('testimonials.stats.ratingLabel') },
              { value: t('testimonials.stats.years'), label: t('testimonials.stats.yearsLabel') },
            ].map((stat, index) => (
              <Box key={index} sx={{ width: { xs: '100%', sm: 'calc(50% - 1rem)', md: 'calc(25% - 1rem)' } }}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" color="primary" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials; 