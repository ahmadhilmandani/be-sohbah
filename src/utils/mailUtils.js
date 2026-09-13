function otpEmailTemplate({ otp, appName = "My Application" }) {
  return `
  <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Kode OTP</title>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Manrope:wght@400;500;600;700&display=swap');

    .heading {
      font-family: 'Libre Caslon Text', Georgia, serif;
    }

    .body {
      font-family: 'Manrope', Arial, Helvetica, sans-serif;
    }
  </style>
</head>

<body style="
        margin: 0;
        padding: 0;
        background-color: #f2f5f3;
        font-family: 'Manrope', Arial, Helvetica, sans-serif;
        color: #29322b;
    ">

  <!-- Outer Container -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="
            background-color: #f2f5f3;
            padding: 40px 20px;
        ">
    <tr>
      <td align="center">

        <!-- Email Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="
                        max-width: 520px;
                        background-color: #ffffff;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid #cccccc;
                    ">

          <!-- Header -->
          <tr>
            <td style="
        padding: 32px 28px;
        text-align: center;
        background-color: #475b4c;
    ">
              <img src="cid:app-logo" alt="${appName}" width="120" style="
            display: block;
            width: 120px;
            height: auto;
            margin: 0 auto 12px;
        ">

              <h1 style="
            margin: 0;
            color: #ffffff;
            font-family: 'Libre Caslon Text', Georgia, serif;
            font-size: 26px;
            font-weight: 700;
            line-height: 1.3;
        ">
                Sohbah
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="
                                padding: 40px 32px;
                                background-color: #ffffff;
                            ">

              <!-- Heading -->
              <h2 style="
                                    margin: 0 0 16px;
                                    color: #3c4d40;
                                    font-family: 'Libre Caslon Text', Georgia, serif;
                                    font-size: 24px;
                                    font-weight: 700;
                                    line-height: 1.3;
                                ">
                Verifikasi Email
              </h2>

              <!-- Description -->
              <p style="
                                    margin: 0 0 24px;
                                    color: #525252;
                                    font-family: 'Manrope', Arial, Helvetica, sans-serif;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 1.7;
                                ">
                Gunakan kode OTP berikut untuk melanjutkan
                proses verifikasi akun Anda.
              </p>

              <!-- OTP Container -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="
                                            padding: 24px;
                                            background-color: #f2f5f3;
                                            border-radius: 8px;
                                            border: 1px solid #e2e8e4;
                                        ">
                    <div style="
                                                color: #323f35;
                                                font-family: 'Manrope', Arial, Helvetica, sans-serif;
                                                font-size: 32px;
                                                font-weight: 700;
                                                letter-spacing: 8px;
                                                line-height: 1;
                                            ">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Expiration -->
              <p style="
                                    margin: 24px 0 0;
                                    color: #6e6e6e;
                                    font-family: 'Manrope', Arial, Helvetica, sans-serif;
                                    font-size: 13px;
                                    line-height: 1.6;
                                ">
                Kode ini berlaku selama
                <strong style="color: #475b4c;">
                  5 menit
                </strong>.
              </p>

              <!-- Security Notice -->
              <p style="
                                    margin: 16px 0 0;
                                    color: #6e6e6e;
                                    font-family: 'Manrope', Arial, Helvetica, sans-serif;
                                    font-size: 13px;
                                    line-height: 1.6;
                                ">
                Jika Anda tidak meminta kode ini,
                abaikan email ini.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
                                padding: 20px 32px;
                                background-color: #fafafa;
                                text-align: center;
                                border-top: 1px solid #e5e5e5;
                            ">
              <p style="
                                    margin: 0;
                                    color: #6e6e6e;
                                    font-family: 'Manrope', Arial, Helvetica, sans-serif;
                                    font-size: 11px;
                                    line-height: 1.6;
                                ">
                Email ini dikirim secara otomatis.
                Jangan membalas email ini.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>

</html>
  `
}

module.exports = {
  otpEmailTemplate,
};