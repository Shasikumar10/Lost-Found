import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Calendar, Tag } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Item } from '@/types';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link to={`/items/${item.id}`}>
      <Card>
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="h-48 w-full object-cover rounded-t-lg"
          />
        )}
        <Card.Content>
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant={item.type === 'lost' ? 'error' : 'success'}
              className="uppercase"
            >
              {item.type}
            </Badge>
            <Badge
              variant={
                item.status === 'open'
                  ? 'warning'
                  : item.status === 'resolved'
                  ? 'success'
                  : 'default'
              }
              className="capitalize"
            >
              {item.status}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="capitalize">{item.category}</span>
            </div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}