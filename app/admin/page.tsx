import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link href="/admin/categories" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-bold mb-2">Categories</h2>
        <p className="text-gray-600">Manage product categories</p>
      </Link>
      <Link href="/admin/products" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-bold mb-2">Products</h2>
        <p className="text-gray-600">Add, edit, or delete products</p>
      </Link>
    </div>
  );
}