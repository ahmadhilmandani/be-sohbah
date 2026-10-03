const { OTP_DURATION_MINUTES } = require('../../const/otpDurationMinutes.js');

const { OTP_COOLDOWN_DURATION } = require('../../const/otpCooldownDuration.js');

const { getOtp, setOtpUsed } = require('../../repository/otp/otpRepository.js');
const { nowIndonesia, timestampNowSQL } = require('../../utils/datetime/datetimeUtils.js');
const otpUtils = require('../../utils/otpUtils.js');

const crypto = require('crypto')


exports.isOtpSent = async (connection, email, purpose) => {
  try {

    const now = nowIndonesia();

    const rawRes = await getOtp(
      connection,
      {
        email: email,
        purpose: purpose,
        used_at: 'NULL',
        created_at_start: now.minus({ minutes: OTP_DURATION_MINUTES }).toFormat('yyyy-MM-dd HH:mm:ss'),
        created_at_end: now.toFormat('yyyy-MM-dd HH:mm:ss')
      }
    );

    return getOtpRequestState(rawRes.length, now)

  } catch (error) {

    throw new Error(error)

  }

}


exports.verifyOtpRegister = async (connection, email, purpose, hashedOtp) => {

  const now = timestampNowSQL()

  const otp = await getOtp(connection,
    {
      'email': email,
      'purpose': purpose,
      'expires_at_start': now
    }
  )

  if (otp[0] == null) {

    throw new Error("OTP Kadaluwarsa");

  } else if (
    hashedOtp.length !== otp[0]['code_hash'].length ||
    !crypto.timingSafeEqual(hashedOtp, otp[0]['code_hash'])
  ) {

    throw new Error(`OTP Salah`);

  } else if (otp[0]['used_at']) {

    throw new Error("Otp Sudah pernah digunakan");

  }

  return otp
}


function getOtpRequestState(totalAttempts, now) {
  return {
    hasBeenSent: totalAttempts > 0,

    resendState: {
      canResend: totalAttempts < 2,
      cooldownTime: totalAttempts >= 2
        ? now.plus({ minutes: OTP_COOLDOWN_DURATION }).toFormat('yyyy-MM-dd HH:mm:ss')
        : null
    },

    totalAttempts
  };
}