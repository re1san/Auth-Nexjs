import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

// emailType is for what type of email, forgot password/verify email!

export const sendEmail = async ({email, emailType, userId}: any) => {
  try {
    // Its possible to have userId as bson of mongo thats why toString
    const hashedTkn = await bcryptjs.hash(userId.toString(), 10);

    // Usually we do this with ENUM
    if(emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedTkn,
        verifyTokenExpiry: Date.now() + 86400 // 1 day
      })
    } else if(emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedTkn,
        forgotPasswordTokenExpiry: Date.now() + 86400 // 1 day
      })
    }

    let transport = nodemailer.createTransport({
      // Similarly we can have diff hosts for Gmail etc...
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c87b56d78075ca",
        pass: "dd8673a8520e96"
      }
    });

    const mailOptions = {
      from: "re1san@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
          <title>
      
          </title>
          <!--[if !mso]><!-- -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
              #outlook a {
                  padding: 0;
              }
      
              .ReadMsgBody {
                  width: 100%;
              }
      
              .ExternalClass {
                  width: 100%;
              }
      
              .ExternalClass * {
                  line-height: 100%;
              }
      
              body {
                  margin: 0;
                  padding: 0;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
              }
      
              table,
              td {
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }
      
              img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
              }
      
              p {
                  display: block;
                  margin: 13px 0;
              }
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
              @media only screen and (max-width:480px) {
                  @-ms-viewport {
                      width: 320px;
                  }
                  @viewport {
                      width: 320px;
                  }
              }
          </style>
          <!--<![endif]-->
          <!--[if mso]>
              <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
          <!--[if lte mso 11]>
              <style type="text/css">
                .outlook-group-fix { width:100% !important; }
              </style>
              <![endif]-->
      
      
          <style type="text/css">
              @media only screen and (min-width:480px) {
                  .mj-column-per-100 {
                      width: 100% !important;
                  }
              }
          </style>
      
      
          <style type="text/css">
          </style>
      
      </head>
      
      <body style="background-color:#f9f9f9;">
      
      
          <div style="background-color:#f9f9f9;">
      
      
              <!--[if mso | IE]>
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
            >
              <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
      
      
              <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
      
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                      <tbody>
                          <tr>
                              <td style="border-bottom:#383838 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                  <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      
              <tr>
            
              </tr>
            
                        </table>
                      <![endif]-->
                              </td>
                          </tr>
                      </tbody>
                  </table>
      
              </div>
      
      
              <!--[if mso | IE]>
                </td>
              </tr>
            </table>
            
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
            >
              <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
      
      
              <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
      
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                      <tbody>
                          <tr>
                              <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                  <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      
              <tr>
            
                  <td
                     style="vertical-align:bottom;width:600px;"
                  >
                <![endif]-->
      
                                  <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
      
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
      
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                      <tbody>
                                                          <tr>
                                                              <td style="width:64px;">
      
                                                                  <img height="auto" src="https://i.imgur.com/KO1vcE9.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
      
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
      
                                              </td>
                                          </tr>
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
      
                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:32px;font-weight:bold;line-height:1;text-align:center;color:#272727;">
                                                      Verify your email
                                                  </div>
      
                                              </td>
                                          </tr>
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
      
                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#494949;">
                                                      Yes, we know.
                                                  </div>
      
                                              </td>
                                          </tr>
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
      
                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#494949;">
                                                      An email to confirm an email. 🤪
                                                  </div>
      
                                              </td>
                                          </tr>
      
                                     
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:20px;word-break:break-word;">
      
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                      <tr>
                                                          <td align="center" bgcolor="#101010" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 15px;" valign="middle">
                                                              <a href="${process.env.DOMAIN}/verifyemail?token=${hashedTkn}" style="background:#101010;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                                  Confirm Your Email
                                                              </a>
                                                          </td>
                                                      </tr>
                                                  </table>
      
                                              </td>
                                          </tr>
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
      
                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#494949;">
                                                      Or verify using this link:
                                                  </div>
      
                                              </td>
                                          </tr>
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:20px;word-break:break-word;">
      
                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#494949;">
                                                      <a href="https://www.htmlemailtemplates.net/free-html-emails-for-startups" style="color:#2F67F6">${process.env.DOMAIN}/verifyemail?token=${hashedTkn}</a>
                                                  </div>
      
                                              </td>
                                          </tr>
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
      
                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:26px;font-weight:bold;line-height:1;text-align:center;color:#272727;">
                                                      Need Help?
                                                  </div>
      
                                              </td>
                                          </tr>
      
                                          <tr>
                                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
      
                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:22px;text-align:center;color:#494949;">
                                                      Please send and feedback or bug info<br> to <a href="mailto:info@example.com" style="color:#2F67F6">re1san@gmail.com</a>
                                                  </div>
      
                                              </td>
                                          </tr>
      
                                      </table>
      
                                  </div>
      
                                  <!--[if mso | IE]>
                  </td>
                
              </tr>
            
                        </table>
                      <![endif]-->
                              </td>
                          </tr>
                      </tbody>
                  </table>
      
              </div>
      
      
              <!--[if mso | IE]>
                </td>
              </tr>
            </table>
            
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
            >
              <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
      
      
              <div style="Margin:0px auto;max-width:600px;">
      
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                      <tbody>
                          <tr>
                              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                  <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      
              <tr>
            
                  <td
                     style="vertical-align:bottom;width:600px;"
                  >
                <![endif]-->
      
                                  <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
      
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                          <tbody>
                                              <tr>
                                                  <td style="vertical-align:bottom;padding:0;">
      
                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
      
                                                          <tr>
                                                              <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
      
                                                                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#494949;">
                                                                      Made with &#10084; by Aniket
                                                                  </div>
      
                                                              </td>
                                                          </tr>
      
                                                          <tr>
                                                              <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
      
      
                                                              </td>
                                                          </tr>
      
                                                      </table>
      
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
      
                                  </div>
      
                                  <!--[if mso | IE]>
                  </td>
                
              </tr>
            
                        </table>
                      <![endif]-->
                              </td>
                          </tr>
                      </tbody>
                  </table>
      
              </div>
      
      
              <!--[if mso | IE]>
                </td>
              </tr>
            </table>
            <![endif]-->
      
      
          </div>
      
      </body>
      
      </html>`
    }

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;

  } catch (error: any) {
    throw new Error(error.message);
  }
}