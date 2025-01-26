import { useEffect, useState } from 'react';
import { SearchFilters } from '@/components/SearchFilters';
import { ItemCard } from '@/components/ItemCard';
import { supabase } from '@/lib/supabase';
import { Item } from '@/types';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    status: 'all',
    sortBy: 'newest',
  });

  useEffect(() => {
    fetchItems();
  }, [filters]);

  async function fetchItems() {
    try {
      let query = supabase
        .from('items')
        .select('*');

      // Apply filters
      if (filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      if (filters.type !== 'all') {
        query = query.eq('type', filters.type);
      }
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      // Apply sorting
      query = query.order('created_at', {
        ascending: filters.sortBy === 'oldest',
      });

      const { data, error } = await query;

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SearchFilters
        onSearch={setSearch}
        onFilterChange={setFilters}
      />

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600" />
          <p className="mt-2 text-gray-500">Loading items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No items found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}