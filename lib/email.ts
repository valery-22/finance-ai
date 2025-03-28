import sgMail from "@sendgrid/mail"

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

/**
 * Send verification email to user
 */
export async function sendVerificationEmail(email: string, firstName: string): Promise<boolean> {
  try {
    // Skip in development mode if no API key
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("SendGrid API key not found. Skipping email sending.")
      return true
    }

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM || "noreply@financeai.com",
      subject: "Verify your FinanceAI account",
      text: `Hello ${firstName}, please verify your email to activate your FinanceAI account.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #8B5CF6, #3B82F6); padding: 20px; text-align: center; color: white;">
            <h1>FinanceAI</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2>Verify Your Email</h2>
            <p>Hello ${firstName},</p>
            <p>Thank you for signing up for FinanceAI. Please verify your email to activate your account.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?email=${encodeURIComponent(email)}" 
                 style="background: linear-gradient(to right, #8B5CF6, #3B82F6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Verify Email
              </a>
            </div>
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <p>Best regards,<br>The FinanceAI Team</p>
          </div>
        </div>
      `,
    }

    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error("Error sending verification email:", error)
    return false
  }
}

/**
 * Send welcome email to user after verification
 */
export async function sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
  try {
    // Skip in development mode if no API key
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("SendGrid API key not found. Skipping email sending.")
      return true
    }

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM || "noreply@financeai.com",
      subject: "Welcome to FinanceAI!",
      text: `Welcome to FinanceAI, ${firstName}! Your account is now active.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #8B5CF6, #3B82F6); padding: 20px; text-align: center; color: white;">
            <h1>FinanceAI</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2>Welcome to FinanceAI!</h2>
            <p>Hello ${firstName},</p>
            <p>Thank you for verifying your email. Your FinanceAI account is now active!</p>
            <p>Here are some things you can do to get started:</p>
            <ul>
              <li>Connect your bank accounts</li>
              <li>Set up your financial goals</li>
              <li>Explore AI-powered insights</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: linear-gradient(to right, #8B5CF6, #3B82F6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Go to Dashboard
              </a>
            </div>
            <p>Best regards,<br>The FinanceAI Team</p>
          </div>
        </div>
      `,
    }

    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return false
  }
}

