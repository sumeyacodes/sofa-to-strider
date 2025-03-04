import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Example() {
  return (
    <>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Tab 1</TabsTrigger>
          <TabsTrigger value="password">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="account">This is example tab 1</TabsContent>
        <TabsContent value="password">This is example of tab 2</TabsContent>
      </Tabs>
    </>
  );
}
