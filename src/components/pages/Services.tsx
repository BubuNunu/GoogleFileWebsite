import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  useMediaQuery,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import {
  AcUnit,
  Recycling,
  Home,
  Build,
  Engineering,
  ElectricBolt
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Define service data structure
interface ServiceItem {
  id: string;
  icon: JSX.Element;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  details: {
    en: string[];
    zh: string[];
  };
}

// Define services data
const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'installation',
    icon: <AcUnit />,
    title: {
      en: 'Air Conditioning Installation',
      zh: '空调安装'
    },
    description: {
      en: 'Professional installation of ducted systems, VRV/VRF systems and single split systems for homes and commercial spaces, ensuring efficient and long-lasting performance.',
      zh: '专业安装管道系统、VRV/VRF系统和家庭及商业空间的单分体系统，确保高效和持久的性能。'
    },
    details: {
      en: [
        'Expert installation of all major brands',
        'Custom system design for your space',
        'Energy-efficient solutions',
        'Professional commissioning',
        'Warranty-backed workmanship'
      ],
      zh: [
        '专业安装各大品牌',
        '为您的空间定制系统设计',
        '节能解决方案',
        '专业调试',
        '质保支持的工艺'
      ]
    }
  },
  {
    id: 'veu',
    icon: <Recycling />,
    title: {
      en: 'Victorian Energy Upgrades (VEU)',
      zh: '维多利亚能源升级（VEU）'
    },
    description: {
      en: 'As a fully qualified team, we help clients transition from gas heating to energy-efficient electric systems — with access to available VEU rebates.',
      zh: '作为一支完全合格的团队，我们帮助客户从燃气供暖过渡到节能电力系统——并享受可用的VEU折扣。'
    },
    details: {
      en: [
        'Upfront after-rebate pricing',
        'Complete rebate application management',
        'Energy efficiency assessment',
        'System upgrade recommendations',
        'Full compliance documentation'
      ],
      zh: [
        '折扣后的预付定价',
        '完整的退款申请管理',
        '能源效率评估',
        '系统升级建议',
        '完整的合规文档'
      ]
    }
  },
  {
    id: 'maintenance',
    icon: <Engineering />,
    title: {
      en: 'Maintenance & Servicing',
      zh: '维护与保养'
    },
    description: {
      en: 'Extend the life of your HVAC system with regular servicing. We provide routine maintenance to keep your system running smoothly.',
      zh: '通过定期保养延长您的暖通空调系统的使用寿命。我们提供常规维护，以保持您的系统平稳运行。'
    },
    details: {
      en: [
        'Regular maintenance plans',
        'Performance optimization',
        'Filter cleaning/replacement',
        'System health checks',
        'Preventive maintenance'
      ],
      zh: [
        '定期维护计划',
        '性能优化',
        '过滤器清洁/更换',
        '系统健康检查',
        '预防性维护'
      ]
    }
  },
  {
    id: 'new-homes',
    icon: <Home />,
    title: {
      en: 'HVAC System Design for New Homes',
      zh: '新住宅暖通空调系统设计'
    },
    description: {
      en: 'We work with builders and developers to design customised and modern heating and cooling systems that align with the layout and energy requirements of new constructions.',
      zh: '我们与建筑商和开发商合作，设计定制的现代化供暖和制冷系统，以符合新建筑的布局和能源要求。'
    },
    details: {
      en: [
        'Custom system design',
        'Load calculations',
        'Energy efficiency optimization',
        'Integration with home design',
        'Future-proof solutions'
      ],
      zh: [
        '定制系统设计',
        '负载计算',
        '能源效率优化',
        '与家居设计融合',
        '面向未来的解决方案'
      ]
    }
  },
  {
    id: 'renovations',
    icon: <Build />,
    title: {
      en: 'Air Conditioning for Renovations',
      zh: '翻新工程的空调系统'
    },
    description: {
      en: 'Upgrading your home? We do professional assessment and integration of new air conditioning systems during home renovations.',
      zh: '正在升级您的住宅？我们在家居翻新过程中提供专业的评估和新空调系统的集成。'
    },
    details: {
      en: [
        'Renovation-specific solutions',
        'Minimal disruption installation',
        'Design integration',
        'System upgrades',
        'Modern technology integration'
      ],
      zh: [
        '针对翻新的特定解决方案',
        '最小干扰安装',
        '设计集成',
        '系统升级',
        '现代技术集成'
      ]
    }
  },
  {
    id: 'repairs',
    icon: <ElectricBolt />,
    title: {
      en: 'HVAC Repairs & Troubleshooting',
      zh: '暖通空调维修与故障排除'
    },
    description: {
      en: 'Quick, reliable repairs for faulty air conditioning and HVAC systems. Our technicians diagnose and resolve issues fast.',
      zh: '快速、可靠地修复故障空调和暖通空调系统。我们的技术人员快速诊断和解决问题。'
    },
    details: {
      en: [
        'Emergency repair service',
        'Diagnostic testing',
        'Component replacement',
        'Performance restoration',
        'Post-repair testing'
      ],
      zh: [
        '紧急维修服务',
        '诊断测试',
        '部件更换',
        '性能恢复',
        '维修后测试'
      ]
    }
  }
];

interface ServicesProps {
  onQuoteClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onQuoteClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { i18n } = useTranslation();
  const language = i18n.language === 'zh' ? 'zh' : 'en';
  
  // State to track selected service
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  
  console.log('Current language:', i18n.language, 'Using:', language, 'Selected service:', selectedServiceId);

  // Process URL hash on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && SERVICES_DATA.some(service => service.id === hash)) {
        setSelectedServiceId(hash);
      }
    };

    // Initial check
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    if (serviceId !== selectedServiceId) {
      setSelectedServiceId(serviceId);
      window.history.replaceState(null, '', `#${serviceId}`);
    }
  };

  // Get current selected service
  const selectedService = SERVICES_DATA.find(service => service.id === selectedServiceId) || SERVICES_DATA[0];
  
  // Get current service index for tab value
  const selectedIndex = SERVICES_DATA.findIndex(service => service.id === selectedServiceId);

  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Navigation Sidebar */}
        <Box sx={{ 
          width: isMobile ? '100%' : 280, 
          borderRight: isMobile ? 0 : 1, 
          borderColor: 'divider',
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          bgcolor: 'background.paper',
          zIndex: 1,
          boxShadow: isMobile ? 0 : 1
        }}>
          {isMobile ? (
            <Tabs
              value={selectedIndex}
              onChange={(_, newValue) => handleServiceSelect(SERVICES_DATA[newValue].id)}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="services tabs"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  minHeight: '60px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}
            >
              {SERVICES_DATA.map((service) => (
                <Tab 
                  key={service.id}
                  icon={service.icon}
                  iconPosition="start"
                  label={service.title[language]}
                  id={`tab-${service.id}`}
                  aria-controls={`tabpanel-${service.id}`}
                />
              ))}
            </Tabs>
          ) : (
            <Box sx={{ pt: 4, pb: 2 }}>
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold', 
                  px: 3, 
                  mb: 3 
                }}
              >
                {language === 'en' ? 'Our Services' : '我们的服务'}
              </Typography>
              <List>
                {SERVICES_DATA.map((service) => (
                  <ListItem key={service.id} disablePadding>
                    <ListItemButton
                      selected={selectedServiceId === service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      sx={{
                        py: 2,
                        borderLeft: selectedServiceId === service.id ? 4 : 0,
                        borderColor: 'primary.main',
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ 
                        minWidth: 40, 
                        color: selectedServiceId === service.id ? 'primary.main' : 'inherit' 
                      }}>
                        {service.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={service.title[language]} 
                        primaryTypographyProps={{
                          fontSize: '0.95rem',
                          fontWeight: selectedServiceId === service.id ? 'bold' : 'normal',
                          color: selectedServiceId === service.id ? 'primary.main' : 'inherit'
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            bgcolor: 'background.default',
            overflow: 'auto',
            pt: { xs: 2, md: 2 }
          }}
        >
          {/* Key is crucial here to force remount when service changes */}
          <Box 
            key={`service-${selectedServiceId}`}
            id={selectedService.id}
            sx={{ 
              p: { xs: 2, md: 4 },
              scrollMarginTop: '100px',
              position: 'relative',
              minHeight: '60vh',
            }}
          >
            {/* Anchor for scrolling */}
            <div id={`anchor-${selectedService.id}`} style={{ 
              position: 'absolute', 
              top: '-100px', 
              visibility: 'hidden'
            }} />
            
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 4
            }}>
              {selectedService.title[language]}
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
              {selectedService.description[language]}
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
              {language === 'en' ? 'What We Offer:' : '我们提供的服务:'}
            </Typography>

            <Grid container spacing={3}>
              {selectedService.details[language].map((detail, index) => (
                <Grid item xs={12} md={6} key={`${selectedServiceId}-detail-${index}`}>
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
                {language === 'en' ? 'Get a Quote' : '获取报价'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Services; 