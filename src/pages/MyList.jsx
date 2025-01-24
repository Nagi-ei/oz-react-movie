import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import React from 'react';
import { Outlet } from 'react-router';

export default function MyList() {
  return (
    <main className='flex flex-col items-center pt-[100px] grow'>
      <Tabs defaultValue='favorites'>
        <TabsList className='flex w-80'>
          <TabsTrigger value='favorites' className='grow'>
            Favorites
          </TabsTrigger>
          <TabsTrigger value='watched' className='grow'>
            Watched
          </TabsTrigger>
        </TabsList>
        <TabsContent value='favorites'>
          <Outlet />
        </TabsContent>
        <TabsContent value='watched'>
          <Outlet />
        </TabsContent>
      </Tabs>
    </main>
  );
}
