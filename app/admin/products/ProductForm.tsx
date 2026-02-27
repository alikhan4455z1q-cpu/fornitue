'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define types for color and product data
interface Color {
  name: string;
  hex: string;
}

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes ? JSON.parse(initialData.sizes) : []);
  const [colors, setColors] = useState<Color[]>(initialData?.colors ? JSON.parse(initialData.colors) : []);
  const [description, setDescription] = useState(initialData?.description || '');
  const [material, setMaterial] = useState(initialData?.material || '');
  const [warranty, setWarranty] = useState(initialData?.warranty || '');
  const [inStock, setInStock] = useState(initialData?.inStock ?? true);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const addSize = () => setSizes([...sizes, '']);

  // ✅ Fixed: added explicit type for the unused parameter
  const removeSize = (index: number) => 
    setSizes(sizes.filter((_: string, i: number) => i !== index));

  const handleColorChange = (index: number, field: keyof Color, value: string) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const addColor = () => setColors([...colors, { name: '', hex: '#000000' }]);

  // ✅ Fixed: added explicit types for parameters
  const removeColor = (index: number) => 
    setColors(colors.filter((_: Color, i: number) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = initialData ? `/api/products/${initialData.id}` : '/api/products';
    const method = initialData ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        image,
        sizes: JSON.stringify(sizes),
        colors: JSON.stringify(colors),
        description,
        material,
        warranty,
        inStock,
        categoryId: parseInt(categoryId),
      }),
    });
    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      alert('Error saving product');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">{initialData ? 'Edit' : 'New'} Product</h1>

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
        <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/images/product.jpg"
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
        <div className="space-y-2">
          {sizes.map((size: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={size}
                onChange={(e) => handleSizeChange(index, e.target.value)}
                placeholder="e.g., King"
                className="flex-1 px-4 py-2 border rounded"
              />
              <button type="button" onClick={() => removeSize(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addSize} className="bg-gray-200 px-4 py-2 rounded">+ Add Size</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
        {colors.map((color: Color, index: number) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <input
              type="text"
              placeholder="Color name"
              value={color.name}
              onChange={(e) => handleColorChange(index, 'name', e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <input
              type="color"
              value={color.hex}
              onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
              className="w-12 h-10 border rounded"
            />
            <button type="button" onClick={() => removeColor(index)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addColor} className="bg-gray-200 px-4 py-2 rounded">+ Add Color</button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
        <input
          type="text"
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="mr-2" />
          <span className="text-sm font-medium text-gray-700">In Stock</span>
        </label>
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