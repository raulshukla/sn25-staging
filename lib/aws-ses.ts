import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

export async function sendVerificationEmail(email: string, verifyLink: string) {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Data: `
            <p>Welcome to Smokin'Notes!</p>
            <p>Please verify your email by clicking the link below:</p>
            <p><a href="${verifyLink}">Verify My Email</a></p>
          `,
        },
      },
      Subject: {
        Data: 'Verify your email - Smokin\'Notes',
      },
    },
    Source: process.env.SES_FROM_EMAIL!,
  };

  const command = new SendEmailCommand(params);
  await ses.send(command);
}
