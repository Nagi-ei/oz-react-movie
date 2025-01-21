import { Skeleton } from '@/components/ui/skeleton';

export default function MovieCardSkeleton() {
  return (
    <li className='w-[300px] h-[488px] list-none'>
      <Skeleton className='w-[300px] h-[420px]'></Skeleton>
      <Skeleton className='w-48 h-1 mt-8 ml-4'></Skeleton>
      <Skeleton className='w-24 h-1 mt-8 ml-4 border-b'></Skeleton>
    </li>
  );
}
