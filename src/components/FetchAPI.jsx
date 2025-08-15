import { useState, useEffect } from 'react';

const FetchOverlay = ({ id }) => {

  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOverlay = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}overlay/${id}`);
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

const postId = async (id) => {

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URI}api/${id}`, { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('PostId error:', error);
    return { success: false, error: error.message };
  }
};

const usePostId = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const postId = async ({ id }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${id}`, { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (error) {
      setError(error.message);
      console.error('PostId error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return { postId, error, loading };
};

export { FetchOverlay, postId, usePostId };