import React, { useState } from 'react';

function App() {
  const [videoId, setVideoId] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setDownloadUrl(null);
    try {
      const res = await fetch('https://apex-transcriber-backend.up.railway.app/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      const data = await res.json();
      if (data.downloadUrl) {
        setDownloadUrl(`https://apex-transcriber-backend.up.railway.app${data.downloadUrl}`);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Apex Transcriber</h1>
      <input
        type="text"
        placeholder="Enter Brightcove Video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Processing...' : 'Submit'}
      </button>
      {downloadUrl && (
        <p>
          <a href={downloadUrl} download style={{ marginTop: '1rem', display: 'inline-block' }}>
            Download Cue Sheet
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
