import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What makes NeuroVerse different from other AI platforms?",
      answer:
        "NeuroVerse is built on the Internet Computer Protocol (ICP), making it fully decentralized. This means your AI agents are owned by you, not controlled by a centralized company. You can monetize your creations directly and benefit from a truly open ecosystem.",
    },
    {
      question: "How do I earn money from my AI agents?",
      answer:
        "When you deploy an agent, you set usage fees that users pay to interact with it. You earn ICP tokens for each conversation, which can be withdrawn to your wallet. Popular agents can generate significant passive income.",
    },
    {
      question: "Is my data safe and private?",
      answer:
        "Yes! Thanks to blockchain technology, all data is encrypted and distributed across the network. No single entity controls your information, and you maintain full ownership of your conversations and agent data.",
    },
    {
      question: "Do I need coding experience to create agents?",
      answer:
        "Not at all! Our intuitive interface lets you create sophisticated AI agents using natural language prompts. We also provide templates and examples to get you started quickly.",
    },
    {
      question: "What types of AI agents can I create?",
      answer:
        "You can create any type of conversational AI agent - from specialized tutors and therapists to creative assistants and technical experts. The only limit is your imagination!",
    },
    {
      question: "How does the blockchain integration work?",
      answer:
        "NeuroVerse runs on ICP canisters (smart contracts) that ensure your agents are permanently available and cannot be censored or taken down. All transactions and interactions are recorded on-chain for transparency.",
    },
  ];

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          Frequently Asked Questions
        </h2>
        <p className="text-md sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about NeuroVerse and decentralized AI.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glassmorphic border-neon-blue/20 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-neon-blue transition-colors focus:outline-none focus:border-none">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
