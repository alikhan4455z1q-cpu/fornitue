'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryForm from '../../CategoryForm';

export default function EditCategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then(res => res.json())
      .then(data => setCategory(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!category) return <div>Category not found</div>;

  return <CategoryForm initialData={category} />;
}