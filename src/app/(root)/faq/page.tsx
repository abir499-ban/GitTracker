import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const page = () => {
    const faqSet = [
        { question: "What is this application about?", answer: "This application helps users explore GitHub repositories, view their metrics, filter repositories by criteria such as language and stars, and bookmark repositories for easy access." },
        { question: "Do I need a Github account for this", answer: "You can explore repositories without an account, but logging in is required to bookmark repositories or access personalized features." },
        { question: "How to Search a Repository?", answer: "Just go to the Home page, and fill the Details of the Repository you want to search: its Owner name and Repository Name, and click search to find the repo." },
        {
            question: "How can I bookmark a repository?", answer: "Once you’re logged in, each repository will have a ❤️ button. Click it to save the repository to your bookmarks list."
        }
    ]
    return (
        <>
            <div className='justify-center items-center text-center text-4xl font-mono'><h1>Some Frequently Asked Questions</h1></div>
            <div className='px-24 py-7'>
                {faqSet.map((faq) => (
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='font-bold text-xm'>{faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}

            </div>

        </>
    )
}

export default page