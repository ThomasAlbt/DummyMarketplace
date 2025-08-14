import { useState, useEffect } from 'react';

const FetchOverlay = ({ id }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverlay = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/overlay/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        setHtmlContent(html);
      } catch (err) {
        setError(err.message);
        console.error('FetchOverlay error:', err);
      }
    };

    fetchOverlay();
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const postId = async ({ id }) => {
    try {
        const res = await fetch(`/api/${id}`, { method: 'POST' });
        const data = await res.json();
    } catch (error) {
        setError(err.message);
        console.error('FetchOverlay error:', err);
    }
}

export  { FetchOverlay, postId } ;
