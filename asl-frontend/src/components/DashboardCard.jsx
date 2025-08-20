const StyledCard = styled(Card)(({ theme }) => ({
  height: '280px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, rgba(242, 117, 26, 0.1) 0%, rgba(227, 93, 15, 0.1) 100%)',
  border: '1px solid rgba(242, 117, 26, 0.2)',
  borderRadius: '16px',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(242, 117, 26, 0.15)',
  }
}));