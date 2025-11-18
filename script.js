// Smooth scroll for in-page navigation
const navLinks = document.querySelectorAll('.nav a, .btn-primary[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// // Simple form handling
// const form = document.getElementById('booking-form');
// const messageEl = document.getElementById('form-message');

// form.addEventListener('submit', event => {
//   event.preventDefault();

//   messageEl.classList.remove('success', 'error');
//   messageEl.textContent = '';

//   const name = document.getElementById('name').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const age = document.getElementById('age').value.trim();
//   const sessionType = document.getElementById('sessionType').value;
//   const availability = document.getElementById('availability').value.trim();
//   const notes = document.getElementById('notes').value.trim();

//   if (!name || !email || !age || !sessionType) {
//     messageEl.textContent = 'Please fill in all required fields before sending.';
//     messageEl.classList.add('error');
//     return;
//   }

//   const emailTo = 'bookings@jttrauma.example'; // replace with your real address
//   const subject = encodeURIComponent('New JT Trauma Therapy Booking Request');
//   const bodyLines = [
//     `Name: ${name}`,
//     `Email: ${email}`,
//     `Age: ${age}`,
//     `Preferred session type: ${sessionType}`,
//     `Availability: ${availability || 'Not specified'}`,
//     '',
//     'Notes:',
//     notes || 'No additional notes provided.'
//   ];
//   const body = encodeURIComponent(bodyLines.join('\n'));

// //   const mailtoLink = `mailto:${emailTo}?subject=${subject}&body=${body}`;
// //   window.location.href = mailtoLink;

//   messageEl.textContent = 'We’ve opened your email app with your booking details. Please press send to complete your request.';
//   messageEl.classList.add('success');
  
//   window.location.href = "thank-you.html"; // redirect
//   form.reset();
// });

// Simple form handling
const form = document.getElementById('booking-form');
const messageEl = document.getElementById('form-message');

form.addEventListener('submit', async event => {
  event.preventDefault();

  messageEl.classList.remove('success', 'error');
  messageEl.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const age = document.getElementById('age').value.trim();
  const sessionType = document.getElementById('sessionType').value;
  const availability = document.getElementById('availability').value.trim();
  const notes = document.getElementById('notes').value.trim();

  if (!name || !email || !age || !sessionType) {
    messageEl.textContent = 'Please fill in all required fields before sending.';
    messageEl.classList.add('error');
    return;
  }

  // prepare data to send
  const data = {
    name,
    email,
    age,
    sessionType,
    availability,
    notes
  };

  try {
    const response = await fetch("https://formspree.io/f/xdkbaglg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // success
    window.location.href = "thank-you.html";
    form.reset();

  } catch (error) {
    messageEl.textContent = 'Something went wrong sending your request. Please try again.';
    messageEl.classList.add('error');
  }
});