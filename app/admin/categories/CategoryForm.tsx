'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = initialData ? `/api/categories/${initialData.id}` : '/api/categories';
    const method = initialData ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, image, thumbnail }),
    });
    if (res.ok) {
      router.push('/admin/categories');
      router.refresh();
    } else {
      alert('Error saving category');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">{initialData ? 'Edit' : 'New'} Category</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
        <p className="text-xs text-gray-500 mt-1">URL-friendly name (e.g., "luxury-beds")</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image Path</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/images/category-beds-hero.jpg"
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image Path</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="/images/category-beds-thumb.jpg"
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">
          Cancel
        </button>
      </div>
    </form>
  );
}