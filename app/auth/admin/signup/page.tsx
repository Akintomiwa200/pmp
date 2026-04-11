import SignupForm from "../../signup/SignupForm";

export default function AdminSignupPage() {
  return (
    <SignupForm
      role="admin"
      title="Admin signup"
      subtitle="Invite-only access for course and community moderators."
    />
  );
}
