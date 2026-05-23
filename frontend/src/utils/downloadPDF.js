// // utils/downloadPDF.js — create this file at src/utils/downloadPDF.js
// const downloadPDF = async (meetingId, meetingTitle) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(
//       `http://localhost:5000/api/reports/pdf/${meetingId}?token=${token}`,
//       { method: 'GET' }
//     );

//     if (!response.ok) throw new Error('Failed to download');

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `meeting-report-${meetingTitle || meetingId}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   } catch (err) {
//     alert('PDF download failed. Please try again.');
//   }
// };

// export default downloadPDF;

const downloadPDF = async (meetingId, meetingTitle) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login again.');
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/reports/pdf/${meetingId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Download failed');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/pdf')) {
      throw new Error('Server did not return a PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `meeting-${meetingTitle || meetingId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('PDF error:', err);
    alert('PDF download failed: ' + err.message);
  }
};

export default downloadPDF;