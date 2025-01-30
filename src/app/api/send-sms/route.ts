import { NextResponse } from "next/server"
import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken)

export async function POST(request: Request) {
  const { to, body } = await request.json()

  if (!to || !body) {
    return NextResponse.json({ message: "Missing recipient number or message body" }, { status: 400 })
  }

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error("Twilio credentials are missing")
    return NextResponse.json({ message: "Server configuration error" }, { status: 500 })
  }

  try {
    console.log("Attempting to send SMS:", { to, body, from: twilioPhoneNumber })
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    })

    console.log("SMS Sent successfully:", message.sid)
    return NextResponse.json({ message: "SMS sent successfully", sid: message.sid })
  } catch (error: any) {
    console.error("Error sending SMS:", error)
    console.error("Error details:", error.code, error.message, error.moreInfo)
    return NextResponse.json(
      {
        message: "Failed to send SMS",
        error: error.message,
        code: error.code,
        moreInfo: error.moreInfo,
      },
      { status: 500 },
    )
  }
}

