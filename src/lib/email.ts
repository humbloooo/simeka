export interface ConfirmationEmailProps {
  name: string;
  email: string;
  roomType: string;
  referenceNumber: string;
}

export async function sendConfirmationEmail(props: ConfirmationEmailProps) {
  // Generate a unique reference number if not provided
  const ref = props.referenceNumber || `SH-${Date.now().toString(36).toUpperCase()}`;

  // Log the email payload (actual email provider integration is Phase 3)
  console.log("Mock Email Sent:");
  console.log("To:", props.email);
  console.log("Subject:", "Application Received - Simeka Heights");
  console.log("Payload:", { ...props, referenceNumber: ref });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return ref;
}
