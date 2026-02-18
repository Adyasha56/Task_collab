import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Is TaskFlow really free to use?',
    answer:
      'Yes — TaskFlow is completely free for individuals and small teams. You get unlimited boards, lists, and tasks with no hidden limits. We plan to offer advanced features for larger organizations in the future.',
  },
  {
    question: 'How does real-time collaboration work?',
    answer:
      'TaskFlow uses WebSocket connections (Socket.io) to push updates instantly to all connected team members. When someone creates, updates, moves, or deletes a task, every other user on that board sees the change immediately — no refresh required.',
  },
  {
    question: 'How many team members can I add to a board?',
    answer:
      'There\'s no hard limit on board members. You can invite your entire team to collaborate on a single board, and each member will receive real-time updates for all changes.',
  },
  {
    question: 'Can I assign tasks to specific team members?',
    answer:
      'Absolutely. When creating or editing a task, you can assign it to any member of the board. Assigned tasks are tracked per user so you always know who\'s responsible for what.',
  },
  {
    question: 'What happens to my data if I delete a board?',
    answer:
      'Deleting a board permanently removes all associated lists, tasks, and activity logs. This action is irreversible, so we recommend exporting or archiving important data before deletion (export feature coming soon).',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'The web app is fully responsive and works beautifully on mobile browsers. Dedicated iOS and Android apps are on our roadmap. For now, add the site to your home screen for a near-native experience.',
  },
  {
    question: 'Can I integrate with other tools?',
    answer:
      'We\'re building integrations with popular tools like Slack, GitHub, and Figma. Our REST API is also fully documented, so you can build custom integrations today.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Got questions?
          </h2>
          <p className="text-white/40 text-lg">
            Everything you need to know about TaskFlow.
          </p>
        </div>

        {/* Accordion */}
        <div className="rounded-xl border border-white/8 overflow-hidden bg-white/2 divide-y divide-white/8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="px-5 border-0 border-b border-white/8 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
