import '@assets/css/fonts/fonts.css'
import '@assets/css/icons.css'
import '@assets/css/plugins.css'
import '@assets/css/tailwind.css'
import ClientProviders from '@common/ClientProviders'
import PageLoader from '@common/PageLoader'
import ProgressBar from '@common/ProgressBar'
import 'flatpickr/dist/flatpickr.css'
import 'nprogress/nprogress.css'
import 'simplebar-react/dist/simplebar.min.css'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <PageLoader />
        <ProgressBar />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
