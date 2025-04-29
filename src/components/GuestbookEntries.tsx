import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { withConvexProvider } from '../lib/convex';

export function GuestbookEntries() {
  const entries = useQuery(api.guestbook.get) || [];
  console.log(entries);

  return (
    <div>
      {entries.map((entry) => (
        <div
          key={entry._id}
          className='retro-window'
          style={{ marginTop: '10px' }}
        >
          <div className='retro-window-title guestbook-title'>
            <p>{entry.name}</p>
            <p>{new Date(entry._creationTime).toLocaleDateString()}</p>
          </div>
          <p style={{ padding: '10px' }}>{entry.message}</p>
        </div>
      ))}
    </div>
  );
}

export default withConvexProvider(GuestbookEntries);
