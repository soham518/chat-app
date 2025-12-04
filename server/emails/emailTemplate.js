export const createWelcomeEmailTemplate = (name, clientURL) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f6f8fb; padding: 30px;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden;">
      
      <tr>
        <td style="background: linear-gradient(135deg, #007bff, #00c6ff); padding: 20px 30px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 22px;">Welcome to Our Platform 🎉</h2>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px;">
          <h3 style="margin: 0 0 10px 0;">Hi ${name},</h3>
          <p style="line-height: 1.6; color: #555;">
            We're excited to have you on board!  
            Your account has been successfully created and you're ready to explore everything we offer.
          </p>

          <p style="line-height: 1.6; color: #555;">
            Click the button below to get started:
          </p>

          <div style="text-align: center; margin: 25px 0;">
            <a href="${clientURL}" 
              style="
                padding: 12px 24px; 
                background: #007bff; 
                color: white; 
                text-decoration: none; 
                font-weight: bold; 
                border-radius: 6px;
                display: inline-block;
              ">
              Get Started 🚀
            </a>
          </div>

          <p style="line-height: 1.6; color: #555;">
            If you have any questions, feel free to reply to this email — we're always happy to help.
          </p>

          <p style="line-height: 1.6; color: #555;">
            Cheers,<br>
            The Team 😊
          </p>
        </td>
      </tr>

      <tr>
        <td style="background: #f0f3f7; padding: 15px 30px; text-align: center; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
  `;
};