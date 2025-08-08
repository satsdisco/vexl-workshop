// Simple auth utility for admin authentication

export function verifyAdminToken(token: string): boolean {
  // For now, just check if the token matches what we store
  // In production, you'd want to verify JWT or check against database
  const validToken = process.env.ADMIN_TOKEN || 'vexl-admin-2024'
  return token === validToken
}

export function generateAdminToken(): string {
  // Generate a simple token - in production use JWT
  return process.env.ADMIN_TOKEN || 'vexl-admin-2024'
}