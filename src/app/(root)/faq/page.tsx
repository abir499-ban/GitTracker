import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const page = () => {
    return (
        <>
            <div className='justify-center items-center text-center text-4xl font-mono'><h1>Some Frequently Asked Questions</h1></div>
            <div className='px-24 py-7'>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='font-bold text-xm'>What is this application about?
                        </AccordionTrigger>
                        <AccordionContent>
                            This application helps users explore GitHub repositories, view their metrics, filter repositories by criteria such as language and stars, and bookmark repositories for easy access.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>



                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='font-bold text-xm'>Do I need a Github account for this
                        </AccordionTrigger>
                        <AccordionContent>
                            You can explore repositories without an account, but logging in is required to bookmark repositories or access personalized features.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='font-bold text-xm'>How to Search a Repository?
                        </AccordionTrigger>
                        <AccordionContent>
                            Just go to the Home page, and fill the Details of the Repository you want to search: its Owner name and Repository Name, and click search to find the repo.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='font-bold text-xm'>How can I bookmark a repository?
                        </AccordionTrigger>
                        <AccordionContent>
                            Once you’re logged in, each repository will have a ❤️ button. Click it to save the repository to your bookmarks list.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>

        </>
    )
}

export default page