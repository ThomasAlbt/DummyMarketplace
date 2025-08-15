const Star = ({ type }) => {
  return (
    <span style={{ color: '#FFD700', fontSize: '24px' }}>
      {type === 'full' ? '★' : type === 'half' ? '⯨' : '☆'}
    </span>
  );
};

const Rating = ({ value }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<Star key={i} type="full" />);
    } else if (value >= i - 0.5) {
      stars.push(<Star key={i} type="half" />);
    } else {
      stars.push(<Star key={i} type="empty" />);
    }
  }

  return <p>{stars}</p>;
};

export default Rating