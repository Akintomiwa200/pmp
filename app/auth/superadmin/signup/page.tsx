import SignupForm from "../../signup/SignupForm";

export default function SuperadminSignupPage() {
  return (
    <SignupForm
      role="superadmin"
      title="Superadmin signup"
      subtitle="Invite-only access for system administrators."
    />
  );
}
