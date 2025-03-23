export const emailTemplate = (user, otp) => `
      <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 12px; padding: 20px box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
          <div style="background: linear-gradient(to right, #A855F7, #9333EA); padding: 20px; text-align: center; border-radius: 12px 12px 0 0">
             <div style="font-size: 20px; font-weight: bold">
              <span style="color: #fff">Safe</span> <span style="color: #38BDF8">Report</span>
             </div>
          </div>

        <div style="padding: 20px;">
        <h2>Hi ${user.name || "User"},</h2>
          <p style="color: #6B7280; margin-top: 10px;">Here is your One Time Password (OTP).</p>
          <p>
          <span style="color: #6B7280; margin-top: 0; margin-bottom: 20px;">
          Please enter this code to verify your email address for</span> <span style="color: #9333EA; font-weight: bold;">ADMIN</span></p>

          <div style="display: flex; justify-content: center; margin: 20px 0;">
              ${otp
                .split("")
                .map(
                  (num) =>
                    `<div style="font-size: 24px; font-weight: bold; color: #000; background: #E5E7EB; padding: 10px; border-radius: 6px; margin: 0 5px; width: 40px; text-align: center;">${num}</div>`
                )
                .join("")}
          </div>
          <p>This OTP will expire in <span style="font-weight: bold;">10 minutes.</span></p>
          <p style="margin-top: 10px;">Best Regards,</p>
          <p><span style="color: #9333EA; font-weight: bold;">SafeReport Team</span></p>
        </div>

         <div style="border-top: 1px solid #ddd; padding: 20px; text-align: center; color: #6B7280; font-size: 12px;">
      <div style="margin-bottom: 10px;">
        <a href="#" style="margin: 0 10px; text-decoration: none; border-radius: 10px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="Instagram" style="width: 30px; height: 30px;">
        </a>
        <a href="#" style="margin: 0 10px; text-decoration: none; border-radius: 10px;">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1024px-Facebook_f_logo_%282021%29.svg.png" alt="Facebook" style="width: 30px; height: 30px;">
        </a>
      </div>
      <p>© 2025 SafeReport. All rights reserved.</p>
      <p style="margin-top: 10px;">
        You are receiving this mail because you registered to join the safeReport platform as a user or a creator.
        This also shows that you agree to our Terms of use and Privacy Policies. If you no longer want to
        receive mails from us, click the unsubscribe link below to unsubscribe.
      </p>
     <div style="margin-top: 10px;">
  <a href="#" style="margin: 0 10px; text-decoration: underline; color: #9333EA;">Privacy policy</a> •
  <a href="#" style="margin: 0 10px; text-decoration: underline; color: #9333EA;">Terms of service</a> •
  <a href="#" style="margin: 0 10px; text-decoration: underline; color: #9333EA;">Help center</a> •
  <a href="#" style="margin: 0 10px; text-decoration: underline; color: #9333EA;">Unsubscribe</a>
</div>
    </div>
        
      </div>
    `;
