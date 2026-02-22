export function formatAddress(address?: {
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  pincode?: string
}): string {
  if (!address) return ''
  const parts = [
    address.address_line1,
    address.address_line2,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean)
  return parts.join(', ')
}
