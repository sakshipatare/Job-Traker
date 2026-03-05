import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

export const createMeetEvent = async (
  studentEmail,
  companyEmail,
  dateTime
) => {
  const event = {
    summary: "Interview Scheduled",
    description: "Interview scheduled via Job Portal",
    start: {
      dateTime: dateTime,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date(new Date(dateTime).getTime() + 60 * 60000),
      timeZone: "Asia/Kolkata",
    },
    attendees: [
      { email: studentEmail },
      { email: companyEmail },
    ],
    conferenceData: {
      createRequest: {
        requestId: uuidv4(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
};