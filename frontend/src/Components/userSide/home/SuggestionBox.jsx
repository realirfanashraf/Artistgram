import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersection } from '@mantine/hooks';
import {Axios} from '../../../axios/userInstance.js'

const fetchUsers = async ({ pageParam = 1 }) => {
  const response = await Axios.get(`/api/users?page=${pageParam}`);
  return response.data;
};

const SuggestionBox = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam: (_, allPages) => {
      if (allPages.length > 0 && allPages[0].totalCount) {
        const { totalCount } = allPages[0];
        if (allPages.length < Math.ceil(totalCount / 2)) {
          return allPages.length + 1; 
        }
      }
      return undefined; 
    },
    initialData: {
      pages: [],
      pageParams: [1],
      totalCount: 0,
    },
  });


  const lastUserRef = useRef(null);
  const { ref: intersectionRef, entry } = useIntersection({
    root: lastUserRef.current,
    threshold: 1
  });

  useEffect(() => {
    if (entry && entry.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  const _users = data?.pages.flatMap((page) => page);
  console.log(_users,"user is here")

  return (
   <div className='overflow-y-scroll h-60 no-scrollbar'>
     <div>
      Users:
      {_users?.map((user, i) => (
        <div key={user.id} className=''>
          {i === _users.length - 1 && (
            <div ref={intersectionRef} className='intersection-marker'></div>
          )}
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Render other user details as needed */}
        </div>
      ))}
      <button onClick={fetchNextPage} disabled={isFetchingNextPage}>
        {isFetchingNextPage
          ? 'Loading More'
          : data?.pages.length < Math.ceil(data.totalCount / 2)
          ? 'Load More'
          : 'Nothing More to Load'}
      </button>
    </div>
   </div>
  );
};

export default SuggestionBox;
