const PDFDocument = require('pdfkit');
const { Readable } = require('node:stream');
const { pipeline } = require('node:stream/promises');

export default async function route({ request, reply, logger }) {
  // Set up error handler for response stream
  reply.raw.on('error', (error) => {
    logger.error({ error }, "Response stream error");
    if (!reply.raw.headersSent) {
      reply.raw.writeHead(500, { 'Content-Type': 'application/json' });
      reply.raw.end(JSON.stringify({
        error: "Stream error",
        details: error.message,
        code: "STREAM_ERROR"
      }));
    }
  });

  try {
    logger.info("Starting PDF generation");
    const chunks = [];

    // Initialize PDF document
    const doc = new PDFDocument({
      autoFirstPage: true,
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Collect chunks and handle PDF errors
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('error', error => {
      logger.error({ error }, "PDF generation error");
      throw new Error('PDF_GENERATION_ERROR: ' + error.message);
    });

    // Create promise to wait for PDF completion
    const pdfComplete = new Promise((resolve, reject) => {
      doc.on('end', resolve);
      doc.on('error', reject);
    });

    const generateResume = (doc, userInput) => {
      const {
        surname,
        lastname,
        email,
        phone,
        education,
        experience,
        links,
        projects,
        skills,
      } = userInput;

      // Function to draw a horizontal line
      const drawLine = () => {
        doc.moveTo(doc.x, doc.y)
          .lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .stroke('gray'); // Line in gray for subtle contrast
        doc.moveDown(0.5); // Add spacing after the line
      };

      // Header with Name and Contact Information
      doc.font('Helvetica-Bold')
        .fontSize(24)
        .fillColor('black')
        .text(`${surname} ${lastname}`, { align: 'center' }) // Bold name
        .moveDown();

      if (email) {
        let contactText = `Contact: ${email}`;

        // Only add the pipe and phone number if a phone number exists
        if (phone) {
          contactText += ` | ${phone}`;
        }

        doc.font('Helvetica')
          .fontSize(12)
          .fillColor('gray')
          .text(contactText, { align: 'center' }) // Contact info in one line
          .moveDown();

        drawLine(); // Add the line if contact info is present
      }

      if (links && links.length > 0) {
        doc.font('Helvetica-Oblique') // Italicized links
          .fillColor('#007BFF') // Light blue color for links
          .text(`Links: ${links.join(' | ')}`, { align: 'center' })
          .moveDown();
      }

      // Education Section
      if (education && education.length > 0) {
        doc.font('Helvetica-Bold')
          .fontSize(18)
          .fillColor('black')
          .text('Education', { align: 'left' }); // Section title
        drawLine();

        education.forEach((edu) => {
          doc.font('Helvetica-Bold')
            .fontSize(14)
            .fillColor('black')
            .text(edu.institution, { align: 'left' }); // Institution in gray

          doc.font('Helvetica')
            .fontSize(12)
            .fillColor('gray')
            .text(edu.degree, { align: 'left', continued: true }); // Degree in bold

          // Graduation date on the same line
          doc.font('Helvetica')
            .fontSize(12)
            .fillColor('gray')
            .text(` | Graduation: ${edu.graduation}`, { align: 'left' })
            .moveDown(); // Move to next line after the degree and graduation
        });
      }


      // Experience Section
      if (experience && experience.length > 0) {
        doc.font('Helvetica-Bold')
          .fontSize(18)
          .fillColor('black')
          .text('Experience', { align: 'left' }); // Section title
        drawLine();

        experience.forEach((job) => {
          doc.font('Helvetica-Bold')
            .fontSize(14)
            .fillColor('black')
            .text(job.title, { align: 'left' }); // Job title in black

          doc.font('Helvetica')
            .fontSize(12)
            .fillColor('gray')
            .text(`${job.company} | ${job.duration}`, { align: 'left' }); // Company and duration in gray

          // Adding impact bullet points
          if (job.impact && job.impact.length > 0) {
            job.impact.forEach((point) => {
              doc.font('Helvetica')
                .fontSize(12)
                .fillColor('black')
                .text(`- ${point}`, { align: 'left' });
            });
          }

          doc.moveDown();
        });
      }

      // Projects Section
      if (projects && projects.length > 0) {
        doc.font('Helvetica-Bold')
          .fontSize(18)
          .fillColor('black')
          .text('Projects', { align: 'left' }); // Section title
        drawLine();

        projects.forEach((project) => {
          doc.font('Helvetica-Bold')
            .fontSize(14)
            .fillColor('black')
            .text(project.name, { align: 'left' }); // Project name in black

          // Adding impact bullet points
          if (project.impact && project.impact.length > 0) {
            project.impact.forEach((point) => {
              doc.font('Helvetica')
                .fontSize(12)
                .fillColor('black')
                .text(`- ${point}`, { align: 'left' });
            });
          }

          if (project.url) {
            doc.font('Helvetica-Oblique') // Italicized for URLs
              .fillColor('#007BFF') // Light blue color for URLs
              .text(project.url, { align: 'left', link: project.url }) // Clickable link
              .fillColor('black'); // Reset color
          }

          doc.moveDown();
        });
      }

      // Skills Section
      if (skills && skills.length > 0) {
        doc.font('Helvetica-Bold')
          .fontSize(18)
          .fillColor('black')
          .text('Skills', { align: 'left' }); // Section title
        drawLine();

        doc.font('Helvetica')
          .fontSize(12)
          .fillColor('gray')
          .text(skills.join(', '), { align: 'left' });
      }

      doc.end();
    };

    // Call the function with a PDF document and user input
    generateResume(doc, request.body);



    await pdfComplete;

    const pdfBuffer = Buffer.concat(chunks);

    // Set all headers before starting stream
    reply.raw.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"',
      'Content-Length': pdfBuffer.length,
      'Cache-Control': 'no-cache'
    });

    // Stream the PDF using pipeline for proper error handling
    await pipeline(
      Readable.from(pdfBuffer),
      reply.raw
    );

    logger.info({ contentLength: pdfBuffer.length }, "PDF streamed successfully");

  } catch (error) {
    logger.error({ error }, "PDF generation or streaming failed");

    if (!reply.raw.headersSent) {
      reply.raw.writeHead(500, { 'Content-Type': 'application/json' });
      reply.raw.end(JSON.stringify({
        error: "PDF generation failed",
        details: error.message,
        code: error.message.startsWith('PDF_GENERATION_ERROR') ? 'PDF_GENERATION_ERROR' : 'PDF_SYSTEM_ERROR'
      }));
    }
  }
}