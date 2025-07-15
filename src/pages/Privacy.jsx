import React from 'react'

const Privacy = () => {
  return (

    <div className="container py-5">
      <h2 className="mb-4 text-center">Privacy Policy</h2>

      <p>
        At <strong>Forksy</strong>, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your information when you use our app or services.
      </p>

      <h4 className="mt-4">1. Information We Collect</h4>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address.</li>
        <li><strong>Order Data:</strong> Products ordered, transaction amount, and timestamps.</li>
        <li><strong>Usage Data:</strong> Pages visited, device type, IP address (for analytics).</li>
      </ul>

      <h4 className="mt-4">2. How We Use Your Information</h4>
      <ul>
        <li>To process and deliver your orders.</li>
        <li>To improve user experience and app performance.</li>
        <li>To send order updates and relevant notifications.</li>
      </ul>

      <h4 className="mt-4">3. Data Sharing</h4>
      <p>We do not sell or rent your personal data to third parties. However, we may share it with:</p>
      <ul>
        <li>Delivery partners and logistics providers.</li>
        <li>Payment gateways (e.g., Razorpay) for secure transactions.</li>
        <li>Legal authorities if required by law.</li>
      </ul>

      <h4 className="mt-4">4. Your Choices</h4>
      <ul>
        <li>You can view or update your profile information anytime.</li>
        <li>You may contact us to request deletion of your account and data.</li>
      </ul>

      <h4 className="mt-4">5. Cookies & Tracking</h4>
      <p>We use minimal cookies for session management and analytics. You can disable them in your browser settings.</p>

      <h4 className="mt-4">6. Data Security</h4>
      <p>Your data is stored securely with restricted access. We use HTTPS encryption and secure backend storage.</p>

      <h4 className="mt-4">7. Changes to this Policy</h4>
      <p>This policy may be updated occasionally. Any changes will be reflected on this page with an updated date.</p>

      <p className="mt-5 text-muted">Last updated: July 2025</p>
    </div>

  )
}

export default Privacy
