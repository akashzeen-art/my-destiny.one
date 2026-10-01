import Layout from "@/components/Layout";
import { BRAND } from "@/lib/brand";

const AdminPanel = () => (
  <Layout>
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-display mb-3 text-2xl font-bold text-white">Admin</h1>
      <p className="text-sm text-white/55">
        Live consultation management has been removed from {BRAND.NAME}.
      </p>
    </div>
  </Layout>
);

export default AdminPanel;
