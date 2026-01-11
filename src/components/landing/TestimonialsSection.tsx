import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import RotatingText from "@/components/ui/RotatingText";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "This platform transformed how I understand neural networks. Building from scratch with NumPy gave me insights no framework tutorial ever could.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Sarah Chen",
    role: "ML Engineer",
  },
  {
    text: "Finally, a resource that doesn't skip the math! The step-by-step implementation of backpropagation was exactly what I needed.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "Alex Rivera",
    role: "Data Scientist",
  },
  {
    text: "The hands-on approach to CNNs and transformers helped me ace my machine learning interviews. Best learning investment I've made.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    name: "Maya Patel",
    role: "AI Researcher",
  },
  {
    text: "Coming from web development, this was the perfect bridge into ML. The curriculum is structured brilliantly for self-learners.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    name: "Marcus Johnson",
    role: "Full Stack Developer",
  },
  {
    text: "Understanding the fundamentals from scratch has made me a better ML practitioner. I now know what's happening under the hood of PyTorch.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    name: "Emily Zhang",
    role: "PhD Student",
  },
  {
    text: "The gradient descent visualizations and intuitive explanations finally made optimization algorithms click for me. Game changer!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    name: "David Kumar",
    role: "Software Engineer",
  },
  {
    text: "Teaching ML concepts became easier after going through this curriculum. The projects are perfect for demonstrating core principles.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    name: "Lisa Anderson",
    role: "CS Professor",
  },
  {
    text: "Built my first neural network from scratch in a weekend! The explanations are clear and the community is incredibly supportive.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    name: "Ryan Thompson",
    role: "Bootcamp Graduate",
  },
  {
    text: "This open-source curriculum rivals paid courses. The depth of content and quality of implementation examples is outstanding.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    name: "Nina Okonkwo",
    role: "Research Engineer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-20 relative">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg text-sm text-muted-foreground">
              Testimonials
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-5 text-center whitespace-nowrap flex items-center justify-center gap-3">
            <span>Trusted by</span>
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg">
              <RotatingText 
                texts={['Developers', 'Engineers', 'Students', 'Researchers', 'Scientists', 'Professors']}
                rotationInterval={3000}
                staggerDuration={0.02}
              />
            </span>
          </h2>
          <p className="text-center mt-5 text-muted-foreground text-lg">
            Join thousands of developers mastering ML from the ground up.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
