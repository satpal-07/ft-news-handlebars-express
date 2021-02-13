const formatDate = (date) => {
  try {
    const dateObject = new Date(date);
    dateObject.getMon;
    return dateObject.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Error in formatting the date: ' + error.message);
    return '';
  }
};

module.exports = { formatDate }
