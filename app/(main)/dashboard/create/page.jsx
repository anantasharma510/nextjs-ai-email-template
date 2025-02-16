
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkle } from 'lucide-react'
import AiInputBox from '@/components/custom/AiInputBox'


function Create() {
  
  return (
    <div
    className='px-10 md:px-28 mt-2 lg:px-44 xl:px-56 flex flex-col items-center text-center'
    
    >

<h2
className='font-bold text-3xl md:text-4xl'

>
Create a new template</h2>
<p>easily design and creare also use ai powered</p>
<Tabs defaultValue="AI" className="w-[400px] mt-10">
  <TabsList>
    <TabsTrigger value="AI">Create With Ai <Sparkle className='h-5 w-3 ' /> </TabsTrigger>
    <TabsTrigger value="SCRATCH">Start From Scratch</TabsTrigger>
  </TabsList>
  <TabsContent value="AI">
    <AiInputBox/>

  </TabsContent>
  <TabsContent value="SRATCH">Change your password here.</TabsContent>
</Tabs>

      
    </div>
  )
}

export default Create
