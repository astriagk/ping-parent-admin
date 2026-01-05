import DriversDetails from '@src/views/Users/Drivers/DriverDetails'

interface PageProps {
  params: { id: string }
}

const DriversDetailsPage = ({ params }: PageProps) => {
  return <DriversDetails id={params.id} />
}

export default DriversDetailsPage
