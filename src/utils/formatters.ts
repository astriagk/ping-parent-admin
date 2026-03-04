/**
 * Format date to 'DD MMM, YYYY' format
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., '02 Feb, 2025')
 */
export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = dateObj.toLocaleString('en-US', { month: 'short' })
    const year = dateObj.getFullYear()
    return `${day} ${month}, ${year}`
  } catch {
    return '-'
  }
}

/**
 * Format time to 'HH:MM AM/PM' format
 * @param time - Time string or Date object
 * @returns Formatted time string (e.g., '02:30 PM')
 */
export const formatTime = (time: string | Date): string => {
  try {
    const timeObj = typeof time === 'string' ? new Date(time) : time
    const hours = String(timeObj.getHours()).padStart(2, '0')
    const minutes = String(timeObj.getMinutes()).padStart(2, '0')
    const ampm = timeObj.getHours() >= 12 ? 'PM' : 'AM'
    const displayHours = String(timeObj.getHours() % 12 || 12).padStart(2, '0')
    return `${displayHours}:${minutes} ${ampm}`
  } catch {
    return 'Invalid time'
  }
}

/**
 * Format amount with Indian Rupee symbol and comma separation
 * @param amount - Number or string value
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted amount string (e.g., '₹17,201')
 */
export function formatAmount(
  amount: number | string,
  decimals: number = 0
): string {
  try {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    if (isNaN(numAmount)) return '₹0'

    const formatted = numAmount.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    return `₹${formatted}`
  } catch {
    return '₹0'
  }
}

/**
 * Format phone number
 * @param phoneNumber - Phone number string
 * @returns Formatted phone number (e.g., '+91-9876543210')
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  try {
    const cleaned = phoneNumber.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `+91-${cleaned}`
    }
    return phoneNumber
  } catch {
    return phoneNumber
  }
}

/**
 * Format percentage value
 * @param value - Numeric value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string (e.g., '45.50%')
 */
export const formatPercentage = (
  value: number,
  decimals: number = 2
): string => {
  try {
    return `${value.toFixed(decimals)}%`
  } catch {
    return '0%'
  }
}
