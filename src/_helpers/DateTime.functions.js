function getTimeDifference(publishedAt) {
    const now = new Date(); // Current date/time
    const published = new Date(publishedAt); // Convert publishedAt to a Date object
  
    const diff = now - published; // Difference in milliseconds
  
    // Convert milliseconds to different time units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    // Return the duration based on the calculated time units
    if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''} `;
    } else if (months > 0) {
      return `${months} month${months !== 1 ? 's' : ''} `;
    } else if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} `;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} `;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} `;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} `;
    }
  }


export {
    getTimeDifference
}

