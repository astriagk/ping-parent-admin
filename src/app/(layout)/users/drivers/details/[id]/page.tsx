import DriversDetails from '@src/views/Users/Drivers/DriverDetails'

interface PageProps {
  params: Promise<{ id: string }>
}

const DriversDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params
  return <DriversDetails id={id} />
}

export default DriversDetailsPage
