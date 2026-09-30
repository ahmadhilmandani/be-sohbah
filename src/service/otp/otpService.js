const { OTP_DURATION_MINUTES } = require('../../const/otpDurationMinutes.js');

const { OTP_COOLDOWN_DURATION } = require('../../const/otpCooldownDuration.js');

const { getOtp } = require('../../repository/otp/otpRepository.js');
const { timestampNowSQL, nowIndonesia } = require('../../utils/datetime/datetimeUtils.js');


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


function getOtpRequestState(totalAttempts, now) {
  return {
    hasBeenSent: totalAttempts > 0,

    resendState: {
      canResend: totalAttempts < 5,
      cooldownTime: totalAttempts >= 5
        ? now.plus({ minutes: OTP_COOLDOWN_DURATION }).toFormat('yyyy-MM-dd HH:mm:ss')
        : null
    },

    totalAttempts
  };
}