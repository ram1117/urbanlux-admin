import OrdersTab from "@/components/orders/OrdersTab";
import { redirectToLogin } from "@/lib/firebase/firebase.server";

export default async function Home() {
  await redirectToLogin();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <OrdersTab></OrdersTab>
    </main>
  );
}
