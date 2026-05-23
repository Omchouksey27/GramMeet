// const PDFDocument = require('pdfkit');

// const generateMeetingReport = (meeting, attendances, res) => {
//   const doc = new PDFDocument({ margin: 50 });

//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader(
//     'Content-Disposition',
//     `attachment; filename=meeting-report-${meeting._id}.pdf`
//   );
//   doc.pipe(res);

//   // Header
//   doc.fontSize(20).font('Helvetica-Bold').text('GramMeet — Meeting Report', { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(14).font('Helvetica').text(`Meeting: ${meeting.title}`);
//   doc.text(`Date: ${new Date(meeting.date).toLocaleString()}`);
//   doc.text(`Venue: ${meeting.venue}`);
//   doc.text(`Status: ${meeting.status}`);
//   doc.moveDown();

//   // Topics
//   doc.fontSize(13).font('Helvetica-Bold').text('Topics Discussed:');
//   doc.font('Helvetica');
//   meeting.topics.forEach((t) => doc.text(`  • ${t}`));
//   doc.moveDown();

//   // Conclusion
//   if (meeting.conclusion) {
//     doc.fontSize(13).font('Helvetica-Bold').text('Conclusion:');
//     doc.font('Helvetica').text(meeting.conclusion);
//     doc.moveDown();
//   }

//   // Actions taken
//   if (meeting.actionsTaken?.length) {
//     doc.fontSize(13).font('Helvetica-Bold').text('Actions Taken:');
//     doc.font('Helvetica');
//     meeting.actionsTaken.forEach((a) => doc.text(`  • ${a}`));
//     doc.moveDown();
//   }

//   // Attendance
//   doc.fontSize(13).font('Helvetica-Bold').text('Attendance:');
//   doc.font('Helvetica');

//   const present = attendances.filter((a) => a.status === 'present');
//   const absent = attendances.filter((a) => a.status === 'absent');
//   const pct = attendances.length
//     ? ((present.length / attendances.length) * 100).toFixed(1)
//     : 0;

//   doc.text(`Total Members: ${attendances.length}`);
//   doc.text(`Present: ${present.length}  |  Absent: ${absent.length}  |  Attendance: ${pct}%`);
//   doc.moveDown();

//   doc.font('Helvetica-Bold').text('Present Members:');
//   doc.font('Helvetica');
//   present.forEach((a) => doc.text(`  ✓ ${a.member?.name} (${a.member?.role})`));

//   doc.moveDown();
//   doc.font('Helvetica-Bold').text('Absent Members:');
//   doc.font('Helvetica');
//   absent.forEach((a) => doc.text(`  ✗ ${a.member?.name} (${a.member?.role})`));

//   doc.end();
// };

// module.exports = { generateMeetingReport };

const PDFDocument = require('pdfkit');

const generateMeetingReport = (meeting, attendances, res) => {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="meeting-report-${meeting._id}.pdf"`
  );
  res.setHeader('Access-Control-Allow-Origin', '*');

  doc.pipe(res);

  // ── Header bar ──────────────────────────────────────
  doc.rect(0, 0, 612, 80).fill('#166534');
  doc.fillColor('#ffffff')
    .fontSize(22)
    .font('Helvetica-Bold')
    .text('GramMeet', 50, 20);
  doc.fontSize(11)
    .font('Helvetica')
    .fillColor('#bbf7d0')
    .text('Gram Panchayat Meeting Report', 50, 48);
  doc.fillColor('#ffffff')
    .fontSize(10)
    .text(`Generated: ${new Date().toLocaleString('en-IN')}`, 50, 62);

  doc.moveDown(3);

  // ── Meeting Info ────────────────────────────────────
  doc.fillColor('#166534')
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('Meeting Details', 50, 100);

  doc.moveTo(50, 120).lineTo(562, 120).strokeColor('#166534').lineWidth(1.5).stroke();
  doc.moveDown(0.5);

  const info = [
    ['Title', meeting.title],
    ['Date & Time', new Date(meeting.date).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })],
    ['Venue', meeting.venue],
    ['Status', meeting.status?.toUpperCase()],
    ['Scheduled By', meeting.scheduledBy?.name || 'N/A'],
  ];

  let y = 130;
  info.forEach(([label, value]) => {
    doc.fillColor('#6b7280').fontSize(9).font('Helvetica-Bold').text(label.toUpperCase(), 50, y);
    doc.fillColor('#111827').fontSize(11).font('Helvetica').text(value || 'N/A', 180, y);
    y += 22;
  });

  y += 10;

  // ── Topics ──────────────────────────────────────────
  if (meeting.topics?.length > 0) {
    doc.fillColor('#166534').fontSize(14).font('Helvetica-Bold').text('Topics Discussed', 50, y);
    doc.moveTo(50, y + 18).lineTo(562, y + 18).strokeColor('#166534').lineWidth(1).stroke();
    y += 28;
    meeting.topics.forEach((topic) => {
      doc.fillColor('#374151').fontSize(11).font('Helvetica')
        .text(`•  ${topic}`, 60, y);
      y += 20;
    });
    y += 10;
  }

  // ── Description ─────────────────────────────────────
  if (meeting.description) {
    doc.fillColor('#166534').fontSize(14).font('Helvetica-Bold').text('Description', 50, y);
    doc.moveTo(50, y + 18).lineTo(562, y + 18).strokeColor('#166534').lineWidth(1).stroke();
    y += 28;
    doc.fillColor('#374151').fontSize(11).font('Helvetica').text(meeting.description, 50, y, { width: 512, lineGap: 4 });
    y += doc.heightOfString(meeting.description, { width: 512 }) + 20;
  }

  // ── Conclusion ──────────────────────────────────────
  if (meeting.conclusion) {
    doc.fillColor('#166534').fontSize(14).font('Helvetica-Bold').text('Conclusion', 50, y);
    doc.moveTo(50, y + 18).lineTo(562, y + 18).strokeColor('#166534').lineWidth(1).stroke();
    y += 28;
    doc.fillColor('#374151').fontSize(11).font('Helvetica').text(meeting.conclusion, 50, y, { width: 512, lineGap: 4 });
    y += doc.heightOfString(meeting.conclusion, { width: 512 }) + 20;
  }

  // ── Actions Taken ───────────────────────────────────
  if (meeting.actionsTaken?.length > 0) {
    doc.fillColor('#166534').fontSize(14).font('Helvetica-Bold').text('Actions Taken', 50, y);
    doc.moveTo(50, y + 18).lineTo(562, y + 18).strokeColor('#166534').lineWidth(1).stroke();
    y += 28;
    meeting.actionsTaken.forEach((action) => {
      doc.fillColor('#374151').fontSize(11).font('Helvetica').text(`✓  ${action}`, 60, y);
      y += 20;
    });
    y += 10;
  }

  // ── Attendance Summary ──────────────────────────────
  const present = attendances.filter((a) => a.status === 'present');
  const absent = attendances.filter((a) => a.status === 'absent');
  const pct = attendances.length
    ? ((present.length / attendances.length) * 100).toFixed(1)
    : 0;

  // Add new page if needed
  if (y > 650) {
    doc.addPage();
    y = 50;
  }

  doc.fillColor('#166534').fontSize(14).font('Helvetica-Bold').text('Attendance Summary', 50, y);
  doc.moveTo(50, y + 18).lineTo(562, y + 18).strokeColor('#166534').lineWidth(1).stroke();
  y += 28;

  // Summary boxes
  const boxes = [
    { label: 'Total', value: attendances.length, color: '#1e40af' },
    { label: 'Present', value: present.length, color: '#166534' },
    { label: 'Absent', value: absent.length, color: '#dc2626' },
    { label: 'Attendance %', value: `${pct}%`, color: '#92400e' },
  ];

  boxes.forEach((box, i) => {
    const bx = 50 + i * 130;
    doc.rect(bx, y, 120, 50).fill(box.color);
    doc.fillColor('#ffffff').fontSize(20).font('Helvetica-Bold')
      .text(String(box.value), bx, y + 8, { width: 120, align: 'center' });
    doc.fontSize(9).font('Helvetica')
      .text(box.label, bx, y + 32, { width: 120, align: 'center' });
  });

  y += 70;

  // ── Attendance Table ────────────────────────────────
  // Present members
  if (present.length > 0) {
    doc.fillColor('#166534').fontSize(13).font('Helvetica-Bold').text('Present Members', 50, y);
    y += 20;

    // Table header
    doc.rect(50, y, 512, 22).fill('#dcfce7');
    doc.fillColor('#166534').fontSize(9).font('Helvetica-Bold')
      .text('NAME', 60, y + 7)
      .text('ROLE', 250, y + 7)
      .text('WARD AREA', 380, y + 7);
    y += 22;

    present.forEach((a, idx) => {
      if (y > 750) { doc.addPage(); y = 50; }
      doc.rect(50, y, 512, 20).fill(idx % 2 === 0 ? '#f9fafb' : '#ffffff');
      doc.fillColor('#374151').fontSize(10).font('Helvetica')
        .text(a.member?.name || 'N/A', 60, y + 5)
        .text((a.member?.role || '').replace('_', ' '), 250, y + 5)
        .text(a.member?.wardArea || '—', 380, y + 5);
      y += 20;
    });
    y += 10;
  }

  // Absent members
  if (absent.length > 0) {
    if (y > 680) { doc.addPage(); y = 50; }
    doc.fillColor('#dc2626').fontSize(13).font('Helvetica-Bold').text('Absent Members', 50, y);
    y += 20;

    doc.rect(50, y, 512, 22).fill('#fee2e2');
    doc.fillColor('#dc2626').fontSize(9).font('Helvetica-Bold')
      .text('NAME', 60, y + 7)
      .text('ROLE', 250, y + 7)
      .text('WARD AREA', 380, y + 7);
    y += 22;

    absent.forEach((a, idx) => {
      if (y > 750) { doc.addPage(); y = 50; }
      doc.rect(50, y, 512, 20).fill(idx % 2 === 0 ? '#fff7f7' : '#ffffff');
      doc.fillColor('#374151').fontSize(10).font('Helvetica')
        .text(a.member?.name || 'N/A', 60, y + 5)
        .text((a.member?.role || '').replace('_', ' '), 250, y + 5)
        .text(a.member?.wardArea || '—', 380, y + 5);
      y += 20;
    });
  }

  // ── Footer ──────────────────────────────────────────
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    doc.rect(0, 800, 612, 42).fill('#166534');
    doc.fillColor('#bbf7d0').fontSize(9).font('Helvetica')
      .text('GramMeet — Gram Panchayat Meeting Management System', 50, 812, { align: 'center', width: 512 });
    doc.fillColor('#ffffff').fontSize(9)
      .text(`Page ${i + 1} of ${pages.count}`, 50, 825, { align: 'center', width: 512 });
  }

  doc.end();
};

module.exports = { generateMeetingReport };