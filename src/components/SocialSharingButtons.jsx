import React from 'react';

const RedditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"/>
    <path d="M20 12C20 10.9 19.1 10 18 10C17.4 10 16.9 10.3 16.5 10.7C15.1 9.8 13.3 9.3 11.3 9.2L12.5 5.5L15.5 6.2C15.5 7.2 16.3 8 17.3 8C18.3 8 19.1 7.2 19.1 6.2C19.1 5.2 18.3 4.4 17.3 4.4C16.6 4.4 16 4.8 15.7 5.4L12.2 4.6C12 4.6 11.8 4.7 11.7 4.9L10.3 9.2C8.3 9.3 6.4 9.8 5 10.7C4.6 10.3 4.1 10 3.5 10C2.4 10 1.5 10.9 1.5 12C1.5 12.8 2 13.4 2.6 13.7C2.6 13.9 2.6 14.1 2.6 14.3C2.6 16.9 6.7 19 11.8 19C16.9 19 21 16.9 21 14.3C21 14.1 21 13.9 21 13.7C21.7 13.4 22.1 12.7 22.1 12H20ZM7.5 13.5C7.5 12.7 8.1 12 9 12C9.8 12 10.5 12.7 10.5 13.5C10.5 14.3 9.9 15 9 15C8.1 15 7.5 14.3 7.5 13.5ZM14.7 16.7C14 17.4 12.8 17.7 12 17.7C11.2 17.7 10 17.4 9.3 16.7C9.1 16.5 9.1 16.2 9.3 16C9.5 15.8 9.8 15.8 10 16C10.5 16.5 11.3 16.7 12 16.7C12.7 16.7 13.5 16.5 14 16C14.2 15.8 14.5 15.8 14.7 16C14.9 16.2 14.9 16.5 14.7 16.7ZM15 15C14.2 15 13.5 14.3 13.5 13.5C13.5 12.7 14.1 12 15 12C15.8 12 16.5 12.7 16.5 13.5C16.5 14.3 15.9 15 15 15Z" fill="currentColor"/>
  </svg>
);

const SocialSharingButtons = () => {
  const shareUrl = "https://thehistoryofthetottenham.com";
  const title = "The History of Tottenham";

  // Define social media platforms with their colors and URLs
  const buttons = [
    { 
      name: 'Facebook', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, 
      color: '#3b5998', 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    { 
      name: 'Twitter', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, 
      color: '#1DA1F2', 
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`
    },
    { 
      name: 'WhatsApp', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, 
      color: '#25D366', 
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`
    },
    { 
      name: 'Reddit', 
      icon: <RedditIcon />, 
      color: '#FF5700', 
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`
    },
    { 
      name: 'Email', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>, 
      color: '#6e7882', 
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`
    },
    { 
      name: 'Copy Link', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>, 
      color: '#333333', 
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    },
  ];

  const handleClick = (button, e) => {
    if (button.action) {
      e.preventDefault();
      button.action();
    } else {
      window.open(button.url, '_blank', 'noopener,noreferrer');
      e.preventDefault();
    }
  };

  return (
    <div className="social-sharing-container">
      <div className="social-sharing-buttons">
        {buttons.map((button) => (
          <a
            key={button.name}
            href={button.url || '#'}
            onClick={(e) => handleClick(button, e)}
            className="social-button"
            style={{ backgroundColor: button.color }}
            aria-label={`Share on ${button.name}`}
            title={`Share on ${button.name}`}
          >
            <span className="social-icon">
              {button.icon}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialSharingButtons;