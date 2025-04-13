
import OrderConfirmationContent from "../components/OrderConfirmationContent"
import Footer from "../components/Footer"

export default function OrderConfirmation() {
  return (
    <>
    
      <main className="bg-gray-50 min-h-screen">
      <OrderConfirmationContent orderNumber="ORDER-256261" estimatedDelivery="30-45 minutes" />

      </main>
      <Footer />
    </>
  )
}
