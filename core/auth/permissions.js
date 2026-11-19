export function isVerifiedModerator(account) {
  return account?.role === "admin" && account.email_verified_at != null;
}

export function workflowRole(user) {
  if (!user?.userId) return null;
  return user.isAdmin ? "admin" : user.accountType;
}
