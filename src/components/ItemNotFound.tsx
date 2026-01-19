interface ItemNotFoundProps {
  message?: string
}

export default function ItemNotFound({ message }: ItemNotFoundProps) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Item Not Found</h2>
      <p>{message || 'The item you are looking for could not be found.'}</p>
    </div>
  )
}
