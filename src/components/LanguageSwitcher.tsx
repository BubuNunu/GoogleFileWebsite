import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem, Typography, Box, Chip } from '@mui/material';
import { Translate } from '@mui/icons-material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    handleClose();
  };

  const getCurrentLanguageLabel = () => {
    return i18n.language === 'zh' ? '中文' : 'EN';
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }
        }}
        aria-label="language switcher"
        aria-controls="language-menu"
        aria-haspopup="true"
      >
        <Translate sx={{ fontSize: 18, mr: 0.5, color: 'white' }} />
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'white', 
            fontWeight: 500,
            fontSize: '0.9rem'
          }}
        >
          {getCurrentLanguageLabel()}
        </Typography>
      </Box>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          onClick={() => changeLanguage('en')}
          selected={i18n.language === 'en'}
          sx={{
            minWidth: 120,
            backgroundColor: i18n.language === 'en' ? 'primary.light' : 'transparent',
            '&:hover': {
              backgroundColor: i18n.language === 'en' ? 'primary.light' : 'grey.100',
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography>English</Typography>
            {i18n.language === 'en' && (
              <Chip size="small" label="Active" color="primary" sx={{ ml: 1, fontSize: '0.7rem' }} />
            )}
          </Box>
        </MenuItem>
        <MenuItem 
          onClick={() => changeLanguage('zh')}
          selected={i18n.language === 'zh'}
          sx={{
            minWidth: 120,
            backgroundColor: i18n.language === 'zh' ? 'primary.light' : 'transparent',
            '&:hover': {
              backgroundColor: i18n.language === 'zh' ? 'primary.light' : 'grey.100',
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography>中文</Typography>
            {i18n.language === 'zh' && (
              <Chip size="small" label="当前" color="primary" sx={{ ml: 1, fontSize: '0.7rem' }} />
            )}
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher; 