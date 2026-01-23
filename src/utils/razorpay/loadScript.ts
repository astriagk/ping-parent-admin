/**
 * Load Razorpay script dynamically
 * Returns a promise that resolves when the script is loaded
 */
export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if ((window as any).Razorpay) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true

    script.onload = () => {
      resolve()
    }

    script.onerror = () => {
      reject(new Error('Failed to load Razorpay script'))
    }

    document.body.appendChild(script)
  })
}
